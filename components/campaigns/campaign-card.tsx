"use client"
import { Mail, Phone, MoreVertical, Trash, Pencil, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { ViewCampaignDialog } from "@/components/campaigns/view-campaign-dialog"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"

interface CampaignCardProps {
  name: string
  description: string
  channels: Array<"email" | "phone">
  onDelete: () => void
  onEdit: () => void
  id: string
  status: "active" | "paused" | "draft"
  createdAt: Date
}

export function CampaignCard({
  name,
  description,
  channels,
  onDelete,
  onEdit,
  id,
  status,
  createdAt,
}: CampaignCardProps) {
  const [showViewDialog, setShowViewDialog] = useState(false)
  const router = useRouter()
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true })

  return (
    <>
      <div className="p-6 rounded-2xl border border-white/20 bg-[#1C1C1C] relative group transition-all duration-200 hover:border-white/30">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h2 className="text-2xl font-medium text-white">{name}</h2>
            <p className="text-gray-400 max-w-xl">{description}</p>
            <div className="flex gap-2">
              {channels.includes("email") && <Mail className="w-5 h-5 text-gray-400" />}
              {channels.includes("phone") && <Phone className="w-5 h-5 text-gray-400" />}
            </div>
          </div>
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4 text-white/60 hover:text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#2b2b2b] border-[#414141]">
                <DropdownMenuItem onClick={onEdit} className="text-white focus:bg-white/10">
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/campaigns/${id}/edit`)}
                  className="text-white focus:bg-white/10"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  <span>View</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Last updated {timeAgo}</p>
      </div>
      <ViewCampaignDialog
        isOpen={showViewDialog}
        onClose={() => setShowViewDialog(false)}
        campaign={{ id, name, description }}
      />
    </>
  )
}

