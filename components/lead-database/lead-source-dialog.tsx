"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { Upload, Database, X, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface LeadSourceDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function LeadSourceDialog({ isOpen, onClose }: LeadSourceDialogProps) {
  const router = useRouter()

  const sources = [
    {
      id: "database",
      title: "Find Using Lead Database",
      description: "Extract leads from over 400M+ B2B Lead Database",
      icon: Users,
      action: () => router.push("/lead-database/finder"),
    },
    {
      id: "upload",
      title: "Upload Your Own lead database",
      description: "For Reactivation/Existing Cold leads",
      icon: Upload,
      action: () => router.push("/lead-database/upload"),
    },
    {
      id: "crm",
      title: "Import from CRM",
      description: "Connect your CRM to import existing leads",
      icon: Database,
      action: () => router.push("/lead-database/crm-import"),
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] bg-black/40 border-white/10 p-0 overflow-hidden">
        <div className="relative p-8 backdrop-blur-xl backdrop-filter bg-gradient-to-br from-gray-900/50 to-black/50">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold text-white mb-6">Add Lead List</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sources.map((source) => (
              <motion.button
                key={source.id}
                onClick={source.action}
                className={cn(
                  "flex flex-col items-start justify-between p-6 rounded-xl",
                  "border-2 border-white/10 bg-white/5",
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
              </motion.button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

