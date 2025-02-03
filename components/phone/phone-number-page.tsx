"use client"

import { useState } from "react"
import { Plus, Trash2, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BuyNumberDialog } from "./buy-number-dialog"
import { SIPTrunkingDialog } from "./sip-trunking-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DeleteNumberDialog } from "./delete-number-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Conversation {
  id: string
  type: "call" | "message"
  contact: string
  content: string
  timestamp: string
}

export default function PhoneNumberPage() {
  const [showBuyDialog, setShowBuyDialog] = useState(false)
  const [showSIPDialog, setShowSIPDialog] = useState(false)
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([])
  const [numberToDelete, setShowDeleteDialog] = useState<string | null>(null)
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "1", type: "call", contact: "John Doe", content: "Incoming call", timestamp: "10:30 AM" },
    { id: "2", type: "message", contact: "Jane Smith", content: "Hello, how are you?", timestamp: "11:45 AM" },
    { id: "3", type: "call", contact: "Alice Johnson", content: "Outgoing call", timestamp: "2:15 PM" },
  ])

  return (
    <div className="min-h-screen bg-[#09090B] p-6">
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-medium text-white">Phone Numbers</h1>
      </div>

      <div className="flex">
        {/* Left Section */}
        <div className="w-[300px] border-r-2 border-white/10 pr-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-white/10 text-white px-3 py-1 rounded-md text-sm">Phone Numbers</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-md border border-white/10">
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#1C1C1C] border-white/10">
                <DropdownMenuItem onClick={() => setShowBuyDialog(true)} className="text-white hover:bg-white/10">
                  Buy New Number
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowSIPDialog(true)} className="text-white hover:bg-white/10">
                  Connect via SIP trunking
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {phoneNumbers.length > 0 ? (
            <div className="space-y-2">
              {phoneNumbers.map((number) => (
                <div
                  key={number}
                  className={`p-2 rounded hover:bg-white/5 flex items-center justify-between group cursor-pointer ${selectedNumber === number ? "bg-white/10" : ""}`}
                  onClick={() => setSelectedNumber(number)}
                >
                  <span className="text-white">{number}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowDeleteDialog(number)
                    }}
                    className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white/60 mt-4">No phone numbers added</div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex-1 pl-6">
          {selectedNumber ? (
            <div>
              <h2 className="text-2xl font-medium text-white mb-4">Conversations for {selectedNumber}</h2>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/5 rounded-lg p-1">
                  <TabsTrigger value="all" className="text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="calls" className="text-white">
                    Calls
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="text-white">
                    Messages
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  {renderConversations(conversations)}
                </TabsContent>
                <TabsContent value="calls" className="mt-4">
                  {renderConversations(conversations.filter((c) => c.type === "call"))}
                </TabsContent>
                <TabsContent value="messages" className="mt-4">
                  {renderConversations(conversations.filter((c) => c.type === "message"))}
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[500px]">
              <div className="text-center text-white/80 text-lg">Select a phone number to view conversations</div>
            </div>
          )}
        </div>
      </div>

      <BuyNumberDialog
        isOpen={showBuyDialog}
        onClose={() => setShowBuyDialog(false)}
        onBuy={(countryCode, areaCode) => {
          setPhoneNumbers((prev) => [...prev, `${countryCode} ${areaCode || "000"} 555-0123`])
          setShowBuyDialog(false)
        }}
      />

      <SIPTrunkingDialog
        isOpen={showSIPDialog}
        onClose={() => setShowSIPDialog(false)}
        onSave={(data) => {
          setPhoneNumbers((prev) => [...prev, data.phoneNumber])
          setShowSIPDialog(false)
        }}
      />
      <DeleteNumberDialog
        isOpen={!!numberToDelete}
        onClose={() => setShowDeleteDialog(null)}
        onConfirm={() => {
          setPhoneNumbers((prev) => prev.filter((num) => num !== numberToDelete))
          setSelectedNumber(null)
          setShowDeleteDialog(null)
        }}
      />
    </div>
  )
}

function renderConversations(conversations: Conversation[]) {
  return (
    <div className="space-y-4">
      {conversations.map((conversation) => (
        <div key={conversation.id} className="bg-white/5 rounded-lg p-4 flex items-start">
          <div className="mr-4">
            {conversation.type === "call" ? (
              <Phone className="h-6 w-6 text-blue-400" />
            ) : (
              <MessageSquare className="h-6 w-6 text-green-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-white">{conversation.contact}</span>
              <span className="text-sm text-white/60">{conversation.timestamp}</span>
            </div>
            <p className="text-white/80">{conversation.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

