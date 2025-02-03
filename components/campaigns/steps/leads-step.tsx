import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useInfiniteLeads } from "@/hooks/use-infinite-leads"
import { useInView } from "react-intersection-observer"
import { Checkbox } from "@/components/ui/checkbox"
import React from "react" // Added import for React

interface LeadsStepProps {
  onNext: () => void
  onPrev: () => void
}

export function LeadsStep({ onNext, onPrev }: LeadsStepProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteLeads()
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set())
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const toggleLeadSelection = (id: string) => {
    setSelectedLeads((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Select Leads</h2>
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.leads.map((list) => (
                <div key={list.id} className="flex items-center space-x-2 p-4 border rounded-lg bg-muted">
                  <Checkbox
                    id={list.id}
                    checked={selectedLeads.has(list.id)}
                    onCheckedChange={() => toggleLeadSelection(list.id)}
                  />
                  <label
                    htmlFor={list.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {list.name} ({list.prospects} prospects)
                  </label>
                </div>
              ))}
            </React.Fragment>
          ))}
          {isFetchingNextPage && (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}
          <div ref={ref} className="h-1" />
        </div>
      )}
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">
          Previous
        </Button>
        <Button onClick={onNext} disabled={selectedLeads.size === 0}>
          Next
        </Button>
      </div>
    </div>
  )
}

