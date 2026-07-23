import { useLanguage } from "@/hooks/useLanguage"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { currentLang, toggleLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-1.5 text-xs font-medium"
    >
      <Languages className="h-3.5 w-3.5" />
      {currentLang === "kn" ? "EN" : "ಕನ್ನಡ"}
    </Button>
  )
}
