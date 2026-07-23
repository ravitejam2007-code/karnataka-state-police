import { Shield, Clock, AlertTriangle, Download, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CurrentInvestigationHeader() {
  return (
    <div className="w-full bg-slate-900 border-b border-slate-700 text-slate-100 flex items-center justify-between px-6 py-3 shadow-sm z-10 relative">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-900 rounded-md border border-blue-700 flex items-center justify-center">
            <Shield className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono tracking-wider">CURRENT INVESTIGATION</div>
            <div className="font-semibold text-sm flex items-center gap-2">
              CASE-2026-8894 
              <Badge variant="outline" className="bg-red-950 text-red-400 border-red-800 text-[10px] h-5 px-1.5 rounded">HIGH PRIORITY</Badge>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6 border-l border-slate-700 pl-6 h-8 text-sm">
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Lead Officer</span>
            <span className="font-medium">PI Ramesh K (Mysuru CCB)</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Jurisdiction</span>
            <span className="font-medium">Devaraja Sub-Division</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Status</span>
            <span className="font-medium text-emerald-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Active Analysis
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 mr-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">AI Confidence</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[92%]"></div>
              </div>
              <span className="text-xs font-bold font-mono">92%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center text-xs text-slate-400 gap-1 mr-2">
            <Clock className="h-3.5 w-3.5" />
            <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          
          <Button variant="outline" size="sm" className="h-8 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white">
            <Globe className="h-3.5 w-3.5 mr-2" />
            EN / KN
          </Button>
          
          <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-500 text-white">
            <Download className="h-3.5 w-3.5 mr-2" />
            Export Dossier
          </Button>
        </div>
      </div>
    </div>
  );
}
