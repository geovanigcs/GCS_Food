"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface Recipe {
  id: string
  title: string
  description: string
  image_url: string
  prep_time: number
  user: { firstName: string; lastName: string }
  nationality: { name: string; flag_emoji: string }
}

export default function RecipeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // Map data to match Recipe interface, assuming user, nationality are nested
        const formattedRecipes = data.map((r: any) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          image_url: r.imageUrl || "/placeholder.svg?height=300&width=400",
          prep_time: r.prepTime,
          user: { firstName: r.user.firstName, lastName: r.user.lastName },
          nationality: { name: r.nationality.name, flag_emoji: r.nationality.flagEmoji },
        }))
        setRecipes(formattedRecipes)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])

  useEffect(() => {
    if (recipes.length > 0) {
      const interval = setInterval(nextSlide, 5000)
      return () => clearInterval(interval)
    }
  }, [recipes, currentIndex]) // Re-run effect if recipes change

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % recipes.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + recipes.length) % recipes.length)
  }

  if (loading) return <div className="text-center py-20 dark:text-gray-300">Carregando receitas...</div>
  if (error) return <div className="text-center py-20 text-red-500">Erro ao carregar receitas: {error}</div>
  if (recipes.length === 0)
    return <div className="text-center py-20 dark:text-gray-300">Nenhuma receita em destaque encontrada.</div>

  const currentRecipe = recipes[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Receitas em Destaque ✨</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Descubra as criações mais populares da nossa comunidade 🍽️
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex justify-center"
              >
                <Card className="w-full max-w-4xl overflow-hidden shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-80 md:h-96">
                      <Image
                        src={currentRecipe.image_url || "/placeholder.svg"}
                        alt={currentRecipe.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{currentRecipe.prep_time}min</span>
                      </div>
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">{currentRecipe.nationality.flag_emoji}</span>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {currentRecipe.nationality.name}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        {currentRecipe.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {currentRecipe.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                        <User className="w-4 h-4" />
                        <span>
                          Por {currentRecipe.user.firstName} {currentRecipe.user.lastName}
                        </span>
                      </div>
                      <Link href={`/receita/${currentRecipe.id}`}>
                        <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                          Ver Receita Completa 👨‍🍳
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-amber-200 dark:border-gray-600 hover:bg-amber-50 dark:hover:bg-gray-700 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </Button>

          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-amber-200 dark:border-gray-600 hover:bg-amber-50 dark:hover:bg-gray-700 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </Button>

          <div className="flex justify-center mt-8 gap-2">
            {recipes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-amber-600 dark:bg-amber-400 scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
