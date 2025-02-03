import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface SelectAIAgentStepProps {
  onNext: () => void
  onPrev: () => void
}

export function SelectAIAgentStep({ onNext, onPrev }: SelectAIAgentStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Select AI Agent</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-[#2b2b2b] text-white">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Image src="/placeholder.svg" alt="Emma Hilton" width={100} height={100} className="rounded-full mb-4" />
            <h3 className="mb-2 text-xl font-semibold">Emma Hilton</h3>
            <p className="text-center text-sm text-gray-400">Sweet, Polite and she will get the Job Done</p>
          </CardContent>
        </Card>
        <Card className="bg-[#2b2b2b] text-white">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Image src="/placeholder.svg" alt="Darcy" width={100} height={100} className="rounded-full mb-4" />
            <h3 className="mb-2 text-xl font-semibold">Darcy</h3>
            <p className="text-center text-sm text-gray-400">Polite, but firm, doesn't hesitate to make a point</p>
          </CardContent>
        </Card>
        <Card className="bg-[#2b2b2b] text-white">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Image src="/placeholder.svg" alt="Nick" width={100} height={100} className="rounded-full mb-4" />
            <h3 className="mb-2 text-xl font-semibold">Nick</h3>
            <p className="text-center text-sm text-gray-400">Your go to guy, when it comes to bringing in revenue</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">
          Previous
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}

