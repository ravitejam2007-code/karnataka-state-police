import { type ReactNode } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { MainLayout } from "@/components/layout/MainLayout"
import { AuthLayout } from "@/components/layout/AuthLayout"
import { LandingPage } from "@/features/landing/LandingPage"

import { lazy } from "react"

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
const CrimeMapPage = lazy(() => import("@/features/map/CrimeMapPage").then(m => ({ default: m.CrimeMapPage })))
const CrimeForecastPage = lazy(() => import("@/features/forecast/CrimeForecastPage").then(m => ({ default: m.CrimeForecastPage })))
const ReportsPage = lazy(() => import("@/features/reports/ReportsPage").then(m => ({ default: m.ReportsPage })))
const SettingsPage = lazy(() => import("@/features/settings/SettingsPage").then(m => ({ default: m.SettingsPage })))

import { useAuthStore } from "@/store/useAuthStore"

// Guard for protected routes
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isOtpVerified, activeRole } = useAuthStore()

  if (!isAuthenticated || !isOtpVerified || !activeRole) {
    return <Navigate to="/auth/login" replace />
  }

  return <>{children}</>
}

// Guard for auth routes (if already fully logged in, redirect to dashboard)
function AuthRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isOtpVerified, activeRole } = useAuthStore()
  
  if (isAuthenticated && isOtpVerified && activeRole) {
    return <Navigate to="/app/dashboard" replace />
  }

  return <>{children}</>
}

function App() {
  const { isAuthenticated, isOtpVerified, activeRole } = useAuthStore()
  const isLoggedIn = isAuthenticated && isOtpVerified && activeRole

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
            <Route path="role-selection" element={<RoleSelection />} />
          </Route>

          {/* Protected Main Routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<CommandDashboard />} />
            <Route path="ai" element={<AIAssistantPage />} />
            <Route path="network" element={<CriminalNetworkPage />} />
            <Route path="analytics" element={<CrimeAnalyticsPage />} />
            <Route path="cases" element={<CasesPage />} />
            <Route path="map" element={<CrimeMapPage />} />
            <Route path="forecast" element={<CrimeForecastPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  )
}

export default App
