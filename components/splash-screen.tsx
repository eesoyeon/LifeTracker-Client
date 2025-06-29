"use client"

import { useEffect, useState } from "react"

export function SplashScreen() {
  const [logoVisible, setLogoVisible] = useState(false)
  const [textVisible, setTextVisible] = useState(false)

  useEffect(() => {
    // 로고 애니메이션
    const logoTimer = setTimeout(() => {
      setLogoVisible(true)
    }, 300)

    // 텍스트 애니메이션
    const textTimer = setTimeout(() => {
      setTextVisible(true)
    }, 800)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(textTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* 로고 */}
        <div
          className={`mb-8 transition-all duration-1000 ease-out ${
            logoVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-8"
          }`}
        >
          <div className="relative mx-auto w-24 h-24 mb-6">
            {/* 외부 원 */}
            <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-pulse"></div>

            {/* 내부 로고 */}
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <div className="relative">
                {/* 미니멀한 4개 점 패턴 */}
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <div
                      className="w-3 h-3 bg-black rounded-full animate-pulse"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-black rounded-full animate-pulse"
                      style={{ animationDelay: "200ms" }}
                    ></div>
                  </div>
                  <div className="flex space-x-2">
                    <div
                      className="w-3 h-3 bg-black rounded-full animate-pulse"
                      style={{ animationDelay: "400ms" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-gray-600 rounded-full animate-pulse"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 앱 이름 */}
        <div
          className={`transition-all duration-1000 ease-out delay-300 ${
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Life Tracker</h1>
          <p className="text-white text-lg font-medium">당신의 일상을 기록하세요</p>
        </div>

        {/* 로딩 인디케이터 */}
        <div
          className={`mt-12 transition-all duration-1000 ease-out delay-700 ${
            textVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
