import { useState } from "react";
import { Brain, Shield, ChevronDown, Check, Activity, Target, ShieldAlert, GitBranch, Sparkles } from "lucide-react";

interface Props {
  activeCaseId: string;
  onSelectCase: (caseId: string) => void;
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
];

export function AIInsightsPanel({ activeCaseId, onSelectCase }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const activeCase = CASES_OPTIONS.find(c => c.id === activeCaseId) || CASES_OPTIONS[0];

  return (
    <div className="hidden lg:flex w-80 bg-white border-r border-[#E2E8F0] flex-col h-full overflow-hidden text-[#1E293B] shrink-0 font-sans">
      
      {/* Case Intelligence Selector Top Section */}
      <div className="p-3.5 border-b border-[#E2E8F0] bg-[#F8FAFC] space-y-2.5">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-[#0F172A]" />
            Case Intelligence Selector
          </span>
          <span className="text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded font-mono font-bold text-[9px]">
            LIVE GRAPH
          </span>
        </div>

        {/* Dropdown Selector Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E2E8F0] hover:border-slate-400 transition-colors text-left shadow-2xs cursor-pointer"
        >
          <div className="min-w-0 flex-1 mr-2">
            <div className="text-xs font-bold text-[#1F2937] leading-tight truncate">{activeCase.title}</div>
            <div className="text-[10px] text-[#64748B] flex items-center gap-1.5 mt-1">
              <span>{activeCase.district}</span>
              <span>•</span>
              <span className="font-mono font-semibold text-[#0F172A]">{activeCase.nodes} Nodes / {activeCase.edges} Edges</span>
            </div>
          </div>
          <ChevronDown className={`h-4 w-4 text-[#64748B] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Expanded Options Dropdown */}
        {isOpen && (
          <div className="space-y-1 pt-1 border-t border-[#E2E8F0] animate-in fade-in-50">
            {CASES_OPTIONS.map((c) => {
              const isSelected = c.id === activeCase.id;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectCase(c.id);
                    setIsOpen(false);
                  }}
                  className={`p-2 rounded-lg cursor-pointer transition-colors text-xs flex items-center justify-between ${
                    isSelected 
                      ? "bg-[#0F172A] text-white font-semibold shadow-2xs" 
                      : "hover:bg-white text-[#1F2937] border border-transparent hover:border-[#E2E8F0]"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-bold leading-tight truncate">{c.title}</div>
                    <div className={`text-[10px] ${isSelected ? "text-slate-300" : "text-[#64748B]"}`}>
                      {c.district} • {c.nodes} Suspect Nodes
                    </div>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />}
                </div>
              );
            })}
          </div>
        )}

        <div className="text-[10px] text-[#64748B] flex items-center gap-1.5 pt-0.5">
          <Sparkles className="h-3 w-3 text-[#0F172A] shrink-0" />
          <span>Selecting a case auto-maps suspect network graphs.</span>
        </div>
      </div>

      {/* AI Network Insights Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        <div className="flex items-center gap-2 text-[#0F172A] border-b border-[#E2E8F0] pb-2">
          <Brain className="h-4 w-4 text-[#0F172A]" />
          <h2 className="font-bold text-xs uppercase tracking-wider text-[#1E293B]">AI Network Insights</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
              Risk Assessment
            </div>
            <p className="text-xs text-[#475569] leading-relaxed bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
              High density of financial transactions between unverified accounts and known associates of Syed Ali. Indicates structured money laundering operation.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              <Target className="h-3.5 w-3.5 text-red-600" />
              Potential Leader
            </div>
            <div className="flex items-center gap-3 bg-red-50 p-2.5 rounded-lg border border-red-200">
              <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0">
                SA
              </div>
              <div>
                <div className="text-xs font-bold text-[#1E293B]">Syed Ali (Raju)</div>
                <div className="text-[10px] text-[#64748B]">Highest centrality index (0.85)</div>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              <GitBranch className="h-3.5 w-3.5 text-emerald-600" />
              Hidden Relationships
            </div>
            <ul className="text-xs text-[#475569] space-y-2 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
              <li className="flex gap-2">
                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>Vehicle KA-09-ER-4567 is registered to address matching Bank Account 0451XXXX2398.</span>
              </li>
              <li className="flex gap-2">
                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>Phone 9845X XXXXX pinged near Victim's location during incident window.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              <Activity className="h-3.5 w-3.5 text-[#0F172A]" />
              Suggested Leads
            </div>
            <div className="space-y-1.5">
              <button className="w-full text-left text-xs font-semibold px-2.5 py-2 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] hover:bg-[#0F172A] hover:text-white transition-colors text-[#1E293B] cursor-pointer">
                Subpoena Bank Account Logs
              </button>
              <button className="w-full text-left text-xs font-semibold px-2.5 py-2 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] hover:bg-[#0F172A] hover:text-white transition-colors text-[#1E293B] cursor-pointer">
                Locate Vehicle KA-09-ER-4567
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
