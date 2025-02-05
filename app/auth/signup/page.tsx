"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const validateEmail = (email: string) => {
    const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/
    return gmailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess(false)
    setErrors({ email: "", password: "", confirmPassword: "" })

    // Validate email format
    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid Gmail address" }))
      setIsLoading(false)
      toast({
        title: "Invalid Email",
        description: "Only Gmail addresses (@gmail.com) are allowed",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }))
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/auth/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'signup',
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.error.includes('already exists')) {
          setErrors(prev => ({ ...prev, email: "This email is already registered" }))
          toast({
            title: "Account Exists",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive",
            action: (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => router.push('/auth/signin')}
              >
                Sign In
              </Button>
            ),
          })
          setIsLoading(false)
          return
        }

        if (data.error.includes('invalid') || data.error.includes('does not exist')) {
          setErrors(prev => ({ ...prev, email: data.error }))
          toast({
            title: "Invalid Email",
            description: data.error,
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }

        throw new Error(data.error || 'Failed to create account')
      }

      setSuccess(true)
      toast({
        title: "Success",
        description: "Account created successfully! Please check your email to confirm your account.",
        variant: "default",
        duration: 6000,
      })
      
      setTimeout(() => {
        router.push('/auth/signin')
      }, 2000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account'
      
      if (errorMessage.includes('wait')) {
        toast({
          title: "Please Wait",
          description: "Please wait a few seconds before trying again",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      }
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
            <CardTitle className="text-2xl text-white">Create an account</CardTitle>
            <CardDescription>Enter your information to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-4 space-y-4"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500" />
                <p className="text-green-500 font-medium text-lg">Account created successfully!</p>
                <p className="text-sm text-white/60">Redirecting to login...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`bg-white/5 border-white/10 ${errors.email ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>
                  )}
                  <p className="text-xs text-gray-400">Only Gmail addresses are allowed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            )}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
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