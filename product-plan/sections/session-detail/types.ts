export interface Speaker {
  id: string
  name: string
  title: string
  bio: string
  photo: string
}

export interface Session {
  id: string
  title: string
  abstract: string
  speakerIds: string[]
}

export interface SessionDetailData {
  session: Session
  speakers: Speaker[]
}
