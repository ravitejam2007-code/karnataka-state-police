import * as React from "react"
import { X } from "lucide-react"

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" 
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative z-50 grid w-[95vw] sm:w-full max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto gap-4 bg-background p-4 sm:p-6 shadow-2xl duration-200 rounded-2xl sm:rounded-xl font-sans">
        {children}
        <button
          onClick={() => onOpenChange?.(false)}
          className="absolute right-2.5 top-2.5 sm:right-4 sm:top-4 rounded-xl opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring p-2 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  )
}

export function DialogContent({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>
}

export function DialogHeader({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className || ''}`}>{children}</div>
}

export function DialogTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h2 className={`text-lg font-semibold leading-none tracking-tight ${className || ''}`}>{children}</h2>
}
