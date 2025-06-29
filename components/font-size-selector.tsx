"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Type, Check } from "lucide-react"
import { useFontSize, type FontSize, fontSizeLabels } from "@/contexts/font-size-context"

export function FontSizeSelector() {
  const { fontSize, setFontSize } = useFontSize()

  const fontSizeOptions: FontSize[] = ["small", "medium", "large", "extra-large"]

  const previewTexts = {
    small: "작은 글씨로 표시됩니다",
    medium: "보통 크기로 표시됩니다",
    large: "큰 글씨로 표시됩니다",
    "extra-large": "매우 큰 글씨로 표시됩니다",
  }

  return (
    <Card className="border border-gray-800 rounded-2xl bg-gray-900">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-white flex items-center">
          <Type className="h-5 w-5 mr-3 text-gray-400" />
          글자 크기 설정
        </CardTitle>
        <p className="text-gray-400 text-sm">읽기 편한 글자 크기를 선택하세요</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 현재 설정 미리보기 */}
        <div className="p-4 rounded-xl bg-gray-800 border border-gray-700">
          <p className="text-gray-400 text-xs mb-2">미리보기</p>
          <p className="text-white font-medium transition-all duration-300">{previewTexts[fontSize]}</p>
        </div>

        {/* 글자 크기 옵션들 */}
        <div className="grid grid-cols-2 gap-3">
          {fontSizeOptions.map((size) => (
            <Button
              key={size}
              variant="ghost"
              onClick={() => setFontSize(size)}
              className={`h-16 flex flex-col items-center justify-center space-y-1 rounded-xl transition-all duration-200 ${
                fontSize === size
                  ? "bg-white text-black"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700"
              }`}
            >
              <div className="flex items-center space-x-2">
                {fontSize === size && <Check className="h-4 w-4" />}
                <span className="font-medium text-sm">{fontSizeLabels[size]}</span>
              </div>
              <div
                className="text-center transition-all duration-300"
                style={{
                  fontSize: `${size === "small" ? 0.75 : size === "medium" ? 0.875 : size === "large" ? 1 : 1.125}rem`,
                }}
              >
                <span className="opacity-60">Aa</span>
              </div>
            </Button>
          ))}
        </div>

        {/* 설명 텍스트 */}
        <div className="p-3 rounded-xl bg-gray-800">
          <p className="text-gray-400 text-xs text-center">설정한 글자 크기는 앱 전체에 적용되며 자동으로 저장됩니다</p>
        </div>
      </CardContent>
    </Card>
  )
}
