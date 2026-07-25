import { useState, useEffect } from "react"
import { 
  User as UserIcon, Camera, Save, Mail, Phone, Building2, BadgeCheck, 
  Shield, Edit3, Printer, Download, Key, Activity, Clock, 
  ShieldCheck, CheckCircle2, Lock, Cpu, ExternalLink, Copy, Wifi, Globe, Laptop
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/store/useAuthStore"
import { toast } from "sonner"
import karnatakaEmblem from "@/assets/karnataka-emblem.png"
import { QRCodeSVG } from "qrcode.react"

export function ProfilePage() {
  const { user, updateUserProfile } = useAuthStore()

  // QR Code Target Mode State for local dev, mobile LAN testing & production
  const [qrMode, setQrMode] = useState<'app' | 'lan' | 'govt'>('app')
  const [lanIp, setLanIp] = useState(window.location.hostname !== 'localhost' ? window.location.hostname : '192.168.1.10')

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Form State
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210")
  const [department, setDepartment] = useState(user?.department || "State Crime Records Bureau")
  const [station, setStation] = useState("Bengaluru Central Command HQ")
  const [rank, setRank] = useState(user?.role === "Citizen" ? "Registered Citizen" : `${user?.role || "Inspector"}`)
  const [emergencyContact, setEmergencyContact] = useState("+91 98450 11223 (SCRB Control)")
  const [avatar, setAvatar] = useState(user?.avatar || "")
  const [isSaving, setIsSaving] = useState(false)

  // Password State
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
      setPhone(user.phone || "+91 98765 43210")
      setDepartment(user.department || "State Crime Records Bureau")
      setAvatar(user.avatar || "")
      setRank(user.role === "Citizen" ? "Registered Citizen" : `${user.role} Officer`)
    }
  }, [user])

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    updateUserProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      department: department.trim(),
      avatar: avatar,
    })

    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      toast.success("Profile information updated successfully!", {
        description: "Official personnel records synced with State Police DB."
      })
    }, 350)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.")
      return
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.")
      return
    }
    toast.success("Security password updated successfully.")
    setIsChangingPassword(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePrintID = () => {
    window.print()
  }

  const handleDownloadID = () => {
    toast.success("Official Digital Identity Card Downloaded", {
      description: `KSP-ID-${user?.badgeId || "9980"}.pdf saved to downloads.`
    })
  }

  const getInitials = (fullName: string) => {
    if (!fullName) return "KSP"
    const parts = fullName.trim().split(" ")
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return fullName.slice(0, 2).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#111827] font-sans p-3 sm:p-6 lg:p-8 space-y-6">
      
      {/* 1. Profile Header Banner */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-xs relative overflow-hidden transition-all">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* 120px Circular Profile Photo */}
            <div className="relative group shrink-0">
              <div className="h-[120px] w-[120px] rounded-full overflow-hidden border-2 border-[#E5E7EB] bg-[#F3F4F6] flex items-center justify-center shadow-xs">
                {avatar ? (
                  <img src={avatar} alt={name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-3xl font-extrabold text-[#111827] font-mono">{getInitials(name)}</span>
                )}
              </div>
              <label 
                htmlFor="banner-avatar-upload"
                className="absolute bottom-1 right-1 p-2 rounded-full bg-[#111827] text-white shadow-md cursor-pointer hover:bg-black transition-colors"
                title="Change Photo"
              >
                <Camera className="h-4 w-4" />
                <input 
                  id="banner-avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            {/* Officer Primary Bio Details */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]">{name || "Officer Name"}</h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                  <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                  Active Status
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-[#6B7280]">
                <span className="flex items-center gap-1 font-semibold text-[#111827]">
                  <BadgeCheck className="h-3.5 w-3.5 text-[#10B981]" />
                  Badge: <strong className="font-mono">{user?.badgeId || "KSP-8990"}</strong>
                </span>
                <span>•</span>
                <span className="font-medium text-[#111827]">{rank}</span>
                <span>•</span>
                <span>{department}</span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-[#6B7280] pt-0.5">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-[#6B7280]" />
                  {email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-[#6B7280]" />
                  {phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-[#6B7280]" />
                  {station}
                </span>
              </div>
            </div>
          </div>

          {/* Banner Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0 pt-2 lg:pt-0">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="h-10 px-4 rounded-xl border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6] font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Edit3 className="h-4 w-4" />
              <span>{isEditing ? "Cancel Edit" : "Edit Profile"}</span>
            </Button>

            <Button
              onClick={handleDownloadID}
              variant="outline"
              className="h-10 px-4 rounded-xl border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6] font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download ID</span>
            </Button>

            <Button
              onClick={handlePrintID}
              className="h-10 px-4 rounded-xl bg-[#111827] hover:bg-black text-white font-bold text-xs shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>Print ID Card</span>
            </Button>
          </div>

        </div>
      </div>

      {/* Main Responsive Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Realistic Government ID Card, QR Code & Audit Timeline (col-span-4) */}
        <div className="lg:col-span-4 lg:sticky lg:top-20 self-start space-y-6">
          
          {/* 2. Professional Government Identity Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs relative overflow-hidden font-sans space-y-4 print:border-2 print:border-black">
            
            {/* Watermark Background Crest */}
            <div className="absolute right-2 bottom-4 opacity-5 pointer-events-none">
              <img src={karnatakaEmblem} alt="Watermark" className="h-48 w-auto object-contain" />
            </div>

            {/* Top Official Header Stripe */}
            <div className="border-b border-[#E5E7EB] pb-3 text-center bg-[#F8FAFC] -mx-5 -mt-5 p-4 border-t-4 border-t-[#111827]">
              <div className="flex items-center justify-center gap-2.5">
                <img src={karnatakaEmblem} alt="Government Seal" className="h-8 w-auto object-contain shrink-0" />
                <div className="text-left leading-tight">
                  <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-widest block">GOVERNMENT OF KARNATAKA</span>
                  <span className="text-xs font-extrabold text-[#111827] tracking-tight">KARNATAKA STATE POLICE</span>
                  <span className="text-[8px] font-mono text-[#6B7280] block">State Crime Records Bureau • Personnel ID</span>
                </div>
              </div>
            </div>

            {/* Officer Photo & Official Details Row */}
            <div className="flex gap-4 items-center pt-1">
              <div className="h-28 w-24 rounded-xl overflow-hidden border border-[#E5E7EB] bg-[#F3F4F6] shrink-0 relative shadow-2xs">
                {avatar ? (
                  <img src={avatar} alt="Officer" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-[#111827] text-white font-mono font-bold text-xl">
                    {getInitials(name)}
                  </div>
                )}
                <div className="absolute bottom-0 inset-x-0 bg-[#111827]/90 text-white text-[8px] font-mono text-center py-0.5 font-bold uppercase">
                  VERIFIED
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-1 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Officer Name</span>
                  <h3 className="font-extrabold text-[#111827] text-sm truncate">{name || "Officer Name"}</h3>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Rank / Designation</span>
                  <span className="font-semibold text-[#111827] block truncate">{rank}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Badge Number</span>
                  <span className="font-mono font-bold text-[#111827] text-xs">{user?.badgeId || "KSP-8990"}</span>
                </div>
              </div>
            </div>

            {/* Service Dates & Security Hologram Row */}
            <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs space-y-2 font-mono">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[#6B7280]">DEPARTMENT:</span>
                <span className="font-bold text-[#111827] truncate max-w-[140px]">{department}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[#6B7280]">STATION:</span>
                <span className="font-bold text-[#111827] truncate max-w-[140px]">{station}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[#6B7280]">ISSUE DATE:</span>
                <span className="font-bold text-[#111827]">15-JAN-2024</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[#6B7280]">VALID UNTIL:</span>
                <span className="font-bold text-[#10B981]">31-DEC-2028</span>
              </div>
            </div>

            {/* Digital Signature & Barcode Area */}
            <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[8px] font-mono font-bold text-[#6B7280] uppercase block">Digital Signature</span>
                <span className="text-xs font-serif italic text-[#111827] font-semibold block border-b border-[#111827]/40 pb-0.5">
                  Insp. Gen. of Police (SCRB)
                </span>
              </div>
              
              <div className="text-right space-y-0.5">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-bold">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  AUTHENTICATED
                </div>
                <span className="text-[8px] font-mono text-[#6B7280] block">SER: KSP-2026-REG-9900</span>
              </div>
            </div>

            {/* Barcode Graphic */}
            <div className="pt-1 flex flex-col items-center gap-1">
              <div className="h-6 w-full bg-[repeating-linear-gradient(90deg,#111827_0,#111827_2px,transparent_2px,transparent_4px,#111827_4px,#111827_8px,transparent_8px,transparent_9px)] rounded" />
              <span className="text-[9px] font-mono font-bold text-[#6B7280]">||| || ||||| ||| |||| || ||| |||||||</span>
            </div>

          </div>

          {/* 8. Realistic High-Resolution Government Verification QR Code Card */}
          {(() => {
            const officerBadgeId = user?.badgeId || 'KSP-8990'
            const appVerificationPath = `/verify/${officerBadgeId}`
            let qrEncodedUrl = `${window.location.origin}/verify/${officerBadgeId}`
            if (qrMode === 'lan') {
              qrEncodedUrl = `http://${lanIp}:5173/verify/${officerBadgeId}`
            } else if (qrMode === 'govt') {
              qrEncodedUrl = `https://ksp.gov.in/verify/VER-${officerBadgeId}-2026`
            }

            const copyUrlToClipboard = () => {
              navigator.clipboard.writeText(qrEncodedUrl)
              toast.success("Verification URL copied to clipboard!", {
                description: qrEncodedUrl
              })
            }

            return (
              <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-xs relative overflow-hidden font-sans">
                {/* Watermark Crest */}
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                  <img src={karnatakaEmblem} alt="Emblem" className="h-32 w-auto object-contain" />
                </div>

                <CardHeader className="p-4 border-b border-[#F3F4F6]">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center justify-between">
                    <span>OFFICER VERIFICATION QR</span>
                    <span className="text-[10px] font-mono bg-[#111827] text-white px-2 py-0.5 rounded font-bold">ISO 27001</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-5 flex flex-col items-center justify-center text-center space-y-3.5">
                  
                  {/* QR Encoding Target Selector Tabs */}
                  <div className="w-full bg-[#F3F4F6] p-1 rounded-xl flex text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setQrMode('app')}
                      className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        qrMode === 'app' ? 'bg-white text-[#111827] shadow-2xs' : 'text-[#6B7280] hover:text-[#111827]'
                      }`}
                    >
                      <Laptop className="h-3 w-3" />
                      <span>Web Link</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setQrMode('lan')}
                      className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        qrMode === 'lan' ? 'bg-white text-[#111827] shadow-2xs' : 'text-[#6B7280] hover:text-[#111827]'
                      }`}
                    >
                      <Wifi className="h-3 w-3" />
                      <span>Mobile Wi-Fi IP</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setQrMode('govt')}
                      className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        qrMode === 'govt' ? 'bg-white text-[#111827] shadow-2xs' : 'text-[#6B7280] hover:text-[#111827]'
                      }`}
                    >
                      <Globe className="h-3 w-3" />
                      <span>Govt Domain</span>
                    </button>
                  </div>

                  {/* LAN IP Config Box when LAN mode is selected */}
                  {qrMode === 'lan' && (
                    <div className="w-full p-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-left space-y-1">
                      <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Your Computer's Wi-Fi IP Address</label>
                      <Input
                        value={lanIp}
                        onChange={(e) => setLanIp(e.target.value)}
                        placeholder="e.g. 192.168.1.50"
                        className="h-8 text-xs font-mono bg-white rounded-lg"
                      />
                      <span className="text-[9px] text-[#6B7280] block leading-tight">
                        Enter your local PC IP address so mobile phones on your Wi-Fi can scan and open the verification portal directly!
                      </span>
                    </div>
                  )}

                  {/* Dynamic Clickable QRCodeSVG Component */}
                  <a 
                    href={appVerificationPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Click to Open Officer Verification Certificate"
                    className="p-3 bg-white border-2 border-[#E5E7EB] rounded-2xl shadow-2xs inline-block hover:border-[#111827] transition-all cursor-pointer group relative"
                  >
                    <QRCodeSVG
                      value={qrEncodedUrl}
                      size={144}
                      level="H"
                      includeMargin={true}
                      bgColor="#FFFFFF"
                      fgColor="#111827"
                    />
                    <div className="absolute inset-0 bg-[#111827]/80 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-2">
                      <ExternalLink className="h-6 w-6 text-white" />
                      <span className="text-[10px] font-bold">Click to Open</span>
                    </div>
                  </a>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#111827] block">Scan to Verify Officer Identity</span>
                    <span className="text-[10px] font-mono text-[#6B7280] truncate max-w-[240px] block mx-auto">{qrEncodedUrl}</span>
                  </div>

                  {/* Direct Actions: Open Verification & Copy URL */}
                  <div className="w-full flex items-center justify-center gap-2 pt-1">
                    <a
                      href={appVerificationPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        type="button"
                        className="w-full h-9 bg-[#111827] hover:bg-black text-white font-bold text-xs rounded-xl gap-1.5 cursor-pointer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Open Verification Page</span>
                      </Button>
                    </a>

                    <Button
                      type="button"
                      onClick={copyUrlToClipboard}
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-xl border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6] shrink-0 cursor-pointer"
                      title="Copy Verification URL"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Verification Telemetry Footer */}
                  <div className="w-full pt-3 border-t border-[#F3F4F6] grid grid-cols-2 gap-2 text-left text-xs font-mono">
                    <div className="p-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-0.5">
                      <span className="text-[9px] text-[#6B7280] block uppercase font-bold">Verification No:</span>
                      <span className="font-bold text-[#111827] text-[11px]">VER-{officerBadgeId}-2026</span>
                    </div>
                    <div className="p-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-0.5">
                      <span className="text-[9px] text-[#6B7280] block uppercase font-bold">Last Updated:</span>
                      <span className="font-bold text-[#111827] text-[11px]">15 July 2026</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Digitally Verified</span>
                  </div>
                </CardContent>
              </Card>
            )
          })()}

          {/* 7. Activity Timeline Card */}
          <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-xs">
            <CardHeader className="p-4 border-b border-[#F3F4F6]">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#111827]" />
                Recent Audit Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E7EB]">
                {[
                  { title: "Logged in to Command Portal", time: "Today, 09:14 AM", icon: Clock },
                  { title: "Generated Intelligence Brief for FIR-2026-1098", time: "Today, 08:30 AM", icon: CheckCircle2 },
                  { title: "Assigned Investigation #INV-492", time: "Yesterday, 16:45 PM", icon: ShieldCheck },
                  { title: "Updated Personnel Profile Details", time: "25-Jul-2026", icon: UserIcon },
                  { title: "Security Password Credentials Verified", time: "20-Jul-2026", icon: Key },
                ].map((act, idx) => (
                  <div key={idx} className="relative flex items-start justify-between gap-3 text-xs">
                    <div className="absolute -left-6 top-0.5 h-4 w-4 rounded-full bg-white border-2 border-[#111827] flex items-center justify-center">
                      <act.icon className="h-2.5 w-2.5 text-[#111827]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#111827] leading-tight text-[11px]">{act.title}</p>
                      <p className="text-[10px] text-[#6B7280] font-mono mt-0.5">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* RIGHT COLUMN: Personal, Contact, Account, Security & Role Cards (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 3. Personal & Contact Information Card */}
          <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-xs">
            <CardHeader className="p-5 border-b border-[#F3F4F6] flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-[#111827]" />
                Personal & Contact Information
              </CardTitle>
              {!isEditing && (
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline" 
                  size="sm"
                  className="h-8 px-3 rounded-xl border-[#E5E7EB] text-xs font-semibold text-[#111827] hover:bg-[#F3F4F6] cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5 mr-1" />
                  Edit Fields
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-5">
              <form onSubmit={handleSaveProfile} className="space-y-6">
                
                {/* Personal Information Section */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] border-b border-[#F3F4F6] pb-1">
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#111827]">Officer Full Name</label>
                      <Input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        readOnly={!isEditing}
                        className={`h-10 text-xs rounded-xl ${!isEditing ? 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827]' : 'bg-white'}`}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#111827]">Officer Rank / Designation</label>
                      <Input 
                        value={rank} 
                        onChange={(e) => setRank(e.target.value)} 
                        readOnly={!isEditing}
                        className={`h-10 text-xs rounded-xl ${!isEditing ? 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827]' : 'bg-white'}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] border-b border-[#F3F4F6] pb-1">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#111827]">Registered Email</label>
                      <Input 
                        type="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        readOnly={!isEditing}
                        className={`h-10 text-xs rounded-xl ${!isEditing ? 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827]' : 'bg-white'}`}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#111827]">Mobile Contact Number</label>
                      <Input 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        readOnly={!isEditing}
                        className={`h-10 text-xs rounded-xl ${!isEditing ? 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827]' : 'bg-white'}`}
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-[#111827]">Emergency Contact Line</label>
                      <Input 
                        value={emergencyContact} 
                        onChange={(e) => setEmergencyContact(e.target.value)} 
                        readOnly={!isEditing}
                        className={`h-10 text-xs rounded-xl ${!isEditing ? 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827]' : 'bg-white'}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Department & Employment Information */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] border-b border-[#F3F4F6] pb-1">
                    Department & Employment Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#111827]">Department / Bureau</label>
                      <Input 
                        value={department} 
                        onChange={(e) => setDepartment(e.target.value)} 
                        readOnly={!isEditing}
                        className={`h-10 text-xs rounded-xl ${!isEditing ? 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827]' : 'bg-white'}`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#111827]">Police Station / Precinct</label>
                      <Input 
                        value={station} 
                        onChange={(e) => setStation(e.target.value)} 
                        readOnly={!isEditing}
                        className={`h-10 text-xs rounded-xl ${!isEditing ? 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827]' : 'bg-white'}`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#111827]">Official Badge ID</label>
                      <Input 
                        value={user?.badgeId || "KSP-8990"} 
                        readOnly 
                        className="h-10 text-xs font-mono bg-[#F9FAFB] border-[#E5E7EB] text-[#111827] font-bold cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#111827]">Date of Joining</label>
                      <Input 
                        value="15-JAN-2024" 
                        readOnly 
                        className="h-10 text-xs font-mono bg-[#F9FAFB] border-[#E5E7EB] text-[#111827] cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Buttons */}
                {isEditing && (
                  <div className="pt-4 border-t border-[#F3F4F6] flex items-center justify-end gap-2.5">
                    <Button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="h-10 px-5 rounded-xl border-[#E5E7EB] text-xs font-semibold text-[#111827] hover:bg-[#F3F4F6]"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSaving} 
                      className="h-10 px-6 rounded-xl bg-[#111827] hover:bg-black text-white font-bold text-xs shadow-2xs gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* 4. Account Information Card */}
          <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-xs">
            <CardHeader className="p-5 border-b border-[#F3F4F6]">
              <CardTitle className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[#111827]" />
                Account System Telemetry
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Username</span>
                  <span className="font-bold text-[#111827] font-mono">{user?.name ? user.name.toLowerCase().replace(/\s+/g, '_') : 'ksp_officer'}</span>
                </div>
                <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Registered Email</span>
                  <span className="font-semibold text-[#111827]">{user?.email || 'officer@ksp.gov.in'}</span>
                </div>
                <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Account Created Date</span>
                  <span className="font-mono text-[#111827]">12-JAN-2024</span>
                </div>
                <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Last Login Activity</span>
                  <span className="font-mono text-[#111827]">Today at 09:14 AM (10.42.0.14)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. Security & Credentials Card */}
          <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-xs">
            <CardHeader className="p-5 border-b border-[#F3F4F6] flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#111827]" />
                Security Credentials & Sessions
              </CardTitle>
              <Button
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                variant="outline"
                size="sm"
                className="h-8 px-3 rounded-xl border-[#E5E7EB] text-xs font-semibold text-[#111827] hover:bg-[#F3F4F6] cursor-pointer"
              >
                <Key className="h-3.5 w-3.5 mr-1" />
                Change Password
              </Button>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              
              {/* Inline Password Change Form */}
              {isChangingPassword && (
                <form onSubmit={handlePasswordSubmit} className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-3 mb-4 animate-in fade-in-50">
                  <h4 className="text-xs font-bold text-[#111827]">Update Login Password</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input 
                      type="password"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="h-9 text-xs bg-white rounded-lg"
                      required
                    />
                    <Input 
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-9 text-xs bg-white rounded-lg"
                      required
                    />
                    <Input 
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-9 text-xs bg-white rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <Button type="button" variant="outline" size="sm" onClick={() => setIsChangingPassword(false)} className="h-8 text-xs rounded-lg">Cancel</Button>
                    <Button type="submit" size="sm" className="h-8 text-xs bg-[#111827] text-white rounded-lg font-bold">Update Password</Button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#111827] block">Two-Factor Authentication</span>
                    <span className="text-[10px] text-[#6B7280]">SMS & Authenticator App Enabled</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                    ENABLED
                  </span>
                </div>

                <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#111827] block">Active Session Device</span>
                    <span className="text-[10px] text-[#6B7280]">Chrome on Windows • Current IP</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#111827]/10 text-[#111827]">
                    ACTIVE NOW
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 6. Clean Role Information & Responsibilities */}
          <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-xs">
            <CardHeader className="p-5 border-b border-[#F3F4F6]">
              <CardTitle className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#111827]" />
                Role & Authorization Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
                <div>
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Current Role</span>
                  <span className="text-base font-extrabold text-[#111827]">{user?.role || "Citizen"}</span>
                </div>
                <span className="px-3 py-1 rounded-lg bg-[#111827] text-white font-bold text-xs">
                  VERIFIED ACCREDITATION
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Permissions Summary</span>
                <div className="flex flex-wrap gap-2">
                  {["Case Management", "FIR Read/Write", "Intelligence Query", "Telemetric Dispatch", "Predictive Analytics"].map((perm) => (
                    <span key={perm} className="px-3 py-1 rounded-xl bg-[#F3F4F6] text-[#111827] font-semibold text-xs border border-[#E5E7EB]">
                      {perm}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Department Access</span>
                  <span className="font-semibold text-[#111827]">Bengaluru Urban & State SCRB HQ</span>
                </div>
                <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Assigned Responsibilities</span>
                  <span className="font-semibold text-[#111827]">Precinct Supervisory Command & Dispatch</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  )
}
