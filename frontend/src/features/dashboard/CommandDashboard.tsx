import { useTranslation } from "react-i18next"
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

import karnatakaEmblem from "@/assets/karnataka-emblem.png"

import { useAuthStore } from "@/store/useAuthStore"

export function CommandDashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuthStore()

  return (
    <div className="flex flex-col space-y-6 pb-8 font-sans">
      {/* Clean Top Action Bar (Replaces large Welcome Banner & High Alert Bar) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/80">
        <div className="flex items-center gap-3">
          <div className="p-1 bg-white rounded-md border border-border shadow-2xs shrink-0">
            <img 
              src={karnatakaEmblem} 
              alt="KSP Emblem" 
              className="h-7 w-auto object-contain" 
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-foreground tracking-tight">
                Command Operations Center
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Feed
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              State Crime Records Bureau • Command Active for <strong className="text-foreground">{user?.name}</strong> ({user?.role || "Citizen"})
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/app/investigation")}
          className="self-start sm:self-auto px-4 py-2 rounded-lg bg-[#2563EB] text-white font-semibold text-xs hover:bg-[#1D4ED8] transition-colors shadow-2xs flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>{t("dashboard.createInvestigation")}</span>
        </button>
      </div>

      {/* AI Hub & Core Services Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 rounded-xl p-6 bg-white text-[#1E293B] border border-[#E2E8F0] shadow-2xs flex flex-col justify-between min-h-[200px]">
          <div className="space-y-2.5 max-w-md">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full w-fit">
              <Bot className="h-3.5 w-3.5" />
              <span>{t("dashboard.aiHub")}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold leading-tight text-[#1E293B] tracking-tight">
              {t("dashboard.actionInsights")}
            </h2>
            <p className="text-xs text-[#475569] leading-relaxed">
              {t("dashboard.aiDescription")}
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => navigate("/app/ai")}
              className="px-4 py-2 rounded-lg bg-[#2563EB] text-white text-xs font-bold hover:bg-[#1D4ED8] transition-colors inline-flex items-center gap-2 shadow-2xs group cursor-pointer"
            >
              <span>{t("dashboard.startAnalysis")}</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform text-white" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between">
          <PopularServicesGrid />
        </div>
      </div>

      {/* Command KPIs */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("dashboard.commandStatistics")}</h3>
          <span className="text-[10px] text-muted-foreground font-mono">Real-time Telemetry</span>
        </div>
        <CommandKPIs />
      </div>

      {/* Active Cases Grid */}
      <ActiveCasesGrid />

      {/* Tactical Units Row */}
      <TacticalUnitsRow />

      {/* Intelligence & Dispatch Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 space-y-5">
          <IntelligenceSummary />
          <Weather />
        </div>
        <div className="lg:col-span-6 space-y-5">
          <ImportantNotifications />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
