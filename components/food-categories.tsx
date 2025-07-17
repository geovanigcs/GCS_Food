"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface Category {
  id: string
  name: string
  emoji: string
  description: string
  image: string
  example: string
}

export default function FoodCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        const formattedCategories = data.map((c: any) => ({
          id: c.id,
          name: c.name,
          emoji: c.emoji,
          description: `Receitas para o estilo ${c.name}`, 
          image: `/placeholder.svg?height=200&width=300`, 
          example: `Exemplo de ${c.name}`, 
        }))
        setCategories(formattedCategories)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) return <div className="text-center py-20 dark:text-gray-300">Carregando categorias...</div>
  if (error) return <div className="text-center py-20 text-red-500">Erro ao carregar categorias: {error}</div>
  if (categories.length === 0)
    return <div className="text-center py-20 dark:text-gray-300">Nenhuma categoria encontrada.</div>

  return (
    <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Estilos de Comida 🍽️</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Encontre receitas que combinam com seu estilo de vida
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <div className="relative h-56">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.example}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4 text-4xl bg-white/20 backdrop-blur-sm rounded-full p-2">
                    {category.emoji}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-bold">{category.example}</h4>
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">{category.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
