import { create } from "zustand"

export interface NotificationItem {
  id: string
  title: string
  message: string
  timestamp: string
  type: "alert" | "case" | "system" | "dispatch"
  read: boolean
  link?: string
}

interface NotificationState {
  notifications: NotificationItem[]
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<NotificationItem, "id" | "read" | "timestamp">) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "High Priority Alert - Mysuru Urban",
    message: "Armed robbery reported near Devaraja Sub-Division. Tactical unit dispatched.",
    timestamp: "10 mins ago",
    type: "alert",
    read: false,
    link: "/app/investigation"
  },
  {
    id: "notif-2",
    title: "FIR Update Registered",
    message: "New evidence uploaded for Case #CAS-2026-8894 (CCTV Clip #04).",
    timestamp: "45 mins ago",
    type: "case",
    read: false,
    link: "/app/cases"
  },
  {
    id: "notif-3",
    title: "AI Hotspot Forecast Generated",
    message: "Weekly crime hotspot prediction ready for Bengaluru North District.",
    timestamp: "2 hours ago",
    type: "system",
    read: false,
    link: "/app/forecast"
  },
  {
    id: "notif-4",
    title: "Shift Handover Logged",
    message: "Inspector Ramesh Kumar completed morning command dispatch check.",
    timestamp: "5 hours ago",
    type: "dispatch",
    read: true,
    link: "/app/dashboard"
  }
]

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: INITIAL_NOTIFICATIONS,
  markAsRead: (id: string) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true }))
    })),
  addNotification: (item) =>
    set((state) => ({
      notifications: [
        {
          ...item,
          id: `notif-${Date.now()}`,
          read: false,
          timestamp: "Just now"
        },
        ...state.notifications
      ]
    })),
  removeNotification: (id: string) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    })),
  clearAll: () => set({ notifications: [] })
}))
