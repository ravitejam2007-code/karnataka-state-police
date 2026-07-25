import { 
  Cpu, Network, BarChart3, LineChart, FileText, Lock, Users, 
  Brain, Bot, ArrowRight, CheckCircle2, Database, 
  Layers, MapPin, AlertTriangle, DollarSign, Fingerprint, Eye, 
  ShieldCheck, Award, Compass
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import karnatakaEmblem from "@/assets/karnataka-emblem.png"

export function AboutSystemPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#111827] font-sans p-4 sm:p-6 lg:p-10 space-y-10">
      
      {/* 1. Hero Section */}
      <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="absolute right-4 top-4 opacity-5 pointer-events-none hidden md:block">
          <img src={karnatakaEmblem} alt="Karnataka State Crest" className="h-80 w-auto object-contain" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-2 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] shadow-2xs">
              <img src={karnatakaEmblem} alt="Government of Karnataka Emblem" className="h-10 sm:h-12 w-auto object-contain" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-widest block">Government of Karnataka</span>
              <span className="text-sm font-extrabold text-[#111827]">Karnataka State Police • SCRB</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#111827] text-white border border-[#111827] font-mono ml-auto">
              ENTERPRISE PLATFORM v2.4.0
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111827] leading-tight">
              Karnataka Crime Intelligence Platform <span className="text-[#2563EB] font-mono font-bold text-2xl lg:text-3xl">(KCIP)</span>
            </h1>
            <p className="text-base sm:text-lg font-semibold text-[#475569]">
              Intelligent Conversational AI & Crime Analytics Platform for Karnataka State Police
            </p>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-3xl">
              KCIP is an advanced digital intelligence platform engineered for Karnataka State Police. It leverages Artificial Intelligence, Large Language Models (LLM), Criminal Network Analysis, Geospatial Analytics, and Predictive Intelligence to empower field officers, station supervisors, investigators, and policymakers with real-time, evidence-backed decision support for proactive crime prevention.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <div className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-bold text-[#111827] flex items-center gap-2">
              <Brain className="h-4 w-4 text-[#2563EB]" />
              Conversational AI
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-bold text-[#111827] flex items-center gap-2">
              <Network className="h-4 w-4 text-[#10B981]" />
              Criminal Network Graph
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-bold text-[#111827] flex items-center gap-2">
              <LineChart className="h-4 w-4 text-[#F59E0B]" />
              Predictive Crime Analytics
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-bold text-[#111827] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Explainable AI Governance
            </div>
          </div>
        </div>
      </div>

      {/* 2. About the System & Challenges Solved */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-xs">
          <CardHeader className="p-6 border-b border-[#F3F4F6]">
            <CardTitle className="text-base font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
              <Compass className="h-5 w-5 text-[#2563EB]" />
              What is KCIP & Core Purpose
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-xs text-[#475569] leading-relaxed">
            <p>
              The Karnataka Crime Intelligence Platform (KCIP) unifies disparate police databases—including First Information Reports (FIRs), CCTNS records, criminal history sheets, and telemetric crime reports—into a unified intelligence layer.
            </p>
            <p>
              By applying Natural Language Understanding (NLU) in both English and Kannada, KCIP allows officers to ask complex questions, query criminal networks, extract Modus Operandi (MO) patterns, and forecast crime hotspots in seconds.
            </p>
            <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1.5">
              <span className="font-bold text-[#111827] text-xs block">Key Paradigm Shift</span>
              <p className="text-[11px] text-[#64748B]">
                Moves police operations from reactive case record-keeping to proactive data-driven intelligence, accelerating investigations and preventing crime before it occurs.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-xs">
          <CardHeader className="p-6 border-b border-[#F3F4F6]">
            <CardTitle className="text-base font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#F59E0B]" />
              Operational Challenges Solved
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3 text-xs text-[#475569]">
            {[
              { title: "Siloed Crime Data", desc: "Eliminates isolated station records by aggregating state-wide criminal registries into a single searchable canvas." },
              { title: "Multilingual Language Barriers", desc: "Native support for Kannada and English FIR translation and queries." },
              { title: "Unidentified Criminal Networks", desc: "Automates relationship graphing to expose hidden gang leaders, repeat offenders, and vehicle theft syndicates." },
              { title: "Slow Investigation Timelines", desc: "Reduces manual case-file scanning from days to instant AI case summaries and evidence recommendations." },
            ].map((chal, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#111827] text-xs">{chal.title}</h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">{chal.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 3. Project Objectives Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#111827] tracking-tight">Project Objectives</h2>
            <p className="text-xs text-[#6B7280]">Strategic capabilities designed for modern law enforcement</p>
          </div>
          <span className="text-xs font-mono text-[#6B7280] bg-white border border-[#E5E7EB] px-3 py-1 rounded-full">10 Objectives</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: "Conversational AI", desc: "Natural language query over state crime records.", icon: Bot },
            { title: "Crime Intelligence", desc: "Real-time incident aggregation & threat scoring.", icon: Cpu },
            { title: "Investigation Support", desc: "Automated case timelines and evidence suggestions.", icon: FileText },
            { title: "Network Analysis", desc: "Visual link analysis of syndicates & repeat offenders.", icon: Network },
            { title: "Crime Forecasting", desc: "Predictive spatial-temporal hotspot mapping.", icon: LineChart },
            { title: "Explainable AI", desc: "Transparent reasoning paths with exact FIR citation.", icon: Eye },
            { title: "Secure Data Access", desc: "Strict RBAC controls and encrypted telemetry.", icon: Lock },
            { title: "Decision Support", desc: "Actionable command suggestions for dispatchers.", icon: ShieldCheck },
            { title: "Crime Prevention", desc: "Early warning alerts to preempt gang activities.", icon: AlertTriangle },
            { title: "Data Analytics", desc: "Sociological, demographic, and trend metrics.", icon: BarChart3 },
          ].map((obj, idx) => (
            <Card key={idx} className="rounded-2xl border-[#E5E7EB] bg-white shadow-2xs hover:border-[#111827] transition-all p-4 space-y-2">
              <div className="h-9 w-9 rounded-xl bg-[#F3F4F6] text-[#111827] flex items-center justify-center font-bold">
                <obj.icon className="h-5 w-5 text-[#111827]" />
              </div>
              <h3 className="font-bold text-xs text-[#111827]">{obj.title}</h3>
              <p className="text-[11px] text-[#64748B] leading-snug">{obj.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. Interactive System Workflow */}
      <Card className="rounded-3xl border-[#E5E7EB] bg-white shadow-xs p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#F3F4F6] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">End-to-End System Intelligence Workflow</h2>
            <p className="text-xs text-[#6B7280]">How data flows from raw FIR records to actionable command decisions</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#F3F4F6] text-[#111827]">10-Step Pipeline</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5 text-center font-sans">
          {[
            { step: "01", label: "Crime Data", icon: Database },
            { step: "02", label: "Secure DB", icon: Lock },
            { step: "03", label: "AI Processing", icon: Cpu },
            { step: "04", label: "NLU Parsing", icon: Brain },
            { step: "05", label: "Analytics Engine", icon: BarChart3 },
            { step: "06", label: "Network Graph", icon: Network },
            { step: "07", label: "Predictions", icon: LineChart },
            { step: "08", label: "Dashboards", icon: Layers },
            { step: "09", label: "Decision Support", icon: ShieldCheck },
            { step: "10", label: "Police Officers", icon: Users },
          ].map((wf, idx) => (
            <div key={idx} className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl flex flex-col items-center justify-center space-y-2 relative group hover:bg-white hover:border-[#111827] transition-all">
              <span className="text-[9px] font-mono font-extrabold text-[#94A3B8]">{wf.step}</span>
              <div className="h-8 w-8 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#111827] shadow-2xs">
                <wf.icon className="h-4 w-4 text-[#111827]" />
              </div>
              <span className="text-[10px] font-bold text-[#111827] leading-tight">{wf.label}</span>
              {idx < 9 && (
                <ArrowRight className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94A3B8] z-10" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* 5. Core Modules (10 Detailed Cards) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Core Module Suite</h2>
          <p className="text-xs text-[#6B7280]">Comprehensive digital tools integrated into the Karnataka State Police ecosystem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Conversational Crime Intelligence",
              desc: "Natural language search, English & Kannada language parsing, voice query support, and PDF conversation export.",
              icon: Bot,
              tags: ["NLU Engine", "Kannada/English", "Voice Search", "PDF Export"]
            },
            {
              title: "Criminal Network Analysis",
              desc: "Dynamic relationship mapping, gang detection, repeat offender link graphs, and suspect centrality scoring.",
              icon: Network,
              tags: ["Link Analysis", "Gang Detection", "Repeat Offenders", "ReactFlow Canvas"]
            },
            {
              title: "Crime Analytics & Hotspots",
              desc: "Geospatial heatmaps, seasonal trend analysis, crime statistics, and regional station comparison.",
              icon: BarChart3,
              tags: ["Hotspots", "Trend Analysis", "Leaflet Maps", "Regional Metrics"]
            },
            {
              title: "Sociological & Demographic Insights",
              desc: "Age, gender, economic indicators, education levels, and migration impact on local crime rates.",
              icon: Users,
              tags: ["Demographics", "Economic Factors", "Migration Trends", "Social Impact"]
            },
            {
              title: "Offender Profiling & MO Analysis",
              desc: "Behavioral pattern identification, habitual offender tracking, modus operandi matching, and threat scoring.",
              icon: Fingerprint,
              tags: ["Behavioral MO", "Habitual Offenders", "Risk Scoring", "Pattern Match"]
            },
            {
              title: "Investigation Support Workspace",
              desc: "Case summaries, automated timeline generation, similar case recommendations, and evidence checklists.",
              icon: FileText,
              tags: ["Case Timelines", "Evidence Checklists", "Case Matching", "AI Briefings"]
            },
            {
              title: "Financial Crime Intelligence",
              desc: "Money trail analysis, suspicious transaction detection, crypto wallet tracking, and bank account mapping.",
              icon: DollarSign,
              tags: ["Money Trails", "Bank Account Linkage", "Crypto Wallet Trace", "Financial Fraud"]
            },
            {
              title: "Crime Forecasting & Early Alerts",
              desc: "Predictive spatial-temporal models, emerging crime wave detection, and early warning dispatch alerts.",
              icon: LineChart,
              tags: ["Spatial Prediction", "Emerging Crime Waves", "Early Warning", "Resource Allocation"]
            },
            {
              title: "Explainable AI & Evidence Trail",
              desc: "Transparent reasoning paths, exact FIR source citations, evidence auditing, and verifiable AI outputs.",
              icon: Eye,
              tags: ["No Black-Box", "FIR Source Quotes", "Verifiable AI", "Evidence Trail"]
            },
            {
              title: "Secure Governance & RBAC Controls",
              desc: "Role-Based Access Control, full audit logging, user activity tracking, and ISO 27001 compliance.",
              icon: Lock,
              tags: ["RBAC", "Audit Logging", "ISO 27001", "Session Tracking"]
            },
          ].map((mod, idx) => (
            <Card key={idx} className="rounded-2xl border-[#E5E7EB] bg-white shadow-xs p-6 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-[#111827] text-white flex items-center justify-center shrink-0">
                    <mod.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-sm text-[#111827]">{mod.title}</h3>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">{mod.desc}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F3F4F6]">
                {mod.tags.map((t) => (
                  <span key={t} className="px-2.5 py-0.5 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-[10px] font-mono font-bold text-[#475569]">
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 6. AI Technology Stack */}
      <Card className="rounded-3xl border-[#E5E7EB] bg-white shadow-xs p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#F3F4F6] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">AI Technology Stack & Architecture</h2>
            <p className="text-xs text-[#6B7280]">State-of-the-art machine learning algorithms and software engineering</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#111827] text-white">Production Stack</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
          {[
            { name: "Large Language Models", tech: "Neural LLM Engine", icon: Bot },
            { name: "Natural Language Processing", tech: "Multilingual NLU (EN/KN)", icon: Brain },
            { name: "Machine Learning", tech: "Supervised Clustering", icon: Cpu },
            { name: "Predictive Analytics", tech: "Spatial-Temporal Models", icon: LineChart },
            { name: "Network Analysis", tech: "ReactFlow & Graph Theory", icon: Network },
            { name: "Data Visualization", tech: "Recharts & Canvas", icon: BarChart3 },
            { name: "Geospatial Intelligence", tech: "Leaflet & Heatmap Cluster", icon: MapPin },
            { name: "Explainable AI Engine", tech: "Source Citation Tracer", icon: Eye },
            { name: "Security Telemetry", tech: "AES-256 & SHA-256", icon: ShieldCheck },
            { name: "State Database", tech: "KSP CCTNS Registry", icon: Database },
          ].map((st, idx) => (
            <div key={idx} className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl space-y-1">
              <st.icon className="h-5 w-5 text-[#2563EB] mb-1" />
              <span className="font-bold text-[#111827] block text-xs">{st.name}</span>
              <span className="text-[10px] font-mono text-[#64748B] block">{st.tech}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 7. User Roles & Responsibilities */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Role-Based Access Architecture</h2>
          <p className="text-xs text-[#6B7280]">Tailored user experiences designed for distinct police ranks and responsibilities</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
          {[
            { role: "Administrator", desc: "System configuration, user management, audit log monitoring, and platform governance.", access: "Full System Controls" },
            { role: "Senior Officers", desc: "State-wide intelligence briefs, high-level analytics, and strategic resource allocation.", access: "Executive Oversight" },
            { role: "Station Supervisor", desc: "Station-level case monitoring, dispatch feeds, weather alerts, and duty assignments.", access: "Station Management" },
            { role: "Investigation Officer", desc: "Case file investigation, evidence gathering, criminal network mapping, and AI assistance.", access: "Case Workspace" },
            { role: "Police Officer", desc: "Field reporting, daily patrol dispatch, FIR reference lookups, and incident logging.", access: "Field Patrol Access" },
            { role: "Crime Analyst", desc: "Hotspot analysis, trend forecasting, sociological metrics, and statistical reporting.", access: "Analytics Suite" },
            { role: "Policy Maker", desc: "Macro-level crime trends, policy impact evaluations, and legislative reporting.", access: "Strategic Reporting" },
          ].map((r, idx) => (
            <Card key={idx} className="rounded-2xl border-[#E5E7EB] bg-white shadow-2xs p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-2">
                <span className="font-extrabold text-sm text-[#111827]">{r.role}</span>
                <span className="px-2 py-0.5 rounded bg-[#F3F4F6] text-[#111827] font-mono text-[9px] font-bold">
                  {r.access}
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] leading-relaxed">{r.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 8. Benefits Grid */}
      <Card className="rounded-3xl border-[#E5E7EB] bg-white shadow-xs p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#F3F4F6] pb-4">
          <h2 className="text-xl font-bold text-[#111827]">Key Benefits & Impact</h2>
          <p className="text-xs text-[#6B7280]">Quantifiable improvements delivered to Karnataka State Police operations</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {[
            { title: "Faster Case Resolution", desc: "Accelerates investigation timelines by automating search and link analysis." },
            { title: "Proactive Crime Prevention", desc: "Forecasts high-risk areas to deploy preventive patrols before crime occurs." },
            { title: "Uncovered Syndicate Links", desc: "Reveals hidden criminal associations across districts and state borders." },
            { title: "Data-Driven Resource Dispatch", desc: "Optimizes police force deployment based on empirical crime density metrics." },
            { title: "Verifiable AI Transparency", desc: "Eliminates AI hallucination by citing exact FIR source lines for every answer." },
            { title: "State-Level Coordination", desc: "Connects 1,000+ police stations into a unified intelligence repository." },
          ].map((ben, idx) => (
            <div key={idx} className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#10B981]" />
                <h3 className="font-bold text-xs text-[#111827]">{ben.title}</h3>
              </div>
              <p className="text-[11px] text-[#64748B] leading-snug">{ben.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 9. Official Government Footer & System Telemetry */}
      <div className="bg-[#111827] text-white rounded-3xl p-6 sm:p-10 space-y-6 font-sans">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <img src={karnatakaEmblem} alt="Karnataka Government Emblem" className="h-12 w-auto object-contain" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">GOVERNMENT OF KARNATAKA</span>
              <h3 className="text-base font-extrabold text-white">KARNATAKA CRIME INTELLIGENCE PLATFORM</h3>
              <span className="text-[10px] text-slate-400 block font-mono">State Crime Records Bureau (SCRB) • Police Headquarters, Bengaluru</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] font-mono">
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">VERSION: v2.4.0-ENT</span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">BUILD: KCIP-2026.07.25</span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">AI ENGINE: v4.2 PROD</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          "An AI-powered conversational crime intelligence and analytics platform designed to empower Karnataka State Police with data-driven investigations, predictive policing, criminal network analysis, and intelligent decision support for safer communities."
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-800 font-mono">
          <div>
            © 2026 Government of Karnataka. State Crime Records Bureau. All Rights Reserved.
          </div>
          <div>
            Environment: <strong className="text-white">SCRB HQ Production Environment</strong>
          </div>
        </div>
      </div>

    </div>
  )
}
