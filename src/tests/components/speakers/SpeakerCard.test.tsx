import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SpeakerCard } from '@/components/speakers/SpeakerCard'
import type { Speaker } from '@/lib/types'

describe('SpeakerCard', () => {
  const mockSpeaker: Speaker = {
    id: 'test-speaker',
    name: 'John Doe',
    title: 'Senior Developer',
    photo: '/test-photo.jpg',
    bio: 'Bio text'
  }

  it('renders speaker data correctly', () => {
    render(<SpeakerCard speaker={mockSpeaker} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Senior Developer')).toBeInTheDocument()
    expect(screen.getByAltText('John Doe')).toHaveAttribute('src', '/test-photo.jpg')
  })

  it('has correct link to speaker profile', () => {
    render(<SpeakerCard speaker={mockSpeaker} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/speakers/test-speaker')
  })
})
