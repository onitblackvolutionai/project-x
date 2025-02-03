"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Snowflake, Flame } from "lucide-react"

export function CampaignTypeSelection() {
  const router = useRouter()

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-center text-white mb-12">Choose Your Campaign Type</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <Card
          className="bg-[#2b2b2b] text-white cursor-pointer hover:bg-[#3b3b3b] transition-colors"
          onClick={() => router.push("/campaigns/new?type=cold")}
        >
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Snowflake className="h-16 w-16 mb-6" />
            <CardTitle className="text-2xl font-semibold mb-4">Cold Leads</CardTitle>
            <CardDescription className="text-center text-lg text-[#c6c6c6]">
              Reach out to potential customers who have never interacted with your business before.
            </CardDescription>
          </CardContent>
        </Card>

        <Card
          className="bg-[#2b2b2b] text-white cursor-pointer hover:bg-[#3b3b3b] transition-colors"
          onClick={() => router.push("/campaigns/new?type=warm")}
        >
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Flame className="h-16 w-16 mb-6" />
            <CardTitle className="text-2xl font-semibold mb-4">Warm Leads</CardTitle>
            <CardDescription className="text-center text-lg text-[#c6c6c6]">
              Re-engage leads who have shown prior interest in your products or services.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

