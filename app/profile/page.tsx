"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Settings, LogOut, Type, Bell, HelpCircle, ChevronRight, Edit } from "lucide-react"
import { MinimalNavigation } from "@/components/minimal-navigation"
import { FontSizeSelector } from "@/components/font-size-selector"

interface UserProfile {
  displayName: string
  email: string
  profileImageUrl: string
  provider: "google" | "naver" | "kakao"
  joinDate: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    displayName: "김사용자",
    email: "user@example.com",
    profileImageUrl: "/placeholder.svg?height=80&width=80",
    provider: "google",
    joinDate: "2024-01-01",
  })

  const [showFontSettings, setShowFontSettings] = useState(false)

  useEffect(() => {
    // 실제 구현에서는 여기서 DB 조회
  }, [])

  const stats = [
    { label: "완료한 할 일", value: "24" },
    { label: "작성한 메모", value: "12" },
    { label: "연속 사용일", value: "7" },
  ]

  const getProviderInfo = (provider: string) => {
    switch (provider) {
      case "google":
        return { name: "Google", color: "bg-gray-800" }
      case "naver":
        return { name: "네이버", color: "bg-gray-800" }
      case "kakao":
        return { name: "카카오", color: "bg-gray-800" }
      default:
        return { name: "Unknown", color: "bg-gray-800" }
    }
  }

  const providerInfo = getProviderInfo(profile.provider)

  return (
    <div className="min-h-screen bg-black">
      <MinimalNavigation title="프로필" currentPage="profile" />

      <main className="pt-20 pb-8">
        {/* 프로필 헤더 */}
        <div className="px-6 py-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.profileImageUrl || "/placeholder.svg"} alt={profile.displayName} />
              <AvatarFallback className="bg-gray-800 text-gray-200 text-xl font-medium">
                {profile.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-white mb-1">{profile.displayName}</h1>
              <p className="text-gray-400 mb-2">{profile.email}</p>
              <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs border-gray-700">
                {providerInfo.name} 계정
              </Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
              <Edit className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* 통계 */}
        <div className="px-6 mb-8">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center py-4">
                <div className="text-2xl font-semibold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 설정 메뉴 */}
        <div className="px-6 space-y-1">
          <Button
            variant="ghost"
            onClick={() => setShowFontSettings(!showFontSettings)}
            className="w-full justify-between h-14 px-4 text-white hover:bg-gray-900 rounded-xl"
          >
            <div className="flex items-center">
              <Type className="h-5 w-5 text-gray-400 mr-3" />
              <span>글자 크기</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>

          <Button variant="ghost" className="w-full justify-between h-14 px-4 text-white hover:bg-gray-900 rounded-xl">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-gray-400 mr-3" />
              <span>알림</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>

          <Button variant="ghost" className="w-full justify-between h-14 px-4 text-white hover:bg-gray-900 rounded-xl">
            <div className="flex items-center">
              <Settings className="h-5 w-5 text-gray-400 mr-3" />
              <span>설정</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>

          <Button variant="ghost" className="w-full justify-between h-14 px-4 text-white hover:bg-gray-900 rounded-xl">
            <div className="flex items-center">
              <HelpCircle className="h-5 w-5 text-gray-400 mr-3" />
              <span>도움말</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>
        </div>

        {/* 폰트 크기 설정 */}
        {showFontSettings && (
          <div className="px-6 mt-6">
            <FontSizeSelector />
          </div>
        )}

        {/* 로그아웃 */}
        <div className="px-6 mt-8">
          <Button
            variant="ghost"
            className="w-full justify-between h-14 px-4 text-red-400 hover:bg-red-950/20 rounded-xl"
          >
            <div className="flex items-center">
              <LogOut className="h-5 w-5 text-red-400 mr-3" />
              <span>로그아웃</span>
            </div>
            <ChevronRight className="h-5 w-5 text-red-400" />
          </Button>
        </div>
      </main>
    </div>
  )
}
