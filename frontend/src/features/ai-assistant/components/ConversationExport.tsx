import { useState } from "react"
import { Download, Printer, FileText, FileCode, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"
import type { IntelligenceResponse } from "../types"
import { jsPDF } from "jspdf"

interface ConversationExportProps {
  messages: Array<{
    id: string
    sender: "user" | "ai"
    text: string
    timestamp: string
    report?: IntelligenceResponse | null
  }>
  activeTitle?: string
}

export function ConversationExport({ messages, activeTitle = "Karnataka Police AI Investigation Chat" }: ConversationExportProps) {
  const { isKannada } = useLanguage()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const formatTextContent = () => {
    const header = isKannada
      ? `=== ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ - ಎಐ ತನಿಖಾ ವರದಿ ===\nದಿನಾಂಕ: ${new Date().toLocaleDateString()}\nವಿಷಯ: ${activeTitle}\n\n`
      : `=== KARNATAKA STATE POLICE - AI INVESTIGATION DOSSIER ===\nDate: ${new Date().toLocaleDateString()}\nTopic: ${activeTitle}\n\n`

    const body = messages.map(m => {
      const roleStr = m.sender === "user" 
        ? (isKannada ? "[ಅಧಿಕಾರಿ / ಬಳಕೆದಾರ]:" : "[Officer / User]:") 
        : (isKannada ? "[ಎಐ ಸಹಾಯಕ]:" : "[AI Assistant]:")
      return `${roleStr}\n${m.text}\n(${m.timestamp})\n----------------------------------------`
    }).join("\n\n")

    return header + body
  }

  const handleDownloadTxt = () => {
    const textContent = formatTextContent()
    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ksp_ai_conversation_${isKannada ? "kn" : "en"}_${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
    setIsDropdownOpen(false)
  }

  const handleDownloadDocx = () => {
    const htmlDoc = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>KSP AI Dossier</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #1F2937; }
        h1 { color: #2563EB; font-size: 16pt; border-bottom: 2px solid #E2E8F0; padding-bottom: 5px; }
        .message { background-color: #F8FAFC; border: 1px solid #E2E8F0; padding: 10px; border-radius: 5px; margin-bottom: 12px; }
        .sender { font-weight: bold; color: #1E293B; margin-bottom: 4px; }
        .time { font-size: 8pt; color: #64748B; margin-top: 4px; }
      </style>
      </head>
      <body>
        <h1>${isKannada ? "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ - ಎಐ ಸಂಭಾಷಣೆ ವರದಿ" : "Karnataka State Police - AI Intelligence Report"}</h1>
        <p><strong>${isKannada ? "ದಿನಾಂಕ:" : "Date:"}</strong> ${new Date().toLocaleString()}</p>
        <hr/>
        ${messages.map(m => `
          <div class="message">
            <div class="sender">${m.sender === "user" ? (isKannada ? "ಅಧಿಕಾರಿ / ಬಳಕೆದಾರ" : "Officer / User") : (isKannada ? "ಎಐ ಸಹಾಯಕ" : "AI Assistant")}</div>
            <div>${m.text.replace(/\n/g, "<br/>")}</div>
            <div class="time">${m.timestamp}</div>
          </div>
        `).join("")}
      </body>
      </html>
    `
    const blob = new Blob(['\ufeff' + htmlDoc], { type: "application/msword;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ksp_ai_dossier_${isKannada ? "kn" : "en"}_${Date.now()}.docx`
    a.click()
    URL.revokeObjectURL(url)
    setIsDropdownOpen(false)
  }

  const handleDownloadPdf = () => {
    const doc = new jsPDF()
    const titleText = isKannada ? "Karnataka State Police - AI Dossier" : "Karnataka State Police - AI Dossier"
    
    doc.setFontSize(16)
    doc.setTextColor(37, 99, 235)
    doc.text(titleText, 15, 18)
    
    doc.setFontSize(10)
    doc.setTextColor(100, 116, 139)
    doc.text(`Generated: ${new Date().toLocaleString()}`, 15, 25)
    doc.line(15, 28, 195, 28)

    let y = 35
    messages.forEach(m => {
      if (y > 270) {
        doc.addPage()
        y = 20
      }
      doc.setFontSize(11)
      doc.setTextColor(31, 41, 55)
      const senderText = m.sender === "user" ? "[Officer Input]:" : "[AI Intelligence Response]:"
      doc.text(senderText, 15, y)
      y += 6

      doc.setFontSize(9)
      doc.setTextColor(71, 85, 105)
      const splitLines = doc.splitTextToSize(m.text, 175)
      doc.text(splitLines, 15, y)
      y += (splitLines.length * 5) + 6
    })

    doc.save(`ksp_ai_conversation_${isKannada ? "kn" : "en"}_${Date.now()}.pdf`)
    setIsDropdownOpen(false)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex items-center gap-2 relative shrink-0">
      {/* Print Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrint}
        className="h-8 border-[#E2E8F0] bg-white text-[#1E293B] hover:bg-[#F8FAFC] text-xs font-semibold gap-1.5 cursor-pointer shadow-2xs"
      >
        <Printer className="h-3.5 w-3.5 text-[#2563EB]" />
        <span>{isKannada ? "ಪ್ರಿಂಟ್" : "Print"}</span>
      </Button>

      {/* Download Dropdown */}
      <div className="relative">
        <Button
          size="sm"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="h-8 bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-xs font-semibold gap-1.5 cursor-pointer shadow-2xs"
        >
          <Download className="h-3.5 w-3.5" />
          <span>{isKannada ? "ಡೌನ್‌ಲೋಡ್" : "Download"}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-1 w-44 rounded-lg bg-white border border-[#E2E8F0] shadow-lg p-1 z-50 animate-in fade-in-50 text-xs font-sans">
            <button
              onClick={handleDownloadPdf}
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-[#1E293B] hover:bg-[#F8FAFC] rounded-md transition-colors font-medium"
            >
              <FileText className="h-3.5 w-3.5 text-red-600" />
              <span>PDF Document (.pdf)</span>
            </button>
            <button
              onClick={handleDownloadDocx}
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-[#1E293B] hover:bg-[#F8FAFC] rounded-md transition-colors font-medium"
            >
              <FileCode className="h-3.5 w-3.5 text-blue-600" />
              <span>Word Dossier (.docx)</span>
            </button>
            <button
              onClick={handleDownloadTxt}
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-[#1E293B] hover:bg-[#F8FAFC] rounded-md transition-colors font-medium"
            >
              <FileText className="h-3.5 w-3.5 text-slate-600" />
              <span>Text File (.txt)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
