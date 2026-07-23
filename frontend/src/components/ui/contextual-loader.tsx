import { Loader2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ContextualLoaderProps {
  icon: LucideIcon
  message: string
}

export function ContextualLoader({ icon: Icon, message }: ContextualLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full min-h-[300px] gap-4">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        {message}
      </p>
    </div>
  )
}
