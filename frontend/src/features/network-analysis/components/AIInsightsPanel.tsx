import { Brain, LayoutTemplate, Activity, Target, ShieldAlert, GitBranch } from "lucide-react";
import type { NetworkTemplate } from "../types";

interface Props {
  templates: NetworkTemplate[];
  activeTemplateId: string;
  onSelectTemplate: (id: string) => void;
}

export function AIInsightsPanel({ templates, activeTemplateId, onSelectTemplate }: Props) {
  return (
    <div className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden text-slate-300">
      
      <div className="p-4 border-b border-slate-800 bg-slate-800/30">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
          <LayoutTemplate className="h-3.5 w-3.5" />
          Investigation Templates
        </div>
        <div className="space-y-1.5">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTemplate(t.id)}
              className={`w-full text-left px-3 py-2 text-xs rounded transition-colors border ${
                activeTemplateId === t.id 
                  ? 'bg-indigo-900/40 border-indigo-500/50 text-indigo-300' 
                  : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="font-medium">{t.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        
        <div className="flex items-center gap-2 text-indigo-400 mb-2 border-b border-indigo-900/50 pb-2">
          <Brain className="h-5 w-5" />
          <h2 className="font-semibold tracking-wide">AI Network Insights</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
              Risk Assessment
            </div>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-800/50 p-2.5 rounded border border-slate-800">
              High density of financial transactions between unverified accounts and known associates of Syed Ali. Indicates structured money laundering operation.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Target className="h-3.5 w-3.5 text-red-400" />
              Potential Leader
            </div>
            <div className="flex items-center gap-3 bg-red-950/20 p-2.5 rounded border border-red-900/30">
              <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center font-bold text-red-400 border border-red-800/50">
                SA
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-200">Syed Ali (Raju)</div>
                <div className="text-[10px] text-slate-500">Highest centrality index (0.85)</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <GitBranch className="h-3.5 w-3.5 text-emerald-400" />
              Hidden Relationships
            </div>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex gap-2">
                <span className="w-1.5 h-1.5 mt-1 rounded-full bg-emerald-500 shrink-0" />
                <span>Vehicle KA-09-ER-4567 is registered to address matching Bank Account 0451XXXX2398.</span>
              </li>
              <li className="flex gap-2">
                <span className="w-1.5 h-1.5 mt-1 rounded-full bg-emerald-500 shrink-0" />
                <span>Phone 9845X XXXXX pinged near Victim's location during incident window.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Activity className="h-3.5 w-3.5 text-blue-400" />
              Suggested Leads
            </div>
            <div className="space-y-1.5">
              <button className="w-full text-left text-xs px-2.5 py-1.5 bg-slate-800 rounded border border-slate-700 hover:bg-slate-700 transition-colors text-blue-300">
                Subpoena HDFC Bank Records
              </button>
              <button className="w-full text-left text-xs px-2.5 py-1.5 bg-slate-800 rounded border border-slate-700 hover:bg-slate-700 transition-colors text-blue-300">
                Locate Vehicle KA-09-ER
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
