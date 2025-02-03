import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface LeadList {
  id: string
  name: string
  prospects: number
  dateAdded: Date
  status?: "active" | "archived"
  lastModified?: Date
}

interface LeadsStore {
  leadLists: LeadList[]
  addLeadList: (list: Omit<LeadList, "id" | "dateAdded">) => void
  removeLeadList: (id: string) => void
  updateLeadList: (id: string, updates: Partial<LeadList>) => void
  archiveLeadList: (id: string) => void
}

export const useLeadsStore = create<LeadsStore>()(
  persist(
    (set) => ({
      leadLists: [],
      addLeadList: (list) =>
        set((state) => ({
          leadLists: [
            ...state.leadLists,
            {
              ...list,
              id: Math.random().toString(36).substr(2, 9),
              dateAdded: new Date(),
              status: "active",
            },
          ],
        })),
      removeLeadList: (id) =>
        set((state) => ({
          leadLists: state.leadLists.filter((list) => list.id !== id),
        })),
      updateLeadList: (id, updates) =>
        set((state) => ({
          leadLists: state.leadLists.map((list) =>
            list.id === id ? { ...list, ...updates, lastModified: new Date() } : list,
          ),
        })),
      archiveLeadList: (id) =>
        set((state) => ({
          leadLists: state.leadLists.map((list) =>
            list.id === id ? { ...list, status: "archived", lastModified: new Date() } : list,
          ),
        })),
    }),
    {
      name: "leads-storage",
    },
  ),
)

