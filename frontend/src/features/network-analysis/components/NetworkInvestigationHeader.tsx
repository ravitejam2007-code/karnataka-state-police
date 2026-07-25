import { toast } from "sonner"
import { Network, Download, Share2, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Props {
  totalEntities: number
  totalRelationships: number
}

export function NetworkInvestigationHeader({ totalEntities, totalRelationships }: Props) {
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
    <div className="w-full bg-white border-b border-[#E2E8F0] text-[#1F2937] flex items-center justify-between px-6 py-3 shadow-2xs z-10 relative font-sans">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#0F172A] rounded-lg border border-slate-700 flex items-center justify-center">
            <Network className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-[10px] text-[#64748B] font-bold tracking-wider uppercase">CRIMINAL NETWORK ANALYSIS</div>
            <div className="font-bold text-sm flex items-center gap-2 text-[#1F2937]">
              OP-GANGSTER-TRACK
              <Badge className="bg-red-600 text-white text-[10px] h-5 px-1.5 rounded font-bold">HIGH RISK</Badge>
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
          className="h-8 border-[#E2E8F0] text-[#1F2937] hover:bg-[#F8FAFC] cursor-pointer"
        >
          <Share2 className="h-3.5 w-3.5 mr-1.5 text-[#64748B]" />
          Share Graph
        </Button>
        
        <Button 
          size="sm" 
          onClick={() => handleExportNetworkReport("PDF")}
          className="h-8 bg-[#0F172A] hover:bg-black text-white font-semibold cursor-pointer"
        >
          <Download className="h-3.5 w-3.5 mr-1.5" />
          Export Report (PDF)
        </Button>

        <Button 
          size="sm" 
          variant="outline"
          onClick={() => handleExportNetworkReport("CSV")}
          className="h-8 border-[#E2E8F0] text-[#1F2937] hover:bg-[#F8FAFC] font-semibold cursor-pointer hidden sm:inline-flex"
        >
          <Download className="h-3.5 w-3.5 mr-1 text-[#64748B]" />
          CSV
        </Button>
      </div>
    </div>
  )
}
