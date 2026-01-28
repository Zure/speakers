export interface Speaker {
  id: string
  name: string
  title: string
  bio: string
  photo: string
}

export interface CoSpeaker {
  id: string
  name: string
  photo: string
}

export interface Session {
  id: string
  title: string
  abstract: string
  speakerIds: string[]
  coSpeakers?: CoSpeaker[]
}

export interface SpeakerProfileData {
  speaker: Speaker
  sessions: Session[]
}
