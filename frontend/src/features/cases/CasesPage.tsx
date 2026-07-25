import { useState } from "react"
import { Search, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CasesTable } from "./components/CasesTable"
import { CasesFilters } from "./components/CasesFilters"
import { CaseDetailsDrawer } from "./components/CaseDetailsDrawer"
import { NewCaseModal } from "./components/NewCaseModal"
import { useTranslation } from "react-i18next"
import type { Case } from "./types"

const MOCK_CASES: Case[] = [
  {
    id: "CAS-2023-001",
    firNumber: "FIR/2023/1042",
    title: "Armed Robbery at Central Bank",
    status: "Under Investigation",
    officer: "Insp. Rajesh Kumar",
    district: "South District",
    victims: ["Rajesh Khanna", "Priya Sharma"],
    accused: ["Unknown", "Ramesh (Suspect)"],
    date: "2023-10-15",
    priority: "High",
    description: "Armed robbery involving 3 individuals. Cash amounting to 50 Lakhs was stolen.",
    timeline: [
      { date: "2023-10-15", event: "FIR registered at South District Police Station" },
      { date: "2023-10-16", event: "Initial crime scene investigation completed" },
      { date: "2023-10-18", event: "CCTV footage secured from nearby shops" }
    ],
    evidence: [
      { type: "Video", description: "CCTV from Bank entrance" },
      { type: "Physical", description: "Abandoned getaway vehicle" }
    ],
    photos: ["/placeholder.jpg"],
    documents: [
      { name: "Initial Report.pdf", size: "2.4 MB" },
      { name: "Witness Statements.docx", size: "1.1 MB" }
    ],
    relatedCases: ["CAS-2022-105", "CAS-2023-012"],
    investigationProgress: 45,
    notes: "Awaiting forensic analysis of the getaway vehicle."
  },
  {
    id: "CAS-2023-002",
    firNumber: "FIR/2023/1043",
    title: "Cyber Fraud Case",
    status: "Open",
    officer: "Sub-Insp. Anita Desai",
    district: "North District",
    victims: ["Vikram Singh"],
    accused: ["Unknown IP 192.168.x.x"],
    date: "2023-10-18",
    priority: "Medium",
    description: "Phishing attack resulting in unauthorized bank transfer.",
    timeline: [
      { date: "2023-10-18", event: "Victim reported fraudulent transaction" }
    ],
    evidence: [
      { type: "Digital", description: "Email headers" },
      { type: "Digital", description: "Bank transaction logs" }
    ],
    photos: [],
    documents: [
      { name: "Bank Statement.pdf", size: "1.2 MB" }
    ],
    relatedCases: [],
    investigationProgress: 15,
    notes: "Cyber cell requested to trace the IP address."
  },
  {
    id: "CAS-2023-003",
    firNumber: "FIR/2023/1045",
    title: "Vehicle Theft",
    status: "Closed",
    officer: "Insp. Suresh Patel",
    district: "East District",
    victims: ["Meera Reddy"],
    accused: ["Karan Yadav"],
    date: "2023-09-02",
    priority: "Low",
    description: "Theft of a two-wheeler from residential parking.",
    timeline: [
      { date: "2023-09-02", event: "FIR registered" },
      { date: "2023-09-10", event: "Vehicle recovered during routine patrol" },
      { date: "2023-09-15", event: "Accused apprehended" }
    ],
    evidence: [
      { type: "Physical", description: "Recovered Vehicle" }
    ],
    photos: [],
    documents: [
      { name: "Recovery Memo.pdf", size: "0.8 MB" },
      { name: "Chargesheet.pdf", size: "3.5 MB" }
    ],
    relatedCases: ["CAS-2023-055"],
    investigationProgress: 100,
    notes: "Case closed. Vehicle returned to owner."
  }
]

export function CasesPage() {
  const [casesList, setCasesList] = useState<Case[]>(MOCK_CASES)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false)
  const { t } = useTranslation()
  
  const filteredCases = casesList.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.firNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.officer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCaseCreated = (newCase: Case) => {
    setCasesList(prev => [newCase, ...prev])
  }

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#111827]">{t("cases.title")}</h1>
          <p className="text-xs text-[#6B7280] mt-1">{t("cases.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsNewCaseModalOpen(true)}
            className="bg-[#111827] hover:bg-[#1F2937] text-white font-semibold text-xs h-10 px-4 rounded-xl cursor-pointer shadow-2xs"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t("cases.newCase")}
          </Button>
        </div>
      </div>

      {/* Top Bar (Search & Filter Toggle) */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 w-full max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <Input 
              placeholder={t("cases.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 bg-[#F9FAFC] border-[#E5E7EB] text-xs rounded-xl focus:ring-1 focus:ring-[#111827]"
            />
          </div>
          <Button 
            variant={showFilters ? "secondary" : "outline"} 
            onClick={() => setShowFilters(!showFilters)}
            className="h-10 border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6] rounded-xl text-xs cursor-pointer"
          >
            <Filter className="mr-2 h-4 w-4 text-[#6B7280]" />
            {t("cases.filters")}
          </Button>
        </div>
        
        {/* Expanded Filters */}
        {showFilters && (
          <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl">
            <CasesFilters />
          </div>
        )}
      </div>

      {/* Main Table Area */}
      <div className="flex-1 min-h-0 bg-card border rounded-sm overflow-hidden flex flex-col">
        <CasesTable 
          cases={filteredCases} 
          onRowClick={(c) => setSelectedCase(c)} 
        />
      </div>

      {/* Case Details Drawer */}
      <CaseDetailsDrawer 
        caseData={selectedCase} 
        onClose={() => setSelectedCase(null)} 
      />

      {/* New Case Registration Modal */}
      <NewCaseModal
        isOpen={isNewCaseModalOpen}
        onClose={() => setIsNewCaseModalOpen(false)}
        onCaseCreated={handleCaseCreated}
      />
    </div>
  )
}
