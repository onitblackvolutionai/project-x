"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useCampaignStore } from "@/store/campaign-store"
import { useToast } from "@/components/ui/use-toast"

interface CraftContentStepProps {
  onNext: () => void
  campaignType: "cold" | "warm"
}

interface Script {
  id: string
  content: string
}

export function CraftCenterStep({ onNext, campaignType }: CraftContentStepProps) {
  const campaignStore = useCampaignStore()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<string>("calling")
  const [scripts, setScripts] = useState<{
    calling: Script[]
    email: Script[]
    sms: Script[]
  }>({
    calling: [],
    email: [],
    sms: [],
  })

  useEffect(() => {
    const savedScripts = campaignStore.craftCenter
    // Set initial scripts based on campaign type
    const initialCallingScript =
      campaignType === "cold" ? "Initial cold calling script content" : "Initial warm calling script content"
    const initialEmailTemplate =
      campaignType === "cold" ? "Initial cold email template content" : "Initial warm email template content"
    const initialSMSTemplate =
      campaignType === "cold" ? "Initial cold SMS template content" : "Initial warm SMS template content"

    setScripts({
      calling: savedScripts.callingScripts || [{ id: "1", content: initialCallingScript }],
      email: savedScripts.emailTemplates || [{ id: "1", content: initialEmailTemplate }],
      sms: savedScripts.smsTemplates || [{ id: "1", content: initialSMSTemplate }],
    })
  }, [campaignStore.craftCenter, campaignType])

  const handleScriptChange = (type: "calling" | "email" | "sms", id: string, content: string) => {
    setScripts((prevScripts) => ({
      ...prevScripts,
      [type]: prevScripts[type].map((script) => (script.id === id ? { ...script, content } : script)),
    }))
  }

  const handleSave = () => {
    campaignStore.setField("craftCenter", {
      callingScripts: scripts.calling,
      emailTemplates: scripts.email,
      smsTemplates: scripts.sms,
    })
    toast({
      title: "Changes Saved",
      description: "Your changes have been saved successfully.",
    })
  }

  const renderScripts = (type: "calling" | "email" | "sms") => (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-card-foreground mb-6">
        {type === "calling" ? "Cold Calling Scripts" : type === "email" ? "Cold Email Templates" : "SMS Templates"}
      </h3>
      {scripts[type].map((script, index) => (
        <motion.div
          key={script.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-card rounded-lg p-8 mb-6 shadow-lg"
        >
          <h4 className="text-card-foreground text-xl font-semibold mb-4">
            Variation {index + 1} - {script.id}
          </h4>
          <textarea
            className="w-full min-h-[200px] bg-card border-2 border-card/20 rounded-md p-4 text-card-foreground text-lg leading-relaxed font-medium resize-none focus:outline-none focus:ring-2 focus:ring-card/40 transition-all duration-200"
            value={script.content}
            onChange={(e) => handleScriptChange(type, script.id, e.target.value)}
          />
        </motion.div>
      ))}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <div className="flex-shrink-0 mb-6">
        <h2 className="text-3xl font-bold text-card-foreground mb-4">Craft Your Message</h2>
        <p className="text-lg text-muted-foreground">Refine your scripts and templates for maximum impact</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
        <TabsList className="bg-card/10 border-b border-card/10 p-1 rounded-t-lg flex-shrink-0">
          <TabsTrigger
            value="calling"
            className="text-base font-semibold px-6 py-3 data-[state=active]:bg-card data-[state=active]:text-card-foreground rounded-t-md transition-all duration-200"
          >
            Calling Scripts
          </TabsTrigger>
          <TabsTrigger
            value="email"
            className="text-base font-semibold px-6 py-3 data-[state=active]:bg-card data-[state=active]:text-card-foreground rounded-t-md transition-all duration-200"
          >
            Email Templates
          </TabsTrigger>
          <TabsTrigger
            value="sms"
            className="text-base font-semibold px-6 py-3 data-[state=active]:bg-card data-[state=active]:text-card-foreground rounded-t-md transition-all duration-200"
          >
            SMS Templates
          </TabsTrigger>
        </TabsList>

        <div className="flex-grow overflow-y-auto mt-6">
          <TabsContent value="calling">{renderScripts("calling")}</TabsContent>
          <TabsContent value="email">{renderScripts("email")}</TabsContent>
          <TabsContent value="sms">{renderScripts("sms")}</TabsContent>
        </div>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-card text-card-foreground hover:bg-card/90 text-base font-semibold px-6 py-2"
        >
          Save Changes
        </Button>
        <Button
          onClick={onNext}
          className="ml-4 bg-card text-card-foreground hover:bg-card/90 text-base font-semibold px-6 py-2"
        >
          Next Step
        </Button>
      </div>
    </motion.div>
  )
}

