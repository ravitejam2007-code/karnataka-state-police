import { useState } from "react"
import { PieChart, Activity, Map, Users, Calendar, BrainCircuit, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

import { AnalyticsFilters } from "./components/AnalyticsFilters"
import { AIInsightsPanel } from "./components/AIInsightsPanel"

// Chart components
import { OverviewCharts } from "./components/charts/OverviewCharts"
import { CrimeTypeCharts } from "./components/charts/CrimeTypeCharts"
import { DistrictCharts } from "./components/charts/DistrictCharts"
import { DemographicsCharts } from "./components/charts/DemographicsCharts"
import { SeasonalityCharts } from "./components/charts/SeasonalityCharts"
import { BehaviorCharts } from "./components/charts/BehaviorCharts"

const TABS = [
  { id: "overview", label: "analytics.tabs.overview", icon: Activity },
  { id: "crime-types", label: "analytics.tabs.crime-types", icon: PieChart },
  { id: "district", label: "analytics.tabs.district", icon: Map },
  { id: "demographics", label: "analytics.tabs.demographics", icon: Users },
  { id: "seasonality", label: "analytics.tabs.seasonality", icon: Calendar },
  { id: "behavior", label: "analytics.tabs.behavior", icon: BrainCircuit },
]

export function CrimeAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("analytics.title")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("analytics.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={isFilterOpen ? "bg-muted text-foreground" : ""}
          >
            <Filter className="mr-2 h-4 w-4" />
            {t("analytics.filters")}
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            {t("analytics.exportReport")}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:flex-row gap-6 min-h-0 overflow-hidden">
        {/* Left/Main Column - Charts */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-card border">
          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto border-b hide-scrollbar shrink-0">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                    ${isActive 
                      ? "border-primary text-primary" 
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"}
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {t(tab.label)}
                </button>
              )
            })}
          </div>

          {/* Filters Panel (Collapsible) */}
          {isFilterOpen && (
            <div className="border-b p-4 shrink-0 bg-muted/20 animate-in slide-in-from-top-2">
              <AnalyticsFilters />
            </div>
          )}

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="animate-in fade-in duration-500">
              {activeTab === "overview" && <OverviewCharts />}
              {activeTab === "crime-types" && <CrimeTypeCharts />}
              {activeTab === "district" && <DistrictCharts />}
              {activeTab === "demographics" && <DemographicsCharts />}
              {activeTab === "seasonality" && <SeasonalityCharts />}
              {activeTab === "behavior" && <BehaviorCharts />}
            </div>
          </div>
        </div>

        {/* Right Column - AI Insights */}
        <div className="w-full lg:w-80 xl:w-96 shrink-0 flex flex-col min-h-0">
          <AIInsightsPanel activeTab={activeTab} />
        </div>
      </div>
    </div>
  )
}
