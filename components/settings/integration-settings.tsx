import * as React from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const crmProviders = [
  {
    name: "Salesforce",
    logo: "/placeholder.svg?height=48&width=48",
    description: "Import leads from Salesforce CRM",
  },
  {
    name: "HubSpot",
    logo: "/placeholder.svg?height=48&width=48",
    description: "Connect with HubSpot CRM",
  },
  {
    name: "Pipedrive",
    logo: "/placeholder.svg?height=48&width=48",
    description: "Import from Pipedrive",
  },
  {
    name: "Zoho CRM",
    logo: "/placeholder.svg?height=48&width=48",
    description: "Connect with Zoho CRM",
  },
]

const adAccountProviders = [
  {
    name: "Google Ads",
    logo: "/placeholder.svg?height=48&width=48",
    description: "Connect your Google Ads account",
  },
  {
    name: "Facebook Ads",
    logo: "/placeholder.svg?height=48&width=48",
    description: "Connect your Facebook Ads account",
  },
]

const noCodeToolsProviders = [
  {
    name: "Make (Integromat)",
    logo: "/placeholder.svg?height=48&width=48",
    description: "Connect your Make account",
  },
  {
    name: "Zapier",
    logo: "/placeholder.svg?height=48&width=48",
    description: "Connect your Zapier account",
  },
]

export function IntegrationSettings() {
  const [selectedTab, setSelectedTab] = React.useState("crm")

  const renderIntegrationCards = (providers: { name: string; logo: string; description: string }[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {providers.map((provider) => (
        <Card key={provider.name} className="bg-[#1C1C1C] border-white/10">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="relative w-12 h-12 mb-4">
              <Image src={provider.logo || "/placeholder.svg"} alt={provider.name} fill />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{provider.name}</h3>
            <p className="text-white/60 text-sm mb-6">{provider.description}</p>
            <Button className="bg-purple-600 w-full">Connect</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/20 border-b border-white/10 rounded-t-lg">
            <TabsTrigger value="crm" className="data-[state=active]:bg-white/10">
              CRM
            </TabsTrigger>
            <TabsTrigger value="ad-accounts" className="data-[state=active]:bg-white/10">
              Ad Accounts
            </TabsTrigger>
            <TabsTrigger value="no-code-tools" className="data-[state=active]:bg-white/10">
              No-Code Tools
            </TabsTrigger>
          </TabsList>
          <TabsContent value="crm" className="mt-6">
            {renderIntegrationCards(crmProviders)}
          </TabsContent>
          <TabsContent value="ad-accounts" className="mt-6">
            {renderIntegrationCards(adAccountProviders)}
          </TabsContent>
          <TabsContent value="no-code-tools" className="mt-6">
            {renderIntegrationCards(noCodeToolsProviders)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

