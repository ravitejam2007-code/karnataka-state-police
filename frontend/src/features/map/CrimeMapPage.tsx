import { useState, useEffect } from "react"
import { MapFilters } from "./components/MapFilters"
import { CrimeMap } from "./components/CrimeMap"
import { MOCK_INCIDENTS, MOCK_POLICE_STATIONS } from "./mockData"
import type { MapFilterState } from "./types"
import { Map, Layers, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContextualLoader } from "@/components/ui/contextual-loader"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"

export function CrimeMapPage() {
  const [filters, setFilters] = useState<MapFilterState>({
    crimeType: "All",
    severity: "All",
    district: "All",
    timeRange: [0, 30],
    showHeatmap: false,
    showClusters: true,
    showPoliceStations: true,
    showBoundaries: true,
  })
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(t)
  }, [])

  const handleReset = () => {
    setFilters({
      crimeType: "All",
      severity: "All",
      district: "All",
      timeRange: [0, 30],
      showHeatmap: false,
      showClusters: true,
      showPoliceStations: true,
      showBoundaries: true,
    })
  }

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Map className="h-8 w-8 text-foreground" />
            {t("map.title")}
          </h1>
          <p className="text-muted-foreground mt-1">{t("map.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            {t("map.resetMap")}
          </Button>
          <Button>
            <Layers className="mr-2 h-4 w-4" />
            {t("map.exportData")}
          </Button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Filters */}
        <div className="w-full md:w-80 flex-shrink-0 bg-card border rounded-sm overflow-y-auto">
          <div className="p-4 border-b bg-muted/20">
            <h2 className="font-semibold flex items-center gap-2">
              <FilterIcon className="h-4 w-4 text-muted-foreground" />
              {t("map.mapControls")}
            </h2>
          </div>
          <MapFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Map Container */}
        <div className="flex-1 bg-muted/10 rounded-sm relative min-h-[500px] overflow-hidden">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-card z-10"
              >
                <ContextualLoader icon={Map} message={t("map.loading")} />
              </motion.div>
            ) : (
              <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full"
              >
                <CrimeMap 
                  incidents={MOCK_INCIDENTS} 
                  policeStations={MOCK_POLICE_STATIONS} 
                  filters={filters} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}

function FilterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}
