import { useCallback, useState } from "react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

export function usePdfExport() {
  const [isExporting, setIsExporting] = useState(false)

  const exportElementToPdf = useCallback(async (element: HTMLElement, filename = "document.pdf") => {
    setIsExporting(true)
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pdfWidth
      const imgHeight = (canvas.height * pdfWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight

      while (heightLeft > 0) {
        position -= pdfHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pdfHeight
      }

      pdf.save(filename)
    } finally {
      setIsExporting(false)
    }
  }, [])

  return { exportElementToPdf, isExporting }
}
