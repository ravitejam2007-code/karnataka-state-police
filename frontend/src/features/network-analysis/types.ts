import type { Node, Edge } from '@xyflow/react';

export type EntityType = 
  | 'Accused' 
  | 'Victim' 
  | 'Witness' 
  | 'PoliceStation' 
  | 'Location' 
  | 'PhoneNumber' 
  | 'Vehicle' 
  | 'BankAccount' 
  | 'Organization';

export type RelationshipType = 
  | 'KnownAssociate' 
  | 'TransferredFunds' 
  | 'RegisteredAt' 
  | 'SpottedAt' 
  | 'Owns' 
  | 'Calls' 
  | 'EmployedBy' 
  | 'Reported';

export interface NetworkNodeData {
  label: string;
  type: EntityType;
  details: {
    photoUrl?: string;
    profileSummary?: string;
    criminalHistory?: string[];
    connectionsCount: number;
    riskScore?: number;
    associatedFIRs?: string[];
    timeline?: { date: string; event: string }[];
    knownAssociates?: string[];
    financialLinks?: string[];
    phoneNumbers?: string[];
    vehicles?: string[];
    evidence?: string[];
    documents?: string[];
    officerNotes?: string;
    // Specific fields based on type
    address?: string;
    accountNumber?: string;
    bankName?: string;
    registrationNumber?: string;
    phoneNumber?: string;
  };
  [key: string]: unknown;
}

export type NetworkNode = Node<NetworkNodeData>;

export interface NetworkEdgeData {
  label: string;
  type: RelationshipType;
  date?: string;
  confidence?: number;
  [key: string]: unknown;
}

export type NetworkEdge = Edge<NetworkEdgeData>;

export interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

export interface NetworkTemplate {
  id: string;
  name: string;
  description: string;
  data: NetworkData;
}
