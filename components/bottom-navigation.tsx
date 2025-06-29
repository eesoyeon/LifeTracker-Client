"use client"

import { Home, CheckSquare, StickyNote, User, Users } from "lucide-react"

interface BottomNavigationProps {
  currentPage: "dashboard" | "todos" | "memos" | "social" | "profile"
}

export function BottomNavigation({ currentPage }: BottomNavigationProps) {
  const navItems = [
    { id: "dashboard", label: "홈", icon: Home, href: "/" },
    { id: "todos", label: "할 일", icon: CheckSquare, href: "/todos" },
    { id: "memos", label: "메모", icon: StickyNote, href: "/memos" },
    { id: "social", label: "소셜", icon: Users, href: "/social" },
    { id: "profile", label: "프로필", icon: User, href: "/profile" },
  ]

  const handleNavigation = (href: string) => {
    // 부드러운 페이지 전환 애니메이션
    document.body.classList.add("page-exit")

    setTimeout(() => {
      window.location.href = href
    }, 300)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800 px-4 py-2 shadow-mono-nav">
      <div className="flex justify-around">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.href)}
              className={`flex flex-col items-center py-2 px-3 rounded-2xl nav-item gpu-accelerated ${
                isActive
                  ? "text-black bg-white shadow-mono-glow-strong nav-item-active"
                  : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 shadow-mono-button hover:shadow-mono-button-hover transition-mono"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon className={`h-5 w-5 mb-1 transition-mono ${isActive ? "icon-bounce" : "hover:scale-110"}`} />
              <span className="label-small transition-mono">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
