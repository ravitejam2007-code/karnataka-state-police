import { Component, type ErrorInfo, type ReactNode } from "react"
import { ShieldAlert, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
  moduleName?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by module ErrorBoundary:", error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs text-[#1F2937] font-sans my-4 space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 text-red-700 rounded-lg shrink-0">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1F2937]">
                {this.props.moduleName || "Module"} Recovery Error Boundary
              </h3>
              <p className="text-xs text-[#64748B]">
                State Crime Records Bureau • Application Error Prevented
              </p>
            </div>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-mono text-red-600 truncate">
            {this.state.error?.message || "An unexpected system exception occurred."}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-[#E2E8F0] pt-3">
            <Button
              onClick={this.handleReset}
              className="bg-[#0F172A] hover:bg-black text-white text-xs font-bold px-4 cursor-pointer gap-2"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reload Module
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
