"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Nationality {
  id: string
  name: string
  flag_emoji: string
  dish: string
  image: string
}

export default function NationalitySection() {
  const [nationalities, setNationalities] = useState<Nationality[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await fetch("/api/nationalities")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // Add mock dish and image for display purposes
        const formattedNationalities = data.map((n: any) => ({
          id: n.id,
          name: n.name,
          flag_emoji: n.flagEmoji,
          dish: `Prato Típico ${n.name}`, // Placeholder
          image: `/placeholder.svg?height=200&width=300`, // Placeholder
        }))
        setNationalities(formattedNationalities)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchNationalities()
  }, [])

  if (loading) return <div className="text-center py-20 dark:text-gray-300">Carregando nacionalidades...</div>
  if (error) return <div className="text-center py-20 text-red-500">Erro ao carregar nacionalidades: {error}</div>
  if (nationalities.length === 0)
    return <div className="text-center py-20 dark:text-gray-300">Nenhuma nacionalidade encontrada.</div>

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Culinárias do Mundo 🌍</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore sabores autênticos de diferentes nacionalidades
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {nationalities.map((nationality, index) => (
            <Link href={`/nacionalidade/${nationality.id}`} key={nationality.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <div className="relative h-48">
                    <Image
                      src={nationality.image || "/placeholder.svg"}
                      alt={nationality.dish}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-bold">{nationality.dish}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{nationality.flag_emoji}</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{nationality.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Descubra receitas tradicionais</p>
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
