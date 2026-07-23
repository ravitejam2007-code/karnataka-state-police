import type { Person, Vehicle, Officer } from "../types";

export const persons: Person[] = [
  { id: "P-001", name: "Raju", alias: ["Kariya"], dob: "1990-05-15", gender: "M", address: "Mandi Mohalla, Mysuru", riskScore: 85, criminalHistory: ["FIR-2026-0123", "FIR-2026-0145"], status: "Accused" },
  { id: "P-002", name: "Kumar", alias: [], dob: "1992-08-22", gender: "M", address: "NR Mohalla, Mysuru", riskScore: 60, criminalHistory: ["FIR-2026-0123"], status: "Suspect" },
  { id: "P-003", name: "Syed", alias: ["Hacker Syed"], dob: "1995-11-03", gender: "M", address: "Shivajinagar, Bengaluru", riskScore: 92, criminalHistory: ["FIR-2025-0899"], status: "Absconding" },
  { id: "P-004", name: "Mohan", alias: [], dob: "1988-01-30", gender: "M", address: "Indiranagar, Bengaluru", riskScore: 40, criminalHistory: ["FIR-2025-0899"], status: "Accused" },
  { id: "P-005", name: "Ramesh Jain", gender: "M", address: "Devaraja Mohalla, Mysuru", riskScore: 0, criminalHistory: [], status: "Victim" },
  { id: "P-006", name: "Kavitha", gender: "F", address: "Saraswathipuram, Mysuru", riskScore: 0, criminalHistory: [], status: "Victim" }
];

export const vehicles: Vehicle[] = [
  { id: "V-001", registrationNumber: "KA-09-ER-4567", make: "Honda", model: "Activa", color: "Black", ownerName: "Kavitha", status: "Stolen", associatedFIRs: ["FIR-2026-0145"] },
  { id: "V-002", registrationNumber: "KA-01-HG-9876", make: "Bajaj", model: "Pulsar", color: "Red", ownerName: "Unknown", status: "Seized", associatedFIRs: ["FIR-2026-0123"] }
];

export const officers: Officer[] = [
  { id: "O-001", name: "Inspector Mahesh", rank: "PI", badgeNumber: "KA-1234", stationId: "S-0201", currentCases: 12 },
  { id: "O-002", name: "Sub-Inspector Shivanna", rank: "PSI", badgeNumber: "KA-5678", stationId: "S-0202", currentCases: 8 },
  { id: "O-003", name: "Inspector Prakash", rank: "PI", badgeNumber: "KA-9012", stationId: "S-0103", currentCases: 15 }
];
