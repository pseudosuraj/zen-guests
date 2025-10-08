'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, LogOut, RefreshCw } from 'lucide-react'

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

export default function StaffDashboardPage() {
  const router = useRouter()
  const [session, setSession] = useState<StaffSession | null>(null)
  const [tasks, setTasks] = useState<ServiceTask[]>([])
  const [loading, setLoading] = useState(true)
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null)

  useEffect(() => {
    // Check if staff is logged in
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
      
      // Filter tasks assigned to this staff member
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

      // Show success feedback
      alert('✓ Task completed successfully!')

      // Refresh task list
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

  function getTaskIcon(title: string): string {
    const lowerTitle = title.toLowerCase()
    
    if (lowerTitle.includes('minibar') || lowerTitle.includes('coke') || lowerTitle.includes('beverage')) {
      return '🥤'
    }
    if (lowerTitle.includes('food') || lowerTitle.includes('biryani') || lowerTitle.includes('order')) {
      return '🍽️'
    }
    if (lowerTitle.includes('towel')) {
      return '🏩'
    }
    if (lowerTitle.includes('water')) {
      return '💧'
    }
    if (lowerTitle.includes('laundry')) {
      return '👔'
    }
    if (lowerTitle.includes('medicine')) {
      return '💊'
    }
    if (lowerTitle.includes('clean') || lowerTitle.includes('housekeeping')) {
      return '🧹'
    }
    
    return '🛎️'
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
              Logout
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
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} assigned to you
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
            Refresh
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="max-w-2xl mx-auto px-4 space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your tasks...</p>
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
          tasks.map((task) => (
            <Card 
              key={task.id} 
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                {/* Task Icon & Room */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{getTaskIcon(task.title)}</div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        Room {task.roomNumber}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {formatTime(task.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {task.priority === 'high' && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>

                {/* Task Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-gray-700 text-base leading-relaxed">
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Complete Button */}
                <Button
                  onClick={() => handleCompleteTask(task.id)}
                  disabled={completingTaskId === task.id}
                  className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold flex items-center justify-center gap-2"
                >
                  {completingTaskId === task.id ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Completing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      <span>Mark as Complete</span>
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  )
}
