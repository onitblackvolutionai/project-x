"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEmailAccounts } from "@/store/email-accounts"
import { Upload } from "lucide-react"

interface AddAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddAccountDialog({ open, onOpenChange }: AddAccountDialogProps) {
  const [activeTab, setActiveTab] = useState<"smtp-imap" | "bulk" | "google">("smtp-imap")
  const { addAccount } = useEmailAccounts()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const accountData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      smtpServer: formData.get("smtpServer") as string,
      smtpPort: formData.get("smtpPort") as string,
      imapServer: formData.get("imapServer") as string,
      imapPort: formData.get("imapPort") as string,
    }

    try {
      await addAccount({
        name: accountData.name,
        email: accountData.email,
        stats: { sent: 0, opened: 0, replied: 0 },
      })
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to add account:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Email Account</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "smtp-imap" | "bulk" | "google")}>
          <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
            <TabsTrigger value="smtp-imap">SMTP/IMAP</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
          </TabsList>

          <TabsContent value="smtp-imap">
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your Name" className="bg-zinc-800 border-zinc-700" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" className="bg-zinc-800 border-zinc-700" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    name="smtpServer"
                    placeholder="smtp.example.com"
                    className="bg-zinc-800 border-zinc-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    name="smtpPort"
                    placeholder="587"
                    className="bg-zinc-800 border-zinc-700"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="imapServer">IMAP Server</Label>
                  <Input
                    id="imapServer"
                    name="imapServer"
                    placeholder="imap.example.com"
                    className="bg-zinc-800 border-zinc-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imapPort">IMAP Port</Label>
                  <Input
                    id="imapPort"
                    name="imapPort"
                    placeholder="993"
                    className="bg-zinc-800 border-zinc-700"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Add Account
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="bulk">
            <div className="space-y-4 mt-4">
              <Label htmlFor="csvUpload">Upload CSV File</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="csvUpload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-700 border-dashed rounded-lg cursor-pointer bg-zinc-800 hover:bg-zinc-700"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-zinc-400" />
                    <p className="mb-2 text-sm text-zinc-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-zinc-400">CSV file with email account details</p>
                  </div>
                  <input id="csvUpload" type="file" className="hidden" accept=".csv" />
                </label>
              </div>
              <Button className="w-full">Upload and Add Accounts</Button>
            </div>
          </TabsContent>

          <TabsContent value="google">
            <div className="space-y-4 mt-4">
              <p className="text-sm text-zinc-400">
                Connect your Google Workspace account to add multiple email accounts at once.
              </p>
              <Button className="w-full flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Sign in with Google
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

