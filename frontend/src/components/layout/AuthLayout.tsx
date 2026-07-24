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
    <div className="min-h-screen lg:h-screen lg:max-h-screen flex flex-col bg-[#F8FAFC] font-sans overflow-x-hidden">
      <header className="w-full shrink-0 border-b border-[#E2E8F0] bg-white text-[#1E293B] shadow-2xs">
        <div className="container mx-auto flex h-14 items-center justify-between px-3 sm:px-4 lg:px-8">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-1 bg-white rounded-md shadow-2xs border border-slate-200 shrink-0">
              <img
                src={karnatakaEmblem}
                alt="Karnataka State Police Emblem"
                className="h-7 w-auto object-contain shrink-0"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold tracking-wider text-[#64748B] uppercase leading-none">{t("header.governmentOfKarnataka")}</span>
              <h1 className="text-xs font-bold tracking-tight text-[#1E293B] leading-tight">{t("header.ksp")}</h1>
              <span className="text-[9px] text-[#64748B] leading-none">{t("header.scrb")}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#1E3A8A] shrink-0" />
              <span className="text-xs font-semibold text-[#1E293B]">{t("auth.securedGateway")}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto lg:overflow-hidden">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6 lg:gap-10 items-center my-auto">
          <div className="hidden lg:flex flex-col space-y-3">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-foreground">{t("auth.authTitle")}</h2>
              <p className="text-xs text-muted-foreground">{t("auth.authDesc")}</p>
            </div>

            <SecurityNotice />

            <div className="pt-2 border-t border-border">
              <p className="text-[10px] font-mono text-muted-foreground">{t("auth.nodeInfo", { timestamp })}</p>
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

