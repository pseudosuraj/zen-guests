'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2, UserPlus, Users } from 'lucide-react'

// Types
interface StaffMember {
  id: string
  name: string
  role: 'Housekeeping' | 'F&B' | 'Front Desk' | 'Maintenance'
  phone: string
  pin: string
  isActive: boolean // Manual enable/disable by manager
  lastLoginAt: Date | null // Auto-tracked last login
}

// Mock data with realistic login timestamps
const mockStaffData: StaffMember[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    role: 'Housekeeping',
    phone: '+91 98765 43210',
    pin: '1234',
    isActive: true,
    lastLoginAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Front Desk',
    phone: '+91 98765 43211',
    pin: '5678',
    isActive: true,
    lastLoginAt: new Date(Date.now() - 10 * 60 * 1000), // 10 mins ago
  },
  {
    id: '3',
    name: 'Amit Patel',
    role: 'F&B',
    phone: '+91 98765 43212',
    pin: '9012',
    isActive: true,
    lastLoginAt: null, // Never logged in
  },
]

export default function StaffManagementPage() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(mockStaffData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null)

  // Form state for new staff
  const [newStaff, setNewStaff] = useState<Partial<StaffMember>>({
    name: '',
    role: 'Housekeeping',
    phone: '',
    pin: '',
  })

  // Helper: Format last login time
  const getLastLoginText = (lastLogin: Date | null) => {
    if (!lastLogin) return 'Never'
    
    const minutesAgo = Math.floor((Date.now() - lastLogin.getTime()) / (1000 * 60))
    
    if (minutesAgo < 1) return 'Just now'
    if (minutesAgo < 60) return `${minutesAgo}m ago`
    if (minutesAgo < 1440) return `${Math.floor(minutesAgo / 60)}h ago`
    return lastLogin.toLocaleDateString()
  }

  // Helper: Check if logged in within last 24 hours
  const isLoggedInToday = (lastLogin: Date | null) => {
    if (!lastLogin) return false
    const hoursAgo = (Date.now() - lastLogin.getTime()) / (1000 * 60 * 60)
    return hoursAgo < 24
  }

  // Add new staff member
  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.phone || !newStaff.pin) {
      alert('Please fill all fields')
      return
    }

    const staffMember: StaffMember = {
      id: Date.now().toString(),
      name: newStaff.name,
      role: newStaff.role as StaffMember['role'],
      phone: newStaff.phone,
      pin: newStaff.pin,
      isActive: true,
      lastLoginAt: null, // New staff haven't logged in yet
    }

    setStaffMembers([...staffMembers, staffMember])
    
    // Reset form
    setNewStaff({
      name: '',
      role: 'Housekeeping',
      phone: '',
      pin: '',
    })
    
    setIsAddDialogOpen(false)
    
    // TODO: API call to save to database
    console.log('Staff added:', staffMember)
  }

  // Edit staff member
  const handleEditStaff = () => {
    if (!editingStaff) return

    setStaffMembers(
      staffMembers.map((staff) =>
        staff.id === editingStaff.id ? editingStaff : staff
      )
    )

    setIsEditDialogOpen(false)
    setEditingStaff(null)

    // TODO: API call to update database
    console.log('Staff updated:', editingStaff)
  }

  // Toggle staff account status
  const toggleStaffStatus = (id: string) => {
    setStaffMembers(
      staffMembers.map((staff) =>
        staff.id === id ? { ...staff, isActive: !staff.isActive } : staff
      )
    )

    // TODO: API call to update database
    console.log('Staff status toggled:', id)
  }

  // Delete staff member
  const handleDeleteStaff = (id: string) => {
    if (confirm('Are you sure you want to remove this staff member?')) {
      setStaffMembers(staffMembers.filter((staff) => staff.id !== id))
      
      // TODO: API call to delete from database
      console.log('Staff deleted:', id)
    }
  }

  // Get role badge color
  const getRoleBadge = (role: string) => {
    const colors = {
      Housekeeping: 'bg-blue-100 text-blue-800',
      'F&B': 'bg-green-100 text-green-800',
      'Front Desk': 'bg-purple-100 text-purple-800',
      Maintenance: 'bg-orange-100 text-orange-800',
    }
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  // Calculate active today count
  const activeToday = staffMembers.filter(s => isLoggedInToday(s.lastLoginAt)).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          </div>
          <p className="text-gray-600">
            Manage your hotel staff and their access to the task system
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Staff</CardDescription>
              <CardTitle className="text-3xl">{staffMembers.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Today</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {activeToday}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Departments</CardDescription>
              <CardTitle className="text-3xl">4</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Staff Members</CardTitle>
                <CardDescription>
                  Add and manage staff who can access the task portal
                </CardDescription>
              </div>

              {/* Add New Staff Dialog */}
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New Staff Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Staff Member</DialogTitle>
                    <DialogDescription>
                      Create a new staff account with access to the task portal
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    {/* Name Input */}
                    <div className="grid gap-2">
                      <Label htmlFor="name">Staff Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Ravi Kumar"
                        value={newStaff.name}
                        onChange={(e) =>
                          setNewStaff({ ...newStaff, name: e.target.value })
                        }
                      />
                    </div>

                    {/* Role Select */}
                    <div className="grid gap-2">
                      <Label htmlFor="role">Role / Department</Label>
                      <Select
                        value={newStaff.role}
                        onValueChange={(value) =>
                          setNewStaff({
                            ...newStaff,
                            role: value as StaffMember['role'],
                          })
                        }
                      >
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Housekeeping">🧹 Housekeeping</SelectItem>
                          <SelectItem value="F&B">🍽️ F&B (Food & Beverage)</SelectItem>
                          <SelectItem value="Front Desk">🏨 Front Desk</SelectItem>
                          <SelectItem value="Maintenance">🔧 Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Phone Input */}
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number / Staff ID</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={newStaff.phone}
                        onChange={(e) =>
                          setNewStaff({ ...newStaff, phone: e.target.value })
                        }
                      />
                      <p className="text-xs text-gray-500">
                        Used for login identification
                      </p>
                    </div>

                    {/* PIN Input */}
                    <div className="grid gap-2">
                      <Label htmlFor="pin">4-Digit PIN</Label>
                      <Input
                        id="pin"
                        type="text"
                        maxLength={4}
                        placeholder="1234"
                        value={newStaff.pin}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          setNewStaff({ ...newStaff, pin: value })
                        }}
                      />
                      <p className="text-xs text-gray-500">
                        Simple PIN for staff portal login
                      </p>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={handleAddStaff}
                    >
                      Add Staff Member
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent>
            {/* Staff Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>PIN</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffMembers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No staff members added yet. Click "Add New Staff Member" to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    staffMembers.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell className="font-medium">{staff.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getRoleBadge(staff.role)}
                          >
                            {staff.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {staff.phone}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {staff.pin}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-600">
                              {getLastLoginText(staff.lastLoginAt)}
                            </span>
                            {isLoggedInToday(staff.lastLoginAt) && (
                              <Badge className="w-fit bg-green-100 text-green-800 text-xs">
                                🟢 Online Today
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleStaffStatus(staff.id)}
                            className="h-auto p-0"
                          >
                            <Badge
                              variant="secondary"
                              className={
                                staff.isActive
                                  ? 'bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200'
                                  : 'bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200'
                              }
                            >
                              {staff.isActive ? 'Enabled' : 'Disabled'}
                            </Badge>
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {/* Edit Dialog */}
                            <Dialog
                              open={isEditDialogOpen && editingStaff?.id === staff.id}
                              onOpenChange={(open) => {
                                setIsEditDialogOpen(open)
                                if (open) setEditingStaff(staff)
                                else setEditingStaff(null)
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <Pencil className="w-4 h-4 text-blue-600" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Staff Member</DialogTitle>
                                  <DialogDescription>
                                    Update staff information and credentials
                                  </DialogDescription>
                                </DialogHeader>

                                {editingStaff && (
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-name">Staff Name</Label>
                                      <Input
                                        id="edit-name"
                                        value={editingStaff.name}
                                        onChange={(e) =>
                                          setEditingStaff({
                                            ...editingStaff,
                                            name: e.target.value,
                                          })
                                        }
                                      />
                                    </div>

                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-role">Role</Label>
                                      <Select
                                        value={editingStaff.role}
                                        onValueChange={(value) =>
                                          setEditingStaff({
                                            ...editingStaff,
                                            role: value as StaffMember['role'],
                                          })
                                        }
                                      >
                                        <SelectTrigger id="edit-role">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Housekeeping">
                                            🧹 Housekeeping
                                          </SelectItem>
                                          <SelectItem value="F&B">
                                            🍽️ F&B (Food & Beverage)
                                          </SelectItem>
                                          <SelectItem value="Front Desk">
                                            🏨 Front Desk
                                          </SelectItem>
                                          <SelectItem value="Maintenance">
                                            🔧 Maintenance
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-phone">Phone Number</Label>
                                      <Input
                                        id="edit-phone"
                                        value={editingStaff.phone}
                                        onChange={(e) =>
                                          setEditingStaff({
                                            ...editingStaff,
                                            phone: e.target.value,
                                          })
                                        }
                                      />
                                    </div>

                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-pin">4-Digit PIN</Label>
                                      <Input
                                        id="edit-pin"
                                        type="text"
                                        maxLength={4}
                                        value={editingStaff.pin}
                                        onChange={(e) => {
                                          const value = e.target.value.replace(/\D/g, '')
                                          setEditingStaff({
                                            ...editingStaff,
                                            pin: value,
                                          })
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}

                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => setIsEditDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className="bg-purple-600 hover:bg-purple-700"
                                    onClick={handleEditStaff}
                                  >
                                    Save Changes
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            {/* Delete Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleDeleteStaff(staff.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex gap-3">
                <div className="text-blue-600 mt-0.5">ℹ️</div>
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">How it works:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li><strong>Last Login:</strong> Shows when staff last accessed their portal</li>
                    <li><strong>🟢 Online Today:</strong> Appears if logged in within last 24 hours</li>
                    <li><strong>Account Status:</strong> Click "Enabled/Disabled" badge to toggle access</li>
                    <li><strong>Staff Login:</strong> They use their phone number + 4-digit PIN</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
