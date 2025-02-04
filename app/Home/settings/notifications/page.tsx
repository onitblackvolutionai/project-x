"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useSettings } from "@/store/settings-store"
import { toast } from "@/components/ui/use-toast"
import { Bell, Mail, MessageSquare, Phone, Megaphone } from "lucide-react"

export default function NotificationsPage() {
  const settings = useSettings()
  const [localSettings, setLocalSettings] = useState({
    emailNotifications: settings.emailNotifications,
    pushNotifications: settings.pushNotifications,
    soundEnabled: settings.soundEnabled,
    notificationTypes: { ...settings.notificationTypes },
  })

  const handleSave = () => {
    settings.setNotifications(localSettings)
    toast({
      title: "Changes saved",
      description: "Your notification settings have been updated.",
    })
  }

  const notificationChannels = [
    {
      id: "email",
      title: "Email Notifications",
      description: "Receive notifications via email",
      icon: Mail,
      key: "emailNotifications",
    },
    {
      id: "push",
      title: "Push Notifications",
      description: "Receive notifications on your device",
      icon: Bell,
      key: "pushNotifications",
    },
    {
      id: "sound",
      title: "Sound",
      description: "Play sound for notifications",
      icon: Phone,
      key: "soundEnabled",
    },
  ]

  const notificationCategories = [
    {
      id: "messages",
      title: "Messages",
      description: "Get notified about new messages",
      icon: MessageSquare,
    },
    {
      id: "calls",
      title: "Calls",
      description: "Get notified about incoming calls",
      icon: Phone,
    },
    {
      id: "updates",
      title: "Updates",
      description: "Get notified about system updates",
      icon: Bell,
    },
    {
      id: "marketing",
      title: "Marketing",
      description: "Receive marketing communications",
      icon: Megaphone,
    },
  ]

  return (
    <div className="max-w-4xl space-y-8">
      <Card className="border-white/10 bg-black/40">
        <CardHeader>
          <CardTitle className="text-2xl">Notification Channels</CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {notificationChannels.map((channel) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-white/10 p-2">
                  <channel.icon className="h-6 w-6" />
                </div>
                <div>
                  <Label className="text-lg">{channel.title}</Label>
                  <p className="text-sm text-white/60">{channel.description}</p>
                </div>
              </div>
              <Switch
                checked={localSettings[channel.key as keyof typeof localSettings]}
                onCheckedChange={(checked) => setLocalSettings((prev) => ({ ...prev, [channel.key]: checked }))}
              />
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-black/40">
        <CardHeader>
          <CardTitle className="text-2xl">Notification Types</CardTitle>
          <CardDescription>Select which notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {notificationCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-white/10 p-2">
                  <category.icon className="h-6 w-6" />
                </div>
                <div>
                  <Label className="text-lg">{category.title}</Label>
                  <p className="text-sm text-white/60">{category.description}</p>
                </div>
              </div>
              <Switch
                checked={localSettings.notificationTypes[category.id as keyof typeof localSettings.notificationTypes]}
                onCheckedChange={(checked) =>
                  setLocalSettings((prev) => ({
                    ...prev,
                    notificationTypes: {
                      ...prev.notificationTypes,
                      [category.id]: checked,
                    },
                  }))
                }
              />
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            setLocalSettings({
              emailNotifications: true,
              pushNotifications: false,
              soundEnabled: true,
              notificationTypes: {
                messages: true,
                calls: true,
                updates: true,
                marketing: false,
              },
            })
          }}
        >
          Reset to Defaults
        </Button>
        <Button size="lg" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}

