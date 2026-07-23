import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BellRing, Circle } from "lucide-react"

const notifications = [
  {
    id: 1,
    priority: "high",
    title: "Statewide Search Warrant: BLR-492",
    time: "10:42 AM",
    source: "DGP Office",
    route: "/app/cases",
  },
  {
    id: 2,
    priority: "medium",
    title: "Cyber Intel: Phishing Campaign Targetting Govt Nodes",
    time: "09:15 AM",
    source: "CERT-IN",
    route: "/app/ai",
  },
  {
    id: 3,
    priority: "low",
    title: "Routine Maintenance: CCTNS Database Node 4",
    time: "02:00 AM",
    source: "IT Dept",
    route: "/app/settings",
  },
  {
    id: 4,
    priority: "medium",
    title: "Traffic Advisory: Protest at Freedom Park",
    time: "Yesterday, 18:30",
    source: "Traffic HQ",
    route: "/app/map",
  }
]

export function ImportantNotifications() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Card className="rounded-xl border-border/80 bg-card shadow-2xs h-full flex flex-col">
      <CardHeader className="p-3.5 border-b border-border/80 pb-2.5 bg-muted/30">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center justify-between">
          <div className="flex items-center">
            <BellRing className="w-3.5 h-3.5 mr-2 text-primary" />
            {t("dashboard.dispatchFeed")}
          </div>
          <span className="text-[10px] bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full border border-primary/20">{t("dashboard.unread", { count: 4 })}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto">
        <div className="divide-y divide-border/60">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              onClick={() => navigate(notif.route)}
              className="p-3.5 hover:bg-muted/40 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <Circle className={`w-2 h-2 mt-1.5 shrink-0 fill-current ${
                  notif.priority === 'high' ? 'text-destructive' : 
                  notif.priority === 'medium' ? 'text-amber-500' : 'text-slate-400'
                }`} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase font-mono text-muted-foreground font-semibold">{notif.source}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{notif.time}</p>
                  </div>
                  <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {notif.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
