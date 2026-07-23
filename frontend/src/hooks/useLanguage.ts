import { useTranslation } from "react-i18next"

export type SupportedLanguage = "en" | "kn"

export function useLanguage() {
  const { i18n } = useTranslation()

  const currentLang = i18n.language as SupportedLanguage
  const isKannada = currentLang === "kn"

  const setLanguage = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang)
  }

  const toggleLanguage = () => {
    setLanguage(isKannada ? "en" : "kn")
  }

  return { currentLang, isKannada, setLanguage, toggleLanguage }
}
