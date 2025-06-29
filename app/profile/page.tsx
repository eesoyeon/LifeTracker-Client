"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Settings, LogOut, Edit3, Type } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { TopHeader } from "@/components/top-header"
import { FontSizeSelector } from "@/components/font-size-selector"


interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  joinDate: string
  avatar: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "김사용자",
    email: "user@example.com",
    phone: "010-1234-5678",
    location: "서울, 대한민국",
    joinDate: "2024-01-01",
    avatar: "/placeholder.svg?height=80&width=80",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editProfile, setEditProfile] = useState(profile)
  const [showFontSettings, setShowFontSettings] = useState(false)

  const handleSave = () => {
    setProfile(editProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditProfile(profile)
    setIsEditing(false)
  }

  const stats = [
    { label: "완료한 할 일", value: "24", color: "bg-white" },
    { label: "작성한 메모", value: "12", color: "bg-gray-300" },
    { label: "연속 사용일", value: "7", color: "bg-gray-500" },
  ]

  return (
    <div className="min-h-screen bg-black safe-area-top safe-area-bottom">
      <TopHeader title="프로필" />

      <main className="px-4 pt-20 pb-20 space-y-6">
        {/* 프로필 카드 */}
        <Card className="border-gray-800 bg-gray-900 rounded-2xl shadow-mono-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-20 w-20 bg-gray-800">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback className="bg-gray-800 text-gray-300 text-lg">{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="heading-3">{profile.name}</h2>
                <p className="text-quaternary body-medium">{profile.email}</p>
                <Badge variant="outline" className="mt-2 border-gray-600 text-gray-400 bg-gray-800 label-small">
                  {profile.joinDate}부터 사용
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="border-gray-700 text-gray-400 hover:bg-gray-800 button-press transition-mono"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <span className="text-black font-bold body-medium">{stat.value}</span>
                  </div>
                  <p className="caption text-quaternary">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 개인 정보 카드 */}
        <Card className="border-gray-800 bg-gray-900 rounded-2xl shadow-mono-card">
          <CardHeader>
            <CardTitle className="heading-5">개인 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="caption text-quaternary">이름</p>
                <p className="text-primary body-medium">{profile.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="caption text-quaternary">이메일</p>
                <p className="text-primary body-medium">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="caption text-quaternary">전화번호</p>
                <p className="text-primary body-medium">{profile.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="caption text-quaternary">위치</p>
                <p className="text-primary body-medium">{profile.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 접근성 설정 카드 */}
        <Card className="border-gray-800 bg-gray-900 rounded-2xl shadow-mono-card">
          <CardHeader>
            <CardTitle className="heading-5">접근성 설정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="ghost"
              onClick={() => setShowFontSettings(!showFontSettings)}
              className="w-full justify-start button-text-ghost hover:bg-gray-800 button-press transition-mono"
            >
              <Type className="h-5 w-5 mr-3" />
              <span className="body-medium">글자 크기 설정</span>
            </Button>
          </CardContent>
        </Card>

        {/* 폰트 크기 설정 */}
        {showFontSettings && <FontSizeSelector />}

        {/* 설정 메뉴 */}
        <Card className="border-gray-800 bg-gray-900 rounded-2xl shadow-mono-card">
          <CardHeader>
            <CardTitle className="heading-5">설정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start button-text-ghost hover:bg-gray-800 button-press transition-mono"
            >
              <Settings className="h-5 w-5 mr-3" />
              <span className="body-medium">앱 설정</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start button-text-ghost hover:bg-gray-800 button-press transition-mono"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="body-medium">로그아웃</span>
            </Button>
          </CardContent>
        </Card>

        {/* 프로필 편집 모달 */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 modal-backdrop">
            <Card className="w-full max-w-md border-gray-800 bg-gray-900 rounded-2xl shadow-mono-modal modal-content">
              <CardHeader>
                <CardTitle className="heading-5">프로필 편집</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="caption text-quaternary mb-1 block">이름</label>
                  <Input
                    value={editProfile.name}
                    onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-primary focus:border-gray-600 body-medium"
                  />
                </div>

                <div>
                  <label className="caption text-quaternary mb-1 block">전화번호</label>
                  <Input
                    value={editProfile.phone}
                    onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-primary focus:border-gray-600 body-medium"
                  />
                </div>

                <div>
                  <label className="caption text-quaternary mb-1 block">위치</label>
                  <Input
                    value={editProfile.location}
                    onChange={(e) => setEditProfile({ ...editProfile, location: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-primary focus:border-gray-600 body-medium"
                  />
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-white hover:bg-gray-200 text-black button-press transition-mono body-medium"
                  >
                    저장
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 border-gray-700 button-text-ghost bg-transparent hover:bg-gray-800 button-press transition-mono body-medium"
                  >
                    취소
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <BottomNavigation currentPage="profile" />
    </div>
  )
}
