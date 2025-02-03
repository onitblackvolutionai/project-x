"use client"

import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface LeadTableHeaderProps {
  onSearch?: (value: string) => void
  onFilter?: () => void
  onSelectAll?: (checked: boolean) => void
  className?: string
}

export function LeadTableHeader({ onSearch, onFilter, onSelectAll, className }: LeadTableHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between">
        <div className="relative w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search"
            onChange={(e) => onSearch?.(e.target.value)}
            className="pl-9 bg-white border-gray-200"
          />
        </div>
        <Button variant="ghost" onClick={onFilter} className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Column Headers */}
      <div className="flex items-center border-y border-gray-200 bg-gray-50/50">
        <div className="flex items-center px-4 py-3 w-10">
          <Checkbox onCheckedChange={(checked) => onSelectAll?.(checked as boolean)} className="border-gray-300" />
        </div>
        <div className="flex-1 grid grid-cols-10 gap-4">
          <div className="text-xs font-medium text-gray-500 uppercase">Edit</div>
          <div className="text-xs font-medium text-gray-500 uppercase">First Name</div>
          <div className="text-xs font-medium text-gray-500 uppercase">Last Name</div>
          <div className="text-xs font-medium text-gray-500 uppercase">Email</div>
          <div className="text-xs font-medium text-gray-500 uppercase">Email Provider</div>
          <div className="text-xs font-medium text-gray-500 uppercase">Company Name</div>
          <div className="text-xs font-medium text-gray-500 uppercase">Website</div>
          <div className="text-xs font-medium text-gray-500 uppercase">Status</div>
          <div className="text-xs font-medium text-gray-500 uppercase">Lead Owner</div>
          <div className="text-xs font-medium text-gray-500 uppercase">Belongs To</div>
        </div>
      </div>
    </div>
  )
}

