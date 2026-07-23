import { TrendingUp, RefreshCcw, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

import { ForecastCards } from "./components/ForecastCards"
import { ForecastCharts } from "./components/ForecastCharts"
import { AIRecommendations } from "./components/AIRecommendations"

export function CrimeForecastPage() {
  const { t } = useTranslation()

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-foreground" />
            {t("forecast.title")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("forecast.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            {t("forecast.runPrediction")}
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            {t("forecast.exportForecast")}
          </Button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <ForecastCards />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* Charts & Trends - Takes up 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <ForecastCharts />
        </div>

        {/* AI Sidebar - Takes up 1/3 width */}
        <div className="lg:col-span-1">
          <AIRecommendations />
        </div>
        
      </div>
    </div>
  )
}
