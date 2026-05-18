export interface DayPhase {
  id: string
  label: string
  emoji: string
  tagline: string
  accent: string
  headerBg: string
  items: DayItem[]
}

export interface DayItem {
  id: string
  text: string
  urgent?: boolean
  tip?: string
}

export const DAY_PHASES: DayPhase[] = [
  {
    id: 'before',
    label: 'Before Movers Arrive',
    emoji: '🌅',
    tagline: 'Set yourself up for success',
    accent: 'text-amber-400',
    headerBg: 'from-amber-950 to-stone-900',
    items: [
      { id: 'b1', text: 'Walk every room — shoot a video walkthrough for your records', urgent: true, tip: 'This is your insurance protection. Do this FIRST.' },
      { id: 'b2', text: 'Eat a real breakfast — it\'s going to be a long day', tip: 'Seriously. Don\'t skip this.' },
      { id: 'b3', text: 'Charge your phone and grab a portable charger', urgent: true },
      { id: 'b4', text: 'Move pets to the car, boarding, or a friend\'s place', tip: 'Pets + movers = chaos. Get them out early.' },
      { id: 'b5', text: 'Set your essentials box clearly aside — label it "DO NOT LOAD"', urgent: true, tip: 'Bright tape or a sticky note. Make it obvious.' },
      { id: 'b6', text: 'Have cash ready for mover tips', tip: '$20–50 per mover is standard for a good job.' },
      { id: 'b7', text: 'Put your important documents folder in your personal bag', urgent: true },
      { id: 'b8', text: 'Confirm mover arrival time — call if it\'s within 30 min of arrival' },
      { id: 'b9', text: 'Lay out colored room labels or signs if using a labeling system' },
      { id: 'b10', text: 'Tell kids the plan for the day so they feel prepared', tip: 'Give them a job — they\'ll feel helpful and stay out of the way.' },
    ]
  },
  {
    id: 'loading',
    label: 'While Loading',
    emoji: '📦',
    tagline: 'Stay present — watch everything',
    accent: 'text-orange-400',
    headerBg: 'from-orange-950 to-stone-900',
    items: [
      { id: 'l1', text: 'STAY HOME the entire time — do not leave movers unattended', urgent: true },
      { id: 'l2', text: 'Walk each room as movers clear it — verify nothing is left behind' },
      { id: 'l3', text: 'Note any pre-existing damage on the inventory sheet BEFORE they load it', urgent: true, tip: 'Note scratches, dents, etc. This protects your claims.' },
      { id: 'l4', text: 'Keep valuables with you: documents, jewelry, laptop, medications', urgent: true },
      { id: 'l5', text: 'Check garage, attic, shed, and storage areas — easy to forget!' },
      { id: 'l6', text: 'Confirm your delivery address with the driver', urgent: true },
      { id: 'l7', text: 'Confirm your new home phone number with the driver in case of delivery questions' },
      { id: 'l8', text: 'Watch that essentials box stays off the truck', urgent: true },
      { id: 'l9', text: 'Offer movers water and bathroom access — they work hard in the heat' },
      { id: 'l10', text: 'Take photos of high-value items before they\'re wrapped', tip: 'TV, art, furniture — document condition now.' },
    ]
  },
  {
    id: 'departure',
    label: 'Before You Leave',
    emoji: '🔑',
    tagline: 'The final walkthrough — leave nothing behind',
    accent: 'text-rose-400',
    headerBg: 'from-rose-950 to-stone-900',
    items: [
      { id: 'd1', text: 'Walk EVERY room: open every closet, cabinet, and drawer', urgent: true },
      { id: 'd2', text: 'Check appliances: fridge, oven, washer/dryer — anything left inside?' },
      { id: 'd3', text: 'Check outside: hose, garden tools, outdoor furniture, AC units' },
      { id: 'd4', text: 'Return all keys: house keys, mailbox key, garage remotes, gate fobs', urgent: true },
      { id: 'd5', text: 'Take "empty home" photos — every room, front and back yard', tip: 'Critical for your deposit and any disputes.' },
      { id: 'd6', text: 'Review and sign the Bill of Lading — read it before you sign!', urgent: true, tip: 'This is your legal contract. Make sure everything is correct.' },
      { id: 'd7', text: 'Get the driver\'s direct cell number and estimated delivery date', urgent: true },
      { id: 'd8', text: 'Confirm the delivery window in writing (text or email with driver)', tip: 'Drivers can\'t always deliver on exactly the agreed day — know your window.' },
      { id: 'd9', text: 'Take one last look around — and breathe. You\'ve got this.' },
    ]
  },
  {
    id: 'enroute',
    label: 'On the Road',
    emoji: '🚗',
    tagline: 'Drive safe — adventure ahead',
    accent: 'text-sky-400',
    headerBg: 'from-sky-950 to-slate-900',
    items: [
      { id: 'r1', text: 'Gas up before hitting the highway', tip: 'Don\'t trust gas availability near the base in a new area.' },
      { id: 'r2', text: 'Text your gaining unit sponsor that you\'re en route' },
      { id: 'r3', text: 'Review your route and note pet-friendly rest stops', tip: 'Bring extra pee pads for long travel days with pets.' },
      { id: 'r4', text: 'Important documents are in the car with you — confirm', urgent: true },
      { id: 'r5', text: 'Check in with the moving company to reconfirm delivery window' },
      { id: 'r6', text: 'Take a final photo of your old home as you pull away 📸', tip: 'You\'ll treasure this someday.' },
      { id: 'r7', text: 'Plan one fun stop along the route — make it an adventure for the family' },
      { id: 'r8', text: 'Confirm new home access: key pickup, codes, or landlord meetup time', urgent: true },
    ]
  },
  {
    id: 'arrival',
    label: 'At the New Home',
    emoji: '🏠',
    tagline: 'You made it — welcome home!',
    accent: 'text-teal-400',
    headerBg: 'from-teal-950 to-slate-900',
    items: [
      { id: 'a1', text: 'Arrive before the movers if at all possible', tip: 'You need time to check the home before they start unloading.' },
      { id: 'a2', text: 'Do a walkthrough of the new home BEFORE unloading begins', urgent: true, tip: 'Photo-document any pre-existing damage in the new home.' },
      { id: 'a3', text: 'Confirm utilities are on: electric, water, gas, internet' },
      { id: 'a4', text: 'Direct movers: tell them which room each item goes — be specific' },
      { id: 'a5', text: 'Cross-reference the inventory — account for every box and item', urgent: true },
      { id: 'a6', text: 'Note ANY damage on the delivery paperwork BEFORE signing', urgent: true, tip: 'Once you sign without noting it, it becomes very hard to claim.' },
      { id: 'a7', text: 'Open and unpack your essentials box first 🎒' },
      { id: 'a8', text: 'Tip the movers if they did a good job — cash', tip: '$20–50 per mover.' },
      { id: 'a9', text: 'Take a family photo in front of your new home 📸', tip: 'This is a moment. Capture it.' },
      { id: 'a10', text: 'Order dinner — no one should have to cook tonight 🍕' },
    ]
  },
]

export const DEFAULT_ROOMS = [
  'Living Room', 'Master Bedroom', 'Bedroom 2', 'Kitchen',
  'Bathrooms', 'Garage', 'Storage / Attic', 'Dining Room'
]

export const DEFAULT_ESSENTIALS: { name: string; location: 'with-me' | 'essentials-box' | 'unknown' }[] = [
  { name: '📄 Important Documents Folder', location: 'with-me' },
  { name: '💊 Medications (all family members)', location: 'with-me' },
  { name: '💻 Laptops & Chargers', location: 'with-me' },
  { name: '🔑 Keys to New Home', location: 'with-me' },
  { name: '📱 Phone Chargers & Power Bank', location: 'with-me' },
  { name: '🎒 Kids\' Backpacks & Comfort Items', location: 'essentials-box' },
  { name: '☕ Coffee Maker', location: 'essentials-box' },
  { name: '🍽️ Paper Plates, Cups & Utensils', location: 'essentials-box' },
  { name: '🧻 Toilet Paper & Paper Towels', location: 'essentials-box' },
  { name: '🛏️ Bedding / Sleeping Bags', location: 'essentials-box' },
  { name: '🔧 Basic Toolkit', location: 'essentials-box' },
  { name: '🐾 Pet Food, Bowls & Leash', location: 'with-me' },
  { name: '📋 Moving Paperwork / Bill of Lading', location: 'with-me' },
  { name: '💵 Cash for Tips & Emergencies', location: 'with-me' },
]

export function getTotalItems(): number {
  return DAY_PHASES.reduce((s, p) => s + p.items.length, 0)
}

export function getCompletedCount(state: Record<string, boolean>): number {
  return Object.values(state).filter(Boolean).length
}

export function getCurrentPhase(state: Record<string, boolean>): string {
  for (const phase of DAY_PHASES) {
    const done = phase.items.filter(i => state[i.id]).length
    if (done < phase.items.length) return phase.id
  }
  return 'arrival'
}
