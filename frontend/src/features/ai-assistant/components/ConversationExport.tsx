import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { FileDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePdfExport } from "@/hooks/usePdfExport"
import type { IntelligenceResponse } from "../types"

interface ConversationExportProps {
  title: string
  activeReport: IntelligenceResponse | null
}

export function ConversationExport({ title, activeReport }: ConversationExportProps) {
  const { t } = useTranslation()
  const contentRef = useRef<HTMLDivElement>(null)
  const { exportElementToPdf, isExporting } = usePdfExport()

  const handleExport = async () => {
    if (!contentRef.current) return
    const filename = `${title.replace(/\s+/g, "_").toLowerCase()}_${Date.now()}.pdf`
    await exportElementToPdf(contentRef.current, filename)
  }

  return (
    <>
      <div ref={contentRef} className="absolute -z-10 opacity-0 pointer-events-none" aria-hidden="true">
        {activeReport && (
          <div className="p-8 bg-white text-black" style={{ minHeight: "297mm", width: "210mm" }}>
            <div className="border-b-2 border-gray-800 pb-4 mb-6">
              <h1 className="text-2xl font-bold">{t("app.title")}</h1>
              <p className="text-sm text-gray-600">{t("app.subtitle")}</p>
            </div>
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {activeReport.items.map((item) => (
              <div key={item.id} className="mb-4 p-4 border border-gray-300 rounded">
                <p className="font-medium">{item.type}</p>
                <pre className="text-xs mt-2 text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(item.data, null, 2)}
                </pre>
              </div>
            ))}
            <div className="mt-8 pt-4 border-t border-gray-300 text-xs text-gray-500">
              {t("app.footer")} | {t("ai.report.classification")}: {t("ai.report.confidential")}
            </div>
          </div>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        disabled={isExporting || !activeReport}
        className="gap-2"
      >
        {isExporting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <FileDown className="h-4 w-4" />
        )}
        {t("ai.savePdf")}
      </Button>
    </>
  )
}
