import { MessageSquare, Plus, X, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"

interface ChatHistoryItem {
  id: string
  title: string
  date: string
  active?: boolean
}

interface LeftInvestigationPanelProps {
  history: ChatHistoryItem[]
  activeId: string
  onSelectChat: (id: string) => void
  onNewChat: () => void
  isOpen?: boolean
  onClose?: () => void
}

export function LeftInvestigationPanel({
  history,
  activeId,
  onSelectChat,
  onNewChat,
  isOpen = true,
  onClose
}: LeftInvestigationPanelProps) {
  const { isKannada } = useLanguage()

  return (
    <div 
      className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#E2E8F0] flex flex-col h-full overflow-hidden text-[#1E293B] font-sans transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Sidebar Top Header */}
      <div className="p-3 border-b border-[#E2E8F0] flex items-center justify-between">
        <Button 
          onClick={onNewChat}
          className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold h-9 rounded-lg gap-2 shadow-2xs cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>{isKannada ? "ಹೊಸ ತನಿಖಾ ಚಾಟ್" : "New AI Chat"}</span>
        </Button>
        {onClose && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="lg:hidden text-[#64748B] hover:bg-[#F8FAFC] ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] px-2 py-1 flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-[#2563EB]" />
            <span>{isKannada ? "ಇತ್ತೀಚಿನ ಚಾಟ್‌ಗಳು" : "Conversation History"}</span>
          </div>

          {history.map((item) => {
            const isActive = item.id === activeId
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectChat(item.id)
                  onClose?.()
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                  isActive 
                    ? "bg-[#2563EB]/10 text-[#2563EB] font-bold border border-[#2563EB]/20" 
                    : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#1E293B]"
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <MessageSquare className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-[#2563EB]" : "text-[#64748B]"}`} />
                  <span className="truncate">{item.title}</span>
                </div>
                <span className="text-[9px] text-[#94A3B8] font-mono shrink-0 ml-1">{item.date}</span>
              </button>
            )
          })}
        </div>

        {/* Quick Prompts section */}
        <div className="space-y-2 pt-3 border-t border-[#E2E8F0]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] px-2 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-[#2563EB]" />
            <span>{isKannada ? "ತ್ವರಿತ ಮಾದರಿಗಳು" : "Quick AI Prompts"}</span>
          </div>
          <div className="space-y-1">
            {[
              isKannada ? "ಮೈಸೂರು ಕಳ್ಳತನ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು" : "Mysuru Robbery Hotspots",
              isKannada ? "ಮರುಕಳಿಸುವ ಅಪರಾಧಿಗಳ ಪಟ್ಟಿ" : "Repeat Offender Check",
              isKannada ? "ಸೈಬರ್ ವಂಚನೆ ತನಿಖೆ" : "Cyber Fraud Analysis"
            ].map((p, i) => (
              <div 
                key={i} 
                onClick={onNewChat}
                className="px-2.5 py-1.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] text-[#475569] hover:text-[#2563EB] hover:border-[#2563EB]/40 cursor-pointer transition-colors truncate"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
