import { useState } from "react"
import { MessageSquare, Plus, X, Clock, Sparkles, Search, Trash2, Edit3, Pin, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next"

export interface ChatHistoryItem {
  id: string
  title: string
  date: string
  pinned?: boolean
}

interface LeftInvestigationPanelProps {
  history: ChatHistoryItem[]
  activeId: string
  onSelectChat: (id: string) => void
  onNewChat: () => void
  onRenameChat: (id: string, newTitle: string) => void
  onDeleteChat: (id: string) => void
  onPinChat: (id: string) => void
  onSelectPrompt: (promptText: string) => void
  isOpen?: boolean
  onClose?: () => void
}

export function LeftInvestigationPanel({
  history,
  activeId,
  onSelectChat,
  onNewChat,
  onRenameChat,
  onDeleteChat,
  onPinChat,
  onSelectPrompt,
  isOpen = true,
  onClose
}: LeftInvestigationPanelProps) {
  const { i18n } = useTranslation()
  const isKannada = i18n.language === "kn"
  const [searchQuery, setSearchQuery] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")

  const filteredHistory = history.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleStartRename = (item: ChatHistoryItem, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingId(item.id)
    setEditTitle(item.title)
  }

  const handleSaveRename = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (editTitle.trim()) {
      onRenameChat(id, editTitle.trim())
    }
    setEditingId(null)
  }

  const promptList = isKannada
    ? ["ಮೈಸೂರು ಕಳ್ಳತನ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು", "ಮರುಕಳಿಸುವ ಅಪರಾಧಿಗಳ ಪಟ್ಟಿ", "ಸೈಬರ್ ವಂಚನೆ ತನಿಖೆ", "ಐಪಿಸಿ/ಬಿಎನ್‌ಎಸ್ ಸೆಕ್ಷನ್ ಹುಡುಕಾಟ"]
    : ["Mysuru Robbery Hotspots", "Repeat Offender Check", "Cyber Fraud Analysis", "IPC / BNS Section Search"]

  return (
    <div 
      className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-[#E5E7EB] flex flex-col h-full overflow-hidden text-[#111827] font-sans transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Top Header & New Chat */}
      <div className="p-3 border-b border-[#E5E7EB] space-y-2">
        <div className="flex items-center justify-between">
          <Button 
            onClick={onNewChat}
            className="flex-1 bg-[#111827] hover:bg-[#1F2937] text-white text-xs font-bold h-10 rounded-xl gap-2 shadow-2xs cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>{isKannada ? "ಹೊಸ ಎಐ ಚಾಟ್" : "New Chat"}</span>
          </Button>
          {onClose && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="lg:hidden text-[#64748B] hover:bg-[#F1F5F9] ml-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Search History Input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748B]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isKannada ? "ಇತಿಹಾಸ ಹುಡುಕಿ..." : "Search conversations..."}
            className="pl-8 h-8 text-xs bg-white border-[#E2E8F0]"
          />
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] px-2 py-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-[#0F172A]" />
              {isKannada ? "ಚಾಟ್ ಇತಿಹಾಸ" : "Recent Chats"}
            </span>
            <span className="text-[9px] bg-slate-200 text-[#1F2937] px-1.5 py-0.5 rounded font-mono font-bold">
              {filteredHistory.length}
            </span>
          </div>

          {filteredHistory.length === 0 ? (
            <p className="text-xs text-[#64748B] px-2 py-3 text-center">
              {isKannada ? "ಯಾವುದೇ ಚಾಟ್ ಕಂಡುಬಂದಿಲ್ಲ" : "No chats found"}
            </p>
          ) : (
            filteredHistory.map((item) => {
              const isActive = item.id === activeId
              const isEditing = editingId === item.id

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectChat(item.id)
                    onClose?.()
                  }}
                  className={`group relative w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                    isActive 
                      ? "bg-white text-[#0F172A] font-bold shadow-2xs border border-[#E2E8F0]" 
                      : "text-[#475569] hover:bg-white hover:text-[#1F2937]"
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden flex-1 mr-2">
                    <MessageSquare className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-[#0F172A]" : "text-[#64748B]"}`} />
                    
                    {isEditing ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full bg-white border border-[#E2E8F0] px-1.5 py-0.5 rounded text-xs text-[#1F2937]"
                        autoFocus
                      />
                    ) : (
                      <span className="truncate">{item.title}</span>
                    )}
                  </div>

                  {/* Actions (Rename, Delete, Pin) */}
                  <div className="flex items-center gap-1 shrink-0">
                    {isEditing ? (
                      <button
                        onClick={(e) => handleSaveRename(item.id, e)}
                        className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                      >
                        <Check className="h-3 w-3" />
                      </button>
                    ) : (
                      <div className="hidden group-hover:flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onPinChat(item.id)
                          }}
                          title="Pin Chat"
                          className={`p-1 hover:bg-slate-100 rounded ${item.pinned ? "text-amber-600" : "text-[#64748B]"}`}
                        >
                          <Pin className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => handleStartRename(item, e)}
                          title="Rename Chat"
                          className="p-1 text-[#64748B] hover:text-[#1F2937] hover:bg-slate-100 rounded"
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onDeleteChat(item.id)
                          }}
                          title="Delete Chat"
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Quick Prompts */}
        <div className="space-y-2 pt-3 border-t border-[#E2E8F0]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] px-2 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-[#0F172A]" />
            <span>{isKannada ? "ತ್ವರಿತ ನಮೂನೆಗಳು" : "Suggested Prompts"}</span>
          </div>
          <div className="space-y-1">
            {promptList.map((p, i) => (
              <button
                key={i} 
                onClick={() => onSelectPrompt(p)}
                className="w-full text-left px-2.5 py-1.5 rounded-md bg-white border border-[#E2E8F0] text-[11px] text-[#475569] hover:text-[#0F172A] hover:border-slate-400 cursor-pointer transition-colors truncate block"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
