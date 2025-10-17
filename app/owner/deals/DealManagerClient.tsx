"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Trash2, PlusCircle } from "lucide-react"
import { createDeal, updateDeal, deleteDeal } from "./actions"

// NOTE: Dates are always strings for display, not Date objects!
type Deal = {
  id: string
  title: string
  description: string | null
  price: number
  hotelId: string
  createdAt: string
  updatedAt: string
}

export default function DealManagerClient({
  initialDeals,
  hotelId
}: {
  initialDeals: Deal[]
  hotelId: string
}) {
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [isPending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: ""
  })

  // Utility to normalize a raw deal object from Prisma into displayable form
  function normalizeDealDates(deal: any): Deal {
    return {
      ...deal,
      createdAt: !!deal.createdAt && typeof deal.createdAt !== "string"
        ? new Date(deal.createdAt).toLocaleDateString("en-IN")
        : deal.createdAt,
      updatedAt: !!deal.updatedAt && typeof deal.updatedAt !== "string"
        ? new Date(deal.updatedAt).toLocaleDateString("en-IN")
        : deal.updatedAt,
    }
  }

  const handleCreate = () => {
    if (!formData.title || !formData.price) {
      alert("Please fill in title and price")
      return
    }
    startTransition(async () => {
      const newDealRaw = await createDeal({
        hotelId,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price)
      })
      const newDeal = normalizeDealDates(newDealRaw)
      setDeals([newDeal, ...deals])
      setIsCreating(false)
      setFormData({ title: "", description: "", price: "" })
    })
  }

  const handleUpdate = (id: string) => {
    if (!formData.title || !formData.price) {
      alert("Please fill in title and price")
      return
    }
    startTransition(async () => {
      const updatedRaw = await updateDeal(id, {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price)
      })
      const updated = normalizeDealDates(updatedRaw)
      setDeals(deals.map(d => d.id === id ? updated : d))
      setEditingId(null)
      setFormData({ title: "", description: "", price: "" })
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this deal?")) {
      return
    }
    startTransition(async () => {
      await deleteDeal(id)
      setDeals(deals.filter(d => d.id !== id))
    })
  }

  const startEdit = (deal: Deal) => {
    setEditingId(deal.id)
    setFormData({
      title: deal.title,
      description: deal.description || "",
      price: deal.price.toString()
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({ title: "", description: "", price: "" })
  }

  const cancelCreate = () => {
    setIsCreating(false)
    setFormData({ title: "", description: "", price: "" })
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Deals & Offers</h1>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-2 border-blue-200">
          <h2 className="text-xl font-semibold mb-4">Create New Deal</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="create-title">Title *</Label>
              <Input
                id="create-title"
                placeholder="e.g. Spa Discount 20% Off"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="create-description">Description</Label>
              <Textarea
                id="create-description"
                placeholder="Describe the deal..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="create-price">Price (₹) *</Label>
              <Input
                id="create-price"
                type="number"
                step="0.01"
                placeholder="e.g. 999"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleCreate} disabled={isPending}>
                {isPending ? "Creating..." : "Create Deal"}
              </Button>
              <Button variant="outline" onClick={cancelCreate} disabled={isPending}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Deals List */}
      {deals.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No deals yet. Create your first deal!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white p-6 rounded-lg shadow-md border">
              {editingId === deal.id ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`edit-title-${deal.id}`}>Title *</Label>
                    <Input
                      id={`edit-title-${deal.id}`}
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`edit-description-${deal.id}`}>Description</Label>
                    <Textarea
                      id={`edit-description-${deal.id}`}
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`edit-price-${deal.id}`}>Price (₹) *</Label>
                    <Input
                      id={`edit-price-${deal.id}`}
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => handleUpdate(deal.id)} disabled={isPending}>
                      {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button variant="outline" onClick={cancelEdit} disabled={isPending}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{deal.title}</h3>
                      {deal.description && (
                        <p className="text-gray-600 mt-2 whitespace-pre-line">{deal.description}</p>
                      )}
                      <p className="text-2xl font-bold text-green-600 mt-3">₹{deal.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Created: {deal.createdAt}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(deal)}
                        disabled={isPending}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(deal.id)}
                        disabled={isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))} 
        </div>
      )}
    </div>
  )
}
