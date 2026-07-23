import { useTranslation } from "react-i18next"
import { Map, Network, FileSearch } from "lucide-react"
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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground tracking-tight">{t("dashboard.coreServices")}</h3>
        <div className="flex items-center gap-1">
          <button className="h-6 w-6 rounded-full border border-border flex items-center justify-center text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            &lt;
          </button>
          <button className="h-6 w-6 rounded-full border border-border flex items-center justify-center text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            &gt;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => navigate(service.href)}
            className="group p-3.5 rounded-xl bg-card border border-border/80 hover:border-border shadow-sm transition-all cursor-pointer flex flex-col justify-between items-center text-center space-y-3"
          >
            <div className="p-3 rounded-full bg-muted text-muted-foreground transition-transform">
              <service.icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground leading-tight">{t(service.title)}</h4>
              <p className="text-[10px] text-muted-foreground mt-0.5">{t(service.subtitle)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
