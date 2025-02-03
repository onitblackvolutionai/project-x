"use client"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { SettingsProvider } from "@/components/providers/settings-provider"
import "@/styles/globals.css"
import { CenteredToast } from "@/components/ui/centered-toast"
import type React from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { useSettings } from "@/store/settings-store"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

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

function DarkModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-20 z-50"
    >
      {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isSettingsPage = pathname.startsWith("/settings")
  const settings = useSettings()
  const currentWorkspace = settings.workspaces[settings.currentWorkspace]

  return (
    <html lang="en" className={`${currentWorkspace.whiteLabelSettings.font}`}>
      <head>
        <title>{currentWorkspace.whiteLabelSettings.companyName || "Closi"}</title>
        <link rel="icon" href={currentWorkspace.whiteLabelSettings.favicon || "/favicon.ico"} />
        <style>{`
          :root {
            --primary-color: ${currentWorkspace.whiteLabelSettings.primaryColor};
            --secondary-color: ${currentWorkspace.whiteLabelSettings.secondaryColor};
            --accent-color: ${currentWorkspace.whiteLabelSettings.accentColor};
          }
        `}</style>
      </head>
      <body className="min-h-screen bg-background">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SettingsProvider>
            <SidebarProvider>
              <div className="flex min-h-screen">
                {!isSettingsPage && (
                  <>
                    <AppSidebar />
                    <SidebarAwareContent>{children}</SidebarAwareContent>
                  </>
                )}
                {isSettingsPage && children}
              </div>
              <DarkModeToggle />
            </SidebarProvider>
          </SettingsProvider>
        </ThemeProvider>
        <CenteredToast />
      </body>
    </html>
  )
}



import './globals.css'