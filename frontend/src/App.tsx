import { type ReactNode, lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom"
import { Toaster } from "sonner"
import { ShieldAlert } from "lucide-react"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { MainLayout } from "@/components/layout/MainLayout"
import { AuthLayout } from "@/components/layout/AuthLayout"
import { LandingPage } from "@/features/landing/LandingPage"

// Lazy loaded Auth Features
const Login = lazy(() => import("@/features/auth/Login").then(m => ({ default: m.Login })))
const Register = lazy(() => import("@/features/auth/Register").then(m => ({ default: m.Register })))
const ForgotPassword = lazy(() => import("@/features/auth/ForgotPassword").then(m => ({ default: m.ForgotPassword })))
const OtpVerification = lazy(() => import("@/features/auth/OtpVerification").then(m => ({ default: m.OtpVerification })))

// Lazy loaded Main Features
const CommandDashboard = lazy(() => import("@/features/dashboard/CommandDashboard").then(m => ({ default: m.CommandDashboard })))
const AIAssistantPage = lazy(() => import("@/features/ai-assistant/AIAssistantPage").then(m => ({ default: m.AIAssistantPage })))
const CriminalNetworkPage = lazy(() => import("@/features/network-analysis/CriminalNetworkPage").then(m => ({ default: m.CriminalNetworkPage })))
const CrimeAnalyticsPage = lazy(() => import("@/features/analytics/CrimeAnalyticsPage").then(m => ({ default: m.CrimeAnalyticsPage })))
const CasesPage = lazy(() => import("@/features/cases/CasesPage").then(m => ({ default: m.CasesPage })))
const InvestigationPage = lazy(() => import("@/features/cases/InvestigationPage").then(m => ({ default: m.InvestigationPage })))
const CrimeMapPage = lazy(() => import("@/features/map/CrimeMapPage").then(m => ({ default: m.CrimeMapPage })))
const CrimeForecastPage = lazy(() => import("@/features/forecast/CrimeForecastPage").then(m => ({ default: m.CrimeForecastPage })))
const ReportsPage = lazy(() => import("@/features/reports/ReportsPage").then(m => ({ default: m.ReportsPage })))
const SettingsPage = lazy(() => import("@/features/settings/SettingsPage").then(m => ({ default: m.SettingsPage })))

import { useAuthStore, type Role } from "@/store/useAuthStore"
import { Button } from "@/components/ui/button"

// Guard for protected routes
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, token, user } = useAuthStore()

  if (!isAuthenticated || !token || !user) {
    return <Navigate to="/auth/login" replace />
  }

  return <>{children}</>
}

// Guard for role-based module access
function RoleGuard({ allowedRoles, children }: { allowedRoles: Role[]; children: ReactNode }) {
  const { user } = useAuthStore()

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  if (user.role === "Administrator" || allowedRoles.includes(user.role)) {
    return <>{children}</>
  }

  return (
    <div className="p-8 text-center font-sans space-y-4 max-w-md mx-auto my-12 bg-card border border-border rounded-xl shadow-xs">
      <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
        <ShieldAlert className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-foreground">Access Restricted</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Your assigned role (<strong className="text-foreground">{user.role}</strong>) does not have authorization to access this module.
      </p>
      <Link to="/app/dashboard">
        <Button size="sm" variant="outline" className="mt-2 text-xs font-semibold">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  )
}

// Guard for auth routes (if already logged in, redirect to dashboard)
function AuthRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, token, user } = useAuthStore()
  
  if (isAuthenticated && token && user) {
    return <Navigate to="/app/dashboard" replace />
  }

  return <>{children}</>
}

function App() {
  const { isAuthenticated, token, user } = useAuthStore()
  const isLoggedIn = isAuthenticated && !!token && !!user

  return (
    <ThemeProvider defaultTheme="light" storageKey="ksp-theme">
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={
            isLoggedIn ? <Navigate to="/app/dashboard" replace /> : <LandingPage />
          } />

          {/* Auth Routes */}
          <Route path="/auth" element={
            <AuthRoute>
              <AuthLayout />
            </AuthRoute>
          }>
            <Route index element={<Navigate to="/auth/login" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="otp" element={<OtpVerification />} />
            <Route path="role-selection" element={<Navigate to="/app/dashboard" replace />} />
          </Route>

          {/* Protected Main Routes with RBAC */}
          <Route path="/app" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<CommandDashboard />} />
            <Route path="cases" element={<CasesPage />} />
            <Route path="investigation" element={
              <RoleGuard allowedRoles={["Administrator", "Police Officer", "Investigator", "Supervisor"]}>
                <InvestigationPage />
              </RoleGuard>
            } />
            
            {/* RBAC Protected Modules */}
            <Route path="ai" element={
              <RoleGuard allowedRoles={["Administrator", "Police Officer", "Investigator", "Analyst", "Supervisor"]}>
                <AIAssistantPage />
              </RoleGuard>
            } />
            <Route path="map" element={
              <RoleGuard allowedRoles={["Administrator", "Police Officer", "Investigator", "Supervisor"]}>
                <CrimeMapPage />
              </RoleGuard>
            } />
            <Route path="network" element={
              <RoleGuard allowedRoles={["Administrator", "Investigator", "Analyst", "Supervisor"]}>
                <CriminalNetworkPage />
              </RoleGuard>
            } />
            <Route path="analytics" element={
              <RoleGuard allowedRoles={["Administrator", "Analyst", "Investigator", "Supervisor", "Policy Maker"]}>
                <CrimeAnalyticsPage />
              </RoleGuard>
            } />
            <Route path="forecast" element={
              <RoleGuard allowedRoles={["Administrator", "Analyst", "Investigator", "Supervisor", "Policy Maker"]}>
                <CrimeForecastPage />
              </RoleGuard>
            } />
            <Route path="reports" element={
              <RoleGuard allowedRoles={["Administrator", "Analyst", "Investigator", "Supervisor", "Policy Maker"]}>
                <ReportsPage />
              </RoleGuard>
            } />
            <Route path="settings" element={
              <RoleGuard allowedRoles={["Administrator", "Supervisor"]}>
                <SettingsPage />
              </RoleGuard>
            } />

            <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  )
}

export default App

