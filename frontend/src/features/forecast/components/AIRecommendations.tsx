import { useState } from "react"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { AlertCircle, ArrowRight, BrainCircuit, Lightbulb, Bell, MapPin, CheckCircle2, X, Clock, User, Check, Eye, Send } from "lucide-react"
import { RECOMMENDATIONS, ALERTS, RISK_AREAS } from "../mockData"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export function AIRecommendations() {
  return (
    <div className="space-y-6">
      
      {/* AI Prediction Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-primary">
            <BrainCircuit className="w-5 h-5" />
            AI Insight Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The predictive model anticipates a <strong>5.2% increase</strong> in overall incidents next week, primarily driven by seasonal trends in the <span className="text-foreground font-medium">South Zone</span>. 
            There is a high probability of property-related crimes during late-night hours.
          </p>
        </CardContent>
      </Card>

      {/* High Risk Areas List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-destructive" />
            Risk Hotspots
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {RISK_AREAS.map((area, i) => {
              const barColor = area.riskScore > 80 ? "bg-red-500" : area.riskScore > 60 ? "bg-amber-500" : "bg-emerald-500"
              const trendIcon = area.trend === "up" ? "↑" : area.trend === "down" ? "↓" : "→"
              const trendColor = area.trend === "up" ? "text-red-500" : area.trend === "down" ? "text-emerald-500" : "text-muted-foreground"
              return (
                <div key={i} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <h4 className="font-semibold text-sm">{area.district}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold">{area.riskScore}/100</span>
                      <span className={`text-xs font-mono font-bold ${trendColor}`}>{trendIcon}</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-1.5">
                    <div
                      className={`h-full rounded-full transition-all ${barColor}`}
                      style={{ width: `${area.riskScore}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {area.hotspots.map((hs, j) => (
                        <span key={j} className="text-[10px] text-muted-foreground bg-muted/70 px-1.5 py-0.5 rounded">
                          {hs}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{area.primaryThreat}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actionable Recommendations */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Recommended Actions
        </h3>
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
          {RECOMMENDATIONS.map((rec) => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </motion.div>
      </div>

      {/* Live Alerts */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Live Alerts
        </h3>
        <div className="space-y-2">
          {ALERTS.map((alert) => (
            <StructuredAlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </div>

    </div>
  )
}

function StructuredAlertCard({ alert }: { alert: typeof ALERTS[number] }) {
  const [acknowledged, setAcknowledged] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const sevStyle = alert.severity === "Critical"
    ? "border-red-200 bg-red-50/80 dark:border-red-900/40 dark:bg-red-950/20"
    : "border-amber-200 bg-amber-50/80 dark:border-amber-900/40 dark:bg-amber-950/20"

  const sevBadge = alert.severity === "Critical"
    ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
    : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"

  return (
    <div className={`rounded-lg border p-3 ${sevStyle} ${acknowledged ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-2">
        <AlertCircle className={`w-4 h-4 mt-0.5 shrink-0 ${alert.severity === "Critical" ? "text-red-500" : "text-amber-500"}`} />
        <div className="flex-1 min-w-0">
          {/* Top row: type badge + time */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${sevBadge}`}>
                {alert.type}
              </span>
              {alert.severity === "Critical" && (
                <span className="text-[10px] font-bold text-red-500 animate-pulse">LIVE</span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground shrink-0">{alert.time}</span>
          </div>

          {/* Message */}
          <p className="text-xs text-foreground mb-2">{alert.message}</p>

          {/* Structured metadata tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="text-[10px] bg-muted/80 text-muted-foreground px-1.5 py-0.5 rounded flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" /> {alert.location}
            </span>
            <span className="text-[10px] bg-muted/80 text-muted-foreground px-1.5 py-0.5 rounded">
              {alert.sector}
            </span>
            {alert.suspect && (
              <span className="text-[10px] bg-muted/80 text-muted-foreground px-1.5 py-0.5 rounded">
                {alert.suspect}{alert.alias ? ` (${alert.alias})` : ""}
              </span>
            )}
            <span className="text-[10px] font-mono text-muted-foreground bg-muted/80 px-1.5 py-0.5 rounded">
              {alert.caseId}
            </span>
          </div>

          {/* Inline action buttons */}
          <div className="flex items-center gap-1.5 pt-1.5 border-t border-border/50">
            <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 gap-1 text-muted-foreground hover:text-foreground">
              <Eye className="w-3 h-3" /> View Dossier
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 text-[10px] px-2 gap-1 ${acknowledged ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => setAcknowledged(!acknowledged)}
            >
              <Check className="w-3 h-3" /> {acknowledged ? "Ack'd" : "Acknowledge"}
            </Button>
            <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 gap-1 text-muted-foreground hover:text-foreground">
              <Send className="w-3 h-3" /> Forward
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-[10px] px-2 gap-1 text-muted-foreground hover:text-red-500 ml-auto"
              onClick={() => setDismissed(true)}
            >
              <X className="w-3 h-3" /> Dismiss
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface Rec {
  id: number
  title: string
  description: string
  priority: string
  action: string
  buttonLabel: string
  assignee: string
  estTime: string
}

function RecommendationCard({ rec }: { rec: Rec }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const badgeStyle = rec.priority === "High"
    ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
    : rec.priority === "Medium"
    ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
    : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"

  const btnStyle = rec.priority === "High"
    ? "bg-red-600 hover:bg-red-500 text-white"
    : rec.priority === "Medium"
    ? "bg-amber-500 hover:bg-amber-400 text-white"
    : "bg-blue-600 hover:bg-blue-500 text-white"

  if (confirmed) {
    return (
      <motion.div variants={item} className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm font-semibold">{rec.buttonLabel} — Dispatched</span>
        </div>
        <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-1">
          {rec.assignee} notified. ETA {rec.estTime}.
        </p>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div variants={item} className="p-4 rounded-xl border bg-card shadow-sm hover:border-primary/50 transition-colors group">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{rec.title}</h4>
          <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${badgeStyle}`}>
            {rec.priority}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{rec.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground bg-muted px-2 py-1 rounded">
            {rec.action}
          </span>
          <Button
            size="sm"
            className={`h-7 text-xs px-3 gap-1.5 ${btnStyle}`}
            onClick={() => setShowConfirm(true)}
          >
            {rec.buttonLabel} <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </motion.div>

      {/* Confirmation overlay */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowConfirm(false)}>
          <div
            className="bg-card rounded-xl border shadow-xl w-full max-w-sm p-6 mx-4 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-sm">Confirm Dispatch</h4>
              <button onClick={() => setShowConfirm(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2 text-sm">
                <Lightbulb className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{rec.title}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{rec.assignee}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>Est. {rec.estTime}</span>
              </div>
              <div className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full inline-block ${badgeStyle}`}>
                {rec.priority} Priority
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
              <Button size="sm" className={`flex-1 ${btnStyle}`} onClick={() => { setConfirmed(true); setShowConfirm(false) }}>
                Confirm {rec.buttonLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
