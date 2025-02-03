"use client"

import { cn } from "@/lib/utils"
import { format } from "date-fns"

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function getRandomColor(name: string): string {
  const colors = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFC107",
    "#FF9800",
    "#FF5722",
  ]
  const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  return colors[index]
}

interface ConversationListProps {
  selectedId: number | null
  onSelectConversation: (id: number) => void
  selectedTab: string
  starredContacts: Set<number>
  conversations: Array<{
    id: number
    name: string
    avatar: string
    message: string
    time: string
    unread: boolean
    lastMessageDate?: Date
  }>
}

export function ConversationList({
  selectedId,
  onSelectConversation,
  selectedTab,
  starredContacts,
  conversations,
}: ConversationListProps) {
  const filteredConversations = conversations.filter((conversation) => {
    if (selectedTab === "starred") {
      return starredContacts.has(conversation.id)
    } else if (selectedTab === "unread") {
      return conversation.unread
    }
    return true // "all" tab
  })

  return (
    <div className="flex-1 overflow-auto">
      {filteredConversations.map((conversation) => (
        <div
          key={conversation.id}
          className={cn(
            "flex items-start gap-3 p-3 cursor-pointer transition-colors group",
            conversation.unread && "bg-accent/50",
            selectedId === conversation.id ? "bg-white text-black" : "hover:bg-[#F5F5DC] hover:text-black",
          )}
          onClick={() => onSelectConversation(conversation.id)}
        >
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            style={{ backgroundColor: getRandomColor(conversation.name) }}
          >
            {getInitials(conversation.name)}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center justify-between">
              <p className={cn("font-medium group-hover:text-black", conversation.unread && "font-bold")}>
                {conversation.name}
              </p>
              <span className="text-xs text-muted-foreground">
                {conversation.lastMessageDate ? format(conversation.lastMessageDate, "MMM dd") : conversation.time}
              </span>
            </div>
            <p className={cn("text-sm truncate", conversation.unread && "font-semibold")}>{conversation.message}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

