"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement actual password reset logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      setSubmitted(true)
      toast({
        title: "Success",
        description: "If an account exists with this email, you will receive reset instructions.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset instructions",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#09090b] via-[#1a1a1a] to-[#2a2a2a] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white">Reset password</CardTitle>
            <CardDescription>Enter your email address and we'll send you reset instructions</CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset instructions"}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-green-400">Reset instructions have been sent to your email.</p>
                <p className="text-sm text-white/60">
                  Please check your inbox and follow the instructions to reset your password.
                </p>
              </div>
            )}
            <div className="mt-4 text-center text-sm">
              Remember your password?{" "}
              <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 