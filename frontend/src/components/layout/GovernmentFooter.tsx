import { useTranslation } from "react-i18next"
import { Shield, PhoneCall, ExternalLink, Lock, CheckCircle2 } from "lucide-react"
import karnatakaEmblem from "@/assets/karnataka-emblem.png"

export function GovernmentFooter() {
  const { t } = useTranslation()

  return (
    <footer className="mt-auto border-t bg-card text-card-foreground shadow-sm z-20 shrink-0 border-border/80">
      {/* Main Footer Container */}
      <div className="container mx-auto px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Emblem & Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={karnatakaEmblem}
                alt="Karnataka Police Emblem"
                className="h-12 w-auto object-contain shrink-0"
              />
              <div>
                <span className="text-[10px] font-bold tracking-widest text-primary/80 uppercase block">
                  {t("footer.governmentOfKarnataka")}
                </span>
                <h4 className="font-bold text-base text-foreground leading-tight">{t("footer.ksp")}</h4>
                <p className="text-xs text-muted-foreground">{t("footer.scrb")}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{t("footer.description")}</p>
            <div className="flex items-center gap-2 text-xs font-medium text-foreground bg-muted px-2.5 py-1 rounded-full w-fit">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{t("footer.allSystemsOperational")}</span>
            </div>
          </div>

          {/* Column 2: Emergency Helplines */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <PhoneCall className="h-3.5 w-3.5 text-primary" />
              <span>{t("footer.emergencyHelplines")}</span>
            </h5>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between p-2 rounded bg-muted/50 border border-border/40 hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">{t("footer.policeEmergency")}</span>
                <span className="font-mono font-bold text-foreground text-sm">112</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-muted/50 border border-border/40 hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">{t("footer.womenHelpline")}</span>
                <span className="font-mono font-bold text-foreground text-sm">1091</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-muted/50 border border-border/40 hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">{t("footer.cyberCrimeHelpline")}</span>
                <span className="font-mono font-bold text-foreground text-sm">1930</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-muted/50 border border-border/40 hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">{t("footer.trafficHelpline")}</span>
                <span className="font-mono font-bold text-foreground text-sm">103</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-foreground">{t("footer.corePortals")}</h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a href="/app/dashboard" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {t("footer.commandDashboard")}
                </a>
              </li>
              <li>
                <a href="/app/map" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {t("footer.predictiveMap")}
                </a>
              </li>
              <li>
                <a href="/app/cases" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {t("footer.caseDossierSearch")}
                </a>
              </li>
              <li>
                <a href="/app/ai" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {t("footer.aiAssistant")}
                </a>
              </li>
              <li>
                <a href="/app/network" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {t("footer.criminalNetwork")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Legal Security */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-primary" />
              <span>{t("footer.securityCompliance")}</span>
            </h5>
            <p className="text-xs text-muted-foreground leading-relaxed">{t("footer.securityNotice")}</p>
            <div className="flex flex-wrap gap-2 text-[11px] pt-1">
              <a href="#" className="px-2 py-1 bg-muted rounded hover:bg-muted/80 text-foreground transition-colors">
                {t("footer.privacyPolicy")}
              </a>
              <a href="#" className="px-2 py-1 bg-muted rounded hover:bg-muted/80 text-foreground transition-colors">
                {t("footer.termsOfUse")}
              </a>
              <a href="#" className="px-2 py-1 bg-muted rounded hover:bg-muted/80 text-foreground transition-colors">
                {t("footer.cyberDirectives")}
              </a>
            </div>
            <div className="text-[10px] text-muted-foreground flex items-center gap-1 pt-1">
              <span>{t("footer.gigwCertified")}</span>
              <ExternalLink className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Shield className="h-4 w-4 text-primary shrink-0" />
            <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="font-mono bg-muted px-2 py-0.5 rounded border border-border/40">{t("footer.buildVersion")}</span>
            <span className="hidden md:inline-block font-mono">{t("footer.aesEncrypted")}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
