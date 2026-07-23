import { useTranslation } from "react-i18next"
import { ArrowUpRight } from "lucide-react"

const cases = [
  {
    id: "KA-2026-891",
    title: "Cyber Financial Fraud",
    officer: "Insp. Emma Parker",
    role: "Cyber Cell BLR",
    district: "Bengaluru Urban",
    badgeColor: "bg-red-500",
    priority: "Critical",
    status: "Active Tracking"
  },
  {
    id: "KA-2026-442",
    title: "Organised Cargo Theft",
    officer: "SI Sofia Martinez",
    role: "Crime Branch",
    district: "Mysuru South",
    badgeColor: "bg-amber-500",
    priority: "High",
    status: "Lead Identified"
  },
  {
    id: "KA-2026-104",
    title: "Narcotics Interception",
    officer: "DySP Arif Rahman",
    role: "Special Task Force",
    district: "Mangaluru Coastal",
    badgeColor: "bg-red-500",
    priority: "Critical",
    status: "Under Surveillance"
  },
  {
    id: "KA-2026-773",
    title: "Vehicle Theft Ring",
    officer: "Insp. Daniel Brooks",
    role: "Traffic Intelligence",
    district: "Hubballi-Dharwad",
    badgeColor: "bg-blue-500",
    priority: "Medium",
    status: "Evidence Review"
  },
  {
    id: "KA-2026-309",
    title: "Identity Impersonation",
    officer: "SI Hiro Tanaka",
    role: "Digital Forensics",
    district: "Belagavi Central",
    badgeColor: "bg-slate-500",
    priority: "Low",
    status: "Dossier Prepared"
  },
  {
    id: "KA-2026-920",
    title: "ATM Tampering Syndicate",
    officer: "Insp. Olivia Reed",
    role: "Commercial Offence",
    district: "Shivamogga",
    badgeColor: "bg-amber-500",
    priority: "High",
    status: "Interrogation"
  }
]

export function ActiveCasesGrid() {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-foreground tracking-tight">{t("dashboard.activeCases")}</h3>
          <p className="text-xs text-muted-foreground">{t("dashboard.activeCasesDesc")}</p>
        </div>
        <button 
          onClick={() => window.location.href = '/cases'}
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
        >
          <span>{t("dashboard.viewAllDossiers")}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cases.map((c) => (
          <div
            key={c.id}
            className="group p-4 rounded-xl bg-card border border-border/80 hover:border-border transition-all flex items-start gap-3 relative overflow-hidden"
          >
            <div className="relative shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary">
                {c.officer.split(' ')[1]?.[0] || 'O'}
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ${c.badgeColor} border-2 border-card`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-[10px] font-mono font-bold text-primary">{c.id}</span>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {c.priority}
                </span>
              </div>
              <h4 className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                {c.title}
              </h4>
              <p className="text-[11px] text-muted-foreground truncate">{c.officer} • {c.role}</p>
              
              <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="truncate">{c.district}</span>
                <span className="font-medium text-foreground shrink-0">{c.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
