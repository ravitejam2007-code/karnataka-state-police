import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2, UserPlus, Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react"
import { useTranslation } from "react-i18next"

import karnatakaEmblem from "@/assets/karnataka-emblem.png"
import { useAuthStore } from "@/store/useAuthStore"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const registerSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  badgeId: z.string().min(3, "Badge ID / Government ID is required"),
  email: z.string().email("Valid email address is required"),
  mobile: z.string().min(10, "Valid 10-digit mobile number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type RegisterForm = z.infer<typeof registerSchema>

export function Register() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { registerUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true)
    try {
      const result = await registerUser({
        fullName: data.fullName,
        badgeId: data.badgeId,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
      })

      if (result.success) {
        toast.success(t("auth.accountCreated", { defaultValue: "Account registered successfully! You can now log in." }))
        navigate("/auth/login")
      } else {
        const errorMsg = result.errorKey ? t(result.errorKey) : t("auth.registerError", { defaultValue: "Registration failed. Please try again." })
        toast.error(errorMsg)
      }
    } catch {
      toast.error(t("auth.registerError", { defaultValue: "Registration failed. Please try again." }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-xs border-t-2 border-t-primary">
      <CardHeader className="space-y-2 text-center px-4 sm:px-8 pb-4 pt-5 sm:pt-6">
        <div className="mx-auto flex flex-col items-center justify-center space-y-1">
          <img 
            src={karnatakaEmblem} 
            alt="Karnataka State Police Emblem" 
            className="h-10 sm:h-12 w-auto object-contain" 
          />
          <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase">{t("header.ksp")}</span>
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold">Create Account</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Register for KSP Crime Intelligence Platform access
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 sm:px-8 pb-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground" htmlFor="fullName">
                Full Name
              </label>
              <Input 
                id="fullName" 
                placeholder="e.g. Officer Ramesh Kumar" 
                {...register("fullName")}
                className={errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.fullName && <p className="text-[11px] text-destructive mt-0.5">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground" htmlFor="badgeId">
                Badge ID / Govt ID
              </label>
              <Input 
                id="badgeId" 
                placeholder="e.g. KSP-9824" 
                {...register("badgeId")}
                className={errors.badgeId ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.badgeId && <p className="text-[11px] text-destructive mt-0.5">{errors.badgeId.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground" htmlFor="email">
                Official Email
              </label>
              <Input 
                id="email" 
                type="email"
                placeholder="officer@ksp.gov.in" 
                {...register("email")}
                className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.email && <p className="text-[11px] text-destructive mt-0.5">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground" htmlFor="mobile">
                Mobile Number
              </label>
              <Input 
                id="mobile" 
                placeholder="9876543210" 
                {...register("mobile")}
                className={errors.mobile ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.mobile && <p className="text-[11px] text-destructive mt-0.5">{errors.mobile.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  {...register("password")}
                  className={`pr-8 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
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

            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••" 
                {...register("confirmPassword")}
                className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.confirmPassword && <p className="text-[11px] text-destructive mt-0.5">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <span>Account requests are subject to verification by SCRB Nodal Authorities.</span>
          </div>

          <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="mr-2 h-4 w-4" />
            )}
            Submit Registration Request
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t p-4 sm:px-8 bg-muted/30 rounded-b-lg text-xs">
        <span className="text-muted-foreground">Already have an account?</span>
        <Link to="/auth/login">
          <Button variant="outline" size="sm" className="gap-1.5 font-semibold text-primary border-primary/30 hover:bg-primary/5">
            <ArrowLeft className="h-3.5 w-3.5" />
            Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
