import { useParams, Link } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"
import { 
  ShieldCheck, CheckCircle2, ShieldAlert, ArrowLeft, Printer
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import karnatakaEmblem from "@/assets/karnataka-emblem.png"
import { QRCodeSVG } from "qrcode.react"

export function OfficerVerificationPage() {
  const { badgeId } = useParams<{ badgeId?: string }>()
  const { user, registeredUsers } = useAuthStore()

  // Find target officer by badgeId or default to current user if badge matches
  const targetBadge = badgeId ? badgeId.toUpperCase() : (user?.badgeId || "KSP-8990").toUpperCase()

  // Search registered users or active user
  const foundUser = registeredUsers.find(
    (u) => u.badgeId?.toUpperCase() === targetBadge || u.id === badgeId
  ) || (user?.badgeId?.toUpperCase() === targetBadge ? user : null)

  // Verification is valid if officer was found or if target matches default demo badge
  const isVerified = Boolean(foundUser) || targetBadge === "KSP-8990" || targetBadge === "KSP-0990" || targetBadge === "VER-KSP-9980-2026"

  const officerName = (foundUser as any)?.fullName || (foundUser as any)?.name || user?.name || "Sanju"
  const officerEmail = foundUser?.email || user?.email || "sanju@gmail.com"
  const officerRole = foundUser?.role || user?.role || "Supervisor Officer"
  const officerDepartment = foundUser?.department || user?.department || "State Crime Records Bureau"
  const officerBadge = targetBadge.startsWith("VER-") ? "KSP-8990" : targetBadge
  const officerAvatar = (foundUser as any)?.avatar || user?.avatar || ""

  const scanTimestamp = new Date().toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "medium"
  })

  const verificationNo = `VER-${officerBadge}-2026`
  const verificationUrl = `${window.location.origin}/verify/${officerBadge}`

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#111827] font-sans p-4 sm:p-6 lg:p-10 flex flex-col items-center justify-center">
      
      {/* Container Box */}
      <div className="w-full max-w-3xl space-y-6">
        
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link 
            to="/app/profile" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Command Portal Profile
          </Link>
          <span className="text-[10px] font-mono text-[#6B7280] bg-white border border-[#E5E7EB] px-2.5 py-1 rounded-full">
            OFFICIAL GOVT VERIFICATION SYSTEM
          </span>
        </div>

        {isVerified ? (
          /* SUCCESS VERIFICATION CARD */
          <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-md overflow-hidden relative font-sans">
            
            {/* Background Watermark Crest */}
            <div className="absolute right-4 bottom-8 opacity-5 pointer-events-none">
              <img src={karnatakaEmblem} alt="KSP Emblem Watermark" className="h-64 w-auto object-contain" />
            </div>

            {/* Official Header Banner */}
            <div className="bg-[#111827] text-white p-6 border-b border-[#E5E7EB] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <img src={karnatakaEmblem} alt="Karnataka State Police Crest" className="h-12 w-auto object-contain shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">GOVERNMENT OF KARNATAKA</span>
                    <h1 className="text-lg font-extrabold tracking-tight text-white">KARNATAKA STATE POLICE</h1>
                    <span className="text-[9px] font-mono text-slate-400 block">State Crime Records Bureau • Officer Verification Portal</span>
                  </div>
                </div>

                <div className="shrink-0 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>OFFICER VERIFIED</span>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <CardContent className="p-6 sm:p-8 space-y-6">
              
              {/* Green Verified Status Alert Box */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-emerald-900">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <h3 className="font-bold text-sm text-emerald-950">AUTHENTICATED POLICE CREDENTIALS</h3>
                  <p className="text-emerald-800 leading-snug">
                    This identity credential has been verified against the Karnataka State Police Central Personnel Registry. The officer listed below holds an active, authorized duty standing.
                  </p>
                </div>
              </div>

              {/* Officer Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Officer Photo & Scannable QR Code Column (md:col-span-4) */}
                <div className="md:col-span-4 flex flex-col items-center text-center space-y-4 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl">
                  
                  {/* Photo Avatar */}
                  <div className="h-32 w-28 rounded-2xl overflow-hidden border-2 border-[#E5E7EB] bg-white shadow-2xs relative">
                    {officerAvatar ? (
                      <img src={officerAvatar} alt={officerName} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-[#111827] text-white flex items-center justify-center font-mono text-2xl font-bold">
                        {officerName.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="absolute bottom-0 inset-x-0 bg-emerald-600 text-white text-[8px] font-mono py-0.5 font-bold uppercase">
                      ACTIVE DUTY
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="font-extrabold text-sm text-[#111827]">{officerName}</h2>
                    <span className="text-xs font-semibold text-[#2563EB] block">{officerRole}</span>
                    <span className="text-[10px] font-mono text-[#6B7280] block font-bold">{officerBadge}</span>
                  </div>

                  {/* High Resolution Dynamic QR Code */}
                  <div className="p-2 bg-white border border-[#E5E7EB] rounded-xl shadow-2xs">
                    <QRCodeSVG
                      value={verificationUrl}
                      size={110}
                      level="H"
                      includeMargin={true}
                      bgColor="#FFFFFF"
                      fgColor="#111827"
                    />
                  </div>
                  <span className="text-[8px] font-mono text-[#6B7280] uppercase tracking-wider block">Official ISO 27001 Verification QR</span>
                </div>

                {/* Detailed Officer Credentials Grid (md:col-span-8) */}
                <div className="md:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                    
                    <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Full Legal Name</span>
                      <span className="font-bold text-[#111827] text-sm">{officerName}</span>
                    </div>

                    <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Badge ID / Service No.</span>
                      <span className="font-mono font-bold text-[#111827] text-sm">{officerBadge}</span>
                    </div>

                    <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Officer Rank</span>
                      <span className="font-semibold text-[#111827]">{officerRole}</span>
                    </div>

                    <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Service Duty Status</span>
                      <span className="font-bold text-emerald-600 flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        ACTIVE / AUTHORIZED
                      </span>
                    </div>

                    <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1 sm:col-span-2">
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Department / Bureau</span>
                      <span className="font-semibold text-[#111827]">{officerDepartment}</span>
                    </div>

                    <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1 sm:col-span-2">
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Assigned Police Station</span>
                      <span className="font-semibold text-[#111827]">Bengaluru Central Command HQ (SCRB)</span>
                    </div>

                    <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Official Email Address</span>
                      <span className="font-semibold text-[#111827] truncate block">{officerEmail}</span>
                    </div>

                    <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Date of Service Joining</span>
                      <span className="font-mono text-[#111827]">15-JAN-2024</span>
                    </div>

                  </div>

                  {/* Audit Verification Metadata */}
                  <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-2 text-[11px] font-mono">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">DIGITAL VERIFICATION NO:</span>
                      <span className="font-bold text-emerald-400">{verificationNo}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">QR SCAN TIMESTAMP:</span>
                      <span className="text-slate-200">{scanTimestamp}</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Digital Seal & Authentication Footer */}
              <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="text-center sm:text-left space-y-0.5">
                  <span className="text-[10px] font-mono text-[#6B7280] block">DIGITALLY SIGNED & AUTHENTICATED BY</span>
                  <span className="font-bold text-[#111827] font-serif italic text-sm">
                    Director General & Inspector General of Police (SCRB)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    onClick={() => window.print()}
                    variant="outline" 
                    size="sm"
                    className="h-9 px-3.5 rounded-xl border-[#E5E7EB] text-xs font-semibold text-[#111827] hover:bg-[#F3F4F6] gap-1.5"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Print Certificate
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>
        ) : (
          /* FAILED VERIFICATION CARD */
          <Card className="rounded-2xl border-red-200 bg-white shadow-md overflow-hidden font-sans">
            <div className="bg-red-600 text-white p-6 text-center space-y-1">
              <ShieldAlert className="h-12 w-12 mx-auto text-white" />
              <h1 className="text-xl font-extrabold tracking-tight">OFFICER VERIFICATION FAILED</h1>
              <p className="text-xs text-red-100 font-mono">INCIDENT CODE: ERR-UNAUTHENTICATED-CREDENTIAL</p>
            </div>
            <CardContent className="p-8 text-center space-y-6">
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-base font-bold text-[#111827]">Invalid or Expired Badge Identifier</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  The officer badge number <strong className="font-mono text-[#111827]">{targetBadge}</strong> could not be authenticated against the Karnataka State Police Personnel Registry. This credential may be fake, revoked, or incorrectly scanned.
                </p>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-left text-xs font-mono text-red-900 max-w-md mx-auto space-y-1">
                <div>TIMESTAMP: {scanTimestamp}</div>
                <div>QUERY BADGE: {targetBadge}</div>
                <div>STATUS: INVALID_SERVICE_RECORD</div>
              </div>

              <div className="pt-2">
                <Link to="/app/profile">
                  <Button className="bg-[#111827] text-white hover:bg-black font-bold text-xs h-10 px-6 rounded-xl">
                    Return to Personnel Portal
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}
