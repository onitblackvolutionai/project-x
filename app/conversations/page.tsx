"use client"

import { useState, useEffect } from "react"
import { ConversationList } from "@/components/conversations/conversation-list"
import { ConversationView } from "@/components/conversations/conversation-view"
import { Filter, Plus } from "lucide-react"
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
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConversationSidebar } from "@/components/conversations/conversation-sidebar"

interface Message {
  content: string
  timestamp: Date
  channel: "email" | "whatsapp" | "sms"
}

interface Conversation {
  id: number
  name: string
  avatar: string
  message: string
  time: string
  unread: boolean
  lastMessageDate?: Date
  messages: Message[]
}

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: "Vibhor Aggarwal",
    avatar: "VA",
    message: "Hi! Im waiting for you to let me",
    time: "",
    unread: true,
    lastMessageDate: undefined,
    messages: [],
  },
  {
    id: 2,
    name: "Steve Kamuni",
    avatar: "SK",
    message: "Hello Aaroh, I have joined the r",
    time: "",
    unread: true,
    lastMessageDate: undefined,
    messages: [],
  },
  {
    id: 3,
    name: "Alka Jain",
    avatar: "AJ",
    message: "★ ★ ★ ★ ★",
    time: "",
    unread: true,
    lastMessageDate: undefined,
    messages: [],
  },
  {
    id: 4,
    name: "Elfhgfd Fdv",
    avatar: "EF",
    message: "no",
    time: "",
    unread: true,
    lastMessageDate: undefined,
    messages: [],
  },
]

export default function ConversationsPage() {
  const [selectedTab, setSelectedTab] = useState("unread")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [starredContacts, setStarredContacts] = useState<Set<number>>(new Set())
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [originalOrder, setOriginalOrder] = useState<number[]>([])
  const { toast } = useToast()
  const [showConversationSidebar, setShowConversationSidebar] = useState(false)

  useEffect(() => {
    setOriginalOrder(conversations.map((conv) => conv.id))
    setSelectedConversation(conversations[0]) // Select the first conversation initially
  }, [conversations]) // Added conversations to the dependency array

  const tabs = [
    { id: "unread", label: "Unread" },
    { id: "starred", label: "Starred" },
    { id: "all", label: "All" },
  ]

  const handleSelectConversation = (id: number) => {
    const conversation = conversations.find((conv) => conv.id === id)
    if (conversation) {
      setSelectedConversation(conversation)
      setShowConversationSidebar(true) // Open sidebar when a conversation is selected
      setConversations((prevConversations) =>
        prevConversations.map((conv) => (conv.id === id ? { ...conv, unread: false } : conv)),
      )
    }
  }

  const handleStarContact = (id: number) => {
    const newStarredContacts = new Set(starredContacts)
    if (newStarredContacts.has(id)) {
      newStarredContacts.delete(id)
    } else {
      newStarredContacts.add(id)
      // Update the conversation to remove unread status when starred
      setConversations(conversations.map((conv) => (conv.id === id ? { ...conv, unread: false } : conv)))
    }
    setStarredContacts(newStarredContacts)

    // Sort conversations based on starred status and original order
    const sortedConversations = [...conversations].sort((a, b) => {
      const aStarred = newStarredContacts.has(a.id)
      const bStarred = newStarredContacts.has(b.id)
      if (aStarred === bStarred) {
        return originalOrder.indexOf(a.id) - originalOrder.indexOf(b.id)
      }
      return aStarred ? -1 : 1
    })

    setConversations(sortedConversations)

    toast({
      description: newStarredContacts.has(id) ? "Contact Starred!" : "Contact Unstarred",
      className: "bg-white text-black font-semibold",
    })
  }

  const handleDeleteContact = () => {
    const updatedConversations = conversations.filter((conv) => conv.id !== selectedConversation?.id)
    setConversations(updatedConversations)

    // Remove from starred contacts if it was starred
    if (starredContacts.has(selectedConversation?.id!)) {
      const newStarredContacts = new Set(starredContacts)
      newStarredContacts.delete(selectedConversation?.id!)
      setStarredContacts(newStarredContacts)
    }

    // Select the first remaining conversation or null if none left
    if (updatedConversations.length > 0) {
      setSelectedConversation(updatedConversations[0])
    } else {
      setSelectedConversation(null)
    }

    setShowDeleteDialog(false)
    toast({
      description: "Contact Deleted Successfully",
      className: "bg-white text-black font-semibold",
    })
  }

  const handleEditContact = () => {
    const newName = prompt("Enter new name:", selectedConversation?.name)
    const newNumber = prompt("Enter new number:")
    if (newName !== null && newNumber !== null && selectedConversation) {
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === selectedConversation.id ? { ...conv, name: newName, message: `Phone: ${newNumber}` } : conv,
        ),
      )
      setSelectedConversation((prev) => ({ ...prev, name: newName, message: `Phone: ${newNumber}` }))
      toast({
        description: "Contact updated successfully",
        className: "bg-white text-black font-semibold",
      })
    }
  }

  const updateLastMessageDate = (conversationId: number) => {
    setConversations((prevConversations) =>
      prevConversations.map((conv) => (conv.id === conversationId ? { ...conv, lastMessageDate: new Date() } : conv)),
    )
  }

  const addMessageToConversation = (conversationId: number, message: Message) => {
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessageDate: message.timestamp,
              message: `${message.channel}: ${message.content.slice(0, 30)}${message.content.length > 30 ? "..." : ""}`,
              unread: conv.id !== selectedConversation?.id,
            }
          : conv,
      ),
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel (Conversations List) */}
      <div className="w-80 border-r border-border p-4 bg-card">
        {/* Search, Filter, and Compose Buttons */}
        <div className="flex items-center space-x-2 mb-4">
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-secondary border-input text-secondary-foreground flex-1"
          />
          <Button variant="ghost" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="w-full justify-start">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex-1">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Conversation List */}
        <ConversationList
          selectedId={selectedConversation?.id}
          onSelectConversation={handleSelectConversation}
          selectedTab={selectedTab}
          starredContacts={starredContacts}
          conversations={conversations}
        />
      </div>

      {/* Center Panel (Main Conversation View) */}
      <div className="flex-1 h-full">
        {selectedConversation && (
          <ConversationView
            conversation={selectedConversation}
            expanded={false}
            showLeftSidebar={true} // Always show left sidebar
            onMessageSent={(message) => {
              addMessageToConversation(selectedConversation.id, message)
              updateLastMessageDate(selectedConversation.id)
            }}
            onStar={handleStarContact}
            onDelete={() => setShowDeleteDialog(true)}
            onEdit={handleEditContact}
            messages={selectedConversation.messages}
          />
        )}
      </div>

      {/* Right Panel (Contact Details & Actions) */}
      {showConversationSidebar && selectedConversation && (
        <ConversationSidebar conversation={selectedConversation} onClose={() => setShowConversationSidebar(false)} />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this contact? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteContact}>Delete Permanently</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

