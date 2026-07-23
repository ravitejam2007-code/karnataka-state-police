export type InvestigationStatus = "Open" | "Under Review" | "Closed" | "Cold Case" | "Active";
export type CrimeCategory = "Robbery" | "Cyber Crime" | "Murder" | "Financial Fraud" | "Drug Trafficking" | "Vehicle Theft" | "Missing Person" | "Women's Safety" | "Gang Activity";

export interface District {
  id: string;
  name: string;
  zone: string;
  range: string;
  sp_name?: string;
  headquarters: string;
}

export interface Station {
  id: string;
  name: string;
  districtId: string;
  sho_name?: string;
  contact?: string;
  latitude: number;
  longitude: number;
}

export interface Officer {
  id: string;
  name: string;
  rank: string;
  badgeNumber: string;
  stationId: string;
  currentCases: number;
}

export interface Person {
  id: string;
  name: string;
  alias?: string[];
  dob?: string;
  gender: string;
  aadhar?: string;
  address?: string;
  photographUrl?: string;
  riskScore: number;
  criminalHistory: string[]; // array of FIR IDs
  status: "Suspect" | "Accused" | "Witness" | "Victim" | "Absconding";
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  color: string;
  ownerName: string;
  status: "Clear" | "Stolen" | "Seized" | "Wanted";
  associatedFIRs: string[];
}

export interface Evidence {
  id: string;
  type: string;
  description: string;
  collectedAt: string; // ISO date
  collectedBy: string; // Officer ID
  location: string;
  status: "In Custody" | "Sent to FSL" | "Disposed";
}

export interface TimelineEvent {
  id: string;
  timestamp: string; // ISO date
  title: string;
  description: string;
  type: "Incident" | "Arrest" | "Evidence Collected" | "Court Hearing" | "Other";
  location?: string;
}

export interface FIR {
  id: string;
  firNumber: string;
  year: number;
  stationId: string;
  dateReported: string; // ISO date
  dateOfOccurrence: string; // ISO date
  complainantName: string;
  accusedIds: string[];
  victimIds: string[];
  sectionsIPC: string[];
  crimeCategory: CrimeCategory;
  status: InvestigationStatus;
  investigatingOfficerId: string;
  synopsis: string;
}

export interface IntelligenceReportItem {
  id: string;
  type: 
    | "ExecutiveSummary" 
    | "InvestigationOverview" 
    | "EvidenceSummary"
    | "CrimeStatistics"
    | "InteractiveChart"
    | "CrimeTimeline"
    | "RelationshipGraph"
    | "InteractiveMap"
    | "RelatedFIRs"
    | "RelatedPersons"
    | "RelatedVehicles"
    | "AIRecommendation"
    | "ConfidenceScore"
    | "ExplainableAI"
    | "References"
    | "PDFExport";
  data: any; // Will be strongly typed per widget later
}

export interface IntelligenceResponse {
  id: string;
  queryIntent: string; // e.g. "RobberyHotspotsMysuru"
  timestamp: string;
  items: IntelligenceReportItem[];
}
