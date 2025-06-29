"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit3, Trash2 } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { TopHeader } from "@/components/top-header"

interface Memo {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function MemosPage() {
  const [memos, setMemos] = useState<Memo[]>([
    {
      id: "1",
      title: "프로젝트 아이디어",
      content: "새로운 할 일 관리 앱에 대한 아이디어를 정리해보자. 사용자 경험을 중심으로 한 심플한 디자인이 핵심이다.",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "회의 메모",
      content: "오늘 팀 회의에서 논의된 내용들을 정리. 다음 스프린트 계획과 우선순위에 대해 이야기했다.",
      createdAt: "2024-01-14",
      updatedAt: "2024-01-14",
    },
    {
      id: "3",
      title: "독서 노트",
      content: "읽고 있는 책에서 인상 깊었던 구절들을 기록. 특히 생산성에 관한 부분이 도움이 되었다.",
      createdAt: "2024-01-13",
      updatedAt: "2024-01-13",
    },
  ])

  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newMemo, setNewMemo] = useState({ title: "", content: "" })
  const [searchTerm, setSearchTerm] = useState("")

  const addMemo = () => {
    if (newMemo.title.trim() && newMemo.content.trim()) {
      const memo: Memo = {
        id: Date.now().toString(),
        title: newMemo.title,
        content: newMemo.content,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      }
      setMemos([memo, ...memos])
      setNewMemo({ title: "", content: "" })
      setIsCreating(false)
    }
  }

  const deleteMemo = (id: string) => {
    setMemos(memos.filter((memo) => memo.id !== id))
  }

  const filteredMemos = memos.filter(
    (memo) =>
      memo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memo.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-black safe-area-top safe-area-bottom">
      <TopHeader title="메모 관리" />

      <main className="px-4 pt-20 pb-20 space-y-4">
        {/* 검색 및 추가 버튼 */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="메모 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-800 focus:border-gray-600 bg-gray-900 text-white placeholder:text-gray-500"
            />
          </div>
          <Button onClick={() => setIsCreating(true)} className="bg-white text-black hover:bg-gray-200 ios-touch">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* 새 메모 작성 */}
        {isCreating && (
          <Card className="border-gray-800 rounded-2xl bg-gray-900">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-white">새 메모</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="메모 제목"
                value={newMemo.title}
                onChange={(e) => setNewMemo({ ...newMemo, title: e.target.value })}
                className="border-gray-800 focus:border-gray-600 bg-gray-800 text-white placeholder:text-gray-500"
              />
              <Textarea
                placeholder="메모 내용을 입력하세요..."
                value={newMemo.content}
                onChange={(e) => setNewMemo({ ...newMemo, content: e.target.value })}
                rows={4}
                className="border-gray-800 focus:border-gray-600 resize-none bg-gray-800 text-white placeholder:text-gray-500"
              />
              <div className="flex space-x-2">
                <Button onClick={addMemo} className="bg-white text-black hover:bg-gray-200 ios-touch">
                  저장
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false)
                    setNewMemo({ title: "", content: "" })
                  }}
                  className="border-gray-700 text-gray-400 hover:bg-gray-800 ios-touch"
                >
                  취소
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 메모 목록 */}
        <div className="space-y-3">
          {filteredMemos.map((memo) => (
            <Card key={memo.id} className="border-gray-800 rounded-2xl bg-gray-900 hover:bg-gray-800 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm">{memo.title}</h3>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-500 hover:text-gray-300 hover:bg-gray-800 ios-touch"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMemo(memo.id)}
                      className="h-8 w-8 p-0 text-gray-500 hover:text-gray-300 hover:bg-gray-800 ios-touch"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3 line-clamp-3">{memo.content}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>생성: {memo.createdAt}</span>
                  <span>수정: {memo.updatedAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMemos.length === 0 && (
          <div className="text-center py-12">
            <Edit3 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">{searchTerm ? "검색 결과가 없습니다" : "메모가 없습니다"}</p>
          </div>
        )}
      </main>

      <BottomNavigation currentPage="memos" />
    </div>
  )
}
