"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Settings, MapPin, ArrowRight, Calendar, Star } from "lucide-react"
import { BRANCH_INFO, getDaysUntil, getTotalItems, getCompletedCount } from "@/lib/pcs-data"
import type { OrdersInfo, ChecklistState } from "@/types"

interface AdventureHeaderProps {
  ordersInfo: OrdersInfo
  onEditOrders: () => void
  checklistState: ChecklistState
}

export function AdventureHeader({ ordersInfo, onEditOrders, checklistState }: AdventureHeaderProps) {
  const daysUntil = getDaysUntil(ordersInfo.reportDate)
  const total = getTotalItems()
  const completed = getCompletedCount(checklistState)
  const pct = Math.round((completed / total) * 100)
  const branchInfo = BRANCH_INFO[ordersInfo.branch] || { emoji: '⭐', color: 'text-white' }

  const urgencyColor = daysUntil < 14 ? 'bg-red-500' :
                       daysUntil < 30 ? 'bg-amber-500' :
                       daysUntil < 60 ? 'bg-yellow-400' : 'bg-teal-400'

  const daysLabel = daysUntil > 0
    ? `${daysUntil} days until report date`
    : daysUntil === 0
    ? '🎉 Report date is TODAY!'
    : `${Math.abs(daysUntil)} days since report date`

  return (
    <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Branch + Name */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{branchInfo.emoji}</span>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                {ordersInfo.branch} · {ordersInfo.rank}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {ordersInfo.serviceMember}&apos;s PCS Planner
            </h1>
            <p className="text-teal-200 text-sm mt-1 italic">
              ✨ Every move is a new chapter — make it an adventure
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-white/30 text-white hover:bg-white/10 flex-shrink-0"
            onClick={onEditOrders}
          >
            <Settings className="h-3.5 w-3.5 mr-1" />
            Edit Orders
          </Button>
        </div>

        {/* Route */}
        <div className="mt-4 flex items-center gap-2 text-sm sm:text-base">
          <MapPin className="h-4 w-4 text-teal-300 flex-shrink-0" />
          <span className="font-medium text-teal-100 truncate">{ordersInfo.currentStation}</span>
          <ArrowRight className="h-4 w-4 text-amber-400 flex-shrink-0 mx-1" />
          <MapPin className="h-4 w-4 text-amber-400 flex-shrink-0" />
          <span className="font-bold text-amber-300 truncate">{ordersInfo.newStation}</span>
        </div>

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Countdown */}
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-1">
              <Calendar className="h-3.5 w-3.5 text-teal-300" />
              <span className="text-xs text-teal-200">Report Date</span>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold text-white ${urgencyColor} mb-1`}>
              {daysUntil > 0 ? `${daysUntil}d away` : daysUntil === 0 ? 'TODAY!' : 'Past'}
            </div>
            <p className="text-white text-xs">{new Date(ordersInfo.reportDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>

          {/* Progress */}
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm sm:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-xs text-teal-200">Mission Progress</span>
              </div>
              <span className="text-sm font-bold text-white">{pct}%</span>
            </div>
            <Progress value={pct} className="h-2 bg-white/20 [&>div]:bg-amber-400" />
            <p className="text-xs text-teal-200 mt-1.5">{completed} of {total} tasks complete</p>
          </div>

          {/* Family */}
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <p className="text-xs text-teal-200 mb-2">Moving With You</p>
            <div className="flex flex-wrap gap-1">
              {ordersInfo.hasDependents && (
                <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">
                  👨‍👩‍👧 {ordersInfo.dependentCount} dependent{ordersInfo.dependentCount !== 1 ? 's' : ''}
                </span>
              )}
              {ordersInfo.hasPets && (
                <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">
                  🐾 Pets
                </span>
              )}
              {!ordersInfo.hasDependents && !ordersInfo.hasPets && (
                <span className="text-xs text-teal-300">Solo move</span>
              )}
            </div>
          </div>
        </div>

        {/* Motivational bar */}
        {pct < 100 && (
          <div className="mt-3 text-center text-teal-200 text-xs pb-1">
            {pct === 0 && "🌟 Start checking off tasks — one step at a time!"}
            {pct > 0 && pct < 25 && "🚀 Great start! You're on your way to an awesome adventure."}
            {pct >= 25 && pct < 50 && "💪 You're building momentum — keep going!"}
            {pct >= 50 && pct < 75 && "🎯 Over halfway there — the new adventure is getting close!"}
            {pct >= 75 && pct < 100 && "🏁 Almost there — the finish line is in sight!"}
          </div>
        )}
        {pct === 100 && (
          <div className="mt-3 text-center text-amber-300 text-xs font-semibold pb-1">
            🎉 All tasks complete — you are READY for this adventure!
          </div>
        )}
      </div>
    </div>
  )
}
