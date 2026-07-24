import { Brain, LayoutTemplate, Activity, Target, ShieldAlert, GitBranch } from "lucide-react";
import type { NetworkTemplate } from "../types";

interface Props {
  templates: NetworkTemplate[];
  activeTemplateId: string;
  onSelectTemplate: (id: string) => void;
}

export function AIInsightsPanel({ templates, activeTemplateId, onSelectTemplate }: Props) {
  return (
    <div className="hidden lg:flex w-72 bg-white border-r border-[#E2E8F0] flex-col h-full overflow-hidden text-[#1E293B] shrink-0 font-sans">
      
      <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-3 flex items-center gap-2">
          <LayoutTemplate className="h-3.5 w-3.5 text-[#2563EB]" />
          Investigation Templates
        </div>
        <div className="space-y-1.5">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTemplate(t.id)}
              className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors border ${
                activeTemplateId === t.id 
                  ? 'bg-[#2563EB] border-[#2563EB] text-white font-bold shadow-2xs' 
                  : 'bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#475569]'
              }`}
            >
              <div className="font-semibold">{t.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        
        <div className="flex items-center gap-2 text-[#2563EB] mb-1 border-b border-[#E2E8F0] pb-2">
          <Brain className="h-4 w-4 text-[#2563EB]" />
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
              <Activity className="h-3.5 w-3.5 text-[#2563EB]" />
              Suggested Leads
            </div>
            <div className="space-y-1.5">
              <button className="w-full text-left text-xs font-semibold px-2.5 py-1.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-colors text-[#1E293B]">
                Subpoena HDFC Bank Records
              </button>
              <button className="w-full text-left text-xs font-semibold px-2.5 py-1.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-colors text-[#1E293B]">
                Locate Vehicle KA-09-ER
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
