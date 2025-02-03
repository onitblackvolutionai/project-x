import { SettingsNav } from "@/components/settings/settings-nav"
import { MotionConfig } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type React from "react"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen">
        <aside className="fixed left-0 top-0 z-30 h-screen w-72 border-r border-white/10 bg-black/40 backdrop-blur-xl">
          <SettingsNav />
        </aside>
        <main className="flex-1 pl-72">
          <div className="min-h-screen w-full p-8">
            <div className="mb-8">
              <Link
                href="/dashboard"
                className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </div>
            {children}
          </div>
        </main>
      </div>
    </MotionConfig>
  )
}

