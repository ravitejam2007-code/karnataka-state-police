import { useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import {
  Shield,
  PhoneCall,
  Menu,
  X,
  MapPin,
  BadgeCheck,
  FileText,
  Search,
  Car,
  Fingerprint,
  AlertTriangle,
  Mail,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
} from "lucide-react"
import karnatakaEmblem from "@/assets/karnataka-emblem.png"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const serviceKeys = [
  { icon: FileText, titleKey: "efir", descKey: "efirDesc" },
  { icon: Search, titleKey: "missing", descKey: "missingDesc" },
  { icon: Car, titleKey: "vehicle", descKey: "vehicleDesc" },
  { icon: Fingerprint, titleKey: "character", descKey: "characterDesc" },
  { icon: AlertTriangle, titleKey: "cyber", descKey: "cyberDesc" },
  { icon: BadgeCheck, titleKey: "lost", descKey: "lostDesc" },
  { icon: MapPin, titleKey: "traffic", descKey: "trafficDesc" },
  { icon: Shield, titleKey: "policeVerification", descKey: "policeVerificationDesc" },
]

const newsKeys = [
  { date: "15 Jul 2026", titleKey: "item1Title", descKey: "item1Desc", tagKey: "item1Tag" },
  { date: "10 Jul 2026", titleKey: "item2Title", descKey: "item2Desc", tagKey: "item2Tag" },
  { date: "05 Jul 2026", titleKey: "item3Title", descKey: "item3Desc", tagKey: "item3Tag" },
  { date: "28 Jun 2026", titleKey: "item4Title", descKey: "item4Desc", tagKey: "item4Tag" },
]

const helplineKeys = [
  { nameKey: "policeEmergency", number: "112" },
  { nameKey: "womenHelpline", number: "1091" },
  { nameKey: "childHelpline", number: "1098" },
  { nameKey: "trafficHelpline", number: "103" },
  { nameKey: "cyberCrime", number: "1930" },
  { nameKey: "antiCorruption", number: "1064" },
]



function Navbar() {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img src={karnatakaEmblem} alt="Karnataka Emblem" className="h-12 w-auto" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest text-primary/70 uppercase leading-none">
                {t("landing.navbar.governmentOfKarnataka")}
              </span>
              <h1 className="text-lg font-bold text-primary leading-tight">{t("landing.navbar.ksp")}</h1>
              <span className="text-[10px] text-primary/50 tracking-wide">{t("landing.navbar.scrb")}</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {["home", "citizenServices", "news", "contact"].map(key => (
              <a
                key={key}
                href={`#${key === "home" ? "hero" : key === "citizenServices" ? "services" : key === "news" ? "news" : "contact"}`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {t(`landing.navbar.${key}`)}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/auth/login">
              <Button variant="outline" size="sm" className="border-primary/30 text-primary">
                {t("landing.navbar.employeeLogin")}
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Shield className="h-4 w-4 mr-1.5" />
                {t("landing.navbar.citizenLogin")}
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {mobileOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6 text-primary" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-gray-200 bg-white overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {["home", "citizenServices", "news", "contact"].map(key => (
                <a
                  key={key}
                  href={`#${key === "home" ? "hero" : key === "citizenServices" ? "services" : key === "news" ? "news" : "contact"}`}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm font-medium text-gray-700 hover:text-foreground"
                >
                  {t(`landing.navbar.${key}`)}
                </a>
              ))}
              <div className="flex flex-col gap-2.5 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Language</span>
                  <LanguageSwitcher />
                </div>
                <div className="flex gap-2">
                  <Link to="/auth/login" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full border-primary/30 text-primary">
                      {t("landing.navbar.employeeLogin")}
                    </Button>
                  </Link>
                  <Link to="/auth/login" className="flex-1">
                    <Button size="sm" className="w-full bg-primary text-primary-foreground">
                      {t("landing.navbar.citizenLogin")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function HeroSection() {
  const { t } = useTranslation()

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary">
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-1.5 mb-6 rounded-sm">
              <Shield className="h-4 w-4 text-primary-foreground" />
              <span className="text-xs font-medium text-white/90">{t("landing.hero.badge")}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {t("landing.hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-4 max-w-xl">
              {t("landing.hero.subtitle")}
            </p>
            <p className="text-sm text-white/60 mb-8 max-w-lg">
              {t("landing.hero.description")}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/auth/login">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold px-8 shadow-sm">
                  {t("landing.hero.ctaCitizenServices")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#services">
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-white hover:bg-white/10 hover:text-white transition-colors px-8">
                  {t("landing.hero.ctaExplore")}
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/10">
              {helplineKeys.slice(0, 3).map(h => (
                <a key={h.number} href={`tel:${h.number}`} className="flex items-center gap-2 group">
                  <div className="p-1.5 rounded-full bg-white/10">
                    <PhoneCall className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">{t(`landing.helplines.${h.nameKey}`)}</div>
                    <div className="text-sm font-bold text-white">{h.number}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="bg-white/5 border border-white/10 rounded-sm p-8 max-w-sm">
              <img src={karnatakaEmblem} alt="Karnataka State Police Emblem" className="w-48 h-48 mx-auto object-contain opacity-90" />
              <div className="text-center mt-4 space-y-1">
                <div className="text-lg font-bold text-white">{t("landing.hero.emblemKSP")}</div>
                <div className="text-xs text-white/60">{t("landing.hero.emblemGovt")}</div>
                <div className="text-xs font-semibold text-white/80">Suraksha Eva Seva</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const { t } = useTranslation()

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-1.5 mb-4">
            <BadgeCheck className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("landing.services.badge")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("landing.services.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("landing.services.subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceKeys.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.titleKey} className="h-full p-6 border border-gray-200 hover:shadow-sm transition-all bg-white">
                <div className="p-3 rounded-sm bg-muted w-fit mb-4">
                  <Icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{t(`landing.services.${service.titleKey}`)}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{t(`landing.services.${service.descKey}`)}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                  <span>{t("landing.services.learnMore")}</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function NewsSection() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex(prev => Math.min(prev + 1, newsKeys.length - 1))
  const prev = () => setCurrentIndex(prev => Math.max(prev - 1, 0))

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-1.5 mb-4">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("landing.news.badge")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("landing.news.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("landing.news.subtitle")}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {newsKeys.slice(currentIndex, currentIndex + 2).map((item) => (
              <Card key={item.titleKey} className="p-6 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all bg-white h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-primary/60 bg-primary/5 px-2.5 py-1 rounded-full">{item.date}</span>
                  <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{t(`landing.news.${item.tagKey}`)}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t(`landing.news.${item.titleKey}`)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(`landing.news.${item.descKey}`)}</p>
                <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4 hover:gap-2 transition-all">
                  {t("landing.news.readMore")} <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="p-2 rounded-full border border-gray-300 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-500">
              {currentIndex + 1}–{Math.min(currentIndex + 2, newsKeys.length)} of {newsKeys.length}
            </span>
            <button
              onClick={next}
              disabled={currentIndex >= newsKeys.length - 2}
              className="p-2 rounded-full border border-gray-300 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function HelplineSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200/80 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-200/70 border border-slate-300 rounded-full px-3.5 py-1 mb-4">
            <PhoneCall className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{t("landing.helplines.badge")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            {t("landing.helplines.title")}
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
            {t("landing.helplines.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {helplineKeys.map((h) => (
            <a
              key={h.number}
              href={`tel:${h.number}`}
              className="group flex flex-col justify-center text-center p-5 rounded-lg bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all h-full"
            >
              <div className="p-3 rounded-full bg-slate-100 group-hover:bg-primary/10 transition-colors w-fit mx-auto mb-3">
                <PhoneCall className="h-5 w-5 text-primary" />
              </div>
              <div className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{h.number}</div>
              <div className="text-xs text-slate-600 font-medium leading-snug">{t(`landing.helplines.${h.nameKey}`)}</div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs sm:text-sm text-slate-600">
            {t("landing.helplines.generalInquiry")}{" "}
            <a href="mailto:info@ksp.karnataka.gov.in" className="text-primary hover:underline font-semibold">
              info@ksp.karnataka.gov.in
            </a>{" "}
            {t("landing.helplines.orVisit")}
          </p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-primary text-primary-foreground border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={karnatakaEmblem} alt="Karnataka Emblem" className="h-12 w-auto opacity-90" />
              <div>
                <span className="text-[9px] font-bold tracking-widest text-white/60 uppercase block leading-none">{t("landing.footer.governmentOfKarnataka")}</span>
                <h4 className="font-bold text-base text-white leading-tight">{t("landing.footer.ksp")}</h4>
                <p className="text-[10px] text-white/50">{t("landing.footer.scrb")}</p>
              </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              {t("landing.footer.description")}
            </p>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-sm bg-white/5 border border-white/10">
                <img src={karnatakaEmblem} alt="Emblem" className="h-6 w-auto" />
              </div>
              <div className="text-[10px] text-white/40">
                <div>{t("landing.footer.gigw")}</div>
                <div>{t("landing.footer.stqc")}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white/80">{t("landing.footer.quickLinks")}</h5>
            <ul className="space-y-2.5 text-xs text-white/60">
              {["home", "citizenCharter", "rightToInfo", "recruitment", "tenders", "contactUs"].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-white/80 transition-colors flex items-center gap-1.5 group">
                    <span className="h-1 w-1 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors" />
                    {t(`landing.footer.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white/80">{t("landing.footer.citizenServices")}</h5>
            <ul className="space-y-2.5 text-xs text-white/60">
              {["efir", "missingPerson", "characterVerification", "trafficChallan", "cyberCrimeReport", "lostFound", "policeVerification"].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-white/80 transition-colors flex items-center gap-1.5 group">
                    <span className="h-1 w-1 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors" />
                    {t(`landing.footer.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white/80">{t("landing.footer.contactInfo")}</h5>
            <ul className="space-y-3 text-xs text-white/60">
              <li className="flex gap-2">
                <MapPin className="h-3.5 w-3.5 text-white/80 shrink-0 mt-0.5" />
                <span>{t("landing.footer.address")}</span>
              </li>
              <li>
                <a href="tel:112" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                  <PhoneCall className="h-3.5 w-3.5 text-white/80 shrink-0" />
                  <span>{t("landing.footer.emergency")}</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@ksp.karnataka.gov.in" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                  <Mail className="h-3.5 w-3.5 text-white/80 shrink-0" />
                  <span>{t("landing.footer.email")}</span>
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-white/70 mb-2">{t("landing.footer.followUs")}</div>
              <div className="flex gap-2">
                {["Facebook", "Twitter", "YouTube", "Instagram"].map(sm => (
                  <a
                    key={sm}
                    href="#"
                    className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 text-[10px] text-white/50 hover:bg-white/10 hover:text-white transition-all"
                  >
                    {sm}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <div className="flex items-center gap-2 text-center md:text-left">
            <Shield className="h-3.5 w-3.5" />
            <span>{t("landing.footer.copyright")}</span>
          </div>
          <div className="flex items-center gap-4">
            {["privacyPolicy", "termsOfUse", "accessibility", "sitemap"].map(item => (
              <a key={item} href="#" className="hover:text-white/80 transition-colors">{t(`landing.footer.${item}`)}</a>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 text-[9px] text-white/30 text-center">
          {t("landing.footer.designedBy")} {t("landing.footer.lastUpdated")}
        </div>
      </div>
    </footer>
  )
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <NewsSection />
      <HelplineSection />
      <Footer />
    </div>
  )
}
