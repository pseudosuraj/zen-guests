'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, LogOut, RefreshCw, MapPin } from 'lucide-react'

interface StaffSession {
  id: string
  name: string
  role: string
}

interface ServiceTask {
  id: string
  title: string
  description: string | null
  status: string
  roomNumber: string
  priority: string
  assignedTo: string | null
  createdAt: string
}

interface TaskVisual {
  icon: string
  bgColor: string
  label: string
}

export default function StaffDashboardPage() {
  const router = useRouter()
  const [session, setSession] = useState<StaffSession | null>(null)
  const [tasks, setTasks] = useState<ServiceTask[]>([])
  const [loading, setLoading] = useState(true)
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null)

  useEffect(() => {
    const sessionData = sessionStorage.getItem('staffSession')
    if (!sessionData) {
      router.push('/staff/login')
      return
    }

    const staffSession = JSON.parse(sessionData) as StaffSession
    setSession(staffSession)
    void fetchTasks(staffSession.name)
  }, [router])

  async function fetchTasks(staffName: string) {
    try {
      setLoading(true)
      const res = await fetch('/api/tasks', { cache: 'no-store' })
      
      if (!res.ok) {
        console.error('Failed to fetch tasks')
        setTasks([])
        return
      }

      const allTasks = (await res.json()) as ServiceTask[]
      
      const myTasks = allTasks.filter(
        task => task.assignedTo === staffName && task.status !== 'complete'
      )

      setTasks(myTasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  async function handleCompleteTask(taskId: string) {
    if (!session) return

    try {
      setCompletingTaskId(taskId)

      const res = await fetch(`/api/tasks/${taskId}/complete`, {
        method: 'POST',
      })

      if (!res.ok) {
        alert('Failed to complete task. Please try again.')
        setCompletingTaskId(null)
        return
      }

      alert('✓ Task completed successfully!')
      void fetchTasks(session.name)
      setCompletingTaskId(null)
    } catch (error) {
      console.error('Error completing task:', error)
      alert('Unable to complete task. Please try again.')
      setCompletingTaskId(null)
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('staffSession')
    router.push('/staff/login')
  }

    function getTaskVisual(title: string, description: string | null): TaskVisual {
    const lowerTitle = title.toLowerCase()
    const lowerDesc = (description || '').toLowerCase()
    const combined = lowerTitle + ' ' + lowerDesc
    
    // Minibar items - Beverages & Snacks
    if (combined.includes('minibar') || combined.includes('coke') || combined.includes('sprite') || 
        combined.includes('lays') || combined.includes('kurkure') || combined.includes('kitkat') ||
        combined.includes('bisleri') || combined.includes('snack') || combined.includes('chip') ||
        combined.includes('beverage')) {
      return { icon: '🥤', bgColor: 'bg-blue-50', label: 'Minibar Delivery' }
    }
    
    // Food orders
    if (combined.includes('food') || combined.includes('biryani') || combined.includes('chicken') ||
        combined.includes('paneer') || combined.includes('dosa') || combined.includes('sandwich') ||
        combined.includes('breakfast') || combined.includes('lunch') || combined.includes('dinner') ||
        combined.includes('menu') || combined.includes('order')) {
      return { icon: '🍽️', bgColor: 'bg-orange-50', label: 'Food Service' }
    }
    
    // Towels - Better representation
    if (combined.includes('towel')) {
      return { icon: '🧺', bgColor: 'bg-cyan-50', label: 'Towel Request' }
    }
    
    // Water - Actual bottle representation
    if (combined.includes('water') || combined.includes('bottle')) {
      return { icon: '🍶', bgColor: 'bg-blue-50', label: 'Water Delivery' }
    }
    
    // Laundry
    if (combined.includes('laundry') || combined.includes('wash') || combined.includes('cloth')) {
      return { icon: '🧺', bgColor: 'bg-purple-50', label: 'Laundry Pickup' }
    }
    
    // Medicine
    if (combined.includes('medicine') || combined.includes('pharmacy') || combined.includes('tablet') ||
        combined.includes('crocin') || combined.includes('medical')) {
      return { icon: '💊', bgColor: 'bg-red-50', label: 'Medicine Delivery' }
    }
    
    // Housekeeping
    if (combined.includes('clean') || combined.includes('housekeeping') || combined.includes('tidy')) {
      return { icon: '🧹', bgColor: 'bg-green-50', label: 'Housekeeping' }
    }
    
    // Spa/Wellness - Better representation
    if (combined.includes('spa') || combined.includes('massage')) {
      return { icon: '💆', bgColor: 'bg-pink-50', label: 'Spa Service' }
    }
    
    // Default
    return { icon: '🛎️', bgColor: 'bg-gray-50', label: 'Room Service' }
  }


  function formatTime(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)
    
    if (diffMinutes < 1) return 'Just now'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Hi, {session.name}! 👋
              </h1>
              <p className="text-sm text-gray-600">{session.role}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Task Count & Refresh */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Your Tasks</h2>
            <p className="text-sm text-gray-600">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} assigned
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void fetchTasks(session.name)}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="max-w-2xl mx-auto px-4 space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="pt-6">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                All Done!
              </h3>
              <p className="text-gray-600">
                You have no pending tasks. Great job!
              </p>
            </CardContent>
          </Card>
        ) : (
          tasks.map((task) => {
            const visual = getTaskVisual(task.title, task.description)
            
            return (
              <Card 
                key={task.id} 
                className="shadow-lg hover:shadow-xl transition-shadow border-2"
              >
                <CardContent className="p-0">
                  {/* Visual Header with Icon */}
                  <div className={`${visual.bgColor} p-6 border-b-2`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Large Icon */}
                        <div className="text-6xl">{visual.icon}</div>
                        
                        {/* Room Number */}
                        <div>
                          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                            <MapPin className="w-4 h-4" />
                            <span className="font-medium">Room Number</span>
                          </div>
                          <div className="text-4xl font-bold text-gray-900">
                            {task.roomNumber}
                          </div>
                        </div>
                      </div>
                      
                      {/* Priority Badge */}
                      {task.priority === 'high' && (
                        <Badge variant="destructive" className="text-sm px-3 py-1">
                          URGENT
                        </Badge>
                      )}
                    </div>
                    
                    {/* Task Type Label */}
                    <div className="mt-4">
                      <Badge variant="secondary" className="text-sm px-3 py-1">
                        {visual.label}
                      </Badge>
                    </div>
                  </div>

                  {/* Task Details */}
                  <div className="p-6">
                    {/* Title with icon */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-2">
                      <span className="text-2xl">{visual.icon}</span>
                      <span className="flex-1">{task.title}</span>
                    </h3>
                    
                    {/* Description in clear format */}
                    {task.description && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                        <p className="text-gray-800 text-base leading-relaxed font-medium">
                          {task.description}
                        </p>
                      </div>
                    )}
                    
                    {/* Time stamp */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>Requested {formatTime(task.createdAt)}</span>
                    </div>

                    {/* Large Complete Button */}
                    <Button
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={completingTaskId === task.id}
                      className="w-full h-16 bg-green-600 hover:bg-green-700 text-white text-xl font-bold flex items-center justify-center gap-3 shadow-lg"
                    >
                      {completingTaskId === task.id ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          <span>Completing...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-7 h-7" />
                          <span>✓ Mark as Complete</span>
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Language Note (Future Feature) */}
      <div className="max-w-2xl mx-auto px-4 mt-8">
        <div className="text-center text-xs text-gray-500 bg-white rounded-lg p-3 border">
          🌐 Language support coming soon: Hindi, Marathi, Tamil & more
        </div>
      </div>
    </main>
  )
}
