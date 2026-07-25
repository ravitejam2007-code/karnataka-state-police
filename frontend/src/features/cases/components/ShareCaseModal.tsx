import { useState } from "react"
import { toast } from "sonner"
import { X, Copy, Mail, Shield, Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ShareCaseModalProps {
  isOpen: boolean
  onClose: () => void
  caseNumber: string
  firNumber: string
}

export function ShareCaseModal({ isOpen, onClose, caseNumber, firNumber }: ShareCaseModalProps) {
  const [copied, setCopied] = useState(false)
  const [emailInput, setEmailInput] = useState("")
  const [shareDepartment, setShareDepartment] = useState("State Cyber Crime Cell")

  if (!isOpen) return null

  const caseUrl = `${window.location.origin}/app/investigation?caseId=${caseNumber}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(caseUrl)
    setCopied(true)
    toast.success("Case Link Copied!", { description: caseUrl })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput) return
    toast.success("Case Dossier Shared via Email", {
      description: `Access link sent to ${emailInput}`
    })
    setEmailInput("")
    onClose()
  }

  const handleInternalShare = () => {
    toast.success(`Transferred to ${shareDepartment}`, {
      description: `Case ${firNumber} access granted to ${shareDepartment} officers.`
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-50 font-sans">
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-md w-full p-5 space-y-4 text-[#1F2937] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#0F172A] text-white">
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1F2937]">Share Case Dossier</h3>
              <p className="text-[10px] text-[#64748B]">{firNumber} ({caseNumber})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-[#64748B] hover:text-[#1F2937]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Option 1: Direct Copy Link */}
        <div className="space-y-1.5 text-xs">
          <label className="font-semibold text-[#1F2937] block">Encrypted Case URL</label>
          <div className="flex gap-2">
            <Input
              readOnly
              value={caseUrl}
              className="bg-[#F8FAFC] border-[#E2E8F0] text-xs font-mono text-[#64748B]"
            />
            <Button
              onClick={handleCopyLink}
              className="bg-[#0F172A] hover:bg-black text-white text-xs px-3 shrink-0"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Option 2: Email Share */}
        <form onSubmit={handleSendEmail} className="space-y-1.5 text-xs pt-2 border-t border-[#E2E8F0]">
          <label className="font-semibold text-[#1F2937] block flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-[#0F172A]" />
            Send via Official Email
          </label>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="officer@ksp.gov.in"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="bg-[#F8FAFC] border-[#E2E8F0] text-xs"
            />
            <Button
              type="submit"
              disabled={!emailInput}
              className="bg-[#0F172A] hover:bg-black text-white text-xs px-3 shrink-0"
            >
              Send Link
            </Button>
          </div>
        </form>

        {/* Option 3: Internal Department Transfer */}
        <div className="space-y-1.5 text-xs pt-2 border-t border-[#E2E8F0]">
          <label className="font-semibold text-[#1F2937] block flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-[#0F172A]" />
            Share with Internal Department
          </label>
          <div className="flex gap-2">
            <select
              value={shareDepartment}
              onChange={(e) => setShareDepartment(e.target.value)}
              className="flex-1 h-9 px-2.5 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#1F2937]"
            >
              <option value="State Cyber Crime Cell">State Cyber Crime Cell</option>
              <option value="Criminal Investigation Dept (CID)">CID Karnataka</option>
              <option value="Forensic Science Laboratory (FSL)">FSL Bengaluru</option>
              <option value="Internal Security Division (ISD)">ISD Division</option>
            </select>
            <Button
              onClick={handleInternalShare}
              className="bg-[#0F172A] hover:bg-black text-white text-xs px-3 shrink-0"
            >
              Transfer
            </Button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-xs border-[#E2E8F0]"
          >
            Close
          </Button>
        </div>

      </div>
    </div>
  )
}
