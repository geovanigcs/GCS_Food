"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Search, Utensils, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Category {
  id: string
  name: string
  emoji: string
}

interface Recipe {
  id: string
  title: string
  description: string
  imageUrl: string
  prepTime: number
  user: { firstName: string; lastName: string }
  nationality: { name: string; flagEmoji: string }
  category: { name: string; emoji: string }
}

export default function CategoriesListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const categoriesRes = await fetch("/api/categories")
        if (!categoriesRes.ok) {
          throw new Error(`HTTP error! status: ${categoriesRes.status}`)
        }
        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData)

        // Fetch recipes based on selected category or all if none selected
        const recipesRes = await fetch(
          `/api/recipes?search=${searchQuery}&${selectedCategory ? `categoryId=${selectedCategory}` : ""}`,
        )
        if (!recipesRes.ok) {
          throw new Error(`HTTP error! status: ${recipesRes.status}`)
        }
        const recipesData = await recipesRes.json()
        setRecipes(recipesData)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [searchQuery, selectedCategory])

  if (loading) return <div className="text-center py-20 dark:text-gray-300">Carregando categorias...</div>
  if (error) return <div className="text-center py-20 text-red-500">Erro ao carregar categorias: {error}</div>

  const filteredRecipes = recipes.filter((recipe) =>
    selectedCategory ? recipe.category.id === selectedCategory : true,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 hover:bg-green-100 dark:hover:bg-gray-700 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Button>
          </Link>

          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Utensils className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Categorias de Receitas 🏷️</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Encontre receitas por estilo de vida e tipo de refeição!
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? "default" : "outline"}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105"
                  : "text-gray-600 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
              }`}
            >
              Todas
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105"
                    : "text-gray-600 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
                }`}
              >
                <span className="text-xl mr-2">{category.emoji}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Search Input */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar receitas nesta categoria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full border-2 border-gray-200 dark:border-gray-600 focus:border-green-400 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
        </motion.div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/receita/${recipe.id}`}>
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm cursor-pointer group">
                  <div className="relative h-48">
                    <Image
                      src={recipe.imageUrl || "/placeholder.svg"}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.prepTime}min</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{recipe.nationality.flagEmoji}</span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {recipe.nationality.name}
                      </span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-xl">{recipe.category.emoji}</span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {recipe.category.name}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <User className="w-4 h-4" />
                      <span>
                        Por {recipe.user.firstName} {recipe.user.lastName}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Nenhuma receita encontrada</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tente buscar por outros termos ou selecione outra categoria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
