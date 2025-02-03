"use client"

import { Fragment, useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Paperclip,
  Send,
  ImageIcon,
  FileText,
  Link2,
  Music,
  Video,
  Upload,
  X,
  MoreHorizontal,
  Star,
  MessageSquare,
  PhoneIcon,
  MailIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EmojiPicker } from "./emoji-picker"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Country } from "react-phone-number-input"
import { countries } from "@/lib/countries"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
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
import { ScrollArea } from "@/components/ui/scroll-area"

const getPhoneNumberFormat = (countryCode: string) => {
  switch (countryCode) {
    case "US":
    case "CA":
      return "(XXX) XXX-XXXX"
    case "GB":
      return "XXXX XXXXXX"
    case "IN":
      return "XXXXX XXXXX"
    // Add more country-specific formats as needed
    default:
      return "XXXXXXXXXX" // Default format
  }
}

const formatPhoneNumber = (input: string, format: string) => {
  let formatted = ""
  let inputIndex = 0

  for (let i = 0; i < format.length; i++) {
    if (inputIndex >= input.length) break

    if (format[i] === "X") {
      formatted += input[inputIndex]
      inputIndex++
    } else {
      formatted += format[i]
    }
  }

  return formatted
}

interface Message {
  id: string
  content: string
  sender: "user" | "other"
  timestamp: Date
  channel: "email" | "whatsapp" | "sms"
  editedAt?: Date
  deletedForSelf?: boolean
}

interface ConversationViewProps {
  conversation: {
    id: number
    name: string
    avatar: string
    message: string
    time: string
    unread: boolean
    lastMessageDate?: Date
  }
  expanded: boolean
  showLeftSidebar: boolean
  onMessageSent: (message: Message) => void
  messages: Message[]
  onStar: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

const getRandomColor = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = "#"
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += ("00" + value.toString(16)).substr(-2)
  }
  return color
}

const getInitials = (name: string) => {
  const names = name.split(" ")
  return names.map((n) => n.charAt(0).toUpperCase()).join("")
}

const starredContacts = new Set<number>() // Placeholder for starred contacts

export function ConversationView({
  conversation,
  expanded,
  showLeftSidebar,
  onMessageSent,
  messages: initialMessages,
  onStar,
  onDelete,
  onEdit,
}: ConversationViewProps) {
  const [message, setMessage] = useState("")
  const [fromName, setFromName] = useState("onit tindwani")
  const [fromEmail, setFromEmail] = useState("onittindwani123@gmail.com")
  const [to, setTo] = useState(`${conversation.name} (Primary)`)
  const [cc, setCc] = useState("")
  const [bcc, setBcc] = useState("")
  const [subject, setSubject] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [showAlignmentDropdown, setShowAlignmentDropdown] = useState(false)
  const [textAlignment, setTextAlignment] = useState<"left" | "center" | "right" | "justify">("left")
  const { toast } = useToast()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedFileType, setSelectedFileType] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [linkInput, setLinkInput] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTab, setSelectedTab] = useState("email")
  const [emailMessages, setEmailMessages] = useState<Message[]>([])
  const [whatsappMessages, setWhatsappMessages] = useState<Message[]>([])
  const [smsMessages, setSmsMessages] = useState<Message[]>([])
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [fromCountry, setFromCountry] = useState<Country>("US")
  const [toCountry, setToCountry] = useState<Country>("US")
  const [fromNumber, setFromNumber] = useState("")
  const [toNumber, setToNumber] = useState("")
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null)
  const [deleteForEveryone, setDeleteForEveryone] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailTo, setEmailTo] = useState("")
  const [emailCc, setEmailCc] = useState("")
  const [emailBcc, setEmailBcc] = useState("")
  const [textareaHeight, setTextareaHeight] = useState<string>("auto")
  const [messages, setMessages] = useState<Message[]>([])
  const [activeChannel, setActiveChannel] = useState<"email" | "whatsapp" | "sms">("email")
  const [isConversationStarred, setIsConversationStarred] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    const sortedMessages = initialMessages.reduce(
      (acc, msg) => {
        switch (msg.channel) {
          case "email":
            acc.email.push(msg)
            break
          case "whatsapp":
            acc.whatsapp.push(msg)
            break
          case "sms":
            acc.sms.push(msg)
            break
        }
        return acc
      },
      { email: [], whatsapp: [], sms: [] } as Record<string, Message[]>,
    )

    setEmailMessages(sortedMessages.email)
    setWhatsappMessages(sortedMessages.whatsapp)
    setSmsMessages(sortedMessages.sms)
  }, [initialMessages])

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }, [messageContainerRef])

  useEffect(() => {
    // Set initial active channel based on conversation.message
    const channelMatch = conversation.message.match(/^(email|whatsapp|sms):/i)
    if (channelMatch) {
      setActiveChannel(channelMatch[1].toLowerCase() as "email" | "whatsapp" | "sms")
    }

    setIsConversationStarred(starredContacts.has(conversation.id))
  }, [conversation, starredContacts])

  useEffect(() => {
    // Filter messages based on activeChannel
    setMessages(
      initialMessages.filter((msg) => {
        return msg.channel === activeChannel
      }),
    )
  }, [initialMessages, activeChannel])

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value
    setMessage(newMessage)
    setWordCount(newMessage.trim().split(/\s+/).filter(Boolean).length)
    setCharCount(newMessage.length)
    setTextareaHeight("auto") // Reset height to auto before recalculating
    setTimeout(() => {
      if (textareaRef.current) {
        setTextareaHeight(`${textareaRef.current.scrollHeight}px`)
      }
    }, 0) // Recalculate height after render
  }

  const handleSendMessage = () => {
    // Check required fields based on selected tab
    if (activeChannel === "email") {
      if (!fromEmail || !emailTo || !emailSubject || !message) {
        toast({
          description: "Please fill in all required fields (From Email, To Email, Subject, and Message)",
          className: "bg-white text-black font-semibold",
        })
        return
      }
    } else if (activeChannel === "whatsapp" || activeChannel === "sms") {
      if (!fromNumber || !toNumber || !message) {
        toast({
          description: "Please fill in all required fields (From Number, To Number, and Message)",
          className: "bg-white text-black font-semibold",
        })
        return
      }
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
      channel: activeChannel,
    }

    switch (activeChannel) {
      case "email":
        setEmailMessages((prev) => [...prev, newMessage])
        break
      case "whatsapp":
        setWhatsappMessages((prev) => [...prev, newMessage])
        break
      case "sms":
        setSmsMessages((prev) => [...prev, newMessage])
        break
    }

    setMessage("")
    setEmailSubject("")
    setEmailTo("")
    setEmailCc("")
    setEmailBcc("")
    setWordCount(0)
    setCharCount(0)

    // Call onMessageSent to update the last message date and add the message to the conversation
    onMessageSent(newMessage)

    toast({
      description: `Sent via ${activeChannel.charAt(0).toUpperCase() + activeChannel.slice(1)}`,
      className: "bg-white text-black font-semibold",
    })
  }

  const handleFileSelect = (type: string) => {
    if (type === "link") {
      setShowLinkInput(true)
    } else {
      setSelectedFileType(type)
      if (fileInputRef.current) {
        fileInputRef.current.accept = getAcceptedFileTypes(type)
        fileInputRef.current.click()
      }
    }
  }

  const getAcceptedFileTypes = (type: string) => {
    switch (type) {
      case "image":
        return "image/*"
      case "document":
        return ".pdf,.doc,.docx,.txt"
      case "audio":
        return "audio/*"
      case "video":
        return "video/*"
      default:
        return "*/*"
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      toast({
        description: `${file.name} selected`,
        className: "bg-white text-black font-semibold",
      })
    }
  }

  const handleSaveLink = () => {
    if (linkInput) {
      const newMessage = message.slice(0, message.length) + linkInput + message.slice(message.length)
      setMessage(newMessage)
      setLinkInput("")
      setShowLinkInput(false)
      toast({
        description: "Link added to message",
        className: "bg-white text-black font-semibold",
      })
    }
  }

  const handleEmojiSelect = (emoji: any) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart
      const end = textareaRef.current.selectionEnd
      const newMessage = message.substring(0, start) + emoji.native + message.substring(end)

      setMessage(newMessage)
      setTextareaHeight("auto") // Reset height when adding emoji
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(start + emoji.native.length, start + emoji.native.length)
          textareaRef.current.focus()
          setTextareaHeight(`${textareaRef.current.scrollHeight}px`) // Recalculate height
        }
      }, 0)
    }
  }

  const handlePhoneNumberChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    country: Country,
  ) => {
    const format = getPhoneNumberFormat(country)
    const formatted = formatPhoneNumber(value.replace(/\D/g, ""), format)
    setter(formatted)
  }

  const handleEditMessage = (messageId: string, content: string) => {
    setEditingMessageId(messageId)
    setEditedContent(content)
  }

  const handleSaveEdit = (messageId: string) => {
    const updateMessages = (messages: Message[]) =>
      messages.map((msg) => (msg.id === messageId ? { ...msg, content: editedContent, editedAt: new Date() } : msg))

    switch (activeChannel) {
      case "email":
        setEmailMessages(updateMessages)
        break
      case "whatsapp":
        setWhatsappMessages(updateMessages)
        break
      case "sms":
        setSmsMessages(updateMessages)
        break
    }

    setEditingMessageId(null)
    setEditedContent("")
  }

  const handleDeleteMessage = (messageId: string, forEveryone: boolean) => {
    const deleteMessage = (messages: Message[]) =>
      forEveryone
        ? messages.filter((msg) => msg.id !== messageId)
        : messages.map((msg) => (msg.id === messageId ? { ...msg, deletedForSelf: true } : msg))

    switch (activeChannel) {
      case "email":
        setEmailMessages(deleteMessage)
        break
      case "whatsapp":
        setWhatsappMessages(deleteMessage)
        break
      case "sms":
        setSmsMessages(deleteMessage)
        break
    }

    setDeletingMessageId(null)
    setDeleteForEveryone(false)
  }

  const handleEditContact = () => {
    // Implement the edit functionality here
    const newName = prompt("Enter new name:", conversation.name)
    const newNumber = prompt("Enter new number:")
    if (newName !== null && newNumber !== null) {
      // Update the conversation object with new name and number
      // This is a placeholder. In a real application, you'd update the state and possibly make an API call
      console.log(`Updating contact: Name - ${newName}, Number - ${newNumber}`)
      toast({
        description: "Contact updated successfully",
        className: "bg-white text-black font-semibold",
      })
    }
  }

  const handleChannelChange = (channel: "email" | "whatsapp" | "sms") => {
    setActiveChannel(channel)

    // Clear input fields when switching channels
    setMessage("")
    setEmailSubject("")
    setEmailTo("")
    setEmailCc("")
    setEmailBcc("")
    setFromNumber("")
    setToNumber("")
    setWordCount(0)
    setCharCount(0)
  }

  const handleToggleStar = () => {
    onStar(conversation.id)
    setIsConversationStarred(!isConversationStarred)
  }

  const handleDeleteConversation = () => {
    onDelete(conversation.id)
    setShowDeleteDialog(false)
  }

  const handleEditConversation = () => {
    onEdit(conversation.id)
  }

  const renderMessageContent = (message: Message) => {
    if (message.channel === "email" && message.content.includes("<a href")) {
      // Render email with hyperlink
      return (
        <div
          className="max-w-[80%] rounded-lg px-4 py-2 bg-blue-100 text-blue-900"
          dangerouslySetInnerHTML={{ __html: message.content }}
        />
      )
    } else if (message.deletedForSelf) {
      // Render deleted message
      return (
        <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted text-muted-foreground opacity-50">
          <span>This message was deleted</span>
        </div>
      )
    } else {
      // Render regular message
      return <div className="max-w-[80%] rounded-lg px-4 py-2 bg-white text-black">{message.content}</div>
    }
  }

  const onClose = () => {
    setShowDeleteDialog(false)
  }

  return (
    <div
      className={cn(
        "flex-1 flex flex-col justify-between bg-background h-full relative",
        expanded ? "fixed inset-0 z-30" : "relative",
        !showLeftSidebar && "ml-0 w-full",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div className="flex items-center space-x-4">
          <div
            className="h-12 w-12 rounded-full flex items-center justify-center text-white text-xl font-semibold"
            style={{ backgroundColor: getRandomColor(conversation.name) }}
          >
            {getInitials(conversation.name)}
          </div>
          <h2 className="text-xl font-semibold text-white">{conversation.name}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleToggleStar}>
            <Star className="h-5 w-5" color={isConversationStarred ? "gold" : "white"} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black text-white border-white/10">
              <DropdownMenuItem onClick={handleEditConversation}>Edit Contact</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>Delete Contact</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Message History */}
      <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={messageContainerRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <Fragment key={message.id}>
              <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} group relative`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  } relative`}
                >
                  {renderMessageContent(message)}
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">{format(message.timestamp, "HH:mm")}</span>
                    {message.editedAt && <span className="text-xs text-gray-500 italic">Edited</span>}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white rounded-full p-1 hover:bg-black hover:text-white"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-black text-white border-white/10">
                      <DropdownMenuItem
                        onClick={() => handleEditMessage(message.id, message.content)}
                        className="hover:bg-white/10"
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDeletingMessageId(message.id)} className="hover:bg-white/10">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input and Controls */}
      <div className="border-t border-white/10 p-4 space-y-4 bg-background sticky bottom-0">
        <Tabs defaultValue={activeChannel} className="w-full" onValueChange={handleChannelChange}>
          <TabsList className="w-full justify-start bg-transparent">
            <TabsTrigger value="email">
              <MailIcon className="h-4 w-4 mr-2" /> Email
            </TabsTrigger>
            <TabsTrigger value="whatsapp">
              <MessageSquare className="h-4 w-4 mr-2" /> WhatsApp
            </TabsTrigger>
            <TabsTrigger value="sms">
              <PhoneIcon className="h-4 w-4 mr-2" /> SMS
            </TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                  <label className="min-w-[100px] text-sm font-medium text-white">From Name:</label>
                  <Input
                    className="flex-1 bg-white border-[#333] text-black"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder="Enter name"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="min-w-[100px] text-sm font-medium text-white">From email:</label>
                  <Input
                    className="flex-1 bg-white border-[#333] text-black"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-4">
                  <label className="min-w-[30px] text-sm font-medium text-white">To:</label>
                  <Input
                    className="flex-1 bg-white border-[#333] text-black"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="min-w-[30px] text-sm font-medium text-white">CC:</label>
                  <Input
                    className="flex-1 bg-white border-[#333] text-black"
                    value={emailCc}
                    onChange={(e) => setEmailCc(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="min-w-[30px] text-sm font-medium text-white">BCC:</label>
                  <Input
                    className="flex-1 bg-white border-[#333] text-black"
                    value={emailBcc}
                    onChange={(e) => setEmailBcc(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="min-w-[60px] text-sm font-medium text-white">Subject:</label>
                <Input
                  className="flex-1 bg-white border-[#333] text-black"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  required
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="whatsapp">
            <div className={cn("grid gap-4", showLeftSidebar ? "grid-cols-1" : "grid-cols-2")}>
              <div className="flex items-center gap-4">
                <label className="min-w-[100px] text-sm font-medium text-white">From:</label>
                <div className="flex-1 flex gap-2">
                  <Select value={fromCountry} onValueChange={(value) => setFromCountry(value as Country)}>
                    <SelectTrigger className="w-[130px] bg-white text-black">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto custom-scrollbar">
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex justify-between items-center w-full">
                            <span>{country.name}</span>
                            <span className="text-gray-500">+{country.dial_code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    placeholder={getPhoneNumberFormat(fromCountry)}
                    value={fromNumber}
                    onChange={(e) => handlePhoneNumberChange(e.target.value, setFromNumber, fromCountry)}
                    className="flex-1 bg-white text-black"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="min-w-[100px] text-sm font-medium text-white">To:</label>
                <div className="flex-1 flex gap-2">
                  <Select value={toCountry} onValueChange={(value) => setToCountry(value as Country)}>
                    <SelectTrigger className="w-[130px] bg-white text-black">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto custom-scrollbar">
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex justify-between items-center w-full">
                            <span>{country.name}</span>
                            <span className="text-gray-500">+{country.dial_code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    placeholder={getPhoneNumberFormat(toCountry)}
                    value={toNumber}
                    onChange={(e) => handlePhoneNumberChange(e.target.value, setToNumber, toCountry)}
                    className="flex-1 bg-white text-black"
                    required
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="sms">
            <div className={cn("grid gap-4", showLeftSidebar ? "grid-cols-1" : "grid-cols-2")}>
              <div className="flex items-center gap-4">
                <label className="min-w-[100px] text-sm font-medium text-white">From:</label>
                <div className="flex-1 flex gap-2">
                  <Select value={fromCountry} onValueChange={(value) => setFromCountry(value as Country)}>
                    <SelectTrigger className="w-[130px] bg-white text-black">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto custom-scrollbar">
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex justify-between items-center w-full">
                            <span>{country.name}</span>
                            <span className="text-gray-500">+{country.dial_code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    placeholder={getPhoneNumberFormat(fromCountry)}
                    value={fromNumber}
                    onChange={(e) => handlePhoneNumberChange(e.target.value, setFromNumber, fromCountry)}
                    className="flex-1 bg-white text-black"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="min-w-[100px] text-sm font-medium text-white">To:</label>
                <div className="flex-1 flex gap-2">
                  <Select value={toCountry} onValueChange={(value) => setToCountry(value as Country)}>
                    <SelectTrigger className="w-[130px] bg-white text-black">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto custom-scrollbar">
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex justify-between items-center w-full">
                            <span>{country.name}</span>
                            <span className="text-gray-500">+{country.dial_code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    placeholder={getPhoneNumberFormat(toCountry)}
                    value={toNumber}
                    onChange={(e) => handlePhoneNumberChange(e.target.value, setToNumber, toCountry)}
                    className="flex-1 bg-white text-black"
                    required
                  />
                </div>
              </div>
              <div className={cn("flex items-center gap-4", !showLeftSidebar && "col-span-2")}>
                <label className="min-w-[100px] text-sm font-medium text-white">From Name:</label>
                <Input
                  className="flex-1 bg-white border-purple-200 text-black"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center gap-2 w-full">
          <Button
            variant="ghost"
            size="icon"
            className={cn(isBold && "bg-white text-black")}
            onClick={() => setIsBold(!isBold)}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(isItalic && "bg-white text-black")}
            onClick={() => setIsItalic(!setIsItalic)}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(isUnderline && "bg-white text-black")}
            onClick={() => setIsUnderline(!isUnderline)}
          >
            <Underline className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon" onClick={() => setShowAlignmentDropdown(!showAlignmentDropdown)}>
              {textAlignment === "left" && <AlignLeft className="h-4 w-4" />}
              {textAlignment === "center" && <AlignCenter className="h-4 w-4" />}
              {textAlignment === "right" && <AlignRight className="h-4 w-4" />}
              {textAlignment === "justify" && <AlignJustify className="h-4 w-4" />}
            </Button>
            {showAlignmentDropdown && (
              <div className="absolute left-0 -mb-2 bottom-full w-32 bg-popover rounded-md shadow-lg z-50">
                {["left", "center", "right", "justify"].map((align) => (
                  <Button
                    key={align}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start px-3 py-2 text-sm",
                      textAlignment === align && "bg-white text-black",
                    )}
                    onClick={() => {
                      setTextAlignment(align as "left" | "center" | "right" | "justify")
                      setShowAlignmentDropdown(false)
                    }}
                  >
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </Button>
                ))}
              </div>
            )}{" "}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => handleFileSelect("image")}>
                <ImageIcon className="mr-2 h-4 w-4" />
                <span>Image</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileSelect("document")}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Document</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileSelect("link")}>
                <Link2 className="mr-2 h-4 w-4" />
                <span>Link</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileSelect("audio")}>
                <Music className="mr-2 h-4 w-4" />
                <span>Audio</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileSelect("video")}>
                <Video className="mr-2 h-4 w-4" />
                <span>Video</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
        </div>
        {selectedFile && (
          <div className="flex items-center gap-2 px-2 py-1 bg-muted rounded-md">
            <Upload className="h-4 w-4" />
            <span className="text-sm truncate">{selectedFile.name}</span>
            <Button variant="ghost" size="icon" className="h-4 w-4 ml-auto" onClick={() => setSelectedFile(null)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        {showLinkInput && (
          <div className="flex items-center gap-2 w-full">
            <Input
              placeholder="Enter your URL"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              className="flex-1 bg-white text-black"
            />
            <Button onClick={handleSaveLink}>Save</Button>
          </div>
        )}
        <div className="flex items-center gap-4 w-full">
          <Textarea
            ref={textareaRef}
            placeholder="Type a message"
            value={message}
            onChange={handleMessageChange}
            className={cn(
              "flex-1 min-h-[40px] max-h-[200px] resize-none overflow-auto bg-white text-black",
              isBold && "font-bold",
              isItalic && "italic",
              isUnderline && "underline",
              `text-${textAlignment}`,
            )}
            style={{ height: textareaHeight }}
            required
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <Button
            className={cn("whitespace-nowrap", !showLeftSidebar && "w-32")}
            onClick={handleSendMessage}
            disabled={!message}
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground w-full">
          <span>
            {charCount} character{charCount !== 1 ? "s" : ""}
          </span>
          <span>
            {wordCount} word{wordCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {deletingMessageId && (
        <Dialog open={true} onOpenChange={() => setDeletingMessageId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Message</DialogTitle>
              <DialogDescription>Choose how you want to delete this message:</DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => handleDeleteMessage(deletingMessageId, false)}>Delete for me</Button>
              <Button onClick={() => handleDeleteMessage(deletingMessageId, true)}>Delete for everyone</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this contact? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConversation}>Delete Permanently</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

