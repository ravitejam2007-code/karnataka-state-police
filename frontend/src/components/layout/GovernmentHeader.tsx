import { useTranslation } from "react-i18next"
import { Bell, Search, UserCircle, LogOut, Menu, PlusCircle } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import karnatakaEmblem from "@/assets/karnataka-emblem.png"

interface GovernmentHeaderProps {
  onMenuClick?: () => void
}

export function GovernmentHeader({ onMenuClick }: GovernmentHeaderProps) {
  const { user, activeRole, logout } = useAuthStore()
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 gap-2">
        {/* Branding Area */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t("header.toggleMenu")}</span>
          </Button>
          <div className="p-1 bg-white/95 rounded-md shadow-xs border border-white/20 shrink-0">
            <img
              src={karnatakaEmblem}
              alt="Karnataka State Police Emblem"
              className="h-8 w-auto object-contain shrink-0"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[9px] font-semibold tracking-wider text-secondary uppercase leading-none">
              {t("header.governmentOfKarnataka")}
            </span>
            <h1 className="text-sm font-bold tracking-tight leading-tight">{t("header.ksp")}</h1>
            <span className="text-[9px] text-primary-foreground/70 hidden sm:inline-block leading-tight">
              {t("header.scrb")}
            </span>
          </div>
        </div>

        {/* Global Search */}
        <div className="hidden md:flex flex-1 max-w-lg mx-2 lg:mx-4">
          <button
            onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
            className="w-full bg-primary-foreground/10 hover:bg-primary-foreground/20 border border-primary-foreground/20 text-primary-foreground/60 transition-colors flex items-center gap-2 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left truncate">{t("header.searchPlaceholder")}</span>
            <kbd className="hidden lg:inline-flex items-center gap-1 rounded border border-primary-foreground/20 bg-primary-foreground/10 px-1.5 font-mono text-[10px] font-medium text-primary-foreground/70">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Button
            size="sm"
            className="hidden xl:flex items-center gap-1.5 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold shadow-xs text-xs px-3"
            onClick={() => {
              window.location.href = "/app/cases"
            }}
          >
            <PlusCircle className="h-4 w-4" />
            <span>{t("header.newInvestigation")}</span>
          </Button>

          <LanguageSwitcher />

          <Button
            variant="ghost"
            size="icon"
            className="relative text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground/80"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-muted-foreground border-2 border-primary" />
            <span className="sr-only">{t("header.notifications")}</span>
          </Button>

          <div className="h-5 w-px bg-primary-foreground/20 mx-0.5" />

          <div className="flex items-center gap-1.5">
            <div className="hidden sm:block text-right">
              <span className="text-xs font-semibold leading-tight block">{user?.name || t("header.officerLabel")}</span>
              <span className="text-[9px] text-primary-foreground/60 leading-tight block">{activeRole || t("header.stateInvestigator")}</span>
            </div>
            <UserCircle className="h-6 w-6 text-primary-foreground/90 shrink-0" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => logout()}
            className="text-primary-foreground hover:bg-destructive hover:text-destructive-foreground"
            title={t("header.logout")}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
