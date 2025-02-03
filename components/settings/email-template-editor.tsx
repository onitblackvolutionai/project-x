import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useSettings } from "@/components/providers/settings-provider"

interface EmailTemplateEditorProps {
  templateId: string
  initialContent: string
  onSave: (templateId: string, content: string) => void
}

export function EmailTemplateEditor({ templateId, initialContent, onSave }: EmailTemplateEditorProps) {
  const [content, setContent] = useState(initialContent)
  const { settings } = useSettings()
  const { companyName, primaryColor, logo } = settings.workspaces[settings.currentWorkspace].whiteLabelSettings

  const handleSave = () => {
    onSave(templateId, content)
  }

  const previewContent = content
    .replace("{{companyName}}", companyName)
    .replace("{{primaryColor}}", primaryColor)
    .replace("{{logo}}", logo)

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="template-content">Email Template Content</Label>
        <Textarea
          id="template-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-64 bg-white/5 border-white/10 text-white"
        />
      </div>
      <div>
        <Label>Preview</Label>
        <div className="p-4 bg-white text-black rounded-md" dangerouslySetInnerHTML={{ __html: previewContent }} />
      </div>
      <Button onClick={handleSave}>Save Template</Button>
    </div>
  )
}

