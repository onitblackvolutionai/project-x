"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Settings, Bell, Palette, Users, CreditCard, Bot, Shield, Webhook, Building2, HelpCircle } from "lucide-react"

const settingsNav = [
  {
    title: "Account",
    items: [
      {
        title: "General Settings",
        href: "/settings",
        icon: Settings,
      },
      {
        title: "Appearance",
        href: "/settings/appearance",
        icon: Palette,
      },
      {
        title: "Notifications",
        href: "/settings/notifications",
        icon: Bell,
      },
    ],
  },
  {
    title: "Team",
    items: [
      {
        title: "Members",
        href: "/settings/team",
        icon: Users,
      },
      {
        title: "Billing",
        href: "/settings/billing",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "AI Configuration",
    items: [
      {
        title: "AI Agents",
        href: "/settings/ai-agents",
        icon: Bot,
      },
    ],
  },
  {
    title: "Platform",
    items: [
      {
        title: "White Label",
        href: "/settings/white-label",
        icon: Building2,
      },
      {
        title: "Security",
        href: "/settings/security",
        icon: Shield,
      },
      {
        title: "Integrations",
        href: "/settings/integrations",
        icon: Webhook,
      },
      {
        title: "Support",
        href: "/settings/support",
        icon: HelpCircle,
      },
    ],
  },
]

export function SettingsNav() {
  const pathname = usePathname()

  return (
    <nav className="h-full overflow-y-auto p-6">
      <div className="space-y-6">
        {settingsNav.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">{section.title}</h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-lg px-3 py-2 text-sm font-medium",
                    pathname === item.href
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  <span>{item.title}</span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 h-full w-1 bg-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  )
}

