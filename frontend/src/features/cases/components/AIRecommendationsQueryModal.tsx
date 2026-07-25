import { toast } from "sonner"
import { X, Sparkles, Users, FileText, Network, ShieldCheck, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AIRecommendationsQueryModalProps {
  isOpen: boolean
  onClose: () => void
  caseNumber: string
}

export function AIRecommendationsQueryModal({ isOpen, onClose, caseNumber }: AIRecommendationsQueryModalProps) {
  if (!isOpen) return null

  const handleExportQueryResults = () => {
    toast.success("AI Intelligence Query Results Exported", {
      description: "Downloaded complete AI analysis report (PDF format)."
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-50 font-sans">
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-3xl w-full p-6 space-y-5 text-[#1F2937] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#0F172A] text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#1F2937]">AI Automated Query & Network Analysis</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Query Verified
                </span>
              </div>
              <p className="text-xs text-[#64748B]">
                Cross-referencing State Database for Case <strong className="text-[#1F2937]">{caseNumber}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-[#64748B] hover:text-[#1F2937]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-1 text-xs">
          
          {/* Executive Summary */}
          <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-200 space-y-1">
            <div className="flex items-center gap-2 font-bold text-blue-900">
              <ShieldCheck className="h-4 w-4 text-blue-700" />
              Automated Intelligence Brief
            </div>
            <p className="text-[#334155] leading-relaxed text-[11px]">
              AI Query Engine matched <strong>2 Known Absconding Suspects</strong>, <strong>3 Related Active FIRs</strong>, and <strong>1 Financial Syndicate Cluster</strong> operating across Mysuru & Bengaluru Urban divisions. Modus Operandi matches 2025 Bank Syndicate Series.
            </p>
          </div>

          {/* Grid Section 1: Matched Suspects */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#1F2937] flex items-center gap-2 text-xs uppercase tracking-wider">
              <Users className="h-4 w-4 text-[#0F172A]" />
              Matched Suspect Profiles (State Database)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-[#1F2937] text-xs">Raju @ 'Snake' Raju</h5>
                  <p className="text-[10px] text-[#64748B]">Alias: Raju Mysuru • Prior Offenses: 4</p>
                  <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded mt-1 inline-block">
                    Match Confidence: 94% (Fingerprint P-882)
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-[#1F2937] text-xs">Karan Yadav</h5>
                  <p className="text-[10px] text-[#64748B]">Alias: Chotta Karan • Prior Offenses: 2</p>
                  <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded mt-1 inline-block">
                    Match Confidence: 87% (Getaway Vehicle Link)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Section 2: Related FIRs & Similar Cases */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#1F2937] flex items-center gap-2 text-xs uppercase tracking-wider">
              <FileText className="h-4 w-4 text-[#0F172A]" />
              Related FIRs & Modus Operandi Matches
            </h4>
            <div className="space-y-2">
              {[
                { fir: "FIR/2025/0891", title: "Commercial Theft at Devaraja Sub-Division", match: "Identical getaway vehicle & 3-person gang entry" },
                { fir: "FIR/2026/0104", title: "Jewelry Store Heist - KR Circle", match: "Matched CCTV face mesh embedding #881" }
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-[#0F172A] text-xs">{item.fir}</span>
                    <h5 className="font-semibold text-[#1F2937] text-xs">{item.title}</h5>
                    <p className="text-[10px] text-[#64748B]">{item.match}</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-[11px] h-7 border-[#E2E8F0]">
                    Link to Case
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Criminal Network Graph Preview */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#1F2937] flex items-center gap-2 text-xs uppercase tracking-wider">
              <Network className="h-4 w-4 text-[#0F172A]" />
              Syndicate & Financial Trail Cluster
            </h4>
            <div className="p-4 rounded-lg bg-slate-900 text-white space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between border-b border-slate-700 pb-1 text-[#94A3B8]">
                <span>NODE RELATIONSHIP LINK</span>
                <span>RISK SCORE</span>
              </div>
              <div className="flex justify-between">
                <span>[Suspect: Raju Mysuru] &lt;==&gt; [Financer: Vikram B]</span>
                <span className="text-red-400 font-bold">98/100 (HIGH)</span>
              </div>
              <div className="flex justify-between">
                <span>[Vehicle: KA-09-EA-4412] &lt;==&gt; [Location: Hunsur Checkpost]</span>
                <span className="text-amber-400 font-bold">85/100 (MED)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#E2E8F0] pt-3 flex items-center justify-between shrink-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-xs border-[#E2E8F0]"
          >
            Close
          </Button>

          <Button
            onClick={handleExportQueryResults}
            className="bg-[#0F172A] hover:bg-black text-white text-xs font-bold gap-2"
          >
            <Download className="h-4 w-4" />
            Export AI Intelligence Summary
          </Button>
        </div>

      </div>
    </div>
  )
}
