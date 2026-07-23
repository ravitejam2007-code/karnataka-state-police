import type { CrimeIncident, PoliceStation } from "./types"

const BANGALORE = { lat: 12.9716, lng: 77.5946 }
const MYSORE = { lat: 12.2958, lng: 76.6394 }
const HUBLI = { lat: 15.3647, lng: 75.1240 }
const MANGALORE = { lat: 12.9141, lng: 74.8560 }

// Helper to generate random offset
const offset = (coord: number, variance: number) => coord + (Math.random() - 0.5) * variance

export const MOCK_INCIDENTS: CrimeIncident[] = [
  ...Array.from({ length: 50 }).map((_, i) => ({
    id: `INC-BLR-${i}`,
    type: ["Theft", "Assault", "Cyber Crime", "Fraud", "Traffic Violation"][Math.floor(Math.random() * 5)],
    severity: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)] as any,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: { lat: offset(BANGALORE.lat, 0.1), lng: offset(BANGALORE.lng, 0.1) },
    district: "Bangalore Urban",
    description: "Incident reported in Bangalore area."
  })),
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: `INC-MYS-${i}`,
    type: ["Theft", "Assault", "Cyber Crime", "Fraud", "Traffic Violation"][Math.floor(Math.random() * 5)],
    severity: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)] as any,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: { lat: offset(MYSORE.lat, 0.05), lng: offset(MYSORE.lng, 0.05) },
    district: "Mysore",
    description: "Incident reported in Mysore area."
  })),
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: `INC-HUB-${i}`,
    type: ["Theft", "Assault", "Traffic Violation"][Math.floor(Math.random() * 3)],
    severity: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)] as any,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: { lat: offset(HUBLI.lat, 0.05), lng: offset(HUBLI.lng, 0.05) },
    district: "Dharwad",
    description: "Incident reported in Hubli area."
  })),
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: `INC-MAN-${i}`,
    type: ["Theft", "Assault", "Smuggling"][Math.floor(Math.random() * 3)],
    severity: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)] as any,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: { lat: offset(MANGALORE.lat, 0.05), lng: offset(MANGALORE.lng, 0.05) },
    district: "Dakshina Kannada",
    description: "Incident reported in Mangalore area."
  }))
]

export const MOCK_POLICE_STATIONS: PoliceStation[] = [
  { id: "PS-01", name: "Central Police Station, Bangalore", district: "Bangalore Urban", location: BANGALORE, contact: "080-22942222" },
  { id: "PS-02", name: "Mysore City Police", district: "Mysore", location: MYSORE, contact: "0821-2418139" },
  { id: "PS-03", name: "Hubli Town Police", district: "Dharwad", location: HUBLI, contact: "0836-2233211" },
  { id: "PS-04", name: "Mangalore North PS", district: "Dakshina Kannada", location: MANGALORE, contact: "0824-2220800" },
]
