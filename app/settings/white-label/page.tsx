"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useSettings } from "@/components/providers/settings-provider"
import { useToast } from "@/components/ui/use-toast"
import { FileUpload } from "@/components/settings/file-upload"
import { ColorPicker } from "@/components/settings/color-picker"
import { EmailTemplateEditor } from "@/components/settings/email-template-editor"
import { TeamManagement } from "@/components/settings/team-management"
import { AICustomization } from "@/components/settings/ai-customization"

export default function WhiteLabelSettingsPage() {
  const { settings, updateSettings } = useSettings()
  const { toast } = useToast()
  const [localSettings, setLocalSettings] = useState(settings.workspaces[settings.currentWorkspace].whiteLabelSettings)
  const [companyName, setCompanyName] = useState(localSettings.companyName)
  const [logo, setLogo] = useState(localSettings.logo)
  const [favicon, setFavicon] = useState(localSettings.favicon)
  const [primaryColor, setPrimaryColor] = useState(localSettings.primaryColor)
  const [secondaryColor, setSecondaryColor] = useState(localSettings.secondaryColor)
  const [accentColor, setAccentColor] = useState(localSettings.accentColor)
  const [font, setFont] = useState(localSettings.font)
  const [customDomain, setCustomDomain] = useState(localSettings.customDomain)
  const [emailFromAddress, setEmailFromAddress] = useState(localSettings.emailFromAddress)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isProvisioning, setIsProvisioning] = useState(false)
  const [isProvisioned, setIsProvisioned] = useState(false)
  const [emailTemplates, setEmailTemplates] = useState({
    welcome:
      '<h1 style="color: {{primaryColor}};">Welcome to {{companyName}}</h1><img src="{{logo}}" alt="{{companyName}} logo" /><p>We\'re excited to have you on board!</p>',
  })
  const [teamMembers, setTeamMembers] = useState([
    { id: "1", name: "Admin User", email: "admin@example.com", phone: "+1234567890", role: "Admin", features: [] },
    {
      id: "2",
      name: "Regular User",
      email: "user@example.com",
      phone: "+1987654321",
      role: "User",
      features: ["Phone", "Email"],
    },
  ])

  useEffect(() => {
    // Update local state whenever settings change in the store
    setLocalSettings(settings.workspaces[settings.currentWorkspace].whiteLabelSettings)
    setCompanyName(localSettings.companyName)
    setLogo(localSettings.logo)
    setFavicon(localSettings.favicon)
    setPrimaryColor(localSettings.primaryColor)
    setSecondaryColor(localSettings.secondaryColor)
    setAccentColor(localSettings.accentColor)
    setFont(localSettings.font)
    setCustomDomain(localSettings.customDomain)
    setEmailFromAddress(localSettings.emailFromAddress)
  }, [settings, localSettings.accentColor]) // Added localSettings.accentColor to dependencies

  const handleChange = (key: keyof typeof localSettings, value: any) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    try {
      await updateSettings(localSettings) // Assuming updateSettings now returns a promise
      toast({
        title: "Settings saved",
        description: "Your white-label settings have been updated.",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error saving settings",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSaveEmailTemplate = (templateId: string, content: string) => {
    setEmailTemplates((prev) => ({
      ...prev,
      [templateId]: content,
    }))
    toast({
      title: "Email Template Saved",
      description: `The ${templateId} email template has been updated.`,
    })
  }

  const handleAddUser = (newUser: Omit<(typeof teamMembers)[0], "id">) => {
    setTeamMembers([...teamMembers, { ...newUser, id: Date.now().toString() }])
    toast({
      title: "User Added",
      description: `${newUser.name} has been added to the team.`,
    })
  }

  const handleUpdateUser = (updatedUser: (typeof teamMembers)[0]) => {
    setTeamMembers(teamMembers.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    toast({
      title: "User Updated",
      description: `${updatedUser.name}'s information has been updated.`,
    })
  }

  const handleRemoveUser = (userId: string) => {
    setTeamMembers(teamMembers.filter((user) => user.id !== userId))
    toast({
      title: "User Removed",
      description: "The user has been removed from the team.",
    })
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">White Label Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>Customize your platform with your own branding.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value)
                    handleChange("companyName", e.target.value)
                  }}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="customDomain">Custom Domain</Label>
                <Input
                  id="customDomain"
                  value={customDomain}
                  onChange={(e) => {
                    setCustomDomain(e.target.value)
                    handleChange("customDomain", e.target.value)
                  }}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email From Address</Label>
              <Input
                id="email"
                value={emailFromAddress}
                onChange={(e) => {
                  setEmailFromAddress(e.target.value)
                  handleChange("emailFromAddress", e.target.value)
                }}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="logo">Logo</Label>
                <FileUpload
                  accept="image/*"
                  label="Upload Logo"
                  onUpload={(url) => {
                    setLogo(url)
                    handleChange("logo", url)
                  }}
                />
              </div>
              <div>
                <Label htmlFor="favicon">Favicon</Label>
                <FileUpload
                  accept="image/*"
                  label="Upload Favicon"
                  onUpload={(url) => {
                    setFavicon(url)
                    handleChange("favicon", url)
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <ColorPicker
                  color={primaryColor}
                  onChange={(color) => {
                    setPrimaryColor(color)
                    handleChange("primaryColor", color)
                  }}
                />
              </div>
              <div>
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <ColorPicker
                  color={secondaryColor}
                  onChange={(color) => {
                    setSecondaryColor(color)
                    handleChange("secondaryColor", color)
                  }}
                />
              </div>
              <div>
                <Label htmlFor="accentColor">Accent Color</Label>
                <ColorPicker
                  color={accentColor}
                  onChange={(color) => {
                    setAccentColor(color)
                    handleChange("accentColor", color)
                  }}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="font">Font</Label>
              <Input
                id="font"
                value={font}
                onChange={(e) => {
                  setFont(e.target.value)
                  handleChange("font", e.target.value)
                }}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Customize your email templates with your branding.</CardDescription>
        </CardHeader>
        <CardContent>
          <EmailTemplateEditor
            templateId="welcome"
            initialContent={emailTemplates.welcome}
            onSave={handleSaveEmailTemplate}
          />
        </CardContent>
      </Card>

      <TeamManagement
        initialUsers={teamMembers}
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        onRemoveUser={handleRemoveUser}
      />

      <Card>
        <CardHeader>
          <CardTitle>AI Customization</CardTitle>
          <CardDescription>Customize your AI model with your own data.</CardDescription>
        </CardHeader>
        <CardContent>
          <AICustomization />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
}

