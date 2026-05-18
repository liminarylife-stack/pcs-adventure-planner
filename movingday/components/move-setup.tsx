"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import type { MoveInfo } from "@/types"

interface MoveSetupProps {
  onSave: (info: MoveInfo) => void
  existing?: MoveInfo | null
}

export function MoveSetup({ onSave, existing }: MoveSetupProps) {
  const [form, setForm] = useState<MoveInfo>(existing || {
    name: '', moveDate: new Date().toISOString().split('T')[0],
    fromAddress: '', toAddress: '',
    movingCompany: '', companyPhone: '',
    driverName: '', driverPhone: '',
    inventoryNumber: '', deliveryWindow: '',
    sponsorName: '', sponsorPhone: '',
  })

  const set = (k: keyof MoveInfo, v: string) => setForm(f => ({ ...f, [k]: v }))
  const canSave = form.name && form.moveDate && form.toAddress

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">📦</div>
          <h1 className="text-3xl font-bold text-white mb-2">Moving Day Command Center</h1>
          <p className="text-slate-400">Your mission briefing for the big day</p>
        </div>

        <Card className="bg-slate-900 border-slate-700 shadow-2xl">
          <CardContent className="p-6 space-y-5">

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1">
                <Label className="text-slate-300 text-xs">Your Name</Label>
                <Input className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                  placeholder="e.g. The Smith Family" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-300 text-xs">Move Date</Label>
                <Input type="date" className="bg-slate-800 border-slate-600 text-white"
                  value={form.moveDate} onChange={e => set('moveDate', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-300 text-xs">Delivery Window</Label>
                <Input className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                  placeholder="e.g. Jun 15–18" value={form.deliveryWindow} onChange={e => set('deliveryWindow', e.target.value)} />
              </div>
            </div>

            <div className="h-px bg-slate-700" />

            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">📍 Addresses</p>
              <div className="space-y-1">
                <Label className="text-slate-300 text-xs">Moving FROM</Label>
                <Input className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                  placeholder="Full address" value={form.fromAddress} onChange={e => set('fromAddress', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-300 text-xs">Moving TO ★</Label>
                <Input className="bg-slate-800 border-amber-600 text-white placeholder:text-slate-500 border-2"
                  placeholder="Your new home address" value={form.toAddress} onChange={e => set('toAddress', e.target.value)} />
              </div>
            </div>

            <div className="h-px bg-slate-700" />

            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">🚚 Moving Company</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-slate-300 text-xs">Company Name</Label>
                  <Input className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                    placeholder="e.g. Allied Van Lines" value={form.movingCompany} onChange={e => set('movingCompany', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-300 text-xs">Company Phone</Label>
                  <Input className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                    placeholder="800-xxx-xxxx" value={form.companyPhone} onChange={e => set('companyPhone', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-300 text-xs">Driver Name</Label>
                  <Input className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                    placeholder="Driver's name" value={form.driverName} onChange={e => set('driverName', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-300 text-xs">Driver Cell</Label>
                  <Input className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                    placeholder="Cell number" value={form.driverPhone} onChange={e => set('driverPhone', e.target.value)} />
                </div>
                <div className="col-span-2 space-y-1">
                  <Label className="text-slate-300 text-xs">Inventory / Shipment Number</Label>
                  <Input className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                    placeholder="From your Bill of Lading" value={form.inventoryNumber} onChange={e => set('inventoryNumber', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-700" />

            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">🤝 Sponsor / Unit Contact</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-slate-300 text-xs">Sponsor Name</Label>
                  <Input className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                    placeholder="Name" value={form.sponsorName} onChange={e => set('sponsorName', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-300 text-xs">Sponsor Phone</Label>
                  <Input className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                    placeholder="Phone" value={form.sponsorPhone} onChange={e => set('sponsorPhone', e.target.value)} />
                </div>
              </div>
            </div>

            <Button
              onClick={() => canSave && onSave(form)}
              disabled={!canSave}
              className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-black font-bold text-base mt-2"
            >
              📦 Launch Command Center →
            </Button>
          </CardContent>
        </Card>
        <p className="text-center text-slate-600 text-xs mt-4">Data saved locally to your device only</p>
      </div>
    </div>
  )
}
