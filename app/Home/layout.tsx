"use client"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import type React from "react"

const SidebarAwareContent = ({ children }: { children: React.ReactNode }) => {
  const { state } = useSidebar()
  const pathname = usePathname()
  const isSettingsPage = pathname.startsWith("/settings")

  if (isSettingsPage) {
    return children
  }

  return (
    <main
      data-expanded={state === "expanded" && !isSettingsPage}
      className="flex-1 overflow-auto transition-all duration-300 data-[expanded=true]:pl-64 data-[expanded=false]:pl-20 relative"
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">{children}</div>
    </main>
  )
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarAwareContent>{children}</SidebarAwareContent>
      </div>
    </SidebarProvider>
  )
} 