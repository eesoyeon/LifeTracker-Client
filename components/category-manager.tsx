"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus, Edit3, Trash2, Tag } from "lucide-react"
import { getIconComponent, iconOptions } from "@/lib/icons"

interface Category {
  id: string
  name: string
  color: string
  icon: string
}

interface CategoryManagerProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
  onAddCategory: (category: Omit<Category, "id">) => void
  onUpdateCategory: (id: string, category: Partial<Category>) => void
  onDeleteCategory: (id: string) => void
}

const colorOptions = [
  { name: "blue", label: "파랑", class: "bg-blue-500" },
  { name: "green", label: "초록", class: "bg-green-500" },
  { name: "red", label: "빨강", class: "bg-red-500" },
  { name: "purple", label: "보라", class: "bg-purple-500" },
  { name: "yellow", label: "노랑", class: "bg-yellow-500" },
  { name: "orange", label: "주황", class: "bg-orange-500" },
]

export function CategoryManager({
  isOpen,
  onClose,
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: CategoryManagerProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    color: "blue",
    icon: "briefcase",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim()) {
      if (editingId) {
        onUpdateCategory(editingId, formData)
        setEditingId(null)
      } else {
        onAddCategory(formData)
      }
      setFormData({ name: "", color: "blue", icon: "briefcase" })
      setIsCreating(false)
    }
  }

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      color: category.color,
      icon: category.icon,
    })
    setEditingId(category.id)
    setIsCreating(true)
  }

  const handleCancel = () => {
    setFormData({ name: "", color: "blue", icon: "briefcase" })
    setIsCreating(false)
    setEditingId(null)
  }

  const canDelete = (categoryId: string) => {
    return !["work", "personal", "health", "learning"].includes(categoryId)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <Card className="w-full sm:max-w-lg bg-gray-900 border-gray-800 rounded-t-3xl sm:rounded-2xl border-t sm:border max-h-[80vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              카테고리 관리
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="overflow-y-auto pb-6">
          <div className="space-y-4">
            {/* 새 카테고리 추가 버튼 */}
            {!isCreating && (
              <Button
                onClick={() => setIsCreating(true)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 border-dashed h-12"
              >
                <Plus className="h-4 w-4 mr-2" />새 카테고리 추가
              </Button>
            )}

            {/* 카테고리 생성/편집 폼 */}
            {isCreating && (
              <Card className="border-gray-700 bg-gray-800">
                <CardContent className="p-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoryName" className="text-sm font-medium text-gray-300">
                        이름
                      </Label>
                      <Input
                        id="categoryName"
                        placeholder="카테고리 이름"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 h-10"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">아이콘</Label>
                      <div className="grid grid-cols-6 gap-2">
                        {iconOptions.map((iconName) => {
                          const IconComponent = getIconComponent(iconName)
                          return (
                            <Button
                              key={iconName}
                              type="button"
                              variant={formData.icon === iconName ? "default" : "outline"}
                              size="sm"
                              onClick={() => setFormData({ ...formData, icon: iconName })}
                              className={`h-10 w-10 p-0 ${
                                formData.icon === iconName
                                  ? "bg-white text-black"
                                  : "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
                              }`}
                            >
                              <IconComponent className="h-4 w-4" />
                            </Button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">색상</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {colorOptions.map((color) => (
                          <Button
                            key={color.name}
                            type="button"
                            variant={formData.color === color.name ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFormData({ ...formData, color: color.name })}
                            className={`h-10 ${
                              formData.color === color.name
                                ? "bg-white text-black"
                                : "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
                            }`}
                          >
                            <div className={`w-3 h-3 rounded-full ${color.class} mr-2`} />
                            {color.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button type="submit" className="flex-1 bg-white text-black hover:bg-gray-200 h-10">
                        {editingId ? "수정" : "추가"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent h-10"
                      >
                        취소
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* 기존 카테고리 목록 */}
            <div className="space-y-2">
              {categories.map((category) => {
                const IconComponent = getIconComponent(category.icon)
                return (
                  <Card key={category.id} className="border-gray-700 bg-gray-800">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-4 w-4 text-gray-400" />
                          <div>
                            <h4 className="text-sm font-medium text-white">{category.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  colorOptions.find((c) => c.name === category.color)?.class || "bg-gray-500"
                                }`}
                              />
                              <span className="text-xs text-gray-400">
                                {colorOptions.find((c) => c.name === category.color)?.label || "기본"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(category)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          {canDelete(category.id) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDeleteCategory(category.id)}
                              className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
