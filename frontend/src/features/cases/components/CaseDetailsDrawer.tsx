import type { Case } from "../types"
import { X, Clock, FileText, Image as ImageIcon, Users, File, Link as LinkIcon, Activity, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CaseDetailsDrawerProps {
  caseData: Case | null
  onClose: () => void
}

export function CaseDetailsDrawer({ caseData, onClose }: CaseDetailsDrawerProps) {
  if (!caseData) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-card shadow-2xl border-l flex flex-col animate-in slide-in-from-right-full duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-bold tracking-tight">{caseData.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground font-mono">{caseData.id}</span>
              <span className="text-sm text-muted-foreground">&bull;</span>
              <span className="text-sm text-muted-foreground font-mono">{caseData.firNumber}</span>
              <Badge variant="secondary" className="ml-2">{caseData.status}</Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Investigation Progress
              </h3>
              <span className="text-sm font-medium">{caseData.investigationProgress}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-in-out" 
                style={{ width: `${caseData.investigationProgress}%` }}
              />
            </div>
          </div>

          {/* Description & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Description
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-md">
                {caseData.description}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                Investigator Notes
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-md">
                {caseData.notes}
              </p>
            </div>
          </div>

          {/* People Involved */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                Victims ({caseData.victims.length})
              </h3>
              <ul className="space-y-2">
                {caseData.victims.map((v, i) => (
                  <li key={i} className="text-sm p-2 bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-md border border-blue-500/20">
                    {v}
                  </li>
                ))}
                {caseData.victims.length === 0 && <li className="text-sm text-muted-foreground">None recorded</li>}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-red-500" />
                Accused ({caseData.accused.length})
              </h3>
              <ul className="space-y-2">
                {caseData.accused.map((a, i) => (
                  <li key={i} className="text-sm p-2 bg-red-500/10 text-red-700 dark:text-red-400 rounded-md border border-red-500/20">
                    {a}
                  </li>
                ))}
                {caseData.accused.length === 0 && <li className="text-sm text-muted-foreground">Unknown</li>}
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Timeline
            </h3>
            <div className="relative border-l-2 border-muted ml-2 space-y-4 pb-4">
              {caseData.timeline.map((item, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-background border-2 border-primary rounded-full -left-[7.5px] top-1.5" />
                  <div className="text-xs font-semibold text-primary mb-1">
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted/30 p-2 rounded-md">
                    {item.event}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid for Evidences, Photos, Documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Evidence */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <File className="h-4 w-4 text-muted-foreground" />
                Evidence
              </h3>
              <div className="space-y-2">
                {caseData.evidence.map((ev, i) => (
                  <div key={i} className="flex flex-col text-sm p-2 border rounded-md">
                    <span className="font-medium">{ev.type}</span>
                    <span className="text-muted-foreground text-xs">{ev.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Documents
              </h3>
              <div className="space-y-2">
                {caseData.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between text-sm p-2 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
                    <span className="truncate mr-2 text-primary hover:underline">{doc.name}</span>
                    <span className="text-muted-foreground text-xs shrink-0">{doc.size}</span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Related Cases */}
             <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                Related Cases
              </h3>
              <div className="flex flex-wrap gap-2">
                {caseData.relatedCases.map((rc, i) => (
                  <Badge key={i} variant="outline" className="cursor-pointer hover:bg-muted">
                    {rc}
                  </Badge>
                ))}
                {caseData.relatedCases.length === 0 && (
                  <span className="text-sm text-muted-foreground">No related cases</span>
                )}
              </div>
            </div>

            {/* Photos */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                Photos
              </h3>
              {caseData.photos.length > 0 ? (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {caseData.photos.map((_, i) => (
                    <div key={i} className="h-16 w-16 bg-muted rounded-md flex-shrink-0 flex items-center justify-center border">
                      <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">No photos uploaded</span>
              )}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-muted/20 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Update Case</Button>
        </div>
      </div>
    </>
  )
}
