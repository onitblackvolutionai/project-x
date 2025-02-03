"use client"

import { useState, useEffect } from "react"
import { useSettings } from "@/components/providers/settings-provider"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpArticle } from "@/components/help-center/help-article"
import { HelpCategory } from "@/components/help-center/help-category"
import { Search, Lightbulb, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

interface Article {
  id: string
  title: string
  content: string
  category: string
}

interface Category {
  id: string
  name: string
}

export default function HelpCenterPage() {
  const { settings } = useSettings()
  const [searchQuery, setSearchQuery] = useState("")
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])

  useEffect(() => {
    // Fetch articles and categories from your API or CMS
    // This is a mock implementation
    setArticles([
      {
        id: "1",
        title: "Getting Started",
        content: "Learn how to get started with our platform.",
        category: "general",
      },
      {
        id: "2",
        title: "Creating a Campaign",
        content: "Step-by-step guide to create a campaign.",
        category: "campaigns",
      },
      {
        id: "3",
        title: "Managing Contacts",
        content: "Learn how to manage your contacts effectively.",
        category: "contacts",
      },
    ])

    setCategories([
      { id: "general", name: "General" },
      { id: "campaigns", name: "Campaigns" },
      { id: "contacts", name: "Contacts" },
    ])
  }, [])

  useEffect(() => {
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredArticles(filtered)
  }, [searchQuery, articles])

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container section">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1
            className="text-4xl font-bold mb-8 text-center"
            style={{ color: settings.workspaces[settings.currentWorkspace].whiteLabelSettings.primaryColor }}
          >
            {settings.workspaces[settings.currentWorkspace].whiteLabelSettings.companyName} Help Center
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg rounded-full shadow-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
          </div>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Lightbulb className="mr-2 h-6 w-6" />
                  Popular Articles
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => <HelpArticle key={article.id} article={article} />)
                ) : (
                  <p className="text-center text-gray-500 py-8">No articles found. Try adjusting your search.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <BookOpen className="mr-2 h-6 w-6" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                {categories.map((category) => (
                  <HelpCategory key={category.id} category={category} />
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

