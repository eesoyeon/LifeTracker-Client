"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageCircle, Search, Plus, UserPlus } from "lucide-react"
import { MinimalNavigation } from "@/components/minimal-navigation"
import Link from "next/link"

interface Friend {
  id: string
  name: string
  email: string
  avatar: string
  status: "online" | "offline"
  lastSeen: string
  mutualTodos: number
}

interface ChatRoom {
  id: string
  friendId: string
  friendName: string
  friendAvatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
}

export default function SocialPage() {
  const [friends] = useState<Friend[]>([
    {
      id: "1",
      name: "김친구",
      email: "friend1@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastSeen: "방금 전",
      mutualTodos: 3,
    },
    {
      id: "2",
      name: "이동료",
      email: "friend2@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastSeen: "2시간 전",
      mutualTodos: 1,
    },
    {
      id: "3",
      name: "박팀원",
      email: "friend3@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastSeen: "방금 전",
      mutualTodos: 5,
    },
  ])

  const [chatRooms] = useState<ChatRoom[]>([
    {
      id: "1",
      friendId: "1",
      friendName: "김친구",
      friendAvatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "오늘 할 일 목록 공유해줄래?",
      lastMessageTime: "오후 2:30",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      friendId: "2",
      friendName: "이동료",
      friendAvatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "프로젝트 진행 상황 어때?",
      lastMessageTime: "오전 11:15",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "3",
      friendId: "3",
      friendName: "박팀원",
      friendAvatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "회의 메모 확인했어!",
      lastMessageTime: "어제",
      unreadCount: 1,
      isOnline: true,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("friends")

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredChats = chatRooms.filter(
    (chat) =>
      chat.friendName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-black">
      <MinimalNavigation title="소셜" currentPage="social" />

      <main className="px-4 pt-20 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-900 border-gray-800">
            <TabsTrigger
              value="friends"
              className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-400"
            >
              <Users className="h-4 w-4 mr-2" />
              친구 ({friends.length})
            </TabsTrigger>
            <TabsTrigger
              value="chats"
              className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-400"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              채팅 ({chatRooms.filter((chat) => chat.unreadCount > 0).length})
            </TabsTrigger>
          </TabsList>

          {/* 검색 및 추가 버튼 */}
          <div className="flex space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder={activeTab === "friends" ? "친구 검색..." : "채팅 검색..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-600"
              />
            </div>
            <Button className="bg-white hover:bg-gray-200 text-black">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* 친구 목록 탭 */}
          <TabsContent value="friends" className="space-y-3">
            {/* 친구 추가 카드 */}
            <Card className="border-gray-800 bg-gray-900 border-dashed rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-3 text-gray-500">
                  <UserPlus className="h-5 w-5" />
                  <span className="text-sm">이메일로 친구 초대하기</span>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                    초대
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 친구 목록 */}
            {filteredFriends.map((friend) => (
              <Card
                key={friend.id}
                className="border-gray-800 bg-gray-900 rounded-2xl hover:bg-gray-800 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                        <AvatarFallback className="bg-gray-800 text-gray-300">{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${
                          friend.status === "online" ? "bg-white" : "bg-gray-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-white">{friend.name}</h3>
                        {friend.mutualTodos > 0 && (
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400 bg-gray-800">
                            공유 {friend.mutualTodos}개
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{friend.email}</p>
                      <p className="text-xs text-gray-500">{friend.lastSeen}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/social/chat/${friend.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-400 bg-transparent hover:bg-gray-800"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredFriends.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">{searchTerm ? "검색 결과가 없습니다" : "아직 친구가 없습니다"}</p>
              </div>
            )}
          </TabsContent>

          {/* 채팅 목록 탭 */}
          <TabsContent value="chats" className="space-y-3">
            {filteredChats.map((chat) => (
              <Link key={chat.id} href={`/social/chat/${chat.friendId}`}>
                <Card className="border-gray-800 bg-gray-900 rounded-2xl hover:bg-gray-800 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={chat.friendAvatar || "/placeholder.svg"} alt={chat.friendName} />
                          <AvatarFallback className="bg-gray-800 text-gray-300">
                            {chat.friendName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {chat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-black" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-white truncate">{chat.friendName}</h3>
                          <span className="text-xs text-gray-500 flex-shrink-0">{chat.lastMessageTime}</span>
                        </div>
                        <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unreadCount > 0 && (
                        <div className="flex-shrink-0">
                          <div className="bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                            {chat.unreadCount}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {filteredChats.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">{searchTerm ? "검색 결과가 없습니다" : "채팅 기록이 없습니다"}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
