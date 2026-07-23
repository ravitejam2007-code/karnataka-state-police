import { Clock, Pin, Bookmark, LayoutTemplate, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const history = [
  { id: 1, title: "Mysuru Robbery Hotspots", time: "2 hrs ago", active: true },
  { id: 2, title: "Vehicle Theft Ring Analysis", time: "Yesterday", active: false },
  { id: 3, title: "Cyber Fraud - Phishing", time: "Jul 14", active: false }
];

const pinned = [
  { id: 101, title: "Operation Gangster Track", type: "Investigation" },
  { id: 102, title: "Central District Drug Network", type: "Network Analysis" }
];

export function LeftInvestigationPanel() {
  return (
    <div className="hidden lg:flex w-64 bg-slate-900 border-r border-slate-800 flex-col h-full overflow-hidden text-slate-300 shrink-0">
      <div className="p-4 border-b border-slate-800">
        <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white justify-start">
          <Plus className="h-4 w-4 mr-2" />
          New Investigation
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        
        {/* Templates */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <LayoutTemplate className="h-3.5 w-3.5" />
            Quick Templates
          </div>
          <div className="grid grid-cols-1 gap-2">
            {["Robbery Investigation", "Cyber Crime Analysis", "Repeat Offender Check"].map((template) => (
              <div key={template} className="text-xs px-3 py-2 bg-slate-800 rounded border border-slate-700 hover:bg-slate-700 hover:border-slate-600 cursor-pointer transition-colors">
                {template}
              </div>
            ))}
          </div>
        </div>

        {/* Pinned */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Pin className="h-3.5 w-3.5" />
            Pinned Investigations
          </div>
          <div className="space-y-1">
            {pinned.map((item) => (
              <div key={item.id} className="text-sm px-2 py-1.5 hover:bg-slate-800 rounded flex flex-col cursor-pointer group">
                <span className="text-slate-200 group-hover:text-blue-400 transition-colors truncate">{item.title}</span>
                <span className="text-[10px] text-slate-500">{item.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            Recent History
          </div>
          <div className="space-y-1">
            {history.map((item) => (
              <div 
                key={item.id} 
                className={`text-sm px-2 py-2 rounded flex flex-col cursor-pointer border-l-2 ${item.active ? 'border-blue-500 bg-slate-800' : 'border-transparent hover:bg-slate-800/50'}`}
              >
                <div className="flex justify-between items-start">
                  <span className={`truncate mr-2 ${item.active ? 'text-blue-400 font-medium' : 'text-slate-300'}`}>{item.title}</span>
                </div>
                <span className="text-[10px] text-slate-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bookmarks */}
        <div className="space-y-3 pb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Bookmark className="h-3.5 w-3.5" />
            Saved Reports
          </div>
          <div className="text-sm px-2 py-2 text-slate-500 italic">
            No saved reports yet.
          </div>
        </div>

      </div>
    </div>
  );
}
