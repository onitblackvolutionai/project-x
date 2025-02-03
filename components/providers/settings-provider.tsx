"use client"

import type * as React from "react"
import { createContext, useContext } from "react"
import { useSettings as useZustandSettings } from "@/store/settings-store"

interface SettingsContextProps {
  settings: ReturnType<typeof useZustandSettings>
  updateSettings: (newSettings: any) => Promise<void>
}

const SettingsContext = createContext<SettingsContextProps | null>(null)

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const settings = useZustandSettings()

  const updateSettings = async (newSettings: any) => {
    try {
      const response = await fetch("/api/settings/custom-domain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "update", ...newSettings }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update settings")
      }
    } catch (error) {
      // Handle error and potentially revert settings in the UI
      console.error("Error updating settings:", error)
      throw error // Re-throw the error to be caught by the component
    }
  }

  const contextValue = { settings, updateSettings }
  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

