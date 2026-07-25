export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  badgeId?: string;
  department?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password?: string;
  role?: string;
  badgeId?: string;
  department?: string;
  mobile?: string;
}

export interface Case {
  ROWID?: string;
  CaseMasterID: string;
  FIRNumber: string;
  CaseDate: string;
  PolicePersonID?: string;
  PolicePersonName?: string;
  EmployeeName?: string;
  PoliceStationID?: string;
  UnitName?: string;
  CaseCategoryID?: string;
  CategoryName?: string;
  GravityOffenceID?: string;
  CrimeMajorHeadID?: string;
  CrimeHeadName?: string;
  CrimeMinorHeadID?: string;
  CrimeSubHeadName?: string;
  CaseStatusID?: string;
  StatusName?: string;
  BeatArea?: string;
  PlaceType?: string;
  PropertyValue?: number;
}

export interface ComplainantDetail {
  ComplainantID: string;
  CaseMasterID: string;
  ComplainantName: string;
  Age?: number;
  Gender?: string;
  Address?: string;
  Phone?: string;
}

export interface VictimDetail {
  VictimID: string;
  CaseMasterID: string;
  VictimName: string;
  Age?: number;
  Gender?: string;
}

export interface AccusedDetail {
  AccusedID: string;
  CaseMasterID: string;
  PersonID?: string;
  AccusedName: string;
  Age?: number;
  Gender?: string;
  Address?: string;
}

export interface ArrestDetail {
  ArrestID: string;
  CaseMasterID: string;
  AccusedMasterID?: string;
  IOID?: string;
  ArrestDate?: string;
  ArrestType?: string;
  PlaceOfArrest?: string;
}

export interface OccurrenceDetail {
  CaseMasterID: string;
  OccurrenceFrom?: string;
  OccurrenceTo?: string;
  PlaceName?: string;
  Latitude?: number;
  Longitude?: number;
}

export interface ActSectionDetail {
  AssociationID?: string;
  CaseMasterID: string;
  ActCode?: string;
  SectionID?: string;
}

export interface CaseDetail {
  caseMaster: Case;
  complainant?: ComplainantDetail | null;
  victims: VictimDetail[];
  accused: AccusedDetail[];
  arrestLogs: ArrestDetail[];
  chargesheet?: Record<string, unknown> | null;
  occurrence?: OccurrenceDetail | null;
  sections: ActSectionDetail[];
}

export interface PaginatedCases {
  data: Case[];
  total: number;
  page: number;
  limit: number;
}

export interface KPISummary {
  totalCases: number;
  solvedCases: number;
  activeCases: number;
  avgResolutionDays: number;
  solvedRate: number;
}

export interface CrimeTypeDistribution {
  crimeHead: string;
  count: number;
}

export interface DistrictAnalysis {
  district: string;
  count: number;
}

export interface DemographicsData {
  entityType: string;
  genderStats: Array<{ gender: string; count: number }>;
}

export interface SeasonalityData {
  month: string;
  count: number;
}

export interface BehaviorSlot {
  timeSlot: string;
  count: number;
}

export interface GeoJSONFeatureProperties {
  caseMasterId: string;
  firNumber: string;
  caseDate?: string;
  crimeHead?: string;
  placeName?: string;
}

export interface GeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: GeoJSONFeatureProperties;
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'suspect' | 'victim' | 'case' | 'location' | 'section';
  details?: Record<string, unknown>;
}

export interface NetworkEdge {
  source: string;
  target: string;
  relation: string;
}

export interface NetworkGraphData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

export interface AIChatResponse {
  response: string;
  data?: unknown;
  sources?: string[];
}

export interface ForecastPoint {
  month: string;
  predictedCount: number;
  confidenceLow: number;
  confidenceHigh: number;
}

export interface ForecastData {
  historical: SeasonalityData[];
  forecast: ForecastPoint[];
}

export interface SearchResult {
  cases: Case[];
  criminals: AccusedDetail[];
  officers: Array<{ EmployeeID: string; EmployeeName: string }>;
  total: number;
}
