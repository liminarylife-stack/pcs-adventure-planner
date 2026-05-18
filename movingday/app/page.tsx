"use client"

import { useState, useEffect } from "react"
import { CommandHeader } from "@/components/command-header"
import { DayTimeline } from "@/components/day-timeline"
import { RoomInventory } from "@/components/room-inventory"
import { EssentialsTracker } from "@/components/essentials-tracker"
import { QuickContacts } from "@/components/quick-contacts"
import { MoveNotes } from "@/components/move-notes"
import { MoveSetup } from "@/components/move-setup"
import type { MoveInfo, DayChecklistState } from "@/types"

export default function MovingDayPage() {
  const [moveInfo, setMoveInfo] = useState<MoveInfo | null>(null)
  const [showSetup, setShowSetup] = useState(false)
  const [state, setState] = useState<DayChecklistState>({})
  const [tab, setTab] = useState('timeline')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem('movingday-info')
      if (saved) setMoveInfo(JSON.parse(saved))
      else setShowSetup(true)
      const savedState = localStorage.getItem('movingday-checklist')
      if (savedState) setState(JSON.parse(savedState))
    } catch {
      setShowSetup(true)
    }
  }, [])

  const handleSave = (info: MoveInfo) => {
    setMoveInfo(info)
    localStorage.setItem('movingday-info', JSON.stringify(info))
    setShowSetup(false)
  }

  const toggle = (id: string) => {
    const updated = { ...state, [id]: !state[id] }
    setState(updated)
    localStorage.setItem('movingday-checklist', JSON.stringify(updated))
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center text-slate-400">
          <div className="text-4xl mb-3 animate-pulse">📦</div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (showSetup || !moveInfo) {
    return <MoveSetup onSave={handleSave} existing={moveInfo} />
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <CommandHeader
        moveInfo={moveInfo}
        state={state}
        onEdit={() => setShowSetup(true)}
        currentTab={tab}
        onTabChange={setTab}
      />

      <div className="px-3 pt-4 max-w-2xl mx-auto">
        {tab === 'timeline' && <DayTimeline state={state} onToggle={toggle} />}
        {tab === 'rooms' && <RoomInventory />}
        {tab === 'essentials' && <EssentialsTracker />}
        {tab === 'contacts' && <QuickContacts moveInfo={moveInfo} />}
        {tab === 'notes' && <MoveNotes />}
      </div>
    </div>
  )
}
