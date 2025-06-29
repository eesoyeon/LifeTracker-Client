"use client"

import { useState } from "react"
import { Home, CheckSquare, StickyNote, User, Users, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModernNavigationProps {
  currentPage: "dashboard" | "todos" | "memos" | "social" | "profile"
}

export function ModernNavigation({ currentPage }: ModernNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "홈", icon: Home, href: "/", color: "from-blue-500 to-blue-600" },
    { id: "todos", label: "할 일", icon: CheckSquare, href: "/todos", color: "from-green-500 to-green-600" },
    { id: "memos", label: "메모", icon: StickyNote, href: "/memos", color: "from-yellow-500 to-yellow-600" },
    { id: "social", label: "소셜", icon: Users, href: "/social", color: "from-purple-500 to-purple-600" },
    { id: "profile", label: "프로필", icon: User, href: "/profile", color: "from-pink-500 to-pink-600" },
  ]

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false)
    setTimeout(() => {
      window.location.href = href
    }, 300)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* 플로팅 액션 버튼 */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          onClick={toggleMenu}
          className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-500 transform ${
            isMenuOpen
              ? "bg-red-500 hover:bg-red-600 rotate-45 scale-110"
              : "bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-gray-200 text-black hover:scale-110"
          }`}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </Button>
      </div>

      {/* 래디얼 메뉴 */}
      {isMenuOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* 메뉴 아이템들 */}
          <div className="fixed bottom-8 right-8 z-40">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              const angle = (index * 72 - 90) * (Math.PI / 180) // 72도씩 배치
              const radius = 120
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              return (
                <Button
                  key={item.id}
                  onClick={() => handleNavigation(item.href)}
                  className={`absolute w-14 h-14 rounded-full shadow-xl transition-all duration-500 transform ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white scale-110 ring-4 ring-white/30`
                      : "bg-white/90 hover:bg-white text-gray-700 hover:scale-105 backdrop-blur-xl"
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px) ${isActive ? "scale(1.1)" : "scale(1)"}`,
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex flex-col items-center">
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-medium mt-1">{item.label}</span>
                  </div>
                </Button>
              )
            })}
          </div>
        </>
      )}

      {/* 현재 페이지 인디케이터 */}
      <div className="fixed bottom-8 left-8 z-30">
        <div className="bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20">
          <div className="flex items-center space-x-2">
            {(() => {
              const currentItem = navItems.find((item) => item.id === currentPage)
              if (!currentItem) return null
              const Icon = currentItem.icon
              return (
                <>
                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${currentItem.color} rounded-full flex items-center justify-center`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{currentItem.label}</span>
                </>
              )
            })()}
          </div>
        </div>
      </div>
    </>
  )
}
