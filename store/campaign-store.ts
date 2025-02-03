import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CampaignState {
  campaigns: {
    [id: string]: {
      name: string
      description: string
      channels: string[]
      blueprint: {
        dailyQuota: number
        selectedDays: string[]
        outreachEmail: string
        workingHoursStart: string
        workingHoursEnd: string
        timezone: string
      }
      knowledgeVault: {
        selectedKnowledgeBase: any
      }
      leads: {
        uploadedFile: string | null
      }
      qualifyLeads: {
        criteria: string
      }
      channels: {
        selectedChannels: string[]
      }
      craftCenter: {
        activeTab: string
        callingScripts: { id: string; content: string }[]
        emailTemplates: { id: string; content: string }[]
        smsTemplates: { id: string; content: string }[]
      }
      aiAgent: {
        selectedAgent: string | null
      }
      test: {
        name: string
        phoneNumber: string
        email: string
      }
    }
  }
  setField: (campaignId: string, section: string, field: string, value: any) => void
  getCampaign: (id: string) => any
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set, get) => ({
      campaigns: {},
      setField: (campaignId, section, field, value) =>
        set((state) => ({
          campaigns: {
            ...state.campaigns,
            [campaignId]: {
              ...state.campaigns[campaignId],
              [section]: {
                ...state.campaigns[campaignId]?.[section],
                [field]: value,
              },
            },
          },
        })),
      getCampaign: (id) => get().campaigns[id],
    }),
    {
      name: "campaign-storage",
    },
  ),
)

