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

export default function SignInPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({ email: "", password: "" })

    try {
      const response = await fetch('/auth/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'signin',
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.notRegistered) {
          setErrors({ ...errors, email: "This email is not registered" })
          toast({
            title: "Not Registered",
            description: "Please sign up first to create an account",
            variant: "destructive",
            action: (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => router.push('/auth/signup')}
              >
                Sign Up
              </Button>
            ),
          })
          return
        }

        if (data.invalidPassword) {
          setErrors({ ...errors, password: "Incorrect password" })
          toast({
            title: "Error",
            description: "The password you entered is incorrect",
            variant: "destructive",
          })
          return
        }

        toast({
          title: "Error",
          description: data.error || "Failed to sign in",
          variant: "destructive",
        })
        return
      }

      // Store the session
      if (data.session) {
        localStorage.setItem('session', data.session.access_token)
      }

      toast({
        title: "Success",
        description: "Signed in successfully!",
      })

      // Redirect to dashboard immediately
      router.push('/Home/dashboard')
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign in",
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
            <CardTitle className="text-2xl text-white">Sign in</CardTitle>
            <CardDescription>Enter your email and password to sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`bg-white/5 border-white/10 ${errors.email ? 'border-red-500' : ''}`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`bg-white/5 border-white/10 ${errors.password ? 'border-red-500' : ''}`}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 font-medium">{errors.password}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 