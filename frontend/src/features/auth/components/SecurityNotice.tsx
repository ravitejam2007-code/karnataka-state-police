import { ShieldAlert, Info } from "lucide-react"
import { useTranslation } from "react-i18next"

export function SecurityNotice() {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      <div className="rounded-md bg-primary/10 p-4 border border-primary/20">
        <div className="flex">
          <div className="flex-shrink-0">
            <ShieldAlert className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-primary">{t("auth.securityNotice")}</h3>
            <div className="mt-2 text-xs text-muted-foreground space-y-1">
              <p>{t("auth.securityLine1")}</p>
              <p>{t("auth.securityLine2")}</p>
              <p>{t("auth.securityLine3")}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <p>{t("auth.urlNotice")}</p>
      </div>
    </div>
  )
}
