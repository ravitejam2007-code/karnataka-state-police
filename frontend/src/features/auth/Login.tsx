import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
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
  const { login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [captchaText, setCaptchaText] = useState("")

  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginForm) => {
    if (data.captcha !== captchaText) {
      setError("captcha", { message: t("auth.captchaError") })
      return
    }

    setIsLoading(true)
    try {
      const success = await login(data.badgeId, data.password)
      
      if (success) {
        toast.success(t("auth.loginSuccess"))
        navigate("/auth/otp")
      } else {
        toast.error(t("auth.loginError"))
      }
    } catch {
      toast.error(t("auth.authError"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-sm border-t-2 border-t-primary">
      <CardHeader className="space-y-3 text-center pb-6 pt-8">
        <div className="mx-auto flex flex-col items-center justify-center mb-1 space-y-2">
          <img 
            src={karnatakaEmblem} 
            alt="Karnataka State Police Emblem" 
            className="h-16 w-auto object-contain" 
          />
          <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase">{t("header.ksp")}</span>
        </div>
        <CardTitle className="text-2xl font-bold">{t("auth.login")}</CardTitle>
        <CardDescription className="text-sm">
          {t("auth.authDesc")}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="badgeId">
              {t("auth.badgeId")}
            </label>
            <Input 
              id="badgeId" 
              placeholder={t("auth.badgeIdPlaceholder")} 
              {...register("badgeId")}
              className={errors.badgeId ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.badgeId && <p className="text-xs text-destructive mt-1">{errors.badgeId.message}</p>}
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground" htmlFor="password">
                {t("auth.password")}
              </label>
              <Link to="/auth/forgot-password" className="text-xs text-primary hover:underline" tabIndex={-1}>
                {t("auth.forgotPassword")}
              </Link>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder={t("auth.passwordPlaceholder")} 
                {...register("password")}
                className={`pr-10 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
          </div>

          <div className="space-y-1.5 pt-3 border-t border-border">
            <label className="text-sm font-medium text-foreground" htmlFor="captcha">
              {t("auth.securityNotice")}
            </label>
            <CaptchaPlaceholder onCaptchaChange={setCaptchaText} />
            <Input 
              id="captcha" 
              placeholder={t("auth.captchaPlaceholder")} 
              {...register("captcha")}
              className={errors.captcha ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.captcha && <p className="text-xs text-destructive mt-1">{errors.captcha.message}</p>}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input type="checkbox" id="remember" className="rounded border-input text-primary focus:ring-primary h-4 w-4" />
            <label htmlFor="remember" className="text-sm text-muted-foreground select-none cursor-pointer">
              {t("auth.rememberDevice")}
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="mr-2 h-4 w-4" />
            )}
            {t("auth.signIn")}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col text-center border-t p-6 bg-muted/50 rounded-b-lg">
        <p className="text-xs text-muted-foreground">
          {t("auth.troubleLogging")} <br/>
          <a href="mailto:support@scrb.ksp.gov.in" className="text-primary hover:underline">support@scrb.ksp.gov.in</a>
        </p>
      </CardFooter>
    </Card>
  )
}
