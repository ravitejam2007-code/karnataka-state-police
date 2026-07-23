import { useState } from "react"
import { 
  Palette, Globe, Accessibility, Bell, Shield, Key, 
  User, Keyboard, Info, Check, LogOut 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore } from "@/store/useAuthStore"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/hooks/useLanguage"

const SETTINGS_TABS = [
  { id: "profile", label: "settings.profile", icon: User },
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
  const { logout } = useAuthStore()
  const { t } = useTranslation()

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">{t("settings.profile")}</h2>
              <p className="text-sm text-muted-foreground">{t("settings.profileDesc")}</p>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 bg-primary/20 text-primary flex items-center justify-center rounded-full text-2xl font-bold">
                    ID
                  </div>
                  <Button variant="outline">{t("settings.changeAvatar")}</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("settings.fullName")}</label>
                    <Input defaultValue="Inspector Rajesh Kumar" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("settings.badgeNumber")}</label>
                    <Input defaultValue="KSP-88392" disabled />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("settings.email")}</label>
                    <Input defaultValue="rajesh.k@ksp.gov.in" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("settings.phoneNumber")}</label>
                    <Input defaultValue="+91 98765 43210" />
                  </div>
                </div>
                <Button className="mt-4">{t("settings.saveChanges")}</Button>
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
              <h2 className="text-xl font-semibold">{t("settings.appearance")}</h2>
              <p className="text-sm text-muted-foreground">{t("settings.appearanceDesc")}</p>
            </div>
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">{t("settings.theme")}</h3>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-2 cursor-pointer border-2 border-primary rounded-sm p-2">
                      <div className="w-24 h-16 bg-white rounded shadow-sm border flex flex-col gap-1 p-1">
                        <div className="w-full h-2 bg-gray-200 rounded"></div>
                        <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                      </div>
                      <span className="text-xs font-semibold">{t("settings.lightMode")}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer border-2 border-transparent rounded-sm p-2 opacity-50 hover:opacity-100">
                      <div className="w-24 h-16 bg-gray-900 rounded shadow-sm border border-gray-800 flex flex-col gap-1 p-1">
                        <div className="w-full h-2 bg-gray-800 rounded"></div>
                        <div className="w-1/2 h-2 bg-gray-800 rounded"></div>
                      </div>
                      <span className="text-xs font-semibold">{t("settings.darkMode")}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 cursor-pointer border-2 border-transparent rounded-sm p-2 opacity-50 hover:opacity-100">
                      <div className="w-24 h-16 bg-gradient-to-r from-gray-100 to-gray-800 rounded shadow-sm border flex flex-col gap-1 p-1">
                        <div className="w-full h-2 bg-gray-400 rounded"></div>
                        <div className="w-1/2 h-2 bg-gray-400 rounded"></div>
                      </div>
                      <span className="text-xs font-semibold">{t("settings.systemMode")}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">{t("settings.security")}</h2>
              <p className="text-sm text-muted-foreground">{t("settings.securityDesc")}</p>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2 border-b pb-4">
                  <h3 className="font-semibold">{t("settings.twoFactorAuth")}</h3>
                  <p className="text-sm text-muted-foreground">{t("settings.twoFactorDesc")}</p>
                  <Button variant="outline" className="mt-2 text-green-600 border-green-200 hover:bg-green-50">
                    <Check className="w-4 h-4 mr-2" /> {t("settings.enabled")}
                  </Button>
                </div>
                <div className="space-y-2 pt-2">
                  <h3 className="font-semibold">{t("settings.passwordReset")}</h3>
                  <p className="text-sm text-muted-foreground">{t("settings.passwordResetDesc")}</p>
                  <Button variant="secondary" className="mt-2">{t("settings.updatePassword")}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "about":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">{t("settings.about")}</h2>
              <p className="text-sm text-muted-foreground">{t("settings.aboutDesc")}</p>
            </div>
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-primary rounded-sm flex items-center justify-center mb-2">
                  <Shield className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">{t("settings.aboutTitle")}</h3>
                <p className="text-muted-foreground">{t("settings.version")}</p>
                <div className="flex gap-4 mt-6 mb-4">
                  <Button variant="link">{t("settings.termsOfService")}</Button>
                  <Button variant="link">{t("settings.privacyPolicy")}</Button>
                  <Button variant="link">{t("settings.releaseNotes")}</Button>
                </div>
                
                <div className="mt-8 border-t pt-8 w-full max-w-sm flex items-center justify-between">
                  <div className="text-left">
                    <h4 className="font-semibold text-sm">{t("settings.presentationMode")}</h4>
                    <p className="text-xs text-muted-foreground">{t("settings.presentationDesc")}</p>
                  </div>
                  <Button 
                    variant={localStorage.getItem('kps-demo-mode') === 'true' ? 'default' : 'outline'}
                    onClick={() => {
                      const current = localStorage.getItem('kps-demo-mode') === 'true'
                      localStorage.setItem('kps-demo-mode', current ? 'false' : 'true')
                      window.location.reload()
                    }}
                  >
                    {localStorage.getItem('kps-demo-mode') === 'true' ? t("settings.enabled") : t("settings.disabled")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold capitalize">{activeTab.replace('-', ' ')}</h2>
              <p className="text-sm text-muted-foreground">{t("settings.underConstruction", { tab: activeTab })}</p>
            </div>
            <Card>
              <CardContent className="p-12 flex items-center justify-center text-muted-foreground">
                <p>{t("settings.underConstruction", { tab: activeTab })}</p>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-6 border-b bg-card">
        <h1 className="text-3xl font-bold tracking-tight">{t("settings.title")}</h1>
        <p className="text-muted-foreground mt-1">{t("settings.subtitle")}</p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col md:flex-row">
        {/* Left Sidebar Tabs */}
        <div className="w-full md:w-64 border-r bg-muted/20 p-4 space-y-1 overflow-y-auto">
          {SETTINGS_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {t(tab.label)}
            </button>
          ))}
          <div className="pt-8 mt-8 border-t border-muted">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t("settings.logout")}
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-muted/5">
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
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{t("settings.language")}</h2>
        <p className="text-sm text-muted-foreground">{t("settings.languageDesc")}</p>
      </div>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setLanguage("en")}
              className={`p-4 rounded-sm border-2 text-left transition-all ${
                currentLang === "en"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <span className="text-lg font-semibold">English</span>
              <p className="text-sm text-muted-foreground mt-1">US English</p>
              {currentLang === "en" && (
                <div className="mt-2">
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">{t("settings.active")}</span>
                </div>
              )}
            </button>
            <button
              onClick={() => setLanguage("kn")}
              className={`p-4 rounded-sm border-2 text-left transition-all ${
                currentLang === "kn"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <span className="text-lg font-semibold">ಕನ್ನಡ</span>
              <p className="text-sm text-muted-foreground mt-1">Kannada</p>
              {currentLang === "kn" && (
                <div className="mt-2">
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">{t("settings.active")}</span>
                </div>
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
