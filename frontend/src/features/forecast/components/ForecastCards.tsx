import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { TrendingUp, Map, ShieldAlert, AlertTriangle, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { PREDICTION_METRICS } from "../mockData"

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

function CardWrapper({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const base = "bg-card p-5 rounded-xl border shadow-sm relative overflow-hidden group flex flex-col"
  if (onClick) {
    return (
      <motion.button variants={item} onClick={onClick} className={`${base} cursor-pointer hover:border-primary/30 hover:shadow-md transition-all text-left`}>
        {children}
      </motion.button>
    )
  }
  return (
    <motion.div variants={item} className={base}>
      {children}
    </motion.div>
  )
}

function TrendBadge({ trend }: { trend: string }) {
  const up = trend.startsWith("+")
  return (
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
      up ? "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30" : "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30"
    }`}>
      {trend}
    </span>
  )
}

function SeverityBadge({ label, count }: { label: string; count: number }) {
  const colorMap: Record<string, string> = {
    critical: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    moderate: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  }
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${colorMap[label] || colorMap.low}`}>
      {count} {label}
    </span>
  )
}

export function ForecastCards() {
  const navigate = useNavigate()

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <CardWrapper onClick={() => navigate("/forecast")}>
        <div className="absolute top-0 right-0 p-4 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity pointer-events-none">
          <TrendingUp className="w-16 h-16 text-primary" />
        </div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            Next Week Prediction
          </h3>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-3xl font-bold text-foreground">{PREDICTION_METRICS.nextWeekTotal}</span>
          <TrendBadge trend={PREDICTION_METRICS.trend} />
        </div>
        <p className="text-[11px] text-muted-foreground mt-auto">Predicted incidents for next week</p>
      </CardWrapper>

      <CardWrapper onClick={() => navigate("/app/map")}>
        <div className="absolute top-0 right-0 p-4 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity pointer-events-none">
          <Map className="w-16 h-16 text-destructive" />
        </div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Map className="w-3.5 h-3.5 text-destructive" />
            High Risk Areas
          </h3>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-3xl font-bold text-foreground">{PREDICTION_METRICS.highRiskAreas}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-1">
          <SeverityBadge label="critical" count={PREDICTION_METRICS.highRiskBreakdown.critical} />
          <SeverityBadge label="moderate" count={PREDICTION_METRICS.highRiskBreakdown.moderate} />
          <SeverityBadge label="low" count={PREDICTION_METRICS.highRiskBreakdown.low} />
        </div>
        <p className="text-[11px] text-muted-foreground mt-auto">Zones requiring immediate attention</p>
      </CardWrapper>

      <CardWrapper onClick={() => navigate("/analytics")}>
        <div className="absolute top-0 right-0 p-4 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity pointer-events-none">
          <ShieldAlert className="w-16 h-16 text-amber-500" />
        </div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            Emerging Types
          </h3>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex flex-wrap gap-1.5 mb-1">
          {PREDICTION_METRICS.emergingTypes.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 text-xs font-medium bg-muted px-2 py-1 rounded-md">
              {t.name}
              <span className="text-red-500 font-semibold">{t.spike}</span>
            </span>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground mt-auto">Anomalous spikes detected</p>
      </CardWrapper>

      <CardWrapper onClick={() => navigate("/map?alerts=true")}>
        <div className="absolute top-0 right-0 p-4 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity pointer-events-none">
          <AlertTriangle className="w-16 h-16 text-orange-500" />
        </div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
            Active Alerts
          </h3>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-3xl font-bold text-orange-500">{PREDICTION_METRICS.activeAlerts}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-1">
          <SeverityBadge label="critical" count={PREDICTION_METRICS.activeAlertBreakdown.critical} />
          <SeverityBadge label="moderate" count={PREDICTION_METRICS.activeAlertBreakdown.moderate} />
        </div>
        <p className="text-[11px] text-muted-foreground mt-auto">Repeat offender & pattern alerts</p>
      </CardWrapper>
    </motion.div>
  )
}
