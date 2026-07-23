import { useTranslation } from "react-i18next"
import { ArrowRight, ShieldCheck, Cpu, Radio } from "lucide-react"

const units = [
  {
    id: 1,
    title: "Engaging Crime Insights & Video Dossiers",
    subtitle: "Automated AI video summaries for court proceedings & evidence.",
    icon: Cpu,
    gradient: "from-red-600 to-amber-600",
    badge: "Special Task Force"
  },
  {
    id: 2,
    title: "AI Predictive Trends 2026",
    subtitle: "Statewide machine learning forecast for hot-zone patrol deployment.",
    icon: Radio,
    gradient: "from-purple-600 to-indigo-700",
    badge: "Intelligence Cell"
  },
  {
    id: 3,
    title: "Rapid Emergency TikTok & Media Surveillance",
    subtitle: "Real-time social media intelligence & viral thread tracking.",
    icon: ShieldCheck,
    gradient: "from-slate-700 to-slate-900",
    badge: "Cyber Cyber Cell"
  }
]

export function TacticalUnitsRow() {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-foreground tracking-tight">{t("dashboard.handpicked")}</h3>
          <p className="text-xs text-muted-foreground">{t("dashboard.handpickedDesc")}</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="h-6 w-6 rounded-full border border-border flex items-center justify-center text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            &lt;
          </button>
          <button className="h-6 w-6 rounded-full border border-border flex items-center justify-center text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            &gt;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {units.map((unit) => (
          <div
            key={unit.id}
            className="group relative rounded-xl p-4 bg-card border border-border/80 hover:border-primary/50 transition-all overflow-hidden flex flex-col justify-between h-40"
          >
            <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-900/20 opacity-20 group-hover:opacity-30 transition-opacity rounded-r-xl" />

            <div className="relative z-10 space-y-2">
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground w-fit block">
                {unit.badge}
              </span>
              <h4 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {unit.title}
              </h4>
              <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                {unit.subtitle}
              </p>
            </div>

            <div className="relative z-10 flex justify-end">
              <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
