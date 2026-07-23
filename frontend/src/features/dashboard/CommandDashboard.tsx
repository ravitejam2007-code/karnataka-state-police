import { useTranslation } from "react-i18next"
import { EmergencyAlerts } from "./components/EmergencyAlerts"
import { CommandKPIs } from "./components/CommandKPIs"
import { PopularServicesGrid } from "./components/PopularServicesGrid"
import { ActiveCasesGrid } from "./components/ActiveCasesGrid"
import { TacticalUnitsRow } from "./components/TacticalUnitsRow"
import { IntelligenceSummary } from "./components/IntelligenceSummary"
import { Weather } from "./components/Weather"
import { ImportantNotifications } from "./components/ImportantNotifications"
import { QuickActions } from "./components/QuickActions"
import { Plus, ArrowRight, Bot } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"

import karnatakaEmblem from "@/assets/karnataka-emblem.png"

export function CommandDashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuthStore()

  return (
    <div className="flex flex-col space-y-8 pb-8">
      <EmergencyAlerts />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img 
            src={karnatakaEmblem} 
            alt="Karnataka State Police Emblem" 
            className="h-12 w-auto object-contain shrink-0 drop-shadow-xs" 
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {t("dashboard.welcome", { name: user?.name || "Officer" })}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {t("dashboard.stateCrimeRecords")}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/cases")}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-foreground text-background font-semibold text-xs hover:bg-primary hover:text-primary-foreground transition-all shadow-sm flex items-center gap-2 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>{t("dashboard.createInvestigation")}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-6 relative rounded-2xl p-6 sm:p-8 bg-primary text-white shadow-sm overflow-hidden flex flex-col justify-between min-h-[220px]">

          <div className="relative z-10 space-y-3 max-w-md">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-100 px-3 py-1 rounded-full w-fit">
              <Bot className="h-3.5 w-3.5" />
              <span>{t("dashboard.aiHub")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-white">
              {t("dashboard.actionInsights")}
            </h2>
            <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
              {t("dashboard.aiDescription")}
            </p>
          </div>

          <div className="relative z-10 pt-6">
            <button
              onClick={() => navigate("/ai")}
              className="px-4 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2 shadow-xs group"
            >
              <span>{t("dashboard.startAnalysis")}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between">
          <PopularServicesGrid />
        </div>

      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-foreground tracking-tight">{t("dashboard.commandStatistics")}</h3>
        <CommandKPIs />
      </div>

      <ActiveCasesGrid />

      <TacticalUnitsRow />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-6">
          <IntelligenceSummary />
          <Weather />
        </div>
        <div className="lg:col-span-6 space-y-6">
          <ImportantNotifications />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
