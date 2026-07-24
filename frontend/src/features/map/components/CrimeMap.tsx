import { useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, GeoJSON } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import L from "leaflet"
import type { CrimeIncident, PoliceStation, MapFilterState } from "../types"
import { HeatmapLayer } from "./HeatmapLayer"
import { MOCK_DISTRICTS_GEOJSON } from "../mockGeoJson"

import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

// Fix for default marker icons in Leaflet with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

const createPulseIcon = (color: string) => {
  return L.divIcon({
    className: "custom-pulse-icon",
    html: `
      <div style="
        width: 16px; 
        height: 16px; 
        background-color: ${color}; 
        border-radius: 50%; 
        box-shadow: 0 0 0 rgba(0,0,0, 0.4);
        animation: pulse 2s infinite;
        border: 2px solid white;
      "></div>
      <style>
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 ${color}80; }
          70% { box-shadow: 0 0 0 10px rgba(0,0,0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0,0,0, 0); }
        }
      </style>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  })
}

const policeStationIcon = L.divIcon({
  className: "police-station-icon",
  html: `
    <div style="
      width: 24px;
      height: 24px;
      background-color: #1d4ed8;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    ">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
})

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "High": return "#ef4444" // red-500
    case "Medium": return "#f59e0b" // amber-500
    case "Low": return "#10b981" // emerald-500
    default: return "#6b7280" // gray-500
  }
}

interface CrimeMapProps {
  incidents: CrimeIncident[]
  policeStations: PoliceStation[]
  filters: MapFilterState
}

export function CrimeMap({ incidents, policeStations, filters }: CrimeMapProps) {
  const karnatakaCenter: [number, number] = [15.3173, 75.7139]

  // Filter incidents based on criteria
  const filteredIncidents = useMemo(() => {
    const maxDaysAgo = filters.timeRange[1]
    const cutoffTime = Date.now() - (maxDaysAgo * 24 * 60 * 60 * 1000)

    return incidents.filter(inc => {
      const incTime = new Date(inc.timestamp).getTime()
      if (incTime < cutoffTime) return false
      
      if (filters.crimeType !== "All" && inc.type !== filters.crimeType) return false
      if (filters.severity !== "All" && inc.severity !== filters.severity) return false
      if (filters.district !== "All" && inc.district !== filters.district) return false

      return true
    })
  }, [incidents, filters])

  // Heatmap points
  const heatPoints = useMemo<[number, number, number][]>(() => {
    return filteredIncidents.map(inc => {
      const intensity = inc.severity === "High" ? 1.0 : inc.severity === "Medium" ? 0.6 : 0.3
      return [inc.location.lat, inc.location.lng, intensity]
    })
  }, [filteredIncidents])

  const renderMarkers = () => {
    return filteredIncidents.map(inc => (
      <Marker 
        key={inc.id} 
        position={[inc.location.lat, inc.location.lng]}
        icon={createPulseIcon(getSeverityColor(inc.severity))}
      >
        <Popup className="rounded-lg shadow-lg">
          <div className="p-1">
            <h3 className="font-bold text-sm mb-1">{inc.type}</h3>
            <p className="text-xs text-muted-foreground mb-2">{new Date(inc.timestamp).toLocaleString()}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2 py-1 rounded bg-muted">
                {inc.district}
              </span>
              <span className={`text-xs font-semibold px-2 py-1 rounded text-white`} style={{ backgroundColor: getSeverityColor(inc.severity) }}>
                {inc.severity} Priority
              </span>
            </div>
            <p className="text-xs">{inc.description}</p>
          </div>
        </Popup>
      </Marker>
    ))
  }

  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden border shadow-sm">
      <MapContainer 
        center={karnatakaCenter} 
        zoom={7} 
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="topright" />

        {/* Heatmap Layer */}
        {filters.showHeatmap && heatPoints.length > 0 && (
          <HeatmapLayer points={heatPoints} />
        )}

        {/* District Boundaries Layer */}
        {filters.showBoundaries && (
          <GeoJSON 
            data={MOCK_DISTRICTS_GEOJSON} 
            style={() => ({
              color: "#3b82f6",
              weight: 2,
              opacity: 0.5,
              fillOpacity: 0.1,
              dashArray: "5, 5"
            })}
          />
        )}

        {/* Police Stations Layer */}
        {filters.showPoliceStations && policeStations.map(ps => (
          <Marker 
            key={ps.id} 
            position={[ps.location.lat, ps.location.lng]}
            icon={policeStationIcon}
          >
            <Popup>
              <div className="font-semibold">{ps.name}</div>
              <div className="text-xs text-muted-foreground">{ps.contact}</div>
            </Popup>
          </Marker>
        ))}

        {/* Cluster / Normal Markers Layer */}
        {filters.showClusters && !filters.showHeatmap ? (
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={50}
          >
            {renderMarkers()}
          </MarkerClusterGroup>
        ) : !filters.showHeatmap ? (
          <>{renderMarkers()}</>
        ) : null}
      </MapContainer>
      
      {/* Legend Overlay */}
      <div className="absolute bottom-6 right-6 z-20 bg-white/95 backdrop-blur p-3.5 rounded-xl shadow-lg border border-[#E2E8F0] text-xs text-[#1E293B] font-sans min-w-[170px]">
        <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#64748B] mb-2.5 border-b border-[#E2E8F0] pb-1">GIS Symbology Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse border border-white shadow-2xs"></div>
            <span className="font-semibold text-red-700">High Priority Incident</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 border border-white shadow-2xs"></div>
            <span className="font-medium text-amber-700">Medium Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-600 border border-white shadow-2xs"></div>
            <span className="font-medium text-emerald-700">Low Priority</span>
          </div>
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#E2E8F0]">
            <div className="w-4 h-4 rounded bg-[#2563EB] text-white flex items-center justify-center font-bold text-[9px] shadow-2xs">
              PS
            </div>
            <span className="font-semibold text-[#1E293B]">Police Station HQ</span>
          </div>
        </div>
      </div>
    </div>
  )
}
