"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { MoreVertical, Trash2, Eye, Wand2, Users } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { KnowledgeBaseContentDialog } from "@/components/knowledge-base/knowledge-base-content-dialog"
import { AssignKnowledgeBaseDialog } from "@/components/knowledge-base/assign-knowledge-base-dialog"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface KnowledgeBase {
  id: string
  name: string
  description: string
  dateAdded: Date
}

export default function KnowledgeBasePage() {
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false) // State for Create KB dialog
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([])
  const { state: sidebarState } = useSidebar()
  const [listWidth, setListWidth] = useState(sidebarState === "collapsed" ? "1000px" : "800px")
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [baseToDelete, setBaseToDelete] = useState<string | null>(null)
  const [viewBase, setViewBase] = useState<KnowledgeBase | null>(null)

  const handleDelete = (id: string) => {
    setKnowledgeBases((prev) => prev.filter((base) => base.id !== id))
    setBaseToDelete(null)
  }

  const handleAddKnowledgeBase = (newBase: KnowledgeBase) => {
    setKnowledgeBases((prev) => [...prev, newBase])
  }

  const handleCreateKnowledgeBase = () => {
    setShowCreateDialog(true)
  }

  return (
    <div className="min-h-screen w-full bg-[#09090B]">
      <div className="w-full px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-medium text-white">Knowledge Base</h1>
          <Button
            onClick={() => setShowAssignDialog(true)}
            className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-2 text-sm font-medium"
          >
            Add Knowledge Base
          </Button>
        </div>

        {/* Knowledge Base Selection */}
        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <Card
            className="bg-[#2b2b2b] text-white cursor-pointer hover:bg-[#3b3b3b] transition-colors"
            onClick={() => setShowAssignDialog(true)}
          >
            <CardContent className="flex flex-col items-center justify-center p-8">
              <Users className="h-16 w-16 mb-6" />
              <CardTitle className="text-2xl font-semibold mb-4">Assign a Knowledge Base</CardTitle>
              <CardDescription className="text-center text-lg text-[#c6c6c6]">
                Use an existing knowledge base from your KB Section
              </CardDescription>
            </CardContent>
          </Card>

          <Card
            className="bg-[#2b2b2b] text-white cursor-pointer hover:bg-[#3b3b3b] transition-colors"
            onClick={handleCreateKnowledgeBase}
          >
            <CardContent className="flex flex-col items-center justify-center p-8">
              <Wand2 className="h-16 w-16 mb-6" />
              <CardTitle className="text-2xl font-semibold mb-4">Create a Knowledge Base using AI</CardTitle>
              <CardDescription className="text-center text-lg text-[#c6c6c6]">
                Generate the perfect KB in just 10 minutes
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Existing Knowledge Bases */}
        {knowledgeBases.length > 0 && (
          <div className="space-y-4 w-full">
            <AnimatePresence>
              {knowledgeBases.map((base) => (
                <motion.div
                  key={base.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-between bg-white rounded-lg px-6 py-4 group hover:bg-white/90 transition-all duration-300"
                  style={{ width: listWidth }}
                >
                  <div className="flex-1">
                    <span className="text-black text-lg font-medium">{base.name}</span>
                    <p className="text-black/60 text-sm">{base.description}</p>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="text-black/60 text-sm">Added on {base.dateAdded.toLocaleDateString()}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          className="h-9 w-9 p-0 bg-black text-white hover:bg-black/90 rounded-md"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setViewBase(base)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            setBaseToDelete(base.id)
                            setDeleteConfirmOpen(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <AssignKnowledgeBaseDialog
        isOpen={showAssignDialog}
        onClose={() => setShowAssignDialog(false)}
        onAssign={handleAddKnowledgeBase}
      />
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this knowledge base?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the knowledge base and remove the data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => baseToDelete && handleDelete(baseToDelete)}>
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {viewBase && (
        <KnowledgeBaseContentDialog
          isOpen={true}
          onClose={() => setViewBase(null)}
          knowledgeBase={viewBase}
          onDelete={() => {
            setBaseToDelete(viewBase.id)
            setViewBase(null)
            setDeleteConfirmOpen(true)
          }}
        />
      )}

      {/* Create Knowledge Base Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={() => setShowCreateDialog(false)}>
        <DialogContent className="max-w-md bg-[#09090b] text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Create Knowledge Base</DialogTitle>
          </DialogHeader>
          {/* ... (rest of the content) ... */}
        </DialogContent>
      </Dialog>
    </div>
  )
}

