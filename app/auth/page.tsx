"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export default function AuthPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 페이지 로드 시 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (provider: string) => {
    console.log(`${provider} OAuth login`)
    localStorage.setItem("auth_token", "temp_token")

    // 부드러운 페이지 전환 애니메이션
    document.body.classList.add("page-exit")

    setTimeout(() => {
      window.location.href = "/"
    }, 300)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 page-enter">
      <div className="w-full max-w-sm">
        {/* 로고 섹션 */}
        <div
          className={`text-center mb-12 transition-spring ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          {/* 다크모드 로고 */}
          <div className="relative mx-auto w-20 h-20 mb-8 hover:scale-110 transition-spring gpu-accelerated">
            <div className="absolute inset-0 bg-white rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-mono-glow-strong transition-mono">
              <div className="flex flex-col space-y-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-black rounded-full icon-pulse"></div>
                  <div className="w-2 h-2 bg-black rounded-full icon-pulse" style={{ animationDelay: "0.2s" }}></div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-black rounded-full icon-pulse" style={{ animationDelay: "0.4s" }}></div>
                  <div className="w-2 h-2 bg-black/40 rounded-full icon-pulse" style={{ animationDelay: "0.6s" }}></div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="heading-1 mb-3 tracking-tight text-reveal">Life Tracker</h1>
          <p className="body-large text-white text-fade-in">일상을 체계적으로 관리하세요</p>
        </div>

        {/* 로그인 카드 */}
        <div
          className={`transition-spring ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          {/* 로그인 카드 - 모달 스타일 그림자 */}
          <Card className="border-gray-800 shadow-mono-modal bg-gray-900/80 backdrop-blur-sm card-hover-subtle">
            <CardContent className="p-8">
              <div className="space-y-4">
                <p className="text-center body-medium text-white mb-8 text-fade-in">
                  소셜 계정으로 간편하게 시작하세요
                </p>

                {/* Google 로그인 */}
                <Button
                  onClick={() => handleLogin("Google")}
                  variant="outline"
                  className="w-full h-12 border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600 bg-gray-800/50 shadow-mono-button button-bounce label-medium gpu-accelerated"
                >
                  <span className="text-lg mr-3 transition-mono hover:scale-110">🇬</span>
                  <span>Google로 계속하기</span>
                </Button>

                {/* 네이버 로그인 */}
                <Button
                  onClick={() => handleLogin("Naver")}
                  className="w-full h-12 bg-[#03C75A] hover:bg-[#02B351] text-white shadow-mono-button button-bounce label-medium gpu-accelerated"
                >
                  <div className="w-5 h-5 mr-3 bg-white rounded-sm flex items-center justify-center shadow-mono-glow transition-mono hover:scale-110">
                    <span className="text-[#03C75A] font-bold text-xs">N</span>
                  </div>
                  <span>네이버로 계속하기</span>
                </Button>

                {/* 카카오 로그인 */}
                <Button
                  onClick={() => handleLogin("Kakao")}
                  className="w-full h-12 bg-[#FEE500] hover:bg-[#FDD835] text-[#191919] shadow-mono-button button-bounce label-medium gpu-accelerated"
                >
                  <MessageCircle className="h-5 w-5 mr-3 transition-mono hover:scale-110" />
                  <span>카카오로 계속하기</span>
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-center caption text-quaternary leading-relaxed text-fade-in">
                  계속 진행하면 <button className="text-link transition-mono hover:text-gray-100">서비스 약관</button>과{" "}
                  <button className="text-link transition-mono hover:text-gray-100">개인정보 처리방침</button>에
                  동의하는 것으로 간주됩니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 하단 장식 */}
        <div
          className={`mt-8 text-center transition-spring ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "0.4s" }}
        >
          <p className="caption text-disabled">© 2024 Life Tracker. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
