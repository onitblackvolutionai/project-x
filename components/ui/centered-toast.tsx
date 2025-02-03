"use client"

import * as React from "react"
import { Toaster } from "@/components/ui/toaster"
import {
  Toast,
  ToastProps,
  ToastActionElement,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "@/components/ui/toast"

export function CenteredToast() {
  return (
    <Toaster
      position="center"
      toastOptions={{
        className: "fixed inset-0 flex items-center justify-center pointer-events-none",
        duration: 2000,
      }}
    >
      {(toast) => (
        <Toast
          {...toast}
          className="bg-white text-black font-semibold px-6 py-4 rounded-lg shadow-lg pointer-events-auto"
        />
      )}
    </Toaster>
  )
}

