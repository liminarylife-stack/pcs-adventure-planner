"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash } from "lucide-react"
import type { UnpackRoom } from "@/types"
import { cn } from "@/lib/utils"

interface UnpackTrackerProps {
  rooms: UnpackRoom[]
  onUpdate: (rooms: UnpackRoom[]) => void
}

const STATUS = {
  'not-started': { label: 'Not Started',  short: 'Not Started', color: 'bg-slate-100 text-slate-500 border-slate-200', dot: '⬜', order: 0 },
  'in-progress': { label: 'In Progress',  short: 'In Progress', color: 'bg-amber-100 text-amber-700 border-amber-300', dot: '🟡', order: 1 },
  'unpacked':    { label: 'Unpacked',     short: 'Unpacked',    color: 'bg-sky-100 text-sky-700 border-sky-300',        dot: '🔵', order: 2 },
  'organized':   { label: '✨ Organized', short: 'Organized',   color: 'bg-emerald-100 text-emerald-700 border-emerald-300', dot: '✅', order: 3 },
} as const

const ROOM_EMOJIS = ['🍳','🛋️','🛏️','🚿','🧸','🍽️','💻','📦','🏡','🌿','🎨','🎵','🏋️','🐾','📚']

export function UnpackTracker({ rooms, onUpdate }: UnpackTrackerProps) {
  const [open, setOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmoji, setNewEmoji] = useState('🛋️')
  const [newNotes, setNewNotes] = useState('')

  const update = (id: string, patch: Partial<UnpackRoom>) =>
    onUpdate(rooms.map(r => r.id === id ? { ...r, ...patch } : r))

  const remove = (id: string) => onUpdate(rooms.filter(r => r.id !== id))

  const add = () => {
    if (!newName.trim()) return
    onUpdate([...rooms, { id: crypto.randomUUID(), name: newName.trim(), emoji: newEmoji, status: 'not-started', notes: newNotes }])
    setNewName(''); setNewNotes(''); setNewEmoji('🛋️')
    setOpen(false)
  }

  const counts = Object.fromEntries(
    Object.keys(STATUS).map(s => [s, rooms.filter(r => r.status === s).length])
  ) as Record<keyof typeof STATUS, number>

  const progressOrder = ['not-started', 'in-progress', 'unpacked', 'organized'] as const

  return (
    <div className="space-y-4 pb-6">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-2">
        {(Object.entries(STATUS) as [keyof typeof STATUS, typeof STATUS[keyof typeof STATUS]][]).map(([key, cfg]) => (
          <div key={key} className={cn("rounded-xl border px-2 py-2.5 text-center", cfg.color)}>
            <div className="text-xl font-bold leading-none">{counts[key]}</div>
            <div className="text-[10px] mt-0.5 leading-tight">{cfg.short}</div>
          </div>
        ))}
      </div>

      {/* Legend / flow */}
      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        {progressOrder.map((s, i) => (
          <span key={s} className="flex items-center gap-1">
            {i > 0 && <span className="text-slate-300">→</span>}
            <span>{STATUS[s].dot} {STATUS[s].short}</span>
          </span>
        ))}
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 text-sm">
          Rooms
          <span className="text-slate-400 font-normal ml-1.5">
            {counts['organized']+counts['unpacked']}/{rooms.length} done
          </span>
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8">
              <Plus className="h-3.5 w-3.5 mr-1" /> Room
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader><DialogTitle>Add Room</DialogTitle></DialogHeader>
            <div className="space-y-3 mt-2">
              <div className="space-y-1.5">
                <Label>Room Name</Label>
                <Input placeholder="e.g. Home Office" value={newName} onChange={e => setNewName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Emoji</Label>
                <div className="flex flex-wrap gap-1.5">
                  {ROOM_EMOJIS.map(e => (
                    <button key={e} onClick={() => setNewEmoji(e)}
                      className={cn("text-xl p-1 rounded-lg transition-all", newEmoji === e ? "bg-emerald-100 ring-2 ring-emerald-500" : "hover:bg-slate-100")}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Notes (optional)</Label>
                <Textarea placeholder="Any special notes..." value={newNotes} onChange={e => setNewNotes(e.target.value)} rows={2} />
              </div>
              <Button onClick={add} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Add Room</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Rooms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {rooms.map(room => {
          const cfg = STATUS[room.status]
          return (
            <Card key={room.id} className={cn(
              "border-2 transition-all",
              room.status === 'organized' ? 'border-emerald-300 bg-emerald-50' :
              room.status === 'unpacked' ? 'border-sky-200 bg-sky-50/50' :
              room.status === 'in-progress' ? 'border-amber-200 bg-amber-50/50' :
              'border-slate-200 bg-white'
            )}>
              <CardContent className="p-3">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="text-2xl">{room.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-semibold text-sm", room.status === 'organized' ? 'text-emerald-700' : 'text-slate-800')}>
                      {room.name}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-300 hover:text-red-400 flex-shrink-0"
                    onClick={() => remove(room.id)}>
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>

                <Select value={room.status} onValueChange={v => update(room.id, { status: v as UnpackRoom['status'] })}>
                  <SelectTrigger className={cn("h-8 text-xs border", cfg.color)}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(STATUS) as [keyof typeof STATUS, typeof STATUS[keyof typeof STATUS]][]).map(([val, c]) => (
                      <SelectItem key={val} value={val} className="text-xs">
                        {c.dot} {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {room.notes && (
                  <p className="text-xs text-slate-500 mt-1.5">{room.notes}</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Encouragement */}
      {rooms.every(r => r.status === 'organized') && rooms.length > 0 && (
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 border-0 text-white">
          <CardContent className="py-4 text-center">
            <p className="text-2xl mb-1">🎉</p>
            <p className="font-bold">Every room is organized!</p>
            <p className="text-emerald-100 text-sm">That&apos;s a full PCS unpack. You are amazing.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
