"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { SETTLE_CATEGORIES } from "@/lib/home-data"
import type { HomeInfo, TaskState } from "@/types"
import { cn } from "@/lib/utils"

interface SettleInProps {
  homeInfo: HomeInfo
  taskState: TaskState
  onToggle: (id: string) => void
}

export function SettleIn({ homeInfo, taskState, onToggle }: SettleInProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    military: true, legal: true, healthcare: true, home: true, schools: true, community: true
  })

  return (
    <div className="space-y-3 pb-6">
      {/* Intro */}
      <Card className="bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
        <CardContent className="p-3.5">
          <p className="text-sm text-teal-800">
            🗓️ Work through these categories at your own pace. There&apos;s no perfect order — just keep chipping away!
          </p>
        </CardContent>
      </Card>

      {SETTLE_CATEGORIES.map(category => {
        const items = category.items.filter(i => {
          if (i.kidsOnly && !homeInfo.hasKids) return false
          if (i.petsOnly && !homeInfo.hasPets) return false
          return true
        })
        if (items.length === 0) return null

        const done = items.filter(i => taskState[i.id]).length
        const pct = Math.round((done / items.length) * 100)
        const isExpanded = expanded[category.id] !== false
        const allDone = done === items.length

        return (
          <Card key={category.id} className={cn("border bg-gradient-to-br", category.color)}>
            <CardHeader
              className="pb-2 cursor-pointer select-none"
              onClick={() => setExpanded(e => ({ ...e, [category.id]: !isExpanded }))}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl flex-shrink-0">{category.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CardTitle className="text-sm">{category.label}</CardTitle>
                    {allDone && <Badge className="bg-emerald-600 text-white text-[10px] px-1.5 py-0">✓ Done</Badge>}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={pct} className="h-1.5 flex-1 bg-white/60 [&>div]:bg-emerald-600" />
                    <span className="text-xs text-muted-foreground flex-shrink-0">{done}/{items.length}</span>
                  </div>
                </div>
                <span className="text-muted-foreground text-xs flex-shrink-0">{isExpanded ? '▲' : '▼'}</span>
              </div>
            </CardHeader>

            {isExpanded && (
              <CardContent className="pt-0 pb-3">
                <div className="space-y-0.5">
                  {items.map((item, idx) => (
                    <div key={item.id}>
                      {idx > 0 && <Separator className="opacity-30 my-0.5" />}
                      <div className={cn(
                        "flex items-start gap-3 py-2 px-1 rounded-lg transition-colors",
                        "hover:bg-white/40"
                      )}>
                        <Checkbox
                          id={item.id}
                          checked={!!taskState[item.id]}
                          onCheckedChange={() => onToggle(item.id)}
                          className="mt-0.5 flex-shrink-0"
                        />
                        <div className="flex-1">
                          <label htmlFor={item.id} className={cn(
                            "text-sm cursor-pointer block leading-snug",
                            taskState[item.id] ? "line-through text-muted-foreground" : "text-slate-700"
                          )}>
                            {item.text}
                          </label>
                          {item.tip && !taskState[item.id] && (
                            <p className="text-xs text-teal-600 mt-0.5">💡 {item.tip}</p>
                          )}
                        </div>
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
  )
}
