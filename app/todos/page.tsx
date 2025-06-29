"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Plus, Settings, Filter, TrendingUp, MoreHorizontal } from "lucide-react"
import { MinimalNavigation } from "@/components/minimal-navigation"
import { TodoCreateModal } from "@/components/todo-create-modal"
import { CategoryManager } from "@/components/category-manager"
import { MinimalCalendar } from "@/components/minimal-calendar"
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

export default function TodosPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [categories, setCategories] = useState<Category[]>([
    { id: "work", name: "Work", color: "blue", icon: "briefcase" },
    { id: "personal", name: "Personal", color: "green", icon: "home" },
    { id: "health", name: "Health", color: "red", icon: "heart" },
    { id: "learning", name: "Learning", color: "purple", icon: "book-open" },
  ])

  const [todos, setTodos] = useState<Todo[]>([
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
      completed: true,
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
    {
      id: "5",
      title: "독서하기",
      completed: false,
      priority: "low",
      categoryId: "learning",
      dueDate: "2025-07-17",
      createdAt: "2025-07-09",
    },
    {
      id: "6",
      title: "회의 준비",
      completed: false,
      priority: "high",
      categoryId: "work",
      dueDate: "2025-07-16",
      dueTime: "09:00",
      createdAt: "2025-07-10",
    },
  ])

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    // 페이지 진입 애니메이션
    document.body.classList.add("page-enter")
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => {
      clearTimeout(timer)
      document.body.classList.remove("page-enter")
    }
  }, [])

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const addTodo = (todoData: Omit<Todo, "id" | "createdAt">) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setTodos([newTodo, ...todos])
  }

  const addCategory = (categoryData: Omit<Category, "id">) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
    }
    setCategories([...categories, newCategory])
  }

  const updateCategory = (id: string, categoryData: Partial<Category>) => {
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, ...categoryData } : cat)))
  }

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
    setTodos(todos.map((todo) => (todo.categoryId === id ? { ...todo, categoryId: "personal" } : todo)))
  }

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

  // 선택된 날짜의 할 일만 필터링
  const selectedDateString = selectedDate.toISOString().split("T")[0]
  const todosForSelectedDate = todos.filter((todo) => todo.dueDate === selectedDateString)

  const filteredTodos = todosForSelectedDate
    .filter((todo) => {
      if (filter === "active") return !todo.completed
      if (filter === "completed") return todo.completed
      return true
    })
    .filter((todo) => {
      if (selectedCategory === "all") return true
      return todo.categoryId === selectedCategory
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }
      if (a.dueTime && b.dueTime) {
        return a.dueTime.localeCompare(b.dueTime)
      }
      if (a.dueTime && !b.dueTime) return -1
      if (!a.dueTime && b.dueTime) return 1
      return 0
    })

  const formatTime = (timeString?: string) => {
    if (!timeString) return ""
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "오후" : "오전"
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${ampm} ${displayHour}:${minutes}`
  }

  const formatSelectedDate = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "오늘"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "내일"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "어제"
    } else {
      return date.toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
        weekday: "short",
      })
    }
  }

  const getTodosForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return todos.filter((todo) => todo.dueDate === dateString)
  }

  const activeTodosForDate = filteredTodos.filter((todo) => !todo.completed).length
  const completedTodosForDate = filteredTodos.filter((todo) => todo.completed).length
  const totalTodosForDate = filteredTodos.length

  const getStatusMessage = () => {
    if (totalTodosForDate === 0) {
      return "할 일이 없습니다"
    }
    if (activeTodosForDate === 0) {
      return "모든 할 일을 완료했습니다"
    }
    return `${activeTodosForDate}개의 할 일이 남았습니다`
  }

  const getStatusIcon = () => {
    if (totalTodosForDate === 0) return null
    if (activeTodosForDate === 0) return <CheckCircle2 className="h-4 w-4 text-gray-400" />
    return <TrendingUp className="h-4 w-4 text-gray-400" />
  }

  return (
    <div className="min-h-screen bg-black">
      <MinimalNavigation title="할 일" currentPage="todos" />

      <main className="px-4 pt-20 pb-24 space-y-4">
        {/* 달력 - 애니메이션 적용 */}
        <div className={`slide-up ${isVisible ? "" : "opacity-0"}`}>
          <MinimalCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            getTodosForDate={getTodosForDate}
          />
        </div>

        {/* 선택된 날짜 헤더 - 애니메이션 적용 */}
        <div className={`flex items-center justify-between slide-in-left stagger-1 ${isVisible ? "" : "opacity-0"}`}>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h2 className="text-lg font-medium text-white">{formatSelectedDate(selectedDate)}</h2>
              {getStatusIcon()}
            </div>
            <p className="text-sm text-gray-400">{getStatusMessage()}</p>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-gray-400 hover:text-white hover:bg-gray-800 h-8 w-8 p-0"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCategoryManager(true)}
              className="text-gray-400 hover:text-white hover:bg-gray-800 h-8 w-8 p-0"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 필터 - 애니메이션 적용 */}
        {showFilters && (
          <div className="space-y-3 p-3 bg-gray-900 rounded-xl border border-gray-800 scale-in">
            <div className="flex space-x-2">
              {[
                { key: "all", label: "전체" },
                { key: "active", label: "진행중" },
                { key: "completed", label: "완료" },
              ].map((filterOption) => (
                <Button
                  key={filterOption.key}
                  variant={filter === filterOption.key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(filterOption.key as typeof filter)}
                  className={
                    filter === filterOption.key
                      ? "bg-white text-black h-7 text-xs"
                      : "text-gray-400 hover:text-white hover:bg-gray-800 h-7 text-xs"
                  }
                >
                  {filterOption.label}
                </Button>
              ))}
            </div>

            <div className="flex space-x-2 overflow-x-auto">
              <Button
                variant={selectedCategory === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className={
                  selectedCategory === "all"
                    ? "bg-white text-black h-7 text-xs whitespace-nowrap"
                    : "text-gray-400 hover:text-white hover:bg-gray-800 h-7 text-xs whitespace-nowrap"
                }
              >
                전체
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-white text-black h-7 text-xs whitespace-nowrap"
                      : "text-gray-400 hover:text-white hover:bg-gray-800 h-7 text-xs whitespace-nowrap"
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* 할 일 목록 - 스태거 애니메이션 */}
        <div className="space-y-3">
          {filteredTodos.map((todo, index) => {
            const category = getCategoryById(todo.categoryId)

            if (!category) return null

            const IconComponent = getIconComponent(category.icon)
            const categoryColorClass = getCategoryColor(category.color)

            return (
              <Card
                key={todo.id}
                className={`border-gray-800 bg-gray-900 hover:bg-gray-800 transition-colors slide-in-right stagger-${Math.min(index + 2, 5)} ${isVisible ? "" : "opacity-0"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <button onClick={() => toggleTodo(todo.id)} className="flex-shrink-0 mt-1">
                      {todo.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400 hover:text-gray-200" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* 카테고리 */}
                      <div className="flex items-center space-x-2 mb-2">
                        <div
                          className={`inline-flex items-center space-x-1.5 px-2 py-1 rounded-md border text-xs font-medium ${categoryColorClass}`}
                        >
                          <IconComponent className="h-3 w-3" />
                          <span>{category.name}</span>
                        </div>
                      </div>

                      {/* 할 일 제목 */}
                      <p
                        className={`text-base font-medium mb-2 ${
                          todo.completed ? "line-through text-gray-500" : "text-white"
                        }`}
                      >
                        {todo.title}
                      </p>

                      {/* 시간 정보 */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {todo.dueTime && <span className="text-sm text-gray-400">{formatTime(todo.dueTime)}</span>}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 빈 상태 - 애니메이션 적용 */}
        {filteredTodos.length === 0 && (
          <div className={`text-center py-12 fade-in stagger-3 ${isVisible ? "" : "opacity-0"}`}>
            <Circle className="h-8 w-8 text-gray-600 mx-auto mb-3" />
            <h3 className="text-base font-medium text-gray-300 mb-1">
              {formatSelectedDate(selectedDate)}에 할 일이 없습니다
            </h3>
            <p className="text-sm text-gray-500">아래 버튼을 눌러 새로운 할 일을 추가해보세요</p>
          </div>
        )}
      </main>

      {/* 플로팅 할 일 추가 버튼 - 애니메이션 적용 */}
      <div className={`fixed bottom-20 right-4 z-40 scale-in stagger-4 ${isVisible ? "" : "opacity-0"}`}>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="h-14 w-14 rounded-full bg-white hover:bg-gray-200 text-black shadow-2xl hover:scale-105 transition-all duration-200"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* 모달들 */}
      <TodoCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={addTodo}
        categories={categories}
        defaultDate={selectedDateString}
        selectedDateLabel={formatSelectedDate(selectedDate)}
      />

      <CategoryManager
        isOpen={showCategoryManager}
        onClose={() => setShowCategoryManager(false)}
        categories={categories}
        onAddCategory={addCategory}
        onUpdateCategory={updateCategory}
        onDeleteCategory={deleteCategory}
      />
    </div>
  )
}
