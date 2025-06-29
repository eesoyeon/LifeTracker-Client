"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Todo {
  id: string
  title: string
  completed: boolean
  dueDate: string
  dueTime?: string
}

interface MinimalCalendarProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  getTodosForDate: (date: Date) => Todo[]
}

interface DateStatus {
  total: number
  completed: number
  hasOverdue: boolean
  isEmpty: boolean
}

export function MinimalCalendar({ selectedDate, onDateSelect, getTodosForDate }: MinimalCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))

  const today = new Date()
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  const lastDayOfPrevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate()

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"]

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
    onDateSelect(today)
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  const isPastDate = (date: Date) => {
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return dateOnly < todayOnly
  }

  const getDateStatus = (date: Date): DateStatus => {
    const todos = getTodosForDate(date)
    const completed = todos.filter((todo) => todo.completed).length
    const total = todos.length

    const hasOverdue = isPastDate(date) && completed < total && total > 0

    return {
      total,
      completed,
      hasOverdue,
      isEmpty: total === 0,
    }
  }

  const getDateStyles = (date: Date, status: DateStatus) => {
    const isSelectedDate = isSelected(date)
    const isTodayDate = isToday(date)

    if (isSelectedDate) {
      return "bg-white text-black"
    }

    if (status.isEmpty) {
      if (isTodayDate) {
        return "bg-gray-800 text-white hover:bg-gray-700"
      }
      return "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
    }

    // 할 일이 있는 경우
    if (status.completed === status.total) {
      // 모든 할 일 완료
      return "bg-gray-700 text-white hover:bg-gray-600"
    } else if (status.hasOverdue) {
      // 지연된 할 일
      return "bg-gray-600 text-red-300 hover:bg-gray-500"
    } else if (status.completed > 0) {
      // 일부 완료
      return "bg-gray-700 text-yellow-300 hover:bg-gray-600"
    } else {
      // 미완료
      return "bg-gray-700 text-blue-300 hover:bg-gray-600"
    }
  }

  const renderCalendarDays = () => {
    const days = []

    // 이전 달의 마지막 날들
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, lastDayOfPrevMonth - i)
      days.push(
        <button
          key={`prev-${lastDayOfPrevMonth - i}`}
          className="h-8 w-full text-gray-600 hover:text-gray-400 transition-colors text-xs rounded"
          onClick={() => onDateSelect(date)}
        >
          {lastDayOfPrevMonth - i}
        </button>,
      )
    }

    // 현재 달의 날들
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const status = getDateStatus(date)
      const styles = getDateStyles(date, status)

      days.push(
        <button
          key={day}
          onClick={() => onDateSelect(date)}
          className={`relative h-8 w-full text-xs font-medium transition-colors rounded ${styles}`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span>{day}</span>
            {!status.isEmpty && (
              <div className="text-[10px] opacity-70 leading-none">
                {status.completed}/{status.total}
              </div>
            )}
          </div>
        </button>,
      )
    }

    // 다음 달의 첫 날들
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day)
      days.push(
        <button
          key={`next-${day}`}
          className="h-8 w-full text-gray-600 hover:text-gray-400 transition-colors text-xs rounded"
          onClick={() => onDateSelect(date)}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  return (
    <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-medium text-white">
          {currentMonth.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
          })}
        </h3>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToToday}
            className="text-gray-400 hover:text-white hover:bg-gray-800 h-7 px-2 text-xs"
          >
            오늘
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPreviousMonth}
            className="text-gray-400 hover:text-white hover:bg-gray-800 h-7 w-7 p-0"
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextMonth}
            className="text-gray-400 hover:text-white hover:bg-gray-800 h-7 w-7 p-0"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekDays.map((day) => (
          <div key={day} className="h-6 flex items-center justify-center text-xs text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* 달력 그리드 */}
      <div className="grid grid-cols-7 gap-1 mb-3">{renderCalendarDays()}</div>

      {/* 간단한 범례 */}
      <div className="flex justify-center space-x-4 pt-2 border-t border-gray-800">
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <div className="w-2 h-2 bg-gray-700 rounded-sm"></div>
          <span>완료</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <div className="w-2 h-2 bg-gray-600 rounded-sm"></div>
          <span>지연</span>
        </div>
      </div>
    </div>
  )
}
