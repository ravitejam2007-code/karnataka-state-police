import * as React from "react"

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const DialogContext = React.createContext<{
  open: boolean
  onOpenChange?: (open: boolean) => void
}>({ open: false })

export function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  if (!open) return null

  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

export function DialogContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { onOpenChange } = React.useContext(DialogContext)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in-50">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
        onClick={() => onOpenChange?.(false)}
      />
      <div className={`relative z-50 w-full max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-background p-0 shadow-2xl duration-200 rounded-2xl font-sans ${className}`}>
        {children}
      </div>
    </div>
  )
}

export function DialogHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>{children}</div>
}

export function DialogTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h2>
}
