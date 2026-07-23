export interface Location {
  lat: number
  lng: number
}

export interface CrimeIncident {
  id: string
  type: string
  severity: "High" | "Medium" | "Low"
  timestamp: string
  location: Location
  district: string
  description: string
}

export interface PoliceStation {
  id: string
  name: string
  district: string
  location: Location
  contact: string
}

export interface MapFilterState {
  crimeType: string
  severity: string
  district: string
  timeRange: [number, number] // Start and end time as unix timestamps or slider values (0-100)
  showHeatmap: boolean
  showClusters: boolean
  showPoliceStations: boolean
  showBoundaries: boolean
}
