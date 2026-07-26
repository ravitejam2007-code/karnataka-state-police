import { useState } from "react"
import { Eye, EyeOff, ShieldCheck, CheckCircle2, AlertCircle, X, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useAuthStore, type Role } from "@/store/useAuthStore"
import { useRoleSecurityStore, calculatePinStrength } from "@/store/useRoleSecurityStore"
import { toast } from "sonner"

interface UpdateRolePinModalProps {
  isOpen: boolean
  onClose: () => void
  role: Role
  roleTitle: string
}

export function UpdateRolePinModal({ isOpen, onClose, role, roleTitle }: UpdateRolePinModalProps) {
  const { user } = useAuthStore()
  const { updateRolePin, getRoleMeta } = useRoleSecurityStore()
  const roleMeta = getRoleMeta(role)

  const [currentPin, setCurrentPin] = useState("")
  const [newPin, setNewPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")

  const [showCurrentPin, setShowCurrentPin] = useState(false)
  const [showNewPin, setShowNewPin] = useState(false)
  const [showConfirmPin, setShowConfirmPin] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const strength = calculatePinStrength(newPin)

  const resetForm = () => {
    setCurrentPin("")
    setNewPin("")
    setConfirmPin("")
    setErrorMessage(null)
    setIsSubmitting(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!currentPin) {
      setErrorMessage("Please enter your current Access PIN.")
      return
    }

    if (!newPin) {
      setErrorMessage("Please enter a new Access PIN.")
      return
    }

    if (newPin !== confirmPin) {
      setErrorMessage("New Access PINs do not match. Please verify.")
      return
    }

    if (newPin.length < 6) {
      setErrorMessage("New Access PIN must be at least 6 digits long.")
      return
    }

    setIsSubmitting(true)

    const updatedBy = `${user?.name || "Officer"} (${user?.role || "Admin"})`
    const userName = user?.name || "Official User"

    const result = await updateRolePin(
      user?.id || "USR-CURRENT",
      role,
      currentPin,
      newPin,
      updatedBy,
      userName
    )

    setIsSubmitting(false)

    if (!result.success) {
      setErrorMessage(result.message || "Failed to update Access PIN.")
      return
    }

    toast.success(`Access PIN updated successfully for ${roleTitle}!`, {
      description: `Security credentials for ${roleTitle} have been securely hashed and recorded in audit trail.`,
    })

    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md bg-white border border-[#E2E8F0] shadow-xl rounded-2xl p-0 overflow-hidden font-sans">
        {/* Header */}
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#0F172A] text-white shadow-2xs">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-[#0F172A]">
                Update Role Access PIN
              </DialogTitle>
              <p className="text-xs text-[#64748B] mt-0.5">
                Target Role: <strong className="text-[#0F172A] font-semibold">{roleTitle}</strong> ({roleMeta.accessLevel})
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

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-in fade-in-50">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Current PIN */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F172A] flex items-center justify-between">
              <span>Current Access PIN</span>
              <span className="text-[10px] text-[#64748B] font-normal">Required for verification</span>
            </label>
            <div className="relative">
              <Input
                type={showCurrentPin ? "text" : "password"}
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value)}
                placeholder="Enter current 6-digit PIN"
                className="h-10 text-xs rounded-xl pr-10 font-mono tracking-wider border-[#CBD5E1] focus-visible:ring-1 focus-visible:ring-[#0F172A]"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPin(!showCurrentPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
              >
                {showCurrentPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* New PIN */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F172A]">New Access PIN</label>
            <div className="relative">
              <Input
                type={showNewPin ? "text" : "password"}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Enter new 6-digit PIN"
                className="h-10 text-xs rounded-xl pr-10 font-mono tracking-wider border-[#CBD5E1] focus-visible:ring-1 focus-visible:ring-[#0F172A]"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPin(!showNewPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
              >
                {showNewPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm PIN */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F172A]">Confirm New Access PIN</label>
            <div className="relative">
              <Input
                type={showConfirmPin ? "text" : "password"}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                placeholder="Re-enter new 6-digit PIN"
                className="h-10 text-xs rounded-xl pr-10 font-mono tracking-wider border-[#CBD5E1] focus-visible:ring-1 focus-visible:ring-[#0F172A]"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPin(!showConfirmPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
              >
                {showConfirmPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Strength Indicator Meter */}
          {newPin.length > 0 && (
            <div className="space-y-1.5 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-[#475569]">PIN Strength:</span>
                <span
                  className={`font-bold text-[11px] ${
                    strength.label === "Strong"
                      ? "text-emerald-600"
                      : strength.label === "Medium"
                      ? "text-amber-600"
                      : "text-rose-600"
                  }`}
                >
                  {strength.label}
                </span>
              </div>

              <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strength.color}`}
                  style={{ width: `${strength.percentage}%` }}
                />
              </div>

              {strength.issues.length > 0 && (
                <ul className="text-[10px] text-[#64748B] space-y-0.5 pt-1">
                  {strength.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-center gap-1 text-rose-600 font-medium">
                      <span className="h-1 w-1 rounded-full bg-rose-500 shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Notice */}
          <div className="text-[10.5px] text-[#64748B] bg-slate-50 p-2.5 rounded-lg border border-[#E2E8F0] flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#0F172A] shrink-0" />
            <span>PINs are encrypted using SHA-256 and stored in the KSP Security Ledger.</span>
          </div>

          {/* Footer Actions */}
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
              disabled={isSubmitting}
              className="h-9 px-5 text-xs font-bold bg-[#0F172A] hover:bg-black text-white rounded-xl shadow-2xs cursor-pointer"
            >
              {isSubmitting ? (
                <span>Saving PIN...</span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Save Access PIN
                </span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
