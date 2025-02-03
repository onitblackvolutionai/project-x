"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface AssignKnowledgeBaseDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (knowledgeBase: { name: string; file?: File }) => void
}

export function AssignKnowledgeBaseDialog({ isOpen, onClose, onSave }: AssignKnowledgeBaseDialogProps) {
  const [knowledgeBaseName, setKnowledgeBaseName] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleSave = () => {
    if (knowledgeBaseName) {
      onSave({ name: knowledgeBaseName, file: uploadedFile })
      onClose()
    } else {
      toast({
        title: "Error",
        description: "Please provide a name for the knowledge base.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#09090b] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Assign Knowledge Base</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="kb-name" className="text-sm font-medium text-gray-200">
              Knowledge Base Name
            </Label>
            <Input
              id="kb-name"
              value={knowledgeBaseName}
              onChange={(e) => setKnowledgeBaseName(e.target.value)}
              className="bg-[#ffffff]/10 border-[#ffffff]/20 text-white"
              placeholder="Enter knowledge base name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="file-upload" className="text-sm font-medium text-gray-200">
              Upload File (Optional)
            </Label>
            <div className="flex items-center space-x-2">
              <Input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
              <Button
                onClick={() => document.getElementById("file-upload")?.click()}
                variant="outline"
                className="w-full border-dashed border-2 border-[#ffffff]/20 bg-transparent hover:bg-[#ffffff]/5 text-white"
              >
                <Upload className="mr-2 h-4 w-4" /> Choose file
              </Button>
            </div>
            {uploadedFile && <p className="text-sm text-gray-300">{uploadedFile.name}</p>}
          </div>
        </div>
        <Button onClick={handleSave} className="w-full bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90">
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  )
}

