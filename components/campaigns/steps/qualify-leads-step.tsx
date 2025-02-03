import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface QualifyLeadsStepProps {
  onNext: () => void
  onPrev: () => void
}

export function QualifyLeadsStep({ onNext, onPrev }: QualifyLeadsStepProps) {
  const { toast } = useToast()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-card-foreground">Qualify Leads</h2>
      <p className="text-card-foreground">
        Our AI will research every single lead to see if they are a good fit for this campaign or not...
      </p>
      <div>
        <label htmlFor="icpCriteria" className="block text-sm font-medium text-card-foreground">
          What's Your ICP Qualification Criteria?
        </label>
        <Textarea
          id="icpCriteria"
          className="mt-1 bg-card text-card-foreground"
          placeholder="Be as Detailed as possible."
          rows={4}
        />
        <Button
          onClick={() => {
            toast({
              title: "Verification Started",
              description: "We're now verifying your ICP qualification criteria.",
            })
            // Here you would typically start the verification process
          }}
          className="mt-4 bg-white text-black hover:bg-white/90"
        >
          Verify Now
        </Button>
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

