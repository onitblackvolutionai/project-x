"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface CSVUploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onUploadComplete: (name: string, file: File) => void
}

export function CSVUploadDialog({ isOpen, onClose, onUploadComplete }: CSVUploadDialogProps) {
  const [listName, setListName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleUpload = async () => {
    if (!listName || !selectedFile) {
      toast({
        title: "Error",
        description: "Please provide both a name and a file for the lead list.",
        variant: "destructive",
      })
      return
    }

    // Here you would typically handle the file upload to your server
    try {
      // Simulate file upload
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onUploadComplete(listName, selectedFile)
      setListName("")
      setSelectedFile(null)
      onClose()

      toast({
        title: "Success",
        description: "Lead list has been uploaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload lead list. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1C1C1C] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Upload Lead List</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">List Name</Label>
            <Input
              id="name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="Enter list name"
              className="bg-black/40 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label>Upload CSV File</Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className={cn(
                  "flex flex-col items-center justify-center w-full h-40",
                  "border-2 border-white/10 border-dashed rounded-lg cursor-pointer",
                  "bg-black/40 hover:bg-black/60 transition-colors duration-200",
                )}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-white/60" />
                  <p className="mb-2 text-sm text-white/60">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-white/40">CSV file with lead data</p>
                  {selectedFile && <p className="mt-2 text-sm text-white/80 font-medium">{selectedFile.name}</p>}
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".csv"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Button
              onClick={handleUpload}
              className="w-full bg-white text-black hover:bg-white/90"
              disabled={!listName || !selectedFile}
            >
              Upload List
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

