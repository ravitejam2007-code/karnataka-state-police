import { Shield, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CurrentInvestigationHeader() {
  return (
    <div className="w-full bg-white border-b border-[#E2E8F0] text-[#1E293B] flex items-center justify-between px-6 py-3 shadow-2xs z-10 relative font-sans">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#2563EB]/10 rounded-lg border border-[#2563EB]/30 flex items-center justify-center">
            <Shield className="h-5 w-5 text-[#2563EB]" />
          </div>
          <div>
            <div className="text-[10px] text-[#64748B] font-bold tracking-wider uppercase">ACTIVE INVESTIGATION</div>
            <div className="font-bold text-sm flex items-center gap-2 text-[#1E293B]">
              CASE-2026-8894 
              <Badge className="bg-red-600 text-white text-[10px] h-5 px-1.5 rounded font-bold">HIGH PRIORITY</Badge>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6 border-l border-[#E2E8F0] pl-6 h-8 text-xs">
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Lead Officer</span>
            <span className="font-bold text-[#1E293B]">PI Ramesh K (Mysuru CCB)</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Jurisdiction</span>
            <span className="font-bold text-[#1E293B]">Devaraja Sub-Division</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Status</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Active Analysis
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 mr-2">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-bold">AI Confidence</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 bg-[#E2E8F0] rounded-full overflow-hidden">
                <div className="h-full bg-[#2563EB] w-[92%]"></div>
              </div>
              <span className="text-xs font-bold font-mono text-[#1E293B]">92%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#64748B] font-mono">
          <Clock className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      </div>
    </div>
  );
}
