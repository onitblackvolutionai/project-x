import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TestStepProps {
  onNext: () => void
  onPrev: () => void
}

export function TestStep({ onNext, onPrev }: TestStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Test Campaigns</h2>
      <p className="text-white">Give yourself a Quick Test</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white">
            Name
          </label>
          <Input id="name" className="mt-1 bg-[#2b2b2b] text-white" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white">
            Phone Number
          </label>
          <Input id="phone" className="mt-1 bg-[#2b2b2b] text-white" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <Input id="email" className="mt-1 bg-[#2b2b2b] text-white" />
        </div>
      </div>
      <Button className="w-full">Give me a Test</Button>
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">
          Previous
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}

