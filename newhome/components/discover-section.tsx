"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash, CheckCircle } from "lucide-react"
import type { BucketItem, HomeInfo } from "@/types"
import { cn } from "@/lib/utils"

interface DiscoverSectionProps {
  homeInfo: HomeInfo
}

const STARTER_IDEAS = [
  "Find the best local taco spot 🌮",
  "Hike or walk a trail near the base 🌲",
  "Explore the nearest city downtown 🏙️",
  "Find your family's favorite park 🌳",
  "Attend a local sports game or event 🏈",
  "Discover a hidden gem restaurant locals love 🍜",
  "Take a day trip to a nearby attraction 🗺️",
  "Find the best coffee shop to work from ☕",
  "Catch a sunrise or sunset from a great spot 🌅",
  "Explore a local farmers market 🥦",
]

export function DiscoverSection({ homeInfo }: DiscoverSectionProps) {
  const [items, setItems] = useState<BucketItem[]>([])
  const [newText, setNewText] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('newhome-bucket')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  const save = (updated: BucketItem[]) => {
    setItems(updated)
    localStorage.setItem('newhome-bucket', JSON.stringify(updated))
  }

  const add = (text: string) => {
    if (!text.trim()) return
    save([...items, {
      id: crypto.randomUUID(), text: text.trim(),
      done: false, doneDate: ''
    }])
    setNewText('')
  }

  const toggle = (id: string) => {
    save(items.map(i => i.id === id ? {
      ...i, done: !i.done,
      doneDate: !i.done ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''
    } : i))
  }

  const remove = (id: string) => save(items.filter(i => i.id !== id))

  const done = items.filter(i => i.done).length
  const active = items.filter(i => !i.done)
  const completed = items.filter(i => i.done)
  const unusedIdeas = STARTER_IDEAS.filter(idea => !items.some(i => i.text === idea))

  return (
    <div className="space-y-4 pb-6">
      {/* Hero card */}
      <Card className="bg-gradient-to-br from-teal-600 to-sky-600 border-0 text-white">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🗺️</span>
            <div>
              <h3 className="font-bold">Discover {homeInfo.newStation}</h3>
              <p className="text-teal-100 text-sm mt-0.5">
                You&apos;ve been handed a brand new city to explore. Make a list and own it.
              </p>
              {done > 0 && (
                <Badge className="bg-white/20 text-white mt-1.5 text-xs">
                  ✓ {done} adventure{done !== 1 ? 's' : ''} completed!
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add item */}
      <div className="flex gap-2">
        <Input
          placeholder="Add an adventure idea..."
          value={newText}
          onChange={e => setNewText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add(newText)}
          className="flex-1"
        />
        <Button onClick={() => add(newText)} className="bg-emerald-600 hover:bg-emerald-700 text-white flex-shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Active items */}
      {active.length > 0 && (
        <div className="space-y-2">
          {active.map(item => (
            <div key={item.id} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-emerald-300 transition-colors group">
              <button onClick={() => toggle(item.id)}
                className="w-6 h-6 rounded-full border-2 border-slate-300 hover:border-emerald-500 flex items-center justify-center flex-shrink-0 transition-colors">
                <span className="text-[10px] text-transparent group-hover:text-emerald-500">✓</span>
              </button>
              <span className="flex-1 text-sm text-slate-700">{item.text}</span>
              <button onClick={() => remove(item.id)} className="text-slate-200 hover:text-red-400 flex-shrink-0">
                <Trash className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-6 text-center text-muted-foreground">
            <p className="text-3xl mb-2">⭐</p>
            <p className="text-sm">Start your adventure list below!</p>
          </CardContent>
        </Card>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            Adventures Completed ({completed.length})
          </h3>
          <div className="space-y-1.5">
            {completed.map(item => (
              <div key={item.id} className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span className="flex-1 text-sm text-slate-500 line-through">{item.text}</span>
                {item.doneDate && <span className="text-xs text-emerald-600">{item.doneDate}</span>}
                <button onClick={() => remove(item.id)} className="text-slate-300 hover:text-red-400">
                  <Trash className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Starter ideas */}
      {unusedIdeas.length > 0 && (
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-800">💡 Starter Ideas</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {unusedIdeas.map(idea => (
                <button key={idea} onClick={() => add(idea)}
                  className="text-xs bg-white border border-amber-300 text-amber-700 rounded-full px-3 py-1 hover:bg-amber-100 transition-colors flex items-center gap-1">
                  <Plus className="h-3 w-3" /> {idea}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
