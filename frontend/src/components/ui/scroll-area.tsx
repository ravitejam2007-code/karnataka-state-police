import * as React from "react"

export function ScrollArea({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`overflow-auto custom-scrollbar ${className || ''}`}>
      {children}
    </div>
  )
}
