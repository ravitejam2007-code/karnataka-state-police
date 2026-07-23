import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudRainWind, Thermometer, Droplets, Wind } from "lucide-react"

export function Weather() {
  const { t } = useTranslation()

  return (
    <Card className="rounded-sm border-border bg-card h-full flex flex-col">
      <CardHeader className="p-4 border-b border-border pb-3 bg-muted/50">
        <CardTitle className="text-xs uppercase tracking-widest flex items-center">
          <CloudRainWind className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
          {t("dashboard.weather")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-3xl font-mono tracking-tight text-foreground">24°C</h3>
            <p className="text-[10px] uppercase font-semibold text-muted-foreground">{t("dashboard.bengaluruHq")}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-foreground">{t("dashboard.heavyRain")}</span>
            <p className="text-[10px] text-muted-foreground uppercase">{t("dashboard.rainTime")}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="flex items-center space-x-2 border border-border p-2 rounded-sm bg-muted">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-[9px] uppercase text-muted-foreground">{t("dashboard.feelsLike")}</p>
              <p className="text-xs font-mono font-medium text-foreground">26°C</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 border border-border p-2 rounded-sm bg-muted">
            <Droplets className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-[9px] uppercase text-muted-foreground">{t("dashboard.humidity")}</p>
              <p className="text-xs font-mono font-medium text-foreground">88%</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 border border-border p-2 rounded-sm bg-muted">
            <Wind className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-[9px] uppercase text-muted-foreground">{t("dashboard.wind")}</p>
              <p className="text-xs font-mono font-medium text-foreground">18 km/h NW</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 border border-border p-2 rounded-sm bg-muted">
            <CloudRainWind className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-[9px] uppercase text-muted-foreground">{t("dashboard.visibility")}</p>
              <p className="text-xs font-mono font-medium text-foreground">2.5 km</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
