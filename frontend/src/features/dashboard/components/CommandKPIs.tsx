import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, FileWarning, SearchCheck, Laptop, Users, Car, Network, History, ArrowUp, ArrowDown, Minus } from "lucide-react"

interface KpiConfig {
  label: string
  value: string
  icon: typeof Shield
  trend: string
  critical: boolean
}

function TrendBadge({ trend }: { trend: string }) {
  const isNegative = trend.startsWith("-")
  const isNeutral = trend === "0%"

  let arrow: typeof ArrowUp | typeof ArrowDown | typeof Minus

  if (isNeutral) {
    arrow = Minus
  } else if (isNegative) {
    arrow = ArrowDown
  } else {
    arrow = ArrowUp
  }

  const Icon = arrow

  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground">
      <Icon className="w-2.5 h-2.5" />
      {trend}
    </span>
  )
}

export function CommandKPIs() {
  const { t } = useTranslation()

  const kpis: KpiConfig[] = [
    { label: t("dashboard.totalFir"), value: "24,592", icon: FileWarning, trend: "+12%", critical: false },
    { label: t("dashboard.solvedCases"), value: "15,201", icon: SearchCheck, trend: "+8%", critical: false },
    { label: t("dashboard.pendingInv"), value: "8,341", icon: Shield, trend: "-3%", critical: true },
    { label: t("dashboard.cyberCrime"), value: "1,842", icon: Laptop, trend: "+24%", critical: true },
    { label: t("dashboard.womenSafety"), value: "945", icon: Users, trend: "-5%", critical: false },
    { label: t("dashboard.trafficViol"), value: "112,490", icon: Car, trend: "+2%", critical: false },
    { label: t("dashboard.orgCrime"), value: "48", icon: Network, trend: "0%", critical: true },
    { label: t("dashboard.repeatOff"), value: "3,190", icon: History, trend: "-1%", critical: false },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="bg-card border-border/80 rounded-xl shadow-2xs hover:border-border transition-all">
          <CardContent className="p-3.5 flex items-start justify-between gap-2.5">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1 truncate">
                {kpi.label}
              </p>
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className={`font-mono tracking-tight text-foreground ${kpi.critical ? "text-xl font-bold" : "text-lg font-bold"}`}>
                  {kpi.value}
                </h3>
                <TrendBadge trend={kpi.trend} />
              </div>
            </div>
            <div className="p-2 rounded-lg shrink-0 bg-primary/5 text-primary border border-primary/10">
              <kpi.icon className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
