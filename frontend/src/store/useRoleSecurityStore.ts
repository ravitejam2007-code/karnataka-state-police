import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Role } from "@/store/useAuthStore"

export interface AuditLogEntry {
  id: string
  userName: string
  roleName: string
  action: string
  dateTime: string
  updatedBy: string
}

export interface RolePinMeta {
  role: Role
  displayName: string
  description: string
  accessLevel: string
  status: "Active" | "Assigned"
  pinHash: string
  plainPinSample?: string
  lastUpdated: string
  strength: "Strong" | "Medium" | "Weak"
}

interface RoleSecurityState {
  rolesMap: Record<Role, RolePinMeta>
  auditLogs: AuditLogEntry[]
  verifyPin: (role: Role, enteredPin: string) => Promise<boolean>
  updateRolePin: (
    userId: string,
    role: Role,
    currentPin: string,
    newPin: string,
    updatedBy: string,
    userName: string
  ) => Promise<{ success: boolean; message?: string }>
  addAuditLog: (entry: Omit<AuditLogEntry, "id">) => void
  getRoleMeta: (role: Role) => RolePinMeta
}

export async function hashPin(pin: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(pin)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export function calculatePinStrength(pin: string): {
  label: "Strong" | "Medium" | "Weak"
  percentage: number
  color: string
  issues: string[]
} {
  const issues: string[] = []
  if (!pin) {
    return { label: "Weak", percentage: 0, color: "bg-[#EF4444]", issues: ["PIN cannot be empty"] }
  }

  if (pin.length < 6) {
    issues.push("Minimum 6 digits required")
  }

  if (!/^\d+$/.test(pin)) {
    issues.push("Must contain numbers only")
  }

  // Check sequential (123456) or repeating (111111)
  const isSequential = "0123456789".includes(pin) || "9876543210".includes(pin)
  const isRepeating = /^(\d)\1+$/.test(pin)

  if (isSequential) {
    issues.push("Avoid sequential numbers (e.g. 123456)")
  }
  if (isRepeating) {
    issues.push("Avoid repeating digits (e.g. 111111)")
  }

  if (issues.length >= 2 || pin.length < 6) {
    return { label: "Weak", percentage: 33, color: "bg-rose-500", issues }
  }

  if (issues.length === 1 || isSequential || isRepeating) {
    return { label: "Medium", percentage: 66, color: "bg-amber-500", issues }
  }

  return { label: "Strong", percentage: 100, color: "bg-emerald-500", issues: [] }
}

const DEFAULT_ROLES_MAP: Record<Role, RolePinMeta> = {
  Supervisor: {
    role: "Supervisor",
    displayName: "Station Supervisor",
    description: "Operational oversight, clearance approvals, shift assignments, and station performance.",
    accessLevel: "Level 5 - Command Control",
    status: "Active",
    pinHash: "f58d2039c362bf784bc282672bfdbefea7bececa9d4c7b8db3bb0ecb40b10636", // 554433
    plainPinSample: "554433",
    lastUpdated: "15 Jul 2026",
    strength: "Strong",
  },
  "Senior Officers": {
    role: "Senior Officers",
    displayName: "Senior Officer / Command",
    description: "Departmental command, strategic directive approval, zonal oversight, and case escalations.",
    accessLevel: "Level 4 - Zonal Command",
    status: "Active",
    pinHash: "e13d42a9b311edcd5a7705187740e53a25cb3fa723f5b7222485fa7848ca9fa1", // 443322
    plainPinSample: "443322",
    lastUpdated: "10 Jul 2026",
    strength: "Medium",
  },
  Investigator: {
    role: "Investigator",
    displayName: "Investigation Officer",
    description: "Primary case management, evidence locker, timeline synthesis, and suspect link analysis.",
    accessLevel: "Level 3 - Tactical Inv.",
    status: "Active",
    pinHash: "c273f3ec0bdf44bbce85d8efd23dfc7b049b14c330f878a87b5a8d9a4aa508cf", // 332211
    plainPinSample: "332211",
    lastUpdated: "08 Jul 2026",
    strength: "Strong",
  },
  Analyst: {
    role: "Analyst",
    displayName: "Crime Analyst",
    description: "Predictive crime heatmaps, behavioral modeling, temporal trends, and AI forecasting.",
    accessLevel: "Level 3 - Data Analytics",
    status: "Active",
    pinHash: "b109f67459280d0d8fbef997c6d66e74eb1711202e21e905d41f3914a1e956e1", // 221100
    plainPinSample: "221100",
    lastUpdated: "05 Jul 2026",
    strength: "Strong",
  },
  "Police Officer": {
    role: "Police Officer",
    displayName: "Police Officer",
    description: "Field operations, incident dispatch logs, patrol telemetry, and daily FIR logging.",
    accessLevel: "Level 2 - Field Ops",
    status: "Active",
    pinHash: "60fe74406e7f353ed99a096730061b226ecb786d6e6c43555f891b058a9e04fc", // 112233
    plainPinSample: "112233",
    lastUpdated: "01 Jul 2026",
    strength: "Strong",
  },
  "Sub-Ordinates": {
    role: "Sub-Ordinates",
    displayName: "Subordinate Officer",
    description: "Ground-level field reporting, beat patrol logs, and preliminary verification entries.",
    accessLevel: "Level 1 - Field Support",
    status: "Active",
    pinHash: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", // 123456
    plainPinSample: "123456",
    lastUpdated: "20 Jun 2026",
    strength: "Medium",
  },
  Administrator: {
    role: "Administrator",
    displayName: "System Administrator",
    description: "Full system administration, RBAC permissions, audit logs, and security controls.",
    accessLevel: "Level 5 - Super Admin",
    status: "Active",
    pinHash: "8b1009fa2f33c3be99281a8b1a8d052d92946c1a89c9bc1ff4268e0d9bf88d5e", // 982401
    plainPinSample: "982401",
    lastUpdated: "18 Jul 2026",
    strength: "Strong",
  },
  "Policy Maker": {
    role: "Policy Maker",
    displayName: "Policy Maker / HQ",
    description: "High-level strategic intelligence briefs, zone assessment reports, and resource allocation.",
    accessLevel: "Level 4 - Strategic HQ",
    status: "Active",
    pinHash: "898ad9b92209d738ff9eb79f41b3dfa06f3ed842f1f0e2634e2c2f6d0f81d113", // 998877
    plainPinSample: "998877",
    lastUpdated: "12 Jul 2026",
    strength: "Strong",
  },
  Citizen: {
    role: "Citizen",
    displayName: "Citizen Public Portal",
    description: "Public grievance portal, online FIR status lookup, and lost & found verification.",
    accessLevel: "Level 0 - Public Portal",
    status: "Active",
    pinHash: "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9", // 000000
    plainPinSample: "000000",
    lastUpdated: "01 Jun 2026",
    strength: "Weak",
  },
}

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "LOG-9001",
    userName: "Raviteja Manjunath",
    roleName: "Station Supervisor",
    action: "Access PIN Verified",
    dateTime: "26 Jul 2026, 14:15 IST",
    updatedBy: "Raviteja Manjunath (Administrator)",
  },
  {
    id: "LOG-9002",
    userName: "Insp. R. Kumar",
    roleName: "Senior Officer / Command",
    action: "Access PIN Updated",
    dateTime: "10 Jul 2026, 10:30 IST",
    updatedBy: "Insp. R. Kumar (Senior Officers)",
  },
  {
    id: "LOG-9003",
    userName: "Ananya Sharma",
    roleName: "Crime Analyst",
    action: "Access PIN Updated",
    dateTime: "05 Jul 2026, 16:45 IST",
    updatedBy: "Raviteja Manjunath (Administrator)",
  },
]

export const useRoleSecurityStore = create<RoleSecurityState>()(
  persist(
    (set, get) => ({
      rolesMap: DEFAULT_ROLES_MAP,
      auditLogs: INITIAL_AUDIT_LOGS,

      verifyPin: async (role, enteredPin) => {
        const roleData = get().rolesMap[role] || DEFAULT_ROLES_MAP[role]
        if (!roleData) return false

        const enteredHash = await hashPin(enteredPin.trim())
        return enteredHash === roleData.pinHash || enteredPin.trim() === roleData.plainPinSample
      },

      updateRolePin: async (_userId, role, currentPin, newPin, updatedBy, userName) => {
        const isCurrentValid = await get().verifyPin(role, currentPin)
        if (!isCurrentValid) {
          return { success: false, message: "Invalid current Access PIN. Verification failed." }
        }

        if (newPin.trim().length < 6) {
          return { success: false, message: "New PIN must be at least 6 digits." }
        }

        const newHash = await hashPin(newPin.trim())
        const strengthData = calculatePinStrength(newPin.trim())
        const todayStr = new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })

        const nowFormatted =
          new Date().toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }) + " IST"

        set((state) => {
          const currentMeta = state.rolesMap[role] || DEFAULT_ROLES_MAP[role]
          const updatedMeta: RolePinMeta = {
            ...currentMeta,
            pinHash: newHash,
            plainPinSample: newPin.trim(),
            lastUpdated: todayStr,
            strength: strengthData.label,
          }

          const newLog: AuditLogEntry = {
            id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
            userName: userName,
            roleName: currentMeta?.displayName || role,
            action: "Access PIN Updated",
            dateTime: nowFormatted,
            updatedBy: updatedBy,
          }

          return {
            rolesMap: {
              ...state.rolesMap,
              [role]: updatedMeta,
            },
            auditLogs: [newLog, ...state.auditLogs],
          }
        })

        return { success: true }
      },

      addAuditLog: (entry) => {
        set((state) => ({
          auditLogs: [
            {
              id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
              ...entry,
            },
            ...state.auditLogs,
          ],
        }))
      },

      getRoleMeta: (role) => {
        return (
          get().rolesMap[role] ||
          DEFAULT_ROLES_MAP[role] || {
            role,
            displayName: role,
            description: "Assigned role access module.",
            accessLevel: "Level 2 - General Ops",
            status: "Active",
            pinHash: "",
            plainPinSample: "123456",
            lastUpdated: "26 Jul 2026",
            strength: "Strong",
          }
        )
      },
    }),
    {
      name: "ksp-role-pin-storage",
    }
  )
)
