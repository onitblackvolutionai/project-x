"use client"

import { Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AISuggestions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 h-4 w-4" />
          AI-Suggested Optimizations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Increase email frequency for Campaign 2 to improve engagement.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Adjust call scripts for Campaign 1 to focus more on pain points.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Consider A/B testing subject lines in Campaign 3 emails.</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

