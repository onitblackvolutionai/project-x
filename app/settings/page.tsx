"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { GeneralSettings } from "@/components/settings/general-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { IntegrationSettings } from "@/components/settings/integration-settings"
import { SecuritySettings } from "@/components/settings/security-settings"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">Settings</h1>
        <p className="mt-2 text-sm text-white/60">Manage your account settings and preferences.</p>
      </div>

      <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-black/60 border border-white/20 p-1 rounded-lg">
              <TabsTrigger value="general" className="data-[state=active]:bg-white/10">
                General
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-white/10">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="integrations" className="data-[state=active]:bg-white/10">
                Integrations
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-white/10">
                Security
              </TabsTrigger>
            </TabsList>
            <motion.div key={activeTab} variants={tabVariants} initial="hidden" animate="visible">
              <TabsContent value="general">
                <GeneralSettings />
              </TabsContent>
              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>
              <TabsContent value="integrations">
                {/* Include IntegrationSettings here */}
                <IntegrationSettings />
              </TabsContent>
              <TabsContent value="security">
                <SecuritySettings />
              </TabsContent>
            </motion.div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

