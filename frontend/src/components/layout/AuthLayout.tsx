import { useMemo } from "react"
import { Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { SecurityNotice } from "@/features/auth/components/SecurityNotice"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import { ShieldCheck } from "lucide-react"
import karnatakaEmblem from "@/assets/karnataka-emblem.png"

export function AuthLayout() {
  const { t } = useTranslation()
  const timestamp = useMemo(() => new Date().toISOString(), [])

  return (
    <div className="min-h-dvh flex flex-col bg-muted/30 font-sans">
      <header className="w-full shrink-0 border-b bg-primary text-primary-foreground shadow-xs">
        <div className="container mx-auto flex h-14 items-center justify-between px-3 sm:px-4 lg:px-8">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-1 bg-white/95 rounded-md shadow-xs border border-white/20 shrink-0">
              <img
                src={karnatakaEmblem}
                alt="Karnataka State Police Emblem"
                className="h-8 sm:h-9 w-auto object-contain shrink-0"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-secondary uppercase">{t("header.governmentOfKarnataka")}</span>
              <h1 className="text-xs sm:text-sm font-bold tracking-tight leading-tight">{t("header.ksp")}</h1>
              <span className="text-[9px] sm:text-[10px] text-primary-foreground/80 leading-none">{t("header.scrb")}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-secondary shrink-0" />
              <span className="text-[11px] sm:text-xs font-medium">{t("auth.securedGateway")}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6 lg:gap-12 items-center my-auto py-2 sm:py-4">
          <div className="hidden lg:flex flex-col space-y-4 max-h-[calc(100dvh-8rem)]">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{t("auth.authTitle")}</h2>
              <p className="text-sm text-muted-foreground">{t("auth.authDesc")}</p>
            </div>

            <SecurityNotice />

            <div className="pt-2 border-t border-border">
              <p className="text-[11px] font-mono text-muted-foreground">{t("auth.nodeInfo", { timestamp })}</p>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
