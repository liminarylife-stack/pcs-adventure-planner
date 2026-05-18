"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ExternalLink } from "lucide-react"
import type { OrdersInfo, ChecklistState } from "@/types"
import { cn } from "@/lib/utils"

interface FamilySectionProps {
  ordersInfo: OrdersInfo
  checklistState: ChecklistState
  onToggle: (id: string) => void
}

const SCHOOLS_CHECKLIST = [
  { id: 'sc1', text: 'Research school districts near new duty station', tip: 'GreatSchools.org and Military Child Education Coalition (MCEC) are great resources.' },
  { id: 'sc2', text: 'Contact the new school to request enrollment requirements', tip: 'Start early — some schools require proof of residence before enrolling.' },
  { id: 'sc3', text: 'Request records and transcripts from current school', tip: 'Official sealed transcripts are usually required. Request 2–3 copies.' },
  { id: 'sc4', text: 'Gather immunization records for each child', tip: 'Requirements vary by state. Check ahead of time.' },
  { id: 'sc5', text: 'Find out if your child has any special programs (IEP, gifted, etc.) and plan for transfer', tip: 'The Exceptional Family Member Program (EFMP) can help if your child has special needs.' },
  { id: 'sc6', text: 'Research extracurriculars (sports, arts, clubs) at new school', tip: 'Help your child look forward to the move by finding something exciting at the new school.' },
  { id: 'sc7', text: 'Connect with other military families at the new installation for school recommendations', tip: 'Spouse Facebook groups for the base are invaluable here.' },
  { id: 'sc8', text: 'Visit or do a virtual tour of the new school if possible', tip: 'Seeing the school can reduce anxiety for kids — and parents!' },
]

const PETS_CHECKLIST = [
  { id: 'pt1', text: 'Schedule vet visit: get health certificate (required for most travel)', tip: 'Health certs must be issued within 10 days of travel. Time it right.' },
  { id: 'pt2', text: 'Update microchip registration with new address', tip: 'Do this immediately when you have your new address confirmed.' },
  { id: 'pt3', text: 'Check breed and size restrictions at new housing', tip: 'Many on-base housing units ban "aggressive breeds." Check this EARLY.' },
  { id: 'pt4', text: 'Research new state pet laws (licensing, vaccines required)', tip: 'Some states require rabies certification within 30 days of establishing residency.' },
  { id: 'pt5', text: 'If flying: research airline pet policies and book pet-friendly flights', tip: 'Large dogs may need to travel as cargo — or consider ground transport services.' },
  { id: 'pt6', text: 'Pack a pet travel kit: food, water, bowls, comfort items, waste bags', tip: 'Keep familiar-smelling bedding to reduce pet stress during the move.' },
  { id: 'pt7', text: 'Find a new vet at the duty station before you arrive', tip: 'Ask your current vet for a referral or check the base\'s veterinary clinic.' },
  { id: 'pt8', text: 'Request full medical/vaccination records from current vet', tip: 'Digital copies are great — put them in your cloud storage.' },
]

const KIDS_TIPS = [
  { emoji: '🗺️', tip: 'Frame the move as an adventure — research the new city together and find exciting things to look forward to.' },
  { emoji: '📸', tip: 'Create a memory book of your current home and friends before you leave.' },
  { emoji: '🎮', tip: 'Let older kids research fun things about the new city to get them invested in the move.' },
  { emoji: '✉️', tip: 'Set up a pen-pal system with close friends from current location — keeps bonds strong.' },
  { emoji: '🏖️', tip: 'Plan a family adventure to a cool local spot within the first month of arriving.' },
  { emoji: '💬', tip: 'Let kids process feelings of sadness and loss — it\'s okay to grieve leaving a home you loved.' },
]

export function FamilySection({ ordersInfo, checklistState, onToggle }: FamilySectionProps) {
  const schoolsDone = SCHOOLS_CHECKLIST.filter(i => checklistState[i.id]).length
  const petsDone = PETS_CHECKLIST.filter(i => checklistState[i.id]).length

  return (
    <div className="space-y-5">
      {/* Schools */}
      <Card className="border-sky-200">
        <CardHeader className="pb-3 bg-gradient-to-r from-sky-50 to-blue-50 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              🏫 Schools Checklist
            </CardTitle>
            <Badge className="bg-sky-100 text-sky-700 border-sky-200">
              {schoolsDone}/{SCHOOLS_CHECKLIST.length} done
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="space-y-1">
            {SCHOOLS_CHECKLIST.map((item, idx) => (
              <div key={item.id}>
                {idx > 0 && <Separator className="opacity-30" />}
                <div className="flex items-start gap-3 py-2 px-1 rounded hover:bg-sky-50/50">
                  <Checkbox
                    id={item.id}
                    checked={!!checklistState[item.id]}
                    onCheckedChange={() => onToggle(item.id)}
                    className="mt-0.5"
                  />
                  <div>
                    <label htmlFor={item.id} className={cn(
                      "text-sm cursor-pointer",
                      checklistState[item.id] ? "line-through text-muted-foreground" : "text-slate-700"
                    )}>
                      {item.text}
                    </label>
                    {item.tip && !checklistState[item.id] && (
                      <p className="text-xs text-sky-600 mt-0.5">💡 {item.tip}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-sky-50 rounded-lg">
            <h4 className="font-medium text-sm text-sky-800 mb-2">📚 Schools Resources</h4>
            <div className="space-y-1.5">
              {[
                { text: "Military Child Education Coalition (MCEC)", url: "https://www.militarychild.org" },
                { text: "SchoolQuest — Military Families", url: "https://www.schoolquest.org" },
                { text: "Exceptional Family Member Program (EFMP)", url: "https://www.militaryonesource.mil/special-needs/efmp/" },
                { text: "Interstate Compact on Educational Opportunity", url: "https://mic3.net" },
              ].map(r => (
                <a key={r.url} href={r.url} target="_blank" rel="noopener"
                  className="flex items-center gap-1.5 text-xs text-sky-700 hover:text-sky-900 underline">
                  <ExternalLink className="h-3 w-3" /> {r.text}
                </a>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kids' Wellbeing */}
      {ordersInfo.hasDependents && (
        <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">❤️ Supporting Your Kids Through the Move</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {KIDS_TIPS.map((t, i) => (
                <div key={i} className="flex items-start gap-2 bg-white/60 rounded-lg p-3">
                  <span className="text-xl flex-shrink-0">{t.emoji}</span>
                  <p className="text-xs text-slate-700">{t.tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pets */}
      {ordersInfo.hasPets && (
        <Card className="border-orange-200">
          <CardHeader className="pb-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                🐾 Pets Checklist
                {ordersInfo.petTypes && <Badge variant="secondary" className="text-xs">{ordersInfo.petTypes}</Badge>}
              </CardTitle>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                {petsDone}/{PETS_CHECKLIST.length} done
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="space-y-1">
              {PETS_CHECKLIST.map((item, idx) => (
                <div key={item.id}>
                  {idx > 0 && <Separator className="opacity-30" />}
                  <div className="flex items-start gap-3 py-2 px-1 rounded hover:bg-orange-50/50">
                    <Checkbox
                      id={item.id}
                      checked={!!checklistState[item.id]}
                      onCheckedChange={() => onToggle(item.id)}
                      className="mt-0.5"
                    />
                    <div>
                      <label htmlFor={item.id} className={cn(
                        "text-sm cursor-pointer",
                        checklistState[item.id] ? "line-through text-muted-foreground" : "text-slate-700"
                      )}>
                        {item.text}
                      </label>
                      {item.tip && !checklistState[item.id] && (
                        <p className="text-xs text-orange-600 mt-0.5">💡 {item.tip}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-sm text-orange-800 mb-2">🐕 Pet Move Resources</h4>
              <div className="space-y-1.5">
                {[
                  { text: "Pet Travel — Official USDA Portal", url: "https://www.aphis.usda.gov/pet-travel" },
                  { text: "Military Pet Relocation Guide", url: "https://www.militaryonesource.mil/moving-housing/moving/planning-your-move/moving-with-pets/" },
                ].map(r => (
                  <a key={r.url} href={r.url} target="_blank" rel="noopener"
                    className="flex items-center gap-1.5 text-xs text-orange-700 hover:text-orange-900 underline">
                    <ExternalLink className="h-3 w-3" /> {r.text}
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!ordersInfo.hasDependents && !ordersInfo.hasPets && (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center text-muted-foreground">
            <p className="text-4xl mb-3">👤</p>
            <p className="font-medium">Solo move!</p>
            <p className="text-sm mt-1">No dependents or pets tracked. Update your orders info to add family.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
