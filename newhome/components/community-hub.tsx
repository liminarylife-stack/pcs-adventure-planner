"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash, Phone, Star, ExternalLink } from "lucide-react"
import type { Neighbor, LocalPlace } from "@/types"
import { PLACE_CATEGORIES } from "@/lib/home-data"
import { cn } from "@/lib/utils"

export function CommunityHub() {
  const [neighbors, setNeighbors] = useState<Neighbor[]>([])
  const [places, setPlaces] = useState<LocalPlace[]>([])
  const [neighborOpen, setNeighborOpen] = useState(false)
  const [placeOpen, setPlaceOpen] = useState(false)
  const [neighborForm, setNeighborForm] = useState({ name: '', connection: '', phone: '', notes: '' })
  const [placeForm, setPlaceForm] = useState({ name: '', category: '🛒 Grocery', address: '', notes: '' })

  useEffect(() => {
    const n = localStorage.getItem('newhome-neighbors')
    if (n) setNeighbors(JSON.parse(n))
    const p = localStorage.getItem('newhome-places')
    if (p) setPlaces(JSON.parse(p))
  }, [])

  const saveNeighbors = (updated: Neighbor[]) => {
    setNeighbors(updated); localStorage.setItem('newhome-neighbors', JSON.stringify(updated))
  }
  const savePlaces = (updated: LocalPlace[]) => {
    setPlaces(updated); localStorage.setItem('newhome-places', JSON.stringify(updated))
  }

  const addNeighbor = () => {
    if (!neighborForm.name) return
    saveNeighbors([...neighbors, { id: crypto.randomUUID(), ...neighborForm }])
    setNeighborForm({ name: '', connection: '', phone: '', notes: '' })
    setNeighborOpen(false)
  }

  const addPlace = () => {
    if (!placeForm.name) return
    savePlaces([...places, { id: crypto.randomUUID(), ...placeForm, favorite: false }])
    setPlaceForm({ name: '', category: '🛒 Grocery', address: '', notes: '' })
    setPlaceOpen(false)
  }

  const toggleFav = (id: string) =>
    savePlaces(places.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p))

  const BASE_RESOURCES = [
    { emoji: '🏥', name: 'Military Treatment Facility', desc: 'On-base medical care' },
    { emoji: '🛒', name: 'Commissary', desc: 'Tax-free groceries' },
    { emoji: '🛍️', name: 'Exchange (PX/BX)', desc: 'Tax-free shopping' },
    { emoji: '🏋️', name: 'Fitness Center', desc: 'Free for active duty' },
    { emoji: '💼', name: 'Family Readiness Center', desc: 'Employment, counseling, resources' },
    { emoji: '🎯', name: 'MWR Recreation', desc: 'Events, tickets, outdoor gear' },
    { emoji: '👶', name: 'Child Development Center', desc: 'On-base childcare' },
    { emoji: '⚖️', name: 'Legal Assistance Office', desc: 'Free legal help' },
    { emoji: '📚', name: 'Base Library', desc: 'Programs, study space' },
    { emoji: '🙏', name: 'Chapel / Chaplain', desc: 'Spiritual care, counseling' },
  ]

  const sortedPlaces = [...places].sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0))

  return (
    <div className="space-y-5 pb-6">
      {/* Base Resources */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">🏛️ Base Resources</CardTitle>
          <p className="text-xs text-muted-foreground">Key places on your installation to know</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {BASE_RESOURCES.map(r => (
              <div key={r.name} className="flex items-start gap-2 bg-slate-50 rounded-xl p-2.5">
                <span className="text-lg flex-shrink-0">{r.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800 leading-tight">{r.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Neighbors */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
            🏘️ People I&apos;ve Met
            <Badge variant="secondary" className="text-xs">{neighbors.length}</Badge>
          </h2>
          <Dialog open={neighborOpen} onOpenChange={setNeighborOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader><DialogTitle>Add a Person</DialogTitle></DialogHeader>
              <div className="space-y-3 mt-2">
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input placeholder="Neighbor's name" value={neighborForm.name}
                    onChange={e => setNeighborForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>How you know them</Label>
                  <Input placeholder="e.g. Next door, FRG, school pickup" value={neighborForm.connection}
                    onChange={e => setNeighborForm(f => ({ ...f, connection: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone (optional)</Label>
                  <Input placeholder="Phone number" value={neighborForm.phone}
                    onChange={e => setNeighborForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Notes (optional)</Label>
                  <Textarea placeholder="Kids' names, helpful info..." rows={2} value={neighborForm.notes}
                    onChange={e => setNeighborForm(f => ({ ...f, notes: e.target.value }))} />
                </div>
                <Button onClick={addNeighbor} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {neighbors.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center text-muted-foreground">
              <p className="text-3xl mb-2">🤝</p>
              <p className="text-sm">No one added yet — introduce yourself to a neighbor this week!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {neighbors.map(n => (
              <Card key={n.id} className="border-slate-200">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700 flex-shrink-0">
                        {n.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-800">{n.name}</p>
                        {n.connection && <p className="text-xs text-slate-500">{n.connection}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {n.phone && (
                        <a href={`tel:${n.phone}`} className="text-teal-600 hover:text-teal-800">
                          <Phone className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <button onClick={() => saveNeighbors(neighbors.filter(nb => nb.id !== n.id))}
                        className="text-slate-300 hover:text-red-400 ml-1">
                        <Trash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  {n.notes && <p className="text-xs text-slate-500 mt-1.5">{n.notes}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Local Places */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
            📍 Local Favorites
            <Badge variant="secondary" className="text-xs">{places.length}</Badge>
          </h2>
          <Dialog open={placeOpen} onOpenChange={setPlaceOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8">
                <Plus className="h-3.5 w-3.5 mr-1" /> Place
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader><DialogTitle>Add Local Place</DialogTitle></DialogHeader>
              <div className="space-y-3 mt-2">
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input placeholder="Place name" value={placeForm.name}
                    onChange={e => setPlaceForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select value={placeForm.category} onValueChange={v => setPlaceForm(f => ({ ...f, category: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent className="max-h-52">
                      {PLACE_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Address / Notes</Label>
                  <Input placeholder="Address or intersection" value={placeForm.address}
                    onChange={e => setPlaceForm(f => ({ ...f, address: e.target.value }))} />
                </div>
                <Button onClick={addPlace} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Add Place</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {places.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center text-muted-foreground">
              <p className="text-3xl mb-2">📍</p>
              <p className="text-sm">Start building your local map — grocery, coffee, gym...</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sortedPlaces.map(p => (
              <div key={p.id} className={cn(
                "flex items-start gap-2.5 border rounded-xl p-3 transition-all",
                p.favorite ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white"
              )}>
                <span className="text-xl flex-shrink-0">{p.category.split(' ')[0]}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-slate-800 truncate">{p.name}</p>
                  <p className="text-[10px] text-slate-500">{p.category.split(' ').slice(1).join(' ')}</p>
                  {p.address && <p className="text-xs text-slate-500 mt-0.5">{p.address}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <button onClick={() => toggleFav(p.id)}
                    className={cn("transition-colors", p.favorite ? "text-amber-500" : "text-slate-300 hover:text-amber-400")}>
                    <Star className="h-4 w-4" fill={p.favorite ? "currentColor" : "none"} />
                  </button>
                  <button onClick={() => savePlaces(places.filter(pl => pl.id !== p.id))}
                    className="text-slate-200 hover:text-red-400">
                    <Trash className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Community Links */}
      <Card className="bg-slate-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm text-slate-700 mb-2">🔗 Community Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { text: 'Military OneSource', url: 'https://www.militaryonesource.mil' },
              { text: 'Blue Star Families', url: 'https://bluestarfam.org' },
              { text: 'SECO — Spouse Employment', url: 'https://myseco.militaryonesource.mil' },
              { text: 'Military Installations', url: 'https://www.militaryinstallations.dod.mil' },
            ].map(r => (
              <a key={r.url} href={r.url} target="_blank" rel="noopener"
                className="flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 underline">
                <ExternalLink className="h-3 w-3 flex-shrink-0" /> {r.text}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
