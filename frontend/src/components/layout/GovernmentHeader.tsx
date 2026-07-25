import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Bell, Search, LogOut, Menu, PlusCircle, Settings, ChevronDown, CheckCheck, ExternalLink, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { useNotificationStore } from "@/store/useNotificationStore"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import karnatakaEmblem from "@/assets/karnataka-emblem.png"

interface GovernmentHeaderProps {
  onMenuClick?: () => void
}

export function GovernmentHeader({ onMenuClick }: GovernmentHeaderProps) {
  const { user, logout } = useAuthStore()
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const notifDropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  // Close dropdowns on click outside & Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false)
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsProfileOpen(false)
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const getInitials = (name: string) => {
    if (!name) return "KSP"
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full h-[72px] border-b border-[#E5E7EB] bg-white text-[#111827] font-sans shadow-2xs">
      <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 gap-3">
        
        {/* Branding Area */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#111827] hover:bg-[#F3F4F6] shrink-0 cursor-pointer h-10 w-10 rounded-xl"
            onClick={onMenuClick}
            aria-label="Toggle Menu"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t("header.toggleMenu")}</span>
          </Button>

          <div className="p-1 bg-white rounded-lg border border-[#E5E7EB] shrink-0">
            <img
              src={karnatakaEmblem}
              alt="Karnataka State Police Emblem"
              className="h-8 w-auto object-contain shrink-0"
            />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-[9px] font-bold tracking-wider text-[#6B7280] uppercase leading-none">
              {t("header.governmentOfKarnataka")}
            </span>
            <h1 className="text-sm font-bold tracking-tight text-[#111827] leading-tight">{t("header.ksp")}</h1>
            <span className="text-[9px] text-[#6B7280] font-medium hidden sm:inline-block leading-tight">
              {t("header.scrb")}
            </span>
          </div>
        </div>

        {/* Dominant Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <button
            onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
            className="w-full h-10 bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#6B7280] transition-colors flex items-center gap-2 px-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#111827] text-xs font-medium cursor-pointer shadow-2xs"
          >
            <Search className="h-4 w-4 shrink-0 text-[#6B7280]" />
            <span className="flex-1 text-left truncate">Search FIRs, Cases, Criminals...</span>
            <kbd className="hidden lg:inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-white px-2 py-0.5 font-mono text-[10px] font-semibold text-[#6B7280]">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            className="hidden xl:flex items-center gap-2 bg-[#111827] hover:bg-[#1F2937] text-white font-semibold shadow-2xs text-xs h-10 px-4 rounded-xl cursor-pointer"
            onClick={() => navigate("/app/investigation")}
          >
            <PlusCircle className="h-4 w-4" />
            <span>{t("header.newInvestigation")}</span>
          </Button>

          <LanguageSwitcher />

          {/* Notification Dropdown Container */}
          <div className="relative" ref={notifDropdownRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] h-10 w-10 rounded-xl cursor-pointer"
              aria-label="Notifications"
              aria-expanded={isNotificationsOpen}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 flex items-center justify-center text-[9px] font-bold text-white bg-[#111827] rounded-full border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </Button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-[#E5E7EB] shadow-xl text-[#111827] p-3.5 z-50 animate-in fade-in-50 zoom-in-95 font-sans">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2.5 mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#111827]">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="bg-[#F3F4F6] text-[#111827] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#E5E7EB]">
                        {unreadCount} unread
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[10px] font-semibold text-[#111827] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCheck className="h-3 w-3" />
                      Mark all read
                    </button>
                  )}
                </div>

                {/* Notification List */}
                <div className="max-h-72 overflow-y-auto space-y-1.5 divide-y divide-[#F3F4F6] pr-1">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-[#6B7280]">
                      No notifications available
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markAsRead(notif.id)
                          if (notif.link) {
                            setIsNotificationsOpen(false)
                            navigate(notif.link)
                          }
                        }}
                        className={`pt-2.5 first:pt-0 pb-2 px-2.5 rounded-xl cursor-pointer transition-colors ${
                          notif.read ? "bg-white hover:bg-[#F3F4F6]" : "bg-[#F8FAFC] border border-[#E5E7EB] hover:bg-[#F3F4F6]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            {!notif.read && (
                              <span className="h-2 w-2 rounded-full bg-[#111827] shrink-0" />
                            )}
                            <h4 className="text-xs font-bold text-[#111827] leading-tight">
                              {notif.title}
                            </h4>
                          </div>
                          <span className="text-[9px] text-[#6B7280] whitespace-nowrap font-mono">
                            {notif.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#475569] mt-1 leading-snug">
                          {notif.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Action */}
                <div className="border-t border-[#E5E7EB] pt-2.5 mt-2 flex justify-center">
                  <button
                    onClick={() => {
                      setIsNotificationsOpen(false)
                      navigate("/app/dashboard")
                    }}
                    className="text-xs font-semibold text-[#111827] hover:underline transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    View Command Activity <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-[#E5E7EB] mx-1" />

          {/* Profile Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#F3F4F6] transition-colors focus:outline-none cursor-pointer group"
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-9 w-9 rounded-full object-cover border border-[#E5E7EB] shadow-2xs shrink-0" 
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-[#111827] text-white font-bold text-xs flex items-center justify-center border border-white shrink-0">
                  {getInitials(user?.name || "Officer")}
                </div>
              )}
              <div className="hidden sm:block text-left leading-tight max-w-[130px]">
                <span className="text-xs font-bold leading-tight block truncate text-[#111827]">{user?.name || "User"}</span>
                <span className="text-[10px] text-[#6B7280] leading-tight block truncate">{user?.role || "Citizen"}</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-[#6B7280] group-hover:text-[#111827] transition-transform" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#E5E7EB] shadow-xl text-[#111827] p-3 z-50 animate-in fade-in-50 zoom-in-95 font-sans">
                {/* Header Profile Info */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] mb-2.5">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="h-10 w-10 rounded-full object-cover border border-[#E5E7EB] shrink-0" 
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-[#111827] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {getInitials(user?.name || "User")}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#111827] truncate">{user?.name || "Officer"}</div>
                    <div className="text-[10px] text-[#6B7280] truncate">{user?.email || "officer@ksp.gov.in"}</div>
                    <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.2 rounded bg-white border border-[#E5E7EB] text-[#111827]">
                      {user?.role || "Citizen"}
                    </span>
                  </div>
                </div>

                {/* Dropdown Items */}
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false)
                      navigate("/app/settings")
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#111827] hover:bg-[#F3F4F6] font-medium cursor-pointer transition-colors"
                  >
                    <User className="h-4 w-4 text-[#6B7280]" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false)
                      navigate("/app/settings")
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#111827] hover:bg-[#F3F4F6] font-medium cursor-pointer transition-colors"
                  >
                    <Settings className="h-4 w-4 text-[#6B7280]" />
                    <span>System Settings</span>
                  </button>

                  <div className="border-t border-[#E5E7EB] pt-1 mt-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false)
                        logout()
                        navigate("/auth/login")
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-semibold cursor-pointer transition-colors"
                    >
                      <LogOut className="h-4 w-4 text-red-600" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  )
}
