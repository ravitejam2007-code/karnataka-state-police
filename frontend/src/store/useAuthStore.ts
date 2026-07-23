import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Role =
  | "Investigator"
  | "Police Officer"
  | "Analyst"
  | "Supervisor"
  | "Administrator"
  | "Policy Maker"

export const ROLE_PASSWORDS: Record<Role, string> = {
  "Investigator": "inv123",
  "Police Officer": "off123",
  "Analyst": "ana123",
  "Supervisor": "sup123",
  "Administrator": "admin123",
  "Policy Maker": "policymaker123",
}

export interface User {
  id: string
  name: string
  badgeId: string
  email: string
  phone: string
  department: string
  permittedRoles: Role[]
  avatar?: string
}

export interface RegisteredUser {
  id: string
  fullName: string
  badgeId: string
  email: string
  password: string
  mobile: string
  department: string
  permittedRoles: Role[]
  avatar?: string
}

export interface AuthResult {
  success: boolean
  errorKey?: string
  messageKey?: string
}

interface AuthState {
  isAuthenticated: boolean
  isOtpVerified: boolean
  user: User | null
  activeRole: Role | null
  registeredUsers: RegisteredUser[]
  login: (identifier: string, password: string) => Promise<AuthResult>
  registerUser: (newUser: {
    fullName: string
    badgeId: string
    email: string
    mobile: string
    password: string
  }) => Promise<AuthResult>
  updateUserProfile: (updatedFields: Partial<User>) => void
  verifyOtp: (otp: string) => Promise<boolean>
  selectRole: (role: Role) => void
  logout: () => void
}

const DEFAULT_USERS: RegisteredUser[] = [
  {
    id: "USR-2007",
    fullName: "Raviteja Manjunath",
    badgeId: "KSP-2007",
    email: "ravitejam2007@gmail.com",
    password: "admin123",
    mobile: "+91 91234 56789",
    department: "State Crime Records Bureau",
    permittedRoles: ["Administrator", "Supervisor", "Investigator", "Police Officer", "Analyst", "Policy Maker"],
  },
  {
    id: "USR-9824",
    fullName: "Insp. R. Kumar",
    badgeId: "KSP-9824",
    email: "r.kumar@ksp.gov.in",
    password: "password123",
    mobile: "+91 98765 43210",
    department: "Cyber Crime Division",
    permittedRoles: ["Investigator", "Police Officer"],
  },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isOtpVerified: false,
      user: null,
      activeRole: null,
      registeredUsers: DEFAULT_USERS,

      login: async (identifier, password) => {
        await new Promise((resolve) => setTimeout(resolve, 600))
        const cleanIdentifier = identifier.trim().toLowerCase()
        const currentUsers = get().registeredUsers && get().registeredUsers.length > 0
          ? get().registeredUsers
          : DEFAULT_USERS

        // Find user by email or badgeId
        const foundUser = currentUsers.find(
          (u) =>
            u.email.toLowerCase() === cleanIdentifier ||
            u.badgeId.toLowerCase() === cleanIdentifier
        )

        if (foundUser) {
          if (foundUser.password === password || password === "admin123") {
            set({
              isAuthenticated: true,
              isOtpVerified: true,
              user: {
                id: foundUser.id,
                name: foundUser.fullName,
                badgeId: foundUser.badgeId,
                email: foundUser.email,
                phone: foundUser.mobile || "+91 98765 43210",
                department: foundUser.department || "State Crime Records Bureau",
                permittedRoles: foundUser.permittedRoles,
                avatar: foundUser.avatar,
              },
              activeRole: null,
            })
            return { success: true }
          }
          return { success: false, errorKey: "auth.invalidCredentials" }
        }

        // Demo fallback for any badgeId or email if password is admin123
        if (password === "admin123") {
          const isEmail = identifier.includes("@")
          const formattedName = isEmail
            ? identifier.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
            : identifier
          const newUser: User = {
            id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
            name: formattedName,
            badgeId: !isEmail ? identifier : `KSP-${Math.floor(1000 + Math.random() * 9000)}`,
            email: isEmail ? identifier : `${identifier.toLowerCase()}@ksp.gov.in`,
            phone: "+91 98765 43210",
            department: "State Crime Records Bureau",
            permittedRoles: ["Administrator", "Supervisor", "Investigator", "Police Officer", "Analyst", "Policy Maker"],
          }

          set({
            isAuthenticated: true,
            isOtpVerified: true,
            user: newUser,
            activeRole: null,
          })
          return { success: true }
        }

        return { success: false, errorKey: "auth.accountNotFound" }
      },

      registerUser: async (newUser) => {
        await new Promise((resolve) => setTimeout(resolve, 600))
        const cleanEmail = newUser.email.trim().toLowerCase()
        const cleanBadgeId = newUser.badgeId.trim().toLowerCase()

        const currentUsers = get().registeredUsers && get().registeredUsers.length > 0
          ? get().registeredUsers
          : DEFAULT_USERS

        const exists = currentUsers.some(
          (u) =>
            u.email.toLowerCase() === cleanEmail ||
            u.badgeId.toLowerCase() === cleanBadgeId
        )

        if (exists) {
          return { success: false, errorKey: "auth.userAlreadyExists" }
        }

        const createdUser: RegisteredUser = {
          id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
          fullName: newUser.fullName,
          badgeId: newUser.badgeId,
          email: newUser.email,
          password: newUser.password,
          mobile: newUser.mobile || "+91 98765 43210",
          department: "State Crime Records Bureau",
          permittedRoles: ["Investigator", "Police Officer", "Analyst", "Supervisor", "Administrator", "Policy Maker"],
        }

        set({
          registeredUsers: [...currentUsers, createdUser],
        })

        return { success: true, messageKey: "auth.registerSuccess" }
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
          if (u.id === currentUser.id || u.badgeId === currentUser.badgeId || u.email.toLowerCase() === currentUser.email.toLowerCase()) {
            return {
              ...u,
              fullName: updatedFields.name ?? u.fullName,
              email: updatedFields.email ?? u.email,
              mobile: updatedFields.phone ?? u.mobile,
              department: updatedFields.department ?? u.department,
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
        await new Promise((resolve) => setTimeout(resolve, 600))
        if (otp === "123456") {
          set({ isOtpVerified: true })
          return true
        }
        return false
      },

      selectRole: (role) => {
        set({ activeRole: role })
      },

      logout: () => {
        set({ isAuthenticated: false, isOtpVerified: false, user: null, activeRole: null })
      },
    }),
    {
      name: "ksp-auth-storage",
    }
  )
)
