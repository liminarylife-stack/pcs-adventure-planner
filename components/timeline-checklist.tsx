"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CHECKLIST_PHASES } from "@/lib/pcs-data"
import type { ChecklistState, OrdersInfo } from "@/types"
import { cn } from "@/lib/utils"

interface TimelineChecklistProps {
  checklistState: ChecklistState
  onToggle: (id: string) => void
  ordersInfo: OrdersInfo
}

export function TimelineChecklist({ checklistState, onToggle, ordersInfo }: TimelineChecklistProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    orders: true, planning: true, countdown: true, movingweek: true
  })

  const daysUntil = Math.ceil((new Date(ordersInfo.reportDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Overview bar */}
        <Card className="bg-gradient-to-r from-teal-50 to-sky-50 border-teal-200">
          <CardContent className="py-4 px-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-teal-800">
                🗓️ {daysUntil > 0 ? `${daysUntil} days until report` : daysUntil === 0 ? 'Report date is TODAY' : `${Math.abs(daysUntil)} days past report date`}
              </span>
              <Separator orientation="vertical" className="h-4 hidden sm:block" />
              <span className="text-sm text-teal-700">
                Complete tasks by phase — earlier is always better!
              </span>
            </div>
          </CardContent>
        </Card>

        {CHECKLIST_PHASES.map(phase => {
          const phaseCompleted = phase.items.filter(i => checklistState[i.id]).length
          const phasePct = Math.round((phaseCompleted / phase.items.length) * 100)
          const isExpanded = expanded[phase.id] !== false

          return (
            <Card key={phase.id} className={cn("border bg-gradient-to-br", phase.color)}>
              <CardHeader
                className="pb-3 cursor-pointer select-none"
                onClick={() => setExpanded(e => ({ ...e, [phase.id]: !isExpanded }))}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl">{phase.emoji}</span>
                    <div className="min-w-0">
                      <CardTitle className="text-base leading-tight">{phase.label}</CardTitle>
                      <Badge variant="secondary" className={cn("text-xs mt-0.5", phase.badgeColor)}>
                        {phase.weeks}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-muted-foreground">{phaseCompleted}/{phase.items.length} done</p>
                      <Progress value={phasePct} className="h-1.5 w-24 mt-1" />
                    </div>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                      phasePct === 100 ? "bg-green-500 text-white" : "bg-white/70 text-slate-600"
                    )}>
                      {phasePct === 100 ? "✓" : `${phasePct}%`}
                    </div>
                    <span className="text-muted-foreground text-xs">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0 pb-4">
                  <div className="space-y-2">
                    {phase.items.map((item, idx) => (
                      <div key={item.id}>
                        {idx > 0 && <Separator className="opacity-40" />}
                        <div className="flex items-start gap-3 py-2 px-1 rounded-lg hover:bg-white/40 transition-colors">
                          <Checkbox
                            id={item.id}
                            checked={!!checklistState[item.id]}
                            onCheckedChange={() => onToggle(item.id)}
                            className="mt-0.5 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <label
                              htmlFor={item.id}
                              className={cn(
                                "text-sm cursor-pointer leading-snug block",
                                checklistState[item.id] ? "line-through text-muted-foreground" : "text-slate-700"
                              )}
                            >
                              {item.text}
                            </label>
                            {item.tip && !checklistState[item.id] && (
                              <p className="text-xs text-teal-600 mt-0.5 flex items-start gap-1">
                                <span className="flex-shrink-0 mt-0.5">💡</span>
                                <span>{item.tip}</span>
                              </p>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs flex-shrink-0 hidden sm:inline-flex capitalize">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
