import { useState } from "react"
import { 
  Globe, Accessibility, Bell, Shield, Key, 
  Info, Check, LogOut, Save
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore } from "@/store/useAuthStore"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/hooks/useLanguage"
import { toast } from "sonner"
import { AboutSystemPage } from "@/features/about/AboutSystemPage"

const SETTINGS_TABS = [
  { id: "security", label: "settings.security", icon: Shield },
  { id: "password", label: "Change Password", icon: Key },
  { id: "language", label: "settings.language", icon: Globe },
  { id: "accessibility", label: "settings.accessibility", icon: Accessibility },
  { id: "notifications", label: "settings.notifications", icon: Bell },
  { id: "roles", label: "settings.roles", icon: Shield },
  { id: "about", label: "settings.about", icon: Info },
]

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("security")
  const { user, logout } = useAuthStore()
  const { t } = useTranslation()

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match. Please verify.")
      return
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.")
      return
    }
    setIsUpdatingPassword(true)
    setTimeout(() => {
      setIsUpdatingPassword(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      toast.success("Security password updated successfully!", {
        description: "Your login credentials have been updated."
      })
    }, 400)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "security":
        return (
          <div className="space-y-6 font-sans">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">{t("settings.security")}</h2>
              <p className="text-sm text-[#64748B]">{t("settings.securityDesc")}</p>
            </div>
            <Card className="rounded-2xl border-[#E2E8F0] shadow-2xs bg-white">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2 border-b border-[#F1F5F9] pb-5">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#2563EB]" />
                    <h3 className="font-bold text-sm text-[#0F172A]">{t("settings.twoFactorAuth")}</h3>
                  </div>
                  <p className="text-xs text-[#64748B]">{t("settings.twoFactorDesc")}</p>
                  <Button variant="outline" size="sm" className="mt-2 text-emerald-700 border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-xs rounded-xl font-semibold">
                    <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> {t("settings.enabled")}
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-[#0F172A]">Active Officer Session</h3>
                  <p className="text-xs text-[#64748B]">Currently logged in as <strong className="text-[#0F172A]">{user?.name}</strong> ({user?.role})</p>
                  <Button onClick={() => setActiveTab("password")} variant="secondary" size="sm" className="mt-2 text-xs font-semibold rounded-xl">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "password":
        return (
          <div className="space-y-6 font-sans">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">Password & Credentials Management</h2>
              <p className="text-sm text-[#64748B]">Update your official KSP account password securely.</p>
            </div>
            <Card className="rounded-2xl border-[#E2E8F0] shadow-2xs bg-white">
              <CardContent className="p-6 space-y-6">
                <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#0F172A]">Current Password</label>
                    <Input 
                      type="password" 
                      value={currentPassword} 
                      onChange={(e) => setCurrentPassword(e.target.value)} 
                      placeholder="Enter current password"
                      className="h-10 text-xs rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#0F172A]">New Password</label>
                    <Input 
                      type="password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      placeholder="Enter new password (min 6 chars)"
                      className="h-10 text-xs rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#0F172A]">Confirm New Password</label>
                    <Input 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      placeholder="Confirm new password"
                      className="h-10 text-xs rounded-xl"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isUpdatingPassword}
                    className="bg-[#0F172A] hover:bg-black text-white text-xs font-bold h-10 px-5 rounded-xl cursor-pointer"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isUpdatingPassword ? "Updating Password..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )
      case "language":
        return <LanguageSettingsContent />
      case "roles":
        return <AdminRoleManagementContent />
      case "about":
        return <AboutSystemPage />
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

