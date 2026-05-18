"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, DollarSign, TrendingUp, AlertCircle } from "lucide-react"
import type { OrdersInfo } from "@/types"

interface FinanceSectionProps {
  ordersInfo: OrdersInfo
}

const ENTITLEMENTS = [
  {
    name: "Basic Allowance for Housing (BAH)",
    emoji: "🏠",
    description: "Monthly housing allowance based on rank and dependents at your new duty station.",
    notes: "Rate is based on gaining installation ZIP code. With dependents = higher rate.",
    link: "https://www.defensetravel.dod.mil/site/bahCalc.cfm",
    linkText: "Calculate your BAH",
    color: "bg-blue-50 border-blue-200",
  },
  {
    name: "Dislocation Allowance (DLA)",
    emoji: "📦",
    description: "One-time payment to help offset costs of relocating your household.",
    notes: "Paid once per PCS move. Amount varies by rank and whether you have dependents.",
    link: "https://www.militaryonesource.mil/moving-housing/moving/planning-your-move/understanding-your-pcs-entitlements/",
    linkText: "Learn about DLA",
    color: "bg-teal-50 border-teal-200",
  },
  {
    name: "Mileage / Per Diem (TLE/TLA)",
    emoji: "🚗",
    description: "Travel reimbursement for you and your family during the PCS move.",
    notes: "Per Diem covers lodging and meals. Mileage rate is set by DoD. Keep ALL receipts.",
    link: "https://www.defensetravel.dod.mil/site/perdiemCalc.cfm",
    linkText: "Per diem rates",
    color: "bg-amber-50 border-amber-200",
  },
  {
    name: "Temporary Lodging Expense (TLE/TLA)",
    emoji: "🏨",
    description: "Up to 10 days of lodging reimbursement at old and new duty stations.",
    notes: "TLE = CONUS (up to 10 days). TLA = OCONUS (extended). Use this while waiting for housing.",
    link: "https://www.militaryonesource.mil/moving-housing/moving/planning-your-move/temporary-lodging-expense-tle/",
    linkText: "TLE details",
    color: "bg-purple-50 border-purple-200",
  },
  {
    name: "PPM / DITY Move Incentive",
    emoji: "💰",
    description: "Keep up to 100% of the government's cost estimate if you move yourself.",
    notes: "Can put significant money in your pocket if you have a lighter household. Calculate vs. HHG first.",
    link: "https://www.militaryonesource.mil/moving-housing/moving/moving-options/personally-procured-move-ppm/",
    linkText: "PPM calculator",
    color: "bg-green-50 border-green-200",
  },
]

const BUDGET_ITEMS = [
  { item: "Security deposit / first & last month rent", estimate: "1–2x monthly rent" },
  { item: "Utility deposits", estimate: "$100–300" },
  { item: "New furniture / items for new home", estimate: "Varies" },
  { item: "School supplies / enrollment fees", estimate: "$50–300" },
  { item: "Vehicle re-registration (new state)", estimate: "$50–200" },
  { item: "Travel costs (fuel, hotels, food)", estimate: "Varies by distance" },
  { item: "Temporary lodging before move-in", estimate: "TLE may cover some" },
  { item: "Pet deposits / fees", estimate: "$200–500/pet" },
]

export function FinanceSection({ ordersInfo }: FinanceSectionProps) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <DollarSign className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-emerald-800">Know Your Entitlements</h3>
              <p className="text-sm text-emerald-700 mt-1">
                You&apos;ve earned these benefits — make sure you use them all. Always check with your finance office for exact amounts based on your specific orders and rank.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entitlements */}
      <div className="grid grid-cols-1 gap-3">
        {ENTITLEMENTS.map(e => (
          <Card key={e.name} className={`border ${e.color}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{e.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm text-slate-800">{e.name}</h3>
                    <a href={e.link} target="_blank" rel="noopener"
                      className="text-xs text-teal-600 underline flex items-center gap-1 hover:text-teal-800 flex-shrink-0">
                      {e.linkText} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{e.description}</p>
                  <p className="text-xs text-slate-500 mt-1 bg-white/70 rounded px-2 py-1">
                    💡 {e.notes}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Budget Checklist */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-teal-600" />
            PCS Budget Planner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Typical out-of-pocket expenses during a PCS move — plan ahead so these don&apos;t surprise you:
          </p>
          <div className="space-y-2">
            {BUDGET_ITEMS.map((item, i) => (
              <div key={i}>
                {i > 0 && <Separator />}
                <div className="flex items-center justify-between py-2 gap-3">
                  <span className="text-sm text-slate-700">{item.item}</span>
                  <Badge variant="outline" className="text-xs flex-shrink-0">{item.estimate}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Warning */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 text-sm">Keep all receipts!</h3>
              <p className="text-xs text-amber-700 mt-1">
                Save every receipt during your PCS — lodging, fuel, meals, storage. Many are reimbursable or tax-deductible for military moves. Create a PCS folder (physical or digital) before you start.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="bg-slate-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-slate-700 text-sm mb-3">📚 Official Finance Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { text: "Move.mil — Official PCS Tool", url: "https://www.move.mil" },
              { text: "DTMO BAH Calculator", url: "https://www.defensetravel.dod.mil/site/bahCalc.cfm" },
              { text: "Military OneSource", url: "https://www.militaryonesource.mil" },
              { text: "MyArmyBenefits / Branch Benefits", url: "https://myarmybenefits.us.army.mil" },
            ].map(r => (
              <a key={r.url} href={r.url} target="_blank" rel="noopener"
                className="flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 underline">
                <ExternalLink className="h-3 w-3 flex-shrink-0" />
                {r.text}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
