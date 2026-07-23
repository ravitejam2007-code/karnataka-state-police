import { useTranslation } from "react-i18next"
import { Map, Network, FileSearch, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

const services = [
  {
    id: "map",
    title: "nav.predictiveMap",
    subtitle: "nav.realTimeHotspots",
    icon: Map,
    href: "/app/map"
  },
  {
    id: "network",
    title: "nav.criminalNetwork",
    subtitle: "nav.linkAnalysis",
    icon: Network,
    href: "/app/network"
  },
  {
    id: "cases",
    title: "nav.caseFiles",
    subtitle: "nav.automatedLookup",
    icon: FileSearch,
    href: "/app/cases"
  }
]

export function PopularServicesGrid() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="space-y-2.5 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("dashboard.coreServices")}</h3>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => navigate(service.href)}
            className="group p-4 rounded-xl bg-card border border-border/80 hover:border-primary/40 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between items-center text-center space-y-3"
          >
            <div className="p-3 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <service.icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{t(service.title)}</h4>
              <p className="text-[11px] text-muted-foreground mt-1">{t(service.subtitle)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
