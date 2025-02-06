"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "./password-input"

interface AuthFormProps {
  type: "signin" | "signup" | "forgot-password"
  onSubmit: (data: any) => Promise<void>
  isLoading: boolean
}

export function AuthForm({ type, onSubmit, isLoading }: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === "signup" && (
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
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-white/5 border-white/10"
          required
        />
      </div>
      {type !== "forgot-password" && (
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
      )}
      {type === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <PasswordInput
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>
      )}
      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
        {isLoading
          ? type === "signin"
            ? "Signing in..."
            : type === "signup"
            ? "Creating account..."
            : "Sending..."
          : type === "signin"
          ? "Sign in"
          : type === "signup"
          ? "Create account"
          : "Send reset instructions"}
      </Button>
    </form>
  )
} 