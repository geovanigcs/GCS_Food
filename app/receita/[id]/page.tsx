"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Users, ChefHat, Heart, Share2, BookOpen, ArrowLeft, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  utensils: string[]
  imageUrl: string
  prepTime: number
  servings: number
  difficulty: string
  user: {
    firstName: string
    lastName: string
    avatar?: string
  }
  nationality: {
    name: string
    flagEmoji: string
  }
  category: {
    name: string
    emoji: string
  }
  createdAt: string
  likes: number
  isLiked: boolean
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"ingredients" | "instructions" | "utensils">("ingredients")
  const { user } = useAuth()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${params.id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // Map data to match Recipe interface
        const formattedRecipe: Recipe = {
          id: data.id,
          title: data.title,
          description: data.description,
          ingredients: data.ingredients,
          instructions: data.instructions,
          utensils: data.utensils || [], // Ensure utensils is an array
          imageUrl: data.imageUrl || "/placeholder.svg?height=400&width=600",
          prepTime: data.prepTime,
          servings: data.servings,
          difficulty: data.difficulty,
          user: {
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            avatar: data.user.avatar || "/placeholder.svg?height=40&width=40",
          },
          nationality: {
            name: data.nationality.name,
            flagEmoji: data.nationality.flagEmoji,
          },
          category: {
            name: data.category.name,
            emoji: data.category.emoji,
          },
          createdAt: data.createdAt,
          likes: Math.floor(Math.random() * 200) + 50, // Mock likes
          isLiked: false, // Mock liked status
        }
        setRecipe(formattedRecipe)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipe()
  }, [params.id])

  const handleLike = () => {
    if (recipe) {
      setRecipe((prev) => ({
        ...(prev as Recipe),
        isLiked: !prev?.isLiked,
        likes: prev?.isLiked ? (prev.likes || 0) - 1 : (prev.likes || 0) + 1,
      }))
    }
  }

  const handleShare = () => {
    if (navigator.share && recipe) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado! 📋")
    }
  }

  if (loading) return <div className="text-center py-20 dark:text-gray-300">Carregando receita...</div>
  if (error) return <div className="text-center py-20 text-red-500">Erro ao carregar receita: {error}</div>
  if (!recipe) return <div className="text-center py-20 dark:text-gray-300">Receita não encontrada.</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2 hover:bg-amber-100 dark:hover:bg-gray-700">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="text-2xl">{recipe.nationality.flagEmoji}</span>
                <span>{recipe.nationality.name}</span>
                <span>•</span>
                <span className="text-xl">{recipe.category.emoji}</span>
                <span>{recipe.category.name}</span>
              </div>

              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 leading-tight">{recipe.title}</h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{recipe.description}</p>

              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.prepTime} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings} porções</span>
                </div>
                <Badge
                  variant="outline"
                  className="border-amber-200 text-amber-700 dark:border-amber-700 dark:text-amber-300"
                >
                  {recipe.difficulty}
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={handleLike}
                  variant="outline"
                  className={`gap-2 bg-transparent dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 ${recipe.isLiked ? "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800" : ""}`}
                >
                  <Heart className={`w-4 h-4 ${recipe.isLiked ? "fill-current" : ""}`} />
                  {recipe.likes}
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="gap-2 bg-transparent dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </Button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image src={recipe.imageUrl || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
            </motion.div>

            {/* Tabs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                <Button
                  onClick={() => setActiveTab("ingredients")}
                  variant={activeTab === "ingredients" ? "default" : "outline"}
                  className={`gap-2 ${activeTab === "ingredients" ? "bg-amber-600 hover:bg-amber-700" : "bg-transparent dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"}`}
                >
                  <BookOpen className="w-4 h-4" />
                  Ingredientes
                </Button>
                <Button
                  onClick={() => setActiveTab("instructions")}
                  variant={activeTab === "instructions" ? "default" : "outline"}
                  className={`gap-2 ${activeTab === "instructions" ? "bg-amber-600 hover:bg-amber-700" : "bg-transparent dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"}`}
                >
                  <ChefHat className="w-4 h-4" />
                  Modo de Preparo
                </Button>
                <Button
                  onClick={() => setActiveTab("utensils")}
                  variant={activeTab === "utensils" ? "default" : "outline"}
                  className={`gap-2 ${activeTab === "utensils" ? "bg-amber-600 hover:bg-amber-700" : "bg-transparent dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"}`}
                >
                  <Utensils className="w-4 h-4" />
                  Utensílios
                </Button>
              </div>

              <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  {activeTab === "ingredients" && (
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Ingredientes ({recipe.ingredients.length})
                      </h3>
                      <ul className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="w-2 h-2 bg-amber-600 dark:bg-amber-400 rounded-full flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === "instructions" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Modo de Preparo ({recipe.instructions.length} passos)
                      </h3>
                      <ol className="space-y-4">
                        {recipe.instructions.map((instruction, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-4 p-4 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-amber-600 dark:bg-amber-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{instruction}</p>
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {activeTab === "utensils" && (
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Utensílios ({recipe.utensils.length})
                      </h3>
                      <ul className="space-y-3">
                        {recipe.utensils.map((utensil, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="w-2 h-2 bg-amber-600 dark:bg-amber-400 rounded-full flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{utensil}</span>
                          </motion.li>
                        ))}
                      </ul>
                      {recipe.utensils.length === 0 && (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                          Nenhum utensílio listado para esta receita.
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Criado por</h3>
                  <div className="flex items-center gap-3">
                    {recipe.user.avatar ? (
                      <Image
                        src={recipe.user.avatar || "/placeholder.svg"}
                        alt={`${recipe.user.firstName} ${recipe.user.lastName}`}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        {recipe.user.firstName[0]}
                        {recipe.user.lastName[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {recipe.user.firstName} {recipe.user.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Chef amador</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recipe Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Informações</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tempo de preparo:</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{recipe.prepTime} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Porções:</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{recipe.servings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Dificuldade:</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{recipe.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Curtidas:</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{recipe.likes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Add Recipe Button */}
            {user && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <Link href="/adicionar-receita">
                  <Button className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                    <ChefHat className="w-4 h-4 mr-2" />
                    Adicionar Minha Receita
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
