"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MoreVertical, Download, PlayCircle, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SelectCampaignDialog } from "./select-campaign-dialog"

interface ViewLeadListDialogProps {
  isOpen: boolean
  onClose: () => void
  leadList: {
    id: string
    name: string
  }
  onDelete: () => void
}

interface LeadData {
  name: string
  country: string
  state: string
  industry: string
  industryKeywords: string
  city: string
  createdAt: string
  relevance: string
}

export function ViewLeadListDialog({ isOpen, onClose, leadList, onDelete }: ViewLeadListDialogProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [showCampaignSelect, setShowCampaignSelect] = useState(false)

  // Sample data - in a real app, this would come from an API
  const leads: LeadData[] = Array(10).fill({
    name: "Aaroh",
    country: "India",
    state: "Rajasthan",
    industry: "AI",
    industryKeywords: "AI Sales, AI Agents",
    city: "Jaipur",
    createdAt: "10th September",
    relevance: "99%",
  })

  const handleImport = async () => {
    toast({
      title: "Import Started",
      description: "Your leads are being imported. We'll notify you when it's complete.",
    })
    // Implement import logic here
  }

  const handleUseInCampaign = () => {
    setShowCampaignSelect(true)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl p-0 bg-[#09090B] text-white">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{leadList.name}</h2>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1C1C1C] border-white/10">
                <DropdownMenuItem onClick={handleImport} className="text-white hover:bg-white/10">
                  <Download className="mr-2 h-4 w-4" />
                  Import
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleUseInCampaign} className="text-white hover:bg-white/10">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Use in Campaign
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-red-500 hover:bg-red-500/10">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="max-h-[600px] overflow-auto">
            <table className="w-full">
              <thead className="bg-[#1C1C1C] sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Country</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white/60">State</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Industry</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Industry Keywords</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white/60">City</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Created at</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Relevance</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr key={index} className="border-t border-white/10">
                    <td className="px-4 py-3 text-sm">{lead.name}</td>
                    <td className="px-4 py-3 text-sm">{lead.country}</td>
                    <td className="px-4 py-3 text-sm">{lead.state}</td>
                    <td className="px-4 py-3 text-sm">{lead.industry}</td>
                    <td className="px-4 py-3 text-sm">{lead.industryKeywords}</td>
                    <td className="px-4 py-3 text-sm">{lead.city}</td>
                    <td className="px-4 py-3 text-sm">{lead.createdAt}</td>
                    <td className="px-4 py-3 text-sm">{lead.relevance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>

      <SelectCampaignDialog
        isOpen={showCampaignSelect}
        onClose={() => setShowCampaignSelect(false)}
        leadListId={leadList.id}
      />
    </>
  )
}

