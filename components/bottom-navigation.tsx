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
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* 글래스모피즘 배경 */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl border-t border-white/10"></div>

      {/* 네비게이션 컨테이너 */}
      <div className="relative px-6 py-2 safe-area-bottom">
        {/* 플로팅 탭바 */}
        <div className="bg-gray-900/90 backdrop-blur-md rounded-3xl p-2 shadow-2xl border border-gray-800/50">
          <div className="flex justify-around items-center">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.href)}
                  className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 transform ${
                    isActive
                      ? "bg-white text-black scale-110 shadow-lg"
                      : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 hover:scale-105"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    minWidth: "60px",
                    minHeight: "60px",
                  }}
                >
                  {/* 활성 상태 배경 글로우 */}
                  {isActive && <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm scale-110"></div>}

                  {/* 아이콘 */}
                  <Icon
                    className={`h-6 w-6 mb-1 transition-all duration-300 relative z-10 ${
                      isActive ? "text-black" : "text-current"
                    }`}
                  />

                  {/* 라벨 */}
                  <span
                    className={`text-xs font-medium transition-all duration-300 relative z-10 ${
                      isActive ? "text-black" : "text-current"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* 활성 상태 인디케이터 */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"></div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* 홈 인디케이터 (iPhone 스타일) */}
        <div className="flex justify-center mt-2">
          <div className="w-32 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </nav>
  )
}
