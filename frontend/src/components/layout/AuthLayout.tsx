import { useMemo } from "react"
import { Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { SecurityNotice } from "@/features/auth/components/SecurityNotice"
import { ShieldCheck } from "lucide-react"
import karnatakaEmblem from "@/assets/karnataka-emblem.png"

export function AuthLayout() {
  const { t } = useTranslation()
  const timestamp = useMemo(() => new Date().toISOString(), [])

  return (
    <div className="flex h-dvh flex-col bg-muted/30 font-sans overflow-hidden">
      <header className="w-full shrink-0 border-b bg-primary text-primary-foreground shadow-sm">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-white/95 rounded-md shadow-xs border border-white/20 shrink-0">
              <img
                src={karnatakaEmblem}
                alt="Karnataka State Police Emblem"
                className="h-9 w-auto object-contain shrink-0"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold tracking-wider text-secondary">{t("header.governmentOfKarnataka")}</span>
              <h1 className="text-sm font-bold tracking-tight">{t("header.ksp")}</h1>
              <span className="text-[10px] text-primary-foreground/80">{t("header.scrb")}</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-secondary" />
            <span className="text-xs font-medium">{t("auth.securedGateway")}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center overflow-hidden px-4">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-4">
          <div className="hidden lg:flex flex-col space-y-6 overflow-y-auto max-h-[calc(100dvh-8rem)]">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">{t("auth.authTitle")}</h2>
              <p className="text-base text-muted-foreground">{t("auth.authDesc")}</p>
            </div>

            <SecurityNotice />

            <div className="pt-3 border-t border-border">
              <p className="text-xs font-mono text-muted-foreground">{t("auth.nodeInfo", { timestamp })}</p>
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
