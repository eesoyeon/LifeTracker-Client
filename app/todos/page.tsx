"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Plus } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { TopHeader } from "@/components/top-header"

interface Todo {
  id: string
  title: string
  completed: boolean
  priority: "high" | "medium" | "low"
  createdAt: string
}

export default function TodosPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "프로젝트 기획서 작성", completed: false, priority: "high", createdAt: "2024-01-15" },
    { id: "2", title: "회의 준비", completed: true, priority: "medium", createdAt: "2024-01-14" },
    { id: "3", title: "운동하기", completed: false, priority: "low", createdAt: "2024-01-13" },
    { id: "4", title: "장보기", completed: false, priority: "medium", createdAt: "2024-01-12" },
    { id: "5", title: "독서하기", completed: true, priority: "low", createdAt: "2024-01-11" },
  ])

  const [newTodo, setNewTodo] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        title: newTodo,
        completed: false,
        priority: "medium",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTodos([todo, ...todos])
      setNewTodo("")
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  return (
    <div className="min-h-screen bg-black">
      <TopHeader title="할 일 관리" />

      <main
        className={`px-4 pt-20 pb-20 space-y-6 transition-all duration-500 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* 새 할 일 추가 */}
        <Card className="border-gray-800 bg-gray-900 shadow-mono-card">
          <CardContent className="p-4">
            <div className="flex space-x-3">
              <Input
                placeholder="새로운 할 일을 입력하세요"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
                className="flex-1 border-gray-700 focus:border-white bg-gray-800 text-white placeholder:text-gray-400 shadow-mono-inset focus:shadow-mono-glow body-medium"
              />
              <Button
                onClick={addTodo}
                className="bg-white hover:bg-gray-200 text-black shadow-mono-button transition-all-mono hover:shadow-mono-button-hover"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 필터 버튼 */}
        <div className="flex space-x-3">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={`transition-all-mono label-medium ${
              filter === "all"
                ? "bg-white hover:bg-gray-200 text-black shadow-mono-glow-strong"
                : "border-gray-700 text-gray-400 bg-gray-900 hover:bg-gray-800 hover:text-white shadow-mono-button hover:shadow-mono-button-hover"
            }`}
          >
            전체
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("active")}
            className={`transition-all-mono label-medium ${
              filter === "active"
                ? "bg-white hover:bg-gray-200 text-black shadow-mono-glow-strong"
                : "border-gray-700 text-gray-400 bg-gray-900 hover:bg-gray-800 hover:text-white shadow-mono-button hover:shadow-mono-button-hover"
            }`}
          >
            진행중
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
            className={`transition-all-mono label-medium ${
              filter === "completed"
                ? "bg-white hover:bg-gray-200 text-black shadow-mono-glow-strong"
                : "border-gray-700 text-gray-400 bg-gray-900 hover:bg-gray-800 hover:text-white shadow-mono-button hover:shadow-mono-button-hover"
            }`}
          >
            완료
          </Button>
        </div>

        {/* 할 일 목록 */}
        <div className="space-y-3">
          {filteredTodos.map((todo, index) => (
            <Card
              key={todo.id}
              className={`border-gray-800 bg-gray-900 shadow-mono-card hover:bg-gray-800 transition-all-mono hover:shadow-mono-card-hover hover:-translate-y-0.5 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <button onClick={() => toggleTodo(todo.id)} className="flex-shrink-0">
                    {todo.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-500 hover:text-gray-300" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`body-medium ${todo.completed ? "line-through text-tertiary" : "text-white"}`}>
                      {todo.title}
                    </p>
                    <p className="caption text-quaternary mt-1">{todo.createdAt}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`label-small flex-shrink-0 ${
                      todo.priority === "high"
                        ? "border-red-500 text-red-400 bg-red-500/10"
                        : todo.priority === "medium"
                          ? "border-yellow-500 text-yellow-400 bg-yellow-500/10"
                          : "border-green-500 text-green-400 bg-green-500/10"
                    }`}
                  >
                    {todo.priority === "high" ? "높음" : todo.priority === "medium" ? "보통" : "낮음"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTodos.length === 0 && (
          <div className="text-center py-16">
            <Circle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="heading-5 text-tertiary mb-2">
              {filter === "active"
                ? "진행중인 할 일이 없습니다"
                : filter === "completed"
                  ? "완료된 할 일이 없습니다"
                  : "할 일이 없습니다"}
            </h3>
            <p className="body-small text-quaternary">새로운 할 일을 추가해보세요</p>
          </div>
        )}
      </main>

      <BottomNavigation currentPage="todos" />
    </div>
  )
}
