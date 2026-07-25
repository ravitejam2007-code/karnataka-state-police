import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Siren, FileSearch, ShieldAlert, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"

const actions = [
  { label: "dashboard.initiateResponse", icon: Siren, route: "/app/cases", variant: "default" as const },
  { label: "dashboard.generateBrief", icon: Zap, route: "/app/reports", variant: "outline" as const },
  { label: "dashboard.accessCctns", icon: FileSearch, route: "/app/cases", variant: "outline" as const },
  { label: "dashboard.issueBolo", icon: ShieldAlert, route: "/app/network", variant: "outline" as const },
  { label: "dashboard.biometricQuery", icon: Fingerprint, route: "/app/ai", variant: "outline" as const },
]

export function QuickActions() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Card className="rounded-xl border-border/80 bg-card shadow-2xs">
      <CardHeader className="p-3.5 border-b border-border/80 pb-2.5 bg-muted/30">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center">
          <Zap className="w-3.5 h-3.5 mr-2 text-primary" />
          {t("dashboard.tacticalActions")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3.5 space-y-2">
        {actions.map((action) => (
          <Button 
            key={action.label} 
            variant={action.variant}
            onClick={() => navigate(action.route)}
            className="w-full justify-start text-xs h-9 uppercase tracking-wider font-semibold hover:border-primary/40 transition-colors"
          >
            <action.icon className="mr-2 h-3.5 w-3.5 text-primary" />
            {t(action.label)}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
