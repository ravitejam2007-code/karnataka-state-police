import type { FIR } from "../types";

export const firs: FIR[] = [
  {
    id: "FIR-2026-0123",
    firNumber: "0123/2026",
    year: 2026,
    stationId: "S-0201",
    dateReported: "2026-07-10T14:30:00Z",
    dateOfOccurrence: "2026-07-10T02:00:00Z",
    complainantName: "Srinivas Rao",
    accusedIds: ["P-001", "P-002"],
    victimIds: ["P-005"],
    sectionsIPC: ["392", "397"],
    crimeCategory: "Robbery",
    status: "Open",
    investigatingOfficerId: "O-001",
    synopsis: "Armed robbery at a jewelry store in Devaraja Mohalla. Two suspects escaped on a motorcycle."
  },
  {
    id: "FIR-2026-0145",
    firNumber: "0145/2026",
    year: 2026,
    stationId: "S-0202",
    dateReported: "2026-07-12T09:15:00Z",
    dateOfOccurrence: "2026-07-11T23:30:00Z",
    complainantName: "Kavitha",
    accusedIds: ["P-001"],
    victimIds: ["P-006"],
    sectionsIPC: ["379"],
    crimeCategory: "Vehicle Theft",
    status: "Under Review",
    investigatingOfficerId: "O-002",
    synopsis: "Two-wheeler stolen from outside residence in Saraswathipuram."
  },
  {
    id: "FIR-2025-0899",
    firNumber: "0899/2025",
    year: 2025,
    stationId: "S-0103",
    dateReported: "2025-11-20T10:00:00Z",
    dateOfOccurrence: "2025-11-19T20:00:00Z",
    complainantName: "Rahul",
    accusedIds: ["P-003", "P-004"],
    victimIds: [],
    sectionsIPC: ["420", "419"],
    crimeCategory: "Cyber Crime",
    status: "Closed",
    investigatingOfficerId: "O-003",
    synopsis: "Phishing scam targeting elderly citizens."
  }
];
