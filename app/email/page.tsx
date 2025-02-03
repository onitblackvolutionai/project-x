"use client"

import { useState } from "react"
import { EmailAccountCard } from "@/components/email/email-account-card"
import { AddAccountDialog } from "@/components/email/add-account-dialog"
import { Button } from "@/components/ui/button"
import { useEmailAccounts } from "@/store/email-accounts"
import { motion, AnimatePresence } from "framer-motion"

export default function EmailAccountsPage() {
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const { accounts, addAccount } = useEmailAccounts()

  const handleAddAccount = (accountData: any) => {
    addAccount({
      name: accountData.name,
      email: accountData.email,
      stats: { sent: 0, opened: 0, replied: 0 },
    })
    setIsAddAccountOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold">Email Accounts</h1>
          <Button
            onClick={() => setIsAddAccountOpen(true)}
            className="bg-white text-black hover:bg-white/90 rounded-full px-8"
          >
            Add Accounts
          </Button>
        </div>

        <div className="space-y-4 bg-black/40 backdrop-blur-xl backdrop-saturate-150 rounded-3xl p-8 border border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {accounts.map((account, index) => (
              <motion.div
                key={account.email}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <EmailAccountCard
                  name={account.name}
                  email={account.email}
                  stats={account.stats}
                  avatarUrl={account.avatarUrl}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AddAccountDialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen} onSave={handleAddAccount} />
      </div>
    </div>
  )
}

