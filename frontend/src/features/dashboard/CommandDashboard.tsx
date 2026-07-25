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
      {/* Page Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3.5">
          <div className="p-1.5 bg-white rounded-xl border border-[#E5E7EB] shadow-2xs shrink-0">
            <img 
              src={karnatakaEmblem} 
              alt="KSP Emblem" 
              className="h-9 w-auto object-contain" 
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-[#111827] tracking-tight">
                Command Operations Center
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Telemetry
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mt-0.5">
              State Crime Records Bureau • Active Command Portal for <strong className="text-[#111827]">{user?.name}</strong> ({user?.role || "Citizen"})
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/app/investigation")}
          className="self-start sm:self-auto h-10 px-4 rounded-xl bg-[#111827] text-white font-semibold text-xs hover:bg-[#1F2937] transition-colors shadow-2xs flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>{t("dashboard.createInvestigation")}</span>
        </button>
      </div>

      {/* AI Hub & Core Services Row (24px gap) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-2xl p-6 bg-white text-[#111827] border border-[#E5E7EB] shadow-2xs flex flex-col justify-between min-h-[220px]">
          <div className="space-y-3 max-w-md">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#111827] bg-[#F8FAFC] border border-[#E5E7EB] px-3 py-1 rounded-full w-fit">
              <Bot className="h-4 w-4 text-[#111827]" />
              <span>{t("dashboard.aiHub")}</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight text-[#111827] tracking-tight">
              {t("dashboard.actionInsights")}
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              {t("dashboard.aiDescription")}
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => navigate("/app/ai")}
              className="h-10 px-4 rounded-xl bg-[#111827] text-white text-xs font-bold hover:bg-[#1F2937] transition-colors inline-flex items-center gap-2 shadow-2xs group cursor-pointer"
            >
              <span>{t("dashboard.startAnalysis")}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-white" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between">
          <PopularServicesGrid />
        </div>
      </div>

      {/* Command KPIs Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">{t("dashboard.commandStatistics")}</h3>
          <span className="text-[10px] text-[#6B7280] font-mono">Real-time Telemetry</span>
        </div>
        <CommandKPIs />
      </div>

      {/* Active Cases Grid */}
      <ActiveCasesGrid />

      {/* Tactical Units Row */}
      <TacticalUnitsRow />

      {/* Intelligence & Dispatch Section (24px gap) */}
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
