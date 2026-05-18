"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Trash, ExternalLink, Home, Building } from "lucide-react"
import type { OrdersInfo, HousingOption } from "@/types"
import { cn } from "@/lib/utils"

const STATUS_COLORS: Record<string, string> = {
  researching: 'bg-slate-100 text-slate-600',
  applied:     'bg-blue-100 text-blue-700',
  waitlisted:  'bg-amber-100 text-amber-700',
  approved:    'bg-purple-100 text-purple-700',
  confirmed:   'bg-green-100 text-green-700',
}

const STATUS_EMOJI: Record<string, string> = {
  researching: '🔍',
  applied: '📬',
  waitlisted: '⏳',
  approved: '✅',
  confirmed: '🏠',
}

interface HousingTrackerProps {
  ordersInfo: OrdersInfo
}

const defaultOption = (): Partial<HousingOption> => ({
  name: '', type: 'off-base', monthlyRent: '', distance: '',
  bedrooms: '', notes: '', status: 'researching', phone: '', website: ''
})

export function HousingTracker({ ordersInfo }: HousingTrackerProps) {
  const [options, setOptions] = useState<HousingOption[]>([])
  const [newOption, setNewOption] = useState<Partial<HousingOption>>(defaultOption())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('pcs-housing')
    if (saved) setOptions(JSON.parse(saved))
  }, [])

  const save = (updated: HousingOption[]) => {
    setOptions(updated)
    localStorage.setItem('pcs-housing', JSON.stringify(updated))
  }

  const addOption = () => {
    if (!newOption.name) return
    const item: HousingOption = {
      id: crypto.randomUUID(),
      name: newOption.name || '',
      type: newOption.type as HousingOption['type'] || 'off-base',
      monthlyRent: newOption.monthlyRent || '',
      distance: newOption.distance || '',
      bedrooms: newOption.bedrooms || '',
      notes: newOption.notes || '',
      status: newOption.status as HousingOption['status'] || 'researching',
      phone: newOption.phone || '',
      website: newOption.website || '',
    }
    save([...options, item])
    setNewOption(defaultOption())
    setOpen(false)
  }

  const updateStatus = (id: string, status: HousingOption['status']) => {
    save(options.map(o => o.id === id ? { ...o, status } : o))
  }

  const remove = (id: string) => {
    save(options.filter(o => o.id !== id))
  }

  return (
    <div className="space-y-5">
      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-teal-50 to-sky-50 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Building className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-teal-800 text-sm">On-Base Housing</h3>
                <p className="text-xs text-teal-700 mt-1">Apply through the gaining installation&apos;s housing office. Ask about waitlists as soon as orders are received.</p>
                <a href="https://www.militaryonesource.mil/housing-and-home" target="_blank" rel="noopener"
                  className="text-xs text-teal-600 underline flex items-center gap-1 mt-2 hover:text-teal-800">
                  Military OneSource Housing <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Home className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 text-sm">BAH Reference</h3>
                <p className="text-xs text-amber-700 mt-1">Check current BAH rates for <strong>{ordersInfo.newStation}</strong> on the official DoD DTMO site before signing any lease.</p>
                <a href="https://www.defensetravel.dod.mil/site/bahCalc.cfm" target="_blank" rel="noopener"
                  className="text-xs text-amber-600 underline flex items-center gap-1 mt-2 hover:text-amber-800">
                  BAH Calculator <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Options list */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 flex items-center gap-2">
          <span>🏠</span> Housing Options Tracker
          <Badge variant="secondary">{options.length}</Badge>
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-teal-700 hover:bg-teal-800 text-white">
              <Plus className="h-4 w-4 mr-1" /> Add Option
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Housing Option</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <Label>Name / Property</Label>
                <Input placeholder="e.g. Elm Street Apts, Village Park on-base" value={newOption.name || ''}
                  onChange={e => setNewOption(n => ({ ...n, name: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Type</Label>
                  <Select value={newOption.type} onValueChange={v => setNewOption(n => ({ ...n, type: v as HousingOption['type'] }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on-base">On-Base</SelectItem>
                      <SelectItem value="off-base">Off-Base</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Status</Label>
                  <Select value={newOption.status} onValueChange={v => setNewOption(n => ({ ...n, status: v as HousingOption['status'] }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="researching">🔍 Researching</SelectItem>
                      <SelectItem value="applied">📬 Applied</SelectItem>
                      <SelectItem value="waitlisted">⏳ Waitlisted</SelectItem>
                      <SelectItem value="approved">✅ Approved</SelectItem>
                      <SelectItem value="confirmed">🏠 Confirmed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Monthly Rent/Cost</Label>
                  <Input placeholder="e.g. $1,800/mo" value={newOption.monthlyRent || ''}
                    onChange={e => setNewOption(n => ({ ...n, monthlyRent: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label>Bedrooms</Label>
                  <Input placeholder="e.g. 3BR/2BA" value={newOption.bedrooms || ''}
                    onChange={e => setNewOption(n => ({ ...n, bedrooms: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Distance to Base</Label>
                <Input placeholder="e.g. 10 min, 5 miles" value={newOption.distance || ''}
                  onChange={e => setNewOption(n => ({ ...n, distance: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label>Notes</Label>
                <Textarea placeholder="Pet policy, amenities, pros/cons..." value={newOption.notes || ''}
                  onChange={e => setNewOption(n => ({ ...n, notes: e.target.value }))} rows={2} />
              </div>
              <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white" onClick={addOption}>
                Add to Tracker
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {options.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center text-muted-foreground">
            <p className="text-4xl mb-3">🏠</p>
            <p className="font-medium">No housing options yet</p>
            <p className="text-sm">Add options you&apos;re researching to compare and track status</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map(opt => (
            <Card key={opt.id} className={cn(
              "border-2",
              opt.status === 'confirmed' ? 'border-green-400 bg-green-50' : 'border-slate-200'
            )}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-sm">{opt.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <Badge variant="outline" className="text-xs capitalize">{opt.type.replace('-', ' ')}</Badge>
                      {opt.bedrooms && <Badge variant="outline" className="text-xs">{opt.bedrooms}</Badge>}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600"
                    onClick={() => remove(opt.id)}>
                    <Trash className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="flex gap-3 text-xs text-muted-foreground mb-3">
                  {opt.monthlyRent && <span>💰 {opt.monthlyRent}</span>}
                  {opt.distance && <span>📍 {opt.distance}</span>}
                </div>

                {opt.notes && (
                  <p className="text-xs text-slate-600 bg-slate-50 rounded p-2 mb-3">{opt.notes}</p>
                )}

                <Select value={opt.status} onValueChange={v => updateStatus(opt.id, v as HousingOption['status'])}>
                  <SelectTrigger className={cn("h-8 text-xs", STATUS_COLORS[opt.status])}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUS_EMOJI).map(([val, emoji]) => (
                      <SelectItem key={val} value={val} className="text-xs">
                        {emoji} {val.charAt(0).toUpperCase() + val.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tips */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-slate-700 text-sm mb-2">💡 Housing Pro Tips</h3>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li>• <strong>Join Facebook groups</strong> for your new installation — spouses groups post housing leads constantly.</li>
            <li>• <strong>Request a floor plan</strong> before committing — military homes have specific layouts that may affect furniture placement.</li>
            <li>• <strong>Ask about pet deposits</strong> and breed restrictions early — many off-base places have strict policies.</li>
            <li>• <strong>Temporary Lodging Allowance (TLA/TLE)</strong> covers short-term stays while you wait for permanent housing.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
