"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdventureHeader } from "@/components/adventure-header"
import { TimelineChecklist } from "@/components/timeline-checklist"
import { HousingTracker } from "@/components/housing-tracker"
import { FinanceSection } from "@/components/finance-section"
import { MovingSection } from "@/components/moving-section"
import { FamilySection } from "@/components/family-section"
import { CommunitySection } from "@/components/community-section"
import { OrdersSetup } from "@/components/orders-setup"
import type { OrdersInfo, ChecklistState } from "@/types"

export default function PCSPlannerPage() {
  const [ordersInfo, setOrdersInfo] = useState<OrdersInfo | null>(null)
  const [showSetup, setShowSetup] = useState(false)
  const [checklistState, setChecklistState] = useState<ChecklistState>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem('pcs-orders')
      if (saved) {
        setOrdersInfo(JSON.parse(saved))
      } else {
        setShowSetup(true)
      }
      const savedChecklist = localStorage.getItem('pcs-checklist')
      if (savedChecklist) {
        setChecklistState(JSON.parse(savedChecklist))
      }
    } catch {
      setShowSetup(true)
    }
  }, [])

  const handleOrdersSave = (info: OrdersInfo) => {
    setOrdersInfo(info)
    localStorage.setItem('pcs-orders', JSON.stringify(info))
    setShowSetup(false)
  }

  const toggleChecklistItem = (id: string) => {
    const newState = { ...checklistState, [id]: !checklistState[id] }
    setChecklistState(newState)
    localStorage.setItem('pcs-checklist', JSON.stringify(newState))
  }

  // Loading state
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-4xl mb-3 animate-pulse">🧭</div>
          <p className="text-teal-200">Loading your planner...</p>
        </div>
      </div>
    )
  }

  // Setup screen
  if (showSetup || !ordersInfo) {
    return <OrdersSetup onSave={handleOrdersSave} existing={ordersInfo} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-sky-50/40">
      <AdventureHeader
        ordersInfo={ordersInfo}
        onEditOrders={() => setShowSetup(true)}
        checklistState={checklistState}
      />

      <div className="container mx-auto px-3 sm:px-4 py-5 max-w-6xl">
        <Tabs defaultValue="timeline">
          <TabsList className="flex w-full mb-5 h-auto flex-wrap gap-1 p-1 bg-white border shadow-sm rounded-xl">
            <TabsTrigger value="timeline" className="flex-1 text-xs sm:text-sm data-[state=active]:bg-teal-700 data-[state=active]:text-white rounded-lg">
              📋 Timeline
            </TabsTrigger>
            <TabsTrigger value="housing" className="flex-1 text-xs sm:text-sm data-[state=active]:bg-teal-700 data-[state=active]:text-white rounded-lg">
              🏠 Housing
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex-1 text-xs sm:text-sm data-[state=active]:bg-teal-700 data-[state=active]:text-white rounded-lg">
              💰 Finance
            </TabsTrigger>
            <TabsTrigger value="moving" className="flex-1 text-xs sm:text-sm data-[state=active]:bg-teal-700 data-[state=active]:text-white rounded-lg">
              📦 Moving
            </TabsTrigger>
            <TabsTrigger value="family" className="flex-1 text-xs sm:text-sm data-[state=active]:bg-teal-700 data-[state=active]:text-white rounded-lg">
              👨‍👩‍👧 Family
            </TabsTrigger>
            <TabsTrigger value="community" className="flex-1 text-xs sm:text-sm data-[state=active]:bg-teal-700 data-[state=active]:text-white rounded-lg">
              🤝 Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            <TimelineChecklist
              checklistState={checklistState}
              onToggle={toggleChecklistItem}
              ordersInfo={ordersInfo}
            />
          </TabsContent>

          <TabsContent value="housing">
            <HousingTracker ordersInfo={ordersInfo} />
          </TabsContent>

          <TabsContent value="finance">
            <FinanceSection ordersInfo={ordersInfo} />
          </TabsContent>

          <TabsContent value="moving">
            <MovingSection ordersInfo={ordersInfo} />
          </TabsContent>

          <TabsContent value="family">
            <FamilySection
              ordersInfo={ordersInfo}
              checklistState={checklistState}
              onToggle={toggleChecklistItem}
            />
          </TabsContent>

          <TabsContent value="community">
            <CommunitySection ordersInfo={ordersInfo} />
          </TabsContent>
        </Tabs>

        <footer className="text-center text-xs text-muted-foreground mt-8 pb-4">
          🧭 PCS Adventure Planner · All data saved locally to your browser · You&apos;ve got this! 💪
        </footer>
      </div>
    </div>
  )
}
