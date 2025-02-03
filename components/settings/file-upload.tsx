import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface FileUploadProps {
  onUpload: (url: string) => void
  accept: string
  label: string
}

export function FileUpload({ onUpload, accept, label }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      // TODO: Implement actual file upload logic here
      // For now, we'll simulate an upload with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate a returned URL
      const uploadedUrl = URL.createObjectURL(file)
      onUpload(uploadedUrl)

      toast({
        title: "File uploaded",
        description: "Your file has been successfully uploaded.",
      })
    } catch (error) {
      console.error("File upload failed:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <Input
        type="file"
        accept={accept}
        onChange={handleUpload}
        disabled={isUploading}
        className="hidden"
        id={`file-upload-${label}`}
      />
      <Button asChild>
        <label htmlFor={`file-upload-${label}`}>{isUploading ? "Uploading..." : label}</label>
      </Button>
    </div>
  )
}

