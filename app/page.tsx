"use client"

import { useState, useEffect } from "react"
import { MainDashboard } from "@/components/main-dashboard"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuthAndDecideFlow = async () => {
      const token = localStorage.getItem("auth_token")

      if (!token) {
        // 토큰이 없으면 로그인 페이지로 (애니메이션 없이)
        window.location.href = "/auth"
        return
      }

      // 로그인된 상태 - 짧은 로딩 애니메이션
      setIsAuthenticated(true)

      // 렌더링 준비 시간
      setTimeout(() => {
        setIsLoading(false)
      }, 400)
    }

    checkAuthAndDecideFlow()
  }, [])

  if (isLoading && isAuthenticated) {
    // 로그인된 상태에서는 빠른 스켈레톤 로딩
    return <QuickLoadingScreen />
  }

  if (!isAuthenticated) {
    return null // 리다이렉트 중
  }

  return <MainDashboard />
}

// 로그인된 사용자를 위한 빠른 로딩 화면
function QuickLoadingScreen() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative mx-auto w-16 h-16 mb-6">
          <div className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center animate-pulse">
            <div className="flex flex-col space-y-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}
