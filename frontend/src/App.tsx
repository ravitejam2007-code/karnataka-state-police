import { type ReactNode, lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom"
import { Toaster } from "sonner"
import { ShieldAlert } from "lucide-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { MainLayout } from "@/components/layout/MainLayout"
import { AuthLayout } from "@/components/layout/AuthLayout"
import { LandingPage } from "@/features/landing/LandingPage"

// Lazy loaded Auth Features
const Login = lazy(() => import("@/features/auth/Login").then(m => ({ default: m.Login })))
const Register = lazy(() => import("@/features/auth/Register").then(m => ({ default: m.Register })))
const ForgotPassword = lazy(() => import("@/features/auth/ForgotPassword").then(m => ({ default: m.ForgotPassword })))
const OtpVerification = lazy(() => import("@/features/auth/OtpVerification").then(m => ({ default: m.OtpVerification })))
const RoleSelection = lazy(() => import("@/features/auth/RoleSelection").then(m => ({ default: m.RoleSelection })))

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
const ProfilePage = lazy(() => import("@/features/profile/ProfilePage").then(m => ({ default: m.ProfilePage })))
const OfficerVerificationPage = lazy(() => import("@/features/profile/OfficerVerificationPage").then(m => ({ default: m.OfficerVerificationPage })))
const AboutSystemPage = lazy(() => import("@/features/about/AboutSystemPage").then(m => ({ default: m.AboutSystemPage })))
const LegalPage = lazy(() => import("@/features/legal/LegalPage").then(m => ({ default: m.LegalPage })))

import { useAuthStore, type Role } from "@/store/useAuthStore"
import { Button } from "@/components/ui/button"

import { ErrorBoundary } from "@/components/shared/ErrorBoundary"

// Persistent QueryClient instance survive role switches & re-renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
})

// Guard for protected routes
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, token, user } = useAuthStore()

  if (!isAuthenticated || !token || !user) {
    return <Navigate to="/auth/login" replace />
  }

  const userRoles = user.assignedRoles || [user.role]
  if (userRoles.length > 1 && user.isRoleSelected === false) {
    return <Navigate to="/auth/role-selection" replace />
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

// Guard for auth routes (if already logged in, redirect to dashboard unless on role-selection)
function AuthRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, token, user } = useAuthStore()
  const location = useLocation()
  
  if (isAuthenticated && token && user) {
    if (location.pathname === "/auth/role-selection") {
      return <>{children}</>
    }
    return <Navigate to="/app/dashboard" replace />
  }

  return <>{children}</>
}

function App() {
  const { isAuthenticated, token, user } = useAuthStore()
  const isLoggedIn = isAuthenticated && !!token && !!user

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ksp-theme">
        <BrowserRouter>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={
              isLoggedIn ? <Navigate to="/app/dashboard" replace /> : <LandingPage />
            } />

            {/* Public Scannable Officer Identity Verification Route */}
            <Route path="/verify/:badgeId?" element={
              <ErrorBoundary moduleName="Officer Identity Verification">
                <OfficerVerificationPage />
              </ErrorBoundary>
            } />

            {/* Public Legal & Compliance Routes */}
            <Route path="/privacy-policy" element={
              <ErrorBoundary moduleName="Privacy Policy">
                <LegalPage initialTab="privacy" />
              </ErrorBoundary>
            } />
            <Route path="/terms-of-use" element={
              <ErrorBoundary moduleName="Terms of Use">
                <LegalPage initialTab="terms" />
              </ErrorBoundary>
            } />
            <Route path="/accessibility-statement" element={
              <ErrorBoundary moduleName="Accessibility Statement">
                <LegalPage initialTab="accessibility" />
              </ErrorBoundary>
            } />
            <Route path="/legal/:tab?" element={
              <ErrorBoundary moduleName="Legal & Compliance Center">
                <LegalPage />
              </ErrorBoundary>
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
              <Route path="role-selection" element={<RoleSelection />} />
            </Route>

            {/* Protected Main Routes with RBAC & Error Boundaries */}
            <Route path="/app" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={
                <ErrorBoundary moduleName="Command Operations Center">
                  <CommandDashboard />
                </ErrorBoundary>
              } />
              <Route path="cases" element={
                <ErrorBoundary moduleName="Case Files">
                  <CasesPage />
                </ErrorBoundary>
              } />
              <Route path="investigation" element={
                <RoleGuard allowedRoles={["Administrator", "Police Officer", "Investigator", "Supervisor", "Senior Officers"]}>
                  <ErrorBoundary moduleName="Investigation Workspace">
                    <InvestigationPage />
                  </ErrorBoundary>
                </RoleGuard>
              } />
              
              {/* RBAC Protected Modules */}
              <Route path="ai" element={
                <RoleGuard allowedRoles={["Administrator", "Police Officer", "Investigator", "Analyst", "Supervisor", "Senior Officers", "Sub-Ordinates"]}>
                  <ErrorBoundary moduleName="AI Assistant">
                    <AIAssistantPage />
                  </ErrorBoundary>
                </RoleGuard>
              } />
              <Route path="map" element={
                <RoleGuard allowedRoles={["Administrator", "Police Officer", "Investigator", "Analyst", "Supervisor", "Senior Officers"]}>
                  <ErrorBoundary moduleName="Crime Predictive Map">
                    <CrimeMapPage />
                  </ErrorBoundary>
                </RoleGuard>
              } />
              <Route path="network" element={
                <RoleGuard allowedRoles={["Administrator", "Investigator", "Analyst", "Supervisor", "Senior Officers"]}>
                  <ErrorBoundary moduleName="Criminal Network Analysis">
                    <CriminalNetworkPage />
                  </ErrorBoundary>
                </RoleGuard>
              } />
              <Route path="analytics" element={
                <RoleGuard allowedRoles={["Administrator", "Analyst", "Investigator", "Supervisor", "Policy Maker", "Senior Officers"]}>
                  <ErrorBoundary moduleName="Crime Analytics">
                    <CrimeAnalyticsPage />
                  </ErrorBoundary>
                </RoleGuard>
              } />
              <Route path="forecast" element={
                <RoleGuard allowedRoles={["Administrator", "Analyst", "Investigator", "Supervisor", "Policy Maker", "Senior Officers"]}>
                  <ErrorBoundary moduleName="Crime Forecast">
                    <CrimeForecastPage />
                  </ErrorBoundary>
                </RoleGuard>
              } />
              <Route path="reports" element={
                <RoleGuard allowedRoles={["Administrator", "Analyst", "Investigator", "Supervisor", "Policy Maker", "Senior Officers", "Sub-Ordinates"]}>
                  <ErrorBoundary moduleName="Reports Module">
                    <ReportsPage />
                  </ErrorBoundary>
                </RoleGuard>
              } />
              <Route path="profile" element={
                <ErrorBoundary moduleName="My Profile">
                  <ProfilePage />
                </ErrorBoundary>
              } />
              <Route path="settings" element={
                <ErrorBoundary moduleName="Application Settings">
                  <SettingsPage />
                </ErrorBoundary>
              } />
              <Route path="about" element={
                <ErrorBoundary moduleName="About KCIP Platform">
                  <AboutSystemPage />
                </ErrorBoundary>
              } />
              <Route path="legal/:tab?" element={
                <ErrorBoundary moduleName="Legal & Compliance Center">
                  <LegalPage />
                </ErrorBoundary>
              } />
              <Route path="privacy-policy" element={
                <ErrorBoundary moduleName="Privacy Policy">
                  <LegalPage initialTab="privacy" />
                </ErrorBoundary>
              } />
              <Route path="terms-of-use" element={
                <ErrorBoundary moduleName="Terms of Use">
                  <LegalPage initialTab="terms" />
                </ErrorBoundary>
              } />
              <Route path="accessibility-statement" element={
                <ErrorBoundary moduleName="Accessibility Statement">
                  <LegalPage initialTab="accessibility" />
                </ErrorBoundary>
              } />

              <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App

