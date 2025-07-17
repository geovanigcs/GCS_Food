"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChefHat, ArrowLeft, Search, Sparkles } from "lucide-react" // Added Sparkles icon
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Harmonization {
  id: string
  title: string
  description: string
  item1Name: string // Updated
  item2Name: string // Updated
  imageUrl: string
  item1Color: string // Updated
  user: { firstName: string; lastName: string }
}

export default function HarmonizationListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [harmonizations, setHarmonizations] = useState<Harmonization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHarmonizations = async () => {
      try {
        const response = await fetch(`/api/harmonizations?search=${searchQuery}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setHarmonizations(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchHarmonizations()
  }, [searchQuery])

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-wine-50 dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 hover:bg-purple-100 dark:hover:bg-gray-700 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Button>
          </Link>

          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Sparkles className="w-12 h-12 text-purple-600 dark:text-purple-400" /> {/* Changed icon */}
              <ChefHat className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Harmonizações ✨</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Descubra combinações perfeitas de sabores e experiências!
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar harmonizações..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
        </motion.div>

        {/* Harmonizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {harmonizations.map((harmonization, index) => (
            <motion.div
              key={harmonization.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/harmonizacao/${harmonization.id}`}>
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm cursor-pointer group">
                  <div className="relative h-48">
                    <Image
                      src={harmonization.imageUrl || "/placeholder.svg"}
                      alt={harmonization.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
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
              </Link>
            </motion.div>
          ))}
        </div>

        {harmonizations.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Nenhuma harmonização encontrada
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tente buscar por outros termos ou adicione uma nova harmonização!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
