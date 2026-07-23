import type { IntelligenceResponse } from "../types";
import { firs } from "./firs";
import { persons } from "./entities";

export const dummyResponses: Record<string, IntelligenceResponse> = {
  "robbery_hotspots": {
    id: "RESP-001",
    queryIntent: "Show robbery hotspots in Mysuru",
    timestamp: new Date().toISOString(),
    items: [
      {
        id: "exec-1",
        type: "ExecutiveSummary",
        data: {
          title: "Robbery Hotspot Analysis: Mysuru",
          summary: "Analysis of recent robbery cases in Mysuru district indicates a concentration of incidents in Devaraja and Mandi Mohalla areas. 12 cases reported in the last 6 months, showing a 15% upward trend."
        }
      },
      {
        id: "map-1",
        type: "InteractiveMap",
        data: {
          center: [12.2958, 76.6394],
          zoom: 12,
          markers: [
            { lat: 12.3052, lng: 76.6552, label: "Devaraja PS (Hotspot)", type: "Hotspot" },
            { lat: 12.3150, lng: 76.6500, label: "Mandi Mohalla", type: "Hotspot" }
          ]
        }
      },
      {
        id: "stats-1",
        type: "CrimeStatistics",
        data: {
          totalCases: 12,
          resolved: 4,
          active: 8,
          trend: "+15%"
        }
      },
      {
        id: "timeline-1",
        type: "CrimeTimeline",
        data: {
          events: [
            { date: "2026-07-10", description: "Armed robbery at Devaraja Mohalla" },
            { date: "2026-06-25", description: "Chain snatching incident near Palace" }
          ]
        }
      },
      {
        id: "rec-1",
        type: "AIRecommendation",
        data: {
          steps: [
            "Deploy additional night patrols in Devaraja Mohalla",
            "Review CCTV footage at key junctions near KR Circle",
            "Monitor known associates of repeat offenders in the area"
          ]
        }
      }
    ]
  },
  "repeat_offenders": {
    id: "RESP-002",
    queryIntent: "Show repeat offenders",
    timestamp: new Date().toISOString(),
    items: [
      {
        id: "exec-2",
        type: "ExecutiveSummary",
        data: {
          title: "Repeat Offender Analysis",
          summary: "Identified 2 individuals with multiple associated FIRs. High risk indicated for 'Raju' based on recent activity."
        }
      },
      {
        id: "persons-1",
        type: "RelatedPersons",
        data: persons.filter(p => p.criminalHistory.length > 0)
      },
      {
        id: "graph-1",
        type: "RelationshipGraph",
        data: {
          nodes: [
            { id: "P-001", label: "Raju", type: "Person" },
            { id: "P-002", label: "Kumar", type: "Person" },
            { id: "FIR-2026-0123", label: "0123/2026", type: "FIR" },
            { id: "FIR-2026-0145", label: "0145/2026", type: "FIR" }
          ],
          edges: [
            { source: "P-001", target: "FIR-2026-0123" },
            { source: "P-002", target: "FIR-2026-0123" },
            { source: "P-001", target: "FIR-2026-0145" }
          ]
        }
      },
      {
        id: "firs-1",
        type: "RelatedFIRs",
        data: firs.filter(f => f.accusedIds.includes("P-001") || f.accusedIds.includes("P-002"))
      },
      {
        id: "score-1",
        type: "ConfidenceScore",
        data: { score: 95, label: "High Confidence" }
      },
      {
        id: "rec-2",
        type: "AIRecommendation",
        data: {
          steps: [
            "Initiate surveillance on Suspect 'Raju'",
            "Issue lookout notice across bordering stations"
          ]
        }
      }
    ]
  }
};
