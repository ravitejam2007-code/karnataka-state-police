import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { 
  Bot, 
  Send, 
  Mic, 
  Menu, 
  User, 
  Paperclip
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { LeftInvestigationPanel } from "./components/LeftInvestigationPanel"
import { ConversationExport } from "./components/ConversationExport"
import { AIThinkingIndicator } from "./components/AIThinkingIndicator"
import { IntelligenceReportRenderer } from "./components/IntelligenceReportRenderer"
import { dummyResponses } from "./data/chatResponses"
import type { IntelligenceResponse } from "./types"
import karnatakaEmblem from "@/assets/karnataka-emblem.png"

interface ChatMessage {
  id: string
  sender: "user" | "ai"
  text: string
  timestamp: string
  report?: IntelligenceResponse | null
}

export function AIAssistantPage() {
  const { isKannada } = useLanguage()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeChatId, setActiveChatId] = useState("chat-1")
  const [inputQuery, setInputQuery] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [chatHistory, setChatHistory] = useState([
    { id: "chat-1", title: isKannada ? "ಮೈಸೂರು ಕಳ್ಳತನ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು" : "Mysuru Robbery Hotspots", date: "Today" },
    { id: "chat-2", title: isKannada ? "ಮರುಕಳಿಸುವ ಅಪರಾಧಿಗಳ ವಿಶ್ಲೇಷಣೆ" : "Repeat Offender Analysis", date: "Yesterday" }
  ])

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: isKannada 
        ? "ನಮಸ್ಕಾರ, ನಾನು ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ಅಪರಾಧ ಜ್ಞಾನ ಎಐ ಸಹಾಯಕ. ಅಪರಾಧ ವಿಶ್ಲೇಷಣೆ, ಎಫ್‌ಐಆರ್ ದಾಖಲೆಗಳು ಅಥವಾ ಹಾಟ್‌ಸ್ಪಾಟ್ ಮುನ್ಸೂಚನೆಗಳ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಿ."
        : "Welcome to Karnataka State Police Crime Intelligence AI. Ask me about crime hotspots, FIR records, suspect networks, or predictive intelligence.",
      timestamp: "10:00 AM"
    }
  ])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isThinking])

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery
    if (!query.trim() || isThinking) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInputQuery("")
    setIsThinking(true)

    let responseKey = "robbery_hotspots"
    if (query.toLowerCase().includes("offender") || query.toLowerCase().includes("repeat") || query.includes("ಮರುಕಳಿಸುವ")) {
      responseKey = "repeat_offenders"
    }

    setTimeout(() => {
      setIsThinking(false)
      const report = dummyResponses[responseKey]
      const aiResponseText = isKannada
        ? `ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ. ${report?.queryIntent || query} ಗಾಗಿ ವರದಿ ಸಿದ್ಧವಾಗಿದೆ.`
        : `Intelligence analysis complete. Displaying interactive dossier for: "${query}".`

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        report: report
      }
      setMessages(prev => [...prev, aiMsg])
    }, 2500)
  }

  const handleNewChat = () => {
    const newId = `chat-${Date.now()}`
    setChatHistory(prev => [
      { id: newId, title: isKannada ? "ಹೊಸ ಚಾಟ್" : "New AI Chat", date: "Just now" },
      ...prev
    ])
    setActiveChatId(newId)
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: "ai",
        text: isKannada 
          ? "ಹೊಸ ತನಿಖಾ ಅಧಿವೇಶನ ಪ್ರಾರಂಭವಾಗಿದೆ. ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ."
          : "New investigation session initiated. How can I assist you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])
  }

  return (
    <div className="flex h-full w-full bg-[#F8FAFC] text-[#1E293B] font-sans overflow-hidden">
      {/* Collapsible Left History Sidebar (ChatGPT style) */}
      <LeftInvestigationPanel 
        history={chatHistory}
        activeId={activeChatId}
        onSelectChat={(id) => setActiveChatId(id)}
        onNewChat={handleNewChat}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Chat Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        
        {/* ChatGPT Style Top Bar */}
        <div className="h-14 border-b border-[#E2E8F0] px-4 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-[#1E293B] hover:bg-[#F8FAFC] cursor-pointer"
              title="Toggle Sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2">
              <div className="p-1 bg-white rounded border border-[#E2E8F0] shadow-2xs">
                <img src={karnatakaEmblem} alt="KSP Emblem" className="h-6 w-auto object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-bold text-[#1E293B]">
                    {isKannada ? "KSP ಅಪರಾಧ ಜ್ಞಾನ ಎಐ 4.0" : "KSP Crime Intelligence AI v4.0"}
                  </h2>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span className="text-[10px] text-[#64748B]">
                  {isKannada ? "ಕರ್ನಾಟಕ ಸರ್ಕಾರ • ಅಧಿಕೃತ ತನಿಖಾ ಸಹಾಯಕ" : "Government of Karnataka • Official Intelligence Assistant"}
                </span>
              </div>
            </div>
          </div>

          {/* Export & Print Options */}
          <ConversationExport messages={messages} />
        </div>

        {/* Chat Stream (Scrollable) */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[#F8FAFC]"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 text-xs md:text-sm ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="h-8 w-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-2xs mt-1">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}

                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-2xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#2563EB] text-white font-medium rounded-tr-xs"
                      : "bg-white text-[#1E293B] border border-[#E2E8F0] rounded-tl-xs"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  
                  {msg.report && (
                    <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                      <IntelligenceReportRenderer items={msg.report.items} />
                    </div>
                  )}

                  <div 
                    className={`text-[9px] mt-1.5 text-right font-mono ${
                      msg.sender === "user" ? "text-blue-100" : "text-[#94A3B8]"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === "user" && (
                  <div className="h-8 w-8 rounded-lg bg-[#1E293B] text-white flex items-center justify-center shrink-0 shadow-2xs mt-1">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isThinking && <AIThinkingIndicator />}
          </div>
        </div>

        {/* Modern Prompt Input Container (ChatGPT Style) */}
        <div className="p-4 bg-white border-t border-[#E2E8F0] shrink-0">
          <div className="max-w-3xl mx-auto space-y-3">
            
            {/* Quick Suggestion Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {[
                isKannada ? "ಮೈಸೂರು ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು" : "Show Mysuru hotspots",
                isKannada ? "ಮರುಕಳಿಸುವ ಅಪರಾಧಿಗಳು" : "Find repeat offenders",
                isKannada ? "ಇತ್ತೀಚಿನ ಎಫ್‌ಐಆರ್ ದಾಖಲೆಗಳು" : "Check recent FIRs"
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:bg-[#2563EB]/10 hover:text-[#2563EB] hover:border-[#2563EB]/30 transition-colors shrink-0 text-xs font-semibold cursor-pointer"
                >
                  ✨ {chip}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="relative bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-2 focus-within:ring-2 focus-within:ring-[#2563EB] focus-within:bg-white transition-all shadow-2xs">
              <textarea
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder={
                  isKannada 
                    ? "ನಿಮ್ಮ ತನಿಖಾ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..." 
                    : "Ask AI Assistant for crime analytics, FIR details, suspect links..."
                }
                rows={2}
                className="w-full bg-transparent resize-none border-none outline-none text-xs md:text-sm text-[#1E293B] placeholder-[#94A3B8] px-2 pt-1"
              />

              <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]/60 px-2">
                <div className="flex items-center gap-1 text-[#64748B]">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-[#64748B] hover:text-[#1E293B]">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-[#64748B] hover:text-[#2563EB]">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  size="sm"
                  onClick={() => handleSend()}
                  disabled={!inputQuery.trim() || isThinking}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl h-8 px-3 font-semibold text-xs gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span>{isKannada ? "ಕಳುಹಿಸಿ" : "Send"}</span>
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <p className="text-[10px] text-center text-[#94A3B8]">
              {isKannada 
                ? "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ನಿಯಂತ್ರಣಾಲಯ • ಗೌಪ್ಯ ಎಐ ಮಾದರಿ 4.0"
                : "Karnataka State Police SCRB • Confidential Intelligence System v4.0"}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
