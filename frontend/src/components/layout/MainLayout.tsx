import { Suspense } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { GovernmentHeader } from "./GovernmentHeader"
import { Sidebar } from "./Sidebar"
import { ErrorBoundary } from "@/providers/ErrorBoundary"
import { Skeleton } from "@/components/ui/skeleton"
import { AnimatePresence, motion } from "framer-motion"
import { PageTransition } from "./PageTransition"
import { GovernmentFooter } from "./GovernmentFooter"
import { GlobalSearchDialog } from "./GlobalSearchDialog"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export function MainLayout() {
  const location = useLocation()
  const isAIPage = location.pathname.startsWith('/app/ai') || location.pathname.startsWith('/ai')
  const isNetworkPage = location.pathname.startsWith('/app/network') || location.pathname.startsWith('/network')
  const isEdgeToEdge = isAIPage || isNetworkPage
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Auto-close mobile sidebar drawer on route change
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K for Search
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen((open) => !open)
      }
      // Esc to close drawers/search
      if (e.key === "Escape") {
        setIsSearchOpen(false)
        setIsSidebarOpen(false)
      }
      // Ctrl + / for Help
      if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toast("Help Documentation Opened", { description: "Navigating to KPS documentation portal..." })
      }
      // Ctrl + Shift + F for Filters
      if (e.key.toLowerCase() === "f" && e.shiftKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toast.info("Global Filters Triggered", { description: "Advanced filtering mode activated." })
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="flex h-screen flex-col bg-background font-sans overflow-hidden">
      <GlobalSearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      
      <div className="shrink-0 z-40">
        <GovernmentHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out bg-card ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} shrink-0 mt-[56px] md:mt-0 h-[calc(100vh-56px)] md:h-full`}>
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden bg-muted/30">
          <ErrorBoundary>
            <Suspense fallback={
              <div className="h-full w-full p-4 md:p-8 flex flex-col gap-6 overflow-y-auto">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Skeleton className="h-32 w-full rounded-xl" />
                  <Skeleton className="h-32 w-full rounded-xl" />
                  <Skeleton className="h-32 w-full rounded-xl" />
                </div>
                <Skeleton className="flex-1 w-full rounded-xl" />
              </div>
            }>
              <div className={`h-full w-full overflow-y-auto ${!isEdgeToEdge ? 'container mx-auto p-3 sm:p-4 md:p-6 lg:p-8' : ''} flex flex-col`}>
                <AnimatePresence mode="wait">
                  <PageTransition>
                    <div className="flex-1 flex flex-col">
                      <Outlet />
                    </div>
                  </PageTransition>
                </AnimatePresence>
                {!isEdgeToEdge && <GovernmentFooter />}
              </div>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
