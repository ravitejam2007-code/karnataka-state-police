import { PhoneCall, Mail, Headphones, ShieldCheck } from "lucide-react"
import { useTranslation } from "react-i18next"

export function HelplineCard() {
  const { t } = useTranslation()

  return (
    <div className="rounded-lg border border-border/80 bg-card text-card-foreground p-3.5 shadow-2xs space-y-3">
      <div className="flex items-center gap-2 border-b border-border/60 pb-2">
        <div className="p-1 rounded bg-primary/10 text-primary shrink-0">
          <Headphones className="h-3.5 w-3.5" />
        </div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
          {t("auth.needHelpTitle", { defaultValue: "Need Help? Call Us" })}
        </h4>
        <span className="ml-auto flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          <ShieldCheck className="h-3 w-3" />
          24×7
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <a
          href="tel:112"
          className="flex items-center gap-2 p-2 rounded-md bg-muted/40 hover:bg-muted transition-colors border border-border/40 group"
        >
          <div className="p-1 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <PhoneCall className="h-3 w-3 text-primary" />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground leading-none font-medium">Emergency</div>
            <div className="text-xs font-bold text-foreground leading-tight">112</div>
          </div>
        </a>

        <a
          href="tel:1930"
          className="flex items-center gap-2 p-2 rounded-md bg-muted/40 hover:bg-muted transition-colors border border-border/40 group"
        >
          <div className="p-1 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <PhoneCall className="h-3 w-3 text-primary" />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground leading-none font-medium">Cyber Crime</div>
            <div className="text-xs font-bold text-foreground leading-tight">1930</div>
          </div>
        </a>
      </div>

      <div className="pt-1 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5 truncate">
          <Mail className="h-3 w-3 text-primary/70 shrink-0" />
          <a href="mailto:support@scrb.ksp.gov.in" className="hover:text-primary transition-colors truncate font-medium">
            support@scrb.ksp.gov.in
          </a>
        </span>
      </div>
    </div>
  )
}
