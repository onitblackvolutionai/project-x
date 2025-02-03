"use client"

import { useState, useEffect } from "react"
import { useSettings } from "@/components/providers/settings-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Trash2, Edit, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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

export default function HelpCenterAdminPage() {
  const { settings } = useSettings()
  const { toast } = useToast()
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [newArticle, setNewArticle] = useState<Omit<Article, "id">>({ title: "", content: "", category: "" })
  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({ name: "" })
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

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

  const handleAddArticle = () => {
    const newId = (articles.length + 1).toString()
    setArticles([...articles, { ...newArticle, id: newId }])
    setNewArticle({ title: "", content: "", category: "" })
    toast({
      title: "Article added",
      description: "The article has been successfully added.",
    })
  }

  const handleAddCategory = () => {
    const newId = (categories.length + 1).toString()
    setCategories([...categories, { ...newCategory, id: newId }])
    setNewCategory({ name: "" })
    toast({
      title: "Category added",
      description: "The category has been successfully added.",
    })
  }

  const handleUpdateArticle = () => {
    if (editingArticle) {
      setArticles(articles.map((a) => (a.id === editingArticle.id ? editingArticle : a)))
      setEditingArticle(null)
      toast({
        title: "Article updated",
        description: "The article has been successfully updated.",
      })
    }
  }

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id))
    toast({
      title: "Article deleted",
      description: "The article has been successfully deleted.",
    })
  }

  const handleUpdateCategory = () => {
    if (editingCategory) {
      setCategories(categories.map((c) => (c.id === editingCategory.id ? editingCategory : c)))
      setEditingCategory(null)
      toast({
        title: "Category updated",
        description: "The category has been successfully updated.",
      })
    }
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id))
    toast({
      title: "Category deleted",
      description: "The category has been successfully deleted.",
    })
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container section">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          style={{ color: settings.workspaces[settings.currentWorkspace].whiteLabelSettings.primaryColor }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Help Center Admin
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Edit className="mr-2 h-6 w-6" />
                  Articles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {articles.map((article) => (
                    <motion.div
                      key={article.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="font-medium">{article.title}</span>
                      <div>
                        <Button variant="ghost" size="sm" onClick={() => setEditingArticle(article)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteArticle(article.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-6 w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Article
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Article</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Article Title"
                        value={newArticle.title}
                        onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                      />
                      <Textarea
                        placeholder="Article Content"
                        value={newArticle.content}
                        onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                      />
                      <Select
                        value={newArticle.category}
                        onValueChange={(value) => setNewArticle({ ...newArticle, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={handleAddArticle} className="w-full">
                        Add Article
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Edit className="mr-2 h-6 w-6" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <motion.div
                      key={category.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="font-medium">{category.name}</span>
                      <div>
                        <Button variant="ghost" size="sm" onClick={() => setEditingCategory(category)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-6 w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Category</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Category Name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      />
                      <Button onClick={handleAddCategory} className="w-full">
                        Add Category
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        {editingArticle && (
          <Dialog open={!!editingArticle} onOpenChange={() => setEditingArticle(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Article</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Article Title"
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                />
                <Textarea
                  placeholder="Article Content"
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                />
                <Select
                  value={editingArticle.category}
                  onValueChange={(value) => setEditingArticle({ ...editingArticle, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleUpdateArticle} className="w-full">
                  Update Article
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        {editingCategory && (
          <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Category Name"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                />
                <Button onClick={handleUpdateCategory} className="w-full">
                  Update Category
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

