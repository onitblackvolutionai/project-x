"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ProgressTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Campaign 1</span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <Progress value={75} />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Campaign 2</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <Progress value={45} />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Campaign 3</span>
              <span className="text-sm font-medium">90%</span>
            </div>
            <Progress value={90} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

