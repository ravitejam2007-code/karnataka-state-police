import { useState, useEffect } from "react"
import { RefreshCw, Volume2 } from "lucide-react"
import { useTranslation } from "react-i18next"

export function CaptchaPlaceholder({ onCaptchaChange }: { onCaptchaChange?: (captcha: string) => void }) {
  const { t } = useTranslation()

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const [captchaText, setCaptchaText] = useState(generateCaptcha)

  useEffect(() => {
    onCaptchaChange?.(captchaText)
  }, [captchaText, onCaptchaChange])

  const handleReload = () => {
    setCaptchaText(generateCaptcha())
  }

  const handleAudio = () => {
    const utterance = new SpeechSynthesisUtterance()
    utterance.text = captchaText.split('').join(', ')
    utterance.rate = 0.6
    utterance.pitch = 1.2
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-32 items-center justify-center rounded bg-muted font-mono text-base font-bold tracking-widest text-muted-foreground select-none pointer-events-none relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" 
               style={{ backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)', backgroundSize: '4px 4px' }} 
          />
          {captchaText}
        </div>
        <button 
          type="button" 
          onClick={handleReload}
          className="flex h-10 w-10 items-center justify-center rounded border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
          title={t("auth.reloadCaptcha")}
        >
          <RefreshCw className="h-4 w-4" />
        </button>
        <button 
          type="button" 
          onClick={handleAudio}
          className="flex h-10 w-10 items-center justify-center rounded border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
          title={t("auth.playCaptcha")}
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
