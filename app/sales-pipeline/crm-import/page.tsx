"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const crmProviders = [
  {
    name: "Salesforce",
    logo: "/placeholder.svg",
    description: "Import leads from Salesforce CRM",
  },
  {
    name: "HubSpot",
    logo: "/placeholder.svg",
    description: "Connect with HubSpot CRM",
  },
  {
    name: "Pipedrive",
    logo: "/placeholder.svg",
    description: "Import from Pipedrive",
  },
  {
    name: "Zoho CRM",
    logo: "/placeholder.svg",
    description: "Connect with Zoho CRM",
  },
]

export default function CRMImportPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [connecting, setConnecting] = useState(false)

  const handleConnect = async (crmName: string) => {
    setConnecting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "Success",
        description: `Connected to ${crmName} successfully.`,
      })
      router.push("/sales-pipeline")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to CRM. Please try again.",
        variant: "destructive",
      })
    } finally {
      setConnecting(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-black px-4 py-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <Link href="/sales-pipeline" className="inline-flex items-center gap-2 text-white/60 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Sales Pipeline
          </Link>
        </div>

        <h1 className="text-4xl font-medium text-white mb-8">Import from CRM</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {crmProviders.map((crm) => (
            <Card key={crm.name} className="bg-[#1C1C1C] border-white/10 p-6 flex flex-col items-center text-center">
              <img
                src={crm.logo || "/placeholder.svg"}
                alt={crm.name}
                className="w-16 h-16 mb-4 rounded-lg bg-white/10"
              />
              <h3 className="text-xl font-medium text-white mb-2">{crm.name}</h3>
              <p className="text-white/60 text-sm mb-6">{crm.description}</p>
              <Button onClick={() => handleConnect(crm.name)} disabled={connecting} className="w-full">
                {connecting ? "Connecting..." : "Connect"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

