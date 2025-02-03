"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Wand2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

interface KnowledgeBaseProps {
  onComplete: () => void
}

export function KnowledgeBase({ onComplete }: KnowledgeBaseProps) {
  const [showAIForm, setShowAIForm] = useState(false)
  const [newKnowledgeBaseName, setNewKnowledgeBaseName] = useState("Untitled")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const { toast } = useToast()

  const handleUploadDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedFiles(Array.from(event.target.files))
      toast({
        title: "Documents Uploaded",
        description: `${event.target.files.length} document(s) uploaded successfully.`,
      })
    }
  }

  const handleGenerateWithAI = () => {
    setShowAIForm(true)
  }

  const handleSaveKnowledgeBase = () => {
    // Implement save logic
    toast({
      title: "Knowledge Base Created",
      description: "Your knowledge base has been successfully created.",
    })
    setShowAIForm(false)
    onComplete()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Build Your Knowledge Base</h2>
        <p className="text-[#e7e7e7]">Create or upload your knowledge base for AI agents</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload Documents Card */}
        <Card className="bg-[#ffffff]/5 border-[#ffffff]/10">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Upload className="h-12 w-12 text-white mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Upload Documents</h3>
              <p className="text-sm text-[#e7e7e7] mb-4">Upload your existing knowledge base documents</p>
              <Input type="file" multiple onChange={handleUploadDocument} className="hidden" id="document-upload" />
              <label htmlFor="document-upload">
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

        {/* AI-Generated Knowledge Base Card */}
        <Card className="bg-[#ffffff]/5 border-[#ffffff]/10">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Wand2 className="h-12 w-12 text-white mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">AI-Generated Knowledge Base</h3>
              <p className="text-sm text-[#e7e7e7] mb-4">Let AI create a knowledge base from your website or content</p>
              <Button
                variant="outline"
                className="border-[#ffffff]/10 text-white hover:bg-[#ffffff]/5"
                onClick={handleGenerateWithAI}
              >
                Generate with AI
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Generated Knowledge Base Dialog */}
      <Dialog open={showAIForm} onOpenChange={setShowAIForm}>
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">What's your company name?</label>
              <Input className="bg-[#ffffff]/10 border-[#ffffff]/20 text-white" placeholder="Enter your company name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">What's your company's website?</label>
              <Input
                className="bg-[#ffffff]/10 border-[#ffffff]/20 text-white"
                placeholder="Enter your company's website URL"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">What products/services do you sell?</label>
              <Textarea
                className="min-h-[100px] bg-[#ffffff]/10 border-[#ffffff]/20 text-white"
                placeholder="Describe your products or services"
              />
              <Button className="mt-2 bg-white text-[#09090b] hover:bg-white/90">Scrape Now</Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Your Sales Call Meeting Recording Link</label>
              <Input
                type="url"
                placeholder="https://example.com/your-meeting-recording"
                className="bg-[#ffffff]/10 border-[#ffffff]/20 text-white"
              />
            </div>
            <Button onClick={handleSaveKnowledgeBase} className="w-full bg-white text-[#09090b] hover:bg-white/90">
              Generate Knowledge Base
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

