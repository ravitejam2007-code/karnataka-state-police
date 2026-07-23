import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Role =
  | "Investigator"
  | "Police Officer"
  | "Analyst"
  | "Supervisor"
  | "Administrator"
  | "Policy Maker"

export interface User {
  id: string
  name: string
  badgeId: string
  email: string
  permittedRoles: Role[]
}

interface AuthState {
  isAuthenticated: boolean
  isOtpVerified: boolean
  user: User | null
  activeRole: Role | null
  login: (badgeId: string, password: string) => Promise<boolean>
  verifyOtp: (otp: string) => Promise<boolean>
  selectRole: (role: Role) => void
  logout: () => void
}

const dummyUser: User = {
  id: "USR-9824",
  name: "Insp. R. Kumar",
  badgeId: "KSP-9824",
  email: "r.kumar@ksp.gov.in",
  permittedRoles: ["Investigator", "Police Officer"],
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isOtpVerified: false,
      user: null,
      activeRole: null,

      login: async (badgeId, password) => {
        // Dummy authentication delay
        await new Promise((resolve) => setTimeout(resolve, 800))
        if (password === "admin123") {
          const isEmail = badgeId.includes("@")
          set({ 
            isAuthenticated: true, 
            user: {
              ...dummyUser,
              email: isEmail ? badgeId : dummyUser.email,
              badgeId: !isEmail ? badgeId : dummyUser.badgeId,
              name: isEmail ? badgeId.split("@")[0] : dummyUser.name
            }, 
            isOtpVerified: false, 
            activeRole: null 
          })
          return true
        }
        return false
      },

      verifyOtp: async (otp) => {
        await new Promise((resolve) => setTimeout(resolve, 800))
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
