import { Link } from "react-router-dom"
import karnatakaEmblem from "@/assets/karnataka-emblem.png"

export function GovernmentFooter() {
  return (
    <footer className="mt-auto border-t border-[#E2E8F0] bg-white text-[#1E293B] z-20 shrink-0 font-sans text-xs">
      <div className="container mx-auto px-4 py-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start pb-4 border-b border-[#E2E8F0]">
          {/* Left: Karnataka Police logo, Government of Karnataka, SCRB */}
          <div className="flex items-center gap-3">
            <img
              src={karnatakaEmblem}
              alt="Karnataka Police Logo"
              className="h-10 w-auto object-contain shrink-0"
            />
            <div className="leading-tight">
              <span className="text-[10px] font-bold tracking-wider text-[#64748B] uppercase block">
                Government of Karnataka
              </span>
              <h4 className="font-bold text-sm text-[#1E293B]">Karnataka State Police</h4>
              <p className="text-[11px] text-[#64748B]">State Crime Records Bureau (SCRB)</p>
            </div>
          </div>

          {/* Center: Home, Services, Contact, Login */}
          <div className="flex flex-wrap items-center justify-start md:justify-center gap-4 text-xs font-semibold text-[#475569]">
            <Link to="/app/dashboard" className="hover:text-[#2563EB] transition-colors">Home</Link>
            <Link to="/app/cases" className="hover:text-[#2563EB] transition-colors">Services</Link>
            <a href="mailto:scrb@ksp.gov.in" className="hover:text-[#2563EB] transition-colors">Contact</a>
            <Link to="/auth/login" className="hover:text-[#2563EB] transition-colors">Login</Link>
          </div>

          {/* Right: Headquarters, Emergency 112, Official Email */}
          <div className="flex flex-col md:items-end text-left md:text-right space-y-1 text-xs text-[#475569]">
            <div><strong className="text-[#1E293B]">Headquarters:</strong> KSP Police HQ, Bengaluru</div>
            <div><strong className="text-red-600">Emergency:</strong> 112 Control Room</div>
            <div><strong className="text-[#1E293B]">Official Email:</strong> contact@ksp.gov.in</div>
          </div>
        </div>

        {/* Bottom: © Karnataka State Police | Government of Karnataka, Privacy Policy, Terms, Accessibility */}
        <div className="pt-3 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-[#64748B]">
          <div>
            © {new Date().getFullYear()} Karnataka State Police | Government of Karnataka
          </div>
          <div className="flex items-center gap-4 font-medium">
            <a href="#" className="hover:text-[#1E293B] transition-colors">Privacy Policy</a>
            <span className="text-[#CBD5E1]">•</span>
            <a href="#" className="hover:text-[#1E293B] transition-colors">Terms of Use</a>
            <span className="text-[#CBD5E1]">•</span>
            <a href="#" className="hover:text-[#1E293B] transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
