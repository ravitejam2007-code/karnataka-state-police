import { useState } from "react"
import { useNavigate, Link, useSearchParams, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2, LogIn, Eye, EyeOff } from "lucide-react"
import { useTranslation } from "react-i18next"

import karnatakaEmblem from "@/assets/karnataka-emblem.png"

import { useAuthStore } from "@/store/useAuthStore"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CaptchaPlaceholder } from "./components/CaptchaPlaceholder"

const loginSchema = z.object({
  badgeId: z.string().min(1, "Badge ID/Username is required"),
  password: z.string().min(1, "Password is required"),
  captcha: z.string().min(1, "CAPTCHA is required"),
})

type LoginForm = z.infer<typeof loginSchema>

export function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const portalParam = searchParams.get("portal") || (location.state as { portal?: string })?.portal

  const isCitizen = portalParam === "citizen"
  const isEmployee = portalParam === "employee"

  const portalTitle = isCitizen
    ? "Citizen Login"
    : isEmployee
    ? "Officer / Employee Login"
    : t("auth.login")

  const portalDesc = isCitizen
    ? "Access citizen services, file online complaints, & track FIR status"
    : isEmployee
    ? "Authorized login for SCRB personnel, CCB officers, & investigators"
    : t("auth.authDesc")

  const { login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [captchaText, setCaptchaText] = useState("")

  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginForm) => {
    if (data.captcha.trim() !== captchaText.trim()) {
      setError("captcha", { message: t("auth.captchaIncorrect", { defaultValue: "Incorrect CAPTCHA. Please try again." }) })
      toast.error(t("auth.invalidCaptcha", { defaultValue: "Incorrect CAPTCHA. Please try again." }))
      return
    }

    setIsLoading(true)
    try {
      const result = await login(data.badgeId, data.password)
      
      if (result.success) {
        toast.success(t("auth.loginSuccess", { defaultValue: "Login successful. Welcome back!" }))
        navigate("/auth/role-selection")
      } else {
        const errorMsg = result.customMessage || (result.errorKey
          ? t(result.errorKey, { defaultValue: "Authentication error" })
          : t("auth.loginError", { defaultValue: "Invalid Badge ID / Email or password. Please try again." }))
        toast.error(errorMsg, { duration: 5000 })
      }
    } catch {
      toast.error(t("auth.authError", { defaultValue: "An error occurred during authentication." }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-xs border-t-4 border-t-[#2563EB] border-[#E2E8F0] bg-white font-sans">
      <CardHeader className="space-y-1 text-center px-4 sm:px-6 pb-3 pt-4 sm:pt-5">
        <div className="mx-auto flex flex-col items-center justify-center space-y-1">
          <img 
            src={karnatakaEmblem} 
            alt="Karnataka State Police Emblem" 
            className="h-10 sm:h-11 w-auto object-contain" 
          />
          <span className="text-[9px] font-extrabold tracking-widest text-[#2563EB] uppercase">{t("header.ksp")}</span>
        </div>
        <CardTitle className="text-lg sm:text-xl font-bold tracking-tight text-[#1E293B]">{portalTitle}</CardTitle>
        <CardDescription className="text-xs text-[#475569]">
          {portalDesc}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1E293B]" htmlFor="badgeId">
              {t("auth.badgeId")}
            </label>
            <Input 
              id="badgeId" 
              placeholder={t("auth.badgeIdPlaceholder")} 
              {...register("badgeId")}
              className={`h-9 text-xs border-[#E2E8F0] focus-visible:ring-[#1E3A8A] ${errors.badgeId ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.badgeId && <p className="text-[11px] text-destructive mt-0.5">{errors.badgeId.message}</p>}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#1E293B]" htmlFor="password">
                {t("auth.password")}
              </label>
              <Link to="/auth/forgot-password" className="text-[11px] text-[#1E3A8A] hover:underline" tabIndex={-1}>
                {t("auth.forgotPassword")}
              </Link>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder={t("auth.passwordPlaceholder")} 
                {...register("password")}
                className={`h-9 text-xs pr-9 border-[#E2E8F0] focus-visible:ring-[#1E3A8A] ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-destructive mt-0.5">{errors.password.message}</p>}
          </div>

          <div className="space-y-1 pt-2 border-t border-[#E2E8F0]">
            <label className="text-xs font-semibold text-[#1E293B]" htmlFor="captcha">
              {t("auth.securityNotice")}
            </label>
            <CaptchaPlaceholder onCaptchaChange={setCaptchaText} />
            <Input 
              id="captcha" 
              placeholder={t("auth.captchaPlaceholder")} 
              {...register("captcha")}
              className={`h-9 text-xs border-[#E2E8F0] focus-visible:ring-[#1E3A8A] ${errors.captcha ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.captcha && <p className="text-[11px] text-destructive mt-0.5">{errors.captcha.message}</p>}
          </div>

          <div className="flex items-center gap-2 pt-0.5">
            <input type="checkbox" id="remember" className="rounded border-input text-[#1E3A8A] focus:ring-[#1E3A8A] h-3.5 w-3.5" />
            <label htmlFor="remember" className="text-xs text-[#475569] select-none cursor-pointer">
              {t("auth.rememberDevice")}
            </label>
          </div>

          <Button type="submit" className="w-full h-9 font-semibold text-xs bg-[#1E3A8A] text-white hover:bg-[#1D4ED8]" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
            ) : (
              <LogIn className="mr-2 h-3.5 w-3.5" />
            )}
            {t("auth.signIn")}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2 border-t border-[#E2E8F0] p-3 sm:px-6 bg-[#F8FAFC] rounded-b-lg text-xs">
        <span className="text-[#475569]">Don't have an account?</span>
        <Link to="/auth/register">
          <Button variant="outline" size="sm" className="h-8 font-semibold text-xs text-[#1E3A8A] border-[#1E3A8A]/30 hover:bg-[#1E3A8A]/5">
            Create Account
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

