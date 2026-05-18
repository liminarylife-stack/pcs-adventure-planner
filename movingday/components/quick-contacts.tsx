"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Trash, Phone } from "lucide-react"
import type { QuickContact, MoveInfo } from "@/types"

interface QuickContactsProps {
  moveInfo: MoveInfo
}

const ROLE_EMOJIS: Record<string, string> = {
  'Driver': '🚚', 'Moving Company': '📦', 'Sponsor': '🎖️',
  'Housing': '🏠', 'New Unit': '⭐', 'Emergency': '🆘',
  'Landlord': '🔑', 'Vet': '🐾', 'School': '🏫', 'Other': '📞'
}

export function QuickContacts({ moveInfo }: QuickContactsProps) {
  const [contacts, setContacts] = useState<QuickContact[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', role: 'Other', phone: '' })

  useEffect(() => {
    const saved = localStorage.getItem('movingday-contacts')
    if (saved) {
      setContacts(JSON.parse(saved))
    } else {
      // Pre-populate from move info
      const preloaded: QuickContact[] = []
      if (moveInfo.driverName && moveInfo.driverPhone)
        preloaded.push({ id: 'p1', name: moveInfo.driverName, role: 'Driver', phone: moveInfo.driverPhone })
      if (moveInfo.movingCompany && moveInfo.companyPhone)
        preloaded.push({ id: 'p2', name: moveInfo.movingCompany, role: 'Moving Company', phone: moveInfo.companyPhone })
      if (moveInfo.sponsorName && moveInfo.sponsorPhone)
        preloaded.push({ id: 'p3', name: moveInfo.sponsorName, role: 'Sponsor', phone: moveInfo.sponsorPhone })
      setContacts(preloaded)
      localStorage.setItem('movingday-contacts', JSON.stringify(preloaded))
    }
  }, [])

  const save = (updated: QuickContact[]) => {
    setContacts(updated)
    localStorage.setItem('movingday-contacts', JSON.stringify(updated))
  }

  const add = () => {
    if (!form.name || !form.phone) return
    save([...contacts, { id: crypto.randomUUID(), ...form }])
    setForm({ name: '', role: 'Other', phone: '' })
    setOpen(false)
  }

  const remove = (id: string) => save(contacts.filter(c => c.id !== id))

  return (
    <div className="pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Quick Dial</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-black font-bold h-8">
              <Plus className="h-3.5 w-3.5 mr-1" /> Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-sm">
            <DialogHeader><DialogTitle className="text-white">Add Contact</DialogTitle></DialogHeader>
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <Label className="text-slate-300 text-xs">Name</Label>
                <Input className="bg-slate-800 border-slate-600 text-white" placeholder="Contact name"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-300 text-xs">Role</Label>
                <select
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-600 text-white rounded-md h-9 px-3 text-sm"
                >
                  {Object.keys(ROLE_EMOJIS).map(r => (
                    <option key={r} value={r}>{ROLE_EMOJIS[r]} {r}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label className="text-slate-300 text-xs">Phone Number</Label>
                <Input className="bg-slate-800 border-slate-600 text-white" type="tel" placeholder="Phone number"
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <Button onClick={add} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold">
                Add Contact
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-12 text-slate-600">
          <Phone className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No contacts yet</p>
          <p className="text-xs mt-1">Add key numbers so you can call with one tap</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {contacts.map(c => (
            <div key={c.id} className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl p-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl flex-shrink-0">
                {ROLE_EMOJIS[c.role] || '📞'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm truncate">{c.name}</p>
                <p className="text-xs text-slate-500">{c.role}</p>
              </div>
              <a
                href={`tel:${c.phone}`}
                className="flex items-center gap-1.5 bg-teal-900/50 border border-teal-800 text-teal-300 rounded-lg px-3 py-1.5 text-sm font-mono hover:bg-teal-800/50 transition-colors flex-shrink-0"
              >
                <Phone className="h-3.5 w-3.5" />
                {c.phone}
              </a>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 hover:text-red-400 flex-shrink-0"
                onClick={() => remove(c.id)}>
                <Trash className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Emergency numbers */}
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Always Handy</h3>
        <div className="space-y-2">
          {[
            { name: 'Military OneSource', phone: '1-800-342-9647', emoji: '🎖️' },
            { name: 'TMO Claims Hotline', phone: '1-800-462-2176', emoji: '📦' },
            { name: 'USAA (if applicable)', phone: '1-800-531-8722', emoji: '🏦' },
          ].map(c => (
            <a key={c.name} href={`tel:${c.phone}`}
              className="flex items-center justify-between hover:bg-slate-800 rounded-lg px-2 py-1.5 transition-colors">
              <span className="text-sm text-slate-300">{c.emoji} {c.name}</span>
              <span className="text-xs font-mono text-teal-400">{c.phone}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
