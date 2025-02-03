import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface Category {
  id: string
  name: string
}

interface HelpCategoryProps {
  category: Category
}

export function HelpCategory({ category }: HelpCategoryProps) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <Button
        variant="ghost"
        className="w-full justify-between mb-2 py-4 text-left hover:bg-gray-100 transition-colors duration-300"
      >
        {category.name}
        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </motion.div>
  )
}

