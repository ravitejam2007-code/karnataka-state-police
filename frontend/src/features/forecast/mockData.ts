export const PREDICTION_METRICS = {
  nextWeekTotal: 142,
  trend: "+5.2%",
  highRiskAreas: 12,
  highRiskBreakdown: { critical: 3, moderate: 5, low: 4 },
  emergingTypes: [
    { name: "Cyber Fraud", spike: "+24%" },
    { name: "Vehicle Theft", spike: "+12%" },
  ],
  activeAlerts: 8,
  activeAlertBreakdown: { critical: 3, moderate: 5 },
}

export const FORECAST_DATA = [
  { date: "Oct 01", actual: 120, predicted: 122, confidenceMin: 110, confidenceMax: 130 },
  { date: "Oct 08", actual: 132, predicted: 135, confidenceMin: 120, confidenceMax: 145 },
  { date: "Oct 15", actual: 115, predicted: 112, confidenceMin: 100, confidenceMax: 125 },
  { date: "Oct 22", actual: 140, predicted: 138, confidenceMin: 125, confidenceMax: 155 },
  { date: "Oct 29", actual: null, predicted: 145, confidenceMin: 130, confidenceMax: 165 },
  { date: "Nov 05", actual: null, predicted: 152, confidenceMin: 135, confidenceMax: 175 },
  { date: "Nov 12", actual: null, predicted: 148, confidenceMin: 125, confidenceMax: 170 },
]

export const RISK_AREAS = [
  { district: "South Zone", riskScore: 88, primaryThreat: "Burglary", trend: "up", hotspots: ["Koramangala", "HSR Layout", "BTM Layout"] },
  { district: "East Zone", riskScore: 75, primaryThreat: "Vehicle Theft", trend: "up", hotspots: ["Whitefield", "KR Puram", "Marathahalli"] },
  { district: "Central Zone", riskScore: 62, primaryThreat: "Cyber Crime", trend: "stable", hotspots: ["MG Road", "Indiranagar", "Shivajinagar"] },
  { district: "North Zone", riskScore: 45, primaryThreat: "Assault", trend: "down", hotspots: ["Yeshwanthpur", "Peenya", "Dasarahalli"] },
]

export const RECOMMENDATIONS = [
  {
    id: 1,
    title: "Increase Night Patrols in South Zone",
    description: "AI model predicts a 15% increase in residential burglaries between 1AM and 4AM.",
    priority: "High",
    action: "Deploy 2 additional QRT vehicles",
    buttonLabel: "Dispatch QRT",
    assignee: "South Zone Patrol Unit",
    estTime: "30 min",
  },
  {
    id: 2,
    title: "Cyber Crime Awareness Campaign",
    description: "Spike in phishing complaints reported in Central Zone IT corridors.",
    priority: "Medium",
    action: "Initiate community outreach",
    buttonLabel: "Launch Campaign",
    assignee: "Cyber Crime Cell",
    estTime: "48 hours",
  },
  {
    id: 3,
    title: "Traffic Enforcement at Silk Board",
    description: "Historical data suggests high probability of traffic violations this weekend.",
    priority: "Low",
    action: "Schedule automated speed traps",
    buttonLabel: "Schedule Traps",
    assignee: "Traffic Management Unit",
    estTime: "4 hours",
  }
]

export const ALERTS = [
  {
    id: 101,
    caseId: "FIR/2026/BLR-1042",
    type: "Repeat Offender",
    severity: "Critical",
    message: "Known syndicate active in East Zone.",
    location: "Whitefield",
    sector: "East Zone",
    suspect: "Ramesh Gowda",
    alias: "Ramu",
    time: "2 hours ago",
  },
  {
    id: 102,
    caseId: "FIR/2026/CYB-221",
    type: "Anomaly Detected",
    severity: "Moderate",
    message: "Unusual spike in petty thefts in North Zone market.",
    location: "Yeshwanthpur Market",
    sector: "North Zone",
    suspect: null,
    alias: null,
    time: "5 hours ago",
  },
  {
    id: 103,
    caseId: "FIR/2026/BLR-1089",
    type: "Absconder Alert",
    severity: "Critical",
    message: "Previously arrested absconder spotted near railway station.",
    location: "Majestic",
    sector: "Central Zone",
    suspect: "Venkatesh",
    alias: "Venu",
    time: "30 min ago",
  },
]
