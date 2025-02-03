import { create } from "zustand"

interface EmailAccount {
  name: string
  email: string
  avatarUrl?: string
  stats: {
    sent: number
    opened: number
    replied: number
  }
}

interface EmailAccountsStore {
  accounts: EmailAccount[]
  addAccount: (account: EmailAccount) => void
  removeAccount: (email: string) => void
}

export const useEmailAccounts = create<EmailAccountsStore>((set) => ({
  accounts: [
    {
      name: "Aaroh Jain",
      email: "aarohjain06@gmail.com",
      stats: {
        sent: 156,
        opened: 25,
        replied: 15,
      },
    },
  ],
  addAccount: (account) =>
    set((state) => ({
      accounts: [...state.accounts, account],
    })),
  removeAccount: (email) =>
    set((state) => ({
      accounts: state.accounts.filter((account) => account.email !== email),
    })),
}))

