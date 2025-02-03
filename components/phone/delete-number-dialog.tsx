"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface DeleteNumberDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteNumberDialog({ isOpen, onClose, onConfirm }: DeleteNumberDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-zinc-800 border-none p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-red-500/10 rounded-full">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>

          <h2 className="text-xl font-semibold text-white">Delete Phone Number</h2>

          <p className="text-white/70">
            Are you sure you want to delete this phone number? This action cannot be undone.
          </p>

          <div className="flex gap-3 w-full mt-4">
            <Button variant="ghost" onClick={onClose} className="flex-1 text-white hover:bg-white/5">
              Cancel
            </Button>
            <Button onClick={onConfirm} className="flex-1 bg-red-500 text-white hover:bg-red-600">
              Delete Permanently
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

