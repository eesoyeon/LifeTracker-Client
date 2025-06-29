import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FontSizeProvider } from "@/contexts/font-size-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Life Tracker",
  description: "당신의 일상을 체계적으로 관리하세요",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <FontSizeProvider>{children}</FontSizeProvider>
      </body>
    </html>
  )
}
