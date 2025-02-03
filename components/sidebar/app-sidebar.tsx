"use client"

import type * as React from "react"
import {
  Rocket,
  BarChart2,
  MessageSquare,
  Book,
  Settings,
  ChevronRight,
  Phone,
  BotIcon as Robot,
  Mail,
  MessageCircle,
  Megaphone,
  PieChart,
  ChevronLeft,
  ChevronRightIcon,
  ChevronsUpDown,
  Plus,
  Trash2,
  HelpCircle,
  Building2,
  Shield,
  Webhook,
  Users,
  Wand2,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSidebar } from "@/components/ui/sidebar"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const mainNavItems = [
  { title: "Launchpad", icon: Rocket, href: "/launchpad" },
  { title: "Dashboard", icon: BarChart2, href: "/dashboard" },
  { title: "Campaigns", icon: Megaphone, href: "/campaigns" },
]

const salesItems = [
  { title: "Sales Pipeline", icon: PieChart, href: "/sales-pipeline" },
  { title: "Conversations", icon: MessageSquare, href: "/conversations" },
]

const outreachChannels = [
  { title: "AI Voice Agents", icon: Robot, href: "/ai-agents", hasSubmenu: true },
  { title: "Email", icon: Mail, href: "/email" },
  { title: "SMS", icon: MessageCircle, href: "/sms" },
]

const resources = [
  { title: "Phone Numbers", icon: Phone, href: "/phone" },
  {
    title: "Knowledge Base",
    icon: Book,
    href: "/knowledge-base",
    options: [
      { label: "Assign a Knowledge Base", icon: Users },
      { label: "Create a Knowledge Base using AI", icon: Wand2 },
    ],
  },
]

// Settings sub-items that will be shown in the settings page sidebar
export const settingsNavItems = [
  { title: "General Settings", icon: Settings, href: "/settings" },
  { title: "White Label", icon: Building2, href: "/settings/white-label" },
  { title: "Security", icon: Shield, href: "/settings/security" },
  { title: "Integrations", icon: Webhook, href: "/settings/integrations" },
  { title: "Help Center", icon: HelpCircle, href: "/help-center" },
  { title: "Help Center Admin", icon: Settings, href: "/admin/help-center" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state: sidebarState, toggleSidebar } = useSidebar()
  const isExpanded = sidebarState !== "collapsed"
  const [currentWorkspace, setCurrentWorkspace] = useState("Workspace 1")
  const [workspaces, setWorkspaces] = useState(["Workspace 1"])
  const [workspaceToDelete, setWorkspaceToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const renderNavItem = (item: {
    title: string
    icon: React.ElementType
    href: string
    hasSubmenu?: boolean
    options?: { label: string; icon: React.ElementType }[]
  }) => (
    <TooltipProvider key={item.href}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={item.href}
            className={cn(
              "group relative flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors",
              pathname === item.href ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white",
              !isExpanded && "justify-center",
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {isExpanded && (
              <>
                <span className="ml-3">{item.title}</span>
                {item.hasSubmenu && <ChevronRight className="ml-auto h-4 w-4 text-white/40" />}
              </>
            )}
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
        </TooltipTrigger>
        {!isExpanded && <TooltipContent side="right">{item.title}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-gray-800 bg-[#1e1e1e] transition-all duration-300",
        sidebarState === "expanded" ? "w-64" : "w-20",
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between px-4">
        {isExpanded ? (
          <span className="text-xl font-bold text-white">Closi</span>
        ) : (
          <span className="text-xl font-bold text-white">C</span>
        )}
        <Button variant="ghost" size="sm" onClick={toggleSidebar} className="text-white hover:bg-white/5">
          {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Workspace Selector */}
      {isExpanded && (
        <div className="px-3 py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10">
                <span>{currentWorkspace}</span>
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-[#2b2b2b] border-[#414141]">
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  const newWorkspace = `Workspace ${workspaces.length + 1}`
                  setWorkspaces([...workspaces, newWorkspace])
                  setCurrentWorkspace(newWorkspace)
                }}
                className="text-white focus:bg-white/10"
              >
                <Plus className="mr-2 h-4 w-4" />
                <span>Create new</span>
              </DropdownMenuItem>
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace}
                  className="text-white focus:bg-white/10 flex items-center justify-between"
                >
                  <span onClick={() => setCurrentWorkspace(workspace)} className="flex-grow cursor-pointer">
                    {workspace}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setWorkspaceToDelete(workspace)
                      setIsDeleteDialogOpen(true)
                    }}
                    className="ml-2 p-0 h-auto hover:bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 text-red-500 hover:text-red-400" />
                    <span className="sr-only">Delete workspace</span>
                  </Button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
            <nav className="space-y-4">
              {/* Main Navigation */}
              <div>
                <h3
                  className={cn(
                    "mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/40",
                    !isExpanded && "sr-only",
                  )}
                >
                  Main
                </h3>
                <div className="space-y-1">{mainNavItems.map(renderNavItem)}</div>
              </div>

              {/* Sales Section */}
              <div>
                <h3
                  className={cn(
                    "mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/40",
                    !isExpanded && "sr-only",
                  )}
                >
                  Sales
                </h3>
                <div className="space-y-1">{salesItems.map(renderNavItem)}</div>
              </div>

              {/* Outreach Channels */}
              <div>
                <h3
                  className={cn(
                    "mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/40",
                    !isExpanded && "sr-only",
                  )}
                >
                  Outreach Channels
                </h3>
                <div className="space-y-1">{outreachChannels.map(renderNavItem)}</div>
              </div>

              {/* Resources */}
              <div>
                <h3
                  className={cn(
                    "mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/40",
                    !isExpanded && "sr-only",
                  )}
                >
                  Resources
                </h3>
                <div className="space-y-1">{resources.map(renderNavItem)}</div>
              </div>
            </nav>
          </div>

          {/* Settings */}
          <div className="flex-shrink-0 border-t border-white/10 px-3 py-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/settings"
                    className={cn(
                      "flex h-9 items-center rounded-lg px-3 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all",
                      pathname.startsWith("/settings") && "bg-white/10 text-white",
                      !isExpanded && "justify-center",
                    )}
                  >
                    <Settings className="h-5 w-5 flex-shrink-0" />
                    {isExpanded && <span className="ml-3">Settings</span>}
                    {pathname.startsWith("/settings") && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 h-full w-1 bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </Link>
                </TooltipTrigger>
                {!isExpanded && <TooltipContent side="right">Settings</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#2b2b2b] border-[#414141] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this workspace?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the
              {workspaceToDelete && ` "${workspaceToDelete}"`} workspace and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-600 text-white hover:bg-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (workspaceToDelete) {
                  setWorkspaces(workspaces.filter((w) => w !== workspaceToDelete))
                  if (currentWorkspace === workspaceToDelete) {
                    setCurrentWorkspace(workspaces[0])
                  }
                }
                setWorkspaceToDelete(null)
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
  )
}

