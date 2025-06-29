"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Clock, Plus } from "lucide-react"
import { getIconComponent } from "@/lib/icons"

interface Category {
  id: string
  name: string
  color: string
  icon: string
}

interface Todo {
  title: string
  completed: boolean
  priority: "high" | "medium" | "low"
  categoryId: string
  dueDate: string
  dueTime?: string
}

interface TodoCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (todo: Todo) => void
  categories: Category[]
  defaultDate: string
  selectedDateLabel: string
}

export function TodoCreateModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  defaultDate,
  selectedDateLabel,
}: TodoCreateModalProps) {
  const [formData, setFormData] = useState<Todo>({
    title: "",
    completed: false,
    priority: "medium",
    categoryId: categories[0]?.id || "",
    dueDate: defaultDate,
    dueTime: "",
  })

  const [showTimeSettings, setShowTimeSettings] = useState(false)

  // 5분 단위 시간 옵션 생성
  const generateTimeOptions = () => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        const displayTime = formatTimeDisplay(timeString)
        options.push({ value: timeString, label: displayTime })
      }
    }
    return options
  }

  const formatTimeDisplay = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "오후" : "오전"
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${ampm} ${displayHour}:${minutes}`
  }

  const timeOptions = generateTimeOptions()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onSubmit(formData)
      setFormData({
        title: "",
        completed: false,
        priority: "medium",
        categoryId: categories[0]?.id || "",
        dueDate: defaultDate,
        dueTime: "",
      })
      setShowTimeSettings(false)
      onClose()
    }
  }

  const handleChange = (field: keyof Todo, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <Card className="w-full sm:max-w-md bg-gray-900 border-gray-800 rounded-t-3xl sm:rounded-2xl border-t sm:border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-white">새 할 일</CardTitle>
              <p className="text-sm text-gray-400 mt-1">{selectedDateLabel}에 추가</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 제목 */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-300">
                할 일
              </Label>
              <Input
                id="title"
                placeholder="할 일을 입력하세요"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 h-11"
                required
                autoFocus
              />
            </div>

            {/* 카테고리 */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300">카테고리</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => {
                  const IconComponent = getIconComponent(category.icon)
                  return (
                    <Button
                      key={category.id}
                      type="button"
                      variant={formData.categoryId === category.id ? "default" : "outline"}
                      onClick={() => handleChange("categoryId", category.id)}
                      className={`h-10 justify-start text-sm ${
                        formData.categoryId === category.id
                          ? "bg-white text-black"
                          : "border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700"
                      }`}
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      {category.name}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* 시간 설정 토글 */}
            <div className="space-y-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowTimeSettings(!showTimeSettings)}
                className="w-full justify-start h-10 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700 border-dashed"
              >
                <Clock className="h-4 w-4 mr-2" />
                {showTimeSettings ? "시간 설정 숨기기" : "시간 설정하기"}
                <Plus className={`h-4 w-4 ml-auto transition-transform ${showTimeSettings ? "rotate-45" : ""}`} />
              </Button>

              {showTimeSettings && (
                <div className="space-y-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="space-y-2">
                    <Label htmlFor="dueTime" className="text-sm font-medium text-gray-300">
                      시간 선택
                    </Label>
                    <select
                      id="dueTime"
                      value={formData.dueTime}
                      onChange={(e) => handleChange("dueTime", e.target.value)}
                      className="w-full h-10 px-3 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:border-gray-500 focus:outline-none"
                    >
                      <option value="">시간 없음</option>
                      {timeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 우선순위 */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">우선순위</Label>
                    <div className="flex space-x-2">
                      {[
                        { key: "high", label: "높음" },
                        { key: "medium", label: "보통" },
                        { key: "low", label: "낮음" },
                      ].map((priority) => (
                        <Button
                          key={priority.key}
                          type="button"
                          variant={formData.priority === priority.key ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleChange("priority", priority.key)}
                          className={`flex-1 h-8 text-xs ${
                            formData.priority === priority.key
                              ? "bg-white text-black"
                              : "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
                          }`}
                        >
                          {priority.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 버튼 */}
            <div className="flex space-x-3 pt-2">
              <Button type="submit" className="flex-1 bg-white text-black hover:bg-gray-200 h-11">
                추가하기
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent h-11"
              >
                취소
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
