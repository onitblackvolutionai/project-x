"use client"

import { useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const campaignSteps = [
  { id: "purpose", name: "Define Purpose" },
  { id: "audience", name: "Select Audience" },
  { id: "channels", name: "Choose Channels" },
  { id: "content", name: "Create Content" },
  { id: "schedule", name: "Set Schedule" },
  { id: "test", name: "Test Campaign" },
  { id: "launch", name: "Launch Campaign" },
]

const DraggableStep = ({ id, name, index, moveStep }) => {
  const [, drag] = useDrag({
    type: "STEP",
    item: { id, index },
  })

  const [, drop] = useDrop({
    accept: "STEP",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveStep(draggedItem.index, index)
        draggedItem.index = index
      }
    },
  })

  return (
    <div ref={(node) => drag(drop(node))}>
      <Card className="mb-2 cursor-move">
        <CardContent className="p-4">{name}</CardContent>
      </Card>
    </div>
  )
}

export function DragAndDropCampaignBuilder({ onNext, onPrev }) {
  const [steps, setSteps] = useState(campaignSteps)

  const moveStep = (fromIndex, toIndex) => {
    const updatedSteps = [...steps]
    const [movedStep] = updatedSteps.splice(fromIndex, 1)
    updatedSteps.splice(toIndex, 0, movedStep)
    setSteps(updatedSteps)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Customize Your Campaign Flow</h2>
      <p className="text-muted-foreground">Drag and drop the steps to customize your campaign flow.</p>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <DraggableStep key={step.id} id={step.id} name={step.name} index={index} moveStep={moveStep} />
        ))}
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

