import { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { 
  ShieldCheck, LogOut, CheckCircle2, UserCheck, 
  Shield, Radio, FileSearch, LineChart, Building2, User
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import { useAuthStore, type Role } from "@/store/useAuthStore"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface RoleMeta {
  role: Role
  title: string
  description: string
  icon: any
  color: string
}

const ROLE_METADATA: Record<Role, Omit<RoleMeta, "role">> = {
  Administrator: {
    title: "System Administrator",
    description: "Full system administration, RBAC permissions, audit logs, and security controls.",
    icon: ShieldCheck,
    color: "border-purple-200 bg-purple-50/50 text-purple-700 hover:border-purple-500",
  },
  "Senior Officers": {
    title: "Senior Officer / Command",
    description: "Departmental command, strategic directive approval, zonal oversight, and case escalations.",
    icon: UserCheck,
    color: "border-blue-200 bg-blue-50/50 text-blue-800 hover:border-blue-500",
  },
  "Police Officer": {
    title: "Police Officer",
    description: "Field operations, incident dispatch logs, patrol telemetry, and daily FIR logging.",
    icon: Shield,
    color: "border-blue-200 bg-blue-50/50 text-blue-700 hover:border-blue-500",
  },
  Investigator: {
    title: "Investigation Officer",
    description: "Primary case management, evidence locker, timeline synthesis, and suspect link analysis.",
    icon: FileSearch,
    color: "border-amber-200 bg-amber-50/50 text-amber-800 hover:border-amber-500",
  },
  Analyst: {
    title: "Crime Analyst",
    description: "Predictive crime heatmaps, behavioral modeling, temporal trends, and AI forecasting.",
    icon: LineChart,
    color: "border-emerald-200 bg-emerald-50/50 text-emerald-700 hover:border-emerald-500",
  },
  Supervisor: {
    title: "Station Supervisor",
    description: "Operational oversight, clearance approvals, shift assignments, and station performance.",
    icon: Building2,
    color: "border-indigo-200 bg-indigo-50/50 text-indigo-700 hover:border-indigo-500",
  },
  "Policy Maker": {
    title: "Policy Maker / HQ",
    description: "High-level strategic intelligence briefs, zone assessment reports, and resource allocation.",
    icon: Radio,
    color: "border-slate-200 bg-slate-50/50 text-slate-800 hover:border-slate-500",
  },
  "Sub-Ordinates": {
    title: "Subordinate Officer",
    description: "Ground-level field reporting, beat patrol logs, and preliminary verification entries.",
    icon: User,
    color: "border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-500",
  },
  Citizen: {
    title: "Citizen Public Portal",
    description: "Public grievance portal, online FIR status lookup, and lost & found verification.",
    icon: User,
    color: "border-sky-200 bg-sky-50/50 text-sky-700 hover:border-sky-500",
  },
}

export function RoleSelection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated, user, setActiveRole, logout } = useAuthStore()

  const rawRoles: Role[] = user?.assignedRoles || (user?.role ? [user.role] : ["Citizen"])
  const assignedRoles: Role[] = Array.from(new Set(rawRoles))
  const [selectedRole, setSelectedRole] = useState<Role>(user?.role || assignedRoles[0])

  // Guard: If not authenticated, return to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />
  }

  const handleActivateRole = (roleToActivate: Role) => {
    setActiveRole(roleToActivate)
    toast.success(`Active session role set to: ${roleToActivate}`, {
      description: "RBAC permissions and navigation updated for current session."
    })
    navigate("/app/dashboard")
  }

  return (
    <Card className="w-full shadow-md border-t-4 border-t-[#0F172A] border-[#E2E8F0] bg-white font-sans max-w-md mx-auto rounded-xl">
      <CardHeader className="space-y-0.5 text-center px-4 sm:px-6 pb-2 pt-3 border-b border-[#F1F5F9]">
        <div className="mx-auto bg-[#0F172A]/10 w-10 h-10 rounded-full flex items-center justify-center mb-1">
          <UserCheck className="h-5 w-5 text-[#0F172A]" />
        </div>
        <CardTitle className="text-base sm:text-lg font-bold tracking-tight text-[#0F172A]">
          Select Active Session Role
        </CardTitle>
        <CardDescription className="text-[11px] text-[#475569]">
          Welcome, <span className="font-semibold text-[#0F172A]">{user.name}</span> ({user.department}). Choose session role.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-6 py-3 space-y-2.5">
        <div className="text-[10px] font-bold text-[#475569] uppercase tracking-wider flex items-center justify-between">
          <span>Assigned Account Roles ({assignedRoles.length})</span>
          <span className="font-mono text-[10px] text-[#64748B]">ID: {user.badgeId}</span>
        </div>

        {/* Vertical List Form Layout */}
        <div className="flex flex-col space-y-2 max-h-[300px] overflow-y-auto pr-0.5">
          {assignedRoles.map((roleKey) => {
            const meta = ROLE_METADATA[roleKey] || {
              title: roleKey,
              description: "Assigned platform access role.",
              icon: Shield,
              color: "border-[#E2E8F0] bg-white text-[#0F172A] hover:border-slate-400",
            }
            const Icon = meta.icon
            const isSelected = selectedRole === roleKey

            return (
              <div
                key={roleKey}
                onClick={() => setSelectedRole(roleKey)}
                className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isSelected 
                    ? "border-[#0F172A] bg-[#0F172A]/5 ring-1 ring-[#0F172A]/20 shadow-2xs" 
                    : "border-[#E2E8F0] bg-white hover:border-slate-300 hover:bg-slate-50/60"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`p-2 rounded-md shrink-0 transition-colors ${
                    isSelected ? "bg-[#0F172A] text-white" : "bg-slate-100 text-[#475569]"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-[#0F172A] truncate">{meta.title}</h4>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 font-semibold text-[#64748B]">
                        {roleKey}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-[#64748B] leading-tight line-clamp-1 mt-0.5">
                      {meta.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-center">
                  {isSelected ? (
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#0F172A]" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-slate-300 bg-white" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 border-t border-[#E2E8F0] py-2.5 px-4 sm:px-6 bg-[#F8FAFC] rounded-b-xl text-xs">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => logout()} 
          className="text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 h-8 px-2.5 text-[11px] font-medium"
        >
          <LogOut className="mr-1.5 h-3.5 w-3.5" />
          {t("auth.cancelLogout", { defaultValue: "Sign Out" })}
        </Button>

        <Button 
          onClick={() => handleActivateRole(selectedRole)}
          className="h-8.5 px-4 font-bold text-xs bg-[#0F172A] text-white hover:bg-[#1E293B] rounded-md shadow-2xs cursor-pointer"
        >
          <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
          Activate Role
        </Button>
      </CardFooter>
    </Card>
  )
}


