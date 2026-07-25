import { useState } from "react"
import { toast } from "sonner"
import { 
  ShieldAlert, 
  FileText, 
  Users, 
  Clock, 
  Sparkles, 
  Camera, 
  Video, 
  Fingerprint, 
  Plus, 
  Edit3, 
  Save, 
  Download, 
  Share2, 
  FileCheck,
  ChevronRight,
  Eye,
  FileSpreadsheet
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShareCaseModal } from "./components/ShareCaseModal"
import { EvidenceDetailsModal, type EvidenceDetail } from "./components/EvidenceDetailsModal"
import { AIRecommendationsQueryModal } from "./components/AIRecommendationsQueryModal"

interface SuspectItem {
  id: string
  name: string
  alias: string
  status: string
  crimeHistoryCount: number
  associates: string[]
  photoUrl: string
}

interface TimelineEvent {
  id: string
  date: string
  time: string
  title: string
  officer: string
  status: "Completed" | "In Progress" | "Pending"
  details: string
}

export function InvestigationPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "evidence" | "suspects" | "timeline" | "notes">("overview")
  const [noteContent, setNoteContent] = useState(
    "Case update: Suspect vehicle CCTV footage extracted near KR Circle. Forensic team submitted preliminary fingerprint analysis matching database profile P-882 (Raju @ Mysuru). Surveillance team deployed."
  )
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [savedNotes, setSavedNotes] = useState(noteContent)

  // Modal States
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isAIQueryModalOpen, setIsAIQueryModalOpen] = useState(false)
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceDetail | null>(null)

  const caseSummary = {
    caseNumber: "CAS-2026-8894",
    firNumber: "FIR/2026/0412",
    crimeType: "Armed Robbery & Conspiracy",
    status: "Under Active Investigation",
    priority: "HIGH PRIORITY",
    officerAssigned: "PI Ramesh Kumar (Mysuru CCB)",
    district: "Mysuru Urban Sub-Division",
    dateFiled: "2026-07-12",
    leadStation: "Devaraja Police Station"
  }

  const evidenceItems: EvidenceDetail[] = [
    { id: "EV-01", title: "Bank Entrance CCTV Clip #04", category: "CCTV", date: "2026-07-12", size: "145 MB", uploadedBy: "Sub-Insp. Anita D", notes: "1080p footage showing getaway entry" },
    { id: "EV-02", title: "Getaway Car License Plate Photo", category: "Photo", date: "2026-07-12", size: "4.2 MB", uploadedBy: "Insp. Ramesh K", notes: "ANPR camera capture at KR Circle" },
    { id: "EV-03", title: "Latent Fingerprints (Counter Desk)", category: "Fingerprint", date: "2026-07-13", size: "12 MB", uploadedBy: "FSL Lab Officer Swati N", notes: "Matched profile P-882" },
    { id: "EV-04", title: "Witness Statement - Security Guard", category: "Document", date: "2026-07-13", size: "1.1 MB", uploadedBy: "PI Ramesh Kumar", notes: "Recorded under Section 161 CrPC" },
    { id: "EV-05", title: "Ballistics Recovery Report", category: "Document", date: "2026-07-14", size: "3.5 MB", uploadedBy: "Forensic Team SCRB", notes: "Caliber match analysis" }
  ]

  const suspectItems: SuspectItem[] = [
    {
      id: "SUS-101",
      name: "Raju @ 'Snake' Raju",
      alias: "Raju Mysuru",
      status: "Prime Suspect (Absconding)",
      crimeHistoryCount: 4,
      associates: ["Karan Yadav", "Vicky B"],
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "SUS-102",
      name: "Karan Yadav",
      alias: "Chotta Karan",
      status: "Detained for Interrogation",
      crimeHistoryCount: 2,
      associates: ["Raju Mysuru", "Suresh P"],
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    }
  ]

  const timelineEvents: TimelineEvent[] = [
    {
      id: "TL-01",
      date: "2026-07-12",
      time: "10:30 AM",
      title: "FIR Registered at Devaraja Police Station",
      officer: "Sub-Insp. Anita D",
      status: "Completed",
      details: "Incident reported at Central Bank Branch. Initial FIR zero copy drafted."
    },
    {
      id: "TL-02",
      date: "2026-07-12",
      time: "11:45 AM",
      title: "Crime Scene Cordoned & Forensic Sampling",
      officer: "Forensic Team SCRB",
      status: "Completed",
      details: "Recovered 3 latent fingerprint impressions and shell casings."
    },
    {
      id: "TL-03",
      date: "2026-07-13",
      time: "02:15 PM",
      title: "CCTV Extraction & ANPR Vehicle Match",
      officer: "Insp. Rajesh K",
      status: "Completed",
      details: "KA-09-MA-4412 identified fleeing towards Hunsur Road."
    },
    {
      id: "TL-04",
      date: "2026-07-14",
      time: "04:00 PM",
      title: "Special Interrogation of Suspect Associate",
      officer: "CCB Crime Team",
      status: "In Progress",
      details: "Interrogating suspect associate Karan Yadav regarding hideouts."
    }
  ]

  const aiSuggestions = [
    "Cross-reference CCTV timeframe with Toll Plaza ANPR database on Mysuru-Hunsur highway.",
    "Issue lookout notice to border checkposts in Chamarajanagar & Kodagu districts.",
    "Perform criminal network link analysis with 2024 Bengaluru bank robbery modus-operandi."
  ]

  const handleExportDossier = (format: "PDF" | "DOCX" | "CSV") => {
    toast.success(`Exporting Investigation Dossier (${format})`, {
      description: `Case ${caseSummary.firNumber} summary, timeline, and evidence logs compiled.`
    })
  }

  return (
    <div className="flex-1 flex flex-col space-y-5 pb-8 font-sans">
      {/* Top Banner Header */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-[#0F172A] text-white border border-slate-700 flex items-center justify-center shrink-0">
            <ShieldAlert className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold text-[#1F2937] tracking-tight">{caseSummary.caseNumber}</h1>
              <Badge className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">
                {caseSummary.priority}
              </Badge>
              <Badge variant="outline" className="border-[#0F172A] text-[#0F172A] font-semibold text-[10px] px-2 py-0.5">
                {caseSummary.status}
              </Badge>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              {caseSummary.crimeType} • <strong className="text-[#1F2937]">{caseSummary.firNumber}</strong> • Registered at {caseSummary.leadStation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsShareModalOpen(true)}
            className="text-xs border-[#E2E8F0] text-[#1F2937] hover:bg-slate-100 cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5 mr-1.5" />
            Share Case
          </Button>

          <div className="flex items-center gap-1">
            <Button 
              size="sm" 
              onClick={() => handleExportDossier("PDF")}
              className="bg-[#0F172A] hover:bg-black text-white text-xs font-semibold cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export Dossier (PDF)
            </Button>

            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleExportDossier("CSV")}
              className="text-xs border-[#E2E8F0] text-[#1F2937] hover:bg-slate-100 cursor-pointer hidden sm:inline-flex"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 mr-1" />
              CSV
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2 overflow-x-auto">
        {[
          { key: "overview", label: "Investigation Overview", icon: FileText },
          { key: "evidence", label: `Evidence Panel (${evidenceItems.length})`, icon: Camera },
          { key: "suspects", label: `Suspects & Associates (${suspectItems.length})`, icon: Users },
          { key: "timeline", label: "Chronological Timeline", icon: Clock },
          { key: "notes", label: "Investigation Notes", icon: Edit3 }
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                isActive 
                  ? "bg-[#0F172A] text-white shadow-2xs" 
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1F2937]"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Tab 1: Overview */}
          {activeTab === "overview" && (
            <div className="space-y-5">
              {/* Summary Cards */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#1F2937] border-b border-[#E2E8F0] pb-2.5 uppercase tracking-wider text-[11px]">
                  Investigation Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="text-[#64748B] text-[10px] font-bold uppercase block mb-1">Assigned Lead Officer</span>
                    <span className="font-bold text-[#1F2937]">{caseSummary.officerAssigned}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="text-[#64748B] text-[10px] font-bold uppercase block mb-1">Jurisdiction Sub-Division</span>
                    <span className="font-bold text-[#1F2937]">{caseSummary.district}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="text-[#64748B] text-[10px] font-bold uppercase block mb-1">Registration Date</span>
                    <span className="font-mono font-bold text-[#1F2937]">{caseSummary.dateFiled}</span>
                  </div>
                </div>
              </div>

              {/* Recent Evidence Quick View */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                  <h3 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                    Secured Evidence Summary
                  </h3>
                  <button onClick={() => setActiveTab("evidence")} className="text-xs text-[#0F172A] font-bold hover:underline flex items-center gap-1">
                    View All <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {evidenceItems.slice(0, 4).map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedEvidence(item)}
                      className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between cursor-pointer hover:border-slate-400 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded bg-white border border-[#E2E8F0]">
                          {item.category === "CCTV" && <Video className="h-4 w-4 text-[#0F172A]" />}
                          {item.category === "Photo" && <Camera className="h-4 w-4 text-purple-600" />}
                          {item.category === "Fingerprint" && <Fingerprint className="h-4 w-4 text-amber-600" />}
                          {item.category === "Document" && <FileText className="h-4 w-4 text-emerald-600" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#1F2937] line-clamp-1">{item.title}</div>
                          <div className="text-[10px] text-[#64748B]">{item.date} • {item.size}</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-[9px] font-mono">{item.category}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Evidence Panel */}
          {activeTab === "evidence" && (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <h3 className="text-sm font-bold text-[#1F2937] uppercase tracking-wider">
                  Evidence Locker & Chain of Custody
                </h3>
                <Button 
                  size="sm" 
                  onClick={() => {
                    toast.success("Evidence File Attachment Dialog", {
                      description: "Select physical sample or digital file to log in tamper-evident locker."
                    })
                  }}
                  className="bg-[#0F172A] hover:bg-black text-white text-xs font-semibold cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Upload Evidence
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {evidenceItems.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col justify-between space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A]">
                          {item.category === "CCTV" && <Video className="h-5 w-5 text-[#0F172A]" />}
                          {item.category === "Photo" && <Camera className="h-5 w-5 text-purple-600" />}
                          {item.category === "Fingerprint" && <Fingerprint className="h-5 w-5 text-amber-600" />}
                          {item.category === "Document" && <FileText className="h-5 w-5 text-emerald-600" />}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#1F2937]">{item.title}</h4>
                          <span className="text-[10px] text-[#64748B]">ID: {item.id}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[9px] font-mono border-[#CBD5E1] text-[#475569]">
                        {item.category}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                      <span>Logged: {item.date}</span>
                      <span className="font-mono font-semibold">{item.size}</span>
                    </div>

                    <Button 
                      onClick={() => setSelectedEvidence(item)}
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs font-semibold border-[#E2E8F0] text-[#1F2937] hover:bg-white cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1 text-[#0F172A]" />
                      Inspect Record & Chain of Custody
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Suspect Section */}
          {activeTab === "suspects" && (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wider">
                  Suspect Profiles & Known Associates
                </h3>
                <Button 
                  size="sm" 
                  onClick={() => {
                    toast.info("Add Suspect Record Dialog", {
                      description: "Enter suspect details and cross-reference state criminal database."
                    })
                  }}
                  className="bg-[#0F172A] hover:bg-black text-white text-xs font-semibold cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Suspect
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suspectItems.map((suspect) => (
                  <div key={suspect.id} className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={suspect.photoUrl}
                        alt={suspect.name}
                        className="h-14 w-14 rounded-full object-cover border-2 border-[#0F172A] shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-[#1F2937]">{suspect.name}</h4>
                        <p className="text-xs text-[#64748B]">Alias: <strong className="text-[#1F2937]">{suspect.alias}</strong></p>
                        <Badge className="mt-1 bg-amber-600 text-white text-[9px] font-semibold">
                          {suspect.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0] text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Prior Convictions:</span>
                        <span className="font-bold text-[#1F2937]">{suspect.crimeHistoryCount} Cases</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Known Associates:</span>
                        <span className="font-semibold text-[#0F172A]">{suspect.associates.join(", ")}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => {
                        toast.info(`Intelligence Dossier: ${suspect.name}`, {
                          description: `Cross-referenced 4 prior FIRs and syndicate links.`
                        })
                      }}
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs font-semibold border-[#E2E8F0] text-[#1F2937] hover:bg-white cursor-pointer"
                    >
                      Full Intelligence Profile
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Timeline */}
          {activeTab === "timeline" && (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-[#1E293B] border-b border-[#E2E8F0] pb-3 uppercase tracking-wider">
                Chronological Investigation Log
              </h3>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E8F0]">
                {timelineEvents.map((event) => (
                  <div key={event.id} className="relative space-y-1">
                    <div className="absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full bg-[#0F172A] border-2 border-white ring-2 ring-slate-400" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[#0F172A]">{event.date} • {event.time}</span>
                      <Badge variant="outline" className="text-[9px] border-[#CBD5E1] text-[#475569]">
                        {event.status}
                      </Badge>
                    </div>
                    <h4 className="text-xs font-bold text-[#1E293B]">{event.title}</h4>
                    <p className="text-xs text-[#475569] bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                      {event.details}
                    </p>
                    <span className="text-[10px] text-[#64748B]">Logged by: {event.officer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Notes */}
          {activeTab === "notes" && (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wider">
                  Lead Investigator Notes
                </h3>
                {isEditingNotes ? (
                  <Button 
                    size="sm" 
                    onClick={() => {
                      setSavedNotes(noteContent)
                      setIsEditingNotes(false)
                      toast.success("Officer Notes Updated", {
                        description: "Logged timestamped note entry in official case history."
                      })
                    }} 
                    className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold cursor-pointer"
                  >
                    <Save className="h-3.5 w-3.5 mr-1" />
                    Save Notes
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setIsEditingNotes(true)}
                    className="text-xs border-[#E2E8F0] text-[#1E293B] cursor-pointer"
                  >
                    <Edit3 className="h-3.5 w-3.5 mr-1" />
                    Edit Notes
                  </Button>
                )}
              </div>

              {isEditingNotes ? (
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={6}
                  className="w-full p-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              ) : (
                <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B] leading-relaxed whitespace-pre-wrap">
                  {savedNotes}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column: AI Recommendations (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2.5">
              <div className="p-1.5 rounded bg-[#0F172A] text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider">
                AI Investigation Recommendations
              </h3>
            </div>

            <div className="space-y-3">
              {aiSuggestions.map((rec, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                  <div className="flex items-start gap-2 text-xs text-[#1E293B]">
                    <span className="font-mono font-bold text-[#0F172A] shrink-0">#{idx + 1}</span>
                    <p className="leading-snug">{rec}</p>
                  </div>
                  <button 
                    onClick={() => setIsAIQueryModalOpen(true)}
                    className="text-[10px] font-bold text-[#0F172A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Execute Recommended Search <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 text-xs space-y-2 text-[#64748B]">
            <div className="flex items-center gap-2 font-bold text-[#1E293B]">
              <FileCheck className="h-4 w-4 text-emerald-600" />
              Chain of Custody Status
            </div>
            <p className="text-[11px] leading-relaxed">
              All physical and digital evidence items are timestamped with cryptographic SHA-256 integrity logs.
            </p>
          </div>
        </div>

      </div>

      {/* Share Case Modal */}
      <ShareCaseModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        caseNumber={caseSummary.caseNumber}
        firNumber={caseSummary.firNumber}
      />

      {/* Evidence Details & Custody Modal */}
      <EvidenceDetailsModal
        isOpen={!!selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
        evidence={selectedEvidence}
      />

      {/* AI Recommendations Search Modal */}
      <AIRecommendationsQueryModal
        isOpen={isAIQueryModalOpen}
        onClose={() => setIsAIQueryModalOpen(false)}
        caseNumber={caseSummary.caseNumber}
      />

    </div>
  )
}
