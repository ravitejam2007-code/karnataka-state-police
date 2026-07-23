import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export function IntelligenceSummary() {
  const { t } = useTranslation()

  return (
    <Card className="rounded-xl border-border/80 bg-card shadow-2xs h-full flex flex-col">
      <CardHeader className="p-3.5 border-b border-border/80 pb-2.5 bg-muted/30">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center">
          <FileText className="w-3.5 h-3.5 mr-2 text-primary" />
          {t("dashboard.intelligenceSummary")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-1 text-xs text-muted-foreground space-y-3.5">
        <div className="space-y-1">
          <h4 className="text-foreground font-bold uppercase tracking-wider text-[10px]">{t("dashboard.strategicOverview")}</h4>
          <p className="leading-relaxed">
            Elevated activity detected in cyber infrastructure nodes within the metropolitan perimeter. Organized crime syndicates show a 4% shift towards localized extortion using untraceable digital wallets.
          </p>
        </div>
        <div className="space-y-1">
          <h4 className="text-foreground font-bold uppercase tracking-wider text-[10px]">{t("dashboard.tacticalDirectives")}</h4>
          <p className="leading-relaxed">
            All precinct commanders are advised to reinforce patrols in Zones A and C. Cyber division to escalate priority on Node 72 investigation.
          </p>
        </div>
        <div className="pt-2 border-t border-border/60 border-dashed mt-auto">
          <p className="text-[10px] font-mono text-primary font-semibold">{t("dashboard.generatedBy")}</p>
        </div>
      </CardContent>
    </Card>
  )
}
