import { useNavigate, Navigate } from "react-router-dom"
import { Shield, UserSquare2, LogOut, CheckCircle2, BadgeCheck } from "lucide-react"
import { useTranslation } from "react-i18next"

import { useAuthStore } from "@/store/useAuthStore"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RoleSelection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()

  // Guard: If not authenticated, return to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />
  }

  return (
    <Card className="w-full shadow-sm border-t-2 border-t-primary">
      <CardHeader className="space-y-2 text-center px-4 sm:px-8 pb-5 pt-6 sm:pt-8 border-b border-border mb-4 sm:mb-6">
        <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
          <UserSquare2 className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold">RBAC Environment Active</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Welcome, <span className="font-semibold text-foreground">{user.name}</span> ({user.department})
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-8 pb-6 space-y-4">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3.5 text-xs text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
            <span>
              Assigned Role: <span className="font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded text-[10px]">{user.role}</span>
            </span>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">ID: {user.badgeId}</span>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-sm text-foreground">{user.role} Environment</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            Role-Based Access Control has authorized your JWT session for {user.department}.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t p-4 sm:p-6 bg-muted/50 rounded-b-lg mt-2">
        <Button variant="ghost" size="sm" onClick={() => logout()} className="text-muted-foreground hover:text-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          {t("auth.cancelLogout", { defaultValue: "Sign Out" })}
        </Button>
        <Button 
          size="sm" 
          onClick={() => navigate("/app/dashboard")}
          className="font-semibold"
        >
          <CheckCircle2 className="h-4 w-4 mr-1.5" />
          Enter Dashboard
        </Button>
      </CardFooter>
    </Card>
  )
}


