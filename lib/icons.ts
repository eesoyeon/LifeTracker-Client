import {
    Briefcase,
    Home,
    Heart,
    BookOpen,
    Target,
    ShoppingBag,
    Plane,
    Coffee,
    Star,
    Zap,
    Car,
    Music,
    Camera,
    Gamepad2,
    Dumbbell,
    Utensils,
    type LucideIcon,
  } from "lucide-react"
  
  export const iconOptions = [
    "briefcase",
    "home",
    "heart",
    "book-open",
    "target",
    "shopping-bag",
    "plane",
    "coffee",
    "star",
    "zap",
    "car",
    "music",
    "camera",
    "gamepad-2",
    "dumbbell",
    "utensils",
  ]
  
  export const getIconComponent = (iconName: string): LucideIcon => {
    const iconMap: Record<string, LucideIcon> = {
      briefcase: Briefcase,
      home: Home,
      heart: Heart,
      "book-open": BookOpen,
      target: Target,
      "shopping-bag": ShoppingBag,
      plane: Plane,
      coffee: Coffee,
      star: Star,
      zap: Zap,
      car: Car,
      music: Music,
      camera: Camera,
      "gamepad-2": Gamepad2,
      dumbbell: Dumbbell,
      utensils: Utensils,
    }
  
    return iconMap[iconName] || Briefcase
  }
  