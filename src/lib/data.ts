import { Speaker, Session, AppData } from './types'
import speakersData from '@/data/speakers.json'

const data: AppData = speakersData as AppData

export function getAllSpeakers(): Speaker[] {
  return data.speakers
}

export function getSpeakerById(id: string): Speaker | undefined {
  return data.speakers.find(speaker => speaker.id === id)
}

export function getAllSessions(): Session[] {
  return data.sessions
}

export function getSessionById(id: string): Session | undefined {
  return data.sessions.find(session => session.id === id)
}

export function getSessionsBySpeakerId(speakerId: string): Session[] {
  return data.sessions.filter(session => 
    session.speakerIds.includes(speakerId)
  )
}

export function getSpeakersByIds(speakerIds: string[]): Speaker[] {
  return data.speakers.filter(speaker => 
    speakerIds.includes(speaker.id)
  )
}
