import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

interface PricingTier {
  id: string
  name: string
  price: number
  features: string[]
}

export function BillingManagement() {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    { id: "1", name: "Basic", price: 9.99, features: ["Feature 1", "Feature 2"] },
    { id: "2", name: "Pro", price: 19.99, features: ["Feature 1", "Feature 2", "Feature 3"] },
    { id: "3", name: "Enterprise", price: 49.99, features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"] },
  ])
  const [newTier, setNewTier] = useState<Omit<PricingTier, "id">>({ name: "", price: 0, features: [] })
  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const { toast } = useToast()

  const handleAddTier = () => {
    const id = Date.now().toString()
    setPricingTiers([...pricingTiers, { ...newTier, id }])
    setNewTier({ name: "", price: 0, features: [] })
    toast({
      title: "Pricing Tier Added",
      description: `${newTier.name} tier has been added to your pricing plans.`,
    })
  }

  const handleRemoveTier = (id: string) => {
    setPricingTiers(pricingTiers.filter((tier) => tier.id !== id))
    toast({
      title: "Pricing Tier Removed",
      description: "The pricing tier has been removed from your plans.",
    })
  }

  const handleUpdateStripeAccount = () => {
    // TODO: Implement Stripe Connect integration
    toast({
      title: "Stripe Account Updated",
      description: "Your Stripe account has been successfully connected.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pricing Tiers</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pricingTiers.map((tier) => (
              <TableRow key={tier.id}>
                <TableCell>{tier.name}</TableCell>
                <TableCell>
                  {tier.price} {selectedCurrency}
                </TableCell>
                <TableCell>{tier.features.join(", ")}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleRemoveTier(tier.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Tier Name"
          value={newTier.name}
          onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Price"
          value={newTier.price}
          onChange={(e) => setNewTier({ ...newTier, price: Number.parseFloat(e.target.value) })}
        />
        <Input
          placeholder="Features (comma-separated)"
          value={newTier.features.join(", ")}
          onChange={(e) => setNewTier({ ...newTier, features: e.target.value.split(",").map((f) => f.trim()) })}
        />
        <Button onClick={handleAddTier}>Add Tier</Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Currency</h3>
        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-medium">Stripe Integration</h3>
        <Button onClick={handleUpdateStripeAccount}>Connect Stripe Account</Button>
      </div>
    </div>
  )
}

