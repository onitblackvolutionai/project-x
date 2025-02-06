"use client"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"
import { CenteredToast } from "@/components/ui/centered-toast"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <CenteredToast />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'