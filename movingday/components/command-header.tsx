"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Settings, MapPin, ArrowRight, Phone, Hash } from "lucide-react"
import { getTotalItems, getCompletedCount, getCurrentPhase, DAY_PHASES } from "@/lib/moving-data"
import type { MoveInfo, DayChecklistState } from "@/types"

interface CommandHeaderProps {
  moveInfo: MoveInfo
  state: DayChecklistState
  onEdit: () => void
  currentTab: string
  onTabChange: (tab: string) => void
}

export function CommandHeader({ moveInfo, state, onEdit, currentTab, onTabChange }: CommandHeaderProps) {
  const total = getTotalItems()
  const done = getCompletedCount(state)
  const pct = Math.round((done / total) * 100)
  const currentPhaseId = getCurrentPhase(state)
  const currentPhase = DAY_PHASES.find(p => p.id === currentPhaseId)

  const isToday = moveInfo.moveDate === new Date().toISOString().split('T')[0]
  const moveDateLabel = new Date(moveInfo.moveDate + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  })

  const tabs = [
    { id: 'timeline', label: '📋 Timeline' },
    { id: 'rooms',    label: '🏠 Rooms' },
    { id: 'essentials', label: '🎒 Essentials' },
    { id: 'contacts', label: '📞 Contacts' },
    { id: 'notes',    label: '📝 Notes' },
  ]

  return (
    <div className="bg-slate-950 text-white sticky top-0 z-50 shadow-2xl">
      {/* Top bar */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-2xl">📦</span>
              <h1 className="text-lg font-bold text-white leading-tight">{moveInfo.name}</h1>
              {isToday && <Badge className="bg-amber-500 text-black text-xs font-bold">TODAY</Badge>}
            </div>
            <p className="text-slate-400 text-xs">{moveDateLabel}</p>
          </div>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white h-8 w-8" onClick={onEdit}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Addresses */}
        <div className="flex items-center gap-1.5 text-xs mb-3 bg-slate-900 rounded-lg px-3 py-2">
          <MapPin className="h-3 w-3 text-slate-500 flex-shrink-0" />
          <span className="text-slate-400 truncate max-w-[100px] sm:max-w-none">{moveInfo.fromAddress || 'From address'}</span>
          <ArrowRight className="h-3 w-3 text-amber-500 flex-shrink-0" />
          <MapPin className="h-3 w-3 text-amber-400 flex-shrink-0" />
          <span className="text-amber-300 font-medium truncate">{moveInfo.toAddress || 'To address'}</span>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400">
              {currentPhase ? `${currentPhase.emoji} ${currentPhase.label}` : '✅ All done!'}
            </span>
            <span className="text-white font-bold">{done}/{total} tasks · {pct}%</span>
          </div>
          <Progress value={pct} className="h-2 bg-slate-800 [&>div]:bg-amber-500" />
        </div>

        {/* Mover quick-ref */}
        {(moveInfo.driverPhone || moveInfo.companyPhone) && (
          <div className="grid grid-cols-2 gap-2 mb-1">
            {moveInfo.driverPhone && (
              <a href={`tel:${moveInfo.driverPhone}`} className="flex items-center gap-1.5 bg-slate-900 rounded-lg px-2.5 py-1.5 hover:bg-slate-800 transition-colors">
                <Phone className="h-3 w-3 text-teal-400" />
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500 leading-none">Driver</p>
                  <p className="text-xs text-white font-medium truncate">{moveInfo.driverName || moveInfo.driverPhone}</p>
                </div>
              </a>
            )}
            {moveInfo.companyPhone && (
              <a href={`tel:${moveInfo.companyPhone}`} className="flex items-center gap-1.5 bg-slate-900 rounded-lg px-2.5 py-1.5 hover:bg-slate-800 transition-colors">
                <Phone className="h-3 w-3 text-orange-400" />
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500 leading-none">Company</p>
                  <p className="text-xs text-white font-medium truncate">{moveInfo.movingCompany || moveInfo.companyPhone}</p>
                </div>
              </a>
            )}
            {moveInfo.inventoryNumber && (
              <div className="flex items-center gap-1.5 bg-slate-900 rounded-lg px-2.5 py-1.5 col-span-2">
                <Hash className="h-3 w-3 text-slate-400" />
                <p className="text-[10px] text-slate-500">Inventory #:</p>
                <p className="text-xs text-white font-mono">{moveInfo.inventoryNumber}</p>
                {moveInfo.deliveryWindow && (
                  <>
                    <span className="text-slate-600 mx-1">·</span>
                    <p className="text-[10px] text-slate-500">Delivery:</p>
                    <p className="text-xs text-teal-300">{moveInfo.deliveryWindow}</p>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex border-t border-slate-800 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 min-w-0 py-2.5 px-2 text-xs font-medium whitespace-nowrap transition-colors ${
              currentTab === tab.id
                ? 'text-amber-400 border-b-2 border-amber-400 bg-slate-900'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
