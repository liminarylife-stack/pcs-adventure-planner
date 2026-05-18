"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { BRANCHES } from "@/lib/pcs-data"
import type { OrdersInfo } from "@/types"

interface OrdersSetupProps {
  onSave: (info: OrdersInfo) => void
  existing?: OrdersInfo | null
}

export function OrdersSetup({ onSave, existing }: OrdersSetupProps) {
  const [form, setForm] = useState<OrdersInfo>(existing || {
    serviceMember: '',
    branch: '',
    rank: '',
    currentStation: '',
    newStation: '',
    reportDate: '',
    ordersDate: new Date().toISOString().split('T')[0],
    hasDependents: false,
    dependentCount: 0,
    hasPets: false,
    petTypes: '',
  })

  const set = (key: keyof OrdersInfo, value: unknown) => setForm(f => ({ ...f, [key]: value }))

  const canSave = form.serviceMember && form.branch && form.currentStation && form.newStation && form.reportDate

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-slate-800 to-teal-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🧭</div>
          <h1 className="text-4xl font-bold text-white mb-2">Your Next Adventure Awaits</h1>
          <p className="text-teal-200 text-lg">
            Let&apos;s map out your PCS move — from orders to unpacked and loving your new community.
          </p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <span>📋</span> Tell us about your orders
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="sm">Service Member&apos;s Name</Label>
                <Input id="sm" placeholder="e.g. SSgt Jordan Smith" value={form.serviceMember}
                  onChange={e => set('serviceMember', e.target.value)} />
              </div>

              {/* Branch */}
              <div className="space-y-1.5">
                <Label>Branch of Service</Label>
                <Select value={form.branch} onValueChange={v => set('branch', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch..." />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANCHES.map(b => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rank */}
              <div className="space-y-1.5">
                <Label htmlFor="rank">Rank</Label>
                <Input id="rank" placeholder="e.g. E-5, O-3, W-2" value={form.rank}
                  onChange={e => set('rank', e.target.value)} />
              </div>

              {/* Orders Date */}
              <div className="space-y-1.5">
                <Label htmlFor="ordersDate">Orders Date</Label>
                <Input id="ordersDate" type="date" value={form.ordersDate}
                  onChange={e => set('ordersDate', e.target.value)} />
              </div>

              {/* Current Station */}
              <div className="space-y-1.5">
                <Label htmlFor="current">Current Duty Station</Label>
                <Input id="current" placeholder="e.g. Fort Bragg, NC" value={form.currentStation}
                  onChange={e => set('currentStation', e.target.value)} />
              </div>

              {/* New Station */}
              <div className="space-y-1.5">
                <Label htmlFor="new">New Duty Station</Label>
                <Input id="new" placeholder="e.g. Joint Base Lewis-McChord, WA" value={form.newStation}
                  onChange={e => set('newStation', e.target.value)} />
              </div>

              {/* Report Date */}
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="report">Report Date</Label>
                <Input id="report" type="date" value={form.reportDate}
                  onChange={e => set('reportDate', e.target.value)} />
                <p className="text-xs text-muted-foreground">This is the date you must report to your new unit — your checklist will be timed from this.</p>
              </div>
            </div>

            {/* Family */}
            <div className="mt-6 space-y-4">
              <div className="h-px bg-slate-100" />
              <h3 className="font-medium text-slate-700 flex items-center gap-2"><span>👨‍👩‍👧</span> Family Moving With You?</h3>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Dependents</p>
                  <p className="text-xs text-muted-foreground">Spouse, children, or other dependents</p>
                </div>
                <Switch checked={form.hasDependents} onCheckedChange={v => set('hasDependents', v)} />
              </div>

              {form.hasDependents && (
                <div className="space-y-1.5 ml-4">
                  <Label>How many dependents?</Label>
                  <Input type="number" min={1} max={10} className="w-32"
                    value={form.dependentCount || ''}
                    onChange={e => set('dependentCount', parseInt(e.target.value) || 0)} />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Pets</p>
                  <p className="text-xs text-muted-foreground">Dogs, cats, and other four-legged family</p>
                </div>
                <Switch checked={form.hasPets} onCheckedChange={v => set('hasPets', v)} />
              </div>

              {form.hasPets && (
                <div className="space-y-1.5 ml-4">
                  <Label htmlFor="pets">What pets? (e.g. 2 dogs, 1 cat)</Label>
                  <Input id="pets" placeholder="e.g. Labrador, tabby cat" value={form.petTypes}
                    onChange={e => set('petTypes', e.target.value)} />
                </div>
              )}
            </div>

            <Button
              className="w-full mt-8 bg-teal-700 hover:bg-teal-800 text-white h-12 text-base font-semibold"
              disabled={!canSave}
              onClick={() => onSave(form)}
            >
              🧭 Let&apos;s Plan This Adventure →
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-teal-300 text-sm mt-4">
          Your data is saved locally — nothing is sent to a server.
        </p>
      </div>
    </div>
  )
}
