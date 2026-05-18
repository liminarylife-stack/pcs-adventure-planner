"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Settings, MapPin, Star } from "lucide-react"
import { SETTLE_CATEGORIES } from "@/lib/home-data"
import type { HomeInfo, TaskState, UnpackRoom } from "@/types"

interface HomeHeaderProps {
  homeInfo: HomeInfo
  taskState: TaskState
  rooms: UnpackRoom[]
  onEdit: () => void
  currentTab: string
  onTabChange: (tab: string) => void
}

const BRANCH_EMOJI: Record<string, string> = {
  'Army': '⭐', 'Navy': '⚓', 'Marine Corps': '🦅',
  'Air Force': '✈️', 'Space Force': '🚀', 'Coast Guard': '🛟',
}

export function HomeHeader({ homeInfo, taskState, rooms, onEdit, currentTab, onTabChange }: HomeHeaderProps) {
  // Settle-in progress
  const allItems = SETTLE_CATEGORIES.flatMap(c => c.items.filter(i => {
    if (i.kidsOnly && !homeInfo.hasKids) return false
    if (i.petsOnly && !homeInfo.hasPets) return false
    return true
  }))
  const settledDone = allItems.filter(i => taskState[i.id]).length
  const settledPct = Math.round((settledDone / allItems.length) * 100)

  // Unpack progress
  const organized = rooms.filter(r => r.status === 'organized').length
  const unpacked = rooms.filter(r => r.status === 'unpacked' || r.status === 'organized').length
  const unpackPct = rooms.length > 0 ? Math.round((unpacked / rooms.length) * 100) : 0

  // Days since arrival
  const arrival = new Date(homeInfo.arrivalDate + 'T12:00:00')
  const daysSince = Math.floor((Date.now() - arrival.getTime()) / (1000 * 60 * 60 * 24))
  const daysLabel = daysSince === 0 ? 'Move-in day! 🎉' :
    daysSince === 1 ? 'Day 1 ✨' :
    daysSince < 7 ? `Day ${daysSince} 🌱` :
    daysSince < 30 ? `Week ${Math.ceil(daysSince / 7)} 🌿` :
    `${daysSince} days in 🌳`

  const tabs = [
    { id: 'unpack',    label: '📦 Unpack' },
    { id: 'settle',    label: '✅ Settle In' },
    { id: 'community', label: '🤝 Community' },
    { id: 'discover',  label: '🗺️ Discover' },
    { id: 'memories',  label: '✨ Memories' },
  ]

  return (
    <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 text-white">
      <div className="px-4 pt-5 pb-3 max-w-4xl mx-auto">
        {/* Top */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-2xl">{BRANCH_EMOJI[homeInfo.branch] || '🏠'}</span>
              <h1 className="text-xl font-bold text-white leading-tight">{homeInfo.familyName}</h1>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">{daysLabel}</Badge>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-100 text-xs">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="font-medium">{homeInfo.newStation}</span>
              {homeInfo.newAddress && (
                <span className="text-emerald-200 truncate">· {homeInfo.newAddress}</span>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8 flex-shrink-0" onClick={onEdit}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress cards */}
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-emerald-100 flex items-center gap-1">
                <span>📦</span> Unpacked
              </span>
              <span className="text-sm font-bold">{unpackPct}%</span>
            </div>
            <Progress value={unpackPct} className="h-2 bg-white/20 [&>div]:bg-amber-400" />
            <p className="text-[11px] text-emerald-200 mt-1">{unpacked}/{rooms.length} rooms done</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-emerald-100 flex items-center gap-1">
                <Star className="h-3 w-3" /> Settled In
              </span>
              <span className="text-sm font-bold">{settledPct}%</span>
            </div>
            <Progress value={settledPct} className="h-2 bg-white/20 [&>div]:bg-white" />
            <p className="text-[11px] text-emerald-200 mt-1">{settledDone}/{allItems.length} tasks done</p>
          </div>
        </div>

        {/* Motivational */}
        <p className="text-center text-emerald-100 text-xs italic mb-1">
          {unpackPct === 0 && settledPct === 0 && "🏠 Welcome home — let's get you settled!"}
          {(unpackPct > 0 || settledPct > 0) && unpackPct < 50 && "🌱 Great start — every box unpacked is a win."}
          {unpackPct >= 50 && unpackPct < 100 && settledPct < 50 && "💪 You're making this place home — keep going!"}
          {unpackPct === 100 && settledPct < 100 && "📦 All unpacked! Now let's finish getting settled."}
          {unpackPct === 100 && settledPct === 100 && "🎉 Fully unpacked AND settled in — you are HOME!"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-t border-white/20 overflow-x-auto max-w-4xl mx-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`flex-1 min-w-0 py-2.5 px-2 text-xs font-medium whitespace-nowrap transition-colors ${
              currentTab === t.id
                ? 'text-white border-b-2 border-white bg-white/10'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
