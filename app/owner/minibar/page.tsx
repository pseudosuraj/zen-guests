'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface MinibarItem {
  id: string
  name: string
  price: number
  category: string
  stockQuantity: number
  lowStockThreshold: number
  isAvailable: boolean
}

export default function MinibarManagerPage() {
  const [items, setItems] = useState<MinibarItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<MinibarItem | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Beverages',
    stockQuantity: '',
    lowStockThreshold: '5',
  })

  const DEMO_HOTEL_ID = 'demo-hotel-123'

  useEffect(() => {
    void fetchItems()
  }, [])

  async function fetchItems() {
    try {
      setLoading(true)
      const res = await fetch(`/api/hotels/${DEMO_HOTEL_ID}/minibar-manage`, {
        cache: 'no-store',
      })
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const method = editingItem ? 'PUT' : 'POST'
      const url = editingItem
        ? `/api/hotels/${DEMO_HOTEL_ID}/minibar-manage/${editingItem.id}`
        : `/api/hotels/${DEMO_HOTEL_ID}/minibar-manage`

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
          stockQuantity: parseInt(formData.stockQuantity),
          lowStockThreshold: parseInt(formData.lowStockThreshold),
        }),
      })

      if (res.ok) {
        alert(editingItem ? '✓ Item updated!' : '✓ Item added!')
        setShowAddDialog(false)
        setEditingItem(null)
        setFormData({
          name: '',
          price: '',
          category: 'Beverages',
          stockQuantity: '',
          lowStockThreshold: '5',
        })
        void fetchItems()
      } else {
        alert('Failed to save item')
      }
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Error saving item')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const res = await fetch(`/api/hotels/${DEMO_HOTEL_ID}/minibar-manage/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        alert('✓ Item deleted!')
        void fetchItems()
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  async function toggleAvailability(item: MinibarItem) {
    try {
      const res = await fetch(`/api/hotels/${DEMO_HOTEL_ID}/minibar-manage/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...item,
          isAvailable: !item.isAvailable,
        }),
      })

      if (res.ok) {
        void fetchItems()
      }
    } catch (error) {
      console.error('Error updating availability:', error)
    }
  }

  function openEditDialog(item: MinibarItem) {
    setEditingItem(item)
    setFormData({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      stockQuantity: item.stockQuantity.toString(),
      lowStockThreshold: item.lowStockThreshold.toString(),
    })
    setShowAddDialog(true)
  }

  const lowStockItems = items.filter(
    (item) => item.stockQuantity <= item.lowStockThreshold && item.isAvailable
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Minibar Inventory Manager
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your digital minibar items and track inventory
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        {lowStockItems.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <AlertTriangle className="w-5 h-5" />
                Low Stock Alert
              </CardTitle>
              <CardDescription className="text-orange-800">
                {lowStockItems.length} item(s) need restocking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Stock: {item.stockQuantity} (Threshold: {item.lowStockThreshold})
                      </p>
                    </div>
                    <Badge variant="destructive">Low Stock</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Minibar Items</CardTitle>
                <CardDescription>
                  Add, edit, and manage inventory for your digital minibar
                </CardDescription>
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Edit Item' : 'Add New Item'}
                    </DialogTitle>
                    <DialogDescription>
                      Fill in the details for your minibar item
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label>Item Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g., Coca Cola"
                        required
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beverages">Beverages</SelectItem>
                          <SelectItem value="Snacks">Snacks</SelectItem>
                          <SelectItem value="Cigarettes">Cigarettes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Price (₹)</Label>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="50"
                        required
                      />
                    </div>
                    <div>
                      <Label>Stock Quantity</Label>
                      <Input
                        type="number"
                        value={formData.stockQuantity}
                        onChange={(e) =>
                          setFormData({ ...formData, stockQuantity: e.target.value })
                        }
                        placeholder="20"
                        required
                      />
                    </div>
                    <div>
                      <Label>Low Stock Alert (Threshold)</Label>
                      <Input
                        type="number"
                        value={formData.lowStockThreshold}
                        onChange={(e) =>
                          setFormData({ ...formData, lowStockThreshold: e.target.value })
                        }
                        placeholder="5"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Alert when stock falls below this number
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                        {editingItem ? 'Update Item' : 'Add Item'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowAddDialog(false)
                          setEditingItem(null)
                          setFormData({
                            name: '',
                            price: '',
                            category: 'Beverages',
                            stockQuantity: '',
                            lowStockThreshold: '5',
                          })
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No minibar items yet. Add your first item!</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>₹{item.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{item.stockQuantity}</span>
                          {item.stockQuantity <= item.lowStockThreshold && (
                            <Badge variant="destructive" className="text-xs">
                              Low
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={item.isAvailable ? 'default' : 'secondary'}
                          className="cursor-pointer"
                          onClick={() => toggleAvailability(item)}
                        >
                          {item.isAvailable ? 'Available' : 'Unavailable'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(item)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
