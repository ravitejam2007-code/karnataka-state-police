import { useState, useEffect } from "react"
import { 
  ShieldCheck, Shield, KeyRound, Eye, EyeOff, 
  History, CheckCircle2, UserCheck, FileSearch, LineChart, 
  Building2, Radio, User, RefreshCw, Lock, X 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore, type Role } from "@/store/useAuthStore"
import { useRoleSecurityStore } from "@/store/useRoleSecurityStore"
import { UpdateRolePinModal } from "./components/UpdateRolePinModal"
import { VerifyRolePinModal } from "./components/VerifyRolePinModal"
import { RevealPinAuthModal } from "./components/RevealPinAuthModal"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

interface RoleMetaDisplay {
  title: string
  icon: any
  badgeColor: string
}

const ROLE_DISPLAY_MAP: Record<Role, RoleMetaDisplay> = {
  Administrator: {
    title: "System Administrator",
    icon: ShieldCheck,
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  "Senior Officers": {
    title: "Senior Officer / Command",
    icon: UserCheck,
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
  },
  Supervisor: {
    title: "Station Supervisor",
    icon: Building2,
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  Investigator: {
    title: "Investigation Officer",
    icon: FileSearch,
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  Analyst: {
    title: "Crime Analyst",
    icon: LineChart,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  "Police Officer": {
    title: "Police Officer",
    icon: Shield,
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
  },
  "Policy Maker": {
    title: "Policy Maker / HQ",
    icon: Radio,
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
  },
  "Sub-Ordinates": {
    title: "Subordinate Officer",
    icon: User,
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
  },
  Citizen: {
    title: "Citizen Public Portal",
    icon: User,
    badgeColor: "bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]",
  },
}

export function RoleSecurityManagement() {
  const { user } = useAuthStore()
  const { auditLogs, getRoleMeta } = useRoleSecurityStore()

  const [selectedRoleForUpdate, setSelectedRoleForUpdate] = useState<{ role: Role; title: string } | null>(null)
  const [selectedRoleForVerify, setSelectedRoleForVerify] = useState<{ role: Role; title: string } | null>(null)
  const [selectedRoleForUnmask, setSelectedRoleForUnmask] = useState<{ role: Role; title: string } | null>(null)
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false)
  const [revealedPins, setRevealedPins] = useState<Record<string, boolean>>({})
  const [unmaskCountdowns, setUnmaskCountdowns] = useState<Record<string, number>>({})

  // Determine roles assigned to current logged-in user
  const userAssignedRoles: Role[] = user?.assignedRoles && user.assignedRoles.length > 0
    ? Array.from(new Set(user.assignedRoles))
    : [
        "Supervisor",
        "Senior Officers",
        "Investigator",
        "Analyst",
        "Police Officer",
        "Sub-Ordinates",
      ]

  // Auto-hide countdown timer interval hook
  useEffect(() => {
    const activeKeys = Object.keys(unmaskCountdowns).filter((k) => unmaskCountdowns[k] > 0)
    if (activeKeys.length === 0) return

    const timer = setInterval(() => {
      setUnmaskCountdowns((prev) => {
        const next = { ...prev }
        let changed = false
        Object.keys(next).forEach((key) => {
          if (next[key] > 1) {
            next[key] -= 1
            changed = true
          } else if (next[key] === 1) {
            delete next[key]
            setRevealedPins((rPrev) => ({ ...rPrev, [key]: false }))
            changed = true
          }
        })
        return changed ? next : prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [unmaskCountdowns])

  const handleEyeClick = (roleKey: Role, roleTitle: string) => {
    // If currently revealed, hide immediately
    if (revealedPins[roleKey]) {
      setRevealedPins((prev) => ({ ...prev, [roleKey]: false }))
      setUnmaskCountdowns((prev) => {
        const copy = { ...prev }
        delete copy[roleKey]
        return copy
      })
      toast.info(`Passcode for ${roleTitle} is now masked.`)
      return
    }

    // Require PIN Authentication to reveal
    setSelectedRoleForUnmask({ role: roleKey, title: roleTitle })
  }

  const handleUnmaskSuccess = (roleKey: Role) => {
    setRevealedPins((prev) => ({ ...prev, [roleKey]: true }))
    setUnmaskCountdowns((prev) => ({ ...prev, [roleKey]: 45 }))
    setSelectedRoleForUnmask(null)
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Audit Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-[#0F172A]" />
            <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Role Access Security Management
            </h2>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Configure independent 6-digit Role Access PINs, view security metrics, and manage session verification for assigned security tiers.
          </p>
        </div>

        <Button
          onClick={() => setIsAuditModalOpen(true)}
          variant="outline"
          size="sm"
          className="h-9 px-3.5 text-xs font-semibold rounded-xl border-[#CBD5E1] bg-white hover:bg-slate-50 text-[#0F172A] shadow-2xs cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <History className="h-4 w-4 mr-2 text-[#0F172A]" />
          Audit Trail ({auditLogs.length})
        </Button>
      </div>

      {/* Role Cards List / Grid */}
      <div className="space-y-4">
        {userAssignedRoles.map((roleKey) => {
          const meta = getRoleMeta(roleKey)
          const displayInfo = ROLE_DISPLAY_MAP[roleKey] || {
            title: roleKey,
            icon: Shield,
            badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
          }
          const Icon = displayInfo.icon
          const isRevealed = !!revealedPins[roleKey]
          const plainPin = meta.plainPinSample || "123456"
          const countdown = unmaskCountdowns[roleKey]

          return (
            <Card
              key={roleKey}
              className="rounded-2xl border border-[#E2E8F0] shadow-2xs bg-white hover:shadow-xs transition-all duration-200 overflow-hidden"
            >
              <CardContent className="p-5 sm:p-6 space-y-4">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#0F172A] text-white shadow-2xs shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-[#0F172A] tracking-tight">
                          {displayInfo.title}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${displayInfo.badgeColor}`}
                        >
                          {roleKey}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        {meta.description}
                      </p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Status Badge */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      Status: {meta.status}
                    </span>

                    {/* Access Level Badge */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-[#0F172A] border border-[#CBD5E1]">
                      <Lock className="h-3 w-3 text-[#64748B]" />
                      {meta.accessLevel}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-1 text-xs">
                  {/* Masked PIN Display with Auth Requirement & Timer */}
                  <div className="space-y-1 bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-semibold text-[#64748B] block uppercase tracking-wider">
                        Role Access PIN
                      </span>
                      {isRevealed && countdown && (
                        <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                          Hiding in {countdown}s
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-bold text-sm tracking-widest text-[#0F172A]">
                        {isRevealed ? plainPin : "••••••••"}
                      </span>
                      <button
                        onClick={() => handleEyeClick(roleKey, displayInfo.title)}
                        className="text-[#64748B] hover:text-[#0F172A] p-1 rounded hover:bg-slate-200/50 transition-colors cursor-pointer"
                        title={isRevealed ? "Hide PIN" : "Authenticate to view PIN"}
                      >
                        {isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Password/PIN Strength */}
                  <div className="space-y-1 bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                    <span className="text-[10.5px] font-semibold text-[#64748B] block uppercase tracking-wider">
                      PIN Strength
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                          meta.strength === "Strong"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : meta.strength === "Medium"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {meta.strength}
                      </span>
                      <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            meta.strength === "Strong"
                              ? "bg-emerald-500 w-full"
                              : meta.strength === "Medium"
                              ? "bg-amber-500 w-2/3"
                              : "bg-rose-500 w-1/3"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Last Updated Date */}
                  <div className="space-y-1 bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                    <span className="text-[10.5px] font-semibold text-[#64748B] block uppercase tracking-wider">
                      Last Password Updated
                    </span>
                    <span className="font-semibold text-xs text-[#0F172A] block pt-0.5">
                      {meta.lastUpdated}
                    </span>
                  </div>

                  {/* Encryption Standard */}
                  <div className="space-y-1 bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                    <span className="text-[10.5px] font-semibold text-[#64748B] block uppercase tracking-wider">
                      Encryption Security
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-700 flex items-center gap-1 pt-0.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      SHA-256 Hashed
                    </span>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F1F5F9]">
                  <div className="text-[11px] text-[#64748B] flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Independent authentication credentials for {displayInfo.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedRoleForVerify({
                          role: roleKey,
                          title: displayInfo.title,
                        })
                      }
                      className="h-8.5 px-3 text-xs font-semibold rounded-xl border-[#CBD5E1] bg-white text-[#0F172A] hover:bg-slate-50 cursor-pointer"
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1.5 text-[#64748B]" />
                      Verify Access
                    </Button>

                    <Button
                      size="sm"
                      onClick={() =>
                        setSelectedRoleForUpdate({
                          role: roleKey,
                          title: displayInfo.title,
                        })
                      }
                      className="h-8.5 px-4 text-xs font-bold bg-[#0F172A] hover:bg-black text-white rounded-xl shadow-2xs cursor-pointer"
                    >
                      <KeyRound className="h-3.5 w-3.5 mr-1.5" />
                      Change Access PIN
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Modal: Reveal PIN Security Authentication */}
      {selectedRoleForUnmask && (
        <RevealPinAuthModal
          isOpen={!!selectedRoleForUnmask}
          onClose={() => setSelectedRoleForUnmask(null)}
          role={selectedRoleForUnmask.role}
          roleTitle={selectedRoleForUnmask.title}
          onSuccess={() => handleUnmaskSuccess(selectedRoleForUnmask.role)}
        />
      )}

      {/* Modal: Update Role PIN */}
      {selectedRoleForUpdate && (
        <UpdateRolePinModal
          isOpen={!!selectedRoleForUpdate}
          onClose={() => setSelectedRoleForUpdate(null)}
          role={selectedRoleForUpdate.role}
          roleTitle={selectedRoleForUpdate.title}
        />
      )}

      {/* Modal: Verify Role PIN */}
      {selectedRoleForVerify && (
        <VerifyRolePinModal
          isOpen={!!selectedRoleForVerify}
          onClose={() => setSelectedRoleForVerify(null)}
          role={selectedRoleForVerify.role}
          roleTitle={selectedRoleForVerify.title}
          onSuccess={() => {
            toast.success(`PIN verified for ${selectedRoleForVerify.title}! Access authorized.`)
            setSelectedRoleForVerify(null)
          }}
        />
      )}

      {/* Audit Log Modal / Drawer */}
      <Dialog open={isAuditModalOpen} onOpenChange={setIsAuditModalOpen}>
        <DialogContent className="sm:max-w-2xl bg-white border border-[#E2E8F0] shadow-xl rounded-2xl p-0 overflow-hidden font-sans">
          <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] p-5 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#0F172A] text-white shadow-2xs">
                <History className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold text-[#0F172A]">
                  Role Access Security Audit Trail
                </DialogTitle>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Complete event log for role-specific PIN changes and authorization verifications.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAuditModalOpen(false)}
              className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-5 max-h-[420px] overflow-y-auto space-y-3">
            <div className="border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">User</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Action</th>
                    <th className="py-2.5 px-3">Date & Time</th>
                    <th className="py-2.5 px-3">Updated By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] bg-white">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-[#0F172A]">{log.userName}</td>
                      <td className="py-2.5 px-3 font-medium text-[#475569]">{log.roleName}</td>
                      <td className="py-2.5 px-3">
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-[#64748B]">
                        {log.dateTime}
                      </td>
                      <td className="py-2.5 px-3 text-[#475569]">{log.updatedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] p-3 px-5 flex justify-end">
            <Button
              onClick={() => setIsAuditModalOpen(false)}
              className="h-8.5 px-4 text-xs font-semibold bg-[#0F172A] hover:bg-black text-white rounded-xl cursor-pointer"
            >
              Close Trail
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
