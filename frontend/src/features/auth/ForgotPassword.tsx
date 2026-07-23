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
    <Card className="w-full shadow-sm border-t-2 border-t-primary">
      <CardHeader className="space-y-2 text-center px-4 sm:px-8 pb-6 pt-6 sm:pt-8">
        <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
          <KeyRound className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold">{t("auth.recoverAccess")}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {t("auth.recoverDesc")}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-8 pb-6">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none" htmlFor="identifier">
                {t("auth.badgeOrEmail")}
              </label>
              <Input 
                id="identifier" 
                placeholder={t("auth.badgeOrEmailPlaceholder")} 
                required
              />
            </div>

            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {t("auth.sendRecoveryLink")}
            </Button>
          </form>
        ) : (
          <div className="text-center p-4 bg-muted/50 rounded-md border border-border">
            <h4 className="font-semibold text-sm mb-2">{t("auth.checkInbox")}</h4>
            <p className="text-xs text-muted-foreground">
              {t("auth.checkInboxDesc")}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center border-t p-6 bg-muted/50 rounded-b-lg">
        <Link to="/auth/login" className="flex items-center text-sm text-primary hover:underline font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("auth.returnToLogin")}
        </Link>
      </CardFooter>
    </Card>
  )
}
