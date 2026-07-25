import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudRainWind, Thermometer, Droplets, Wind } from "lucide-react"

export function Weather() {
  const { t } = useTranslation()

  return (
    <Card className="rounded-xl border-border/80 bg-card shadow-2xs">
      <CardHeader className="p-3.5 border-b border-border/80 pb-2.5 bg-muted/30">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center">
          <CloudRainWind className="w-3.5 h-3.5 mr-2 text-primary" />
          {t("dashboard.weather")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-3xl font-mono font-bold tracking-tight text-foreground">24°C</h3>
            <p className="text-[10px] uppercase font-bold text-muted-foreground">{t("dashboard.bengaluruHq")}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-foreground">{t("dashboard.heavyRain")}</span>
            <p className="text-[10px] text-muted-foreground uppercase font-medium">{t("dashboard.rainTime")}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 border border-border/60 p-2 rounded-lg bg-muted/40">
            <Thermometer className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-[9px] uppercase font-semibold text-muted-foreground">{t("dashboard.feelsLike")}</p>
              <p className="text-xs font-mono font-bold text-foreground">26°C</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 border border-border/60 p-2 rounded-lg bg-muted/40">
            <Droplets className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-[9px] uppercase font-semibold text-muted-foreground">{t("dashboard.humidity")}</p>
              <p className="text-xs font-mono font-bold text-foreground">88%</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 border border-border/60 p-2 rounded-lg bg-muted/40">
            <Wind className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-[9px] uppercase font-semibold text-muted-foreground">{t("dashboard.wind")}</p>
              <p className="text-xs font-mono font-bold text-foreground">18 km/h NW</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 border border-border/60 p-2 rounded-lg bg-muted/40">
            <CloudRainWind className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-[9px] uppercase font-semibold text-muted-foreground">{t("dashboard.visibility")}</p>
              <p className="text-xs font-mono font-bold text-foreground">2.5 km</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
