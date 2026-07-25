import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, FileWarning, SearchCheck, Laptop, Users, Car, Network, History, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { useKPISummary } from "../hooks/useDashboardData"

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
  const { data: kpi, isLoading } = useKPISummary()

  const totalCases = kpi?.totalCases ?? 500
  const solvedCases = kpi?.solvedCases ?? 228
  const activeCases = kpi?.activeCases ?? 272
  const solvedRate = kpi?.solvedRate ?? 45.6

  const kpis: KpiConfig[] = [
    { label: t("dashboard.totalFir"), value: isLoading ? "..." : totalCases.toLocaleString(), icon: FileWarning, trend: "+12%", critical: false },
    { label: t("dashboard.solvedCases"), value: isLoading ? "..." : solvedCases.toLocaleString(), icon: SearchCheck, trend: `+${solvedRate}%`, critical: false },
    { label: t("dashboard.pendingInv"), value: isLoading ? "..." : activeCases.toLocaleString(), icon: Shield, trend: "-3%", critical: true },
    { label: t("dashboard.cyberCrime"), value: "1,842", icon: Laptop, trend: "+24%", critical: true },
    { label: t("dashboard.womenSafety"), value: "945", icon: Users, trend: "-5%", critical: false },
    { label: t("dashboard.trafficViol"), value: "112,490", icon: Car, trend: "+2%", critical: false },
    { label: t("dashboard.orgCrime"), value: "48", icon: Network, trend: "0%", critical: true },
    { label: t("dashboard.repeatOff"), value: "3,190", icon: History, trend: "-1%", critical: false },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse bg-gray-200 rounded-xl" />
        ))}
      </div>
    )
  }

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
            <div className="p-2.5 rounded-xl shrink-0 bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB]">
              <kpi.icon className="h-4 w-4 text-[#111827]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

