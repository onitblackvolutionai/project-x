"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle, Circle, CreditCard } from "lucide-react"

export default function BillingPage() {
  const { toast } = useToast()
  const [isStripeConnected, setIsStripeConnected] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")

  const handleConnectStripe = async () => {
    // Simulate connecting to Stripe
    // In a real application, this would involve redirecting to Stripe's OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsStripeConnected(true)
    toast({
      title: "Stripe Connected!",
      description: "Your Stripe account is now connected.",
    })
  }

  const handleAddPaymentMethod = () => {
    // Implement logic to add payment method
    if (paymentMethod) {
      toast({
        title: "Payment Method Added",
        description: `Successfully added ${paymentMethod} as your payment method.`,
      })
      setPaymentMethod("")
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Billing</CardTitle>
          <CardDescription>Manage your billing information and subscription.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stripe Connection */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5">
            <div className="flex items-center space-x-4">
              <CreditCard className="h-6 w-6 text-white/70" />
              <div>
                <h4 className="text-lg font-medium text-white">Stripe</h4>
                <p className="text-sm text-white/60">Connect your Stripe account to manage payments.</p>
              </div>
            </div>
            <Button
              onClick={handleConnectStripe}
              disabled={isStripeConnected}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isStripeConnected ? "Connected" : "Connect"}
            </Button>
          </div>

          {/* Payment Methods */}
          {isStripeConnected && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white">Payment Methods</h4>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-white/80">Visa ending in 4242</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Add Payment Method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Button onClick={handleAddPaymentMethod} className="bg-purple-600 hover:bg-purple-700 text-white">
                  Add
                </Button>
              </div>
            </div>
          )}

          {/* Subscription Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Subscription</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">Current Plan:</span>
              <span className="text-sm font-medium text-white">Pro</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">Renewal Date:</span>
              <span className="text-sm font-medium text-white">March 15, 2024</span>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Update Subscription</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

