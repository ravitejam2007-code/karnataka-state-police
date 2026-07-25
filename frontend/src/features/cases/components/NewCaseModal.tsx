import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { X, Shield, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Case } from "../types"

const newCaseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  firNumber: z.string().min(4, "FIR Number is required (e.g. FIR/2026/1090)"),
  officer: z.string().min(3, "Assigning Officer name is required"),
  district: z.string().min(3, "District name is required"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  victims: z.string().min(2, "At least one victim name required"),
  accused: z.string().optional(),
})

type NewCaseFormData = z.infer<typeof newCaseSchema>

interface NewCaseModalProps {
  isOpen: boolean
  onClose: () => void
  onCaseCreated: (newCase: Case) => void
}

export function NewCaseModal({ isOpen, onClose, onCaseCreated }: NewCaseModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<NewCaseFormData>({
    resolver: zodResolver(newCaseSchema),
    defaultValues: {
      title: "",
      firNumber: `FIR/2026/${Math.floor(1000 + Math.random() * 9000)}`,
      officer: "PI Ramesh Kumar",
      district: "Mysuru Urban District",
      priority: "High",
      description: "",
      victims: "",
      accused: "Under Investigation",
    }
  })

  if (!isOpen) return null

  const onSubmit = (data: NewCaseFormData) => {
    setIsSubmitting(true)

    try {
      const generatedCase: Case = {
        id: `CAS-2026-${Math.floor(100 + Math.random() * 900)}`,
        firNumber: data.firNumber,
        title: data.title,
        status: "Under Investigation",
        officer: data.officer,
        district: data.district,
        victims: data.victims.split(",").map(v => v.trim()).filter(Boolean),
        accused: data.accused ? data.accused.split(",").map(a => a.trim()).filter(Boolean) : ["Unknown"],
        date: new Date().toISOString().split("T")[0],
        priority: data.priority as any,
        description: data.description,
        timeline: [
          {
            date: new Date().toISOString().split("T")[0],
            event: `FIR ${data.firNumber} formally registered in State Police Database by ${data.officer}`
          }
        ],
        evidence: [],
        photos: [],
        documents: [],
        relatedCases: [],
        investigationProgress: 10,
        notes: "Case initiated. Forensic and field teams notified."
      }

      setTimeout(() => {
        setIsSubmitting(false)
        onCaseCreated(generatedCase)
        toast.success(`Case Registered Successfully!`, {
          description: `FIR ${data.firNumber} (${data.title}) has been assigned to ${data.officer}.`
        })
        reset()
        onClose()
      }, 600)
    } catch (err) {
      console.error("New case registration error:", err)
      setIsSubmitting(false)
      toast.error("Failed to register case. Please try again.")
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in-50 font-sans">
      <div className="bg-white rounded-2xl sm:rounded-xl border border-[#E2E8F0] shadow-2xl max-w-xl w-[95vw] sm:w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 text-[#1F2937]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#0F172A] text-white shrink-0">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#1F2937]">Register New Case File</h2>
              <p className="text-[10px] sm:text-xs text-[#64748B]">State Crime Records Bureau • Official FIR Logging</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-[#64748B] hover:text-[#1F2937] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1 text-[#1F2937]">FIR Number</label>
              <Input
                {...register("firNumber")}
                className="bg-[#F8FAFC] border-[#E2E8F0] text-xs font-mono"
                placeholder="FIR/2026/1090"
              />
              {errors.firNumber && (
                <span className="text-[10px] text-red-600 mt-0.5 block flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.firNumber.message}
                </span>
              )}
            </div>

            <div>
              <label className="font-semibold block mb-1 text-[#1F2937]">Priority Level</label>
              <select
                {...register("priority")}
                className="w-full h-9 px-3 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-[#1F2937]">Case Title</label>
            <Input
              {...register("title")}
              className="bg-[#F8FAFC] border-[#E2E8F0] text-xs"
              placeholder="e.g. Armed Robbery at Commercial Bank"
            />
            {errors.title && (
              <span className="text-[10px] text-red-600 mt-0.5 block flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {errors.title.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1 text-[#1F2937]">Assigning Officer</label>
              <Input
                {...register("officer")}
                className="bg-[#F8FAFC] border-[#E2E8F0] text-xs"
                placeholder="Insp. Ramesh Kumar"
              />
              {errors.officer && (
                <span className="text-[10px] text-red-600 mt-0.5 block flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.officer.message}
                </span>
              )}
            </div>

            <div>
              <label className="font-semibold block mb-1 text-[#1F2937]">District / Station Jurisdiction</label>
              <Input
                {...register("district")}
                className="bg-[#F8FAFC] border-[#E2E8F0] text-xs"
                placeholder="Mysuru Urban District"
              />
              {errors.district && (
                <span className="text-[10px] text-red-600 mt-0.5 block flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.district.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1 text-[#1F2937]">Complainant / Victim(s)</label>
              <Input
                {...register("victims")}
                className="bg-[#F8FAFC] border-[#E2E8F0] text-xs"
                placeholder="Separated by comma (e.g. Suresh Kumar)"
              />
              {errors.victims && (
                <span className="text-[10px] text-red-600 mt-0.5 block flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.victims.message}
                </span>
              )}
            </div>

            <div>
              <label className="font-semibold block mb-1 text-[#1F2937]">Accused / Suspect(s)</label>
              <Input
                {...register("accused")}
                className="bg-[#F8FAFC] border-[#E2E8F0] text-xs"
                placeholder="Unknown / Suspect Names"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-[#1F2937]">Incident Brief Description</label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full p-2.5 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              placeholder="Provide detailed incident breakdown, stolen items, modus operandi, etc."
            />
            {errors.description && (
              <span className="text-[10px] text-red-600 mt-0.5 block flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {errors.description.message}
              </span>
            )}
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2 border-t border-[#E5E7EB] pt-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-xs font-semibold border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6] rounded-xl h-10 px-4 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#111827] hover:bg-[#1F2937] text-white text-xs font-bold px-4 h-10 rounded-xl cursor-pointer shadow-2xs"
            >
              {isSubmitting ? "Registering..." : "Create Case File"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}
