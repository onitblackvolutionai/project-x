import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

interface AssignKnowledgeBaseDialogProps {
  isOpen: boolean
  onClose: () => void
  onAssign: (name: string, files: File[]) => void
}

export function AssignKnowledgeBaseDialog({ isOpen, onClose, onAssign }: AssignKnowledgeBaseDialogProps) {
  const [knowledgeBaseName, setKnowledgeBaseName] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files))
    }
  }

  const handleAssign = () => {
    if (knowledgeBaseName && uploadedFiles.length > 0) {
      onAssign(knowledgeBaseName, uploadedFiles)
      onClose()
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
              Upload Files
            </Label>
            <div className="flex items-center space-x-2">
              <Input id="file-upload" type="file" multiple onChange={handleFileChange} className="hidden" />
              <Button
                onClick={() => document.getElementById("file-upload")?.click()}
                variant="outline"
                className="w-full border-dashed border-2 border-[#ffffff]/20 bg-transparent hover:bg-[#ffffff]/5 text-white"
              >
                <Upload className="mr-2 h-4 w-4" /> Choose files
              </Button>
            </div>
            {uploadedFiles.length > 0 && (
              <p className="text-sm text-gray-300">{uploadedFiles.length} file(s) selected</p>
            )}
          </div>
        </div>
        <Button
          onClick={handleAssign}
          className="w-full bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90"
          disabled={!knowledgeBaseName || uploadedFiles.length === 0}
        >
          Assign Knowledge Base
        </Button>
      </DialogContent>
    </Dialog>
  )
}

