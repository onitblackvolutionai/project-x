import { Card, CardContent } from "@/components/ui/card"
import { Snowflake, Flame, RefreshCw, Zap } from "lucide-react"
import { useState } from "react"

interface CampaignPurposeStepProps {
  onNext: () => void
  setCampaignType: (type: "cold" | "warm") => void
}

export function CampaignPurposeStep({ onNext, setCampaignType }: CampaignPurposeStepProps) {
  const [showWarmOptions, setShowWarmOptions] = useState(false)

  const handleSelection = (type: "cold" | "warm") => {
    setCampaignType(type)
    onNext()
  }

  if (showWarmOptions) {
    return (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-[#ffffff] text-center mb-12">Choose What Best Suits You</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card
            className="bg-card text-card-foreground cursor-pointer hover:bg-[#3b3b3b] transition-colors"
            onClick={() => handleSelection("warm")}
          >
            <CardContent className="flex flex-col items-center justify-center p-8">
              <RefreshCw className="mb-6 h-16 w-16" />
              <h3 className="mb-4 text-2xl font-semibold">Reactivation Campaign</h3>
              <p className="text-center text-lg text-muted-foreground">
                You Already have a lead list
                <br />
                and want to reach out to them
              </p>
            </CardContent>
          </Card>
          <Card
            className="bg-card text-card-foreground cursor-pointer hover:bg-[#3b3b3b] transition-colors"
            onClick={() => handleSelection("warm")}
          >
            <CardContent className="flex flex-col items-center justify-center p-8">
              <Zap className="mb-6 h-16 w-16" />
              <h3 className="mb-4 text-2xl font-semibold">Instant Calling</h3>
              <p className="text-center text-lg text-muted-foreground">
                You want to reach out to people as they sign
                <br />
                up for your Ads/Funnels, for further
                <br />
                qualification, and appointment booking
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-[#ffffff] text-center mb-12">What's Your Campaign Purpose?</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <Card
          className="bg-card text-card-foreground cursor-pointer hover:bg-[#3b3b3b] transition-colors"
          onClick={() => handleSelection("cold")}
        >
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Snowflake className="mb-6 h-16 w-16" />
            <h3 className="mb-4 text-2xl font-semibold">Reach Out to Cold Leads</h3>
            <p className="text-center text-lg text-muted-foreground">Leads that you have never contacted before</p>
          </CardContent>
        </Card>
        <Card
          className="bg-card text-card-foreground cursor-pointer hover:bg-[#3b3b3b] transition-colors"
          onClick={() => setShowWarmOptions(true)}
        >
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Flame className="mb-6 h-16 w-16" />
            <h3 className="mb-4 text-2xl font-semibold">Reach Out to Warm Leads</h3>
            <p className="text-center text-lg text-muted-foreground">
              Run a Reactivation Campaign or reach out to leads instantly from your Ads/Funnels
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

