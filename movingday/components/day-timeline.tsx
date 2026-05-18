"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { DAY_PHASES } from "@/lib/moving-data"
import type { DayChecklistState } from "@/types"
import { cn } from "@/lib/utils"

interface DayTimelineProps {
  state: DayChecklistState
  onToggle: (id: string) => void
}

export function DayTimeline({ state, onToggle }: DayTimelineProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    before: true, loading: true, departure: false, enroute: false, arrival: false
  })

  return (
    <div className="space-y-3 pb-6">
      {/* Phase legend */}
      <div className="flex gap-1.5 flex-wrap px-1">
        {DAY_PHASES.map(phase => {
          const done = phase.items.filter(i => state[i.id]).length
          const complete = done === phase.items.length
          return (
            <button
              key={phase.id}
              onClick={() => setExpanded(e => ({ ...e, [phase.id]: true }))}
              className={cn(
                "flex items-center gap-1 text-xs px-2 py-1 rounded-full border transition-all",
                complete
                  ? "bg-teal-900/50 border-teal-700 text-teal-300"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
              )}
            >
              <span>{phase.emoji}</span>
              <span className="hidden sm:inline">{phase.label}</span>
              <span className="font-mono text-[10px]">{done}/{phase.items.length}</span>
              {complete && <span>✓</span>}
            </button>
          )
        })}
      </div>

      {DAY_PHASES.map(phase => {
        const done = phase.items.filter(i => state[i.id]).length
        const pct = Math.round((done / phase.items.length) * 100)
        const isExpanded = expanded[phase.id] !== false
        const allDone = done === phase.items.length

        return (
          <div
            key={phase.id}
            className={cn(
              "rounded-xl border overflow-hidden transition-all",
              allDone ? "border-teal-800 bg-teal-950/30" : "border-slate-700 bg-slate-900"
            )}
          >
            {/* Phase header */}
            <button
              className="w-full text-left px-4 py-3 flex items-center gap-3"
              onClick={() => setExpanded(e => ({ ...e, [phase.id]: !isExpanded }))}
            >
              <span className="text-2xl flex-shrink-0">{phase.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm text-white">{phase.label}</h3>
                  {allDone && <Badge className="bg-teal-800 text-teal-200 text-[10px] px-1.5 py-0">✓ Complete</Badge>}
                </div>
                <p className={cn("text-xs mt-0.5", phase.accent)}>{phase.tagline}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-slate-500">{done}/{phase.items.length}</span>
                  <Progress value={pct} className="w-16 h-1 mt-1 bg-slate-700 [&>div]:bg-slate-400" />
                </div>
                <span className="text-slate-600 text-xs">{isExpanded ? '▲' : '▼'}</span>
              </div>
            </button>

            {/* Phase items */}
            {isExpanded && (
              <div className="border-t border-slate-800 divide-y divide-slate-800">
                {phase.items.map(item => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 transition-colors",
                      state[item.id] ? "bg-slate-950/50" : "hover:bg-slate-800/40"
                    )}
                  >
                    <Checkbox
                      id={item.id}
                      checked={!!state[item.id]}
                      onCheckedChange={() => onToggle(item.id)}
                      className="mt-0.5 flex-shrink-0 border-slate-600 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                    />
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor={item.id}
                        className={cn(
                          "text-sm cursor-pointer block leading-snug",
                          state[item.id] ? "line-through text-slate-600" : "text-slate-200"
                        )}
                      >
                        {item.urgent && !state[item.id] && (
                          <span className="inline-block bg-red-900/70 text-red-300 text-[10px] px-1.5 py-0.5 rounded mr-1.5 font-bold uppercase tracking-wide">
                            Critical
                          </span>
                        )}
                        {item.text}
                      </label>
                      {item.tip && !state[item.id] && (
                        <p className={cn("text-xs mt-1", phase.accent)}>
                          💡 {item.tip}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
