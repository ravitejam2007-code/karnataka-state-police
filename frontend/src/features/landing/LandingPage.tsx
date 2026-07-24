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
  ArrowRight,
  Briefcase,
  Newspaper,
} from "lucide-react"

import karnatakaEmblem from "@/assets/karnataka-emblem.png"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import { Button } from "@/components/ui/button"

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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-2xs font-sans">
      <nav className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Logo Section (Left) */}
          <div className="flex items-center gap-3 shrink-0">
            <img src={karnatakaEmblem} alt="Karnataka State Emblem" className="h-11 sm:h-12 w-auto object-contain" />
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase leading-tight">
                {t("landing.navbar.governmentOfKarnataka")}
              </span>
              <h1 className="text-base sm:text-lg font-bold text-[#1E293B] leading-tight tracking-tight">
                {t("landing.navbar.ksp")}
              </h1>
              <span className="text-[10px] font-medium text-[#64748B] leading-tight">
                {t("landing.navbar.scrb")}
              </span>
            </div>
          </div>

          {/* Navigation Menu (Center) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {["home", "citizenServices", "news", "contact"].map(key => (
              <a
                key={key}
                href={`#${key === "home" ? "hero" : key === "citizenServices" ? "services" : key === "news" ? "news" : "contact"}`}
                className="text-sm font-medium text-[#1E293B] hover:text-[#2563EB] transition-colors py-2"
              >
                {t(`landing.navbar.${key}`)}
              </a>
            ))}
          </div>

          {/* Right Section (Language & Direct Logins) */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/auth/login?portal=employee">
              <Button variant="outline" size="sm" className="border-slate-300 text-[#1E293B] hover:bg-slate-50 font-medium text-xs sm:text-sm h-10 px-4 rounded-md cursor-pointer">
                {t("landing.navbar.employeeLogin")}
              </Button>
            </Link>
            <Link to="/auth/login?portal=citizen">
              <Button size="sm" className="bg-[#111827] text-white hover:bg-slate-800 font-semibold text-xs sm:text-sm h-10 px-4 rounded-md shadow-2xs cursor-pointer">
                <Shield className="h-4 w-4 mr-1.5" />
                {t("landing.navbar.citizenLogin")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md hover:bg-slate-100 text-[#1E293B]"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-slate-200 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {["home", "citizenServices", "news", "contact"].map(key => (
                <a
                  key={key}
                  href={`#${key === "home" ? "hero" : key === "citizenServices" ? "services" : key === "news" ? "news" : "contact"}`}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm font-semibold text-[#1E293B] hover:text-[#2563EB]"
                >
                  {t(`landing.navbar.${key}`)}
                </a>
              ))}
              <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Language</span>
                  <LanguageSwitcher />
                </div>
                <div className="flex gap-2">
                  <Link to="/auth/login?portal=employee" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full border-slate-300 text-[#1E293B]">
                      {t("landing.navbar.employeeLogin")}
                    </Button>
                  </Link>
                  <Link to="/auth/login?portal=citizen" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button size="sm" className="w-full bg-[#111827] text-white">
                      {t("landing.navbar.citizenLogin")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function HeroSection() {
  const { t } = useTranslation()

  return (
    <section id="hero" className="relative bg-[#F8FAFC] border-b border-[#E2E8F0] pt-[48px] pb-[48px] md:pt-[56px] md:pb-[56px] lg:pt-[72px] lg:pb-[64px] font-sans">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Government Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] px-3.5 py-1.5 rounded-full shadow-2xs mb-6">
            <img src={karnatakaEmblem} alt="Government of Karnataka Emblem" className="h-4 w-auto object-contain" />
            <span className="text-xs font-semibold tracking-wide text-[#1E293B]">
              {t("landing.navbar.governmentOfKarnataka")} • {t("landing.navbar.scrb")}
            </span>
          </div>

          {/* Hero Title */}
          <h1 className="text-[34px] md:text-[42px] lg:text-[54px] font-bold text-[#1E293B] tracking-tight leading-[1.15] max-w-3xl mb-6">
            {t("landing.hero.title")}
          </h1>

          {/* Hero Description */}
          <p className="text-[16px] md:text-[18px] text-[#475569] leading-[1.7] max-w-2xl mb-8">
            {t("landing.hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8">
            <Link to="/auth/login" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-[#1E3A8A] text-white hover:bg-[#1D4ED8] font-bold px-7 h-[48px] rounded-[12px] shadow-sm hover:-translate-y-[2px] transition-all duration-200 text-sm"
              >
                {t("landing.hero.ctaCitizenServices")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#services" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto bg-white border border-[#1E3A8A] text-[#1E293B] hover:bg-slate-50 font-semibold px-7 h-[48px] rounded-[12px] shadow-sm hover:-translate-y-[2px] transition-all duration-200 text-sm"
              >
                {t("landing.hero.ctaExplore")}
              </Button>
            </a>
          </div>

          {/* Government Subtitle / Feature Line */}
          <div className="w-full max-w-xl border-t border-[#E2E8F0] pt-5 mt-2">
            <p className="text-xs md:text-sm font-medium text-[#475569] tracking-wide text-center">
              Supporting Investigation • Crime Analytics • Predictive Intelligence • Secure Operations
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const { t } = useTranslation()

  return (
    <section id="services" className="py-14 md:py-18 bg-white font-sans border-b border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-300 rounded-full px-3.5 py-1 mb-3">
            <Briefcase className="h-3.5 w-3.5 text-slate-700" />
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{t("landing.services.badge")}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            {t("landing.services.title")}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {t("landing.services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceKeys.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.titleKey}
                className="group p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-400 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded-lg bg-slate-100 text-slate-800 w-fit mb-3.5 group-hover:bg-[#111827] group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {t(`landing.services.${s.titleKey}`)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {t(`landing.services.${s.descKey}`)}
                  </p>
                </div>
                <Link to="/auth/login" className="inline-flex items-center text-xs font-semibold text-blue-600 hover:underline pt-2 border-t border-slate-100">
                  Access Portal Module <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function NewsSection() {
  const { t } = useTranslation()

  return (
    <section id="news" className="py-14 md:py-18 bg-[#F8FAFC] border-b border-slate-200 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-200/80 border border-slate-300 rounded-full px-3 py-1 mb-2">
              <Newspaper className="h-3.5 w-3.5 text-slate-700" />
              <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">{t("landing.news.badge")}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{t("landing.news.title")}</h2>
          </div>
          <a href="#" className="mt-3 md:mt-0 text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
            {t("landing.news.viewAll")} <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {newsKeys.map((item, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2.5">
                  <span className="font-mono">{item.date}</span>
                  <span>•</span>
                  <span className="text-blue-700 font-medium">{t(`landing.news.${item.tagKey}`)}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-2 line-clamp-2 leading-snug">
                  {t(`landing.news.${item.titleKey}`)}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {t(`landing.news.${item.descKey}`)}
                </p>
              </div>
              <a href="#" className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1 pt-2 border-t border-slate-100">
                Official Bulletin <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HelplineSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="py-14 sm:py-18 bg-white font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-300 rounded-full px-3.5 py-1 mb-3">
            <PhoneCall className="h-3.5 w-3.5 text-slate-700" />
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{t("landing.helplines.badge")}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            {t("landing.helplines.title")}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {t("landing.helplines.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {helplineKeys.map((h) => (
            <a
              key={h.number}
              href={`tel:${h.number}`}
              className="group flex flex-col justify-center text-center p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all h-full"
            >
              <div className="p-2.5 rounded-full bg-white border border-slate-200 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors w-fit mx-auto mb-2.5">
                <PhoneCall className="h-4 w-4 text-slate-700 group-hover:text-blue-600" />
              </div>
              <div className="text-lg font-bold text-slate-900 mb-0.5 group-hover:text-blue-600 transition-colors font-mono">{h.number}</div>
              <div className="text-[11px] text-slate-600 font-medium leading-snug">{t(`landing.helplines.${h.nameKey}`)}</div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-600">
            {t("landing.helplines.generalInquiry")}{" "}
            <a href="mailto:info@ksp.karnataka.gov.in" className="text-blue-600 hover:underline font-semibold">
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
  return (
    <footer className="bg-[#F8FAFC] text-[#1E293B] border-t border-[#E2E8F0] font-sans">
      <div className="container mx-auto px-4 max-w-6xl py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#E2E8F0]">
          
          {/* Left Column: Official Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={karnatakaEmblem} alt="Government of Karnataka Emblem" className="h-10 w-auto object-contain" />
              <div>
                <span className="text-[9px] font-extrabold tracking-widest text-[#64748B] uppercase block leading-none">Government of Karnataka</span>
                <h4 className="font-bold text-sm text-[#1E293B] leading-tight">Karnataka State Police</h4>
                <p className="text-[10px] text-[#64748B]">State Crime Records Bureau</p>
              </div>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed max-w-sm">
              Official AI-powered crime intelligence platform supporting Karnataka State Police with real-time analytics, investigation tools, and secure operations.
            </p>
          </div>

          {/* Center Column: Quick Navigation */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">Portal Navigation</h5>
            <ul className="grid grid-cols-2 gap-2 text-xs text-[#475569]">
              <li>
                <a href="#hero" className="hover:text-[#1E3A8A] transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#1E3A8A] transition-colors">Citizen Services</a>
              </li>
              <li>
                <a href="#news" className="hover:text-[#1E3A8A] transition-colors">Press Bulletins</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#1E3A8A] transition-colors">Emergency Helplines</a>
              </li>
              <li>
                <Link to="/auth/login" className="hover:text-[#1E3A8A] transition-colors">Employee Login</Link>
              </li>
              <li>
                <Link to="/auth/login" className="hover:text-[#1E3A8A] transition-colors">Citizen Gateway</Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Contact Headquarters */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">State Headquarters</h5>
            <ul className="space-y-2 text-xs text-[#475569]">
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#1E3A8A] shrink-0 mt-0.5" />
                <span>State Crime Records Bureau, Nrupatunga Road, Bengaluru, Karnataka 560001</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="h-3.5 w-3.5 text-[#1E3A8A] shrink-0" />
                <span>Emergency Command Center: <strong className="text-[#1E293B] font-mono">112</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#1E3A8A] shrink-0" />
                <a href="mailto:info@ksp.karnataka.gov.in" className="hover:underline hover:text-[#1E3A8A]">
                  info@ksp.karnataka.gov.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#64748B]">
          <div>
            © 2026 Karnataka State Police • Government of Karnataka. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="hover:text-[#1E3A8A] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#1E3A8A] transition-colors">Terms of Use</a>
            <span>•</span>
            <a href="#" className="hover:text-[#1E3A8A] transition-colors">Accessibility Statement</a>
          </div>
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
