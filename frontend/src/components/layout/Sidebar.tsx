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
  Briefcase,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"
import { useAuthStore } from "@/store/useAuthStore"

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
  { key: "administration", href: "/app/settings", icon: ShieldAlert },
]

function CollapsibleSection({ 
  title, 
  items, 
  defaultOpen = true,
  onItemClick 
}: { 
  title: string; 
  items: NavItem[]; 
  defaultOpen?: boolean;
  onItemClick?: () => void;
}) {
  const [open, setOpen] = useState(defaultOpen)
  const { t } = useTranslation()

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-bold text-muted-foreground tracking-wider uppercase hover:text-foreground transition-colors"
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
              onClick={onItemClick}
              className={({ isActive }) =>
                cn(
                  "group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all",
                  isActive
                    ? "bg-[#F3F4F6] text-[#111827] font-bold border border-[#E5E7EB]"
                    : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center">
                    <item.icon
                      className={cn(
                        "mr-2.5 h-4 w-4 flex-shrink-0 transition-colors",
                        isActive ? "text-[#111827]" : "text-[#6B7280] group-hover:text-[#111827]"
                      )}
                    />
                    <span>{t(`sidebar.${item.key}`)}</span>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const currentRole = user?.role || "Citizen"

  // Role-based navigation filtering helper
  const isItemAllowed = (href: string) => {
    if (currentRole === "Administrator") return true
    if (href === "/app/dashboard" || href === "/app/cases" || href === "/app/investigation") return true

    if (href === "/app/map") {
      return ["Police Officer", "Investigator", "Supervisor"].includes(currentRole)
    }
    if (href === "/app/ai") {
      return ["Police Officer", "Investigator", "Analyst", "Supervisor"].includes(currentRole)
    }
    if (href === "/app/analytics" || href === "/app/forecast" || href === "/app/reports") {
      return ["Analyst", "Investigator", "Supervisor", "Policy Maker"].includes(currentRole)
    }
    if (href === "/app/network") {
      return ["Investigator", "Analyst", "Supervisor"].includes(currentRole)
    }
    if (href === "/app/settings") {
      return ["Supervisor"].includes(currentRole)
    }
    return false
  }

  const filteredMainNav = mainNav.filter(item => isItemAllowed(item.href))
  const filteredIntelNav = intelNav.filter(item => isItemAllowed(item.href))
  const filteredAdminNav = adminNav.filter(item => isItemAllowed(item.href))

  return (
    <div className="flex h-full w-64 flex-col border-r border-[#E2E8F0] bg-white text-[#1E293B] font-sans">
      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-3">
        {filteredMainNav.length > 0 && (
          <CollapsibleSection title={t("sidebar.coreOperations")} items={filteredMainNav} onItemClick={onClose} />
        )}
        {filteredIntelNav.length > 0 && (
          <CollapsibleSection title={t("sidebar.intelligence")} items={filteredIntelNav} onItemClick={onClose} />
        )}
        {filteredAdminNav.length > 0 && (
          <CollapsibleSection title={t("sidebar.administration")} items={filteredAdminNav} defaultOpen={false} onItemClick={onClose} />
        )}
      </div>
    </div>
  )
}
