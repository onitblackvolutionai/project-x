"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Check, Upload } from "lucide-react"
import { Phone, Mail, MessageSquare } from "lucide-react"
import { useCampaignStore } from "@/store/campaign-store"
import { Textarea } from "@/components/ui/textarea"
import { Users, Wand2 } from "lucide-react"
import { KnowledgeBaseContentDialog } from "./knowledge-base-content-dialog"
import { AssignKnowledgeBaseDialog } from "./assign-knowledge-base-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { timezones } from "@/lib/timezones"
import { CenteredToast } from "@/components/ui/centered-toast"
import { useToast } from "@/components/ui/use-toast"

interface ColdCampaignDialogProps {
  isOpen: boolean
  onClose: () => void
}

interface ScriptVariation {
  id: string
  content: string
}

const steps = [
  "Blueprint",
  "Knowledge Vault",
  "Leads",
  "Qualify Leads",
  "Select Channels",
  "Craft Center",
  "Select AI Agent",
  "Test",
  "Launch",
]

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const callingScripts: ScriptVariation[] = [
  {
    id: "casual",
    content: `Hey {{name}}! I was checking out {{customer_name}}'s Google reviews. Great job with the {{star_rating}} stars!

I noticed you have {{review_count}} reviews. Your competitor {{competitor_name}} has {{competitor_review_count}}. 

Got a sec to chat about how we can help you boost those numbers?`,
  },
  {
    id: "professional",
    content: `Hello {{name}}, this is {{agent_name}} from {{company_name}}.

I've been reviewing {{customer_name}}'s online presence. Your {{star_rating}}-star rating is impressive, but I noticed you have {{review_count}} reviews compared to {{competitor_name}}'s {{competitor_review_count}}.

Would you be interested in learning how we can help increase your review count while maintaining your excellent rating?`,
  },
  {
    id: "direct",
    content: `Hi {{name}}, {{agent_name}} here from {{company_name}}.

I'll be direct - there's a significant opportunity in your review strategy. You have {{review_count}} reviews, while {{competitor_name}} has {{competitor_review_count}}.

Got 2 minutes to hear how we can help you close this gap?`,
  },
]

const emailTemplates: ScriptVariation[] = [
  {
    id: "professional",
    content: `Dear {{FirstName}},

I hope this email finds you well. I've been analyzing {{company_name}}'s market presence and noticed an opportunity to enhance your digital footprint.

While your {{star_rating}}-star rating is commendable, increasing your review count from {{review_count}} could significantly boost your visibility and credibility.

Would you be open to a brief discussion on strategies to achieve this?

Best regards,
{{Your Name}}`,
  },
  {
    id: "casual",
    content: `Hey {{FirstName}}!

Quick question - have you noticed {{competitor_name}}'s review count lately? They're at {{competitor_review_count}} while {{company_name}} is at {{review_count}}.

I've got some cool ideas on how you can not just catch up, but take the lead. Wanna hear 'em?

Cheers,
{{Your Name}}`,
  },
  {
    id: "value-focused",
    content: `Hi {{FirstName}},

Did you know? Businesses with more reviews than their competitors typically see a 25-35% increase in customer inquiries.

I noticed {{company_name}} has {{review_count}} reviews, while the industry average in your area is {{competitor_review_count}}.

Let's chat about how we can bridge this gap and drive more business your way.

Best,
{{Your Name}}`,
  },
]

const smsTemplates: ScriptVariation[] = [
  {
    id: "brief",
    content: `Hi {{FirstName}}! {{agent_name}} from {{company_name}} here. Quick chat about boosting your {{review_count}} reviews? Call me: {{phone_number}}`,
  },
  {
    id: "informative",
    content: `{{FirstName}}, {{company_name}} has {{review_count}} reviews. We help businesses get more authentic reviews & boost visibility. Interested? Details: {{link}}`,
  },
  {
    id: "urgent",
    content: `{{FirstName}}, {{competitor_name}} just hit {{competitor_review_count}} reviews! Let's get {{company_name}} caught up. Free consultation: {{calendar_link}}`,
  },
]

const handleKnowledgeBaseSelection = (type: "assign" | "create") => {
  // Handle the knowledge base selection
  if (type === "assign") {
    setShowAssignKnowledgeBaseDialog(true)
  } else {
    setShowAIForm(true)
  }
}

export const ColdCampaignDialog = ({ isOpen, onClose }: ColdCampaignDialogProps) => {
  const [selectedDays, setSelectedDays] = useState<Set<string>>(
    new Set(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
  )
  const [dailyQuota, setDailyQuota] = useState([50])
  const [currentStep, setCurrentStep] = useState<string>("Blueprint")
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("calling")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showAIForm, setShowAIForm] = useState(false) // Added state for AI form
  const [knowledgeBases, setKnowledgeBases] = useState<{ name: string; data: any }[]>([])
  const [newKnowledgeBaseName, setNewKnowledgeBaseName] = useState("Untitled")
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<{ name: string; data: any } | null>(null)
  const [showAssignKnowledgeBaseDialog, setShowAssignKnowledgeBaseDialog] = useState(false)
  const [selectedTimezone, setSelectedTimezone] = useState("GMT")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null) // Added state for uploaded file

  const campaignStore = useCampaignStore()
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      // Load saved data
      const savedDailyQuota = campaignStore.blueprint?.dailyQuota
      if (savedDailyQuota) setDailyQuota([savedDailyQuota])

      const savedSelectedDays = campaignStore.blueprint?.selectedDays
      if (savedSelectedDays) setSelectedDays(new Set(savedSelectedDays))

      const savedAgent = campaignStore.aiAgent?.selectedAgent
      if (savedAgent) setSelectedAgent(savedAgent)

      const savedActiveTab = campaignStore.craftCenter?.activeTab
      if (savedActiveTab) setActiveTab(savedActiveTab)

      const savedTimezone = campaignStore.blueprint?.timezone
      if (savedTimezone) setSelectedTimezone(savedTimezone)
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, campaignStore])

  const toggleDay = (day: string) => {
    const newSelected = new Set(selectedDays)
    if (newSelected.has(day)) {
      newSelected.delete(day)
    } else {
      newSelected.add(day)
    }
    setSelectedDays(newSelected)
  }

  const handleStepClick = (step: string) => {
    // Save current step data before switching
    handleSaveChanges()
    setCurrentStep(step)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase()
      if (fileExtension === "csv" || fileExtension === "xlsx") {
        setUploadedFile(file)
        campaignStore.setField("qualifyLeads", "uploadedFile", file.name)
      } else {
        alert("Please upload only .csv or .xlsx files.")
      }
    }
  }

  const handleSaveChanges = () => {
    // Save changes based on the current step
    switch (currentStep) {
      case "Blueprint":
        campaignStore.setField("blueprint", "dailyQuota", dailyQuota[0])
        campaignStore.setField("blueprint", "selectedDays", Array.from(selectedDays))
        campaignStore.setField(
          "blueprint",
          "outreachEmail",
          (document.querySelector('input[type="email"]') as HTMLInputElement)?.value,
        )
        campaignStore.setField(
          "blueprint",
          "workingHoursStart",
          (document.querySelector('input[type="time"]:first-of-type') as HTMLInputElement)?.value,
        )
        campaignStore.setField(
          "blueprint",
          "workingHoursEnd",
          (document.querySelector('input[type="time"]:last-of-type') as HTMLInputElement)?.value,
        )
        campaignStore.setField("blueprint", "timezone", selectedTimezone)
        break
      case "Leads":
        if (uploadedFile) {
          campaignStore.setField("leads", "uploadedFile", uploadedFile.name)
        }
        break
      case "Craft Center":
        campaignStore.setField("craftCenter", "activeTab", activeTab)
        document.querySelectorAll("textarea").forEach((textarea) => {
          const id = textarea.id || textarea.getAttribute("data-id")
          if (id) {
            campaignStore.setField("craftCenter", id, textarea.value)
          }
        })
        break
      case "Select AI Agent":
        campaignStore.setField("aiAgent", "selectedAgent", selectedAgent)
        break
      case "Test":
        campaignStore.setField(
          "test",
          "name",
          (document.querySelector('input[placeholder="Enter your name"]') as HTMLInputElement)?.value,
        )
        campaignStore.setField(
          "test",
          "phoneNumber",
          (document.querySelector('input[placeholder="Enter your phone number"]') as HTMLInputElement)?.value,
        )
        campaignStore.setField(
          "test",
          "email",
          (document.querySelector('input[placeholder="Enter your email"]') as HTMLInputElement)?.value,
        )
        break
      case "Select Channels":
        campaignStore.setField(
          "channels",
          "selectedChannels",
          Array.from(campaignStore.channels?.selectedChannels || []),
        )
        break
      case "Qualify Leads":
        campaignStore.setField(
          "qualifyLeads",
          "criteria",
          (
            document.querySelector(
              'textarea[placeholder="Enter your ICP qualification criteria..."]',
            ) as HTMLTextAreaElement
          )?.value,
        )
        break
      case "Knowledge Vault":
        campaignStore.setField("knowledgeVault", "selectedKnowledgeBase", selectedKnowledgeBase)
        break
      // Add cases for other steps as needed
    }

    // Show toast
    toast({
      title: "Changes Saved",
      description: "Your changes have been saved successfully.",
      className: "bg-white text-black",
    })
  }

  const handleKnowledgeBaseSelection = (type: "assign" | "create") => {
    // Handle the knowledge base selection
    if (type === "assign") {
      setShowAssignKnowledgeBaseDialog(true)
    } else {
      setShowAIForm(true)
    }
  }

  const saveKnowledgeBase = () => {
    const newKnowledgeBase = {
      name: newKnowledgeBaseName,
      data: {
        // Add all the form fields here
        companyName: (document.querySelector('input[placeholder="Enter your company name"]') as HTMLInputElement)
          ?.value,
        website: (document.querySelector('input[placeholder="Enter your company\'s website URL"]') as HTMLInputElement)
          ?.value,
        productsServices: (
          document.querySelector('textarea[placeholder="Describe your products or services"]') as HTMLTextAreaElement
        )?.value,
        targetAudience: (
          document.querySelector('textarea[placeholder="Describe your ideal customer profile"]') as HTMLTextAreaElement
        )?.value,
        usp: (document.querySelector('textarea[placeholder="What makes your offering unique?"]') as HTMLTextAreaElement)
          ?.value,
        competitors: (
          document.querySelector('textarea[placeholder="List your main competitors"]') as HTMLTextAreaElement
        )?.value,
        objections: (
          document.querySelector(
            'textarea[placeholder="Common objections from potential customers"]',
          ) as HTMLTextAreaElement
        )?.value,
        objectionsHandling: (
          document.querySelector('textarea[placeholder="Your approach to handling objections"]') as HTMLTextAreaElement
        )?.value,
        salesProcess: (
          document.querySelector('textarea[placeholder="Describe your typical sales process"]') as HTMLTextAreaElement
        )?.value,
        successStories: (
          document.querySelector('textarea[placeholder="Share some customer success stories"]') as HTMLTextAreaElement
        )?.value,
        caseStudies: (
          document.querySelector('textarea[placeholder="Describe your notable case studies"]') as HTMLTextAreaElement
        )?.value,
        pricingPlans: (
          document.querySelector('textarea[placeholder="Detail your pricing structure"]') as HTMLTextAreaElement
        )?.value,
        requirements: (
          document.querySelector(
            'textarea[placeholder="List any prerequisites or requirements"]',
          ) as HTMLTextAreaElement
        )?.value,
        faq: (document.querySelector('textarea[placeholder="Common customer questions"]') as HTMLTextAreaElement)
          ?.value,
        salesCallRecording: (
          document.querySelector('input[placeholder="Enter meeting recording link"]') as HTMLInputElement
        )?.value,
      },
    }
    setKnowledgeBases([...knowledgeBases, newKnowledgeBase])
    setShowAIForm(false)
    setNewKnowledgeBaseName("Untitled")
  }

  const deleteKnowledgeBase = (index: number) => {
    const updatedKnowledgeBases = [...knowledgeBases]
    updatedKnowledgeBases.splice(index, 1)
    setKnowledgeBases(updatedKnowledgeBases)
  }

  const handleSaveKnowledgeBase = (updatedData: any) => {
    setKnowledgeBases((prevBases) => {
      return prevBases.map((kb) => {
        if (kb.name === selectedKnowledgeBase?.name) {
          return { ...kb, data: updatedData }
        }
        return kb
      })
    })
    toast({
      title: "Knowledge Base Updated",
      description: "Your changes have been saved successfully.",
    })
  }

  const handleAssignKnowledgeBase = (name: string, files: File[]) => {
    // Here you would typically process the files and create a new knowledge base
    // For now, we'll just add it to the list of knowledge bases
    const newKnowledgeBase = {
      name,
      data: {
        files: files.map((file) => file.name),
      },
    }
    setKnowledgeBases([...knowledgeBases, newKnowledgeBase])
    toast({
      title: "Knowledge Base Assigned",
      description: `${name} has been successfully assigned with ${files.length} file(s).`,
    })
  }

  const renderContent = () => {
    switch (currentStep) {
      case "Leads":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#ffffff] mb-4">Upload Leadlist</h2>
              <p className="text-lg text-[#e7e7e7]">Upload your lead list to start your campaign</p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-[#ffffff] mb-4">Upload Leadlist</h3>
              <p className="text-[#e7e7e7] mb-4">Upload your lead list in .csv or .xlsx format.</p>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90 text-base font-semibold px-6 py-2 rounded-lg transition-all duration-200 flex items-center"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  {uploadedFile ? "Change File" : "Upload File"}
                </Button>
                {uploadedFile && <span className="text-[#ffffff]">{uploadedFile.name}</span>}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv,.xlsx"
                  className="hidden"
                />
              </div>
              {!uploadedFile && <p className="text-[#e7e7e7] mt-2">This field is required to proceed.</p>}
            </div>
          </motion.div>
        )
      case "Qualify Leads":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#ffffff] mb-4">Qualify Leads</h2>
              <p className="text-lg text-[#e7e7e7]">
                Our AI will research every single lead to see if they are a good fit for this campaign or not...
              </p>
            </div>

            <div className="mt-8">
              <label className="text-xl font-semibold text-[#ffffff] mb-4 block">
                What's Your ICP Qualification Criteria?
              </label>
              <p className="text-[#e7e7e7] mb-4">Be as Detailed as possible.</p>
              <Textarea
                className="min-h-[200px] w-full bg-[#ffffff]/10 border-2 border-[#ffffff]/20 rounded-lg p-4 text-[#ffffff] text-lg leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200"
                placeholder="Enter your ICP qualification criteria..."
                onChange={(e) => campaignStore.setField("qualifyLeads", "criteria", e.target.value)}
              />
            </div>
          </motion.div>
        )
      case "Craft Center":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            <div className="flex-shrink-0 mb-6">
              <h2 className="text-3xl font-bold text-[#ffffff] mb-4">Craft Your Message</h2>
              <p className="text-lg text-[#e7e7e7]">Refine your scripts and templates for maximum impact</p>
            </div>

            <Tabs defaultValue="calling" className="flex-grow flex flex-col" onValueChange={setActiveTab}>
              <TabsList className="bg-[#ffffff]/10 border-b border-[#ffffff]/10 p-1 rounded-t-lg flex-shrink-0">
                <TabsTrigger
                  value="calling"
                  className="text-base font-semibold px-6 py-3 data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#09090b] rounded-t-md transition-all duration-200"
                >
                  Calling Scripts
                </TabsTrigger>
                <TabsTrigger
                  value="email"
                  className="text-base font-semibold px-6 py-3 data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#09090b] rounded-t-md transition-all duration-200"
                >
                  Email Templates
                </TabsTrigger>
                <TabsTrigger
                  value="sms"
                  className="text-base font-semibold px-6 py-3 data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#09090b] rounded-t-md transition-all duration-200"
                >
                  SMS Templates
                </TabsTrigger>
              </TabsList>

              <div className="flex-grow overflow-y-auto mt-6">
                <TabsContent value="calling" className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#ffffff] mb-6">Cold Calling Scripts</h3>
                  {callingScripts.map((script, index) => (
                    <motion.div
                      key={script.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-[#09090b] rounded-lg p-8 mb-6 shadow-lg"
                    >
                      <h4 className="text-[#ffffff] text-xl font-semibold mb-4">
                        Variation {index + 1} - {script.id}
                      </h4>
                      <textarea
                        className="w-full min-h-[200px] bg-[#09090b] border-2 border-[#ffffff]/20 rounded-md p-4 text-[#ffffff] text-lg leading-relaxed font-medium resize-none focus:outline-none focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200"
                        defaultValue={script.content}
                        id={`callingScript_${script.id}`}
                        data-id={`callingScript_${script.id}`}
                        onChange={(e) =>
                          campaignStore.setField("craftCenter", `callingScript_${script.id}`, e.target.value)
                        }
                      />
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="email" className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#ffffff] mb-6">Cold Email Templates</h3>
                  {emailTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-[#09090b] rounded-lg p-8 mb-6 shadow-lg"
                    >
                      <h4 className="text-[#ffffff] text-xl font-semibold mb-4">
                        Variation {index + 1} - {template.id}
                      </h4>
                      <textarea
                        className="w-full min-h-[300px] bg-[#09090b] border-2 border-[#ffffff]/20 rounded-md p-4 text-[#ffffff] text-lg leading-relaxed font-medium resize-none focus:outline-none focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200"
                        defaultValue={template.content}
                        id={`emailTemplate_${template.id}`}
                        data-id={`emailTemplate_${template.id}`}
                        onChange={(e) =>
                          campaignStore.setField("craftCenter", `emailTemplate_${template.id}`, e.target.value)
                        }
                      />
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="sms" className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#ffffff] mb-6">SMS Templates</h3>
                  {smsTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-[#09090b] rounded-lg p-8 mb-6 shadow-lg"
                    >
                      <h4 className="text-[#ffffff] text-xl font-semibold mb-4">
                        Variation {index + 1} - {template.id}
                      </h4>
                      <textarea
                        className="w-full min-h-[100px] bg-[#09090b] border-2 border-[#ffffff]/20 rounded-md p-4 text-[#ffffff] text-lg leading-relaxed font-medium resize-none focus:outline-none focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200"
                        defaultValue={template.content}
                        id={`smsTemplate_${template.id}`}
                        data-id={`smsTemplate_${template.id}`}
                        onChange={(e) =>
                          campaignStore.setField("craftCenter", `smsTemplate_${template.id}`, e.target.value)
                        }
                      />
                    </motion.div>
                  ))}
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        )

      case "Test":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#ffffff] mb-4">Test Your Campaign</h2>
              <p className="text-lg text-[#e7e7e7]">
                Give yourself a quick test to ensure everything is set up correctly
              </p>
            </div>

            <div className="bg-[#ffffff]/10 rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-[#ffffff] mb-6">Fill Out These Details:</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-[#ffffff] text-lg mb-2 block">Name</label>
                  <Input
                    className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-base rounded-lg focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200"
                    placeholder="Enter your name"
                    onChange={(e) => campaignStore.setField("test", "name", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-[#ffffff] text-lg mb-2 block">Phone Number</label>
                  <Input
                    className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-base rounded-lg focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200"
                    placeholder="Enter your phone number"
                    onChange={(e) => campaignStore.setField("test", "phoneNumber", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-[#ffffff] text-lg mb-2 block">Email</label>
                  <Input
                    className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-base rounded-lg focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200"
                    placeholder="Enter your email"
                    onChange={(e) => campaignStore.setField("test", "email", e.target.value)}
                  />
                </div>

                <Button className="bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90 text-base font-semibold px-6 py-2 rounded-lg transition-all duration-200 w-full">
                  Give me a Test
                </Button>
              </div>
            </div>
          </motion.div>
        )

      case "Select AI Agent":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#ffffff] mb-4">Select AI Agent</h2>
              <p className="text-lg text-[#e7e7e7]">Choose the voice that will represent your brand</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[
                {
                  id: "nick",
                  name: "Nick",
                  description: "Your go-to guy when it comes to bringing in revenue",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9RurfwMeBNXLfReJ4xChTifTMzwfkG.png",
                },
                {
                  id: "darcy",
                  name: "Darcy",
                  description: "Polite, but firm, doesn't hesitate to make a point",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mj1A1bBsBBNKIoO38Xk4W9rJyLlO1O.png",
                },
                {
                  id: "emma",
                  name: "Emma Hilton",
                  description: "Sweet, Polite and she will get the Job Done",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jHjPlMihP5ccLi72b78lhuW0wYK6jl.png",
                },
              ].map((agent) => (
                <motion.button
                  key={agent.id}
                  onClick={() => {
                    setSelectedAgent(agent.id)
                    campaignStore.setField("aiAgent", "selectedAgent", agent.id)
                  }}
                  className={cn(
                    "group rounded-lg p-6 text-center transition-all duration-300 transform hover:scale-105",
                    selectedAgent === agent.id ? "bg-[#ffffff]" : "bg-[#ffffff]/10 hover:bg-[#ffffff]/20",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                    <img
                      src={agent.image || "/placeholder.svg"}
                      alt={agent.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <h3
                    className={cn(
                      "text-2xl font-bold mb-3",
                      selectedAgent === agent.id ? "text-[#09090b]" : "text-[#ffffff]",
                    )}
                  >
                    {agent.name}
                  </h3>
                  <p className={cn("text-lg", selectedAgent === agent.id ? "text-[#09090b]" : "text-[#e7e7e7]")}>
                    {agent.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )
      case "Select Channels":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#ffffff] mb-4">Select Channels</h2>
              <p className="text-lg text-[#e7e7e7]">Choose your outreach channels</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 h-[calc(100vh-250px)] items-center">
              {[
                {
                  id: "calls",
                  title: "AI Calls",
                  icon: "phone",
                  description: "Get Instant Feedback on your Offers",
                },
                {
                  id: "emails",
                  title: "AI Emails",
                  icon: "mail",
                  description: "Send Outbound Messages to your prospects",
                },
                {
                  id: "sms",
                  title: "AI SMS",
                  icon: "message-square",
                  description: "The Quickest way to connect",
                },
              ].map((channel) => {
                const isSelected = campaignStore.channels?.selectedChannels?.includes(channel.id)

                return (
                  <motion.button
                    key={channel.id}
                    onClick={() => {
                      constcurrentSelected = newSet(campaignStore.channels?.selectedChannels || [])
                      if (currentSelected.has(channel.id)) {
                        currentSelected.delete(channel.id)
                      } else {
                        currentSelected.add(channel.id)
                      }
                      campaignStore.setField("channels", "selectedChannels", Array.from(currentSelected))
                    }}
                    className={cn(
                      "relative overflow-hidden rounded-lg p-12 text-center transition-all duration-300 h-full",
                      "bg-[#ffffff]/5 hover:bg-[#ffffff]/10",
                      isSelected && "ring-2 ring-[#ffffff]",
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <div className="p-4 rounded-full bg-[#ffffff]/10">
                        {channel.icon === "phone" && <Phone className="w-8 h-8 text-[#ffffff]" />}
                        {channel.icon === "mail" && <Mail className="w-8 h-8 text-[#ffffff]" />}
                        {channel.icon === "message-square" && <MessageSquare className="w-8 h-8 text-[#ffffff]" />}
                      </div>
                      <h3 className="text-xl font-semibold text-[#ffffff]">{channel.title}</h3>
                      <p className="text-[#e7e7e7]">{channel.description}</p>{" "}
                    </div>
                    {isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4">
                        <Check className="w-6 h-6 text-[#ffffff]" />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )
      case "Knowledge Vault":
        if (showAIForm) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <Input
                  className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-xl rounded-lg mb-4"
                  placeholder="Untitled"
                  value={newKnowledgeBaseName}
                  onChange={(e) => setNewKnowledgeBaseName(e.target.value)}
                />
                <h2 className="text-3xl font-bold text-[#ffffff] mb-4">The Perfect Knowledge Base</h2>
                <p className="text-lg text-[#e7e7e7] mb-8">
                  Fill out these details to create your AI-powered knowledge base
                </p>
              </div>

              <div className="space-y-6 max-w-4xl">
                <div className="space-y-4">
                  <label className="text-lg font-semibold text-[#ffffff]">What's your company name?</label>
                  <Input
                    className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-base rounded-lg"
                    placeholder="Enter your company name"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-semibold text-[#ffffff]">What's your company's website?</label>
                  <Input
                    className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-base rounded-lg"
                    placeholder="Enter your company's website URL"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-semibold text-[#ffffff]">What products/services do you sell?</label>
                  <Textarea
                    className="min-h-[100px] bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] rounded-lg"
                    placeholder="Describe your products or services"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#ffffff]">Your Sales Call Meeting Recording Link</label>
                    <Input
                      type="url"
                      placeholder="https://example.com/your-meeting-recording"
                      className="bg-[#ffffff]/10 border-[#ffffff]/20 text-[#ffffff]"
                    />
                  </div>
                  <div className="mt-2">
                    <Button className="bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90 font-semibold px-6 py-2">
                      Scrape Now
                    </Button>
                  </div>
                </div>

                <div className="spacey-4">
                  <label className="text-lg font-semibold text-[#ffffff]">What's your target audience?</label>
                  <Textarea
                    className="min-h-[100px] bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff]rounded-lg"
                    placeholder="Describe your ideal customer profile"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-semibold text-[#ffffff]">
                    What's your unique selling proposition (USP)?
                  </label>
                  <Textarea
                    className="min-h-[100px] bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] rounded-lg"
                    placeholder="What makes your offering unique?"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-semibold text-[#ffffff]">What are your competitors?</label>
                  <Textarea
                    className="min-h-[100px] bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] rounded-lg"
                    placeholder="List your main competitors"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-semibold text-[#ffffff]">
                    What objections do people usually give you?
                  </label>
                  <Textarea
                    className="min-h-[100px] bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] rounded-lg"
                    placeholder="Common objections from potential customers"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-semibold text-[#ffffff]">How do you handle these objections?</label>
                  <Textarea
                    className="min-h-[100px] bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] rounded-lg"
                    placeholder="Your approach to handling objections"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-semibold text-[#ffffff]">What's your sales process like?</label>
                  <Textarea
                    className="min-h-[100px] bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] rounded-lg"
                    placeholder="Describe your typical sales process"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-semibold text-[#ffffff]">What are your success stories?</label>
                  <Textarea
                    className="min-h-[100px] bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] rounded-lg"
                    placeholder="Share some customer success stories"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-semibold text-[#ffffff]">What are your case studies?</label>
                  <Textarea
                    className="min-h-[100px] bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] rounded-lg"
                    placeholder="Describe your notable case studies"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-semibold text-[#ffffff]">What are your pricing plans?</label>
                  <Textarea
                    className="min-h-[100px] bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] rounded-lg"
                    placeholder="Detail your pricing structure"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-semibold text-[#ffffff]">
                    Are there any specific requirements to buy from you?
                  </label>
                  <Textarea
                    className="min-h-[100px] bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] rounded-lg"
                    placeholder="List any prerequisites or requirements"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-semibold text-[#ffffff]">
                    What questions do customers usually ask?
                  </label>
                  <Textarea
                    className="min-h-[100px] bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] rounded-lg"
                    placeholder="Common customer questions"
                  />
                </div>

                <div className="pt-6">
                  <Button
                    className="w-full bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90 text-lg font-semibold h-12"
                    onClick={() => {
                      saveKnowledgeBase()
                    }}
                  >
                    Generate Knowledge Base
                  </Button>
                </div>
              </div>
            </motion.div>
          )
        }

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 h-full"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#ffffff] mb-4">Knowledge Vault</h2>
              <p className="text-lg text-[#e7e7e7]">Select or create a knowledge base for your campaign</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100%-100px)]">
              <button
                onClick={() => handleKnowledgeBaseSelection("assign")}
                className="relative overflow-hidden rounded-lg p-12 text-center transition-all duration-300 bg-[#ffffff]/5 hover:bg-[#ffffff]/10 group h-full flex flex-col justify-center items-center"
              >
                <div className="flex flex-col items-center justify-center space-y-6">
                  <Users className="w-24 h-24 text-[#ffffff] mb-4" />
                  <h3 className="text-3xl font-semibold text-[#ffffff]">Assign a Knowledge Base</h3>
                  <p className="text-xl text-[#e7e7e7]">Use an existing knowledge base from your KB Section</p>
                </div>
              </button>

              <button
                onClick={() => handleKnowledgeBaseSelection("create")}
                className="relative overflow-hidden rounded-lg p-12 text-center transition-all duration-300 bg-[#ffffff]/5 hover:bg-[#ffffff]/10 group h-full flex flex-col justify-center items-center"
              >
                <div className="flex flex-col items-center justify-center space-y-6">
                  <Wand2 className="w-24 h-24 text-[#ffffff] mb-4" />
                  <h3 className="text-3xl font-semibold text-[#ffffff]">Create a Knowledge Base using AI</h3>
                  <p className="text-xl text-[#e7e7e7]">Generate the perfect KB in just 10 minutes</p>
                </div>
              </button>
            </div>

            {knowledgeBases.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-[#ffffff] mb-4">Your Knowledge Bases</h3>
                <div className="space-y-4">
                  {knowledgeBases.map((kb, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-[#ffffff]/5 hover:bg-[#ffffff]/10 transition-colors"
                    >
                      <span className="text-white">{kb.name}</span>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-[#ffffff]/5 mr-2"
                          onClick={() => setSelectedKnowledgeBase(kb)}
                        >
                          Open
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:bg-red-500/10"
                          onClick={() => deleteKnowledgeBase(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* Daily Leads Quota */}
            <div className="space-y-4">
              <label className="text-2xl font-bold text-[#ffffff]">Daily Leads Quota</label>
              <div className="px-4">
                <Slider
                  value={dailyQuota}
                  onValueChange={(value) => {
                    setDailyQuota(value)
                    campaignStore.setField("blueprint", "dailyQuota", value[0])
                  }}
                  max={1500}
                  step={50}
                  className="[&_[role=slider]]:bg-[#ffffff] [&_[role=slider]]:w-6 [&_[role=slider]]:h-6"
                />
                <div className="flex justify-between mt-4 text-lg text-[#e7e7e7]">
                  <span>0</span>
                  <span className="text-2xl font-bold text-[#ffffff]">{dailyQuota[0]}</span>
                  <span>1500</span>
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-4">
              <label className="text-2xl font-bold text-[#ffffff]">Email to use for Outreach</label>
              <Input
                type="email"
                placeholder="email@example.com"
                className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-base rounded-lg focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200"
                onChange={(e) => campaignStore.setField("blueprint", "outreachEmail", e.target.value)}
              />
            </div>

            {/* Schedule Settings */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#ffffff]">Schedule Settings</h2>

              {/* Timezone */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-[#ffffff]">Timezone</label>
                <p className="text-sm text-[#e7e7e7]">(The timezone which you wanna send the calls in)</p>
                <Select
                  value={selectedTimezone}
                  onValueChange={(value) => {
                    setSelectedTimezone(value)
                    campaignStore.setField("blueprint", "timezone", value)
                  }}
                >
                  <SelectTrigger className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-base rounded-lg focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((timezone) => (
                      <SelectItem key={timezone.value} value={timezone.value}>
                        {timezone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Active Days */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-[#ffffff]">Active Days</label>
                <div className="flex flex-wrap gap-3">
                  {weekDays.map((day) => (
                    <Button
                      key={day}
                      variant="outline"
                      className={cn(
                        "border-2 border-[#ffffff]/20 text-base font-medium px-6 py-2 rounded-lg transition-all duration-200",
                        selectedDays.has(day)
                          ? "bg-[#ffffff] text-[#09090b]"
                          : "bg-transparent text-[#ffffff] hover:bg-[#ffffff]/10",
                      )}
                      onClick={() => {
                        toggleDay(day)
                        const newSelectedDays = new Set(selectedDays)
                        if (newSelectedDays.has(day)) {
                          newSelectedDays.delete(day)
                        } else {
                          newSelectedDays.add(day)
                        }
                        campaignStore.setField("blueprint", "selectedDays", Array.from(newSelectedDays))
                      }}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-[#ffffff]">Working Hours</label>
                <div className="flex items-center gap-6">
                  <Input
                    type="time"
                    defaultValue="19:00"
                    className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-base rounded-lg focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200"
                    onChange={(e) => campaignStore.setField("blueprint", "workingHoursStart", e.target.value)}
                  />
                  <span className="text-2xl font-bold text-[#ffffff]">—</span>
                  <Input
                    type="time"
                    defaultValue="22:00"
                    className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-base rounded-lg focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200"
                    onChange={(e) => campaignStore.setField("blueprint", "workingHoursEnd", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 bg-[#09090b] rounded-xl overflow-hidden flex flex-col">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-80 border-r border-[#ffffff]/10 p-8 bg-[#000000]/20 overflow-y-auto">
            <h1 className="text-3xl font-bold text-[#ffffff] mb-10">Craft a New Campaign</h1>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <motion.button
                  key={step}
                  onClick={() => handleStepClick(step)}
                  className={cn(
                    "w-full px-6 py-4 rounded-lg text-left transition-all duration-200 flex items-center",
                    step === currentStep ? "bg-[#ffffff] text-[#09090b]" : "text-[#ffffff]/70 hover:bg-[#ffffff]/10",
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-4 flex items-center justify-center w-8 h-8 rounded-full bg-[#ffffff]/20 text-[#ffffff]">
                    {index + 1}
                  </span>
                  <span className="text-lg font-medium">{step}</span>
                  {step === currentStep && (
                    <motion.span
                      className="ml-auto"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow p-12 overflow-y-auto relative">
            <AnimatePresence mode="wait">
              <div className="max-w-4xl mx-auto">{renderContent()}</div>
            </AnimatePresence>
            <Button
              onClick={handleSaveChanges}
              className="fixed bottom-4 right-4 bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90 text-base font-semibold px-6 py-2 rounded-lg transition-all duration-200"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
      <CenteredToast />
      <KnowledgeBaseContentDialog
        isOpen={!!selectedKnowledgeBase}
        onClose={() => setSelectedKnowledgeBase(null)}
        knowledgeBase={selectedKnowledgeBase}
        onSave={handleSaveKnowledgeBase}
      />
      <AssignKnowledgeBaseDialog
        isOpen={showAssignKnowledgeBaseDialog}
        onClose={() => setShowAssignKnowledgeBaseDialog(false)}
        onAssign={handleAssignKnowledgeBase}
      />
    </Dialog>
  )
}

export { ColdCampaignDialog }

