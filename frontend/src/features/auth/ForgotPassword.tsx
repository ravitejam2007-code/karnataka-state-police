import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { ArrowLeft, KeyRound, Loader2, Send } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ForgotPassword() {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Dummy delay for API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    setIsLoading(false)
    setIsSubmitted(true)
    toast.success(t("auth.recoverySent"))
  }

  return (
    <Card className="w-full shadow-md border-t-4 border-t-[#0F172A] border-[#E2E8F0] bg-white font-sans rounded-xl">
      <CardHeader className="space-y-1.5 text-center px-4 sm:px-8 pb-4 pt-6 sm:pt-7 border-b border-[#F1F5F9]">
        <div className="mx-auto bg-[#0F172A]/10 w-12 h-12 rounded-full flex items-center justify-center mb-1">
          <KeyRound className="h-6 w-6 text-[#0F172A]" />
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">{t("auth.recoverAccess")}</CardTitle>
        <CardDescription className="text-xs sm:text-sm text-[#475569]">
          {t("auth.recoverDesc")}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-8 py-5">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#0F172A]" htmlFor="identifier">
                {t("auth.badgeOrEmail")}
              </label>
              <Input 
                id="identifier" 
                placeholder={t("auth.badgeOrEmailPlaceholder")} 
                className="h-9 text-xs border-[#E2E8F0] focus-visible:ring-[#0F172A]"
                required
              />
            </div>

            <Button type="submit" className="w-full h-9 font-bold text-xs bg-[#0F172A] text-white hover:bg-[#1E293B] rounded-md shadow-2xs cursor-pointer mt-2" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Send className="mr-2 h-3.5 w-3.5" />
              )}
              {t("auth.sendRecoveryLink")}
            </Button>
          </form>
        ) : (
          <div className="text-center p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
            <h4 className="font-semibold text-xs text-[#0F172A] mb-1">{t("auth.checkInbox")}</h4>
            <p className="text-[11px] text-[#64748B]">
              {t("auth.checkInboxDesc")}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center border-t border-[#E2E8F0] py-3 px-6 bg-[#F8FAFC] rounded-b-xl">
        <Link to="/auth/login" className="flex items-center text-xs text-[#0F172A] hover:underline font-semibold">
          <ArrowLeft className="mr-2 h-3.5 w-3.5" />
          {t("auth.returnToLogin")}
        </Link>
      </CardFooter>
    </Card>
  )
}
