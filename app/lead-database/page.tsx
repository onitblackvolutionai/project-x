"use client"

import { useState } from "react"
import { LeadTableHeader } from "@/components/lead-database/lead-table-header"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { LeadSourceDialog } from "@/components/lead-database/lead-source-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { Users, MoreVertical, Trash2, Eye } from "lucide-react"
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
import { ViewLeadListDialog } from "@/components/lead-database/view-lead-list-dialog"

interface LeadList {
  id: string
  name: string
  prospects: number
  dateAdded: Date
  source: "upload" | "database" | "crm"
}

export default function LeadDatabasePage() {
  const { toast } = useToast()
  const [showSourceDialog, setShowSourceDialog] = useState(false)
  const [leadLists, setLeadLists] = useState<LeadList[]>([])
  const { state: sidebarState } = useSidebar()
  const [listWidth, setListWidth] = useState("800px")
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [listToDelete, setListToDelete] = useState<string | null>(null)
  const [viewList, setViewList] = useState<LeadList | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAll, setSelectedAll] = useState(false)

  const handleDelete = (id: string) => {
    setLeadLists((prev) => prev.filter((list) => list.id !== id))
    setListToDelete(null)
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    // Implement search logic here
  }

  const handleFilter = () => {
    // Implement filter logic here
    toast({
      title: "Filter",
      description: "Filter functionality coming soon",
    })
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedAll(checked)
    // Implement select all logic here
  }

  return (
    <div className="min-h-screen w-full bg-[#09090B]">
      <div className="w-full px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-medium text-white">Leads</h1>
          <Button
            onClick={() => setShowSourceDialog(true)}
            className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-2 text-sm font-medium"
          >
            Add Lead List
          </Button>
        </div>
        <div className="w-full bg-white">
          <LeadTableHeader
            onSearch={handleSearch}
            onFilter={handleFilter}
            onSelectAll={handleSelectAll}
            className="px-6 py-4"
          />
          {leadLists.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="rounded-full bg-white/5 p-4 mb-4">
                <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No leads yet</h3>
              <p className="text-white/60 mb-6 max-w-sm">
                Get started by adding your first lead list. You can import leads from various sources or upload your own
                database.
              </p>
              <Button onClick={() => setShowSourceDialog(true)} className="bg-white text-black hover:bg-white/90">
                Add Lead List
              </Button>
            </div>
          ) : (
            <div className="space-y-4 w-full">
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
          )}
        </div>
      </div>

      <LeadSourceDialog isOpen={showSourceDialog} onClose={() => setShowSourceDialog(false)} />

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

