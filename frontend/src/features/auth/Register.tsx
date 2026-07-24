import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2, UserPlus, Eye, EyeOff, ArrowLeft, ShieldCheck, CheckCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

import karnatakaEmblem from "@/assets/karnataka-emblem.png"
import { useAuthStore, type Role } from "@/store/useAuthStore"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ROLES_LIST: Role[] = [
  "Administrator",
  "Police Officer",
  "Investigator",
  "Analyst",
  "Supervisor",
  "Policy Maker",
  "Citizen",
]

const registerSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  role: z.enum([
    "Administrator",
    "Police Officer",
    "Investigator",
    "Analyst",
    "Supervisor",
    "Policy Maker",
    "Citizen",
  ], { message: "Please select a role" }),
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
  if (data.role !== "Citizen" && (!data.badgeId || data.badgeId.trim().length < 3)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Badge ID / Official Govt ID is required",
      path: ["badgeId"],
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

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "Police Officer",
      department: "Karnataka State Police Headquarters",
    }
  })

  const selectedRole = watch("role")

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true)
    try {
      const result = await registerUser({
        fullName: data.fullName,
        role: data.role as Role,
        badgeId: data.role === "Citizen" ? "N/A" : (data.badgeId || ""),
        department: data.department || (data.role === "Citizen" ? "Public Citizen Services" : "Karnataka State Police Headquarters"),
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
    <Card className="w-full shadow-xs border-t-2 border-t-primary">
      <CardHeader className="space-y-1 text-center px-4 sm:px-6 pb-2 pt-3 sm:pt-4">
        <div className="mx-auto flex flex-col items-center justify-center space-y-0.5">
          <img 
            src={karnatakaEmblem} 
            alt="Karnataka State Police Emblem" 
            className="h-8 sm:h-9 w-auto object-contain" 
          />
          <span className="text-[9px] font-extrabold tracking-widest text-primary uppercase">{t("header.ksp")}</span>
        </div>
        <CardTitle className="text-base sm:text-lg font-bold tracking-tight">Create Official Account</CardTitle>
        <CardDescription className="text-[11px]">
          Register for KSP Crime Intelligence Platform
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 pb-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">

          {/* Role Selection */}
          <div className="space-y-0.5 bg-muted/30 p-2 rounded-md border border-border/60">
            <label className="text-[11px] font-semibold text-foreground flex items-center justify-between" htmlFor="role">
              <span>Select Role *</span>
              <span className="text-[9px] text-muted-foreground font-normal">
                Datathon RBAC Role
              </span>
            </label>
            <select
              id="role"
              {...register("role")}
              className="w-full h-8 px-2 bg-background border border-input rounded text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {ROLES_LIST.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-[10px] text-destructive">{errors.role.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-foreground" htmlFor="fullName">
                Full Name *
              </label>
              <Input 
                id="fullName" 
                placeholder="e.g. Officer Ramesh Kumar" 
                {...register("fullName")}
                className={`h-8 text-xs ${errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.fullName && <p className="text-[10px] text-destructive">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-foreground" htmlFor="badgeId">
                Badge ID {selectedRole !== "Citizen" ? "*" : "(Optional)"}
              </label>
              <Input 
                id="badgeId" 
                placeholder={selectedRole === "Citizen" ? "N/A" : "e.g. KSP-9824"} 
                disabled={selectedRole === "Citizen"}
                {...register("badgeId")}
                className={`h-8 text-xs ${errors.badgeId ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.badgeId && <p className="text-[10px] text-destructive">{errors.badgeId.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-foreground" htmlFor="email">
                Email *
              </label>
              <Input 
                id="email" 
                type="email"
                placeholder="officer@ksp.gov.in" 
                {...register("email")}
                className={`h-8 text-xs ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.email && <p className="text-[10px] text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-foreground" htmlFor="mobile">
                Mobile Number *
              </label>
              <Input 
                id="mobile" 
                placeholder="9876543210" 
                {...register("mobile")}
                className={`h-8 text-xs ${errors.mobile ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.mobile && <p className="text-[10px] text-destructive">{errors.mobile.message}</p>}
            </div>
          </div>

          <div className="space-y-0.5">
            <label className="text-[11px] font-semibold text-foreground" htmlFor="department">
              Department / Bureau
            </label>
            <Input 
              id="department" 
              placeholder={selectedRole === "Citizen" ? "Public Citizen Services" : "e.g. Cyber Crime Division"} 
              {...register("department")}
              className="h-8 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-foreground" htmlFor="password">
                Password *
              </label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  {...register("password")}
                  className={`h-8 text-xs pr-7 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-destructive">{errors.password.message}</p>}
            </div>

            <div className="space-y-0.5">
              <label className="text-[11px] font-semibold text-foreground" htmlFor="confirmPassword">
                Confirm Password *
              </label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••" 
                {...register("confirmPassword")}
                className={`h-8 text-xs ${errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.confirmPassword && <p className="text-[10px] text-destructive">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-0.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="truncate">Role permissions provisioned for immediate login.</span>
          </div>

          <Button type="submit" className="w-full h-8 font-semibold text-xs" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
            ) : (
              <UserPlus className="mr-2 h-3.5 w-3.5" />
            )}
            Create Account
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 border-t p-2.5 sm:px-6 bg-muted/30 rounded-b-lg text-xs">
        <span className="text-muted-foreground">Already have an account?</span>
        <Link to="/auth/login">
          <Button variant="outline" size="sm" className="h-7 px-3 text-xs font-semibold text-primary border-primary/30 hover:bg-primary/5">
            <ArrowLeft className="h-3 w-3 mr-1" />
            Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}


