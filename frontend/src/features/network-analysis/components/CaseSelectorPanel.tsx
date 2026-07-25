import { useState } from "react"
import { Shield, ChevronDown, Check, Sparkles } from "lucide-react"

interface CaseSelectorPanelProps {
  activeCaseId: string
  onSelectCase: (caseId: string) => void
}

const CASES_OPTIONS = [
  {
    id: "FIR-2026-0412",
    title: "FIR/2026/0412 - Mysuru Bank Robbery Syndicate",
    district: "Mysuru Urban",
    nodes: 8,
    edges: 12,
    risk: "High Priority"
  },
  {
    id: "FIR-2026-1098",
    title: "FIR/2026/1098 - Cyber Crypto Phishing Network",
    district: "Bengaluru East",
    nodes: 14,
    edges: 22,
    risk: "Critical"
  },
  {
    id: "FIR-2025-0891",
    title: "FIR/2025/0891 - Interstate Vehicle Theft Ring",
    district: "Chamarajanagar",
    nodes: 6,
    edges: 9,
    risk: "Medium"
  }
]

export function CaseSelectorPanel({ activeCaseId, onSelectCase }: CaseSelectorPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  const activeCase = CASES_OPTIONS.find(c => c.id === activeCaseId) || CASES_OPTIONS[0]

  return (
    <div className="absolute top-4 left-4 z-20 font-sans">
      <div className="bg-white/95 backdrop-blur-xs border border-[#E2E8F0] shadow-lg rounded-xl p-3 w-80 space-y-2 text-[#1F2937]">
        
        {/* Label Header */}
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
          <span className="flex items-center gap-1">
            <Shield className="h-3 w-3 text-[#0F172A]" />
            Case Intelligence Selector
          </span>
          <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-bold">
            Live Graph
          </span>
        </div>

        {/* Dropdown Selector Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-slate-400 transition-colors text-left"
        >
          <div>
            <div className="text-xs font-bold text-[#1F2937] leading-tight truncate">{activeCase.title}</div>
            <div className="text-[10px] text-[#64748B] flex items-center gap-2 mt-0.5">
              <span>{activeCase.district}</span>
              <span>•</span>
              <span className="font-mono font-semibold text-[#0F172A]">{activeCase.nodes} Nodes / {activeCase.edges} Edges</span>
            </div>
          </div>
          <ChevronDown className={`h-4 w-4 text-[#64748B] transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Expanded Options Dropdown */}
        {isOpen && (
          <div className="space-y-1 pt-1 border-t border-[#E2E8F0] animate-in fade-in-50">
            {CASES_OPTIONS.map((c) => {
              const isSelected = c.id === activeCase.id
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectCase(c.id)
                    setIsOpen(false)
                  }}
                  className={`p-2 rounded-lg cursor-pointer transition-colors text-xs flex items-center justify-between ${
                    isSelected 
                      ? "bg-[#0F172A] text-white font-semibold" 
                      : "hover:bg-[#F8FAFC] text-[#1F2937]"
                  }`}
                >
                  <div>
                    <div className="font-bold leading-tight">{c.title}</div>
                    <div className={`text-[10px] ${isSelected ? "text-slate-300" : "text-[#64748B]"}`}>
                      {c.district} • {c.nodes} Suspect Nodes
                    </div>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />}
                </div>
              )
            })}
          </div>
        )}

        {/* Case Info Banner */}
        <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] text-[#64748B] flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-[#0F172A] shrink-0" />
          <span>Selecting a case automatically maps suspect graphs & evidence links.</span>
        </div>

      </div>
    </div>
  )
}
