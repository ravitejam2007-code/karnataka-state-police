import { useState } from "react"
import { toast } from "sonner"
import { X, Shield, FileText, Image as ImageIcon, Video, Fingerprint, Lock, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface EvidenceDetail {
  id: string
  title: string
  category: "Photo" | "Document" | "CCTV" | "Fingerprint"
  date: string
  size: string
  uploadedBy?: string
  chainOfCustody?: { timestamp: string; officer: string; action: string }[]
  previewUrl?: string
  notes?: string
}

interface EvidenceDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  evidence: EvidenceDetail | null
}

export function EvidenceDetailsModal({ isOpen, onClose, evidence }: EvidenceDetailsModalProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  if (!isOpen || !evidence) return null

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Photo": return <ImageIcon className="h-5 w-5 text-blue-600" />
      case "CCTV": return <Video className="h-5 w-5 text-amber-600" />
      case "Fingerprint": return <Fingerprint className="h-5 w-5 text-purple-600" />
      default: return <FileText className="h-5 w-5 text-emerald-600" />
    }
  }

  const defaultCustody = [
    { timestamp: `${evidence.date} 09:30 AM`, officer: "Insp. Ramesh Kumar (Mysuru CCB)", action: "Secured from crime scene & logged in locker" },
    { timestamp: `${evidence.date} 02:15 PM`, officer: "Sub-Insp. Vijay Patil", action: "Transferred to Forensic Lab for digital hash check" },
    { timestamp: "2026-07-14 11:00 AM", officer: "Lab Analyst Swati N", action: "Forensic verification completed; sealed in custody vault" }
  ]

  const custodyList = evidence.chainOfCustody || defaultCustody

  const handleDownloadEvidence = () => {
    toast.success(`Downloading ${evidence.title}`, {
      description: `File ID: ${evidence.id} (${evidence.size})`
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-50 font-sans">
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-2xl w-full p-6 space-y-5 text-[#1F2937] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
              {getCategoryIcon(evidence.category)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#1F2937]">{evidence.title}</h3>
                <span className="bg-slate-200 text-[#1F2937] text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                  {evidence.id}
                </span>
              </div>
              <p className="text-xs text-[#64748B]">
                Type: {evidence.category} • Size: {evidence.size} • Date Logged: {evidence.date}
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-1 text-xs">
          
          {/* Metadata Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[10px] text-[#64748B] font-semibold block uppercase">Secured By</span>
              <span className="font-bold text-[#1F2937] text-xs">{evidence.uploadedBy || "PI Ramesh Kumar"}</span>
            </div>
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[10px] text-[#64748B] font-semibold block uppercase">Digital SHA-256 Hash</span>
              <span className="font-mono text-[10px] text-emerald-700 font-bold block truncate">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
            </div>
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[10px] text-[#64748B] font-semibold block uppercase">Locker Status</span>
              <span className="font-bold text-blue-700 text-xs flex items-center gap-1">
                <Lock className="h-3 w-3 text-blue-600" /> Tamper-Sealed
              </span>
            </div>
          </div>

          {/* Evidence Preview Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[#1F2937] flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-[#0F172A]" />
                Evidence File Preview
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                className="text-xs h-7 border-[#E2E8F0]"
              >
                {isPreviewOpen ? "Hide Preview" : "Show Full Preview"}
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-center space-y-3">
              {evidence.category === "Photo" ? (
                <div className="space-y-2">
                  <img
                    src={evidence.previewUrl || "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80"}
                    alt={evidence.title}
                    className="max-h-48 mx-auto rounded-lg border border-slate-300 object-cover"
                  />
                  <p className="text-[11px] text-[#64748B]">High-Resolution Evidence Photo (Extract from Scene #02)</p>
                </div>
              ) : evidence.category === "CCTV" ? (
                <div className="space-y-2">
                  <div className="h-40 bg-slate-900 rounded-lg flex items-center justify-center text-white space-y-2 flex-col">
                    <Video className="h-10 w-10 text-amber-400 animate-pulse" />
                    <span className="font-mono text-xs text-slate-300">CCTV_CLIP_04_DEC2026.MP4 (1080p 60fps)</span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">Security Camera Feed from Bank Entrance Counter Desk</p>
                </div>
              ) : (
                <div className="p-6 bg-white rounded-lg border border-slate-200 text-left space-y-2 font-mono text-[11px] text-[#475569]">
                  <p className="font-bold text-[#1F2937]">[OFFICIAL FORENSIC RECORD]</p>
                  <p>Document ID: {evidence.id}</p>
                  <p>Status: VERIFIED & SEALED BY STATE CRIME BUREAU</p>
                  <p>Content: Witness statement recorded under Section 161 CrPC / Section 180 BNS.</p>
                </div>
              )}
            </div>
          </div>

          {/* Chain of Custody Timeline */}
          <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
            <h4 className="font-bold text-[#1F2937] flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-[#0F172A]" />
              Chain of Custody Audit Trail
            </h4>
            <div className="space-y-2 pl-2 border-l-2 border-[#0F172A]">
              {custodyList.map((log, index) => (
                <div key={index} className="relative pl-3 space-y-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#1F2937]">{log.officer}</span>
                    <span className="text-[#64748B] font-mono text-[10px]">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-[#475569]">{log.action}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="border-t border-[#E2E8F0] pt-3 flex items-center justify-between shrink-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-xs border-[#E2E8F0]"
          >
            Close Window
          </Button>

          <Button
            onClick={handleDownloadEvidence}
            className="bg-[#0F172A] hover:bg-black text-white text-xs font-bold gap-2"
          >
            <Download className="h-4 w-4" />
            Download Evidence Package
          </Button>
        </div>

      </div>
    </div>
  )
}
