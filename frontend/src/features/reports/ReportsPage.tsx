import { useState } from "react"
import { toast } from "sonner"
import { 
  FileText, FileDown, FileSpreadsheet, FileIcon, 
  LayoutTemplate, Download, Archive, Search, Printer, Calendar, Eye, X
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
  const [previewReport, setPreviewReport] = useState<any | null>(null)
  const [isNewTemplateOpen, setIsNewTemplateOpen] = useState(false)
  const { t } = useTranslation()

  const handleExport = (format: string, title?: string) => {
    const docTitle = title || `State_Police_Report_${format}`
    toast.success(`Exporting ${docTitle} (${format})`, {
      description: `Downloaded official report dossier in ${format} format.`
    })
  }

  const handlePrint = () => {
    toast.info("Opening Print Preview Dialog...")
    setTimeout(() => {
      window.print()
    }, 400)
  }

  const handleScheduleReport = () => {
    toast.success("Automated Schedule Set", {
      description: "Weekly crime summary will be emailed to Command Desk every Monday at 08:00 AM."
    })
  }

  return (
    <div className="flex-1 flex flex-col space-y-8 pb-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#111827] flex items-center gap-2">
            <FileText className="h-8 w-8 text-[#111827]" />
            {t("reports.title")}
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            {t("reports.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsNewTemplateOpen(true)}
            className="gap-2 border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6] h-10 px-4 rounded-xl text-xs font-semibold cursor-pointer"
          >
            <LayoutTemplate className="h-4 w-4" />
            {t("reports.newTemplate")}
          </Button>

          <Button 
            onClick={() => handleExport("PDF", "Custom_Intelligence_Brief")}
            className="gap-2 bg-[#111827] hover:bg-[#1F2937] text-white h-10 px-4 rounded-xl text-xs font-bold cursor-pointer shadow-2xs"
          >
            <FileDown className="h-4 w-4" />
            {t("reports.generateReport")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Export Actions */}
        <div className="lg:col-span-3">
          <h2 className="text-lg font-semibold mb-4 text-[#1F2937]">{t("reports.quickExports")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div 
              onClick={() => handleExport("PDF", "KSP_Daily_State_Summary")}
              className="p-6 bg-white border border-[#E2E8F0] rounded-xl flex items-center gap-4 cursor-pointer hover:border-[#0F172A] transition-colors shadow-2xs group"
            >
              <div className="p-3 bg-[#0F172A] text-white rounded-lg group-hover:scale-105 transition-transform">
                <FileIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#1F2937] text-sm">{t("reports.exportPdf")}</h3>
                <p className="text-xs text-[#64748B] mt-1">{t("reports.exportPdfDesc")}</p>
              </div>
            </div>

            <div 
              onClick={() => handleExport("Excel", "KSP_Crime_Statistics_Matrix")}
              className="p-6 bg-white border border-[#E2E8F0] rounded-xl flex items-center gap-4 cursor-pointer hover:border-[#0F172A] transition-colors shadow-2xs group"
            >
              <div className="p-3 bg-emerald-700 text-white rounded-lg group-hover:scale-105 transition-transform">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#1F2937] text-sm">{t("reports.exportExcel")}</h3>
                <p className="text-xs text-[#64748B] mt-1">{t("reports.exportExcelDesc")}</p>
              </div>
            </div>

            <div 
              onClick={() => handleExport("CSV", "KSP_FIR_Raw_Log")}
              className="p-6 bg-white border border-[#E2E8F0] rounded-xl flex items-center gap-4 cursor-pointer hover:border-[#0F172A] transition-colors shadow-2xs group"
            >
              <div className="p-3 bg-slate-800 text-white rounded-lg group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#1F2937] text-sm">{t("reports.exportCsv")}</h3>
                <p className="text-xs text-[#64748B] mt-1">{t("reports.exportCsvDesc")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Templates */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-[#1F2937]">{t("reports.reportTemplates")}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
            <Input 
              placeholder={t("reports.searchTemplates")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-[#E2E8F0] text-xs"
            />
          </div>
          <div className="space-y-3">
            {TEMPLATES.filter(tpl => tpl.name.toLowerCase().includes(search.toLowerCase())).map(template => (
              <div key={template.id} className="p-4 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#0F172A] transition-colors flex justify-between items-center group">
                <div>
                  <h4 className="font-bold text-xs text-[#1F2937]">{template.name}</h4>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] uppercase px-2 py-0.5 bg-slate-100 text-[#1F2937] rounded-full font-bold">{template.category}</span>
                    <span className="text-[10px] uppercase px-2 py-0.5 bg-blue-50 text-blue-800 rounded-full font-bold">{template.type}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleExport(template.type, template.name)}
                  variant="ghost" 
                  size="icon" 
                  className="opacity-70 group-hover:opacity-100 transition-opacity hover:bg-slate-100"
                >
                  <FileDown className="w-4 h-4 text-[#0F172A]" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Reports Archive */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-[#1F2937]">{t("reports.savedReports")}</h2>
          <Card className="border-[#E2E8F0] shadow-2xs">
            <CardHeader className="pb-3 border-b border-[#E2E8F0]">
              <CardTitle className="text-xs text-[#64748B] font-bold uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Archive className="w-4 h-4 text-[#0F172A]" /> {t("reports.archive")}
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handlePrint} className="h-7 text-xs gap-1">
                    <Printer className="w-3.5 h-3.5" /> Print
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleScheduleReport} className="h-7 text-xs gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Schedule
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#E2E8F0]">
                {SAVED_REPORTS.map(report => (
                  <div key={report.id} className="p-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors text-xs">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200">
                        {report.format === 'PDF' ? <FileIcon className="w-5 h-5 text-blue-700" /> : <FileSpreadsheet className="w-5 h-5 text-emerald-700" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#1F2937]">{report.name}</h4>
                        <p className="text-xs text-[#64748B] mt-0.5">Generated: {report.date} &bull; {report.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => setPreviewReport(report)}
                        variant="outline" 
                        size="sm" 
                        className="text-xs border-[#E2E8F0] text-[#1F2937] hover:bg-white"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                      </Button>
                      <Button 
                        onClick={() => handleExport(report.format, report.name)}
                        size="sm" 
                        className="bg-[#0F172A] hover:bg-black text-white text-xs font-semibold"
                      >
                        <Download className="w-3.5 h-3.5 mr-1" /> Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Preview Report Modal */}
      {previewReport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-50">
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-xl w-full p-6 space-y-4 text-[#1F2937]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#0F172A]" />
                <h3 className="text-sm font-bold">{previewReport.name} (Preview)</h3>
              </div>
              <button onClick={() => setPreviewReport(null)} className="p-1 rounded hover:bg-slate-100 text-[#64748B]">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-2 text-xs font-mono">
              <p className="font-bold text-[#1F2937]">[OFFICIAL STATE POLICE INTELLIGENCE DOSSIER]</p>
              <p>Document: {previewReport.name}</p>
              <p>Format: {previewReport.format} • Size: {previewReport.size}</p>
              <p>Generated Date: {previewReport.date}</p>
              <p>Classification: CONFIDENTIAL / RESTRICTED LAW ENFORCEMENT</p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E2E8F0]">
              <Button variant="outline" size="sm" onClick={() => setPreviewReport(null)} className="text-xs">
                Close
              </Button>
              <Button size="sm" onClick={handlePrint} className="bg-slate-800 text-white text-xs gap-1">
                <Printer className="w-3.5 h-3.5" /> Print
              </Button>
              <Button size="sm" onClick={() => handleExport(previewReport.format, previewReport.name)} className="bg-[#0F172A] hover:bg-black text-white text-xs gap-1">
                <Download className="w-3.5 h-3.5" /> Download
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* New Template Modal */}
      {isNewTemplateOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-50">
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-md w-full p-6 space-y-4 text-[#1F2937]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-sm font-bold">Create Report Template</h3>
              <button onClick={() => setIsNewTemplateOpen(false)} className="p-1 rounded hover:bg-slate-100 text-[#64748B]">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Template Name</label>
                <Input placeholder="e.g. Monthly Narcotics Seizure Log" className="bg-[#F8FAFC] border-[#E2E8F0]" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Category</label>
                <select className="w-full h-9 px-3 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] text-xs">
                  <option>Operations</option>
                  <option>Analytics</option>
                  <option>Management</option>
                  <option>Investigation</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E2E8F0]">
              <Button variant="outline" size="sm" onClick={() => setIsNewTemplateOpen(false)} className="text-xs">
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={() => {
                  toast.success("Report Template Saved!")
                  setIsNewTemplateOpen(false)
                }}
                className="bg-[#0F172A] hover:bg-black text-white text-xs font-bold"
              >
                Save Template
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
