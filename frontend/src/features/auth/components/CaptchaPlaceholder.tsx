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
    <div className="py-0.5">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-28 items-center justify-center rounded-md bg-slate-100 font-mono text-sm font-bold tracking-widest text-[#0F172A] select-none pointer-events-none relative overflow-hidden border border-slate-200 shadow-2xs">
          <div className="absolute inset-0 opacity-15" 
               style={{ backgroundImage: 'radial-gradient(circle, #0F172A 1px, transparent 1px)', backgroundSize: '4px 4px' }} 
          />
          {captchaText}
        </div>
        <button 
          type="button" 
          onClick={handleReload}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer shadow-2xs"
          title={t("auth.reloadCaptcha")}
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
        <button 
          type="button" 
          onClick={handleAudio}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer shadow-2xs"
          title={t("auth.playCaptcha")}
        >
          <Volume2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
