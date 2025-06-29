"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Plus, StickyNote, TrendingUp } from "lucide-react"
import { MinimalNavigation } from "@/components/minimal-navigation"

interface Todo {
  id: string
  title: string
  completed: boolean
  priority: "high" | "medium" | "low"
}

interface Memo {
  id: string
  title: string
  content: string
  createdAt: string
}

export function Dashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const [todos] = useState<Todo[]>([
    { id: "1", title: "프로젝트 기획서 작성", completed: false, priority: "high" },
    { id: "2", title: "회의 준비", completed: true, priority: "medium" },
    { id: "3", title: "운동하기", completed: false, priority: "low" },
  ])

  const [memos] = useState<Memo[]>([
    { id: "1", title: "아이디어 노트", content: "새로운 기능에 대한 아이디어...", createdAt: "2024-01-15" },
    { id: "2", title: "회의 메모", content: "오늘 회의에서 논의된 내용...", createdAt: "2024-01-14" },
  ])

  const completedTodos = todos.filter((todo) => todo.completed).length
  const totalTodos = todos.length
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

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
              <div className="text-3xl font-bold text-white">{completionRate}%</div>
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
                  <Icon className="h-8 w-8 text-white mx-auto mb-3" />
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
                <TrendingUp className="h-5 w-5 mr-3" />
                오늘의 할 일
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todos.slice(0, 3).map((todo) => (
              <div
                key={todo.id}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                {todo.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${todo.completed ? "line-through text-gray-500" : "text-white"}`}>
                    {todo.title}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    todo.priority === "high"
                      ? "border-red-400 text-red-300 bg-red-500/10"
                      : todo.priority === "medium"
                        ? "border-yellow-400 text-yellow-300 bg-yellow-500/10"
                        : "border-green-400 text-green-300 bg-green-500/10"
                  }`}
                >
                  {todo.priority === "high" ? "높음" : todo.priority === "medium" ? "보통" : "낮음"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 최근 메모 */}
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white flex items-center">
                <StickyNote className="h-5 w-5 mr-3" />
                최근 메모
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Plus className="h-4 w-4" />
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
      </main>
    </div>
  )
}
