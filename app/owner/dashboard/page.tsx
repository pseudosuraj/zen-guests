'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock } from "lucide-react"

interface ServiceTask {
  id: string
  title: string
  status: string
  roomNumber: string
  createdAt: string
  priority: string
}

export default function OwnerDashboardPage() {
  const [tasks, setTasks] = useState<ServiceTask[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void fetchTasks()
  }, [])

  async function fetchTasks() {
    try {
      setLoading(true)
      const res = await fetch("/api/tasks", { cache: "no-store" })
      if (!res.ok) {
        console.error("GET /api/tasks failed with", res.status)
        setTasks([])
        return
      }
      const data = (await res.json()) as ServiceTask[]
      const activeTasks = data.filter(t => t.status !== 'complete')
      setTasks(activeTasks.slice(0, 5))
    } catch (error) {
      console.error("GET /api/tasks error:", error)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)
    
    if (diffMinutes < 1) return 'Just now'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Hotel Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            An at-a-glance view of revenue impact and what needs attention today
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-800">
                  Total Incremental Revenue This Month
                </CardTitle>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 5v14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <CardDescription className="text-sm text-gray-500">
                New revenue via upgrades, experiences, and concierge services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-gray-900">₹12,450</div>
                  <div className="mt-2 flex items-center text-sm text-emerald-600">
                    <svg viewBox="0 0 24 24" className="mr-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    ↑ 18% from last month
                  </div>
                </div>
                <Badge className="bg-purple-600 hover:bg-purple-700">High Impact</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-800">
                  OTA Commission Saved This Month
                </CardTitle>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <CardDescription className="text-sm text-gray-500">
                Based on direct bookings & concierge services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-gray-900">₹3,120</div>
                  <div className="mt-2 text-sm text-gray-500">
                    Savings from reduced OTA fees and upsell-led revenue
                  </div>
                </div>
                <Badge variant="secondary">Moat</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Row */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Urgent Tasks - READ ONLY */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Urgent Tasks</CardTitle>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {tasks.length} Active
                </Badge>
              </div>
              <CardDescription>Click any task to assign staff in Task Manager</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Loading tasks...</p>
                </div>
              ) : tasks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-gray-500 font-medium">No pending tasks</p>
                  <p className="text-sm text-gray-400 mt-1">All guest requests handled!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <Link 
                      key={task.id} 
                      href="/owner/tasks"
                      className="block p-4 border rounded-lg bg-gray-50 hover:bg-white hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                              {task.title}
                            </p>
                            {task.priority === 'high' && (
                              <Badge variant="destructive" className="text-xs">High Priority</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              🛏️ Room {task.roomNumber}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTime(task.createdAt)}
                            </span>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={
                            task.status === 'pending'
                              ? 'border-yellow-300 text-yellow-700 bg-yellow-50'
                              : 'border-blue-300 text-blue-700 bg-blue-50'
                          }
                        >
                          {task.status === 'in-progress' ? 'In Progress' : 'Pending'}
                        </Badge>
                      </div>
                      
                      <div className="mt-2 flex items-center gap-1 text-xs text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Click to manage and assign staff</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-6 flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={() => void fetchTasks()} 
                  className="text-sm"
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : '🔄 Refresh'}
                </Button>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/owner/tasks">
                    View All Tasks
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Deals */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Top Performing Deals (This Week)</CardTitle>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">Sales</Badge>
              </div>
              <CardDescription>What's driving revenue right now</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                <li className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-purple-50 text-purple-700 text-xs font-semibold">1</span>
                    <span className="font-medium text-gray-900">Premium Suite Upgrade</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">28 sales</span>
                </li>
                <li className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-purple-50 text-purple-700 text-xs font-semibold">2</span>
                    <span className="font-medium text-gray-900">Local Biryani Delivery</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">22 sales</span>
                </li>
                <li className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-purple-50 text-purple-700 text-xs font-semibold">3</span>
                    <span className="font-medium text-gray-900">Gourmet Breakfast</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">19 sales</span>
                </li>
              </ul>

              <div className="mt-6 flex justify-end">
                <Button asChild variant="outline">
                  <Link href="/owner/deals">Open Deal Manager</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}