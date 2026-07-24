import { Network, Download, Share2, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  totalEntities: number;
  totalRelationships: number;
}

export function NetworkInvestigationHeader({ totalEntities, totalRelationships }: Props) {
  return (
    <div className="w-full bg-white border-b border-[#E2E8F0] text-[#1E293B] flex items-center justify-between px-6 py-3 shadow-2xs z-10 relative font-sans">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#2563EB]/10 rounded-lg border border-[#2563EB]/30 flex items-center justify-center">
            <Network className="h-5 w-5 text-[#2563EB]" />
          </div>
          <div>
            <div className="text-[10px] text-[#64748B] font-bold tracking-wider uppercase">CRIMINAL NETWORK ANALYSIS</div>
            <div className="font-bold text-sm flex items-center gap-2 text-[#1E293B]">
              OP-GANGSTER-TRACK
              <Badge className="bg-red-600 text-white text-[10px] h-5 px-1.5 rounded font-bold">HIGH RISK</Badge>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6 border-l border-[#E2E8F0] pl-6 h-8 text-xs">
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Lead Analyst</span>
            <span className="font-bold text-[#1E293B]">Insp. Ramesh K (CCB)</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Jurisdiction</span>
            <span className="font-bold text-[#1E293B]">Central District</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Network Density</span>
            <span className="font-bold text-[#2563EB] flex items-center gap-1">
              <Activity className="h-3.5 w-3.5" />
              {totalEntities} Nodes / {totalRelationships} Edges
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 border-[#E2E8F0] text-[#1E293B] hover:bg-[#F8FAFC]">
          <Share2 className="h-3.5 w-3.5 mr-1.5 text-[#64748B]" />
          Share
        </Button>
        
        <Button size="sm" className="h-8 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold">
          <Download className="h-3.5 w-3.5 mr-1.5" />
          Export Report
        </Button>
      </div>
    </div>
  );
}
