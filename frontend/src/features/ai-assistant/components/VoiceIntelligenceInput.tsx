import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Mic, Paperclip, Camera, Send, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useVoice } from "@/hooks/useVoice"
import { useLanguage } from "@/hooks/useLanguage"

interface VoiceIntelligenceInputProps {
  onSend: (query: string) => void
  disabled?: boolean
}

export function VoiceIntelligenceInput({ onSend, disabled }: VoiceIntelligenceInputProps) {
  const { t } = useTranslation()
  const { currentLang } = useLanguage()
  const [query, setQuery] = useState("")
  const [voiceError, setVoiceError] = useState<string | null>(null)

  const voiceLang = currentLang === "kn" ? "kn-IN" : "en-IN"

  const handleVoiceResult = (text: string) => {
    setQuery((prev) => prev + " " + text)
    setVoiceError(null)
  }

  const { startListening, stopListening, isListening } = useVoice({
    onResult: handleVoiceResult,
    onError: (err) => setVoiceError(err === "no-speech" ? null : err),
    lang: voiceLang,
  })

  const handleSend = () => {
    if (query.trim() && !disabled) {
      onSend(query.trim())
      setQuery("")
    }
  }

  useEffect(() => {
    if (voiceError) {
      const timer = setTimeout(() => setVoiceError(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [voiceError])

  return (
    <div className="w-full bg-slate-900 border-t border-slate-800 p-4 shrink-0 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-center bg-slate-800 rounded-lg border border-slate-700 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
          
          <div className="flex pl-2 gap-1">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-full" disabled={disabled}>
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-full" disabled={disabled}>
              <Camera className="h-5 w-5" />
            </Button>
          </div>

          <input
            type="text"
            className="flex-1 bg-transparent border-0 h-14 px-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-0"
            placeholder={t("ai.placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend()
            }}
            disabled={disabled}
          />

          <div className="flex pr-2 gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 rounded-full ${
                isListening
                  ? "text-red-400 bg-red-500/20 hover:bg-red-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
              }`}
              onClick={isListening ? stopListening : startListening}
              disabled={disabled}
              title={t("ai.voice")}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button
              size="icon"
              className={`h-10 w-10 rounded-full ${query.trim() ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-slate-700 text-slate-500"}`}
              onClick={handleSend}
              disabled={disabled || !query.trim()}
            >
              <Send className="h-4 w-4 ml-0.5" />
            </Button>
          </div>
        </div>

        {voiceError && (
          <div className="mt-2 text-xs text-red-400 text-center">{voiceError}</div>
        )}

        <div className="mt-3 flex items-center justify-between px-1">
          <div className="text-[10px] text-slate-500 flex gap-4">
            <span>{t("ai.poweredBy")}</span>
            <span>{t("ai.encryptedSession")}</span>
          </div>
          <div className="flex gap-2 text-xs">
            {[t("ai.showHotspots"), t("ai.repeatOffenders"), t("ai.financialTraces")].map(suggestion => (
              <button
                key={suggestion}
                className="text-slate-400 hover:text-blue-400 transition-colors border-b border-dashed border-slate-600 hover:border-blue-400"
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
