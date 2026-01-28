import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SpeakersGrid } from '@/components/speakers/SpeakersGrid'
import type { Speaker } from '@/lib/types'

describe('SpeakersGrid', () => {
  const mockSpeakers: Speaker[] = [
    {
      id: 'speaker-1',
      name: 'John Doe',
      title: 'Developer',
      photo: '/photo1.jpg',
      bio: 'Bio 1'
    },
    {
      id: 'speaker-2',
      name: 'Jane Smith',
      title: 'Architect',
      photo: '/photo2.jpg',
      bio: 'Bio 2'
    }
  ]

  it('renders multiple speakers', () => {
    render(<SpeakersGrid speakers={mockSpeakers} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('shows empty state when no speakers', () => {
    render(<SpeakersGrid speakers={[]} />)
    
    expect(screen.getByText('No speakers yet')).toBeInTheDocument()
    expect(screen.getByText('Check back soon for our expert speakers')).toBeInTheDocument()
  })

  it('renders correct number of speaker cards', () => {
    render(<SpeakersGrid speakers={mockSpeakers} />)
    
    const speakerLinks = screen.getAllByRole('link')
    expect(speakerLinks).toHaveLength(2)
  })
})
