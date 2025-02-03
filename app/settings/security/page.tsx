"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSettings } from "@/store/settings-store"
import { toast } from "@/components/ui/use-toast"
import { Shield } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SecurityPage() {
  const settings = useSettings()
  const [localSettings, setLocalSettings] = useState({
    twoFactorEnabled: settings.twoFactorEnabled,
    sessionTimeout: settings.sessionTimeout,
    ipWhitelist: settings.ipWhitelist,
  })

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const handleSave = () => {
    settings.setSecurity(localSettings)
    toast({
      title: "Changes saved",
      description: "Your security settings have been updated.",
    })
  }

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }

    // Here you would typically make an API call to change the password
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    })
    setPasswords({ current: "", new: "", confirm: "" })
  }

  const handleAddIP = (ip: string) => {
    if (!/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip)) {
      toast({
        title: "Error",
        description: "Please enter a valid IP address.",
        variant: "destructive",
      })
      return
    }

    setLocalSettings((prev) => ({
      ...prev,
      ipWhitelist: [...prev.ipWhitelist, ip],
    }))
  }

  return (
    <div className="max-w-4xl space-y-8">
      <Card className="border-white/10 bg-black/40">
        <CardHeader>
          <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-white/10 p-2">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <Label className="text-lg">Two-Factor Authentication</Label>
                <p className="text-sm text-white/60">Secure your account with 2FA</p>
              </div>
            </div>
            <Switch
              checked={localSettings.twoFactorEnabled}
              onCheckedChange={(checked) => setLocalSettings((prev) => ({ ...prev, twoFactorEnabled: checked }))}
            />
          </motion.div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-black/40">
        <CardHeader>
          <CardTitle className="text-2xl">Password</CardTitle>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords((prev) => ({ ...prev, new: e.target.value }))}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords((prev) => ({ ...prev, confirm: e.target.value }))}
                className="bg-white/5 border-white/10"
              />
            </div>
            <Button
              onClick={handlePasswordChange}
              disabled={!passwords.current || !passwords.new || !passwords.confirm}
            >
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-black/40">
        <CardHeader>
          <CardTitle className="text-2xl">Session Settings</CardTitle>
          <CardDescription>Manage your session security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Session Timeout</Label>
            <Select
              value={String(localSettings.sessionTimeout)}
              onValueChange={(value) =>
                setLocalSettings((prev) => ({
                  ...prev,
                  sessionTimeout: Number.parseInt(value),
                }))
              }
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Select timeout duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            setLocalSettings({
              twoFactorEnabled: false,
              sessionTimeout: 30,
              ipWhitelist: [],
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

