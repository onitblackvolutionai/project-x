import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface Article {
  id: string
  title: string
  content: string
  category: string
}

interface HelpArticleProps {
  article: Article
}

export function HelpArticle({ article }: HelpArticleProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="mb-4 hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          <p className="text-gray-600 mb-4">{article.content.substring(0, 150)}...</p>
          <Link href={`/help-center/article/${article.id}`}>
            <Button variant="outline" className="group">
              Read More
              <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}

