import { useState, useEffect } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { CrimeMap } from "./components/CrimeMap"
import { MOCK_INCIDENTS, MOCK_POLICE_STATIONS } from "./mockData"
import type { MapFilterState } from "./types"
import { 
  Map as MapIcon, 
  Layers, 
  RefreshCcw, 
  Search, 
  Flame, 
  Building2, 
  SlidersHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ContextualLoader } from "@/components/ui/contextual-loader"
import { motion, AnimatePresence } from "framer-motion"

export function CrimeMapPage() {
  const { isKannada } = useLanguage()
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

  const [searchQuery, setSearchQuery] = useState("")
  const [showFilterDrawer, setShowFilterDrawer] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
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
    setSearchQuery("")
  }

  const filteredIncidents = MOCK_INCIDENTS.filter(inc => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return inc.type.toLowerCase().includes(q) || 
             inc.district.toLowerCase().includes(q) || 
             inc.description.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] font-sans relative overflow-hidden">
      {/* Top GIS Command Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-3 shadow-2xs z-20 shrink-0 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#111827]">
            <MapIcon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#111827] leading-tight flex items-center gap-2">
              {isKannada ? "ಅಪರಾಧ ಮುನ್ಸೂಚನೆ ಜಿಐಎಸ್ ಭೂಪಟ" : "Statewide Predictive Crime GIS Dashboard"}
            </h1>
            <span className="text-xs text-[#6B7280]">
              {isKannada ? "ಕರ್ನಾಟಕ ಪೊಲೀಸ್ ಭೌಗೋಳಿಕ ಮಾಹಿತಿ ವ್ಯವಸ್ಥೆ" : "Karnataka Police Spatial Intelligence & GIS Unit"}
            </span>
          </div>
        </div>

        {/* Floating Quick Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Search */}
          <div className="relative w-48 sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748B]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isKannada ? "ಜಿಲ್ಲೆ / ಅಪರಾಧ ಹುಡುಕಿ..." : "Search District or Crime..."}
              className="pl-8 h-8 text-xs bg-[#F8FAFC] border-[#E2E8F0]"
            />
          </div>

          <Button
            variant={showFilterDrawer ? "secondary" : "outline"}
            size="sm"
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className="h-8 text-xs border-[#E2E8F0] text-[#1E293B] gap-1.5"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>{isKannada ? "ಫಿಲ್ಟರ್‌ಗಳು" : "GIS Controls"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-8 text-xs border-[#E2E8F0] text-[#1E293B] gap-1"
          >
            <RefreshCcw className="h-3.5 w-3.5 text-[#64748B]" />
            <span>{isKannada ? "ಮರುಹೊಂದಿಸಿ" : "Reset"}</span>
          </Button>
        </div>
      </div>

      {/* Full-Screen GIS Map Viewport */}
      <div className="flex-1 relative w-full h-full min-h-[550px] overflow-hidden">
        
        {/* Floating Collapsible Controls Card */}
        <AnimatePresence>
          {showFilterDrawer && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 w-[calc(100vw-2.5rem)] max-w-xs sm:w-72 bg-white/95 backdrop-blur border border-[#E2E8F0] rounded-xl shadow-lg p-3.5 sm:p-4 space-y-3 sm:space-y-4 font-sans text-xs text-[#1E293B]"
            >
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2 font-bold uppercase tracking-wider text-[11px]">
                <span className="flex items-center gap-1.5 text-[#2563EB]">
                  <Layers className="h-4 w-4" /> Layer Visibility
                </span>
                <button 
                  onClick={() => setShowFilterDrawer(false)} 
                  className="text-[#64748B] hover:text-[#1E293B] p-1 rounded-lg min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                  aria-label="Close Controls"
                >
                  ✕
                </button>
              </div>

              {/* Layer Toggles */}
              <div className="space-y-2">
                <label className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] cursor-pointer">
                  <span className="flex items-center gap-2 font-semibold">
                    <Flame className="h-4 w-4 text-red-600" />
                    Heatmap Layer
                  </span>
                  <input
                    type="checkbox"
                    checked={filters.showHeatmap}
                    onChange={(e) => setFilters(f => ({ ...f, showHeatmap: e.target.checked }))}
                    className="accent-[#2563EB] h-4 w-4"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] cursor-pointer">
                  <span className="flex items-center gap-2 font-semibold">
                    <Layers className="h-4 w-4 text-[#2563EB]" />
                    Marker Clusters
                  </span>
                  <input
                    type="checkbox"
                    checked={filters.showClusters}
                    onChange={(e) => setFilters(f => ({ ...f, showClusters: e.target.checked }))}
                    className="accent-[#2563EB] h-4 w-4"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] cursor-pointer">
                  <span className="flex items-center gap-2 font-semibold">
                    <Building2 className="h-4 w-4 text-[#2563EB]" />
                    Police Stations
                  </span>
                  <input
                    type="checkbox"
                    checked={filters.showPoliceStations}
                    onChange={(e) => setFilters(f => ({ ...f, showPoliceStations: e.target.checked }))}
                    className="accent-[#2563EB] h-4 w-4"
                  />
                </label>
              </div>

              {/* Severity Filter */}
              <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0]">
                <span className="font-bold text-[10px] uppercase text-[#64748B]">Crime Severity</span>
                <select
                  value={filters.severity}
                  onChange={(e) => setFilters(f => ({ ...f, severity: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-[#E2E8F0] bg-white text-xs text-[#1E293B]"
                >
                  <option value="All">All Priority Levels</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Container */}
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <ContextualLoader icon={MapIcon} message={isKannada ? "ಜಿಐಎಸ್ ನಕ್ಷೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ..." : "Initializing Professional Police GIS Layer..."} />
          </div>
        ) : (
          <CrimeMap
            incidents={filteredIncidents}
            policeStations={MOCK_POLICE_STATIONS}
            filters={filters}
          />
        )}

        {/* Floating Bottom Left Telemetry Status */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 bg-white/95 backdrop-blur border border-[#E2E8F0] px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg shadow-md flex items-center gap-2 sm:gap-4 flex-wrap text-[10px] sm:text-[11px] text-[#475569] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-bold text-[#1E293B]">GIS Telemetry</span>
          </div>
          <span className="text-[#CBD5E1] hidden sm:inline">|</span>
          <div>Total Incidents: <strong className="text-[#2563EB]">{filteredIncidents.length}</strong></div>
          <span className="text-[#CBD5E1] hidden sm:inline">|</span>
          <div className="hidden xs:block">15.3173° N, 75.7139° E</div>
        </div>

      </div>
    </div>
  )
}
