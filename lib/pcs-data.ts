import type { ChecklistPhase } from "@/types"

export const BRANCHES = [
  'Army', 'Navy', 'Marine Corps', 'Air Force', 'Space Force', 'Coast Guard'
] as const

export const BRANCH_INFO: Record<string, { emoji: string; color: string }> = {
  'Army':        { emoji: '⭐', color: 'text-green-700' },
  'Navy':        { emoji: '⚓', color: 'text-blue-800' },
  'Marine Corps':{ emoji: '🦅', color: 'text-red-700' },
  'Air Force':   { emoji: '✈️', color: 'text-blue-600' },
  'Space Force': { emoji: '🚀', color: 'text-indigo-700' },
  'Coast Guard': { emoji: '🛟', color: 'text-orange-600' },
}

export const CHECKLIST_PHASES: ChecklistPhase[] = [
  {
    id: 'orders',
    label: 'Orders Received',
    weeks: '12+ weeks out',
    emoji: '📋',
    color: 'from-violet-50 to-purple-50 border-purple-200',
    badgeColor: 'bg-purple-100 text-purple-700',
    items: [
      { id: 'o1', text: 'Read orders carefully — note report date, entitlements, and any special instructions', category: 'admin', tip: 'Print a copy and keep it in your important documents folder.' },
      { id: 'o2', text: 'Contact your gaining unit to introduce yourself', category: 'admin', tip: 'Ask about a sponsor — many units assign one to help you settle in.' },
      { id: 'o3', text: 'Research your new duty station city, base, and surrounding area', category: 'research', tip: 'Join Facebook groups for the installation — spouses groups are goldmines of local info!' },
      { id: 'o4', text: 'Schedule your TMO/Transportation appointment', category: 'moving', tip: 'Do this ASAP — peak PCS season (summer) books fast.' },
      { id: 'o5', text: 'Research BAH rates at your new duty station', category: 'finance', tip: 'Use the official DTMO calculator at move.mil.' },
      { id: 'o6', text: 'Notify your current landlord or start home sale process', category: 'housing' },
      { id: 'o7', text: 'Update DEERS if adding/removing dependents', category: 'admin' },
      { id: 'o8', text: 'Request a copy of all family medical/dental records', category: 'medical', tip: 'You\'ll need these to establish care at your new location.' },
      { id: 'o9', text: 'Start school research at the new duty station', category: 'schools' },
      { id: 'o10', text: 'Look into on-base housing waitlist — apply early!', category: 'housing', tip: 'Waitlists can be months long. Apply before you get there if possible.' },
    ]
  },
  {
    id: 'planning',
    label: 'Planning & Prep',
    weeks: '8–12 weeks out',
    emoji: '🗺️',
    color: 'from-sky-50 to-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-700',
    items: [
      { id: 'p1', text: 'Confirm housing decision (on-base or sign off-base lease)', category: 'housing' },
      { id: 'p2', text: 'Schedule pack-out and delivery dates with TMO', category: 'moving' },
      { id: 'p3', text: 'Decide: Full HHG, PPM/DITY, or split shipment', category: 'moving', tip: 'PPM can put money in your pocket if you have a lighter load.' },
      { id: 'p4', text: 'Begin decluttering — sell, donate, or discard what you won\'t need', category: 'moving', tip: 'Facebook Marketplace and base yard sales are perfect for this.' },
      { id: 'p5', text: 'Create a home inventory with photos/video walkthrough', category: 'moving', tip: 'This protects you for insurance claims if items are damaged.' },
      { id: 'p6', text: 'Research and pre-enroll kids in school at new duty station', category: 'schools' },
      { id: 'p7', text: 'Contact a vet about pet travel requirements (health certs, etc.)', category: 'pets' },
      { id: 'p8', text: 'Update car insurance for your new state', category: 'finance' },
      { id: 'p9', text: 'Notify bank and financial institutions of upcoming address change', category: 'finance' },
      { id: 'p10', text: 'Set up mail forwarding via USPS', category: 'admin', tip: 'Forward to a trusted address if your new one isn\'t confirmed yet.' },
      { id: 'p11', text: 'Update subscriptions and recurring deliveries with new address', category: 'admin' },
      { id: 'p12', text: 'Research new state vehicle registration requirements', category: 'admin' },
    ]
  },
  {
    id: 'countdown',
    label: 'Final Countdown',
    weeks: '2–8 weeks out',
    emoji: '🚀',
    color: 'from-amber-50 to-orange-50 border-amber-200',
    badgeColor: 'bg-amber-100 text-amber-700',
    items: [
      { id: 'f1', text: 'Pack your "Do Not Ship" essentials box — items you\'ll need immediately', category: 'moving', tip: 'Toilet paper, coffee maker, kids\' comfort items, important docs, laptop charger.' },
      { id: 'f2', text: 'Confirm pack-out and delivery dates with the moving company', category: 'moving' },
      { id: 'f3', text: 'Transfer prescriptions to a new pharmacy or mail-order', category: 'medical' },
      { id: 'f4', text: 'Update Power of Attorney and Will if needed', category: 'legal', tip: 'JAG office on base provides this free of charge.' },
      { id: 'f5', text: 'Plan your farewell — a gathering with your community', category: 'personal', tip: 'Honor the relationships you\'ve built here. These people are family.' },
      { id: 'f6', text: 'Confirm your travel itinerary (flights or drive route)', category: 'travel' },
      { id: 'f7', text: 'Book lodging along your travel route if driving', category: 'travel', tip: 'Military lodging (IHG Army Hotels, Navy Gateway) often has better rates.' },
      { id: 'f8', text: 'Gather originals of all important documents in a travel folder', category: 'admin', tip: 'Orders, IDs, birth certs, marriage cert, vehicle titles, shot records.' },
      { id: 'f9', text: 'Return library books, rentals, and borrowed items', category: 'personal' },
      { id: 'f10', text: 'Contact your new unit sponsor if assigned', category: 'admin' },
    ]
  },
  {
    id: 'movingweek',
    label: 'Moving Week!',
    weeks: '1 week out',
    emoji: '📦',
    color: 'from-teal-50 to-emerald-50 border-teal-200',
    badgeColor: 'bg-teal-100 text-teal-700',
    items: [
      { id: 'm1', text: 'Confirm movers have your new address and contact number', category: 'moving' },
      { id: 'm2', text: 'Eat down the fridge and freezer — toss what you can\'t use', category: 'home' },
      { id: 'm3', text: 'Schedule utility turn-off at current home', category: 'home' },
      { id: 'm4', text: 'Confirm utilities are scheduled to turn ON at new home', category: 'home' },
      { id: 'm5', text: 'Disassemble furniture the movers won\'t break down', category: 'moving' },
      { id: 'm6', text: 'Confirm pet travel arrangements are ready', category: 'pets' },
      { id: 'm7', text: 'Do a full walkthrough of current home — check every cabinet, closet', category: 'home' },
      { id: 'm8', text: 'Take photos of the home condition before movers arrive', category: 'moving', tip: 'Protect yourself from deposit disputes.' },
    ]
  },
]

export function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function getTotalItems(): number {
  return CHECKLIST_PHASES.reduce((sum, p) => sum + p.items.length, 0)
}

export function getCompletedCount(state: Record<string, boolean>): number {
  return Object.values(state).filter(Boolean).length
}
