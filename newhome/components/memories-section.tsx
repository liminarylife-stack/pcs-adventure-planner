"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash } from "lucide-react"
import type { Milestone } from "@/types"
import { DEFAULT_MILESTONES } from "@/lib/home-data"
import { cn } from "@/lib/utils"

export function MemoriesSection() {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ emoji: '🌟', title: '', description: '' })

  useEffect(() => {
    const saved = localStorage.getItem('newhome-milestones')
    if (saved) {
      setMilestones(JSON.parse(saved))
    } else {
      const defaults: Milestone[] = DEFAULT_MILESTONES.map((m, i) => ({
        id: `m${i}`, ...m
      }))
      setMilestones(defaults)
      localStorage.setItem('newhome-milestones', JSON.stringify(defaults))
    }
  }, [])

  const save = (updated: Milestone[]) => {
    setMilestones(updated)
    localStorage.setItem('newhome-milestones', JSON.stringify(updated))
  }

  const toggle = (id: string) => {
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    save(milestones.map(m => m.id === id ? {
      ...m, achieved: !m.achieved,
      achievedDate: !m.achieved ? today : ''
    } : m))
  }

  const add = () => {
    if (!form.title) return
    save([...milestones, {
      id: crypto.randomUUID(), ...form,
      achieved: false, achievedDate: '', custom: true
    }])
    setForm({ emoji: '🌟', title: '', description: '' })
    setOpen(false)
  }

  const remove = (id: string) => save(milestones.filter(m => m.id !== id))

  const achieved = milestones.filter(m => m.achieved)
  const pending = milestones.filter(m => !m.achieved)
  const allDone = pending.length === 0 && milestones.length > 0

  const EMOJIS = ['🌟','🏠','🎉','🏆','❤️','🌱','🎊','🥇','🌈','🎯','💪','🙌','🎈','✨','🥂']

  return (
    <div className="space-y-4 pb-6">
      {/* Celebration banner */}
      {allDone && (
        <Card className="bg-gradient-to-r from-amber-400 to-orange-400 border-0 text-white">
          <CardContent className="py-4 text-center">
            <p className="text-3xl mb-1">🎊</p>
            <p className="font-bold text-lg">Every milestone reached!</p>
            <p className="text-amber-100 text-sm">You didn&apos;t just move — you built a home. That&apos;s everything.</p>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-slate-800">Settling-In Milestones</h2>
          <p className="text-xs text-muted-foreground">{achieved.length} of {milestones.length} moments reached</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader><DialogTitle>Add a Milestone</DialogTitle></DialogHeader>
            <div className="space-y-3 mt-2">
              <div className="space-y-1.5">
                <Label>Emoji</Label>
                <div className="flex flex-wrap gap-1.5">
                  {EMOJIS.map(e => (
                    <button key={e} onClick={() => setForm(f => ({ ...f, emoji: e }))}
                      className={cn("text-xl p-1.5 rounded-lg transition-all", form.emoji === e ? "bg-emerald-100 ring-2 ring-emerald-500" : "hover:bg-slate-100")}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Milestone Title</Label>
                <Input placeholder="e.g. First family game night" value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Description (optional)</Label>
                <Textarea placeholder="Why this matters..." rows={2} value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <Button onClick={add} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Add Milestone</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pending milestones */}
      {pending.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Still Ahead</p>
          {pending.map(m => (
            <div key={m.id}
              className="flex items-start gap-3 bg-white border-2 border-slate-200 rounded-2xl p-4 hover:border-emerald-300 transition-all cursor-pointer group"
              onClick={() => toggle(m.id)}
            >
              <span className="text-3xl flex-shrink-0">{m.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-slate-800 text-sm">{m.title}</p>
                {m.description && <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{m.description}</p>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-7 h-7 rounded-full border-2 border-slate-300 group-hover:border-emerald-500 transition-colors flex items-center justify-center">
                  <span className="text-transparent group-hover:text-emerald-500 text-xs">✓</span>
                </div>
                {m.custom && (
                  <button onClick={e => { e.stopPropagation(); remove(m.id) }}
                    className="text-slate-300 hover:text-red-400">
                    <Trash className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achieved milestones */}
      {achieved.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide flex items-center gap-1.5">
            <span>✨</span> Moments You&apos;ve Lived
          </p>
          {achieved.map(m => (
            <div key={m.id}
              className="flex items-start gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-4 cursor-pointer"
              onClick={() => toggle(m.id)}
            >
              <span className="text-3xl flex-shrink-0">{m.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-emerald-800 text-sm">{m.title}</p>
                {m.description && <p className="text-xs text-emerald-600 mt-0.5 line-through opacity-60">{m.description}</p>}
                {m.achievedDate && (
                  <Badge className="bg-emerald-600 text-white text-[10px] mt-1.5 px-2">{m.achievedDate}</Badge>
                )}
              </div>
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground pt-2">
        Tap any milestone to mark it as reached ✨
      </p>
    </div>
  )
}
