"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, User, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

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

interface Nationality {
  id: string
  name: string
  flagEmoji: string
}

// Dados mockados para a nacionalidade e receitas
const mockNationality: Nationality = {
  id: "generica",
  name: "Genérica",
  flagEmoji: "🏳️", // Bandeira genérica
}

const mockRecipes: Recipe[] = [
  {
    id: "generic-recipe-1",
    title: "Prato Típico Genérico 1",
    description: "Uma descrição de um prato delicioso e tradicional desta culinária.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    prepTime: 45,
    user: { firstName: "Chef", lastName: "V0" },
    nationality: mockNationality,
    category: { name: "Principal", emoji: "🍽️" },
  },
  {
    id: "generic-recipe-2",
    title: "Sobremesa Genérica",
    description: "Uma sobremesa doce e fácil de fazer, perfeita para qualquer ocasião.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    prepTime: 30,
    user: { firstName: "Chef", lastName: "V0" },
    nationality: mockNationality,
    category: { name: "Sobremesa", emoji: "🍰" },
  },
  {
    id: "generic-recipe-3",
    title: "Entrada Genérica",
    description: "Uma entrada leve e saborosa para começar sua refeição.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    prepTime: 20,
    user: { firstName: "Chef", lastName: "V0" },
    nationality: mockNationality,
    category: { name: "Entrada", emoji: "🥗" },
  },
]

export default function NationalityPage({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("")

  // Usamos os dados mockados, ignorando params.id por enquanto
  const nationality = mockNationality
  const recipes = mockRecipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 hover:bg-amber-100 dark:hover:bg-gray-700 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Button>
          </Link>

          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{nationality.flagEmoji}</div>
            <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Culinária {nationality.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Descubra os sabores autênticos da cozinha {nationality.name.toLowerCase()}
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar receitas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
        </motion.div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
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
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
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

        {recipes.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Nenhuma receita encontrada</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tente buscar por outros termos ou explore outras nacionalidades
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
