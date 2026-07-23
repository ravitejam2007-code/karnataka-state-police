import { Network, Download, FileText, Share2, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  totalEntities: number;
  totalRelationships: number;
}

export function NetworkInvestigationHeader({ totalEntities, totalRelationships }: Props) {
  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 text-slate-100 flex items-center justify-between px-6 py-3 shadow-md z-10 relative">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-indigo-900/50 rounded-md border border-indigo-700/50 flex items-center justify-center">
            <Network className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono tracking-wider">CRIMINAL NETWORK ANALYSIS</div>
            <div className="font-semibold text-sm flex items-center gap-2">
              OP-GANGSTER-TRACK
              <Badge variant="outline" className="bg-red-950 text-red-400 border-red-800 text-[10px] h-5 px-1.5 rounded">HIGH RISK LEVEL</Badge>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6 border-l border-slate-700 pl-6 h-8 text-sm">
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Lead Analyst</span>
            <span className="font-medium text-slate-200">Insp. Ramesh K (CCB)</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Jurisdiction</span>
            <span className="font-medium text-slate-200">Central District</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Network Density</span>
            <span className="font-medium text-indigo-400 flex items-center gap-1">
              <Activity className="h-3.5 w-3.5" />
              {totalEntities} Nodes / {totalRelationships} Edges
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center text-xs text-slate-400 gap-1 mr-4">
          <span>Generated: {new Date().toLocaleDateString()}</span>
        </div>
        
        <Button variant="outline" size="sm" className="h-8 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white">
          <Share2 className="h-3.5 w-3.5 mr-2" />
          Share
        </Button>
        
        <Button variant="outline" size="sm" className="h-8 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white">
          <FileText className="h-3.5 w-3.5 mr-2" />
          Report
        </Button>
        
        <Button size="sm" className="h-8 bg-indigo-600 hover:bg-indigo-500 text-white">
          <Download className="h-3.5 w-3.5 mr-2" />
          Export PDF
        </Button>
      </div>
    </div>
  );
}
