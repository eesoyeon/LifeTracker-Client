"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, MoreVertical, Paperclip } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  type: "text" | "todo" | "memo"
  metadata?: {
    todoId?: string
    todoTitle?: string
    memoId?: string
    memoTitle?: string
  }
}

interface Friend {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  lastSeen: string
}

export default function ChatPage({ params }: { params: { friendId: string } }) {
  const [friend] = useState<Friend>({
    id: params.friendId,
    name: "김친구",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    lastSeen: "방금 전",
  })

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: params.friendId,
      content: "안녕! 오늘 할 일 어떻게 진행되고 있어?",
      timestamp: "오후 1:30",
      type: "text",
    },
    {
      id: "2",
      senderId: "me",
      content: "잘 진행되고 있어! 프로젝트 기획서 작성 완료했어",
      timestamp: "오후 1:32",
      type: "text",
    },
    {
      id: "3",
      senderId: "me",
      content: "할 일: 프로젝트 기획서 작성",
      timestamp: "오후 1:32",
      type: "todo",
      metadata: {
        todoId: "1",
        todoTitle: "프로젝트 기획서 작성",
      },
    },
    {
      id: "4",
      senderId: params.friendId,
      content: "우와 대단해! 나도 오늘 회의 준비 끝냈어",
      timestamp: "오후 1:35",
      type: "text",
    },
    {
      id: "5",
      senderId: params.friendId,
      content: "메모도 하나 공유할게",
      timestamp: "오후 2:20",
      type: "text",
    },
    {
      id: "6",
      senderId: params.friendId,
      content: "메모: 회의에서 논의할 주요 포인트들",
      timestamp: "오후 2:20",
      type: "memo",
      metadata: {
        memoId: "2",
        memoTitle: "회의에서 논의할 주요 포인트들",
      },
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: "me",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        type: "text",
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* 채팅 헤더 */}
      <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center space-x-3">
        <Link href="/social">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 ios-touch">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
            <AvatarFallback className="bg-gray-800 text-gray-300">{friend.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {friend.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-black" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-white">{friend.name}</h2>
          <p className="text-xs text-gray-400">{friend.isOnline ? "온라인" : friend.lastSeen}</p>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 ios-touch">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </header>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 hide-scrollbar">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] ${message.senderId === "me" ? "order-2" : "order-1"}`}>
              {message.senderId !== "me" && (
                <Avatar className="h-8 w-8 mb-2">
                  <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                  <AvatarFallback className="bg-gray-800 text-gray-300 text-xs">{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-3xl px-4 py-2 shadow-md ${
                  message.senderId === "me"
                    ? "bg-white text-black"
                    : message.type === "todo"
                      ? "bg-gray-800 border border-gray-700 text-gray-300"
                      : message.type === "memo"
                        ? "bg-gray-800 border border-gray-700 text-gray-300"
                        : "bg-gray-800 text-white"
                }`}
              >
                {message.type === "todo" && (
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span className="text-xs font-medium">할 일 공유</span>
                  </div>
                )}
                {message.type === "memo" && (
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span className="text-xs font-medium">메모 공유</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                {message.metadata && (
                  <div className="mt-2 p-2 rounded-lg bg-gray-700">
                    <p className="text-xs text-gray-400">{message.metadata.todoTitle || message.metadata.memoTitle}</p>
                  </div>
                )}
              </div>
              <p className={`text-xs text-gray-500 mt-1 ${message.senderId === "me" ? "text-right" : "text-left"}`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 메시지 입력 */}
      <div className="bg-gray-900 border-t border-gray-800 px-4 py-3">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 ios-touch">
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="메시지를 입력하세요..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-gray-800 border-gray-700 text-white focus:border-gray-600 pr-12"
            />
          </div>
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-white hover:bg-gray-200 text-black disabled:bg-gray-700 disabled:text-gray-500 ios-touch"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
