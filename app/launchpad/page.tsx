"use client"
import {
  BarChart2,
  Megaphone,
  PieChart,
  MessageSquare,
  BotIcon as Robot,
  Mail,
  MessageCircle,
  Phone,
  Book,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"

const actions = [
  {
    icon: BarChart2,
    title: "View Your Dashboard",
    href: "/dashboard",
    description: "Monitor your campaign performance",
  },
  {
    icon: Megaphone,
    title: "Manage Your Campaigns",
    href: "/campaigns",
    description: "Create, edit, and track your campaigns",
  },
  {
    icon: PieChart,
    title: "Analyze Sales Pipeline",
    href: "/sales-pipeline",
    description: "Track your sales progress",
  },
  {
    icon: MessageSquare,
    title: "View Conversations",
    href: "/conversations",
    description: "Manage your conversations",
  },
  {
    icon: Robot,
    title: "Configure AI Agents",
    href: "/ai-agents",
    description: "Customize your AI agents",
  },
  {
    icon: Mail,
    title: "Connect Email Accounts",
    href: "/email",
    description: "Link your email accounts",
  },
  {
    icon: MessageCircle,
    title: "Manage SMS",
    href: "/sms",
    description: "Send and receive SMS messages",
  },
  {
    icon: Phone,
    title: "Manage Phone Numbers",
    href: "/phone",
    description: "Manage your phone numbers",
  },
  {
    icon: Book,
    title: "Build Knowledge Base",
    href: "/knowledge-base",
    description: "Create your knowledge base",
  },
]

export default function LaunchpadPage() {
  return (
    <div className="min-h-[calc(100vh-1px)] w-full bg-gradient-to-br from-[#09090b] via-[#1a1a1a] to-[#2a2a2a] flex items-center">
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl bg-clip-text"
          >
            Set Up for Success in 15 Minutes!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-[#c6c6c6] md:text-xl"
          >
            Get everything ready in just 15 minutes and unlock your full potential
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {actions.map((action, index) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={action.href}>
                <Card
                  className={cn(
                    "bg-white/5 border border-white/10 transition-all duration-200 hover:border-white/20 hover:shadow-lg hover:scale-[1.02] group relative overflow-hidden rounded-xl",
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/15 transition-colors mb-4">
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-white mb-2">{action.title}</CardTitle>
                      <CardDescription className="text-sm text-[#e7e7e7]">{action.description}</CardDescription>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500" />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

