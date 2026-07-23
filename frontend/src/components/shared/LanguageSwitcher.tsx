import { useLanguage } from "@/hooks/useLanguage"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { currentLang, toggleLanguage } = useLanguage()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-1.5 text-xs font-semibold border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors shadow-xs"
      title={currentLang === "kn" ? "Switch to English" : "ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ"}
    >
      <Languages className="h-3.5 w-3.5 text-gray-500" />
      <span>{currentLang === "kn" ? "English" : "ಕನ್ನಡ"}</span>
    </Button>
  )
}
