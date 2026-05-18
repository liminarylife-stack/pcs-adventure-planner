"use client"

import { useState, useEffect } from "react"
import { HomeHeader } from "@/components/home-header"
import { HomeSetup } from "@/components/home-setup"
import { UnpackTracker } from "@/components/unpack-tracker"
import { SettleIn } from "@/components/settle-in"
import { CommunityHub } from "@/components/community-hub"
import { DiscoverSection } from "@/components/discover-section"
import { MemoriesSection } from "@/components/memories-section"
import type { HomeInfo, TaskState, UnpackRoom } from "@/types"
import { DEFAULT_ROOMS } from "@/lib/home-data"

export default function NewHomePage() {
  const [homeInfo, setHomeInfo] = useState<HomeInfo | null>(null)
  const [showSetup, setShowSetup] = useState(false)
  const [taskState, setTaskState] = useState<TaskState>({})
  const [rooms, setRooms] = useState<UnpackRoom[]>([])
  const [tab, setTab] = useState('unpack')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const info = localStorage.getItem('newhome-info')
      if (info) setHomeInfo(JSON.parse(info))
      else setShowSetup(true)

      const tasks = localStorage.getItem('newhome-tasks')
      if (tasks) setTaskState(JSON.parse(tasks))

      const savedRooms = localStorage.getItem('newhome-rooms')
      if (savedRooms) {
        setRooms(JSON.parse(savedRooms))
      } else {
        const defaults: UnpackRoom[] = DEFAULT_ROOMS.map((r, i) => ({ id: `r${i}`, ...r }))
        setRooms(defaults)
        localStorage.setItem('newhome-rooms', JSON.stringify(defaults))
      }
    } catch {
      setShowSetup(true)
    }
  }, [])

  const handleSave = (info: HomeInfo) => {
    setHomeInfo(info)
    localStorage.setItem('newhome-info', JSON.stringify(info))
    setShowSetup(false)
  }

  const toggleTask = (id: string) => {
    const updated = { ...taskState, [id]: !taskState[id] }
    setTaskState(updated)
    localStorage.setItem('newhome-tasks', JSON.stringify(updated))
  }

  const updateRooms = (updated: UnpackRoom[]) => {
    setRooms(updated)
    localStorage.setItem('newhome-rooms', JSON.stringify(updated))
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-4xl mb-3 animate-pulse">🏠</div>
          <p className="text-emerald-100">Loading your new home...</p>
        </div>
      </div>
    )
  }

  if (showSetup || !homeInfo) {
    return <HomeSetup onSave={handleSave} existing={homeInfo} />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <HomeHeader
        homeInfo={homeInfo}
        taskState={taskState}
        rooms={rooms}
        onEdit={() => setShowSetup(true)}
        currentTab={tab}
        onTabChange={setTab}
      />

      <div className="px-3 sm:px-4 pt-5 max-w-4xl mx-auto">
        {tab === 'unpack'    && <UnpackTracker rooms={rooms} onUpdate={updateRooms} />}
        {tab === 'settle'    && <SettleIn homeInfo={homeInfo} taskState={taskState} onToggle={toggleTask} />}
        {tab === 'community' && <CommunityHub />}
        {tab === 'discover'  && <DiscoverSection homeInfo={homeInfo} />}
        {tab === 'memories'  && <MemoriesSection />}
      </div>

      <footer className="text-center text-xs text-slate-400 py-6">
        🏠 New Home Hub · All data saved locally · You belong here 💚
      </footer>
    </div>
  )
}
