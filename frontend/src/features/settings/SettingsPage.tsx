import { useState, useEffect } from "react"
import { 
  Palette, Globe, Accessibility, Bell, Shield, Key, 
  User as UserIcon, Keyboard, Info, Check, LogOut, Camera, Save
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore } from "@/store/useAuthStore"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/hooks/useLanguage"
import { toast } from "sonner"

const SETTINGS_TABS = [
  { id: "profile", label: "settings.profile", icon: UserIcon },
  { id: "appearance", label: "settings.appearance", icon: Palette },
  { id: "language", label: "settings.language", icon: Globe },
  { id: "accessibility", label: "settings.accessibility", icon: Accessibility },
  { id: "notifications", label: "settings.notifications", icon: Bell },
  { id: "security", label: "settings.security", icon: Shield },
  { id: "roles", label: "settings.roles", icon: Key },
  { id: "shortcuts", label: "settings.shortcuts", icon: Keyboard },
  { id: "about", label: "settings.about", icon: Info },
]

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const { user, updateUserProfile, logout } = useAuthStore()
  const { t } = useTranslation()

  // Profile Form State initialized from authenticated user
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210")
  const [department, setDepartment] = useState(user?.department || "State Crime Records Bureau")
  const [avatar, setAvatar] = useState(user?.avatar || "")
  const [isSaving, setIsSaving] = useState(false)

  // Keep form fields synced if user object changes
  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
      setPhone(user.phone || "+91 98765 43210")
      setDepartment(user.department || "State Crime Records Bureau")
      setAvatar(user.avatar || "")
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
      toast.success(t("settings.profileUpdated", { defaultValue: "Profile updated successfully!" }))
    }, 300)
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

  const getInitials = (fullName: string) => {
    if (!fullName) return "KSP"
    const parts = fullName.trim().split(" ")
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return fullName.slice(0, 2).toUpperCase()
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6 font-sans">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">{t("settings.profile")}</h2>
              <p className="text-sm text-muted-foreground">{t("settings.profileDesc")}</p>
            </div>
            <Card className="rounded-xl border-border/80 shadow-2xs">
              <CardContent className="p-6 space-y-6">
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {/* Avatar Upload Area */}
                  <div className="flex items-center gap-6 pb-4 border-b border-border/60">
                    <div className="relative group shrink-0">
                      {avatar ? (
                        <img 
                          src={avatar} 
                          alt="User Avatar" 
                          className="h-20 w-20 rounded-full object-cover border-2 border-primary shadow-xs" 
                        />
                      ) : (
                        <div className="h-20 w-20 bg-primary/10 border-2 border-primary/30 text-primary flex items-center justify-center rounded-full text-2xl font-extrabold font-mono shadow-xs">
                          {getInitials(name)}
                        </div>
                      )}
                      <label 
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-primary-foreground shadow-sm cursor-pointer hover:bg-primary/90 transition-colors"
                        title="Upload Profile Picture"
                      >
                        <Camera className="h-3.5 w-3.5" />
                        <input 
                          id="avatar-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleAvatarChange}
                        />
                      </label>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-base text-foreground">{name || user?.name}</h3>
                      <p className="text-xs text-muted-foreground">Badge ID: <span className="font-mono font-bold text-primary">{user?.badgeId}</span></p>
                      <p className="text-xs text-muted-foreground">Assigned Role: <span className="font-semibold text-foreground">{user?.role || "Citizen"}</span></p>
                    </div>
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground leading-none">{t("settings.fullName")}</label>
                      <Input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Enter full name"
                        className="h-9 text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground leading-none">{t("settings.badgeNumber")}</label>
                      <Input 
                        value={user?.badgeId || ""} 
                        disabled 
                        className="h-9 text-xs font-mono bg-muted/50 cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground leading-none">{t("settings.email")}</label>
                      <Input 
                        type="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter email address"
                        className="h-9 text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground leading-none">{t("settings.phoneNumber")}</label>
                      <Input 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="Enter phone number"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-foreground leading-none">Department / Bureau</label>
                      <Input 
                        value={department} 
                        onChange={(e) => setDepartment(e.target.value)} 
                        placeholder="Enter department name"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" disabled={isSaving} className="px-5 font-semibold text-xs h-9">
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Saving..." : t("settings.saveChanges")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )
      case "language":
        return <LanguageSettingsContent />
      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">{t("settings.appearance")}</h2>
              <p className="text-sm text-muted-foreground">{t("settings.appearanceDesc")}</p>
            </div>
            <Card className="rounded-xl border-border/80 shadow-2xs">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{t("settings.theme")}</h3>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-2 cursor-pointer border-2 border-primary rounded-xl p-2.5 bg-card shadow-2xs">
                      <div className="w-24 h-16 bg-white rounded-lg border border-slate-200 flex flex-col gap-1 p-1.5">
                        <div className="w-full h-2 bg-slate-200 rounded"></div>
                        <div className="w-1/2 h-2 bg-slate-200 rounded"></div>
                      </div>
                      <span className="text-xs font-bold text-foreground">{t("settings.lightMode")}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer border-2 border-transparent rounded-xl p-2.5 opacity-50 hover:opacity-100 transition-opacity">
                      <div className="w-24 h-16 bg-slate-900 rounded-lg border border-slate-800 flex flex-col gap-1 p-1.5">
                        <div className="w-full h-2 bg-slate-800 rounded"></div>
                        <div className="w-1/2 h-2 bg-slate-800 rounded"></div>
                      </div>
                      <span className="text-xs font-bold text-foreground">{t("settings.darkMode")}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "roles":
        return <AdminRoleManagementContent />
      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">{t("settings.security")}</h2>
              <p className="text-sm text-muted-foreground">{t("settings.securityDesc")}</p>
            </div>
            <Card className="rounded-xl border-border/80 shadow-2xs">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2 border-b border-border/60 pb-4">
                  <h3 className="font-bold text-sm text-foreground">{t("settings.twoFactorAuth")}</h3>
                  <p className="text-xs text-muted-foreground">{t("settings.twoFactorDesc")}</p>
                  <Button variant="outline" size="sm" className="mt-2 text-emerald-700 border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-xs">
                    <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> {t("settings.enabled")}
                  </Button>
                </div>
                <div className="space-y-2 pt-2">
                  <h3 className="font-bold text-sm text-foreground">{t("settings.passwordReset")}</h3>
                  <p className="text-xs text-muted-foreground">{t("settings.passwordResetDesc")}</p>
                  <Button variant="secondary" size="sm" className="mt-2 text-xs font-semibold">{t("settings.updatePassword")}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "about":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">{t("settings.about")}</h2>
              <p className="text-sm text-muted-foreground">{t("settings.aboutDesc")}</p>
            </div>
            <Card className="rounded-xl border-border/80 shadow-2xs">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4 py-10">
                <div className="w-14 h-14 bg-primary text-primary-foreground rounded-xl flex items-center justify-center mb-1 shadow-2xs">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{t("settings.aboutTitle")}</h3>
                <p className="text-xs text-muted-foreground font-mono">{t("settings.version")}</p>
                <div className="flex gap-4 mt-4 mb-2 text-xs">
                  <Button variant="link" size="sm">{t("settings.termsOfService")}</Button>
                  <Button variant="link" size="sm">{t("settings.privacyPolicy")}</Button>
                  <Button variant="link" size="sm">{t("settings.releaseNotes")}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold capitalize text-foreground">{activeTab.replace('-', ' ')}</h2>
              <p className="text-sm text-muted-foreground">{t("settings.underConstruction", { tab: activeTab })}</p>
            </div>
            <Card className="rounded-xl border-border/80 shadow-2xs">
              <CardContent className="p-12 flex items-center justify-center text-muted-foreground text-xs">
                <p>{t("settings.underConstruction", { tab: activeTab })}</p>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="h-full flex flex-col bg-background font-sans">
      <div className="p-6 border-b border-border/80 bg-card">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("settings.title")}</h1>
        <p className="text-xs text-muted-foreground mt-1">{t("settings.subtitle")}</p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col md:flex-row">
        {/* Left Sidebar Tabs */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border/80 bg-muted/20 p-2 md:p-4 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto shrink-0 gap-1 space-y-0 md:space-y-1">
          {SETTINGS_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 md:gap-3 px-3 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              {t(tab.label)}
            </button>
          ))}
          <div className="hidden md:block pt-8 mt-8 border-t border-border/60">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t("settings.logout")}
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-muted/10">
          <div className="max-w-3xl">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

function LanguageSettingsContent() {
  const { currentLang, setLanguage } = useLanguage()
  const { t } = useTranslation()

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h2 className="text-xl font-bold text-foreground">{t("settings.language")}</h2>
        <p className="text-sm text-muted-foreground">{t("settings.languageDesc")}</p>
      </div>
      <Card className="rounded-xl border-border/80 shadow-2xs">
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setLanguage("en")}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                currentLang === "en"
                  ? "border-primary bg-primary/5 shadow-2xs"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <span className="text-base font-bold text-foreground">English</span>
              <p className="text-xs text-muted-foreground mt-1">Official English (US)</p>
              {currentLang === "en" && (
                <div className="mt-3">
                  <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-bold uppercase">{t("settings.active")}</span>
                </div>
              )}
            </button>
            <button
              onClick={() => setLanguage("kn")}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                currentLang === "kn"
                  ? "border-primary bg-primary/5 shadow-2xs"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <span className="text-base font-bold text-foreground">ಕನ್ನಡ</span>
              <p className="text-xs text-muted-foreground mt-1">Kannada</p>
              {currentLang === "kn" && (
                <div className="mt-3">
                  <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-bold uppercase">{t("settings.active")}</span>
                </div>
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AdminRoleManagementContent() {
  const { user, registeredUsers, updateUserRole } = useAuthStore()
  const isAdmin = user?.role === "Administrator"

  const handleRoleChange = (userId: string, newRole: any) => {
    updateUserRole(userId, newRole)
    toast.info(`Updated user role to ${newRole}`)
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h2 className="text-xl font-bold text-foreground">Role-Based Access Control (RBAC) Management</h2>
        <p className="text-sm text-muted-foreground">
          {isAdmin
            ? "Karnataka State Police Headquarters Control Panel for user role assignments."
            : "Your assigned role and access permissions."}
        </p>
      </div>

      <Card className="rounded-xl border-border/80 shadow-2xs">
        <CardContent className="p-6 space-y-6">
          {!isAdmin ? (
            <div className="p-4 bg-muted/40 border border-border/60 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-sm text-foreground">Active Role Assignment</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-muted-foreground">User Name:</span> <span className="font-bold text-foreground">{user?.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Badge ID:</span> <span className="font-mono font-bold text-primary">{user?.badgeId}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Department:</span> <span className="font-medium text-foreground">{user?.department}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Assigned Role:</span> <span className="font-bold text-emerald-700">{user?.role}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-sm text-foreground">Registered Users Directory & RBAC Roles</h3>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{registeredUsers.length} Users</span>
              </div>

              <div className="divide-y divide-border/60">
                {registeredUsers.map((u) => (
                  <div key={u.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-foreground">{u.fullName}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {u.role}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 text-muted-foreground text-[11px]">
                        <span>Email: <strong className="text-foreground">{u.email}</strong></span>
                        <span>Badge: <strong className="font-mono text-primary">{u.badgeId}</strong></span>
                        <span>Dept: <strong className="text-foreground">{u.department}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-[11px] text-muted-foreground font-medium">Role:</label>
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="h-8 px-2 bg-background border border-input rounded text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        {[
                          "Administrator",
                          "Police Officer",
                          "Investigator",
                          "Analyst",
                          "Supervisor",
                          "Policy Maker",
                          "Citizen",
                        ].map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

