export interface OrdersInfo {
  serviceMember: string
  branch: string
  rank: string
  currentStation: string
  newStation: string
  reportDate: string
  ordersDate: string
  hasDependents: boolean
  dependentCount: number
  hasPets: boolean
  petTypes: string
}

export type ChecklistState = Record<string, boolean>
export type NotesState = Record<string, string>

export interface HousingOption {
  id: string
  name: string
  type: 'on-base' | 'off-base' | 'temporary'
  monthlyRent: string
  distance: string
  bedrooms: string
  notes: string
  status: 'researching' | 'applied' | 'waitlisted' | 'approved' | 'confirmed'
  phone: string
  website: string
}

export interface ChecklistPhase {
  id: string
  label: string
  weeks: string
  emoji: string
  color: string
  badgeColor: string
  items: ChecklistItemDef[]
}

export interface ChecklistItemDef {
  id: string
  text: string
  category: string
  tip?: string
}
