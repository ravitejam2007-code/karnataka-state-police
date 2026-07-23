import { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { Shield, UserSquare2, ChevronRight, LogOut, KeyRound, Eye, EyeOff, Mail, ArrowLeft, CheckCircle2, Lock } from "lucide-react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import { useAuthStore, type Role, ROLE_PASSWORDS } from "@/store/useAuthStore"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function RoleSelection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated, user, selectRole, logout } = useAuthStore()

  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [rolePassword, setRolePassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Guard: If not authenticated, return to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />
  }

  const handleRoleClick = (role: Role) => {
    setSelectedRole(role)
    setRolePassword("")
    setError(null)
  }

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) return

    const expectedPassword = ROLE_PASSWORDS[selectedRole] || "admin123"

    if (rolePassword === expectedPassword) {
      selectRole(selectedRole)
      toast.success(`Role Activated: ${selectedRole}`)
      navigate("/app/dashboard")
    } else {
      setError(`Incorrect password for ${selectedRole}. Please check your registered email.`)
      toast.error(`Invalid password for ${selectedRole}`)
    }
  }

  const handleResendEmail = () => {
    toast.info(`Role security keys dispatched to ${user.email}`, {
      description: "Check your inbox for updated role authorization passwords."
    })
  }

  return (
    <Card className="w-full shadow-sm border-t-2 border-t-primary">
      <CardHeader className="space-y-2 text-center px-4 sm:px-8 pb-5 pt-6 sm:pt-8 border-b border-border mb-4 sm:mb-6">
        <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
          <UserSquare2 className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold">{t("auth.roleTitle")}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {t("auth.roleDescription", { name: user.name })}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-8 pb-6 space-y-4">
        {/* Email Notice Box */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-xs text-muted-foreground">
          <div className="flex items-start gap-2.5">
            <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Role Passwords sent to registered email</span>
                <button
                  type="button"
                  onClick={handleResendEmail}
                  className="text-[11px] font-medium text-primary hover:underline"
                >
                  Resend Keys
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Each role requires its specific password issued to <span className="font-medium text-foreground">{user.email}</span>.
              </p>
              <div className="mt-2 p-2 bg-background rounded border border-border/60 text-[11px] space-y-0.5">
                <div className="font-medium text-foreground flex items-center gap-1">
                  <KeyRound className="h-3 w-3 text-primary" />
                  <span>Demo Role Passwords:</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px] pt-0.5">
                  <span className="text-muted-foreground">Investigator: <code className="text-primary font-mono font-bold">inv123</code></span>
                  <span className="text-muted-foreground">Police Officer: <code className="text-primary font-mono font-bold">off123</code></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!selectedRole ? (
          /* Step 1: Select Role */
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Select role to authenticate:</p>
            {user.permittedRoles.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleClick(role)}
                className="w-full group flex items-center justify-between p-3.5 rounded-lg border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-muted p-2 rounded-md group-hover:bg-primary/20 transition-colors">
                    <Shield className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{role}</h4>
                    <p className="text-[11px] text-muted-foreground">{t("auth.roleAccessAs", { role })}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        ) : (
          /* Step 2: Enter Password for Selected Role */
          <form onSubmit={handleVerifyPassword} className="space-y-4 pt-1">
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2.5">
                <Shield className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-foreground">{selectedRole} Role</h4>
                  <p className="text-[11px] text-muted-foreground">Enter the password assigned for {selectedRole}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRole(null)}
                className="h-8 text-xs text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                Change
              </Button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground flex items-center gap-1.5" htmlFor="rolePassword">
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                Password for {selectedRole}
              </label>
              <div className="relative">
                <Input
                  id="rolePassword"
                  type={showPassword ? "text" : "password"}
                  placeholder={`Enter ${selectedRole} password...`}
                  value={rolePassword}
                  onChange={(e) => {
                    setRolePassword(e.target.value)
                    setError(null)
                  }}
                  autoFocus
                  className={error ? "border-destructive focus-visible:ring-destructive pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {error && <p className="text-xs text-destructive mt-1 font-medium">{error}</p>}
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedRole(null)}
                className="flex-1"
              >
                Back
              </Button>
              <Button type="submit" className="flex-1 font-semibold" disabled={!rolePassword.trim()}>
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                Authenticate & Enter
              </Button>
            </div>
          </form>
        )}
      </CardContent>

      <CardFooter className="flex justify-center border-t p-4 sm:p-6 bg-muted/50 rounded-b-lg mt-2">
        <Button variant="ghost" size="sm" onClick={() => logout()} className="text-muted-foreground hover:text-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          {t("auth.cancelLogout")}
        </Button>
      </CardFooter>
    </Card>
  )
}
