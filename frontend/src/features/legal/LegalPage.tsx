import { useState, useMemo } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { 
  ShieldCheck, 
  FileText, 
  Accessibility, 
  Printer, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Scale, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Building2, 
  ArrowLeft,
  Share2
} from "lucide-react"
import { toast } from "sonner"
import karnatakaEmblem from "@/assets/karnataka-emblem.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"

export type LegalTab = "privacy" | "terms" | "accessibility"

interface LegalPageProps {
  initialTab?: LegalTab
}

export function LegalPage({ initialTab }: LegalPageProps) {
  const { i18n } = useTranslation()
  const isKannada = i18n.language === "kn"
  const location = useLocation()
  const navigate = useNavigate()

  // Determine active tab from URL path or prop
  const activeTab: LegalTab = useMemo(() => {
    if (initialTab) return initialTab
    if (location.pathname.includes("privacy")) return "privacy"
    if (location.pathname.includes("terms")) return "terms"
    if (location.pathname.includes("accessibility")) return "accessibility"
    return "privacy"
  }, [location.pathname, initialTab])

  const [searchQuery, setSearchQuery] = useState("")

  const handleTabChange = (tab: LegalTab) => {
    navigate(`/${tab === "privacy" ? "privacy-policy" : tab === "terms" ? "terms-of-use" : "accessibility-statement"}`)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Karnataka State Police - Official Legal & Compliance Portal",
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success(isKannada ? "ಲಿಂಕ್ ಅನ್ನು ನಕಲಿಸಲಾಗಿದೆ" : "Link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Government Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="p-1.5 bg-white rounded-xl border border-slate-200 shadow-2xs shrink-0">
                <img 
                  src={karnatakaEmblem} 
                  alt="Karnataka State Police Crest" 
                  className="h-8 w-auto object-contain" 
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                    Government of Karnataka
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                    Official Portal
                  </span>
                </div>
                <h1 className="text-sm sm:text-base font-bold text-[#0F172A] leading-tight">
                  Karnataka State Police • Legal & Compliance Bureau
                </h1>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold border-slate-200 hover:bg-slate-50"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>{isKannada ? "ಮುದ್ರಿಸಿ" : "Print Document"}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold border-slate-200 hover:bg-slate-50"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{isKannada ? "ಹಂಚಿಕೊಳ್ಳಿ" : "Share"}</span>
            </Button>

            <Link to="/">
              <Button size="sm" className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white text-xs font-semibold shadow-xs">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                <span>{isKannada ? "ಮುಖಪುಟ" : "Back to Home"}</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner Area */}
      <section className="bg-linear-to-b from-white to-[#F1F5F9] border-b border-[#E2E8F0] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold">
                <Scale className="h-3.5 w-3.5 text-blue-600" />
                <span>State Crime Records Bureau (SCRB) Mandate</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {activeTab === "privacy" && (isKannada ? "ಗೌಪ್ಯತಾ ನೀತಿ ಮತ್ತು ದತ್ತಾಂಶ ಸಂರಕ್ಷಣೆ" : "Privacy Policy & Data Protection")}
                {activeTab === "terms" && (isKannada ? "ಬಳಕೆಯ ನಿಯಮಗಳು ಮತ್ತು ನಿಬಂಧನೆಗಳು" : "Terms of Use & Legal Disclaimer")}
                {activeTab === "accessibility" && (isKannada ? "ಡಿಜಿಟಲ್ ಪ್ರವೇಶಿಸುವಿಕೆ ಹೇಳಿಕೆ" : "Digital Accessibility Statement")}
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {activeTab === "privacy" && (
                  isKannada
                    ? "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ದತ್ತಾಂಶ ಸಂರಕ್ಷಣಾ ನೀತಿಯು ಭಾರತೀಯ ಡಿಜಿಟಲ್ ವೈಯಕ್ತಿಕ ದತ್ತಾಂಶ ಸಂರಕ್ಷಣಾ ಕಾಯ್ದೆ (DPDPA 2023) ಮತ್ತು ಐಟಿ ಕಾಯ್ದೆ 2000 ಕ್ಕೆ ಅನುಗುಣವಾಗಿದೆ."
                    : "Official statutory data governance and privacy disclosures governed under the Digital Personal Data Protection Act (DPDPA) 2023 and the Information Technology Act 2000."
                )}
                {activeTab === "terms" && (
                  isKannada
                    ? "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ಅಧಿಕೃತ ಜಾಲತಾಣದ ಬಳಕೆಯ ಅಧಿಕೃತ ಷರತ್ತುಗಳು, ನಾಗರಿಕರ ಜವಾಬ್ದಾರಿಗಳು ಮತ್ತು ಕಾನೂನು ಹೊಣೆಗಾರಿಕೆಗಳು."
                    : "Standard operating terms, authorized usage guidelines, citizen compliance mandates, and legal liabilities under the Karnataka Police Act 1963."
                )}
                {activeTab === "accessibility" && (
                  isKannada
                    ? "ಎಲ್ಲಾ ನಾಗರಿಕರು ಮತ್ತು ಅಂಗವಿಕಲರಿಗೆ ಸಮಾನ ಡಿಜಿಟಲ್ ಪ್ರವೇಶವನ್ನು ಖಚಿತಪಡಿಸುವ ಭಾರತ ಸರ್ಕಾರದ ಮಾರ್ಗಸೂಚಿಗಳು (GIGW 3.0) ಮತ್ತು WCAG 2.1 AA ಮಾನದಂಡ."
                    : "Commitment to universal digital inclusion under the Guidelines for Indian Government Websites (GIGW 3.0) and WCAG 2.1 Level AA Accessibility Standards."
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              <div className="text-xs text-[#64748B] bg-white p-3 rounded-xl border border-[#E2E8F0] shadow-2xs space-y-0.5">
                <div className="font-semibold text-[#0F172A] flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Gazette Compliance Verified</span>
                </div>
                <div>Last Updated: <strong>July 2026</strong></div>
                <div>Version: <span className="font-mono font-bold text-slate-700">KSP-GOV-v2.4</span></div>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleTabChange("privacy")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === "privacy"
                  ? "bg-[#1E3A8A] text-white shadow-xs"
                  : "bg-white text-[#475569] hover:bg-slate-100 border border-[#E2E8F0]"
              }`}
            >
              <Lock className="h-4 w-4" />
              <span>{isKannada ? "ಗೌಪ್ಯತಾ ನೀತಿ" : "Privacy Policy"}</span>
            </button>

            <button
              onClick={() => handleTabChange("terms")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === "terms"
                  ? "bg-[#1E3A8A] text-white shadow-xs"
                  : "bg-white text-[#475569] hover:bg-slate-100 border border-[#E2E8F0]"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>{isKannada ? "ಬಳಕೆಯ ನಿಯಮಗಳು" : "Terms of Use"}</span>
            </button>

            <button
              onClick={() => handleTabChange("accessibility")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === "accessibility"
                  ? "bg-[#1E3A8A] text-white shadow-xs"
                  : "bg-white text-[#475569] hover:bg-slate-100 border border-[#E2E8F0]"
              }`}
            >
              <Accessibility className="h-4 w-4" />
              <span>{isKannada ? "ಪ್ರವೇಶಿಸುವಿಕೆ ಹೇಳಿಕೆ" : "Accessibility Statement"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quick Search & Table of Contents Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Clause Search Input */}
            <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs space-y-3">
              <label htmlFor="legal-search" className="text-xs font-bold text-[#0F172A] block uppercase tracking-wider">
                {isKannada ? "ನಿಯಮಗಳಲ್ಲಿ ಹುಡುಕಿ" : "Search in Provisions"}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  id="legal-search"
                  type="text"
                  placeholder={isKannada ? "ಕೀವರ್ಡ್ ನಮೂದಿಸಿ (ಉದಾ: e-FIR, CCTV, Data)..." : "Filter clauses (e.g. e-FIR, Biometrics, DPDPA)..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-xs"
                />
              </div>
              {searchQuery && (
                <p className="text-[11px] text-slate-500">
                  Filtering sections matching: <strong className="text-slate-800 font-mono">"{searchQuery}"</strong>
                </p>
              )}
            </div>

            {/* Table of Contents Index */}
            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#1E3A8A]" />
                <span>{isKannada ? "ವಿಷಯ ಸೂಚಿ" : "Document Sections"}</span>
              </h3>
              
              <nav className="space-y-1.5 text-xs">
                {activeTab === "privacy" && (
                  <>
                    <a href="#priv-1" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      1. Statutory Framework & Scope
                    </a>
                    <a href="#priv-2" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      2. Information We Collect
                    </a>
                    <a href="#priv-3" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      3. Law Enforcement Purpose & Usage
                    </a>
                    <a href="#priv-4" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      4. Data Security, Sovereign Hosting & Encryption
                    </a>
                    <a href="#priv-5" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      5. Inter-Agency Sharing (ICJS / CCTNS)
                    </a>
                    <a href="#priv-6" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      6. Retention Mandates & Legal Archival
                    </a>
                    <a href="#priv-7" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      7. Citizen Rights & Data Redressal
                    </a>
                    <a href="#priv-8" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      8. Grievance Officer & DPO Contact
                    </a>
                  </>
                )}

                {activeTab === "terms" && (
                  <>
                    <a href="#terms-1" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      1. Acceptance & Sovereign Authorization
                    </a>
                    <a href="#terms-2" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      2. Permitted Use & Citizen Mandates
                    </a>
                    <a href="#terms-3" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      3. False Complaints & Penal Consequences
                    </a>
                    <a href="#terms-4" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      4. Law Enforcement Officer Confidentiality
                    </a>
                    <a href="#terms-5" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      5. Emblem & Intellectual Property Protection
                    </a>
                    <a href="#terms-6" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      6. Limitation of Liability & Official Disclaimer
                    </a>
                    <a href="#terms-7" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      7. Cyber Crimes & Judicial Jurisdiction
                    </a>
                  </>
                )}

                {activeTab === "accessibility" && (
                  <>
                    <a href="#acc-1" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      1. Universal Inclusivity Declaration
                    </a>
                    <a href="#acc-2" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      2. Conformance Standards (WCAG 2.1 AA & GIGW)
                    </a>
                    <a href="#acc-3" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      3. Assistive Technology Support Features
                    </a>
                    <a href="#acc-4" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      4. Bilingual Text & Screen Reader Compatibility
                    </a>
                    <a href="#acc-5" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      5. Continuous Monitoring & Testing Protocol
                    </a>
                    <a href="#acc-6" className="block py-1 px-2.5 rounded-lg text-[#475569] hover:bg-slate-50 hover:text-[#1E3A8A] transition-colors">
                      6. Accessibility Nodal Officer & Redressal
                    </a>
                  </>
                )}
              </nav>
            </div>

            {/* Official Nodal Grievance Contact Card */}
            <div className="bg-linear-to-br from-[#1E3A8A] to-[#0F172A] text-white p-5 rounded-2xl shadow-sm space-y-3.5">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-300" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Statutory Nodal Authority</h4>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                State Crime Records Bureau (SCRB), Police Headquarters, Bengaluru.
              </p>
              <div className="space-y-2 text-xs text-blue-200">
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-3.5 w-3.5 text-blue-300 shrink-0" />
                  <span>Direct Desk: +91 80 2294 2222</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-blue-300 shrink-0" />
                  <a href="mailto:grievance-scrb@ksp.gov.in" className="hover:underline text-white font-medium">
                    grievance-scrb@ksp.gov.in
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-blue-300 shrink-0 mt-0.5" />
                  <span>Nrupatunga Road, Bengaluru, Karnataka 560001</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Detailed Legal Content Body */}
          <div className="lg:col-span-8 space-y-8">

            {/* ========================================================================= */}
            {/* TAB 1: PRIVACY POLICY */}
            {/* ========================================================================= */}
            {activeTab === "privacy" && (
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E2E8F0] shadow-xs space-y-8 leading-relaxed text-[#334155] text-sm">
                
                {/* Intro summary banner */}
                <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-900 leading-relaxed">
                    <strong>Official Notice:</strong> Karnataka State Police (KSP), under the Home Department, Government of Karnataka, adheres strictly to constitutional privacy protections and the <strong>Digital Personal Data Protection Act (DPDPA), 2023</strong>. Data collected is exclusively utilized for crime prevention, legal proceedings, public safety, and statutory law enforcement duties.
                  </div>
                </div>

                {/* Section 1 */}
                <section id="priv-1" className="space-y-2.5 pt-2">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">1.</span> Statutory Framework & Regulatory Scope
                  </h3>
                  <p>
                    This Privacy Policy applies to all digital portals, web platforms, mobile applications, e-FIR gateways, and citizen services operated by the <strong>Karnataka State Police (KSP)</strong> and the <strong>State Crime Records Bureau (SCRB)</strong>.
                  </p>
                  <p>
                    The processing of information on this portal is legally sanctioned under the <strong>Karnataka Police Act, 1963</strong>, the <strong>Code of Criminal Procedure / Bharatiya Nagarik Suraksha Sanhita (BNSS)</strong>, the <strong>Information Technology Act, 2000 (Sections 43A, 72A)</strong>, and the <strong>Digital Personal Data Protection Act, 2023</strong>.
                  </p>
                </section>

                {/* Section 2 */}
                <section id="priv-2" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">2.</span> Categories of Information Collected
                  </h3>
                  <p>In the discharge of our statutory policing duties, we collect and process the following information:</p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
                    <li><strong>Citizen Service Records:</strong> Name, contact telephone, Aadhaar/ID verification numbers, residential addresses submitted during e-FIR filing, character verification, missing person reports, or lost property declarations.</li>
                    <li><strong>Emergency Telemetry (112 ERSS):</strong> Real-time geolocation coordinates, caller voice logs, dispatch timestamps, and incident descriptions.</li>
                    <li><strong>Investigative & Case Records:</strong> Statements, forensic digital evidence, FIR docket numbers, witness testimonies, chargesheet parameters, and court appearances.</li>
                    <li><strong>Automated Device & Network Logs:</strong> IP addresses, browser types, session timestamps, and authentication audit trails recorded to safeguard system integrity against cyber threats.</li>
                  </ul>
                </section>

                {/* Section 3 */}
                <section id="priv-3" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">3.</span> Lawful Purpose of Data Processing
                  </h3>
                  <p>Information collected through this platform is processed strictly for legitimate state functions:</p>
                  <div className="grid sm:grid-cols-2 gap-3 pt-1 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-[#0F172A] block mb-1">Investigation & Prosecution</strong>
                      Registering complaints, conducting formal police investigations, evidence collation, and submitting chargesheets before courts of law.
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-[#0F172A] block mb-1">Emergency Dispatch (112)</strong>
                      Routing immediate emergency medical, fire, or police first-responders to citizen distress calls across Karnataka.
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-[#0F172A] block mb-1">Citizen Verification Services</strong>
                      Verifying antecedents for employment, passport processing, tenant verification, and gun licensing as permitted by law.
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-[#0F172A] block mb-1">Crime Intelligence & Analytics</strong>
                      Anonymized predictive geospatial mapping to optimize patrol allocation and curb repeat offences in high-risk zones.
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section id="priv-4" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">4.</span> Sovereign Data Storage, Hosting & Encryption
                  </h3>
                  <p>
                    All state police records and biometric indices are hosted exclusively on sovereign, ISO 27001-certified government infrastructure within India, utilizing the <strong>Karnataka State Data Centre (SDC)</strong> and <strong>National Informatics Centre (NIC)</strong> infrastructure.
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
                    <li><strong>Encryption in Transit:</strong> Transport Layer Security (TLS 1.3) with 256-bit encryption for all browser-to-server exchanges.</li>
                    <li><strong>Encryption at Rest:</strong> Database columns storing sensitive identifiers are encrypted using AES-256 GCM cryptographic standards.</li>
                    <li><strong>Role-Based Access Control (RBAC):</strong> Access is strictly restricted to sworn officers and authenticated analysts via Multi-Factor Authentication (MFA) and immutable digital audit logs.</li>
                  </ul>
                </section>

                {/* Section 5 */}
                <section id="priv-5" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">5.</span> Inter-Agency Sharing & Judicial Exchange
                  </h3>
                  <p>
                    Data is not commercialized or shared with private advertisers. Lawful disclosure occurs strictly with statutory judicial and enforcement institutions via secure national grids:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
                    <li><strong>Inter-Operable Criminal Justice System (ICJS):</strong> Sharing FIRs and chargesheets with judicial courts, prosecution directorates, and correctional facilities.</li>
                    <li><strong>Crime and Criminal Tracking Network & Systems (CCTNS):</strong> Central synchronization with the Ministry of Home Affairs (MHA) and National Crime Records Bureau (NCRB).</li>
                  </ul>
                </section>

                {/* Section 6 */}
                <section id="priv-6" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">6.</span> Data Retention & Archival Mandates
                  </h3>
                  <p>
                    Under the <em>Karnataka Police Manual</em> and statutory criminal procedural codes, criminal records, FIR registers, and trial dockets are retained permanently or in accordance with judicial archival timelines. Non-investigative web session logs are purged automatically after 180 days.
                  </p>
                </section>

                {/* Section 7 */}
                <section id="priv-7" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">7.</span> Citizen Rights & Correction Mechanisms
                  </h3>
                  <p>
                    Citizens who have submitted grievance or verification requests have the right to review the status of their application, request corrections to clerical typographical errors, and lodge data protection inquiries with the designated Grievance Officer.
                  </p>
                </section>

                {/* Section 8 */}
                <section id="priv-8" className="space-y-2.5 pt-2">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">8.</span> Data Protection & Grievance Redressal Officer
                  </h3>
                  <p>
                    For inquiries or complaints regarding this Privacy Policy or personal data handling, contact:
                  </p>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-[#0F172A]">Superintendent of Police (IT & Telecommunication)</div>
                    <div>State Crime Records Bureau, Police Headquarters</div>
                    <div>Nrupatunga Road, Bengaluru, Karnataka 560001</div>
                    <div>Email: <a href="mailto:dpo-ksp@karnataka.gov.in" className="text-[#1E3A8A] font-semibold underline">dpo-ksp@karnataka.gov.in</a></div>
                    <div>Helpline: +91 80 2294 2222 | Emergency: 112</div>
                  </div>
                </section>

              </div>
            )}


            {/* ========================================================================= */}
            {/* TAB 2: TERMS OF USE */}
            {/* ========================================================================= */}
            {activeTab === "terms" && (
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E2E8F0] shadow-xs space-y-8 leading-relaxed text-[#334155] text-sm">
                
                {/* Intro warning banner */}
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-950 leading-relaxed">
                    <strong>Statutory Warning:</strong> This is an official Government of Karnataka information system. Unauthorized access, submission of false FIRs, hoax 112 emergency calls, or tampering with digital evidence is a punishable offence under the Bharatiya Nyaya Sanhita (BNS) and the Information Technology Act, 2000.
                  </div>
                </div>

                {/* Section 1 */}
                <section id="terms-1" className="space-y-2.5 pt-2">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">1.</span> Acceptance of Terms & Sovereign Authorization
                  </h3>
                  <p>
                    By accessing or using the <strong>Karnataka State Police (KSP) Web Platform</strong> and associated digital portals, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use and applicable state and central laws.
                  </p>
                </section>

                {/* Section 2 */}
                <section id="terms-2" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">2.</span> Permitted Use & Citizen Mandates
                  </h3>
                  <p>Users are permitted to utilize this portal strictly for lawful public safety and citizen services, including:</p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
                    <li>Submitting bona fide e-FIRs and non-cognizable reports.</li>
                    <li>Applying for police character verification, NOC certificates, and event permissions.</li>
                    <li>Reporting missing persons, abandoned vehicles, or lost articles.</li>
                    <li>Accessing official state police crime advisories, notifications, and emergency helplines.</li>
                  </ul>
                </section>

                {/* Section 3 */}
                <section id="terms-3" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">3.</span> False Complaints & Criminal Liability
                  </h3>
                  <p>
                    Users are strictly cautioned that providing false information, lodging fabricated criminal complaints, or misusing emergency dispatch (112) carries severe penal consequences under:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
                    <li><strong>BNS Section 217 / IPC Section 182:</strong> False information with intent to cause public servant to use lawful power to injury of another person.</li>
                    <li><strong>BNS Section 248 / IPC Section 211:</strong> False charge of offence made with intent to injure.</li>
                    <li><strong>Information Technology Act, 2000 (Section 66D):</strong> Cheating by personation using computer resource.</li>
                  </ul>
                </section>

                {/* Section 4 */}
                <section id="terms-4" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">4.</span> Sworn Officer Duties & Confidentiality
                  </h3>
                  <p>
                    Law enforcement personnel accessing internal modules (Command Dashboard, AI Copilot, Criminal Network Graph, Case Dossiers) are governed by the <strong>Official Secrets Act, 1923</strong>, and the <em>Karnataka Police Code of Conduct</em>. Any unauthorized exfiltration, leaking, or disclosure of investigative dossiers is subject to departmental court-martial and criminal prosecution.
                  </p>
                </section>

                {/* Section 5 */}
                <section id="terms-5" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">5.</span> State Emblem & Intellectual Property Protection
                  </h3>
                  <p>
                    The Karnataka State Police insignia, Gandaberunda state crest, graphics, and platform layout are protected under the <strong>State Emblem of India (Prohibition of Improper Use) Act, 2005</strong>, and copyright laws. Unauthorized reproduction or imitation is prohibited.
                  </p>
                </section>

                {/* Section 6 */}
                <section id="terms-6" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">6.</span> Official Disclaimer & Limitation of Liability
                  </h3>
                  <p>
                    While KSP strives to ensure high accuracy and continuous availability, this portal is provided on an "as-is" and "as-available" basis for government service delivery. The department is not liable for indirect damages arising from scheduled server maintenance, force majeure events, or telecommunication network failures.
                  </p>
                </section>

                {/* Section 7 */}
                <section id="terms-7" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">7.</span> Governing Law & Judicial Jurisdiction
                  </h3>
                  <p>
                    These terms are governed exclusively by the laws of the Republic of India. Any legal dispute or proceeding arising out of the use of this portal shall be subject to the exclusive jurisdiction of the competent courts in <strong>Bengaluru, Karnataka</strong>.
                  </p>
                </section>

              </div>
            )}


            {/* ========================================================================= */}
            {/* TAB 3: ACCESSIBILITY STATEMENT */}
            {/* ========================================================================= */}
            {activeTab === "accessibility" && (
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E2E8F0] shadow-xs space-y-8 leading-relaxed text-[#334155] text-sm">
                
                {/* Intro banner */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-start gap-3">
                  <Accessibility className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950 leading-relaxed">
                    <strong>Universal Access Commitment:</strong> Karnataka State Police is committed to ensuring that our digital portal is fully accessible to all citizens, including persons with visual, auditory, motor, or cognitive disabilities, adhering to <strong>WCAG 2.1 Level AA</strong> standards and <strong>GIGW 3.0</strong> guidelines.
                  </div>
                </div>

                {/* Section 1 */}
                <section id="acc-1" className="space-y-2.5 pt-2">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">1.</span> Universal Inclusivity Declaration
                  </h3>
                  <p>
                    In accordance with the <strong>Rights of Persons with Disabilities Act, 2016</strong>, this portal has been engineered to provide equitable, barrier-free access to public police services, FIR filing, and emergency alerts for all citizens across Karnataka.
                  </p>
                </section>

                {/* Section 2 */}
                <section id="acc-2" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">2.</span> Conformance Standards (WCAG 2.1 AA & GIGW 3.0)
                  </h3>
                  <p>
                    This platform adheres to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> established by the World Wide Web Consortium (W3C), and complies with the <strong>Guidelines for Indian Government Websites (GIGW 3.0)</strong> formulated by the National Informatics Centre (NIC).
                  </p>
                </section>

                {/* Section 3 */}
                <section id="acc-3" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">3.</span> Accessibility Features Implemented
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 pt-1 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-[#0F172A] block mb-1">Keyboard Navigation</strong>
                      All interactive controls, forms, modals, and navigation drawers can be navigated seamlessly using <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono">Tab</kbd>, <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono">Enter</kbd>, and <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono">Esc</kbd>.
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-[#0F172A] block mb-1">Screen Reader Compatibility</strong>
                      Structured semantic HTML5 tags with ARIA labels and live region announcements for NVDA, JAWS, VoiceOver, and TalkBack.
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-[#0F172A] block mb-1">High Contrast & Color Legibility</strong>
                      Color contrast ratios meet or exceed the 4.5:1 ratio for normal text and 3:1 for large text across light and dark modes.
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-[#0F172A] block mb-1">Responsive Text Resizing</strong>
                      Users can zoom interface text up to 200% without loss of content, horizontal scrolling, or broken layout structures.
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section id="acc-4" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">4.</span> Bilingual Support (English & Kannada)
                  </h3>
                  <p>
                    All public citizen services, legal notices, and navigation elements feature native bilingual support with UTF-8 Kannada (<strong className="text-slate-800">ಕನ್ನಡ</strong>) font embedding to ensure linguistic inclusivity across urban and rural Karnataka.
                  </p>
                </section>

                {/* Section 5 */}
                <section id="acc-5" className="space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">5.</span> Supported Browsers & Assistive Tech
                  </h3>
                  <p>This portal is tested and certified across modern browsers and screen reading software:</p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
                    <li><strong>Browsers:</strong> Google Chrome (v100+), Mozilla Firefox (v100+), Apple Safari (v15+), Microsoft Edge (v100+).</li>
                    <li><strong>Screen Readers:</strong> NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS), TalkBack (Android).</li>
                  </ul>
                </section>

                {/* Section 6 */}
                <section id="acc-6" className="space-y-2.5 pt-2">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#1E3A8A] font-mono">6.</span> Nodal Accessibility Officer & Feedback
                  </h3>
                  <p>
                    If you experience any difficulty accessing content or have suggestions to improve accessibility, please contact our Nodal Officer:
                  </p>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-[#0F172A]">Nodal Digital Accessibility Officer</div>
                    <div>State Crime Records Bureau, Police Headquarters</div>
                    <div>Nrupatunga Road, Bengaluru, Karnataka 560001</div>
                    <div>Email: <a href="mailto:accessibility@ksp.gov.in" className="text-[#1E3A8A] font-semibold underline">accessibility@ksp.gov.in</a></div>
                    <div>Phone: +91 80 2294 2222</div>
                  </div>
                </section>

              </div>
            )}

          </div>
        </div>
      </main>

      {/* Official Government Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] py-6 text-xs text-[#64748B] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={karnatakaEmblem} alt="KSP Emblem" className="h-6 w-auto object-contain" />
            <span>© {new Date().getFullYear()} Karnataka State Police • Government of Karnataka</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/privacy-policy" className={`hover:text-[#1E3A8A] transition-colors ${activeTab === 'privacy' ? 'text-[#1E3A8A] underline' : ''}`}>
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms-of-use" className={`hover:text-[#1E3A8A] transition-colors ${activeTab === 'terms' ? 'text-[#1E3A8A] underline' : ''}`}>
              Terms of Use
            </Link>
            <span>•</span>
            <Link to="/accessibility-statement" className={`hover:text-[#1E3A8A] transition-colors ${activeTab === 'accessibility' ? 'text-[#1E3A8A] underline' : ''}`}>
              Accessibility Statement
            </Link>
            <span>•</span>
            <Link to="/app/about" className="hover:text-[#1E3A8A] transition-colors">
              About Platform
            </Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
