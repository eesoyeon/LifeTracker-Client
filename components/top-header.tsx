import { Menu, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TopHeaderProps {
  title: string
  showMenu?: boolean
  showNotification?: boolean
  showSearch?: boolean
  showLogo?: boolean
}

export function TopHeader({
  title,
  showMenu = true,
  showNotification = true,
  showSearch = false,
  showLogo = false,
}: TopHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-gray-800 px-4 py-3 z-40 shadow-mono-header">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showMenu && (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800 shadow-mono-button button-press transition-mono"
            >
              <Menu className="h-5 w-5 transition-mono hover:scale-110" />
            </Button>
          )}

          {showLogo && (
            <div className="flex items-center space-x-3 text-reveal">
              {/* 다크모드 미니 로고 - 글로우 효과 */}
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-mono-glow hover:shadow-mono-glow-strong transition-mono hover:scale-110 gpu-accelerated">
                <div className="flex flex-col space-y-0.5">
                  <div className="flex space-x-0.5">
                    <div className="w-1.5 h-1.5 bg-black rounded-full icon-pulse"></div>
                    <div
                      className="w-1.5 h-1.5 bg-black rounded-full icon-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <div className="flex space-x-0.5">
                    <div
                      className="w-1.5 h-1.5 bg-black rounded-full icon-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-gray-600 rounded-full icon-pulse"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                  </div>
                </div>
              </div>
              <h1 className="heading-4 transition-mono hover:text-gray-200">{title}</h1>
            </div>
          )}

          {!showLogo && <h1 className="heading-4 text-reveal transition-mono hover:text-gray-200">{title}</h1>}
        </div>

        <div className="flex items-center space-x-2">
          {showSearch && (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800 shadow-mono-button button-press transition-mono"
            >
              <Search className="h-5 w-5 transition-mono hover:scale-110" />
            </Button>
          )}
          {showNotification && (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800 relative shadow-mono-button button-press transition-mono"
            >
              <Bell className="h-5 w-5 transition-mono hover:scale-110" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full shadow-mono-glow icon-pulse"></span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
