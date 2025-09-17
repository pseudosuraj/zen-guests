// app/owner/dashboard/page.tsx
'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { updateTaskStatus } from "@/app/actions/updateTaskStatus";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ServiceTask {
  id: number;
  title: string;
  status: string;
  roomNumber: string;
  createdAt: string;
}

export default function OwnerDashboardPage() {
  const [tasks, setTasks] = useState<ServiceTask[]>([]);

  useEffect(() => {
    void fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await fetch("/api/tasks", { cache: "no-store" });
      if (!res.ok) {
        console.error("GET /api/tasks failed with", res.status);
        setTasks([]);
        return;
      }
      const data = (await res.json()) as ServiceTask[];
      setTasks(data.slice(0, 4));
    } catch (error) {
      console.error("GET /api/tasks error:", error);
      setTasks([]);
    }
  }

  // Helper function to create form action handlers
  function createTaskAction(taskId: string, newStatus: 'IN_PROGRESS' | 'COMPLETE') {
    return async (formData: FormData) => {
      await updateTaskStatus(taskId, newStatus);
      // Refresh the task list after update
      await fetchTasks();
    };
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Page Header */}
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
          {/* Revenue Intelligence */}
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

          {/* OTA Commission Saved */}
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

        {/* Summary Row: Interactive Urgent Tasks + Top Deals */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Interactive Urgent Tasks */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Urgent Tasks</CardTitle>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {tasks.length}
                </Badge>
              </div>
              <CardDescription>Real-time requests from guests - Click to manage</CardDescription>
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No pending tasks. Guest requests will appear here in real-time.
                </p>
              ) : (
                <ul className="space-y-4">
                  {tasks.map((task) => (
                    <li key={task.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-gray-900">{task.title}</p>
                          <p className="text-xs text-gray-500">
                            Room {task.roomNumber} • {new Date(task.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${
                            task.status === 'PENDING' 
                              ? 'border-yellow-300 text-yellow-700 bg-yellow-50' 
                              : task.status === 'IN_PROGRESS'
                              ? 'border-blue-300 text-blue-700 bg-blue-50'
                              : 'border-green-300 text-green-700 bg-green-50'
                          }`}
                        >
                          {task.status}
                        </Badge>
                      </div>

                      {/* Interactive Action Buttons - FIXED TYPE ERRORS */}
                      <div className="flex gap-2 justify-end">
                        {task.status === 'PENDING' && (
                          <>
                            <form action={createTaskAction(task.id.toString(), 'IN_PROGRESS')}>
                              <Button type="submit" size="sm" variant="outline" className="text-xs">
                                Start Progress
                              </Button>
                            </form>
                            <form action={createTaskAction(task.id.toString(), 'COMPLETE')}>
                              <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                                Mark Complete
                              </Button>
                            </form>
                          </>
                        )}

                        {task.status === 'IN_PROGRESS' && (
                          <form action={createTaskAction(task.id.toString(), 'COMPLETE')}>
                            <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                              Mark Complete
                            </Button>
                          </form>
                        )}

                        {task.status === 'COMPLETE' && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            ✅ Completed
                          </Badge>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => void fetchTasks()} className="text-sm">
                  Refresh
                </Button>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/owner/tasks">Go to Task Manager</Link>
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
  );
}
