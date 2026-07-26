import { useState } from "react"
import { Shield, Lock, CheckCircle2, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useAuthStore, type Role } from "@/store/useAuthStore"
import { useRoleSecurityStore } from "@/store/useRoleSecurityStore"
import { toast } from "sonner"

interface VerifyRolePinModalProps {
  isOpen: boolean
  onClose: () => void
  role: Role
  roleTitle: string
  onSuccess: () => void
}

export function VerifyRolePinModal({ isOpen, onClose, role, roleTitle, onSuccess }: VerifyRolePinModalProps) {
  const { user } = useAuthStore()
  const { verifyPin, getRoleMeta, addAuditLog } = useRoleSecurityStore()
  const roleMeta = getRoleMeta(role)

  const [enteredPin, setEnteredPin] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const resetState = () => {
    setEnteredPin("")
    setErrorMsg(null)
    setIsVerifying(false)
  }

  const handleClose = () => {
    resetState()
    onClose()
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!enteredPin.trim()) {
      setErrorMsg("Please enter the 6-digit Role Access PIN.")
      return
    }

    setIsVerifying(true)
    const isValid = await verifyPin(role, enteredPin.trim())
    setIsVerifying(false)

    if (!isValid) {
      setErrorMsg("Invalid Role Access Password. Please try again.")
      toast.error("Invalid Role Access Password", {
        description: "Access authorization failed. Please verify credentials and try again.",
      })
      setEnteredPin("")
      return
    }

    // Add Audit log entry
    const nowFormatted =
      new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " IST"

    addAuditLog({
      userName: user?.name || "Official User",
      roleName: roleTitle,
      action: "Role Activated via PIN",
      dateTime: nowFormatted,
      updatedBy: `${user?.name || "User"} (${user?.role || role})`,
    })

    toast.success(`Role PIN Verified! Activating ${roleTitle}...`)
    resetState()
    onSuccess()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md bg-white border border-[#E2E8F0] shadow-xl rounded-2xl p-0 overflow-hidden font-sans">
        {/* Header */}
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#0F172A] text-white shadow-2xs">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-[#0F172A]">
                Role Access PIN Verification
              </DialogTitle>
              <p className="text-xs text-[#64748B] mt-0.5">
                Authenticating session switch to <strong className="text-[#0F172A] font-semibold">{roleTitle}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleVerify} className="p-5 space-y-4">
          <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl space-y-1 text-xs">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold">
              <Lock className="h-3.5 w-3.5" />
              <span>Protected Security Tier ({roleMeta.accessLevel})</span>
            </div>
            <p className="text-[11px] text-amber-700 leading-snug">
              This role requires PIN verification before activation. Enter your configured 6-digit Role Access PIN below.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-in fade-in-50">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F172A] flex items-center justify-between">
              <span>6-Digit Access PIN</span>
              <span className="text-[10px] text-[#64748B] font-mono">Demo default: {roleMeta.plainPinSample || "123456"}</span>
            </label>
            <Input
              type="password"
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              placeholder="••••••"
              maxLength={10}
              className="h-11 text-center text-base tracking-widest font-mono rounded-xl border-[#CBD5E1] focus-visible:ring-1 focus-visible:ring-[#0F172A]"
              autoFocus
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E2E8F0]">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="h-9 px-4 text-xs font-semibold rounded-xl border-[#CBD5E1]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isVerifying}
              className="h-9 px-5 text-xs font-bold bg-[#0F172A] hover:bg-black text-white rounded-xl shadow-2xs cursor-pointer"
            >
              {isVerifying ? (
                <span>Verifying...</span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verify & Activate Role
                </span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
