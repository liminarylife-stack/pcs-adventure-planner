"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink, Plus, Trash, Star } from "lucide-react"
import type { OrdersInfo } from "@/types"
import { cn } from "@/lib/utils"

interface CommunitySectionProps {
  ordersInfo: OrdersInfo
}

const BASE_RESOURCES = [
  { emoji: '🏥', name: 'Military Treatment Facility (MTF)', desc: 'On-base medical care. Establish TRICARE care ASAP.' },
  { emoji: '🦷', name: 'Dental Clinic', desc: 'Schedule cleanings and establish care for the family.' },
  { emoji: '💼', name: 'Airman/Family Readiness Center', desc: 'Employment help, financial counseling, relocation assistance.' },
  { emoji: '🏋️', name: 'Fitness Center', desc: 'Free for active duty and dependents. Great way to meet people.' },
  { emoji: '📚', name: 'Base Library', desc: 'Often has programs for kids, quiet study space, and free resources.' },
  { emoji: '🛒', name: 'Commissary & Exchange', desc: 'Tax-free grocery and retail shopping on base.' },
  { emoji: '🙏', name: 'Chapel / Chaplain', desc: 'Multi-faith services and counseling for all, regardless of belief.' },
  { emoji: '👶', name: 'Child Development Center (CDC)', desc: 'On-base childcare — add your name to waitlists immediately.' },
  { emoji: '🎯', name: 'Morale, Welfare & Recreation (MWR)', desc: 'Discounted tickets, outdoor gear rentals, events, and more.' },
  { emoji: '⚖️', name: 'Legal Assistance Office', desc: 'Free legal help for active duty — wills, POA, notary, consumer issues.' },
]

const SETTLE_IN_CHECKLIST = [
  { id: 's1', text: 'Visit your installation\'s welcome center or ACS/AFRC within the first week' },
  { id: 's2', text: 'Register vehicle in new state (usually within 30 days)' },
  { id: 's3', text: 'Get new state driver\'s license' },
  { id: 's4', text: 'Establish primary care at the MTF or find a TRICARE provider' },
  { id: 's5', text: 'Enroll kids in school' },
  { id: 's6', text: 'Update your address: DFAS, bank, insurance, subscriptions, VA if applicable' },
  { id: 's7', text: 'Find the commissary, exchange, and base gym' },
  { id: 's8', text: 'Introduce yourself to neighbors — military neighborhoods are often very welcoming' },
  { id: 's9', text: 'Join the installation\'s FRG, Key Spouse program, or spouse group' },
  { id: 's10', text: 'Plan your first local adventure — explore the new area!' },
]

export function CommunitySection({ ordersInfo }: CommunitySectionProps) {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})
  const [bucketList, setBucketList] = useState<string[]>([])
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    const sc = localStorage.getItem('pcs-settle-checklist')
    if (sc) setChecklist(JSON.parse(sc))
    const sb = localStorage.getItem('pcs-bucket-list')
    if (sb) setBucketList(JSON.parse(sb))
  }, [])

  const toggle = (id: string) => {
    const updated = { ...checklist, [id]: !checklist[id] }
    setChecklist(updated)
    localStorage.setItem('pcs-settle-checklist', JSON.stringify(updated))
  }

  const addBucket = () => {
    if (!newItem.trim()) return
    const updated = [...bucketList, newItem.trim()]
    setBucketList(updated)
    localStorage.setItem('pcs-bucket-list', JSON.stringify(updated))
    setNewItem('')
  }

  const removeBucket = (idx: number) => {
    const updated = bucketList.filter((_, i) => i !== idx)
    setBucketList(updated)
    localStorage.setItem('pcs-bucket-list', JSON.stringify(updated))
  }

  const done = SETTLE_IN_CHECKLIST.filter(i => checklist[i.id]).length

  return (
    <div className="space-y-5">
      {/* Adventure framing */}
      <Card className="bg-gradient-to-r from-teal-700 to-slate-700 text-white border-0">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <span className="text-3xl flex-shrink-0">🌟</span>
            <div>
              <h3 className="font-bold text-lg">Welcome to Your New Adventure</h3>
              <p className="text-teal-200 text-sm mt-1">
                {ordersInfo.newStation} is waiting for you. Every duty station has hidden gems, amazing people, and experiences you haven&apos;t discovered yet. This is your permission to explore!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settle-in checklist */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">✅ After You Arrive Checklist</CardTitle>
            <Badge variant="secondary">{done}/{SETTLE_IN_CHECKLIST.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {SETTLE_IN_CHECKLIST.map(item => (
              <div key={item.id} className="flex items-start gap-3 py-1.5 px-2 rounded hover:bg-slate-50">
                <Checkbox
                  id={item.id}
                  checked={!!checklist[item.id]}
                  onCheckedChange={() => toggle(item.id)}
                  className="mt-0.5"
                />
                <label htmlFor={item.id} className={cn(
                  "text-sm cursor-pointer",
                  checklist[item.id] ? "line-through text-muted-foreground" : "text-slate-700"
                )}>
                  {item.text}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Base Resources */}
      <div>
        <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          🏛️ Installation Resources to Know
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BASE_RESOURCES.map(r => (
            <Card key={r.name} className="bg-slate-50 border-slate-200">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <span className="text-lg flex-shrink-0">{r.emoji}</span>
                  <div>
                    <p className="font-medium text-xs text-slate-800">{r.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{r.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Adventure Bucket List */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            Adventure Bucket List for {ordersInfo.newStation}
          </CardTitle>
          <p className="text-xs text-amber-700">Make a list of things to experience in your new home — turning a move into an adventure!</p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="e.g. Hike to the waterfall, try the local taco spot..."
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addBucket()}
              className="text-sm bg-white"
            />
            <Button size="icon" onClick={addBucket} className="bg-amber-500 hover:bg-amber-600 text-white flex-shrink-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {bucketList.length === 0 ? (
            <p className="text-xs text-amber-600 text-center py-3 italic">
              Add your first adventure idea above! Think: local parks, restaurants to try, day trips, events, sports teams...
            </p>
          ) : (
            <div className="space-y-1.5">
              {bucketList.map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/70 rounded-lg px-3 py-2">
                  <span className="text-amber-500">⭐</span>
                  <span className="flex-1 text-sm text-slate-700">{item}</span>
                  <button onClick={() => removeBucket(i)} className="text-red-400 hover:text-red-600">
                    <Trash className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Community Links */}
      <Card className="bg-slate-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-slate-700 text-sm mb-3">🔗 Community Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { text: "Military OneSource", url: "https://www.militaryonesource.mil" },
              { text: "Military Spouse Magazine", url: "https://www.militaryspouse.com" },
              { text: "SECO — Spouse Employment", url: "https://myseco.militaryonesource.mil" },
              { text: "Blue Star Families", url: "https://bluestarfam.org" },
              { text: "National Military Family Association", url: "https://www.militaryfamily.org" },
              { text: "FindMilitaryBase.com", url: "https://www.militaryinstallations.dod.mil" },
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
