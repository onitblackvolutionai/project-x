import { MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"

interface EmailAccountCardProps {
  name: string
  email: string
  stats: {
    sent: number
    opened: number
    replied: number
  }
  avatarUrl?: string
}

export function EmailAccountCard({ name, email, stats, avatarUrl }: EmailAccountCardProps) {
  const { state: sidebarState } = useSidebar()
  const cardWidth = sidebarState === "collapsed" ? "1000px" : "800px"

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg" style={{ width: cardWidth }}>
      <div className="flex items-center gap-16 pl-8 w-64">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-sm text-zinc-400">{email}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="text-center flex flex-col items-center">
          <p className="text-sm text-zinc-400">Sent</p>
          <p className="text-xl font-semibold text-white">{stats.sent}</p>
        </div>
        <div className="text-center flex flex-col items-center">
          <p className="text-sm text-zinc-400">Opened</p>
          <p className="text-xl font-semibold text-white">{stats.opened}</p>
        </div>
        <div className="text-center flex flex-col items-center">
          <p className="text-sm text-zinc-400">Replied</p>
          <p className="text-xl font-semibold text-white">{stats.replied}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-700">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Edit Account</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Remove Account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

