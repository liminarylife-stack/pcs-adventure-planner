export interface MoveInfo {
  name: string
  moveDate: string
  fromAddress: string
  toAddress: string
  movingCompany: string
  companyPhone: string
  driverName: string
  driverPhone: string
  inventoryNumber: string
  deliveryWindow: string
  sponsorName: string
  sponsorPhone: string
}

export type DayChecklistState = Record<string, boolean>

export interface Room {
  id: string
  name: string
  status: 'pending' | 'packed' | 'loaded' | 'delivered' | 'checked'
  notes: string
  itemCount: string
}

export interface EssentialItem {
  id: string
  name: string
  location: 'with-me' | 'essentials-box' | 'unknown'
  confirmed: boolean
  note: string
}

export interface QuickContact {
  id: string
  name: string
  role: string
  phone: string
}

export interface MoveNote {
  id: string
  text: string
  timestamp: string
  phase: string
}
