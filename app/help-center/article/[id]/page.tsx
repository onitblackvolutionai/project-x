"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useSettings } from "@/components/providers/settings-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Clock, Tag } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Article {
  id: string
  title: string
  content: string
  category: string
  createdAt: string
}

export default function ArticlePage() {
  const { settings } = useSettings()
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    // Fetch the article from your API or CMS
    // This is a mock implementation
    const mockArticle: Article = {
      id: params.id as string,
      title: "Sample Article",
      content:
        "This is a sample article content. In a real implementation, this would be fetched from your API or CMS.",
      category: "General",
      createdAt: "2023-05-20",
    }
    setArticle(mockArticle)
  }, [params.id])

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container section">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/help-center">
            <Button variant="ghost" className="mb-8">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Help Center
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle
                className="text-3xl font-bold"
                style={{ color: settings.workspaces[settings.currentWorkspace].whiteLabelSettings.primaryColor }}
              >
                {article.title}
              </CardTitle>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Clock className="mr-2 h-4 w-4" />
                <span>Published on {article.createdAt}</span>
                <Tag className="ml-4 mr-2 h-4 w-4" />
                <span>{article.category}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

