"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash } from "lucide-react"
import type { Room } from "@/types"
import { DEFAULT_ROOMS } from "@/lib/moving-data"
import { cn } from "@/lib/utils"

const STATUS_CONFIG = {
  pending:   { label: 'Pending',   color: 'bg-slate-800 text-slate-400 border-slate-700', dot: '⬜' },
  packed:    { label: 'Packed',    color: 'bg-amber-900/50 text-amber-300 border-amber-800', dot: '🟡' },
  loaded:    { label: 'Loaded',    color: 'bg-orange-900/50 text-orange-300 border-orange-800', dot: '🟠' },
  delivered: { label: 'Delivered', color: 'bg-blue-900/50 text-blue-300 border-blue-800', dot: '🔵' },
  checked:   { label: 'All Good ✓', color: 'bg-teal-900/50 text-teal-300 border-teal-800', dot: '✅' },
}

export function RoomInventory() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [open, setOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newNotes, setNewNotes] = useState('')
  const [newCount, setNewCount] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('movingday-rooms')
    if (saved) {
      setRooms(JSON.parse(saved))
    } else {
      const defaults: Room[] = DEFAULT_ROOMS.map((name, i) => ({
        id: `r${i}`, name, status: 'pending', notes: '', itemCount: ''
      }))
      setRooms(defaults)
      localStorage.setItem('movingday-rooms', JSON.stringify(defaults))
    }
  }, [])

  const save = (updated: Room[]) => {
    setRooms(updated)
    localStorage.setItem('movingday-rooms', JSON.stringify(updated))
  }

  const addRoom = () => {
    if (!newName.trim()) return
    const room: Room = {
      id: crypto.randomUUID(), name: newName.trim(),
      status: 'pending', notes: newNotes, itemCount: newCount
    }
    save([...rooms, room])
    setNewName(''); setNewNotes(''); setNewCount('')
    setOpen(false)
  }

  const updateStatus = (id: string, status: Room['status']) => {
    save(rooms.map(r => r.id === id ? { ...r, status } : r))
  }

  const updateNotes = (id: string, notes: string) => {
    save(rooms.map(r => r.id === id ? { ...r, notes } : r))
  }

  const remove = (id: string) => save(rooms.filter(r => r.id !== id))

  const counts = Object.fromEntries(
    Object.keys(STATUS_CONFIG).map(s => [s, rooms.filter(r => r.status === s).length])
  )

  return (
    <div className="pb-6">
      {/* Summary */}
      <div className="grid grid-cols-5 gap-1.5 mb-4">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
          <div key={key} className={cn("rounded-lg border px-2 py-2 text-center", cfg.color)}>
            <div className="text-lg font-bold">{counts[key] || 0}</div>
            <div className="text-[10px] leading-tight">{cfg.label}</div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-white">
          Room Tracker
          <span className="text-slate-500 font-normal ml-2">
            {rooms.filter(r => r.status === 'checked').length}/{rooms.length} cleared
          </span>
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-black font-bold h-8">
              <Plus className="h-3.5 w-3.5 mr-1" /> Room
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-sm">
            <DialogHeader><DialogTitle className="text-white">Add Room</DialogTitle></DialogHeader>
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <Label className="text-slate-300 text-xs">Room Name</Label>
                <Input className="bg-slate-800 border-slate-600 text-white"
                  placeholder="e.g. Master Bedroom" value={newName} onChange={e => setNewName(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-300 text-xs">Approximate # of Items</Label>
                <Input className="bg-slate-800 border-slate-600 text-white"
                  placeholder="e.g. 14 boxes, 1 bed" value={newCount} onChange={e => setNewCount(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-slate-300 text-xs">Notes</Label>
                <Textarea className="bg-slate-800 border-slate-600 text-white" rows={2}
                  placeholder="Special instructions, fragile items..." value={newNotes} onChange={e => setNewNotes(e.target.value)} />
              </div>
              <Button onClick={addRoom} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold">Add Room</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Room list */}
      <div className="space-y-2">
        {rooms.map(room => {
          const cfg = STATUS_CONFIG[room.status]
          return (
            <div key={room.id} className={cn(
              "rounded-xl border p-3 transition-all",
              room.status === 'checked' ? 'border-teal-800 bg-teal-950/20 opacity-70' : 'border-slate-700 bg-slate-900'
            )}>
              <div className="flex items-center gap-3">
                <span className="text-lg flex-shrink-0">{cfg.dot}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn(
                      "font-semibold text-sm",
                      room.status === 'checked' ? 'line-through text-slate-500' : 'text-white'
                    )}>{room.name}</span>
                    {room.itemCount && (
                      <span className="text-[10px] text-slate-500">{room.itemCount}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Select value={room.status} onValueChange={v => updateStatus(room.id, v as Room['status'])}>
                    <SelectTrigger className={cn("h-7 text-xs w-32 border", cfg.color)}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {Object.entries(STATUS_CONFIG).map(([val, c]) => (
                        <SelectItem key={val} value={val} className="text-xs text-slate-200">
                          {c.dot} {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-600 hover:text-red-400"
                    onClick={() => remove(room.id)}>
                    <Trash className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {room.notes && room.status !== 'checked' && (
                <p className="text-xs text-slate-500 mt-1.5 ml-8">{room.notes}</p>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-xs text-slate-600 text-center mt-4">Tap a status to update as rooms are cleared</p>
    </div>
  )
}
