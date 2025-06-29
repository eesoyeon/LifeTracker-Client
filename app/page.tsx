"use client"

import { useState, useEffect } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { Dashboard } from "@/components/dashboard"

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // 스플래시 화면을 2.5초 동안 보여준 후 로그인 화면으로 전환
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  // 임시로 인증 상태 확인 (실제로는 토큰 확인 등)
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token")
      setIsAuthenticated(!!token)
    }

    if (!showSplash) {
      checkAuth()
    }
  }, [showSplash])

  if (showSplash) {
    return <SplashScreen />
  }

  if (!isAuthenticated) {
    // 로그인 화면으로 리다이렉트
    window.location.href = "/auth"
    return null
  }

  return <Dashboard />
}
