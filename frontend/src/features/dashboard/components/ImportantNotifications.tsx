import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BellRing, Circle } from "lucide-react"

const notifications = [
  {
    id: 1,
    priority: "high",
    title: "Statewide Search Warrant: BLR-492",
    time: "10:42 AM",
    source: "DGP Office",
  },
  {
    id: 2,
    priority: "medium",
    title: "Cyber Intel: Phishing Campaign Targetting Govt Nodes",
    time: "09:15 AM",
    source: "CERT-IN",
  },
  {
    id: 3,
    priority: "low",
    title: "Routine Maintenance: CCTNS Database Node 4",
    time: "02:00 AM",
    source: "IT Dept",
  },
  {
    id: 4,
    priority: "medium",
    title: "Traffic Advisory: Protest at Freedom Park",
    time: "Yesterday, 18:30",
    source: "Traffic HQ",
  }
]

export function ImportantNotifications() {
  const { t } = useTranslation()

  return (
    <Card className="rounded-sm border-border bg-card h-full flex flex-col">
      <CardHeader className="p-4 border-b border-border pb-3 bg-muted/50">
        <CardTitle className="text-xs uppercase tracking-widest flex items-center justify-between">
          <div className="flex items-center">
            <BellRing className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
            {t("dashboard.dispatchFeed")}
          </div>
          <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm">{t("dashboard.unread", { count: 4 })}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto">
        <div className="divide-y divide-border">
          {notifications.map((notif) => (
            <div key={notif.id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group">
              <div className="flex items-start gap-3">
                <Circle className={`w-2 h-2 mt-1.5 shrink-0 fill-current ${
                  notif.priority === 'high' ? 'text-destructive' : 
                  notif.priority === 'medium' ? 'text-secondary' : 'text-muted-foreground'
                }`} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase font-mono text-muted-foreground">{notif.source}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{notif.time}</p>
                  </div>
                  <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
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
