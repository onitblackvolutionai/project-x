"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Users, Eye, MoreVertical, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { LeadSourceDialog } from "@/components/sales-pipeline/lead-source-dialog"
import { CSVUploadDialog } from "@/components/sales-pipeline/csv-upload-dialog"
import { ViewLeadListDialog } from "@/components/lead-database/view-lead-list-dialog"
import { useSidebar } from "@/components/ui/sidebar"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LeadList {
  id: string
  name: string
  prospects: number
  dateAdded: Date
  source: "upload" | "database" | "crm"
}

export default function SalesPipelinePage() {
  const { state: sidebarState } = useSidebar()
  const [leadLists, setLeadLists] = useState<LeadList[]>([
    {
      id: "1",
      name: "Bakeries in US",
      prospects: 10000,
      dateAdded: new Date(),
      source: "database",
    },
  ])
  const [showSourceDialog, setShowSourceDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const { toast } = useToast()
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [listToDelete, setListToDelete] = useState<string | null>(null)
  const [viewList, setViewList] = useState<LeadList | null>(null)

  const handleDelete = (listId: string) => {
    setLeadLists((prev) => prev.filter((list) => list.id !== listId))
    setDeleteConfirmOpen(false)
    setListToDelete(null)
  }

  const handleUploadComplete = (name: string, file: File) => {
    const newList: LeadList = {
      id: Math.random().toString(36).substring(7),
      name,
      prospects: Math.floor(Math.random() * 10000) + 1000, // This would come from actual file processing
      dateAdded: new Date(),
      source: "upload",
    }
    setLeadLists((prev) => [...prev, newList])
  }

  const listWidth = sidebarState === "collapsed" ? "1000px" : "800px"

  return (
    <div className="min-h-screen w-full bg-black px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex h-24 items-center justify-between">
          <h1 className="text-4xl font-medium text-white">Leads</h1>
          <Button
            onClick={() => setShowSourceDialog(true)}
            className="h-10 rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-white/90"
          >
            Add Lead List
          </Button>
        </div>

        <div className="space-y-4 mt-6">
          <AnimatePresence>
            {leadLists.map((list) => (
              <motion.div
                key={list.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between bg-white rounded-lg px-6 py-4 group hover:bg-white/90 transition-all duration-300"
                style={{ width: listWidth }}
              >
                <div className="flex-1">
                  <span className="text-black text-lg font-medium">{list.name}</span>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-black/60" />
                    <span className="text-black text-base">{list.prospects.toLocaleString()} Prospects</span>
                  </div>
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
                      <DropdownMenuItem onSelect={() => setViewList(list)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => {
                          setListToDelete(list.id)
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
      </div>

      <LeadSourceDialog
        isOpen={showSourceDialog}
        onClose={() => setShowSourceDialog(false)}
        onSelectUpload={() => {
          setShowSourceDialog(false)
          setShowUploadDialog(true)
        }}
      />

      <CSVUploadDialog
        isOpen={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
        onUploadComplete={handleUploadComplete}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this lead list?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the lead list and remove the data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => listToDelete && handleDelete(listToDelete)}>
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {viewList && (
        <ViewLeadListDialog
          isOpen={true}
          onClose={() => setViewList(null)}
          leadList={viewList}
          onDelete={() => {
            setListToDelete(viewList.id)
            setViewList(null)
            setDeleteConfirmOpen(true)
          }}
        />
      )}
    </div>
  )
}

