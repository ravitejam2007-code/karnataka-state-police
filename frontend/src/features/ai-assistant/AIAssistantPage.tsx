import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { 
  Bot, 
  Send, 
  Menu, 
  User, 
  Paperclip,
  Copy,
  Check,
  RefreshCw,
  Square
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { LeftInvestigationPanel, type ChatHistoryItem } from "./components/LeftInvestigationPanel"
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
  const { i18n } = useTranslation()
  const isKannada = i18n.language === "kn"
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeChatId, setActiveChatId] = useState("chat-1")
  const [inputQuery, setInputQuery] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([
    { id: "chat-1", title: isKannada ? "ಮೈಸೂರು ಕಳ್ಳತನ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು" : "Mysuru Robbery Hotspots", date: "Today", pinned: true },
    { id: "chat-2", title: isKannada ? "ಮರುಕಳಿಸುವ ಅಪರಾಧಿಗಳ ವಿಶ್ಲೇಷಣೆ" : "Repeat Offender Analysis", date: "Yesterday" }
  ])

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: isKannada 
        ? "ನಮಸ್ಕಾರ, ನಾನು ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ಅಪರಾಧ ಜ್ಞಾನ ಎಐ ಸಹಾಯಕ (KSP Copilot). ಅಪರಾಧ ವಿಶ್ಲೇಷಣೆ, ಎಫ್‌ಐಆರ್ ದಾಖಲೆಗಳು, ಐಪಿಸಿ/ಬಿಎನ್‌ಎಸ್ ಸೆಕ್ಷನ್ ಅಥವಾ ಹಾಟ್‌ಸ್ಪಾಟ್ ಮುನ್ಸೂಚನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ."
        : "Welcome to Karnataka State Police Crime Intelligence AI (KSP Copilot). Ask me about crime hotspots, FIR records, suspect networks, IPC/BNS sections, or predictive intelligence.",
      timestamp: "10:00 AM"
    }
  ])

  // Update initial message or active state when language changes
  useEffect(() => {
    setMessages(prev =>
      prev.map(m => {
        if (m.id === "msg-1") {
          return {
            ...m,
            text: isKannada
              ? "ನಮಸ್ಕಾರ, ನಾನು ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ಅಪರಾಧ ಜ್ಞಾನ ಎಐ ಸಹಾಯಕ (KSP Copilot). ಅಪರಾಧ ವಿಶ್ಲೇಷಣೆ, ಎಫ್‌ಐಆರ್ ದಾಖಲೆಗಳು, ಐಪಿಸಿ/ಬಿಎನ್‌ಎಸ್ ಸೆಕ್ಷನ್ ಅಥವಾ ಹಾಟ್‌ಸ್ಪಾಟ್ ಮುನ್ಸೂಚನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ."
              : "Welcome to Karnataka State Police Crime Intelligence AI (KSP Copilot). Ask me about crime hotspots, FIR records, suspect networks, IPC/BNS sections, or predictive intelligence."
          }
        }
        return m
      })
    )
  }, [i18n.language, isKannada])

  // Auto-scroll on new messages
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
        ? `ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ. "${query}" ಗಾಗಿ ಇಂಟರ್ಯಾಕ್ಟಿವ್ ಡಾಸಿಯರ್ ತಯಾರಿಸಲಾಗಿದೆ.`
        : `Intelligence analysis complete. Displaying interactive dossier for: "${query}".`

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        report: report
      }
      setMessages(prev => [...prev, aiMsg])
    }, 2000)
  }

  const handleNewChat = () => {
    const newId = `chat-${Date.now()}`
    setChatHistory(prev => [
      { id: newId, title: isKannada ? "ಹೊಸ ಎಐ ತನಿಖೆ" : "New Investigation", date: "Just now" },
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
    toast.info(isKannada ? "ಹೊಸ ಚಾಟ್ ಪ್ರಾರಂಭವಾಯಿತು" : "New investigation session started")
  }

  const handleRenameChat = (id: string, newTitle: string) => {
    setChatHistory(prev =>
      prev.map(c => (c.id === id ? { ...c, title: newTitle } : c))
    )
    toast.success(isKannada ? "ಶೀರ್ಷಿಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ" : "Conversation renamed")
  }

  const handleDeleteChat = (id: string) => {
    setChatHistory(prev => prev.filter(c => c.id !== id))
    toast.success(isKannada ? "ಚಾಟ್ ಅಳಿಸಲಾಗಿದೆ" : "Conversation deleted")
    if (activeChatId === id) {
      handleNewChat()
    }
  }

  const handlePinChat = (id: string) => {
    setChatHistory(prev =>
      prev.map(c => (c.id === id ? { ...c, pinned: !c.pinned } : c))
    )
  }

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedMsgId(id)
    toast.success(isKannada ? "ಪಠ್ಯವನ್ನು ನಕಲಿಸಲಾಗಿದೆ" : "Response copied to clipboard")
    setTimeout(() => setCopiedMsgId(null), 2000)
  }

  const handleFileUpload = () => {
    toast.success(isKannada ? "ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ" : "Evidence Document Attached", {
      description: "FIR_Dossier_2026_8894.pdf attached to prompt context."
    })
  }

  return (
    <div className="flex h-full w-full bg-white text-[#1F2937] font-sans overflow-hidden">
      {/* ChatGPT Style History Sidebar */}
      <LeftInvestigationPanel 
        history={chatHistory}
        activeId={activeChatId}
        onSelectChat={(id) => setActiveChatId(id)}
        onNewChat={handleNewChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
        onPinChat={handlePinChat}
        onSelectPrompt={(p) => handleSend(p)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main ChatGPT Interface */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        
        {/* ChatGPT Header */}
        <div className="h-14 border-b border-[#E2E8F0] px-4 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-[#1F2937] hover:bg-[#F8FAFC] cursor-pointer"
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
                  <h2 className="text-sm font-bold text-[#1F2937]">
                    {isKannada ? "KSP ಅಪರಾಧ ಜ್ಞಾನ ಎಐ 4.2" : "KSP Crime Intelligence Copilot v4.2"}
                  </h2>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[10px] text-[#64748B]">
                  {isKannada ? "ಸರ್ಕಾರಿ ತನಿಖಾ ಎಐ ಮಾದರಿ" : "Official Law Enforcement Model • Encrypted Session"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ConversationExport messages={messages} />
          </div>
        </div>

        {/* Messages Feed Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* AI Avatar */}
                {msg.sender === "ai" && (
                  <div className="h-8 w-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                {/* Message Bubble Container */}
                <div 
                  className={`relative group max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed space-y-3 ${
                    msg.sender === "user"
                      ? "bg-[#0F172A] text-white rounded-br-xs"
                      : "bg-[#F8FAFC] border border-[#E2E8F0] text-[#1F2937] rounded-bl-xs shadow-2xs"
                  }`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center justify-between border-b border-black/10 pb-1 mb-1 text-[10px]">
                    <span className="font-bold opacity-80">
                      {msg.sender === "user" 
                        ? (isKannada ? "ನೀವು (ತನಿಖಾಧಿಕಾರಿ)" : "You (Investigator)")
                        : (isKannada ? "KSP ಎಐ ಕಾಪ್ ಪೈಲಟ್" : "KSP AI Copilot")}
                    </span>
                    <span className="opacity-60">{msg.timestamp}</span>
                  </div>

                  {/* Main Text Content */}
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Render Detailed Intelligence Report Dossier if attached */}
                  {msg.report && (
                    <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                      <IntelligenceReportRenderer items={msg.report.items || []} />
                    </div>
                  )}

                  {/* AI Copy & Action Row */}
                  {msg.sender === "ai" && (
                    <div className="pt-2 flex items-center gap-2 text-[#64748B]">
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="p-1 hover:text-[#1F2937] rounded hover:bg-slate-200/60 transition-colors flex items-center gap-1 text-[10px]"
                      >
                        {copiedMsgId === msg.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-600 font-bold">{isKannada ? "ನಕಲಿಸಲಾಗಿದೆ" : "Copied"}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>{isKannada ? "ನಕಲಿಸಿ" : "Copy"}</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleSend(msg.text)}
                        className="p-1 hover:text-[#1F2937] rounded hover:bg-slate-200/60 transition-colors flex items-center gap-1 text-[10px]"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>{isKannada ? "ಮರು-ರಚಿಸಿ" : "Regenerate"}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {msg.sender === "user" && (
                  <div className="h-8 w-8 rounded-full bg-slate-200 text-[#1F2937] flex items-center justify-center shrink-0 mt-1">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Thinking / Streaming Indicator */}
            {isThinking && (
              <div className="flex gap-3 justify-start">
                <div className="h-8 w-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 animate-spin" />
                </div>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl rounded-bl-xs">
                  <AIThinkingIndicator />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ChatGPT Bottom Input Form */}
        <div className="p-3 sm:p-4 border-t border-[#E2E8F0] bg-white shrink-0">
          <div className="max-w-3xl mx-auto space-y-2">
            
            {/* Input Box */}
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="relative flex items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus-within:ring-2 focus-within:ring-[#0F172A] focus-within:bg-white transition-all shadow-2xs"
            >
              <button
                type="button"
                onClick={handleFileUpload}
                title="Attach Document or Evidence"
                className="pl-3 pr-2 text-[#64748B] hover:text-[#1F2937] transition-colors"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={
                  isKannada 
                    ? "ಅಪರಾಧ ದಾಖಲೆಗಳು, ಎಫ್‌ಐಆರ್ ಅಥವಾ ಶಂಕಿತ ಜಾಲದ ಬಗ್ಗೆ ಕೇಳಿ..." 
                    : "Ask AI Copilot about FIRs, crime hotspots, suspect networks, or legal IPC/BNS..."
                }
                className="flex-1 bg-transparent py-3 text-xs text-[#1F2937] focus:outline-none placeholder-[#94A3B8]"
              />

              {isThinking ? (
                <Button
                  type="button"
                  size="icon"
                  onClick={() => setIsThinking(false)}
                  className="mr-2 h-8 w-8 bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer"
                  title="Stop Generating"
                >
                  <Square className="h-3.5 w-3.5 fill-current" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputQuery.trim()}
                  className="mr-2 h-8 w-8 bg-[#111827] hover:bg-[#1F2937] text-white rounded-xl cursor-pointer disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              )}
            </form>

            <p className="text-[10px] text-center text-[#64748B]">
              {isKannada 
                ? "KSP AI Copilot ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ಸುರಕ್ಷಿತ ಸರ್ವರ್‌ನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. ಪ್ರಮುಖ ನಿರ್ಧಾರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ."
                : "KSP AI Copilot operates on encrypted Karnataka Police servers. Verify intelligence before taking operational actions."}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
