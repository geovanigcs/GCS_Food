"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const tips = {
  breakfast: {
    emoji: "☀️",
    title: "Café da Manhã",
    color: "from-yellow-400 to-orange-500",
    recipes: [
      { name: "Tapioca Recheada", image: "/placeholder.svg?height=150&width=200", time: "15min" },
      { name: "Açaí Bowl", image: "/placeholder.svg?height=150&width=200", time: "10min" },
      { name: "Pão Francês Caseiro", image: "/placeholder.svg?height=150&width=200", time: "45min" },
    ],
  },
  lunch: {
    emoji: "🌤️",
    title: "Almoço",
    color: "from-blue-400 to-cyan-500",
    recipes: [
      { name: "Risotto de Camarão", image: "/placeholder.svg?height=150&width=200", time: "35min" },
      { name: "Salmão Grelhado", image: "/placeholder.svg?height=150&width=200", time: "25min" },
      { name: "Salada Caesar", image: "/placeholder.svg?height=150&width=200", time: "20min" },
    ],
  },
  dinner: {
    emoji: "🌙",
    title: "Jantar",
    color: "from-purple-500 to-indigo-600",
    recipes: [
      { name: "Sopa de Abóbora", image: "/placeholder.svg?height=150&width=200", time: "30min" },
      { name: "Frango ao Curry", image: "/placeholder.svg?height=150&width=200", time: "40min" },
      { name: "Wrap Vegetariano", image: "/placeholder.svg?height=150&width=200", time: "15min" },
    ],
  },
  dessert: {
    // Nova dica de sobremesa
    emoji: "🍰",
    title: "Sobremesa",
    color: "from-pink-400 to-red-500",
    recipes: [
      { name: "Brownie de Chocolate", image: "/placeholder.svg?height=150&width=200", time: "40min" },
      { name: "Mousse de Maracujá", image: "/placeholder.svg?height=150&width=200", time: "20min" },
      { name: "Pudim de Leite Condensado", image: "/placeholder.svg?height=150&width=200", time: "60min" },
    ],
  },
}

export default function DailyTips() {
  const [activeTab, setActiveTab] = useState<keyof typeof tips>("breakfast")

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">DICAS do Dia ✨</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Sugestões especiais para cada momento do seu dia</p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="flex bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
            {Object.entries(tips).map(([key, tip]) => (
              <Button
                key={key}
                onClick={() => setActiveTab(key as keyof typeof tips)}
                variant={activeTab === key ? "default" : "ghost"}
                className={`mx-1 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === key
                    ? `bg-gradient-to-r ${tip.color} text-white shadow-lg scale-105`
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-xl mr-2">{tip.emoji}</span>
                {tip.title}
              </Button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tips[activeTab].recipes.map((recipe, index) => (
                <motion.div
                  key={recipe.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <div className="relative h-40">
                      <Image src={recipe.image || "/placeholder.svg"} alt={recipe.name} fill className="object-cover" />
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
                        {recipe.time}
                      </div>
                    </div>
                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{recipe.name}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors bg-transparent dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Ver Receita
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
