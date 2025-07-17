"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ChefHat } from "lucide-react" // Updated icon
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"

interface Harmonization {
  id: string
  title: string
  description: string
  item1Name: string // Updated
  item2Name: string // Updated
  imageUrl: string
  item1Color: string // Updated
}

export default function PairingSection() {
  // Renamed component
  const [harmonizations, setHarmonizations] = useState<Harmonization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHarmonizations = async () => {
      try {
        const response = await fetch("/api/harmonizations")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setHarmonizations(
          data.map((h: any) => ({
            id: h.id,
            title: h.title,
            description: h.description,
            item1Name: h.item1Name, // Updated
            item2Name: h.item2Name, // Updated
            imageUrl: h.imageUrl || "/placeholder.svg?height=200&width=300",
            item1Color: h.item1Color || "text-red-700", // Updated
          })),
        )
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchHarmonizations()
  }, [])

  if (loading) return <div className="text-center py-20 dark:text-gray-300">Carregando harmonizações...</div>
  if (error) return <div className="text-center py-20 text-red-500">Erro ao carregar harmonizações: {error}</div>
  if (harmonizations.length === 0)
    return (
      <div className="text-center py-20 dark:text-gray-300">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Nenhuma harmonização encontrada.</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Que tal adicionar a primeira?{" "}
          <Link href="/adicionar-harmonizacao" className="text-purple-600 hover:underline">
            Adicionar Harmonização
          </Link>
        </p>
      </div>
    )

  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 via-wine-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <Sparkles className="w-12 h-12 text-purple-600 dark:text-purple-400" /> {/* Updated icon */}
            <ChefHat className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Combinações Perfeitas ✨</h2>{" "}
          {/* Updated title */}
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Descubra combinações incríveis de sabores e experiências!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {harmonizations.map((harmonization, index) => (
            <Link href={`/harmonizacao/${harmonization.id}`} key={harmonization.id}>
              <motion.div
                initial={{ opacity: 0, rotateY: -30 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <div className="relative h-48">
                    <Image
                      src={harmonization.imageUrl || "/placeholder.svg"}
                      alt={harmonization.item2Name} // Updated
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Sparkles
                        className={`w-8 h-8 ${harmonization.item1Color} bg-white/20 backdrop-blur-sm rounded-full p-1`} // Updated icon and color prop
                      />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                        {harmonization.item1Name}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                        + {harmonization.item2Name}
                      </p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {harmonization.description}
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="flex items-center gap-1">
                        <span className="text-2xl">✨</span>
                        <span className="text-2xl">🤝</span>
                        <span className="text-2xl">🍽️</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
