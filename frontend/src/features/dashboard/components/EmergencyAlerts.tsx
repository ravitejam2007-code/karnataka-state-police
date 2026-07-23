import { useTranslation } from "react-i18next"
import { AlertTriangle, ChevronRight, X } from "lucide-react"
import { useState } from "react"

export function EmergencyAlerts() {
  const { t } = useTranslation()
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="w-full" style={{ backgroundColor: "#D32F2F" }}>
      <div className="flex items-center px-4 py-1.5 text-white">
        <div className="flex items-center font-bold tracking-widest text-[10px] shrink-0 bg-white/20 text-white px-2 py-0.5 rounded-sm uppercase">
          <AlertTriangle className="w-3 h-3 mr-1.5" />
          {t("emergency.highAlert")}
        </div>
        
        <div className="ml-3 text-xs font-medium uppercase truncate flex-1 flex items-center space-x-3">
          <span>[BLR-92] ABSCONDER SPOTTED IN SECTOR 4 INDUSTRIAL AREA</span>
          <span className="text-white/50 hidden md:inline">•</span>
          <span className="hidden md:inline">[CYB-11] SUSPECTED RANSOMWARE ACTIVITY DETECTED ON NODE 72</span>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <button className="text-[10px] uppercase font-bold hover:underline flex items-center text-white/90">
            {t("emergency.viewAll")} <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
          <button onClick={() => setDismissed(true)} className="text-white/70 hover:text-white p-0.5">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
