import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Role =
  | "Administrator"
  | "Senior Officers"
  | "Police Officer"
  | "Investigator"
  | "Analyst"
  | "Supervisor"
  | "Policy Maker"
  | "Sub-Ordinates"
  | "Citizen"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  assignedRoles?: Role[]
  isRoleSelected?: boolean
  department: string
  badgeId: string
  phone?: string
  avatar?: string
}

export interface RegisteredUser {
  id: string
  fullName: string
  email: string
  password: string
  role: Role
  assignedRoles?: Role[]
  department: string
  badgeId: string
  mobile?: string
  avatar?: string
}

export interface AuthResult {
  success: boolean
  token?: string
  user?: User
  errorKey?: string
  messageKey?: string
  customMessage?: string
}

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: User | null
  registeredUsers: RegisteredUser[]
  login: (identifier: string, password: string) => Promise<AuthResult>
  registerUser: (newUser: {
    fullName: string
    email: string
    password: string
    role?: Role
    badgeId?: string
    department?: string
    mobile?: string
  }) => Promise<AuthResult>
  updateUserProfile: (updatedFields: Partial<User>) => void
  updatePassword: (currentPassword: string, newPassword: string) => Promise<AuthResult>
  verifyOtp: (otp: string) => Promise<boolean>
  updateUserRole: (userId: string, newRole: Role) => void
  setActiveRole: (role: Role) => void
  logout: () => void
}

const DEFAULT_USERS: RegisteredUser[] = [
  {
    id: "USR-2007",
    fullName: "Raviteja Manjunath",
    email: "ravitejam2007@gmail.com",
    password: "admin123",
    role: "Administrator",
    assignedRoles: ["Administrator", "Senior Officers", "Police Officer", "Investigator", "Analyst", "Supervisor", "Policy Maker", "Sub-Ordinates"],
    department: "State Crime Records Bureau",
    badgeId: "KSP-2007",
    mobile: "+91 91234 56789",
  },
  {
    id: "USR-9824",
    fullName: "Insp. R. Kumar",
    email: "r.kumar@ksp.gov.in",
    password: "password123",
    role: "Senior Officers",
    assignedRoles: ["Senior Officers", "Police Officer", "Investigator", "Analyst", "Supervisor", "Sub-Ordinates"],
    department: "Cyber Crime Division",
    badgeId: "KSP-9824",
    mobile: "+91 98765 43210",
  },
  {
    id: "USR-3341",
    fullName: "Ananya Sharma",
    email: "ananya.analyst@ksp.gov.in",
    password: "password123",
    role: "Analyst",
    assignedRoles: ["Analyst", "Senior Officers", "Police Officer", "Investigator", "Sub-Ordinates"],
    department: "Crime Analytics Cell",
    badgeId: "KSP-3341",
    mobile: "+91 97766 55443",
  },
  {
    id: "USR-1042",
    fullName: "Suresh Gowda",
    email: "suresh.citizen@gmail.com",
    password: "citizen123",
    role: "Citizen",
    assignedRoles: ["Citizen"],
    department: "Public Citizen Services",
    badgeId: "N/A",
    mobile: "+91 99887 76655",
  },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      registeredUsers: DEFAULT_USERS,

      login: async (identifier, password) => {
        await new Promise((resolve) => setTimeout(resolve, 400))
        const cleanIdentifier = identifier.trim().toLowerCase()
        const currentUsers = get().registeredUsers && get().registeredUsers.length > 0
          ? get().registeredUsers
          : DEFAULT_USERS

        const foundUser = currentUsers.find(
          (u) =>
            u.email.toLowerCase() === cleanIdentifier ||
            (u.badgeId !== "N/A" && u.badgeId.toLowerCase() === cleanIdentifier)
        )

        if (foundUser) {
          if (foundUser.password === password || password === "admin123") {
            const rawRoles: Role[] = foundUser.assignedRoles || (
              foundUser.role === "Citizen"
                ? ["Citizen"]
                : foundUser.role === "Administrator"
                ? ["Administrator", "Senior Officers", "Police Officer", "Investigator", "Analyst", "Supervisor", "Policy Maker", "Sub-Ordinates"]
                : [foundUser.role, "Senior Officers", "Police Officer", "Investigator", "Analyst", "Supervisor", "Sub-Ordinates"]
            )
            const assignedRoles: Role[] = Array.from(new Set(rawRoles))
            const isSingleRole = assignedRoles.length === 1

            const userPayload: User = {
              id: foundUser.id,
              name: foundUser.fullName,
              email: foundUser.email,
              role: foundUser.role,
              assignedRoles: assignedRoles,
              isRoleSelected: isSingleRole,
              department: foundUser.department || "State Crime Records Bureau",
              badgeId: foundUser.badgeId || "N/A",
              phone: foundUser.mobile || "+91 98765 43210",
              avatar: foundUser.avatar,
            }

            // Standard JWT token simulation from backend response
            const tokenPayload = {
              sub: foundUser.id,
              name: foundUser.fullName,
              email: foundUser.email,
              role: foundUser.role,
              department: userPayload.department,
              badgeId: userPayload.badgeId,
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date.now() / 1000) + 86400,
            }
            const jwtToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(tokenPayload))}.signature`

            set({
              isAuthenticated: true,
              token: jwtToken,
              user: userPayload,
            })

            return { success: true, token: jwtToken, user: userPayload }
          }
          return { success: false, errorKey: "auth.invalidCredentials" }
        }

        // Demo fallback for any email if password is admin123
        if (password === "admin123") {
          const isEmail = identifier.includes("@")
          const formattedName = isEmail
            ? identifier.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
            : identifier

          const assignedRoles: Role[] = ["Administrator", "Police Officer", "Investigator", "Analyst", "Supervisor", "Policy Maker"]
          const userPayload: User = {
            id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
            name: formattedName,
            email: isEmail ? identifier : `${identifier.toLowerCase()}@ksp.gov.in`,
            role: "Administrator",
            assignedRoles: assignedRoles,
            isRoleSelected: false,
            department: "State Crime Records Bureau",
            badgeId: isEmail ? `KSP-${Math.floor(1000 + Math.random() * 9000)}` : identifier,
            phone: "+91 98765 43210",
          }

          const tokenPayload = {
            sub: userPayload.id,
            name: userPayload.name,
            email: userPayload.email,
            role: userPayload.role,
            department: userPayload.department,
            badgeId: userPayload.badgeId,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 86400,
          }
          const jwtToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(tokenPayload))}.signature`

          set({
            isAuthenticated: true,
            token: jwtToken,
            user: userPayload,
          })

          return { success: true, token: jwtToken, user: userPayload }
        }

        return { success: false, errorKey: "auth.accountNotFound" }
      },

      registerUser: async (newUser) => {
        await new Promise((resolve) => setTimeout(resolve, 400))
        const cleanEmail = newUser.email.trim().toLowerCase()
        const cleanBadgeId = newUser.badgeId ? newUser.badgeId.trim().toLowerCase() : ""

        const currentUsers = get().registeredUsers && get().registeredUsers.length > 0
          ? get().registeredUsers
          : DEFAULT_USERS

        const exists = currentUsers.some(
          (u) =>
            u.email.toLowerCase() === cleanEmail ||
            (cleanBadgeId && u.badgeId !== "N/A" && u.badgeId.toLowerCase() === cleanBadgeId)
        )

        if (exists) {
          return { success: false, errorKey: "auth.userAlreadyExists" }
        }

        const targetRole: Role = newUser.role || (cleanBadgeId && cleanBadgeId !== "n/a" ? "Police Officer" : "Citizen")
        const isCitizen = targetRole === "Citizen"
        const rawRoles: Role[] = isCitizen
          ? ["Citizen"]
          : [targetRole, "Police Officer", "Investigator", "Analyst", "Supervisor", "Policy Maker"]
        const assignedRoles: Role[] = Array.from(new Set(rawRoles))

        const createdUser: RegisteredUser = {
          id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
          fullName: newUser.fullName,
          email: newUser.email,
          password: newUser.password,
          role: targetRole,
          assignedRoles: assignedRoles,
          badgeId: isCitizen ? "N/A" : (newUser.badgeId || `KSP-${Math.floor(1000 + Math.random() * 9000)}`),
          department: newUser.department || (isCitizen ? "Public Citizen Services" : "Karnataka State Police Headquarters"),
          mobile: newUser.mobile || "+91 98765 43210",
        }

        set({
          registeredUsers: [...currentUsers, createdUser],
        })

        return {
          success: true,
          messageKey: "auth.registerSuccess",
          customMessage: `Account created successfully for ${newUser.fullName}! You can now log in.`
        }
      },

      updateUserProfile: (updatedFields) => {
        const currentUser = get().user
        if (!currentUser) return

        const updatedUser: User = {
          ...currentUser,
          ...updatedFields,
        }

        const currentRegistered = get().registeredUsers || []
        const updatedRegistered = currentRegistered.map((u) => {
          if (u.id === currentUser.id || u.email.toLowerCase() === currentUser.email.toLowerCase()) {
            return {
              ...u,
              fullName: updatedFields.name ?? u.fullName,
              email: updatedFields.email ?? u.email,
              mobile: updatedFields.phone ?? u.mobile,
              department: updatedFields.department ?? u.department,
              role: updatedFields.role ?? u.role,
              avatar: updatedFields.avatar ?? u.avatar,
            }
          }
          return u
        })

        set({
          user: updatedUser,
          registeredUsers: updatedRegistered,
        })
      },

      verifyOtp: async (otp) => {
        await new Promise((resolve) => setTimeout(resolve, 400))
        return otp === "123456" || otp.length === 6
      },

      updateUserRole: (userId, newRole) => {
        const currentRegistered = get().registeredUsers || []
        const updated = currentRegistered.map((u) =>
          u.id === userId ? { ...u, role: newRole } : u
        )

        const currentUser = get().user
        if (currentUser && currentUser.id === userId) {
          set({ user: { ...currentUser, role: newRole } })
        }

        set({ registeredUsers: updated })
      },

      setActiveRole: (role) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              role: role,
              isRoleSelected: true,
            }
          })
        }
      },

      updatePassword: async (currentPassword, newPassword) => {
        await new Promise((resolve) => setTimeout(resolve, 400))
        const currentUser = get().user
        if (!currentUser) {
          return { success: false, customMessage: "No active session found. Please log in again." }
        }

        const currentUsers = get().registeredUsers && get().registeredUsers.length > 0
          ? get().registeredUsers
          : DEFAULT_USERS

        const userIndex = currentUsers.findIndex(
          (u) => u.id === currentUser.id || u.email.toLowerCase() === currentUser.email.toLowerCase()
        )

        const foundUser = userIndex !== -1 ? currentUsers[userIndex] : null

        // Check if current password matches existing password or master password
        const isCurrentValid = foundUser
          ? (foundUser.password === currentPassword || currentPassword === "admin123")
          : (currentPassword === "admin123" || currentPassword.length >= 6)

        if (!isCurrentValid) {
          return {
            success: false,
            customMessage: "Current password is incorrect. Please verify your current password."
          }
        }

        let updatedUsers: RegisteredUser[]
        if (userIndex !== -1 && foundUser) {
          updatedUsers = currentUsers.map((u, i) =>
            i === userIndex ? { ...u, password: newPassword } : u
          )
        } else {
          const newUserEntry: RegisteredUser = {
            id: currentUser.id || `USR-${Math.floor(1000 + Math.random() * 9000)}`,
            fullName: currentUser.name,
            email: currentUser.email,
            password: newPassword,
            role: currentUser.role,
            assignedRoles: currentUser.assignedRoles,
            department: currentUser.department,
            badgeId: currentUser.badgeId,
            mobile: currentUser.phone,
          }
          updatedUsers = [...currentUsers, newUserEntry]
        }

        set({ registeredUsers: updatedUsers })

        return {
          success: true,
          customMessage: "Password updated successfully! Use your new password on next login."
        }
      },

      logout: () => {
        set({ isAuthenticated: false, token: null, user: null })
      },
    }),
    {
      name: "ksp-auth-storage",
    }
  )
)



