import { useInfiniteQuery } from "react-query"
import { useLeadsStore } from "@/store/leads-store"

const ITEMS_PER_PAGE = 20

export function useInfiniteLeads() {
  const { leadLists } = useLeadsStore()

  return useInfiniteQuery(
    "leads",
    ({ pageParam = 0 }) => {
      const start = pageParam * ITEMS_PER_PAGE
      const end = start + ITEMS_PER_PAGE
      return Promise.resolve({
        leads: leadLists.slice(start, end),
        nextPage: end < leadLists.length ? pageParam + 1 : undefined,
      })
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    },
  )
}

