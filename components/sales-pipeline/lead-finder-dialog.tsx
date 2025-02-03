"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface LeadFinderDialogProps {
  isOpen: boolean
  onClose: () => void
}

interface LeadPreview {
  name: string
  position: string
  company: string
  matchPercentage: number
}

export function LeadFinderDialog({ isOpen, onClose }: LeadFinderDialogProps) {
  const router = useRouter()
  const [listName, setListName] = useState("")
  const [formData, setFormData] = useState({
    jobTitle: "",
    country: "",
    state: "",
    industry: "",
    industryKeywords: "",
    city: "",
  })

  // Simulated lead previews
  const [previewLeads, setPreviewLeads] = useState<LeadPreview[]>([
    {
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechCorp",
      matchPercentage: 94,
    },
    {
      name: "Michael Chen",
      position: "CTO",
      company: "InnovateX",
      matchPercentage: 92,
    },
    {
      name: "Emily Davis",
      position: "VP Engineering",
      company: "FutureTech",
      matchPercentage: 89,
    },
  ])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Simulate real-time lead updates
    if (value.length > 0) {
      // This would typically be an API call to get matching leads
      setTimeout(() => {
        const newLeads = [...previewLeads]
        newLeads.forEach((lead) => {
          lead.matchPercentage = Math.floor(Math.random() * 10) + 85
        })
        setPreviewLeads(newLeads)
      }, 500)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0 bg-black border-white/10">
        <div className="p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold text-white">Find the Perfect Leads</h2>
              <Button
                onClick={() => {
                  // Handle saving changes
                }}
                className="bg-white text-black hover:bg-white/90 rounded-full px-8"
              >
                Save Changes
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Left Panel - ICP Criteria */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 bg-zinc-900/50 rounded-2xl p-6 backdrop-blur-xl border border-white/10"
              >
                <Input
                  placeholder="Lead List Name"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-12 text-lg"
                />

                {Object.entries(formData).map(([field, value]) => (
                  <div key={field} className="space-y-2">
                    <label className="text-white/60 text-sm">{field.replace(/([A-Z])/g, " $1").trim()}</label>
                    <Input
                      value={value}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                    />
                  </div>
                ))}
              </motion.div>

              {/* Right Panel - Lead Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-zinc-900/50 rounded-2xl p-6 backdrop-blur-xl border border-white/10"
              >
                <h3 className="text-2xl font-semibold text-white mb-6">Preview Leads</h3>
                <div className="space-y-4">
                  <AnimatePresence>
                    {previewLeads.map((lead, index) => (
                      <motion.div
                        key={lead.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between bg-white/5 rounded-xl p-4"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 border border-white/10">
                            <AvatarFallback className="bg-white/5 text-white">
                              {lead.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-white font-medium">{lead.name}</h4>
                            <p className="text-white/60 text-sm">
                              {lead.position} | {lead.company}
                            </p>
                          </div>
                        </div>
                        <div className="text-white font-medium">{lead.matchPercentage}%</div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  // Handle lead extraction
                }}
                className="bg-white text-black hover:bg-white/90 rounded-full px-8"
              >
                Confirm Extraction
              </Button>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

