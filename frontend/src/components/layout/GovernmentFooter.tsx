import karnatakaEmblem from "@/assets/karnataka-emblem.png"

export function GovernmentFooter() {
  return (
    <footer className="mt-auto border-t border-[#E5E7EB] bg-white text-[#111827] z-20 shrink-0 font-sans text-xs">
      <div className="container mx-auto px-4 py-3 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Left: Karnataka State Police */}
        <div className="flex items-center gap-2.5">
          <img
            src={karnatakaEmblem}
            alt="Karnataka Police Emblem"
            className="h-6 w-auto object-contain shrink-0"
          />
          <div className="text-[11px] font-medium text-[#6B7280]">
            © {new Date().getFullYear()} <strong className="text-[#111827] font-bold">Karnataka State Police</strong> | Government of Karnataka
          </div>
        </div>

        {/* Right Links: Privacy Policy, Terms, Accessibility, Contact */}
        <div className="flex items-center gap-3 text-[11px] font-medium text-[#6B7280]">
          <a href="#" className="hover:text-[#111827] transition-colors">
            Privacy Policy
          </a>
          <span className="text-[#E5E7EB]">•</span>
          <a href="#" className="hover:text-[#111827] transition-colors">
            Terms of Use
          </a>
          <span className="text-[#E5E7EB]">•</span>
          <a href="#" className="hover:text-[#111827] transition-colors">
            Accessibility
          </a>
          <span className="text-[#E5E7EB]">•</span>
          <a href="#" className="hover:text-[#111827] transition-colors">
            Contact SCRB
          </a>
        </div>
      </div>
    </footer>
  )
}
