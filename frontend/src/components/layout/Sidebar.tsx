import { useState } from "react"
import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Bot,
  FileSearch,
  LineChart,
  Network,
  Map,
  TrendingUp,
  FileText,
  ShieldAlert,
  Settings,
  HelpCircle,
  Briefcase,
  ChevronDown,
  PhoneCall,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"
import karnatakaEmblem from "@/assets/karnataka-emblem.png"

interface NavItem {
  key: string
  href: string
  icon: typeof LayoutDashboard
  badge?: string
}

const mainNav: NavItem[] = [
  { key: "dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { key: "predictiveMap", href: "/app/map", icon: Map },
  { key: "caseFiles", href: "/app/cases", icon: Briefcase },
  { key: "aiAssistant", href: "/app/ai", icon: Bot, badge: "AI" },
  { key: "investigation", href: "/app/investigation", icon: FileSearch },
]

const intelNav: NavItem[] = [
  { key: "crimeAnalytics", href: "/app/analytics", icon: LineChart },
  { key: "criminalNetwork", href: "/app/network", icon: Network },
  { key: "crimeForecast", href: "/app/forecast", icon: TrendingUp },
  { key: "reportsDossiers", href: "/app/reports", icon: FileText },
]

const adminNav: NavItem[] = [
  { key: "administration", href: "/app/admin", icon: ShieldAlert },
]

const bottomNav: NavItem[] = [
  { key: "settings", href: "/app/settings", icon: Settings },
  { key: "helpDocs", href: "/app/help", icon: HelpCircle },
]

function CollapsibleSection({ title, items, defaultOpen = true }: { title: string; items: NavItem[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const { t } = useTranslation()

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-semibold text-muted-foreground tracking-wider uppercase hover:text-foreground transition-colors"
      >
        <span>{title}</span>
        {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>
      {open && (
        <nav className="space-y-0.5 mt-0.5">
          {items.map((item) => (
            <NavLink
              key={item.key}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "group flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center">
                    <item.icon
                      className={cn(
                        "mr-2.5 h-4 w-4 flex-shrink-0 transition-colors",
                        isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                    <span>{t(`sidebar.${item.key}`)}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full",
                        isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}

export function Sidebar() {
  const { t } = useTranslation()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground shadow-xs">
      {/* Top Workspace Selector */}
      <div className="p-3 border-b border-border/60">
        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors cursor-pointer group">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={karnatakaEmblem}
              alt="Karnataka Emblem"
              className="h-7 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground leading-none">
                {t("sidebar.commandPost")}
              </span>
              <span className="text-xs font-bold text-foreground leading-tight truncate">{t("sidebar.centralZone")}</span>
            </div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground shrink-0 transition-transform" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-3">
        <CollapsibleSection title={t("sidebar.coreOperations")} items={mainNav} />
        <CollapsibleSection title={t("sidebar.intelligence")} items={intelNav} />
        <CollapsibleSection title={t("sidebar.administration")} items={adminNav} defaultOpen={false} />
      </div>

      {/* Bottom Dispatch / Helpdesk Card */}
      <div className="p-3 border-t border-border/60 space-y-2">
        <div className="rounded-lg p-3 bg-muted border border-border space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-destructive text-destructive-foreground">
              <PhoneCall className="h-3.5 w-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground leading-tight">{t("sidebar.ershHotline")}</span>
              <span className="text-[9px] text-muted-foreground">{t("sidebar.stateDispatch")}</span>
            </div>
          </div>
          <button
            onClick={() => alert("Connecting to 112 Control Desk...")}
            className="w-full py-1.5 px-3 rounded-md bg-destructive text-destructive-foreground text-xs font-medium hover:bg-destructive/90 transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <PhoneCall className="h-3 w-3" />
            <span>{t("sidebar.connectDesk")}</span>
          </button>
        </div>

        <nav className="space-y-0.5">
          {bottomNav.map((item) => (
            <NavLink
              key={item.key}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="mr-2.5 h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
              <span>{t(`sidebar.${item.key}`)}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
