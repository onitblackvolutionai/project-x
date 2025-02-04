"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { HelpCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function SupportPage() {
  const { toast } = useToast()
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = () => {
    if (!subject || !message || !email) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Message sent",
      description: "Your message has been sent to our support team.",
    })

    // TODO: Send support message to backend
    setSubject("")
    setMessage("")
    setEmail("")
  }

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Support
          </CardTitle>
          <CardDescription>Contact our support team for assistance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              placeholder="Enter subject"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white/5 border-white/10 text-white h-48"
              placeholder="Enter your message"
            />
          </div>
          <Button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Send Message
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

