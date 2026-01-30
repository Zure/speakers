#!/usr/bin/env node

'use strict'

const fs = require('fs/promises')
const path = require('path')
const { JSDOM } = require('jsdom')

const BASE_URL = 'https://sessionize.com'

function printHelp() {
  process.stdout.write(`\
Sessionize scraper (Zure speakers)

Usage:
  node scripts/sessionize-scrape.js [--query Zure] [--in data/speakers.json] [--out data/speakers.sessionize.json]

Options:
  --query <string>  Search query for Sessionize directory (default: Zure)
  --in <path>       Input JSON file (default: data/speakers.json)
  --out <path>      Output JSON file (default: data/speakers.sessionize.json)
  --help            Show this help
`)
}

function parseArgs(argv) {
  const args = { query: 'Zure', inPath: 'data/speakers.json', outPath: 'data/speakers.sessionize.json' }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--help' || a === '-h') {
      args.help = true
      continue
    }
    if (a === '--query') {
      args.query = argv[++i]
      continue
    }
    if (a === '--in') {
      args.inPath = argv[++i]
      continue
    }
    if (a === '--out') {
      args.outPath = argv[++i]
      continue
    }
    throw new Error(`Unknown argument: ${a}`)
  }
  return args
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchWithRetry(url, { retries = 4, minDelayMs = 350 } = {}) {
  let lastErr
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          'user-agent': 'zure-speakers-scraper/1.0 (+https://github.com/zure)'
        }
      })

      if (res.status === 429 || (res.status >= 500 && res.status <= 599)) {
        const waitMs = minDelayMs * Math.pow(2, attempt)
        await sleep(waitMs)
        continue
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${url}`)
      }

      return await res.text()
    } catch (e) {
      lastErr = e
      const waitMs = minDelayMs * Math.pow(2, attempt)
      await sleep(waitMs)
    }
  }
  throw lastErr
}

function normalizeTitle(title) {
  return String(title || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function slugify(value) {
  const s = String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return s || 'unknown'
}

function htmlToText(html) {
  // Convert br to newlines first, then strip tags.
  const withBreaks = String(html || '').replace(/<\s*br\s*\/?>/gi, '\n')
  const dom = new JSDOM(`<body>${withBreaks}</body>`)
  const text = dom.window.document.body.textContent || ''
  return text
    .replace(/\r/g, '')
    .split('\n')
    .map(line => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n')
}

function absoluteUrl(href) {
  return new URL(href, BASE_URL).toString()
}

function parseSpeakerDirectory(html) {
  const dom = new JSDOM(html)
  const doc = dom.window.document
  const entries = Array.from(doc.querySelectorAll('.c-entry.c-entry--speaker'))
  const speakers = []
  const seen = new Set()

  for (const entry of entries) {
    const link = entry.querySelector('.c-entry__title a')
    if (!link) continue
    const href = link.getAttribute('href')
    const name = (link.textContent || '').trim()
    if (!href || !name) continue

    const profileUrl = absoluteUrl(href)
    if (seen.has(profileUrl)) continue
    seen.add(profileUrl)

    speakers.push({
      name,
      profileUrl
    })
  }

  return speakers
}

function parseSpeakerProfile(html) {
  const dom = new JSDOM(html)
  const doc = dom.window.document

  const name = (doc.querySelector('h1.c-s-speaker-info__name')?.textContent || '').trim()
  const title = (doc.querySelector('p.c-s-speaker-info__tagline')?.textContent || '').trim()
  const photo = (doc.querySelector('.c-s-speaker-info__avatar img')?.getAttribute('src') || '').trim()

  const bioEl = doc.querySelector('.c-s-speaker-info__bio p')
  const bio = bioEl ? htmlToText(bioEl.innerHTML) : ''

  const sessions = []
  const sessionEls = Array.from(doc.querySelectorAll('.c-s-timeline__item .c-s-session'))
  for (const s of sessionEls) {
    const a = s.querySelector('h3.c-s-session__title a')
    const titleEl = s.querySelector('h3.c-s-session__title')
    const summaryEl = s.querySelector('p.c-s-session__summary')

    const sessionTitle = (a?.textContent || titleEl?.textContent || '').trim()
    if (!sessionTitle) continue

    const href = a?.getAttribute('href') || ''
    const m = href.match(/\/(\d+)(?:\/)?$/)
    const sessionizeId = m ? m[1] : null
    const abstract = summaryEl ? htmlToText(summaryEl.innerHTML) : ''

    sessions.push({
      title: sessionTitle,
      abstract,
      sessionizeId
    })
  }

  return { name, title, bio, photo, sessions }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    printHelp()
    return
  }

  const inAbs = path.resolve(process.cwd(), args.inPath)
  const outAbs = path.resolve(process.cwd(), args.outPath)

  const inputRaw = await fs.readFile(inAbs, 'utf8')
  const data = JSON.parse(inputRaw)
  if (!data || !Array.isArray(data.speakers) || !Array.isArray(data.sessions)) {
    throw new Error(`Invalid input data model in ${args.inPath}`)
  }

  const speakersById = new Map(data.speakers.map(s => [s.id, s]))
  const profileUrlToSpeakerId = new Map()

  const sessionsByNormTitle = new Map()
  const touchedSessionTitles = new Set()
  for (const session of data.sessions) {
    sessionsByNormTitle.set(normalizeTitle(session.title), session)
  }

  const searchUrl = `${BASE_URL}/speakers-directory?q=${encodeURIComponent(args.query)}`
  process.stdout.write(`Fetching directory: ${searchUrl}\n`)
  const directoryHtml = await fetchWithRetry(searchUrl)
  const dirSpeakers = parseSpeakerDirectory(directoryHtml)
  process.stdout.write(`Found ${dirSpeakers.length} speakers in directory\n`)

  for (let idx = 0; idx < dirSpeakers.length; idx++) {
    const dirSpeaker = dirSpeakers[idx]
    process.stdout.write(`[${idx + 1}/${dirSpeakers.length}] Fetching speaker: ${dirSpeaker.name}\n`)

    if (profileUrlToSpeakerId.has(dirSpeaker.profileUrl)) {
      continue
    }

    const profileHtml = await fetchWithRetry(dirSpeaker.profileUrl)
    const profile = parseSpeakerProfile(profileHtml)

    const speakerName = profile.name || dirSpeaker.name
    const speakerId = slugify(speakerName)
    profileUrlToSpeakerId.set(dirSpeaker.profileUrl, speakerId)

    const speakerRecord = {
      id: speakerId,
      name: speakerName,
      title: profile.title || '',
      bio: profile.bio || '',
      photo: profile.photo || ''
    }

    if (speakersById.has(speakerId)) {
      // Duplicate names can exist in Sessionize as separate profiles.
      // Treat them as the same person and only fill missing fields.
      const existingSpeaker = speakersById.get(speakerId)
      if (!existingSpeaker.name && speakerRecord.name) existingSpeaker.name = speakerRecord.name
      if (!existingSpeaker.title && speakerRecord.title) existingSpeaker.title = speakerRecord.title
      if (!existingSpeaker.bio && speakerRecord.bio) existingSpeaker.bio = speakerRecord.bio
      if (!existingSpeaker.photo && speakerRecord.photo) existingSpeaker.photo = speakerRecord.photo
    } else {
      data.speakers.push(speakerRecord)
      speakersById.set(speakerId, speakerRecord)
    }

    for (const sess of profile.sessions) {
      const norm = normalizeTitle(sess.title)
      if (!norm) continue
      const existing = sessionsByNormTitle.get(norm)

      if (existing) {
        // First time we see this title during this run: reset speakerIds to the
        // scraped truth, and take the first abstract we encounter.
        if (!touchedSessionTitles.has(norm)) {
          existing.speakerIds = []
          if (sess.abstract) existing.abstract = sess.abstract
          touchedSessionTitles.add(norm)
        }

        if (!Array.isArray(existing.speakerIds)) existing.speakerIds = []
        if (!existing.speakerIds.includes(speakerId)) existing.speakerIds.push(speakerId)
        // Keep the first abstract we encountered during this run.
        continue
      }

      const newSession = {
        id: sess.sessionizeId ? `sessionize-${sess.sessionizeId}` : `sessionize-${slugify(sess.title)}`,
        title: sess.title,
        abstract: sess.abstract || '',
        speakerIds: [speakerId]
      }

      data.sessions.push(newSession)
      sessionsByNormTitle.set(norm, newSession)
      touchedSessionTitles.add(norm)
    }

    // Be polite to Sessionize.
    await sleep(200)
  }

  // Canonicalize any existing duplicate ids like "name-2" to the base slug.
  // This prevents duplicates from accumulating when scraping in-place.
  const canonicalBySlug = new Map()
  const idRemap = new Map()
  const keptSpeakers = []

  for (const speaker of data.speakers) {
    const slug = slugify(speaker.name)
    if (!canonicalBySlug.has(slug)) {
      canonicalBySlug.set(slug, speaker)
      if (speaker.id !== slug) idRemap.set(speaker.id, slug)
      speaker.id = slug
      keptSpeakers.push(speaker)
      continue
    }

    const canonical = canonicalBySlug.get(slug)
    idRemap.set(speaker.id, canonical.id)
    if (!canonical.title && speaker.title) canonical.title = speaker.title
    if (!canonical.bio && speaker.bio) canonical.bio = speaker.bio
    if (!canonical.photo && speaker.photo) canonical.photo = speaker.photo
  }

  for (const session of data.sessions) {
    if (!Array.isArray(session.speakerIds)) continue
    const next = []
    for (const sid of session.speakerIds) {
      const mapped = idRemap.get(sid) || sid
      if (!next.includes(mapped)) next.push(mapped)
    }
    session.speakerIds = next
  }

  data.speakers = keptSpeakers

  await fs.mkdir(path.dirname(outAbs), { recursive: true })
  await fs.writeFile(outAbs, JSON.stringify(data, null, 2) + '\n', 'utf8')
  process.stdout.write(`Wrote: ${path.relative(process.cwd(), outAbs)}\n`)
}

main().catch(err => {
  process.stderr.write(`${err.stack || err.message || String(err)}\n`)
  process.exitCode = 1
})
