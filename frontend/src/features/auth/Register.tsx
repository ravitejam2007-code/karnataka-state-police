import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2, UserPlus, Eye, EyeOff, ArrowLeft, ShieldCheck, CheckCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

import karnatakaEmblem from "@/assets/karnataka-emblem.png"
import { useAuthStore } from "@/store/useAuthStore"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const registerSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  badgeId: z.string().optional(),
  department: z.string().optional(),
  email: z.string().email("Valid email address is required"),
  mobile: z.string().min(10, "Valid 10-digit mobile number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
  }
})

type RegisterForm = z.infer<typeof registerSchema>

export function Register() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { registerUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      badgeId: "",
      department: "",
      password: "",
      confirmPassword: "",
    }
  })

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true)
    try {
      const result = await registerUser({
        fullName: data.fullName,
        badgeId: data.badgeId || "N/A",
        department: data.department || "Public Citizen Services",
        email: data.email,
        mobile: data.mobile,
        password: data.password,
      })

      if (result.success) {
        toast.success(`Account created successfully for ${data.fullName}! You can now log in.`, {
          icon: <CheckCircle className="h-5 w-5 text-emerald-600" />
        })
        navigate("/auth/login")
      } else {
        const errorMsg = result.customMessage || (result.errorKey ? t(result.errorKey) : "Registration failed. User already exists or invalid input.")
        toast.error(errorMsg)
      }
    } catch {
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-md border-t-4 border-t-[#0F172A] border-[#E2E8F0] bg-white font-sans rounded-xl">
      <CardHeader className="space-y-0.5 text-center px-4 sm:px-6 pb-2 pt-3 border-b border-[#F1F5F9]">
        <div className="mx-auto flex flex-col items-center justify-center space-y-0.5">
          <img 
            src={karnatakaEmblem} 
            alt="Karnataka State Police Emblem" 
            className="h-8 sm:h-9 w-auto object-contain" 
          />
          <span className="text-[8px] font-extrabold tracking-widest text-[#0F172A] uppercase">{t("header.ksp")}</span>
        </div>
        <CardTitle className="text-base font-bold tracking-tight text-[#0F172A]">Create Official Account</CardTitle>
        <CardDescription className="text-[11px] text-[#475569]">
          Register for KSP Crime Intelligence Platform
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 py-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">

          <div className="space-y-0.5">
            <label className="text-[11px] font-semibold text-[#0F172A]" htmlFor="fullName">
              Full Name *
            </label>
            <Input 
              id="fullName" 
              placeholder="e.g. Ramesh Kumar" 
              {...register("fullName")}
              className={`h-8 text-xs border-[#E2E8F0] focus-visible:ring-[#0F172A] ${errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.fullName && <p className="text-[10px] text-destructive mt-0.5">{errors.fullName.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-[#0F172A]" htmlFor="email">
                Email Address *
              </label>
              <Input 
                id="email" 
                type="email"
                placeholder="officer@ksp.gov.in" 
                {...register("email")}
                className={`h-8 text-xs border-[#E2E8F0] focus-visible:ring-[#0F172A] ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.email && <p className="text-[10px] text-destructive mt-0.5">{errors.email.message}</p>}
            </div>

            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-[#0F172A]" htmlFor="mobile">
                Mobile Number *
              </label>
              <Input 
                id="mobile" 
                placeholder="9876543210" 
                {...register("mobile")}
                className={`h-8 text-xs border-[#E2E8F0] focus-visible:ring-[#0F172A] ${errors.mobile ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.mobile && <p className="text-[10px] text-destructive mt-0.5">{errors.mobile.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-[#0F172A]" htmlFor="badgeId">
                Badge ID (Optional)
              </label>
              <Input 
                id="badgeId" 
                placeholder="e.g. KSP-9824" 
                {...register("badgeId")}
                className={`h-8 text-xs border-[#E2E8F0] focus-visible:ring-[#0F172A] ${errors.badgeId ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.badgeId && <p className="text-[10px] text-destructive mt-0.5">{errors.badgeId.message}</p>}
            </div>

            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-[#0F172A]" htmlFor="department">
                Department (Optional)
              </label>
              <Input 
                id="department" 
                placeholder="e.g. Cyber Division" 
                {...register("department")}
                className="h-8 text-xs border-[#E2E8F0] focus-visible:ring-[#0F172A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-[#0F172A]" htmlFor="password">
                Password *
              </label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  {...register("password")}
                  className={`h-8 text-xs pr-7 border-[#E2E8F0] focus-visible:ring-[#0F172A] ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
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
              {errors.password && <p className="text-[10px] text-destructive mt-0.5">{errors.password.message}</p>}
            </div>

            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-[#0F172A]" htmlFor="confirmPassword">
                Confirm Password *
              </label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••" 
                {...register("confirmPassword")}
                className={`h-8 text-xs border-[#E2E8F0] focus-visible:ring-[#0F172A] ${errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.confirmPassword && <p className="text-[10px] text-destructive mt-0.5">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-0.5 text-[10px] text-[#64748B]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0F172A] shrink-0" />
            <span className="truncate">Encrypted session credentials provisioned for login.</span>
          </div>

          <Button type="submit" className="w-full h-8.5 font-bold text-xs bg-[#0F172A] text-white hover:bg-[#1E293B] rounded-md shadow-2xs cursor-pointer" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
            ) : (
              <UserPlus className="mr-2 h-3.5 w-3.5" />
            )}
            Create Account
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 border-t border-[#E2E8F0] py-2 px-4 sm:px-6 bg-[#F8FAFC] rounded-b-xl text-[11px]">
        <span className="text-[#475569]">Already have an account?</span>
        <Link to="/auth/login">
          <Button variant="outline" size="sm" className="h-7 px-2.5 text-[11px] font-semibold text-[#0F172A] border-[#0F172A]/30 hover:bg-[#0F172A]/5 cursor-pointer">
            <ArrowLeft className="h-3 w-3 mr-1" />
            Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}


