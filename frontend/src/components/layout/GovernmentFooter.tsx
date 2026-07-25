import karnatakaEmblem from "@/assets/karnataka-emblem.png"

export function GovernmentFooter() {
  return (
    <footer className="w-full mt-auto border-t border-[#E2E8F0] bg-white text-[#1E293B] z-20 shrink-0 font-sans text-xs py-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Karnataka State Police */}
        <div className="flex items-center gap-2.5">
          <img
            src={karnatakaEmblem}
            alt="Karnataka Police Emblem"
            className="h-6 w-auto object-contain shrink-0"
          />
          <div className="text-[11px] font-medium text-[#64748B]">
            © {new Date().getFullYear()} <strong className="text-[#1E293B] font-bold">Karnataka State Police</strong> | Government of Karnataka
          </div>
        </div>

        {/* Right Links: Privacy Policy, Terms, Accessibility, Contact */}
        <div className="flex items-center gap-3 text-[11px] font-semibold text-[#64748B]">
          <a href="#" className="hover:text-[#0F172A] transition-colors">
            Privacy Policy
          </a>
          <span className="text-[#CBD5E1]">•</span>
          <a href="#" className="hover:text-[#0F172A] transition-colors">
            Terms of Use
          </a>
          <span className="text-[#CBD5E1]">•</span>
          <a href="#" className="hover:text-[#0F172A] transition-colors">
            Accessibility
          </a>
          <span className="text-[#CBD5E1]">•</span>
          <a href="#" className="hover:text-[#0F172A] transition-colors">
            Contact SCRB
          </a>
        </div>
      </div>
    </footer>
  )
}
