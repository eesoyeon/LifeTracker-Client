"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export default function AuthPage() {
  const [logoVisible, setLogoVisible] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [cardVisible, setCardVisible] = useState(false)
  const [buttonsVisible, setButtonsVisible] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    // 자연스러운 순차적 애니메이션
    const logoTimer = setTimeout(() => setLogoVisible(true), 200)
    const titleTimer = setTimeout(() => setTitleVisible(true), 800)
    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), 1200)
    const cardTimer = setTimeout(() => setCardVisible(true), 1600)
    const buttonsTimer = setTimeout(() => setButtonsVisible(true), 2000)
    const footerTimer = setTimeout(() => setFooterVisible(true), 2400)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(titleTimer)
      clearTimeout(subtitleTimer)
      clearTimeout(cardTimer)
      clearTimeout(buttonsTimer)
      clearTimeout(footerTimer)
    }
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
    <div className="min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-sm">
        {/* 로고 섹션 - 더 자연스러운 애니메이션 */}
        <div className="text-center mb-12">
          <div
            className={`relative mx-auto w-24 h-24 mb-8 transition-all duration-1000 ease-out ${
              logoVisible
                ? "opacity-100 scale-100 translate-y-0 rotate-0"
                : "opacity-0 scale-50 translate-y-12 rotate-12"
            }`}
          >
            <div className="absolute inset-0 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <div className="flex flex-col space-y-1">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-black rounded-full transition-all duration-500"
                    style={{
                      animationDelay: logoVisible ? "0ms" : "0ms",
                      transform: logoVisible ? "scale(1)" : "scale(0)",
                    }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-black rounded-full transition-all duration-500"
                    style={{
                      animationDelay: logoVisible ? "200ms" : "0ms",
                      transform: logoVisible ? "scale(1)" : "scale(0)",
                    }}
                  ></div>
                </div>
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-black rounded-full transition-all duration-500"
                    style={{
                      animationDelay: logoVisible ? "400ms" : "0ms",
                      transform: logoVisible ? "scale(1)" : "scale(0)",
                    }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-black/40 rounded-full transition-all duration-500"
                    style={{
                      animationDelay: logoVisible ? "600ms" : "0ms",
                      transform: logoVisible ? "scale(1)" : "scale(0)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <h1
            className={`text-4xl font-bold mb-3 tracking-tight text-white transition-all duration-800 ease-out ${
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Life Tracker
          </h1>

          <p
            className={`text-lg text-gray-300 transition-all duration-800 ease-out ${
              subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            일상을 체계적으로 관리하세요
          </p>
        </div>

        {/* 로그인 카드 - 부드러운 등장 */}
        <div
          className={`transition-all duration-1000 ease-out ${
            cardVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}
        >
          <Card className="border-gray-800 shadow-2xl bg-gray-900/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-4">
                <p className="text-center text-gray-300 mb-8">소셜 계정으로 간편하게 시작하세요</p>

                {/* 버튼들 - 순차적 등장 */}
                <div className="space-y-4">
                  <Button
                    onClick={() => handleLogin("Google")}
                    variant="outline"
                    className={`w-full h-12 border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600 bg-gray-800/50 transition-all duration-500 ${
                      buttonsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: buttonsVisible ? "0ms" : "0ms" }}
                  >
                    <span className="text-lg mr-3">🇬</span>
                    <span>Google로 계속하기</span>
                  </Button>

                  <Button
                    onClick={() => handleLogin("Naver")}
                    className={`w-full h-12 bg-[#03C75A] hover:bg-[#02B351] text-white transition-all duration-500 ${
                      buttonsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: buttonsVisible ? "200ms" : "0ms" }}
                  >
                    <div className="w-5 h-5 mr-3 bg-white rounded-sm flex items-center justify-center">
                      <span className="text-[#03C75A] font-bold text-xs">N</span>
                    </div>
                    <span>네이버로 계속하기</span>
                  </Button>

                  <Button
                    onClick={() => handleLogin("Kakao")}
                    className={`w-full h-12 bg-[#FEE500] hover:bg-[#FDD835] text-[#191919] transition-all duration-500 ${
                      buttonsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: buttonsVisible ? "400ms" : "0ms" }}
                  >
                    <MessageCircle className="h-5 w-5 mr-3" />
                    <span>카카오로 계속하기</span>
                  </Button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <p
                  className={`text-center text-sm text-gray-400 leading-relaxed transition-all duration-800 ${
                    buttonsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: buttonsVisible ? "600ms" : "0ms" }}
                >
                  계속 진행하면{" "}
                  <button className="text-gray-300 hover:text-white transition-colors">서비스 약관</button>과{" "}
                  <button className="text-gray-300 hover:text-white transition-colors">개인정보 처리방침</button>에
                  동의하는 것으로 간주됩니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 하단 장식 */}
        <div
          className={`mt-8 text-center transition-all duration-800 ${
            footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-sm text-gray-500">© 2024 Life Tracker. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
