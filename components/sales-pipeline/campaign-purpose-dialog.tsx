"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { Snowflake, Flame, Users, Upload, Database, ArrowRight, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface CampaignPurposeDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CampaignPurposeDialog({ isOpen, onClose }: CampaignPurposeDialogProps) {
  const router = useRouter()
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null)
  const [showLeadSources, setShowLeadSources] = useState(false)

  const purposes = [
    {
      id: "cold",
      title: "Reach Out to Cold Leads",
      description: "Leads that you have never contacted before",
      icon: Snowflake,
    },
    {
      id: "warm",
      title: "Reach Out to Warm Leads",
      description: "Run a Reactivation Campaign or reach out to leads instantly from your Ads/Funnels",
      icon: Flame,
    },
  ]

  const leadSources = [
    {
      id: "database",
      title: "Find Using Lead Database",
      description: "Extract leads from over 400M+ B2B Lead Database",
      icon: Users,
      action: () => router.push("/lead-database"),
    },
    {
      id: "upload",
      title: "Upload Your Own lead database",
      description: "For Reactivation/Existing Cold leads",
      icon: Upload,
      action: () => router.push("/sales-pipeline/upload"),
    },
    {
      id: "crm",
      title: "Import from CRM",
      description: "Connect your CRM to import existing leads",
      icon: Database,
      action: () => router.push("/sales-pipeline/crm-import"),
    },
  ]

  const handlePurposeSelect = (purpose: string) => {
    setSelectedPurpose(purpose)
    setShowLeadSources(true)
  }

  const handleBack = () => {
    setShowLeadSources(false)
    setSelectedPurpose(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] bg-gradient-to-br from-gray-900 to-black border-white/10 p-0 overflow-hidden">
        <div className="relative p-8 backdrop-blur-xl backdrop-filter">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
          <AnimatePresence mode="wait">
            {!showLeadSources ? (
              <motion.div key="purpose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-4xl font-bold text-white mb-8 text-center">What's Your Campaign Purpose?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {purposes.map((purpose) => (
                    <motion.button
                      key={purpose.id}
                      onClick={() => handlePurposeSelect(purpose.id)}
                      className={cn(
                        "flex flex-col items-center justify-center p-8 rounded-xl",
                        "bg-white/5 border-2 border-white/10",
                        "transition-all duration-200",
                        "hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]",
                        "text-center h-full relative overflow-hidden",
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <purpose.icon className="w-16 h-16 mb-6 text-white" />
                      <h3 className="text-2xl font-semibold text-white mb-4">{purpose.title}</h3>
                      <p className="text-white/60">{purpose.description}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="sources" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <button
                  onClick={handleBack}
                  className="mb-6 text-white/60 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
                  Back to Campaign Purpose
                </button>
                <h2 className="text-3xl font-bold text-white mb-6">Choose Your Lead Source</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {leadSources.map((source) => (
                    <motion.button
                      key={source.id}
                      onClick={source.action}
                      className={cn(
                        "flex flex-col items-start justify-between p-6 rounded-xl",
                        "bg-white/5 border-2 border-white/10",
                        "transition-all duration-200",
                        "hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]",
                        "text-left h-full relative overflow-hidden",
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div>
                        <source.icon className="w-12 h-12 mb-4 text-white/80" />
                        <h3 className="text-xl font-semibold text-white mb-2">{source.title}</h3>
                        <p className="text-sm text-white/60">{source.description}</p>
                      </div>
                      <ArrowRight className="absolute bottom-4 right-4 h-6 w-6 text-white/40" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

