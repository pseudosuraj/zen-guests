'use client'

import { useEffect, useState } from 'react'
import { updateTaskStatus } from '@/app/actions/updateTaskStatus'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClipboardList, Search, Filter, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

interface ServiceTask {
  id: string
  title: string
  status: string
  roomNumber: string
  createdAt: string
  priority: string
  assignedTo: string | null
  description: string | null
}

// Mock staff list - will fetch from API later
const staffMembers = [
  { id: '1', name: 'Ravi Kumar', role: 'Housekeeping' },
  { id: '2', name: 'Priya Sharma', role: 'Front Desk' },
  { id: '3', name: 'Amit Patel', role: 'F&B' },
]

export default function TaskManagerPage() {
  const [tasks, setTasks] = useState<ServiceTask[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null)

  useEffect(() => {
    void fetchTasks()
  }, [])

  async function fetchTasks() {
    try {
      setLoading(true)
      const res = await fetch('/api/tasks', { cache: 'no-store' })
      if (!res.ok) {
        console.error('GET /api/tasks failed with', res.status)
        setTasks([])
        return
      }
      const data = (await res.json()) as ServiceTask[]
      setTasks(data)
    } catch (error) {
      console.error('GET /api/tasks error:', error)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  // Handle task status updates
  async function handleStatusUpdate(taskId: string, newStatus: 'in-progress' | 'complete') {
    try {
      setUpdatingTaskId(taskId)
      await updateTaskStatus(taskId, newStatus)
      await fetchTasks() // Refresh to get updated data
    } catch (error) {
      console.error('Failed to update task:', error)
      alert('Failed to update task. Please try again.')
    } finally {
      setUpdatingTaskId(null)
    }
  }

  // Handle staff assignment - NOW SAVES TO DATABASE
  async function handleAssignTask(taskId: string, staffName: string) {
    try {
      setUpdatingTaskId(taskId)
      
      // Call API to save assignment
      const res = await fetch(`/api/tasks/${taskId}/assign`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffName }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to assign task')
      }

      // Refresh tasks to show updated assignment
      await fetchTasks()
      
    } catch (error) {
      console.error('Failed to assign task:', error)
      alert(error instanceof Error ? error.message : 'Failed to assign task. Please try again.')
    } finally {
      setUpdatingTaskId(null)
    }
  }

    // Filter tasks with smart completed task handling
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.roomNumber.includes(searchQuery)

    const matchesStatus =
      filterStatus === 'all' || task.status === filterStatus

    const matchesPriority =
      filterPriority === 'all' || task.priority === filterPriority

    // Auto-hide completed tasks older than 7 days UNLESS specifically filtered
    if (task.status === 'complete' && filterStatus !== 'complete') {
      const completedDate = new Date(task.createdAt)
      const daysSinceCompleted = (Date.now() - completedDate.getTime()) / (1000 * 60 * 60 * 24)
      if (daysSinceCompleted > 7) {
        return false // Hide tasks completed more than 7 days ago
      }
    }

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Group tasks by status
  const pendingTasks = filteredTasks.filter((t) => t.status === 'pending')
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'in-progress')
  const completedTasks = filteredTasks.filter((t) => t.status === 'complete')

  // Get all completed tasks count (including hidden ones) for stats
  const allCompletedCount = tasks.filter((t) => t.status === 'complete').length


  // Get status badge styling
  function getStatusBadge(status: string) {
    const styles = {
      pending: 'border-yellow-300 text-yellow-700 bg-yellow-50',
      'in-progress': 'border-blue-300 text-blue-700 bg-blue-50',
      complete: 'border-green-300 text-green-700 bg-green-50',
    }
    return styles[status as keyof typeof styles] || 'border-gray-300 text-gray-700 bg-gray-50'
  }

  // Get priority badge
  function getPriorityBadge(priority: string) {
    if (priority === 'high') {
      return <Badge variant="destructive" className="text-xs">High</Badge>
    }
    if (priority === 'medium') {
      return <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">Medium</Badge>
    }
    return <Badge variant="secondary" className="text-xs">Low</Badge>
  }

  // Format timestamp
  function formatTime(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)

    if (diffMinutes < 1) return 'Just now'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  // Task Card Component
  function TaskCard({ task }: { task: ServiceTask }) {
    const isCompleted = task.status === 'complete'
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                {getPriorityBadge(task.priority)}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  🛏️ Room {task.roomNumber}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTime(task.createdAt)}
                </span>
              </div>
              {task.description && (
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              )}
            </div>
            <Badge variant="outline" className={getStatusBadge(task.status)}>
              {task.status === 'in-progress' ? 'In Progress' : task.status}
            </Badge>
          </div>

          {/* Assignment Section - DISABLED FOR COMPLETED TASKS */}
          <div className="mb-3 p-2 bg-gray-50 rounded">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">
                {isCompleted ? 'Completed by:' : 'Assigned to:'}
              </span>
              {isCompleted ? (
                // Show static text for completed tasks
                <span className="text-sm font-medium text-gray-900">
                  {task.assignedTo || 'Not assigned'}
                </span>
              ) : (
                // Show dropdown for active tasks
                <Select
                  value={
                    task.assignedTo
                      ? staffMembers.find((s) => s.name === task.assignedTo)?.id || 'unassigned'
                      : 'unassigned'
                  }
                  onValueChange={(value) => {
                    if (value === 'unassigned') {
                      handleAssignTask(task.id, '')
                    } else {
                      const staff = staffMembers.find((s) => s.id === value)
                      if (staff) {
                        handleAssignTask(task.id, staff.name)
                      }
                    }
                  }}
                  disabled={updatingTaskId === task.id}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Assign staff..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">
                      <span className="text-gray-500">Not assigned</span>
                    </SelectItem>
                    {staffMembers.map((staff) => (
                      <SelectItem key={staff.id} value={staff.id}>
                        {staff.name} ({staff.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {task.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs"
                  onClick={() => handleStatusUpdate(task.id, 'in-progress')}
                  disabled={updatingTaskId === task.id}
                >
                  {updatingTaskId === task.id ? 'Updating...' : '▶ Start'}
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-xs"
                  onClick={() => handleStatusUpdate(task.id, 'complete')}
                  disabled={updatingTaskId === task.id}
                >
                  {updatingTaskId === task.id ? 'Updating...' : '✓ Complete'}
                </Button>
              </>
            )}

            {task.status === 'in-progress' && (
              <Button
                size="sm"
                className="w-full bg-green-600 hover:bg-green-700 text-xs"
                onClick={() => handleStatusUpdate(task.id, 'complete')}
                disabled={updatingTaskId === task.id}
              >
                {updatingTaskId === task.id ? 'Updating...' : '✓ Mark Complete'}
              </Button>
            )}

            {task.status === 'complete' && (
              <div className="w-full text-center py-2">
                <Badge className="bg-green-100 text-green-800">
                  ✅ Completed
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ClipboardList className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          </div>
          <p className="text-gray-600">Manage all guest requests and staff assignments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                Pending
              </CardDescription>
              <CardTitle className="text-3xl text-yellow-600">
                {pendingTasks.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                In Progress
              </CardDescription>
              <CardTitle className="text-3xl text-blue-600">
                {inProgressTasks.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Completed Today
              </CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {allCompletedCount}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Tasks</CardDescription>
              <CardTitle className="text-3xl">{tasks.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by task name or room number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="complete">Completed</SelectItem>
                </SelectContent>
              </Select>

              {/* Priority Filter */}
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={() => void fetchTasks()} variant="outline" disabled={loading}>
                {loading ? 'Refreshing...' : '🔄 Refresh'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Display - Tabbed View */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">
              All ({filteredTasks.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingTasks.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress ({inProgressTasks.length})
            </TabsTrigger>
            <TabsTrigger value="complete">
              Completed ({completedTasks.length})
            </TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading tasks...</p>
            </div>
          ) : (
            <>
              {/* All Tasks */}
              <TabsContent value="all">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredTasks.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No tasks found</p>
                    </div>
                  ) : (
                    filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
                  )}
                </div>
              </TabsContent>

              {/* Pending Tasks */}
              <TabsContent value="pending">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pendingTasks.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No pending tasks</p>
                    </div>
                  ) : (
                    pendingTasks.map((task) => <TaskCard key={task.id} task={task} />)
                  )}
                </div>
              </TabsContent>

              {/* In Progress Tasks */}
              <TabsContent value="in-progress">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {inProgressTasks.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No tasks in progress</p>
                    </div>
                  ) : (
                    inProgressTasks.map((task) => <TaskCard key={task.id} task={task} />)
                  )}
                </div>
              </TabsContent>

              {/* Completed Tasks */}
              <TabsContent value="complete">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {completedTasks.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No completed tasks</p>
                    </div>
                  ) : (
                    completedTasks.map((task) => <TaskCard key={task.id} task={task} />)
                  )}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  )
}
