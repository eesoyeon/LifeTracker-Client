"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Plus, StickyNote, TrendingUp } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { TopHeader } from "@/components/top-header"

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
    <div className="min-h-screen bg-black page-enter">
      <TopHeader title="Life Tracker" showLogo={true} />

      <main className="px-4 pt-20 pb-20 space-y-6">
        {/* 환영 메시지 - 최적화된 텍스트 대비 */}
        <div
          className={`bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-6 text-white border border-gray-700 shadow-mono-card card-hover-subtle transition-mono ${
            isVisible ? "text-reveal" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="heading-3 mb-2">안녕하세요! 👋</h2>
              <p className="text-description">오늘도 목표를 달성해보세요</p>
            </div>
            <div className="text-right">
              <div className="display-small transition-mono hover:scale-110">{completionRate}%</div>
              <div className="text-caption">완료율</div>
            </div>
          </div>
        </div>

        {/* 통계 카드 - 개선된 텍스트 가독성 */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: CheckCircle2, value: completedTodos, label: "완료" },
            { icon: Circle, value: totalTodos - completedTodos, label: "진행중" },
            { icon: StickyNote, value: memos.length, label: "메모" },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className={`border-gray-800 bg-gray-900 shadow-mono-card card-hover button-press gpu-accelerated ${
                  isVisible ? "list-item-enter" : "list-item-stagger"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 text-center">
                  <Icon className="h-8 w-8 text-white mx-auto mb-3 icon-pulse" />
                  <p className="display-small mb-1 transition-mono hover:text-gray-100">{stat.value}</p>
                  <p className="text-caption">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 오늘의 할 일 - 최적화된 텍스트 계층 */}
        <Card
          className={`border-gray-800 bg-gray-900 shadow-mono-card card-hover-subtle transition-mono ${
            isVisible ? "scroll-reveal visible" : "scroll-reveal"
          }`}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="heading-4 flex items-center text-reveal">
                <TrendingUp className="h-5 w-5 mr-3 icon-bounce" />
                오늘의 할 일
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="button-text-ghost shadow-mono-button button-bounce transition-mono"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todos.slice(0, 3).map((todo, index) => (
              <div
                key={todo.id}
                className={`flex items-center space-x-3 p-3 rounded-2xl hover:bg-gray-800 transition-mono hover:shadow-mono-glow card-hover-subtle gpu-accelerated ${
                  isVisible ? "list-item-enter" : "list-item-stagger"
                }`}
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                {todo.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 state-success" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400 flex-shrink-0 transition-mono hover:text-gray-200 hover:scale-110" />
                )}
                <div className="flex-1 min-w-0">
                  <p
                    className={`body-medium transition-mono ${
                      todo.completed ? "line-through text-muted" : "text-primary hover:text-secondary"
                    }`}
                  >
                    {todo.title}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`label-small shadow-mono-button transition-mono hover:scale-105 ${
                    todo.priority === "high"
                      ? "border-red-400 text-red-300 bg-red-500/10 hover:bg-red-500/20"
                      : todo.priority === "medium"
                        ? "border-yellow-400 text-yellow-300 bg-yellow-500/10 hover:bg-yellow-500/20"
                        : "border-green-400 text-green-300 bg-green-500/10 hover:bg-green-500/20"
                  }`}
                >
                  {todo.priority === "high" ? "높음" : todo.priority === "medium" ? "보통" : "낮음"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 최근 메모 - 개선된 텍스트 대비 */}
        <Card
          className={`border-gray-800 bg-gray-900 shadow-mono-card card-hover-subtle transition-mono ${
            isVisible ? "scroll-reveal visible" : "scroll-reveal"
          }`}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="heading-4 flex items-center text-reveal">
                <StickyNote className="h-5 w-5 mr-3 icon-bounce" />
                최근 메모
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="button-text-ghost shadow-mono-button button-bounce transition-mono"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {memos.slice(0, 2).map((memo, index) => (
              <div
                key={memo.id}
                className={`p-4 rounded-2xl border border-gray-800 hover:bg-gray-800 transition-mono shadow-mono-card hover:shadow-mono-glow card-hover-subtle gpu-accelerated ${
                  isVisible ? "list-item-enter" : "list-item-stagger"
                }`}
                style={{ animationDelay: `${(index + 6) * 100}ms` }}
              >
                <h4 className="label-large mb-2 transition-mono hover:text-secondary">{memo.title}</h4>
                <p className="body-small text-tertiary mb-3 line-clamp-2 transition-mono hover:text-secondary">
                  {memo.content}
                </p>
                <p className="text-meta">{memo.createdAt}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      <BottomNavigation currentPage="dashboard" />
    </div>
  )
}
