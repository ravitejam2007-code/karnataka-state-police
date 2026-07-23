import { useState } from "react"
import { 
  FileText, FileDown, FileSpreadsheet, FileIcon, 
  LayoutTemplate, Download, Archive, Search, MoreVertical 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useTranslation } from "react-i18next"

const TEMPLATES = [
  { id: 1, name: "Daily Shift Report", type: "PDF", category: "Operations" },
  { id: 2, name: "Weekly Crime Statistics", type: "Excel", category: "Analytics" },
  { id: 3, name: "Monthly Zone Assessment", type: "PDF", category: "Management" },
  { id: 4, name: "Active FIRs Export", type: "CSV", category: "Investigation" },
]

const SAVED_REPORTS = [
  { id: 101, name: "October Traffic Violations", date: "2026-10-31", format: "Excel", size: "1.2 MB" },
  { id: 102, name: "Q3 East Zone Assessment", date: "2026-10-15", format: "PDF", size: "3.4 MB" },
  { id: 103, name: "Cyber Crime Trend Analysis", date: "2026-10-02", format: "PDF", size: "2.1 MB" },
]

export function ReportsPage() {
  const [search, setSearch] = useState("")
  const { t } = useTranslation()

  return (
    <div className="h-full flex flex-col p-6 space-y-8 overflow-y-auto bg-muted/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FileText className="h-8 w-8 text-foreground" />
            {t("reports.title")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("reports.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <LayoutTemplate className="h-4 w-4" />
            {t("reports.newTemplate")}
          </Button>
          <Button className="gap-2">
            <FileDown className="h-4 w-4" />
            {t("reports.generateReport")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Export Actions */}
        <div className="lg:col-span-3">
          <h2 className="text-lg font-semibold mb-4">{t("reports.quickExports")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 bg-card border rounded-sm flex items-center gap-4 cursor-pointer transition-colors">
              <div className="p-3 bg-muted rounded-lg">
                <FileIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t("reports.exportPdf")}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t("reports.exportPdfDesc")}</p>
              </div>
            </div>
            <div className="p-6 bg-card border rounded-sm flex items-center gap-4 cursor-pointer transition-colors">
              <div className="p-3 bg-muted rounded-lg">
                <FileSpreadsheet className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t("reports.exportExcel")}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t("reports.exportExcelDesc")}</p>
              </div>
            </div>
            <div className="p-6 bg-card border rounded-sm flex items-center gap-4 cursor-pointer transition-colors">
              <div className="p-3 bg-muted rounded-lg">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t("reports.exportCsv")}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t("reports.exportCsvDesc")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Templates */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold">{t("reports.reportTemplates")}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t("reports.searchTemplates")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          <div className="space-y-3">
            {TEMPLATES.filter(tpl => tpl.name.toLowerCase().includes(search.toLowerCase())).map(template => (
              <div key={template.id} className="p-4 bg-card border rounded-sm hover:border-primary/50 transition-colors flex justify-between items-center group">
                <div>
                  <h4 className="font-medium text-sm">{template.name}</h4>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] uppercase px-2 py-0.5 bg-muted rounded-full font-semibold">{template.category}</span>
                    <span className="text-[10px] uppercase px-2 py-0.5 bg-muted rounded-full font-semibold text-primary">{template.type}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <FileDown className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Reports */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">{t("reports.savedReports")}</h2>
          <Card>
            <CardHeader className="pb-3 border-b border-muted/50">
              <CardTitle className="text-sm text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-2">
                <Archive className="w-4 h-4" /> {t("reports.archive")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-muted/50">
                {SAVED_REPORTS.map(report => (
                  <div key={report.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        {report.format === 'PDF' ? <FileIcon className="w-5 h-5" /> : <FileSpreadsheet className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{report.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Generated: {report.date} &bull; {report.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="hidden sm:flex">
                        <Download className="w-4 h-4 mr-2" /> {t("common.download")}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
