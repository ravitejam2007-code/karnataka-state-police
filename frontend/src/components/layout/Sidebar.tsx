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
  PhoneCall,
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
                  "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all",
                  isActive
                    ? "bg-[#2563EB] text-white font-semibold shadow-xs"
                    : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#1E293B]"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center">
                    <item.icon
                      className={cn(
                        "mr-2.5 h-4 w-4 flex-shrink-0 transition-colors",
                        isActive ? "text-white" : "text-[#64748B] group-hover:text-[#1E293B]"
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
      {/* Navigation Links directly at top - Officer Card Removed */}
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

      {/* Bottom Dispatch Card */}
      <div className="p-3 border-t border-[#E2E8F0]">
        <div className="rounded-lg p-3 bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-red-600 text-white">
              <PhoneCall className="h-3.5 w-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1E293B] leading-tight">{t("sidebar.ershHotline")}</span>
              <span className="text-[9px] text-[#64748B]">{t("sidebar.stateDispatch")}</span>
            </div>
          </div>
          <button
            onClick={() => {
              onClose?.()
              alert("Connecting to 112 Control Desk...")
            }}
            className="w-full py-1.5 px-3 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors shadow-2xs flex items-center justify-center gap-1.5"
          >
            <PhoneCall className="h-3 w-3" />
            <span>{t("sidebar.connectDesk")}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
