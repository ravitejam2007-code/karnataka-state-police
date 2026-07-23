import { ShieldAlert, Users, Car, MapPin, FileText, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function RightIntelligencePanel() {
  return (
    <div className="hidden xl:flex w-64 bg-slate-900 border-l border-slate-800 flex-col h-full overflow-hidden text-slate-300 shrink-0">
      
      <div className="p-4 border-b border-slate-800 bg-slate-800/30">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
          <Activity className="h-3.5 w-3.5" />
          Live Risk Assessment
        </div>
        <div className="flex items-end gap-2 mb-1">
          <span className="text-3xl font-bold text-red-400">82</span>
          <span className="text-xs text-slate-500 mb-1">/ 100</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-red-500 h-1.5 w-[82%]"></div>
        </div>
        <span className="text-[10px] text-red-400 font-medium bg-red-400/10 px-2 py-0.5 rounded">HIGH CRIME DENSITY</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        
        {/* Alerts */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <ShieldAlert className="h-3.5 w-3.5" />
            Active Alerts
          </div>
          <div className="p-3 bg-red-950/30 border border-red-900/50 rounded text-xs space-y-1">
            <div className="font-semibold text-red-400">Suspect Activity Detected</div>
            <div className="text-slate-400">Repeated pattern matches recent FIRs in Devaraja Mohalla.</div>
            <div className="text-[10px] text-slate-500 mt-2">10 mins ago</div>
          </div>
        </div>

        {/* Entities */}
        <div className="space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Detected Entities
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <FileText className="h-4 w-4" />
                <span>Related FIRs</span>
              </div>
              <Badge variant="secondary" className="bg-slate-800 text-slate-300">4</Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="h-4 w-4" />
                <span>Persons</span>
              </div>
              <Badge variant="secondary" className="bg-slate-800 text-slate-300">2</Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Car className="h-4 w-4" />
                <span>Vehicles</span>
              </div>
              <Badge variant="secondary" className="bg-slate-800 text-slate-300">0</Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="h-4 w-4" />
                <span>Locations</span>
              </div>
              <Badge variant="secondary" className="bg-slate-800 text-slate-300">3</Badge>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Suggested Actions
          </div>
          <div className="space-y-2">
            <button className="w-full text-left text-xs px-3 py-2 bg-slate-800 rounded border border-slate-700 hover:bg-blue-900/30 hover:border-blue-800 hover:text-blue-400 transition-colors">
              Request Surveillance
            </button>
            <button className="w-full text-left text-xs px-3 py-2 bg-slate-800 rounded border border-slate-700 hover:bg-blue-900/30 hover:border-blue-800 hover:text-blue-400 transition-colors">
              Generate Warrant Draft
            </button>
            <button className="w-full text-left text-xs px-3 py-2 bg-slate-800 rounded border border-slate-700 hover:bg-blue-900/30 hover:border-blue-800 hover:text-blue-400 transition-colors">
              Alert Neighboring Stations
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
