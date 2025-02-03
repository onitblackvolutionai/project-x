import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [smsNotifications, setSmsNotifications] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <p className="text-sm text-gray-500">Receive notifications via email</p>
        </div>
        <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label htmlFor="push-notifications">Push Notifications</Label>
          <p className="text-sm text-gray-500">Receive push notifications</p>
        </div>
        <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label htmlFor="sms-notifications">SMS Notifications</Label>
          <p className="text-sm text-gray-500">Receive notifications via SMS</p>
        </div>
        <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
      </div>
    </div>
  )
}

