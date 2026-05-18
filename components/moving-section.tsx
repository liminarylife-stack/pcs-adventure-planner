"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Package, ExternalLink, CheckCircle } from "lucide-react"
import type { OrdersInfo } from "@/types"
import { cn } from "@/lib/utils"

interface MovingSectionProps {
  ordersInfo: OrdersInfo
}

type MoveMethod = 'hhg' | 'ppm' | 'split' | ''

const ESSENTIALS_ITEMS = [
  { id: 'e1', text: 'Important documents (orders, IDs, titles, birth certs)', emoji: '📄' },
  { id: 'e2', text: 'Laptop, chargers, and tablets', emoji: '💻' },
  { id: 'e3', text: 'Phone chargers and power banks', emoji: '🔌' },
  { id: 'e4', text: 'Medications (30-day supply minimum)', emoji: '💊' },
  { id: 'e5', text: 'Toiletries and bathroom essentials', emoji: '🪥' },
  { id: 'e6', text: 'Toilet paper (always first thing you need!)', emoji: '🧻' },
  { id: 'e7', text: 'Coffee maker and coffee', emoji: '☕' },
  { id: 'e8', text: 'Snacks and easy-prep food', emoji: '🍫' },
  { id: 'e9', text: 'Kids\' comfort items (stuffed animals, favorites)', emoji: '🧸' },
  { id: 'e10', text: 'Pet food, bowls, and leash', emoji: '🐾' },
  { id: 'e11', text: 'Change of clothes for each family member (3–5 days)', emoji: '👕' },
  { id: 'e12', text: 'Bedding / sleeping bags for first night', emoji: '🛏️' },
  { id: 'e13', text: 'Basic toolkit (screwdrivers, drill, Allen keys)', emoji: '🔧' },
  { id: 'e14', text: 'Cleaning supplies for move-out and move-in', emoji: '🧹' },
  { id: 'e15', text: 'Paper plates, cups, plastic utensils', emoji: '🍽️' },
  { id: 'e16', text: 'Cash for tips, tolls, and emergencies', emoji: '💵' },
]

export function MovingSection({ ordersInfo }: MovingSectionProps) {
  const [method, setMethod] = useState<MoveMethod>('')
  const [essentials, setEssentials] = useState<Record<string, boolean>>({})
  const [contacts, setContacts] = useState({ tmo: '', sponsor: '', housing: '', newUnit: '' })

  useEffect(() => {
    const sm = localStorage.getItem('pcs-movemethod')
    if (sm) setMethod(sm as MoveMethod)
    const se = localStorage.getItem('pcs-essentials')
    if (se) setEssentials(JSON.parse(se))
    const sc = localStorage.getItem('pcs-contacts')
    if (sc) setContacts(JSON.parse(sc))
  }, [])

  const saveMethod = (m: MoveMethod) => {
    setMethod(m)
    localStorage.setItem('pcs-movemethod', m)
  }

  const toggleEssential = (id: string) => {
    const updated = { ...essentials, [id]: !essentials[id] }
    setEssentials(updated)
    localStorage.setItem('pcs-essentials', JSON.stringify(updated))
  }

  const updateContact = (key: string, val: string) => {
    const updated = { ...contacts, [key]: val }
    setContacts(updated)
    localStorage.setItem('pcs-contacts', JSON.stringify(updated))
  }

  const essentialsDone = ESSENTIALS_ITEMS.filter(i => essentials[i.id]).length

  return (
    <div className="space-y-5">
      {/* Method Picker */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="h-4 w-4 text-teal-600" />
            Choose Your Moving Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                key: 'hhg' as MoveMethod,
                title: 'Full HHG',
                emoji: '🚚',
                desc: 'Government-contracted movers pack, load, move, and deliver everything.',
                pros: ['Least effort for you', 'Government pays directly', 'More liability coverage'],
                cons: ['Less control over dates', 'Damage claims can be slow', 'Pack-out dates may shift'],
              },
              {
                key: 'ppm' as MoveMethod,
                title: 'PPM / DITY',
                emoji: '🚛',
                desc: 'You move yourself and get paid up to 100% of what the government would have spent.',
                pros: ['Can earn extra cash', 'Full control over timeline', 'You know what\'s packed'],
                cons: ['You do the work', 'Liable for your own items', 'Need to rent a truck'],
              },
              {
                key: 'split' as MoveMethod,
                title: 'Split Shipment',
                emoji: '📦',
                desc: 'Split between HHG (large items) and a smaller PPM (valuables/car).',
                pros: ['Best of both worlds', 'Valuables with you', 'Flexible'],
                cons: ['More coordination', 'Two sets of dates to track'],
              },
            ].map(opt => (
              <button
                key={opt.key}
                onClick={() => saveMethod(opt.key)}
                className={cn(
                  "text-left border-2 rounded-xl p-4 transition-all",
                  method === opt.key
                    ? "border-teal-500 bg-teal-50 shadow-md"
                    : "border-slate-200 hover:border-teal-300 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="font-semibold text-sm">{opt.title}</span>
                  {method === opt.key && <CheckCircle className="h-4 w-4 text-teal-600 ml-auto" />}
                </div>
                <p className="text-xs text-slate-600 mb-2">{opt.desc}</p>
                <div className="space-y-1">
                  {opt.pros.map(p => <p key={p} className="text-xs text-green-700">✓ {p}</p>)}
                  {opt.cons.map(c => <p key={c} className="text-xs text-red-600">✗ {c}</p>)}
                </div>
              </button>
            ))}
          </div>

          {method && (
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
              <p className="text-sm text-teal-700 font-medium">Next Step:</p>
              {method === 'hhg' && <p className="text-xs text-teal-600 mt-1">Schedule your HHG pack-out via <a className="underline" href="https://www.move.mil" target="_blank" rel="noopener">move.mil</a> or your TMO office as soon as possible — summer slots fill up fast!</p>}
              {method === 'ppm' && <p className="text-xs text-teal-600 mt-1">Get a weight ticket before AND after loading. Use the <a className="underline" href="https://www.move.mil" target="_blank" rel="noopener">move.mil PPM calculator</a> to estimate your incentive payment.</p>}
              {method === 'split' && <p className="text-xs text-teal-600 mt-1">Coordinate both shipments through your TMO office. Get your PPM weight tickets for the self-move portion.</p>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Key Contacts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">📞 Key Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'tmo', label: 'TMO / Transportation Office', placeholder: 'Name and phone number' },
              { key: 'sponsor', label: 'Gaining Unit Sponsor', placeholder: 'Name and contact' },
              { key: 'housing', label: 'Housing Office (New Station)', placeholder: 'Phone or email' },
              { key: 'newUnit', label: 'New Unit POC', placeholder: 'Name and contact' },
            ].map(c => (
              <div key={c.key} className="space-y-1">
                <label className="text-xs font-medium text-slate-600">{c.label}</label>
                <Input
                  placeholder={c.placeholder}
                  value={contacts[c.key as keyof typeof contacts]}
                  onChange={e => updateContact(c.key, e.target.value)}
                  className="text-sm h-9"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Essentials Box */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">🎒 Essentials Box Packer</CardTitle>
            <Badge variant="secondary">{essentialsDone}/{ESSENTIALS_ITEMS.length} packed</Badge>
          </div>
          <p className="text-xs text-muted-foreground">Items to keep WITH you — never put these in the moving truck</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {ESSENTIALS_ITEMS.map(item => (
              <div key={item.id} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-slate-50">
                <Checkbox
                  id={item.id}
                  checked={!!essentials[item.id]}
                  onCheckedChange={() => toggleEssential(item.id)}
                />
                <label htmlFor={item.id} className={cn(
                  "text-xs cursor-pointer flex items-center gap-1.5",
                  essentials[item.id] ? "line-through text-muted-foreground" : "text-slate-700"
                )}>
                  <span>{item.emoji}</span> {item.text}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="bg-slate-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm text-slate-700 mb-2">📚 Moving Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { text: "Move.mil — Official PCS Portal", url: "https://www.move.mil" },
              { text: "Defense Personal Property System", url: "https://dps.move.mil" },
              { text: "File a Claims Report", url: "https://www.militaryonesource.mil/moving-housing/moving/after-the-move/filing-a-moving-claim/" },
              { text: "PCS Checklist — Military OneSource", url: "https://www.militaryonesource.mil/moving-housing/moving/planning-your-move/pcs-moving-checklist/" },
            ].map(r => (
              <a key={r.url} href={r.url} target="_blank" rel="noopener"
                className="flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 underline">
                <ExternalLink className="h-3 w-3 flex-shrink-0" /> {r.text}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
