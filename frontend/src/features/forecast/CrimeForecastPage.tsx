import { useState } from "react"
import { toast } from "sonner"
import { TrendingUp, RefreshCcw, Download, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

import { ForecastCards } from "./components/ForecastCards"
import { ForecastCharts } from "./components/ForecastCharts"
import { AIRecommendations } from "./components/AIRecommendations"

export function CrimeForecastPage() {
  const { t } = useTranslation()
  const [isPredicting, setIsPredicting] = useState(false)
  const [predictionVersion, setPredictionVersion] = useState(1)

  const handleRunPrediction = () => {
    setIsPredicting(true)
    toast.info("Running AI Crime Prediction Models...", {
      description: "Analyzing temporal patterns, weather factors, and historical FIR density."
    })

    setTimeout(() => {
      setIsPredicting(false)
      setPredictionVersion(prev => prev + 1)
      toast.success("Prediction Generation Complete!", {
        description: "Updated risk scores for Bengaluru North, Mysuru Urban, and Belagavi."
      })
    }, 1500)
  }

  const handleExportForecast = (format: "PDF" | "CSV") => {
    toast.success(`Exporting Crime Forecast Dossier (${format})`, {
      description: "Downloaded 7-day predictive risk matrix & patrol allocation schedule."
    })
  }

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-[#1F2937] flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-[#0F172A]" />
              {t("forecast.title")}
            </h1>
            <span className="bg-[#0F172A] text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded">
              v{predictionVersion}.0 Predictive Engine
            </span>
          </div>
          <p className="text-muted-foreground mt-1">
            {t("forecast.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleRunPrediction}
            disabled={isPredicting}
            className="gap-2 border-[#E2E8F0] text-[#1F2937] hover:bg-slate-100 cursor-pointer"
          >
            <RefreshCcw className={`h-4 w-4 ${isPredicting ? "animate-spin text-blue-600" : ""}`} />
            {isPredicting ? "Generating..." : t("forecast.runPrediction")}
          </Button>

          <Button 
            onClick={() => handleExportForecast("PDF")}
            className="gap-2 bg-[#0F172A] hover:bg-black text-white cursor-pointer"
          >
            <Download className="h-4 w-4" />
            {t("forecast.exportForecast")}
          </Button>

          <Button 
            variant="outline"
            onClick={() => handleExportForecast("CSV")}
            className="gap-1.5 border-[#E2E8F0] text-[#1F2937] hover:bg-slate-100 cursor-pointer hidden sm:inline-flex"
          >
            <FileSpreadsheet className="h-4 w-4" />
            CSV
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

        {/* Recommended Actions & Live Alerts Side Panel - Takes up 1/3 width */}
        <div className="lg:col-span-1 space-y-6">
          <AIRecommendations />
        </div>
        
      </div>
    </div>
  )
}
