"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash, Plus } from "lucide-react"
import type { MoveNote } from "@/types"
import { DAY_PHASES } from "@/lib/moving-data"

export function MoveNotes() {
  const [notes, setNotes] = useState<MoveNote[]>([])
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('before')

  useEffect(() => {
    const saved = localStorage.getItem('movingday-notes')
    if (saved) setNotes(JSON.parse(saved))
  }, [])

  const save = (updated: MoveNote[]) => {
    setNotes(updated)
    localStorage.setItem('movingday-notes', JSON.stringify(updated))
  }

  const add = () => {
    if (!text.trim()) return
    const note: MoveNote = {
      id: crypto.randomUUID(), text: text.trim(), phase,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    }
    save([note, ...notes])
    setText('')
  }

  const remove = (id: string) => save(notes.filter(n => n.id !== id))

  const phaseEmoji = (pid: string) => DAY_PHASES.find(p => p.id === pid)?.emoji || '📝'
  const phaseLabel = (pid: string) => DAY_PHASES.find(p => p.id === pid)?.label || pid

  return (
    <div className="pb-6">
      {/* Add note */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 mb-4">
        <div className="flex gap-2 mb-2">
          <Select value={phase} onValueChange={setPhase}>
            <SelectTrigger className="h-8 text-xs bg-slate-800 border-slate-600 text-slate-300 w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {DAY_PHASES.map(p => (
                <SelectItem key={p.id} value={p.id} className="text-xs text-slate-200">
                  {p.emoji} {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-xs text-slate-600 self-center ml-auto">
            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </span>
        </div>
        <Textarea
          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 text-sm resize-none min-h-[80px]"
          placeholder="Quick note... damage observed, item missing, something to remember..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && e.metaKey && add()}
        />
        <Button
          onClick={add}
          disabled={!text.trim()}
          className="w-full mt-2 bg-amber-500 hover:bg-amber-400 text-black font-bold h-9"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Note
        </Button>
      </div>

      {/* Notes list */}
      {notes.length === 0 ? (
        <div className="text-center py-10 text-slate-600">
          <p className="text-3xl mb-2">📝</p>
          <p className="text-sm">No notes yet</p>
          <p className="text-xs mt-1">Jot down damage, missing items, or anything you need to remember</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notes.map(note => (
            <div key={note.id} className="bg-slate-900 border border-slate-700 rounded-xl p-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{phaseEmoji(note.phase)}</span>
                  <span className="text-[10px] text-slate-500 bg-slate-800 rounded px-1.5 py-0.5">
                    {phaseLabel(note.phase)}
                  </span>
                  <span className="text-[10px] text-slate-600">{note.timestamp}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-700 hover:text-red-400 flex-shrink-0"
                  onClick={() => remove(note.id)}>
                  <Trash className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{note.text}</p>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-700 text-center mt-4">
        Use notes for damage reports, missing items, or anything you want to document
      </p>
    </div>
  )
}
