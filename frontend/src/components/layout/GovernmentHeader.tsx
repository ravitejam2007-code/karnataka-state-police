import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Bell, Search, LogOut, Menu, PlusCircle, Settings, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
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
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getInitials = (name: string) => {
    if (!name) return "KSP"
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground font-sans">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 gap-2">
        {/* Branding Area */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
            onClick={onMenuClick}
            aria-label="Toggle Menu"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t("header.toggleMenu")}</span>
          </Button>
          <div className="p-1 bg-white/95 rounded-md shadow-2xs border border-white/20 shrink-0">
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

        {/* Global Search (Desktop) */}
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
            className="hidden xl:flex items-center gap-1.5 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold shadow-2xs text-xs px-3"
            onClick={() => navigate("/app/cases")}
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
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-400 border-2 border-primary animate-pulse" />
          </Button>

          <div className="h-5 w-px bg-primary-foreground/20 mx-0.5" />

          {/* Profile Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-primary-foreground/10 transition-colors focus:outline-none focus:ring-1 focus:ring-secondary text-left group"
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full object-cover border border-primary-foreground/30 shadow-2xs shrink-0" 
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground font-extrabold text-xs font-mono flex items-center justify-center border border-white/20 shrink-0">
                  {getInitials(user?.name || "Officer")}
                </div>
              )}
              <div className="hidden sm:block text-right leading-tight max-w-[130px]">
                <span className="text-xs font-bold leading-tight block truncate text-primary-foreground">{user?.name || "Officer"}</span>
                <span className="text-[9px] text-primary-foreground/70 leading-tight block truncate">{activeRole || "Investigator"}</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-primary-foreground/70 group-hover:text-primary-foreground transition-transform" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-card border border-border/80 shadow-xl text-card-foreground p-3 z-50 animate-in fade-in-50 zoom-in-95 font-sans">
                {/* Header Profile Info */}
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 border border-border/50 mb-3">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="h-11 w-11 rounded-full object-cover border-2 border-primary shrink-0" 
                    />
                  ) : (
                    <div className="h-11 w-11 rounded-full bg-primary/10 border-2 border-primary/30 text-primary font-bold text-sm font-mono flex items-center justify-center shrink-0">
                      {getInitials(user?.name || "Officer")}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-foreground truncate">{user?.name}</h4>
                    <p className="text-[10px] font-mono font-semibold text-primary">Badge: {user?.badgeId}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>

                {/* Details List */}
                <div className="space-y-1.5 px-2 py-1 text-xs text-muted-foreground border-b border-border/60 pb-3 mb-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-foreground">Department:</span>
                    <span className="truncate max-w-[150px] text-right font-medium">{user?.department || "State Crime Bureau"}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-foreground">Active Role:</span>
                    <span className="font-semibold text-primary">{activeRole || "Investigator"}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false)
                      navigate("/app/settings")
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors text-left"
                  >
                    <Settings className="h-3.5 w-3.5 text-primary" />
                    <span>Profile Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false)
                      logout()
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors text-left"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
