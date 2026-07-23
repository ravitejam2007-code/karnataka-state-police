import { useTranslation } from "react-i18next"
import { ArrowRight, ShieldCheck, Cpu, Radio, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

const units = [
  {
    id: 1,
    title: "AI Video Intelligence & Dossier Analysis",
    subtitle: "Automated video summaries for court proceedings & evidence.",
    icon: Cpu,
    badge: "Special Task Force",
    route: "/app/ai"
  },
  {
    id: 2,
    title: "Predictive Crime Mapping 2026",
    subtitle: "Statewide machine learning forecast for hot-zone patrol deployment.",
    icon: Radio,
    badge: "Intelligence Cell",
    route: "/app/forecast"
  },
  {
    id: 3,
    title: "Digital & Social Media Surveillance",
    subtitle: "Real-time threat monitoring & organized crime thread tracking.",
    icon: ShieldCheck,
    badge: "Cyber Crime Cell",
    route: "/app/network"
  }
]

export function TacticalUnitsRow() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("dashboard.handpicked")}</h3>
          <p className="text-xs text-muted-foreground">{t("dashboard.handpickedDesc")}</p>
        </div>
        <div className="flex items-center gap-1">
          <button 
            aria-label="Previous"
            className="h-6 w-6 rounded-md border border-border flex items-center justify-center text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button 
            aria-label="Next"
            className="h-6 w-6 rounded-md border border-border flex items-center justify-center text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {units.map((unit) => (
          <div
            key={unit.id}
            onClick={() => navigate(unit.route)}
            className="group relative rounded-xl p-4 bg-card border border-border/80 hover:border-primary/40 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between h-40"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary w-fit">
                  {unit.badge}
                </span>
                <unit.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h4 className="text-xs font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {unit.title}
              </h4>
              <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                {unit.subtitle}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <div className="h-7 w-7 rounded-lg bg-muted text-muted-foreground flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
