"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Nationality {
  id: string
  name: string
  flagEmoji: string
  featuredDish: string
  imageUrl: string
}

const mockNationalities: Nationality[] = [
  {
    id: "br",
    name: "Brasileira",
    flagEmoji: "🇧🇷",
    featuredDish: "Feijoada",
    imageUrl: "/images/feijoada.jpeg",
  },
  {
    id: "it",
    name: "Italiana",
    flagEmoji: "🇮🇹",
    featuredDish: "Lasanha",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "jp",
    name: "Japonesa",
    flagEmoji: "🇯🇵",
    featuredDish: "Sushi",
    imageUrl: "/images/sushi.jpg",
  },
  {
    id: "mx",
    name: "Mexicana",
    flagEmoji: "🇲🇽",
    featuredDish: "Tacos",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "fr",
    name: "Francesa",
    flagEmoji: "🇫🇷",
    featuredDish: "Croissant",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "gr",
    name: "Grega",
    flagEmoji: "🇬🇷",
    featuredDish: "Salada Grega",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
]

export default function NationalitiesListPage() {
  // Por enquanto, não há funcionalidade de busca nesta página, mas o input está pronto.
  const searchQuery = ""
  const filteredNationalities = mockNationalities.filter(
    (nationality) =>
      nationality.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nationality.featuredDish.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 hover:bg-red-100 dark:hover:bg-gray-700 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Button>
          </Link>

          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🌍</div>
            <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nacionalidades Culinárias</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Explore as cozinhas do mundo e seus pratos mais famosos!
            </p>
          </div>

          {/* Search (placeholder for future functionality) */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar nacionalidades..."
                value={searchQuery}
                onChange={() => {
                  /* setSearchQuery(e.target.value) */
                }} // Desabilitado por enquanto
                className="pl-10 rounded-full border-2 border-gray-200 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                disabled // Desabilitado para indicar que não está ativo
              />
            </div>
          </div>
        </motion.div>

        {/* Nationalities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredNationalities.map((nationality, index) => (
            <motion.div
              key={nationality.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/nacionalidade/${nationality.id}`}>
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm cursor-pointer group">
                  <div className="relative h-48">
                    <Image
                      src={nationality.imageUrl || "/placeholder.svg"}
                      alt={nationality.featuredDish}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-bold">{nationality.featuredDish}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{nationality.flagEmoji}</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {nationality.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Descubra receitas tradicionais</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredNationalities.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Nenhuma nacionalidade encontrada
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tente buscar por outros termos ou adicione novas nacionalidades.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
