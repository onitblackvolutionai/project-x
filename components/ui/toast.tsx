import type * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ToastProps {
  message: string
  isVisible: boolean
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 bg-[#ffffff] text-[#09090b] px-4 py-2 rounded-md shadow-lg z-50"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

