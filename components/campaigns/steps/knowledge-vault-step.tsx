"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Wand2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

interface KnowledgeVaultStepProps {
  onNext: () => void
  onPrev: () => void
}

export function KnowledgeVaultStep({ onNext, onPrev }: KnowledgeVaultStepProps) {
  const [showAIDialog, setShowAIDialog] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [aiFormData, setAiFormData] = useState({
    companyName: "",
    website: "",
    productDescription: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [savedKnowledgeBaseName, setSavedKnowledgeBaseName] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedFiles(Array.from(event.target.files))
    }
  }

  const handleAIInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAiFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateAIForm = () => {
    const newErrors: Record<string, string> = {}
    if (aiFormData.companyName.length < 2) {
      newErrors.companyName = "Company name is required."
    }
    if (!aiFormData.website.includes(".")) {
      newErrors.website = "Please enter a valid website."
    }
    if (aiFormData.productDescription.length < 20) {
      newErrors.productDescription = "Please provide a more detailed product description."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGenerateKnowledgeBase = () => {
    if (validateAIForm()) {
      // Simulate AI generation
      const newKnowledgeBaseName = "AI-Generated Knowledge Base"
      toast({
        title: "Knowledge Base Generated",
        description: "Your AI-generated knowledge base is ready.",
      })
      setShowAIDialog(false)
      setSavedKnowledgeBaseName(newKnowledgeBaseName)
    }
  }

  const handleSaveKnowledgeBase = () => {
    // ... (Existing logic)

    // Set the saved knowledge base name
    setSavedKnowledgeBaseName("Manually Uploaded Knowledge Base")
  }

  const handleAssignKnowledgeBase = (name: string, files: File[]) => {
    // ... (Existing logic)

    // Set the saved knowledge base name
    setSavedKnowledgeBaseName(name)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Knowledge Vault</h2>
        <p className="text-[#e7e7e7]">Select or create knowledge base for your AI agents</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#ffffff]/5 border-[#ffffff]/10">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Upload className="h-12 w-12 text-white mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Upload Documents</h3>
              <p className="text-sm text-[#e7e7e7] mb-4">Upload your existing knowledge base documents</p>
              <Input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
              <label htmlFor="file-upload">
                <Button variant="outline" className="border-[#ffffff]/10 text-white hover:bg-[#ffffff]/5">
                  Select Files
                </Button>
              </label>
              {uploadedFiles.length > 0 && (
                <p className="mt-2 text-sm text-white">{uploadedFiles.length} file(s) selected</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#ffffff]/5 border-[#ffffff]/10">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Wand2 className="h-12 w-12 text-white mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">AI-Generated Knowledge Base</h3>
              <p className="text-sm text-[#e7e7e7] mb-4">Let AI create a knowledge base from your website or content</p>
              <Button
                variant="outline"
                className="border-[#ffffff]/10 text-white hover:bg-[#ffffff]/5"
                onClick={() => setShowAIDialog(true)}
              >
                Generate with AI
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="bg-[#09090b] text-white border-[#ffffff]/10">
          <DialogHeader>
            <DialogTitle>Generate AI Knowledge Base</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Company Name</label>
              <Input
                name="companyName"
                placeholder="Enter your company name"
                className="bg-[#ffffff]/5 border-[#ffffff]/10 text-white"
                value={aiFormData.companyName}
                onChange={handleAIInputChange}
                error={errors.companyName}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Website</label>
              <Input
                name="website"
                placeholder="Enter your company's website"
                className="bg-[#ffffff]/5 border-[#ffffff]/10 text-white"
                value={aiFormData.website}
                onChange={handleAIInputChange}
                error={errors.website}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Product/Service Description</label>
              <Textarea
                name="productDescription"
                placeholder="Describe your products or services"
                className="bg-[#ffffff]/5 border-[#ffffff]/10 text-white min-h-[100px]"
                value={aiFormData.productDescription}
                onChange={handleAIInputChange}
                error={errors.productDescription}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Your Sales Call Meeting Recording Link</label>
              <Input
                type="url"
                placeholder="https://example.com/your-meeting-recording"
                className="bg-[#ffffff]/5 border-[#ffffff]/10 text-white"
              />
            </div>
            <Button onClick={handleGenerateKnowledgeBase} className="w-full bg-white text-[#09090b] hover:bg-white/90">
              Generate Knowledge Base
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">
          Previous
        </Button>
        <Button
          onClick={onNext}
          className="bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90"
          disabled={uploadedFiles.length === 0 && !aiFormData.companyName}
        >
          Next Step
        </Button>
      </div>
      {savedKnowledgeBaseName && (
        <div className="mt-4">
          <p className="text-lg text-white">Selected Knowledge Base: {savedKnowledgeBaseName}</p>
        </div>
      )}
    </div>
  )
}

