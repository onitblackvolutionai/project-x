import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ThemeMode = "light" | "dark" | "system"

interface SettingsState {
  // Appearance
  themeMode: ThemeMode
  primaryColor: string
  fontSize: number
  borderRadius: number
  animations: boolean
  customCSS: string

  // General
  language: string
  timezone: string
  dateFormat: string

  // Notifications
  emailNotifications: boolean
  pushNotifications: boolean
  soundEnabled: boolean
  notificationTypes: {
    messages: boolean
    calls: boolean
    updates: boolean
    marketing: boolean
  }

  // Security
  twoFactorEnabled: boolean
  sessionTimeout: number
  ipWhitelist: string[]

  // Team
  teamName: string
  teamSize: number
  planType: "starter" | "pro" | "enterprise"

  // White Label
  companyName: string
  logo: string
  brandColors: {
    primary: string
    secondary: string
    accent: string
  }
  whiteLabelSettings: {
    companyName: string
    logo: string
    favicon: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    font: string
    customDomain: string
    emailFromAddress: string
  }

  // Actions
  setAppearance: (
    settings: Partial<{
      themeMode: ThemeMode
      primaryColor: string
      fontSize: number
      borderRadius: number
      animations: boolean
      customCSS: string
    }>,
  ) => void

  setNotifications: (
    settings: Partial<{
      emailNotifications: boolean
      pushNotifications: boolean
      soundEnabled: boolean
      notificationTypes: Partial<{
        messages: boolean
        calls: boolean
        updates: boolean
        marketing: boolean
      }>
    }>,
  ) => void

  setSecurity: (
    settings: Partial<{
      twoFactorEnabled: boolean
      sessionTimeout: number
      ipWhitelist: string[]
    }>,
  ) => void

  setTeam: (
    settings: Partial<{
      teamName: string
      teamSize: number
      planType: "starter" | "pro" | "enterprise"
    }>,
  ) => void

  setWhiteLabel: (
    settings: Partial<{
      companyName: string
      logo: string
      brandColors: Partial<{
        primary: string
        secondary: string
        accent: string
      }>
    }>,
  ) => void
  setWhiteLabelSettings: (settings: Partial<SettingsState["workspaces"][string]["whiteLabelSettings"]>) => void
  currentWorkspace: string
  workspaces: {
    [key: string]: {
      whiteLabelSettings: {
        companyName: string
        logo: string
        favicon: string
        primaryColor: string
        secondaryColor: string
        accentColor: string
        font: string
        customDomain: string
        emailFromAddress: string
      }
      // Add other workspace-specific settings here
    }
  }
  setCurrentWorkspace: (workspace: string) => void
}

const initialState: SettingsState = {
  currentWorkspace: "default",
  workspaces: {
    default: {
      whiteLabelSettings: {
        companyName: "",
        logo: "",
        favicon: "",
        primaryColor: "#6B2FED",
        secondaryColor: "#4B5563",
        accentColor: "#10B981",
        font: "Inter",
        customDomain: "",
        emailFromAddress: "",
      },
    },
  },
  setCurrentWorkspace: () => {},
  setWhiteLabelSettings: () => {},
  // Appearance defaults
  themeMode: "system",
  primaryColor: "#6B2FED",
  fontSize: 16,
  borderRadius: 8,
  animations: true,
  customCSS: "",

  // General defaults
  language: "en",
  timezone: "UTC",
  dateFormat: "MM/DD/YYYY",

  // Notification defaults
  emailNotifications: true,
  pushNotifications: false,
  soundEnabled: true,
  notificationTypes: {
    messages: true,
    calls: true,
    updates: true,
    marketing: false,
  },

  // Security defaults
  twoFactorEnabled: false,
  sessionTimeout: 30,
  ipWhitelist: [],

  // Team defaults
  teamName: "",
  teamSize: 1,
  planType: "starter",

  // White Label defaults
  companyName: "",
  logo: "",
  brandColors: {
    primary: "#6B2FED",
    secondary: "#4B5563",
    accent: "#10B981",
  },
  whiteLabelSettings: {
    companyName: "",
    logo: "",
    favicon: "",
    primaryColor: "#6B2FED",
    secondaryColor: "#4B5563",
    accentColor: "#10B981",
    font: "Inter",
    customDomain: "",
    emailFromAddress: "",
  },
}

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setAppearance: (settings) =>
        set((state) => ({
          ...state,
          ...settings,
        })),

      setNotifications: (settings) =>
        set((state) => ({
          ...state,
          ...settings,
          notificationTypes: {
            ...state.notificationTypes,
            ...settings.notificationTypes,
          },
        })),

      setSecurity: (settings) =>
        set((state) => ({
          ...state,
          ...settings,
        })),

      setTeam: (settings) =>
        set((state) => ({
          ...state,
          ...settings,
        })),

      setWhiteLabel: (settings) =>
        set((state) => ({
          ...state,
          ...settings,
          brandColors: {
            ...state.brandColors,
            ...settings.brandColors,
          },
        })),
      setWhiteLabelSettings: (settings) =>
        set((state) => ({
          workspaces: {
            ...state.workspaces,
            [state.currentWorkspace]: {
              ...state.workspaces[state.currentWorkspace],
              whiteLabelSettings: {
                ...state.workspaces[state.currentWorkspace].whiteLabelSettings,
                ...settings,
              },
            },
          },
        })),
      setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
    }),
    {
      name: "settings-storage",
    },
  ),
)

