"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash, AlertTriangle } from "lucide-react"
import type { EssentialItem } from "@/types"
import { DEFAULT_ESSENTIALS } from "@/lib/moving-data"
import { cn } from "@/lib/utils"

const LOCATION_CONFIG = {
  'with-me':        { label: 'With Me 👤', color: 'bg-teal-900/50 text-teal-300 border-teal-800' },
  'essentials-box': { label: 'Essentials Box 📦', color: 'bg-amber-900/50 text-amber-300 border-amber-800' },
  'unknown':        { label: '❓ Unknown', color: 'bg-red-900/50 text-red-300 border-red-800' },
}

export function EssentialsTracker() {
  const [items, setItems] = useState<EssentialItem[]>([])
  const [newName, setNewName] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('movingday-essentials')
    if (saved) {
      setItems(JSON.parse(saved))
    } else {
      const defaults: EssentialItem[] = DEFAULT_ESSENTIALS.map((e, i) => ({
        id: `e${i}`, name: e.name, location: e.location,
        confirmed: false, note: ''
      }))
      setItems(defaults)
      localStorage.setItem('movingday-essentials', JSON.stringify(defaults))
    }
  }, [])

  const save = (updated: EssentialItem[]) => {
    setItems(updated)
    localStorage.setItem('movingday-essentials', JSON.stringify(updated))
  }

  const toggle = (id: string) =>
    save(items.map(i => i.id === id ? { ...i, confirmed: !i.confirmed } : i))

  const updateLocation = (id: string, loc: EssentialItem['location']) =>
    save(items.map(i => i.id === id ? { ...i, location: loc } : i))

  const remove = (id: string) => save(items.filter(i => i.id !== id))

  const addItem = () => {
    if (!newName.trim()) return
    const item: EssentialItem = {
      id: crypto.randomUUID(), name: newName.trim(),
      location: 'unknown', confirmed: false, note: ''
    }
    save([...items, item])
    setNewName('')
  }

  const unknown = items.filter(i => i.location === 'unknown' && !i.confirmed)
  const confirmed = items.filter(i => i.confirmed)
  const unconfirmed = items.filter(i => !i.confirmed)

  return (
    <div className="pb-6">
      {/* Alert if anything is unknown */}
      {unknown.length > 0 && (
        <div className="bg-red-950/50 border border-red-800 rounded-xl p-3 mb-4 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-300">{unknown.length} item{unknown.length > 1 ? 's' : ''} with unknown location!</p>
            <p className="text-xs text-red-400">Find these before the truck leaves.</p>
          </div>
        </div>
      )}

      {/* Summary chips */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <div className="bg-teal-900/40 border border-teal-800 rounded-lg px-3 py-1.5 text-center">
          <div className="text-lg font-bold text-teal-300">{confirmed.length}</div>
          <div className="text-[10px] text-teal-400">Confirmed</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-center">
          <div className="text-lg font-bold text-slate-300">{unconfirmed.length}</div>
          <div className="text-[10px] text-slate-400">To Confirm</div>
        </div>
        <div className="bg-red-900/40 border border-red-800 rounded-lg px-3 py-1.5 text-center">
          <div className="text-lg font-bold text-red-300">{unknown.length}</div>
          <div className="text-[10px] text-red-400">Unknown</div>
        </div>
      </div>

      {/* Add item */}
      <div className="flex gap-2 mb-4">
        <Input
          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 text-sm"
          placeholder="Add an essential item..."
          value={newName}
          onChange={e => setNewName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addItem()}
        />
        <Button onClick={addItem} className="bg-amber-500 hover:bg-amber-400 text-black font-bold flex-shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Items */}
      <div className="space-y-2">
        {items.map(item => {
          const locCfg = LOCATION_CONFIG[item.location]
          return (
            <div key={item.id} className={cn(
              "rounded-xl border p-3 transition-all",
              item.confirmed
                ? "border-teal-900 bg-teal-950/20 opacity-60"
                : item.location === 'unknown'
                ? "border-red-800 bg-red-950/20"
                : "border-slate-700 bg-slate-900"
            )}>
              <div className="flex items-center gap-2.5">
                {/* Confirm button */}
                <button
                  onClick={() => toggle(item.id)}
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs border-2 transition-all",
                    item.confirmed
                      ? "bg-teal-600 border-teal-600 text-white"
                      : "border-slate-600 text-transparent hover:border-teal-500"
                  )}
                >
                  ✓
                </button>

                <span className={cn(
                  "flex-1 text-sm",
                  item.confirmed ? "line-through text-slate-600" : "text-white"
                )}>
                  {item.name}
                </span>

                <Select value={item.location} onValueChange={v => updateLocation(item.id, v as EssentialItem['location'])}>
                  <SelectTrigger className={cn("h-7 text-[10px] w-36 border", locCfg.color)}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {Object.entries(LOCATION_CONFIG).map(([val, cfg]) => (
                      <SelectItem key={val} value={val} className="text-xs text-slate-200">{cfg.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-700 hover:text-red-400 flex-shrink-0"
                  onClick={() => remove(item.id)}>
                  <Trash className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-slate-600 text-center mt-4">
        Tap ✓ to confirm each item is accounted for • Set location for each
      </p>
    </div>
  )
}
