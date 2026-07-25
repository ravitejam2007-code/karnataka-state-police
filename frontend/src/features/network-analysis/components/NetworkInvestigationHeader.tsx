import { toast } from "sonner"
import { Network, Download, Share2, Activity, Brain } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Props {
  totalEntities: number
  totalRelationships: number
  onToggleInsights?: () => void
}

export function NetworkInvestigationHeader({ totalEntities, totalRelationships, onToggleInsights }: Props) {
  const handleShareNetwork = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Network Graph Link Copied!", {
      description: "Encrypted graph visualization URL copied to clipboard."
    })
  }

  const handleExportNetworkReport = (format: "PDF" | "CSV" = "PDF") => {
    toast.success(`Exporting Criminal Network Intelligence Report (${format})`, {
      description: "Compiled graph nodes, suspect profiles, and financial trail matrix."
    })
  }

  return (
    <div className="w-full bg-white border-b border-[#E2E8F0] text-[#1F2937] flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 shadow-2xs z-10 relative font-sans flex-wrap gap-2">
      <div className="flex items-center gap-3 sm:gap-6">
        {onToggleInsights && (
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleInsights}
            className="lg:hidden h-9 w-9 border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] cursor-pointer shrink-0"
            title="Toggle Cases & AI Insights"
          >
            <Brain className="h-4 w-4" />
          </Button>
        )}

        <div className="flex items-center gap-3">
          <div className="h-9 sm:h-10 w-9 sm:w-10 bg-[#0F172A] rounded-lg border border-slate-700 flex items-center justify-center shrink-0">
            <Network className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
          </div>
          <div>
            <div className="text-[9px] sm:text-[10px] text-[#64748B] font-bold tracking-wider uppercase">CRIMINAL NETWORK ANALYSIS</div>
            <div className="font-bold text-xs sm:text-sm flex items-center gap-2 text-[#1F2937]">
              OP-GANGSTER-TRACK
              <Badge className="bg-red-600 text-white text-[9px] h-4 sm:h-5 px-1.5 rounded font-bold">HIGH RISK</Badge>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6 border-l border-[#E2E8F0] pl-6 h-8 text-xs">
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Lead Analyst</span>
            <span className="font-bold text-[#1F2937]">Insp. Ramesh K (CCB)</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Jurisdiction</span>
            <span className="font-bold text-[#1F2937]">Central District</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Network Density</span>
            <span className="font-bold text-[#0F172A] flex items-center gap-1">
              <Activity className="h-3.5 w-3.5 text-blue-600" />
              {totalEntities} Nodes / {totalRelationships} Edges
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleShareNetwork}
          className="h-8 border-[#E2E8F0] text-[#1F2937] hover:bg-[#F8FAFC] cursor-pointer text-xs"
        >
          <Share2 className="h-3.5 w-3.5 mr-1.5 text-[#64748B]" />
          <span className="hidden sm:inline">Share Graph</span>
        </Button>
        
        <Button 
          size="sm" 
          onClick={() => handleExportNetworkReport("PDF")}
          className="h-8 bg-[#0F172A] hover:bg-black text-white font-semibold cursor-pointer text-xs"
        >
          <Download className="h-3.5 w-3.5 mr-1.5" />
          <span className="hidden sm:inline">Export Report (PDF)</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </div>
    </div>
  )
}

