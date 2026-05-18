export interface HomeInfo {
  familyName: string
  newStation: string
  newAddress: string
  arrivalDate: string
  branch: string
  hasKids: boolean
  hasPets: boolean
}

export type TaskState = Record<string, boolean>

export interface UnpackRoom {
  id: string
  name: string
  emoji: string
  status: 'not-started' | 'in-progress' | 'unpacked' | 'organized'
  notes: string
}

export interface Neighbor {
  id: string
  name: string
  connection: string
  phone: string
  notes: string
}

export interface LocalPlace {
  id: string
  name: string
  category: string
  address: string
  notes: string
  favorite: boolean
}

export interface Milestone {
  id: string
  emoji: string
  title: string
  description: string
  achieved: boolean
  achievedDate: string
  custom?: boolean
}

export interface BucketItem {
  id: string
  text: string
  done: boolean
  doneDate: string
}
