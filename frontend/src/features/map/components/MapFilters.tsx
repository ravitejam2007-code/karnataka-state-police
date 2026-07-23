import type { MapFilterState } from "../types"

// I will just use standard HTML elements with Tailwind for simplicity and robust UI.

interface MapFiltersProps {
  filters: MapFilterState
  setFilters: (filters: MapFilterState) => void
}

export function MapFilters({ filters, setFilters }: MapFiltersProps) {
  const updateFilter = (key: keyof MapFilterState, value: any) => {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <div className="bg-card text-card-foreground p-4 space-y-6">
      
      {/* Crime Type Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Crime Type</label>
        <select 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={filters.crimeType}
          onChange={(e) => updateFilter("crimeType", e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Theft">Theft</option>
          <option value="Assault">Assault</option>
          <option value="Cyber Crime">Cyber Crime</option>
          <option value="Fraud">Fraud</option>
          <option value="Traffic Violation">Traffic Violation</option>
        </select>
      </div>

      {/* Severity Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Severity</label>
        <select 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={filters.severity}
          onChange={(e) => updateFilter("severity", e.target.value)}
        >
          <option value="All">All Severities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* District Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">District</label>
        <select 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={filters.district}
          onChange={(e) => updateFilter("district", e.target.value)}
        >
          <option value="All">All Districts</option>
          <option value="Bangalore Urban">Bangalore Urban</option>
          <option value="Mysore">Mysore</option>
          <option value="Dharwad">Dharwad</option>
          <option value="Dakshina Kannada">Dakshina Kannada</option>
        </select>
      </div>

      <hr className="border-muted" />

      {/* Layer Toggles */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Map Layers</h3>
        
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-muted-foreground">Show Heatmap</span>
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-gray-300"
            checked={filters.showHeatmap}
            onChange={(e) => updateFilter("showHeatmap", e.target.checked)}
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-muted-foreground">Cluster Markers</span>
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-gray-300"
            checked={filters.showClusters}
            onChange={(e) => updateFilter("showClusters", e.target.checked)}
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-muted-foreground">Police Stations</span>
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-gray-300"
            checked={filters.showPoliceStations}
            onChange={(e) => updateFilter("showPoliceStations", e.target.checked)}
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-muted-foreground">District Boundaries</span>
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-gray-300"
            checked={filters.showBoundaries}
            onChange={(e) => updateFilter("showBoundaries", e.target.checked)}
          />
        </label>
      </div>

      {/* Timeline Slider */}
      <div className="space-y-2 pt-4 border-t border-muted">
        <label className="text-sm font-semibold flex justify-between">
          <span>Timeline (Days Ago)</span>
          <span className="text-primary">{filters.timeRange[1]} Days</span>
        </label>
        <input 
          type="range" 
          min="1" 
          max="30" 
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          value={filters.timeRange[1]}
          onChange={(e) => updateFilter("timeRange", [filters.timeRange[0], parseInt(e.target.value)])}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Today</span>
          <span>30 Days</span>
        </div>
      </div>
    </div>
  )
}
