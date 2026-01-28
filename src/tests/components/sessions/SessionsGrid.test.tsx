import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SessionsGrid } from '@/components/sessions/SessionsGrid'
import type { Session, Speaker } from '@/lib/types'

describe('SessionsGrid', () => {
  const mockSessions: Session[] = [
    {
      id: 'session-1',
      title: 'Test Session 1',
      abstract: 'This is about React',
      speakerIds: ['speaker-1']
    },
    {
      id: 'session-2',
      title: 'Test Session 2',
      abstract: 'This is about TypeScript',
      speakerIds: ['speaker-2']
    }
  ]

  const mockSpeakers: Speaker[] = [
    {
      id: 'speaker-1',
      name: 'John Doe',
      title: 'Dev',
      photo: '/photo1.jpg',
      bio: 'Bio'
    },
    {
      id: 'speaker-2',
      name: 'Jane Smith',
      title: 'Architect',
      photo: '/photo2.jpg',
      bio: 'Bio'
    }
  ]

  it('renders search input', () => {
    render(<SessionsGrid sessions={mockSessions} speakers={mockSpeakers} />)
    
    const searchInput = screen.getByPlaceholderText('Filter by title or keyword...')
    expect(searchInput).toBeInTheDocument()
  })

  it('filters sessions by search query', () => {
    render(<SessionsGrid sessions={mockSessions} speakers={mockSpeakers} />)
    
    const searchInput = screen.getByPlaceholderText('Filter by title or keyword...')
    
    // Initially shows all sessions
    expect(screen.getByText('Test Session 1')).toBeInTheDocument()
    expect(screen.getByText('Test Session 2')).toBeInTheDocument()
    
    // Filter by React
    fireEvent.change(searchInput, { target: { value: 'React' } })
    
    expect(screen.getByText('Test Session 1')).toBeInTheDocument()
    expect(screen.queryByText('Test Session 2')).not.toBeInTheDocument()
  })

  it('shows results count when filtering', () => {
    render(<SessionsGrid sessions={mockSessions} speakers={mockSpeakers} />)
    
    const searchInput = screen.getByPlaceholderText('Filter by title or keyword...')
    fireEvent.change(searchInput, { target: { value: 'React' } })
    
    expect(screen.getByText('1 session found')).toBeInTheDocument()
  })

  it('shows empty state when no sessions', () => {
    render(<SessionsGrid sessions={[]} speakers={mockSpeakers} />)
    
    expect(screen.getByText('No sessions yet')).toBeInTheDocument()
  })
})
