import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
          <p className="text-sm text-gray-500">Enable two-factor authentication for added security</p>
        </div>
        <Switch id="two-factor" checked={twoFactor} onCheckedChange={setTwoFactor} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="current-password">Current Password</Label>
        <Input id="current-password" type="password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <Input id="new-password" type="password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input id="confirm-password" type="password" />
      </div>
      <Button className="w-full mt-4">Change Password</Button>
    </div>
  )
}

