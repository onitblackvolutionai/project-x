"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wand2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { AssignKnowledgeBaseDialog } from "../assign-knowledge-base-dialog"

interface KnowledgeVaultStepProps {
  onNext: () => void
  onPrev: () => void
  data: {
    lead_info: string
    faqs: string
    competitor_data: string
  }
}

export function KnowledgeVaultStep({ onNext, onPrev, data }: KnowledgeVaultStepProps) {
  const [showAIDialog, setShowAIDialog] = useState(false)
  const [knowledgeBases, setKnowledgeBases] = useState<{ name: string; data: any }[]>([])
  const [newKnowledgeBaseName, setNewKnowledgeBaseName] = useState("Untitled")
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<{ name: string; data: any } | null>(null)
  const { toast } = useToast()
  const [showAssignKBDialog, setShowAssignKBDialog] = useState(false)

  const handleKnowledgeBaseSelection = (type: "assign" | "create") => {
    if (type === "assign") {
      setShowAssignKBDialog(true) // Show the dialog
    } else {
      setShowAIDialog(true)
    }
  }

  const saveKnowledgeBase = () => {
    const newKnowledgeBase = {
      name: newKnowledgeBaseName,
      data: {
        companyName: (document.querySelector('input[placeholder="Enter your company name"]') as HTMLInputElement)
          ?.value,
        website: (document.querySelector('input[placeholder="Enter your company\'s website URL"]') as HTMLInputElement)
          ?.value,
        productsServices: (
          document.querySelector('textarea[placeholder="Describe your products or services"]') as HTMLTextAreaElement
        )?.value,
        // ... other fields
      },
    }
    setKnowledgeBases([...knowledgeBases, newKnowledgeBase])
    setShowAIDialog(false)
    setNewKnowledgeBaseName("Untitled")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Knowledge Vault</h2>
        <p className="text-[#e7e7e7]">Select or create knowledge base for your AI agents</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Assign Knowledge Base */}
        <button
          onClick={() => handleKnowledgeBaseSelection("assign")}
          className="relative overflow-hidden rounded-lg p-12 text-center transition-all duration-300 bg-[#ffffff]/5 hover:bg-[#ffffff]/10 group h-full flex flex-col justify-center items-center"
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <Wand2 className="w-24 h-24 text-white mb-4" /> {/* Placeholder - Replace with actual icon */}
            <h3 className="text-3xl font-semibold text-white">Assign a Knowledge Base</h3>
            <p className="text-xl text-[#e7e7e7]">Use an existing knowledge base from your KB Section</p>
          </div>
        </button>

        {/* Create with AI */}
        <button
          onClick={() => handleKnowledgeBaseSelection("create")}
          className="relative overflow-hidden rounded-lg p-12 text-center transition-all duration-300 bg-[#ffffff]/5 hover:bg-[#ffffff]/10 group h-full flex flex-col justify-center items-center"
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <Wand2 className="w-24 h-24 text-white mb-4" />
            <h3 className="text-3xl font-semibold text-white">Create a Knowledge Base using AI</h3>
            <p className="text-xl text-[#e7e7e7]">Generate the perfect KB in just 10 minutes</p>
          </div>
        </button>
      </div>

      {/* AI Dialog */}
      <Dialog open={showAIDialog} onOpenChange={() => setShowAIDialog(false)}>
        <DialogContent className="bg-[#09090b] text-white border-[#ffffff]/10">
          <DialogHeader>
            <DialogTitle>Generate AI Knowledge Base</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              className="bg-[#ffffff]/10 border-[#ffffff]/20 text-white"
              placeholder="Knowledge Base Name"
              value={newKnowledgeBaseName}
              onChange={(e) => setNewKnowledgeBaseName(e.target.value)}
            />
            <Input className="bg-[#ffffff]/10 border-[#ffffff]/20 text-white" placeholder="Enter your company name" />
            <Input
              className="bg-[#ffffff]/10 border-[#ffffff]/20 text-white"
              placeholder="Enter your company's website URL"
            />
            <Textarea
              placeholder="Describe your products or services"
              className="bg-[#ffffff]/10 border-[#ffffff]/20 text-white min-h-[100px]"
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Your Sales Call Meeting Recording Link</label>
              <Input
                type="url"
                placeholder="https://example.com/your-meeting-recording"
                className="bg-[#ffffff]/10 border-[#ffffff]/20 text-white"
              />
            </div>
            <Button onClick={saveKnowledgeBase} className="w-full bg-white text-[#09090b] hover:bg-white/90">
              Generate Knowledge Base
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AssignKnowledgeBaseDialog
        isOpen={showAssignKBDialog}
        onClose={() => setShowAssignKBDialog(false)}
        onSave={(knowledgeBase) => {
          // Handle saving the assigned knowledge base
          console.log("Saving assigned knowledge base:", knowledgeBase)
          toast({
            title: "Knowledge Base Assigned",
            description: `${knowledgeBase.name} has been assigned.`,
          })
        }}
      />

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}

