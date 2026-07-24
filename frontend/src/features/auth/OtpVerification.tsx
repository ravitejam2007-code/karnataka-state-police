import { useState, useEffect } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { toast } from "sonner"
import { Loader2, ShieldEllipsis } from "lucide-react"
import { useTranslation } from "react-i18next"

import { useAuthStore } from "@/store/useAuthStore"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function OtpVerification() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated, verifyOtp, user } = useAuthStore()
  
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  // Guard: If not authenticated at step 1, boot back to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 6) {
      toast.error(t("auth.otpInvalidLength"))
      return
    }

    setIsLoading(true)
    try {
      const success = await verifyOtp(otp)
      if (success) {
        toast.success(t("auth.otpVerified"))
        navigate("/auth/role-selection")
      } else {
        toast.error(t("auth.otpInvalid"))
      }
    } catch {
      toast.error(t("auth.otpError"))
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = () => {
    setTimeLeft(120)
    toast.info(t("auth.otpResent"))
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? "0" : ""}${s}`
  }

  return (
    <Card className="w-full shadow-sm border-t-2 border-t-primary">
      <CardHeader className="space-y-2 text-center px-4 sm:px-8 pb-6 pt-6 sm:pt-8">
        <div className="mx-auto bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
          <ShieldEllipsis className="h-6 w-6 text-secondary" />
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold">{t("auth.otpTitle")}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {t("auth.otpDescription")}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-8 pb-6">
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-2 flex flex-col items-center justify-center">
            <Input 
              type="text" 
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="••••••" 
              className="text-center text-3xl font-mono h-16 w-3/4"
              autoFocus
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || otp.length < 6}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {t("auth.verifyOtp")}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col text-center border-t p-6 bg-muted/50 rounded-b-lg gap-2">
        {timeLeft > 0 ? (
          <p className="text-sm text-muted-foreground">
            {t("auth.resendIn", { time: formatTime(timeLeft) })}
          </p>
        ) : (
          <Button variant="outline" size="sm" onClick={handleResend}>
            {t("auth.resendOtp")}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
