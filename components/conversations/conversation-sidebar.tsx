"use client"

import { useState } from "react"
import { Phone, Mail, ChevronDown, ChevronUp, Plus, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getInitials, getRandomColor } from "./conversation-list"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface ConversationSidebarProps {
  conversation: {
    id: number
    name: string
    avatar: string
    message: string
    time: string
    unread: boolean
  }
  onClose: () => void
}

export function ConversationSidebar({ conversation, onClose }: ConversationSidebarProps) {
  const [selectedOwner, setSelectedOwner] = useState<string | null>(null)

  const handleOwnerChange = (value: string) => {
    if (value === selectedOwner) {
      setSelectedOwner(null)
    } else {
      setSelectedOwner(value)
    }
  }

  return (
    <div className="h-full p-4 bg-card overflow-y-auto border border-white/10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div
            className="h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-semibold"
            style={{ backgroundColor: getRandomColor(conversation.name) }}
          >
            {getInitials(conversation.name)}
          </div>
          <div>
            <h2 className="font-semibold text-white">{conversation.name}</h2>
            <p className="text-sm text-muted-foreground">vibhoraggarwal.ca@gmail.com</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6 mt-8">
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center justify-between text-white">
            Contact
            <ChevronUp className="h-4 w-4" />
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-white">Email</span>
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="pl-6">
              <p className="text-sm text-muted-foreground">vibhoraggarwal.ca@gmail.com</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-white">Phone</span>
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="pl-6">
              <p className="text-sm text-muted-foreground">+91 98154 44747</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center justify-between text-white">
            Owner (Assigned to)
            <ChevronDown className="h-4 w-4" />
          </h3>
          <Select value={selectedOwner || ""} onValueChange={handleOwnerChange}>
            <SelectTrigger className="w-full bg-transparent border-white/10 text-white">
              <SelectValue placeholder="Unassigned">
                {selectedOwner ? (
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{selectedOwner}</span>
                  </div>
                ) : (
                  "Unassigned"
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Onit" className="hover:bg-purple-500 hover:text-white transition-colors">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Onit</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center justify-between text-white">
            Followers
            <ChevronDown className="h-4 w-4" />
          </h3>
          <Input placeholder="Search followers" className="h-8 bg-white/5 border-white/10 text-white" />
        </div>

        {/* Tags Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {/* Example tags - replace with actual tag data */}
            {["Important", "Follow Up", "Client"].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Active Automations Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white">Active Automations</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {/* Example automations - replace with actual automation data */}
            <li>Follow-up email sequence</li>
            <li>Appointment reminder</li>
          </ul>
        </div>

        {/* DND Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white">Do Not Disturb</h3>
          <div className="flex items-center space-x-2">
            <Switch />
            <span className="text-sm text-muted-foreground">All Communications</span>
          </div>
        </div>
      </div>
    </div>
  )
}

