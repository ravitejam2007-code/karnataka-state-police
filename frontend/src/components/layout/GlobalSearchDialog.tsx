import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation, Trans } from "react-i18next"
import { Search, FileText, User, MapPin, Building, Briefcase } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock search dataset
const SEARCH_DATA = [
  { id: "1", type: "FIR", title: "FIR-2026-0892", desc: "Theft at Indiranagar", icon: FileText, path: "/app/cases" },
  { id: "2", type: "Person", title: "Ramesh Kumar", desc: "Repeat Offender - Burglary", icon: User, path: "/app/network" },
  { id: "3", type: "Officer", title: "Insp. Sarah Joseph", desc: "Cyber Crime Division", icon: User, path: "/app/reports" },
  { id: "4", type: "District", title: "Bengaluru South", desc: "High Risk Zone", icon: MapPin, path: "/app/map" },
  { id: "5", type: "Station", title: "Koramangala PS", desc: "Station ID: KRM-01", icon: Building, path: "/app/analytics" },
  { id: "6", type: "Case", title: "CASE-9921", desc: "Financial Fraud Syndicate", icon: Briefcase, path: "/app/cases" },
]

export function GlobalSearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Reset query on close
  useEffect(() => {
    if (!open) setQuery("")
  }, [open])

  const results = SEARCH_DATA.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (path: string) => {
    onOpenChange(false)
    navigate(path)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0 bg-card border-muted/30">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="sr-only">{t("search.title")}</DialogTitle>
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="border-0 focus-visible:ring-0 shadow-none text-lg bg-transparent"
              aria-label="Global Search Input"
            />
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          {query.trim() === "" ? (
            <div className="p-8 text-center text-muted-foreground flex flex-col items-center justify-center gap-2">
              <Search className="w-8 h-8 opacity-20" />
              <p className="text-sm">{t("search.startTyping")}</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground flex flex-col items-center justify-center gap-2">
              <p className="text-sm font-medium">
                <Trans i18nKey="search.noResults" values={{ query }} />
              </p>
              <p className="text-xs">{t("search.noResultsHint")}</p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result.path)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 focus:bg-muted/50 focus:outline-none transition-colors text-left"
                  aria-label={`Select ${result.type} ${result.title}`}
                >
                  <div className="p-2 bg-primary/10 text-primary rounded-md shrink-0">
                    <result.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      {result.title}
                      <span className="text-[10px] uppercase font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        {result.type}
                      </span>
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">{result.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-2 border-t bg-muted/20 text-xs text-muted-foreground flex justify-between items-center">
          <span>
            <kbd className="font-mono bg-muted px-1 rounded border">↑</kbd>{" "}
            <kbd className="font-mono bg-muted px-1 rounded border">↓</kbd>{" "}
            {t("search.navigateHint")}
          </span>
          <span>
            <kbd className="font-mono bg-muted px-1 rounded border">Esc</kbd>{" "}
            {t("search.closeHint")}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
