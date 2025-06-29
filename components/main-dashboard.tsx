"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Plus, StickyNote, Calendar, ArrowRight } from "lucide-react"
import { MinimalNavigation } from "@/components/minimal-navigation"
import { getIconComponent } from "@/lib/icons"

interface Category {
  id: string
  name: string
  color: string
  icon: string
}

interface Todo {
  id: string
  title: string
  completed: boolean
  priority: "high" | "medium" | "low"
  categoryId: string
  dueDate: string
  dueTime?: string
  createdAt: string
}

interface Memo {
  id: string
  title: string
  content: string
  createdAt: string
}

export function MainDashboard() {
  const [isLoading, setIsLoading] = useState(true)

  const [categories] = useState<Category[]>([
    { id: "work", name: "Work", color: "blue", icon: "briefcase" },
    { id: "personal", name: "Personal", color: "green", icon: "home" },
    { id: "health", name: "Health", color: "red", icon: "heart" },
    { id: "learning", name: "Learning", color: "purple", icon: "book-open" },
  ])

  const [todos] = useState<Todo[]>([
    {
      id: "1",
      title: "프로젝트 기획서 작성",
      completed: false,
      priority: "high",
      categoryId: "work",
      dueDate: "2025-07-15",
      dueTime: "14:00",
      createdAt: "2025-07-10",
    },
    {
      id: "2",
      title: "운동하기",
      completed: false,
      priority: "medium",
      categoryId: "health",
      dueDate: "2025-07-15",
      dueTime: "18:00",
      createdAt: "2025-07-10",
    },
    {
      id: "3",
      title: "React 공부",
      completed: true,
      priority: "low",
      categoryId: "learning",
      dueDate: "2025-07-14",
      createdAt: "2025-07-09",
    },
    {
      id: "4",
      title: "장보기",
      completed: false,
      priority: "medium",
      categoryId: "personal",
      dueDate: "2025-07-16",
      dueTime: "10:30",
      createdAt: "2025-07-10",
    },
  ])

  const [memos] = useState<Memo[]>([
    {
      id: "1",
      title: "프로젝트 아이디어",
      content: "새로운 할 일 관리 앱에 대한 아이디어를 정리해보자. 사용자 경험을 중심으로 한 심플한 디자인이 핵심이다.",
      createdAt: "2025-07-10",
    },
    {
      id: "2",
      title: "회의 메모",
      content: "오늘 팀 회의에서 논의된 내용들을 정리. 다음 스프린트 계획과 우선순위에 대해 이야기했다.",
      createdAt: "2025-07-09",
    },
  ])

  const getCategoryById = (id: string) => categories.find((cat) => cat.id === id)

  const getCategoryColor = (colorName: string) => {
    const colorMap = {
      blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      green: "text-green-400 bg-green-500/10 border-green-500/20",
      red: "text-red-400 bg-red-500/10 border-red-500/20",
      purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    }
    return colorMap[colorName as keyof typeof colorMap] || "text-gray-400 bg-gray-500/10 border-gray-500/20"
  }

  const formatTime = (timeString?: string) => {
    if (!timeString) return ""
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "오후" : "오전"
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${ampm} ${displayHour}:${minutes}`
  }

  const completedTodos = todos.filter((todo) => todo.completed).length
  const totalTodos = todos.length
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0

  // 오늘의 할 일
  const today = new Date().toISOString().split("T")[0]
  const todayTodos = todos.filter((todo) => todo.dueDate === today && !todo.completed).slice(0, 3)

  useEffect(() => {
    // 빠른 로딩 (스켈레톤 효과)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleNavigation = (path: string) => {
    window.location.href = path
  }

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="min-h-screen bg-black">
      <MinimalNavigation title="Life Tracker" currentPage="dashboard" />

      <main className="px-4 pt-20 pb-8 space-y-6">
        {/* 환영 메시지 */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">안녕하세요! 👋</h2>
              <p className="text-gray-400">오늘도 목표를 달성해보세요</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white mb-1">{completionRate}%</div>
              <div className="text-sm text-gray-400">완료율</div>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: CheckCircle2, value: completedTodos, label: "완료" },
            { icon: Circle, value: totalTodos - completedTodos, label: "진행중" },
            { icon: StickyNote, value: memos.length, label: "메모" },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-gray-800 bg-gray-900">
                <CardContent className="p-4 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                  <p className="text-2xl font-semibold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 오늘의 할 일 */}
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                오늘의 할 일
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation("/todos")}
                className="text-gray-400 hover:text-white hover:bg-gray-800 text-xs"
              >
                전체보기 <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayTodos.length > 0 ? (
              todayTodos.map((todo) => {
                const category = getCategoryById(todo.categoryId)
                if (!category) return null

                const IconComponent = getIconComponent(category.icon)
                const categoryColorClass = getCategoryColor(category.color)

                return (
                  <div key={todo.id} className="p-3 rounded-xl hover:bg-gray-800 transition-colors">
                    <div className="flex items-start space-x-3">
                      <Circle className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <div
                            className={`inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-xs font-medium ${categoryColorClass}`}
                          >
                            <IconComponent className="h-2.5 w-2.5" />
                            <span>{category.name}</span>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-white mb-1">{todo.title}</p>
                        {todo.dueTime && <p className="text-xs text-gray-400">{formatTime(todo.dueTime)}</p>}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">오늘 할 일을 모두 완료했습니다!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 최근 메모 */}
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white flex items-center">
                <StickyNote className="h-5 w-5 mr-3 text-gray-400" />
                최근 메모
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation("/memos")}
                className="text-gray-400 hover:text-white hover:bg-gray-800 text-xs"
              >
                전체보기 <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {memos.slice(0, 2).map((memo) => (
              <div key={memo.id} className="p-4 rounded-xl border border-gray-800 hover:bg-gray-800 transition-colors">
                <h4 className="text-sm font-medium text-white mb-2">{memo.title}</h4>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{memo.content}</p>
                <p className="text-xs text-gray-500">{memo.createdAt}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 빠른 액션 - 미니멀 디자인 */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => handleNavigation("/todos")}
            className="h-16 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 rounded-xl flex flex-col items-center justify-center space-y-1"
          >
            <Plus className="h-5 w-5" />
            <span className="text-sm">할 일 추가</span>
          </Button>
          <Button
            onClick={() => handleNavigation("/memos")}
            className="h-16 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 rounded-xl flex flex-col items-center justify-center space-y-1"
          >
            <StickyNote className="h-5 w-5" />
            <span className="text-sm">메모 작성</span>
          </Button>
        </div>
      </main>
    </div>
  )
}

// 스켈레톤 로딩 컴포넌트
function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      <MinimalNavigation title="Life Tracker" currentPage="dashboard" />

      <main className="px-4 pt-20 pb-8 space-y-6">
        {/* 환영 메시지 스켈레톤 */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-6 bg-gray-800 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-800 rounded w-48 animate-pulse"></div>
            </div>
            <div className="text-right">
              <div className="h-8 bg-gray-800 rounded w-16 mb-1 animate-pulse"></div>
              <div className="h-4 bg-gray-800 rounded w-12 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* 통계 카드 스켈레톤 */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="border-gray-800 bg-gray-900">
              <CardContent className="p-4 text-center">
                <div className="h-8 w-8 bg-gray-800 rounded mx-auto mb-3 animate-pulse"></div>
                <div className="h-6 bg-gray-800 rounded w-8 mx-auto mb-1 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-12 mx-auto animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 할 일 카드 스켈레톤 */}
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-800 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-800 rounded w-16 animate-pulse"></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="p-3 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="h-4 w-4 bg-gray-800 rounded-full flex-shrink-0 mt-1 animate-pulse"></div>
                  <div className="flex-1 min-w-0">
                    <div className="h-4 bg-gray-800 rounded w-16 mb-1 animate-pulse"></div>
                    <div className="h-4 bg-gray-800 rounded w-32 mb-1 animate-pulse"></div>
                    <div className="h-3 bg-gray-800 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 메모 카드 스켈레톤 */}
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-800 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-800 rounded w-16 animate-pulse"></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2].map((index) => (
              <div key={index} className="p-4 rounded-xl border border-gray-800">
                <div className="h-4 bg-gray-800 rounded w-24 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-800 rounded w-full mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-800 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-3 bg-gray-800 rounded w-16 animate-pulse"></div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 빠른 액션 스켈레톤 */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((index) => (
            <div key={index} className="h-16 bg-gray-800 rounded-xl border border-gray-700 animate-pulse"></div>
          ))}
        </div>
      </main>
    </div>
  )
}
