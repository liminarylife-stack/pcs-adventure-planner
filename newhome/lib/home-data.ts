import type { UnpackRoom, Milestone } from "@/types"

export interface SettleCategory {
  id: string
  label: string
  emoji: string
  color: string
  badgeColor: string
  items: SettleItem[]
}

export interface SettleItem {
  id: string
  text: string
  tip?: string
  kidsOnly?: boolean
  petsOnly?: boolean
}

export const SETTLE_CATEGORIES: SettleCategory[] = [
  {
    id: 'military',
    label: 'Military In-Processing',
    emoji: '🎖️',
    color: 'from-teal-50 to-emerald-50 border-teal-200',
    badgeColor: 'bg-teal-100 text-teal-700',
    items: [
      { id: 'm1', text: 'Report to new unit on your report date', tip: 'Bring orders, IDs, and all paperwork.' },
      { id: 'm2', text: 'Complete installation in-processing checklist', tip: 'Every installation has its own requirements — get the list from your unit.' },
      { id: 'm3', text: 'Get base access/ID card sticker for vehicles', tip: 'You\'ll need this before you can gate-guard stress every morning!' },
      { id: 'm4', text: 'Update DEERS with new address', tip: 'Login at milConnect.dmdc.osd.mil or visit the nearest ID card office.' },
      { id: 'm5', text: 'Update your pay/direct deposit info if needed', tip: 'Any address or banking changes go through your unit\'s S1/Finance.' },
      { id: 'm6', text: 'Follow up with sponsor — get local "insider" tips', tip: 'They know which gate is fastest, where to eat, what to avoid!' },
      { id: 'm7', text: 'Register for post/base privileges (gym, commissary, exchange)' },
    ]
  },
  {
    id: 'legal',
    label: 'Legal & ID',
    emoji: '🪪',
    color: 'from-violet-50 to-purple-50 border-violet-200',
    badgeColor: 'bg-violet-100 text-violet-700',
    items: [
      { id: 'l1', text: 'Get new state driver\'s license', tip: 'Most states give you 30–60 days after establishing residency.' },
      { id: 'l2', text: 'Register vehicle(s) in new state', tip: 'Usually done at the same time as the driver\'s license at the DMV.' },
      { id: 'l3', text: 'Update voter registration', tip: 'Military members can register at the new installation or keep home-of-record registration.' },
      { id: 'l4', text: 'Update car insurance for new state', tip: 'Some states have different minimum coverage requirements.' },
      { id: 'l5', text: 'Update will and POA if new state laws apply', tip: 'Free through the JAG office on base.' },
    ]
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    emoji: '🏥',
    color: 'from-rose-50 to-pink-50 border-rose-200',
    badgeColor: 'bg-rose-100 text-rose-700',
    items: [
      { id: 'h1', text: 'Establish primary care at the MTF or find TRICARE provider', tip: 'Call the MTF first — it\'s free and on-base access is convenient.' },
      { id: 'h2', text: 'Transfer prescriptions to new pharmacy (MTF or local)', tip: 'Mail-order through TRICARE is often the cheapest option.' },
      { id: 'h3', text: 'Establish dental care', tip: 'On-base dental clinics are usually available for active duty families.' },
      { id: 'h4', text: 'Schedule new patient appointments for kids', kidsOnly: true, tip: 'Pediatrician and dentist — try to book before school starts.' },
      { id: 'h5', text: 'Find a new vet and transfer pet records', petsOnly: true },
      { id: 'h6', text: 'Transfer any specialist referrals that were in progress', tip: 'Contact your old PCM to send referral documentation to the new provider.' },
    ]
  },
  {
    id: 'home',
    label: 'Home Setup',
    emoji: '🏠',
    color: 'from-amber-50 to-orange-50 border-amber-200',
    badgeColor: 'bg-amber-100 text-amber-700',
    items: [
      { id: 'ho1', text: 'Confirm all utilities are active (electric, water, gas)', tip: 'Run every faucet, flip every switch on day one.' },
      { id: 'ho2', text: 'Get internet / WiFi set up', tip: 'Ask your sponsor or neighbor who they use — options vary a lot by area.' },
      { id: 'ho3', text: 'Set up renter\'s or homeowner\'s insurance for new home', tip: 'USAA has great rates for military families.' },
      { id: 'ho4', text: 'Change address with USPS (if not already done)', tip: 'usps.com/move — takes 5 minutes.' },
      { id: 'ho5', text: 'Update address with bank, credit cards, subscriptions', tip: 'Check your bank app — they often have a bulk address update.' },
      { id: 'ho6', text: 'Find nearest grocery store, pharmacy, and urgent care', tip: 'Ask your sponsor or the spouse Facebook group for local favorites.' },
      { id: 'ho7', text: 'Learn your trash and recycling pickup schedule', tip: 'Your landlord or HOA should have this. On-base, ask at housing.' },
    ]
  },
  {
    id: 'schools',
    label: 'Schools',
    emoji: '🏫',
    color: 'from-sky-50 to-blue-50 border-sky-200',
    badgeColor: 'bg-sky-100 text-sky-700',
    items: [
      { id: 'sc1', text: 'Confirm school enrollment is complete and receive class schedule', kidsOnly: true },
      { id: 'sc2', text: 'Set up school transportation (bus route or carpool)', kidsOnly: true },
      { id: 'sc3', text: 'Buy school supplies and first-day outfit', kidsOnly: true, tip: 'Let kids pick something special — it builds excitement!' },
      { id: 'sc4', text: 'Introduce yourself to teachers via email before first day', kidsOnly: true, tip: 'A quick note saying your family just PCS\'d goes a long way.' },
      { id: 'sc5', text: 'Find out about after-school activities and sign-ups', kidsOnly: true },
      { id: 'sc6', text: 'Plan a "first day of school" photo spot at the new home', kidsOnly: true, tip: 'A new home, a new chapter — document it!' },
    ]
  },
  {
    id: 'community',
    label: 'Community & Connection',
    emoji: '🤝',
    color: 'from-lime-50 to-green-50 border-lime-200',
    badgeColor: 'bg-lime-100 text-lime-700',
    items: [
      { id: 'co1', text: 'Introduce yourself to at least 2 neighbors within the first week', tip: 'Military neighborhoods are often the most welcoming communities you\'ll ever find.' },
      { id: 'co2', text: 'Join the installation FRG, Key Spouse program, or spouse group', tip: 'Even if it\'s not your thing — it\'s the fastest way to find your people.' },
      { id: 'co3', text: 'Find a church, gym, club, or hobby group to plug into', tip: 'Connection is the antidote to the loneliness of a new installation.' },
      { id: 'co4', text: 'Attend one base event or community activity in the first month', tip: 'MWR events, chapel activities, spouse coffees — get out there!' },
      { id: 'co5', text: 'Find at least one "your place" — a coffee shop, trail, spot you love', tip: 'Having a place that feels like yours speeds up the sense of belonging.' },
    ]
  },
]

export const DEFAULT_ROOMS: Omit<UnpackRoom, 'id'>[] = [
  { name: 'Kitchen',          emoji: '🍳', status: 'not-started', notes: '' },
  { name: 'Living Room',      emoji: '🛋️', status: 'not-started', notes: '' },
  { name: 'Master Bedroom',   emoji: '🛏️', status: 'not-started', notes: '' },
  { name: 'Bathrooms',        emoji: '🚿', status: 'not-started', notes: '' },
  { name: 'Kids\' Bedroom',   emoji: '🧸', status: 'not-started', notes: '' },
  { name: 'Dining Room',      emoji: '🍽️', status: 'not-started', notes: '' },
  { name: 'Office / Study',   emoji: '💻', status: 'not-started', notes: '' },
  { name: 'Garage / Storage', emoji: '📦', status: 'not-started', notes: '' },
]

export const DEFAULT_MILESTONES: Omit<Milestone, 'id'>[] = [
  { emoji: '🏠', title: 'First Night in the New Home', description: 'You slept here for the first time. Welcome home.', achieved: false, achievedDate: '' },
  { emoji: '☕', title: 'First Morning Coffee', description: 'Coffee in your own kitchen. The boxes can wait.', achieved: false, achievedDate: '' },
  { emoji: '🍕', title: 'First Meal (or takeout!)', description: 'You fed your family in the new home. Hero status.', achieved: false, achievedDate: '' },
  { emoji: '🛏️', title: 'All Beds Assembled', description: 'Everyone has a real bed. The hardest part is over.', achieved: false, achievedDate: '' },
  { emoji: '📦', title: 'Last Box Unpacked', description: 'Every. Single. Box. Done.', achieved: false, achievedDate: '' },
  { emoji: '🏫', title: 'Kids\' First Day of School', description: 'They walked in brave. You held it together (mostly).', achieved: false, achievedDate: '' },
  { emoji: '🤝', title: 'Met a Neighbor', description: 'A hello, a wave, or a "welcome to the neighborhood."', achieved: false, achievedDate: '' },
  { emoji: '🗺️', title: 'First Local Adventure', description: 'You explored somewhere new in your new hometown.', achieved: false, achievedDate: '' },
  { emoji: '😌', title: 'First Time It Felt Like Home', description: 'You can\'t plan this one — but you\'ll know when it happens.', achieved: false, achievedDate: '' },
]

export const PLACE_CATEGORIES = [
  '🛒 Grocery', '💊 Pharmacy', '🏥 Urgent Care', '☕ Coffee',
  '🍕 Favorite Restaurant', '🏋️ Gym / Fitness', '📚 Library',
  '🐾 Vet', '✂️ Hair / Salon', '🏖️ Park / Trail', '🏫 School',
  '⛽ Gas Station', '🔧 Auto Shop', '🛍️ Shopping', '📦 Other'
]
