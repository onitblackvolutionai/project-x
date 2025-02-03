import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface KnowledgeBaseContentDialogProps {
  isOpen: boolean
  onClose: () => void
  knowledgeBase: { name: string; data: any } | null
  onDelete: () => void
}

export function KnowledgeBaseContentDialog({
  isOpen,
  onClose,
  knowledgeBase,
  onDelete,
}: KnowledgeBaseContentDialogProps) {
  const [editedData, setEditedData] = useState<any>({})
  const { toast } = useToast()

  useEffect(() => {
    if (knowledgeBase) {
      setEditedData(knowledgeBase.data)
    }
  }, [knowledgeBase])

  if (!knowledgeBase) return null

  const handleInputChange = (key: string, value: string) => {
    setEditedData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const handleSaveChanges = () => {
    // Here you would typically update the knowledge base in your state or make an API call
    toast({
      title: "Changes Saved",
      description: "Your knowledge base has been updated successfully.",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-[#09090b] text-white overflow-hidden flex flex-col">
        <DialogHeader className="p-6 border-b border-[#ffffff]/10">
          <DialogTitle className="text-2xl font-bold">{knowledgeBase.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow p-6 h-[calc(90vh-10rem)]">
          {Object.entries(editedData).map(([key, value]) => (
            <div key={key} className="mb-6">
              <h3 className="text-lg font-semibold mb-2 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h3>
              {key === "companyName" || key === "website" ? (
                <Input
                  value={value as string}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-full bg-[#ffffff]/10 border-[#ffffff]/20 text-[#ffffff] focus:ring-2 focus:ring-[#ffffff]/40"
                />
              ) : (
                <Textarea
                  value={value as string}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-full min-h-[100px] bg-[#ffffff]/10 border-[#ffffff]/20 text-[#ffffff] focus:ring-2 focus:ring-[#ffffff]/40 resize-none scrollbar-thin scrollbar-thumb-[#ffffff]/20 scrollbar-track-transparent"
                />
              )}
            </div>
          ))}
        </ScrollArea>
        <div className="p-6 border-t border-[#ffffff]/10 mt-auto">
          <div className="flex justify-between">
            <Button onClick={onDelete} variant="destructive">
              Delete Knowledge Base
            </Button>
            <Button onClick={handleSaveChanges} className="bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

