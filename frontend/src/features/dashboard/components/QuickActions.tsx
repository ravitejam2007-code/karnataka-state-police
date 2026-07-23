import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Siren, FileSearch, ShieldAlert, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"

const actions = [
  { label: "dashboard.initiateResponse", icon: Siren, variant: "destructive" as const },
  { label: "dashboard.generateBrief", icon: Zap, variant: "default" as const },
  { label: "dashboard.accessCctns", icon: FileSearch, variant: "outline" as const },
  { label: "dashboard.issueBolo", icon: ShieldAlert, variant: "outline" as const },
  { label: "dashboard.biometricQuery", icon: Fingerprint, variant: "outline" as const },
]

export function QuickActions() {
  const { t } = useTranslation()

  return (
    <Card className="rounded-sm border-border bg-card h-full flex flex-col">
      <CardHeader className="p-4 border-b border-border pb-3 bg-muted/50">
        <CardTitle className="text-xs uppercase tracking-widest flex items-center">
          <Zap className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
          {t("dashboard.tacticalActions")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col gap-2 justify-center">
        {actions.map((action) => (
          <Button 
            key={action.label} 
            variant={action.variant} 
            className="w-full justify-start text-xs h-9 uppercase tracking-wider font-semibold"
          >
            <action.icon className="mr-2 h-4 w-4" />
            {t(action.label)}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
