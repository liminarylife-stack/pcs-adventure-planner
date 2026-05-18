"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { HomeInfo } from "@/types"

const BRANCHES = ['Army', 'Navy', 'Marine Corps', 'Air Force', 'Space Force', 'Coast Guard']

interface HomeSetupProps {
  onSave: (info: HomeInfo) => void
  existing?: HomeInfo | null
}

export function HomeSetup({ onSave, existing }: HomeSetupProps) {
  const [form, setForm] = useState<HomeInfo>(existing || {
    familyName: '', newStation: '', newAddress: '',
    arrivalDate: new Date().toISOString().split('T')[0],
    branch: '', hasKids: false, hasPets: false,
  })
  const set = (k: keyof HomeInfo, v: unknown) => setForm(f => ({ ...f, [k]: v }))
  const canSave = form.familyName && form.newStation && form.arrivalDate

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-700 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🏠</div>
          <h1 className="text-3xl font-bold text-white mb-2">You Made It!</h1>
          <p className="text-emerald-100 text-lg">Welcome to your new home. Let&apos;s get settled.</p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardContent className="p-7 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <Label>Family Name</Label>
                <Input placeholder="e.g. The Johnson Family" value={form.familyName}
                  onChange={e => set('familyName', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Branch of Service</Label>
                <Select value={form.branch} onValueChange={v => set('branch', v)}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {BRANCHES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Arrival Date</Label>
                <Input type="date" value={form.arrivalDate} onChange={e => set('arrivalDate', e.target.value)} />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label>New Duty Station</Label>
                <Input placeholder="e.g. Fort Campbell, KY" value={form.newStation}
                  onChange={e => set('newStation', e.target.value)} />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label>New Home Address</Label>
                <Input placeholder="Your new address" value={form.newAddress}
                  onChange={e => set('newAddress', e.target.value)} />
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-600">Who&apos;s settling in with you?</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Kids</p>
                  <p className="text-xs text-muted-foreground">Unlocks school-specific tasks</p>
                </div>
                <Switch checked={form.hasKids} onCheckedChange={v => set('hasKids', v)} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Pets</p>
                  <p className="text-xs text-muted-foreground">Unlocks vet and pet setup tasks</p>
                </div>
                <Switch checked={form.hasPets} onCheckedChange={v => set('hasPets', v)} />
              </div>
            </div>

            <Button
              onClick={() => canSave && onSave(form)}
              disabled={!canSave}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base"
            >
              🏠 Start Settling In →
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
