import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

const cases = [
  { id: "FIR-2026/00142", type: "Cyber Fraud", status: "Active", officer: "Insp. R. Kumar", date: "2026-07-14" },
  { id: "FIR-2026/00140", type: "Narcotics", status: "Pending Intel", officer: "ACP S. Gowda", date: "2026-07-12" },
  { id: "FIR-2026/00139", type: "Organized Crime", status: "Surveillance", officer: "DCP M. Patil", date: "2026-07-11" },
  { id: "FIR-2026/00135", type: "Traffic/Hit & Run", status: "Closed", officer: "SI T. Ramesh", date: "2026-07-09" },
  { id: "FIR-2026/00132", type: "Cyber Extortion", status: "Active", officer: "Insp. R. Kumar", date: "2026-07-05" },
]

export function RecentInvestigations() {
  const { t } = useTranslation()

  return (
    <Card className="rounded-sm border-border bg-card flex flex-col">
      <CardHeader className="p-4 border-b border-border pb-3 bg-muted/50">
        <CardTitle className="text-xs uppercase tracking-widest flex items-center">
          <Search className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
          {t("dashboard.investigationsLedger")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/30 text-[10px] uppercase font-semibold text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-mono">{t("dashboard.caseId")}</th>
                <th className="px-4 py-3">{t("dashboard.classification")}</th>
                <th className="px-4 py-3">{t("dashboard.status")}</th>
                <th className="px-4 py-3">{t("dashboard.leadOfficer")}</th>
                <th className="px-4 py-3 text-right">{t("dashboard.dateInitiated")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cases.map((c) => (
                <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-medium">{c.id}</td>
                  <td className="px-4 py-3 text-foreground">{c.type}</td>
                  <td className="px-4 py-3">
                    <span className="px-1.5 py-0.5 rounded-sm text-[9px] uppercase tracking-wider font-semibold bg-muted text-muted-foreground">
                      {c.status === "Active" ? t("dashboard.active") : c.status === "Closed" ? t("dashboard.closed") : c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.officer}</td>
                  <td className="px-4 py-3 text-right font-mono text-muted-foreground">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
