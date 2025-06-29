"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type FontSize = "small" | "medium" | "large" | "extra-large"

interface FontSizeContextType {
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
  fontSizeMultiplier: number
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined)

const fontSizeMultipliers: Record<FontSize, number> = {
  small: 0.875,
  medium: 1,
  large: 1.125,
  "extra-large": 1.25,
}

const fontSizeLabels: Record<FontSize, string> = {
  small: "작게",
  medium: "보통",
  large: "크게",
  "extra-large": "매우 크게",
}

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>("medium")

  // 로컬 스토리지에서 설정 불러오기
  useEffect(() => {
    const savedFontSize = localStorage.getItem("font-size") as FontSize
    if (savedFontSize && fontSizeMultipliers[savedFontSize]) {
      setFontSizeState(savedFontSize)
    }
  }, [])

  // CSS 변수 업데이트
  useEffect(() => {
    const multiplier = fontSizeMultipliers[fontSize]
    document.documentElement.style.setProperty("--font-size-multiplier", multiplier.toString())
  }, [fontSize])

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size)
    localStorage.setItem("font-size", size)
  }

  const value = {
    fontSize,
    setFontSize,
    fontSizeMultiplier: fontSizeMultipliers[fontSize],
  }

  return <FontSizeContext.Provider value={value}>{children}</FontSizeContext.Provider>
}

export function useFontSize() {
  const context = useContext(FontSizeContext)
  if (context === undefined) {
    throw new Error("useFontSize must be used within a FontSizeProvider")
  }
  return context
}

export { fontSizeLabels, fontSizeMultipliers }
