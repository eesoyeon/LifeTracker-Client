"use client"

import { useState } from "react"
import { Menu, X, Home, CheckSquare, StickyNote, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MinimalNavigationProps {
  title: string
  currentPage: "dashboard" | "todos" | "memos" | "social" | "profile"
}

export function MinimalNavigation({ title, currentPage }: MinimalNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "홈", icon: Home, href: "/" },
    { id: "todos", label: "할 일", icon: CheckSquare, href: "/todos" },
    { id: "memos", label: "메모", icon: StickyNote, href: "/memos" },
    { id: "social", label: "소셜", icon: Users, href: "/social" },
    { id: "profile", label: "프로필", icon: User, href: "/profile" },
  ]

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false)

    // 페이지 전환 애니메이션
    document.body.classList.add("page-exit")

    setTimeout(() => {
      window.location.href = href
    }, 150)
  }

  return (
    <>
      {/* 상단 네비게이션 바 */}
      <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(true)}
            className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-2"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold text-white">{title}</h1>
          <div className="w-10" /> {/* 균형을 위한 빈 공간 */}
        </div>
      </header>

      {/* 사이드 메뉴 */}
      {isMenuOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 fade-in"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* 사이드 드로어 */}
          <div className="fixed top-0 left-0 h-full w-80 bg-gray-950 border-r border-gray-800 shadow-2xl z-50 slide-in-left">
            <div className="p-6">
              {/* 헤더 */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-white">메뉴</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* 네비게이션 아이템들 */}
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = currentPage === item.id

                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full justify-start h-12 px-4 rounded-xl transition-colors ${
                        isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  )
                })}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  )
}
