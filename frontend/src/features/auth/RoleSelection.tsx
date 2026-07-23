import { useNavigate, Navigate } from "react-router-dom"
import { Shield, UserSquare2, ChevronRight, LogOut } from "lucide-react"
import { useTranslation } from "react-i18next"

import { useAuthStore, type Role } from "@/store/useAuthStore"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RoleSelection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated, isOtpVerified, user, selectRole, logout } = useAuthStore()

  // Guard: If not fully authenticated, kick out
  if (!isAuthenticated || !isOtpVerified || !user) {
    return <Navigate to="/auth/login" replace />
  }

  const handleSelectRole = (role: Role) => {
    selectRole(role)
    navigate("/app/dashboard") // Proceed to dashboard
  }

  return (
    <Card className="w-full shadow-sm border-t-2 border-t-primary">
      <CardHeader className="space-y-2 text-center pb-6 border-b border-border mb-6">
        <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
          <UserSquare2 className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{t("auth.roleTitle")}</CardTitle>
        <CardDescription>
          {t("auth.roleDescription", { name: user.name })}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {user.permittedRoles.map((role) => (
          <button
            key={role}
            onClick={() => handleSelectRole(role)}
            className="w-full group flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="bg-muted p-2 rounded-md group-hover:bg-primary/20 transition-colors">
                <Shield className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{role}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{t("auth.roleAccessAs", { role })}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        ))}
      </CardContent>

      <CardFooter className="flex justify-center border-t p-6 bg-muted/50 rounded-b-lg mt-2">
        <Button variant="ghost" size="sm" onClick={() => logout()} className="text-muted-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          {t("auth.cancelLogout")}
        </Button>
      </CardFooter>
    </Card>
  )
}
