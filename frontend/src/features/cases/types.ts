export interface TimelineEvent {
  date: string
  event: string
}

export interface EvidenceItem {
  type: string
  description: string
}

export interface DocumentItem {
  name: string
  size: string
}

export interface Case {
  id: string
  firNumber: string
  title: string
  status: "Open" | "Under Investigation" | "Closed" | "Pending" | string
  officer: string
  district: string
  victims: string[]
  accused: string[]
  date: string
  priority: "High" | "Medium" | "Low" | string
  description: string
  timeline: TimelineEvent[]
  evidence: EvidenceItem[]
  photos: string[]
  documents: DocumentItem[]
  relatedCases: string[]
  investigationProgress: number // 0-100
  notes: string
}
