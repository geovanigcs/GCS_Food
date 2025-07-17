"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChefHat, ArrowLeft, Heart, Share2, Sparkles } from "lucide-react" // Added Sparkles icon
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

interface Harmonization {
  id: string
  title: string
  description: string
  item1Name: string // Updated
  item2Name: string // Updated
  imageUrl: string
  item1Color: string // Updated
  userId: string
  createdAt: string
  user: {
    firstName: string
    lastName: string
    avatar?: string
  }
  likes: number
  isLiked: boolean
}

export default function SingleHarmonizationPage({ params }: { params: { id: string } }) {
  const [harmonization, setHarmonization] = useState<Harmonization | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchHarmonization = async () => {
      try {
        const response = await fetch(`/api/harmonizations/${params.id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        const formattedHarmonization: Harmonization = {
          ...data,
          imageUrl: data.imageUrl || "/placeholder.svg?height=400&width=600",
          item1Color: data.item1Color || "text-red-700", // Updated
          likes: Math.floor(Math.random() * 50) + 10, // Mock likes
          isLiked: false, // Mock liked status
        }
        setHarmonization(formattedHarmonization)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchHarmonization()
  }, [params.id])

  const handleLike = () => {
    if (harmonization) {
      setHarmonization((prev) => ({
        ...(prev as Harmonization),
        isLiked: !prev?.isLiked,
        likes: prev?.isLiked ? (prev.likes || 0) - 1 : (prev.likes || 0) + 1,
      }))
    }
  }

  const handleShare = () => {
    if (navigator.share && harmonization) {
      navigator.share({
        title: harmonization.title,
        text: harmonization.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado! 📋")
    }
  }

  if (loading) return <div className="text-center py-20 dark:text-gray-300">Carregando harmonização...</div>
  if (error) return <div className="text-center py-20 text-red-500">Erro ao carregar harmonização: {error}</div>
  if (!harmonization) return <div className="text-center py-20 dark:text-gray-300">Harmonização não encontrada.</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-wine-50 dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link href="/harmonizacao">
            <Button variant="ghost" className="gap-2 hover:bg-purple-100 dark:hover:bg-gray-700">
              <ArrowLeft className="w-4 h-4" />
              Voltar às Harmonizações
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Sparkles className={`w-6 h-6 ${harmonization.item1Color}`} /> {/* Updated icon and color prop */}
                <ChefHat className="w-5 h-5" />
              </div>

              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
                {harmonization.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{harmonization.description}</p>

              <div className="flex items-center gap-4">
                <Button
                  onClick={handleLike}
                  variant="outline"
                  className={`gap-2 bg-transparent dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 ${harmonization.isLiked ? "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800" : ""}`}
                >
                  <Heart className={`w-4 h-4 ${harmonization.isLiked ? "fill-current" : ""}`} />
                  {harmonization.likes}
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
              <Image
                src={harmonization.imageUrl || "/placeholder.svg"}
                alt={harmonization.title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Item 1 & Item 2 Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Detalhes da Combinação</h3>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                    <Sparkles className={`w-6 h-6 ${harmonization.item1Color}`} /> {/* Updated icon and color prop */}
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Item 1: {harmonization.item1Name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-wine-50 dark:bg-wine-900/20">
                    <ChefHat className="w-6 h-6 text-red-600 dark:text-red-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Item 2: {harmonization.item2Name}
                    </span>
                  </div>
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
                    {harmonization.user.avatar ? (
                      <Image
                        src={harmonization.user.avatar || "/placeholder.svg"}
                        alt={`${harmonization.user.firstName} ${harmonization.user.lastName}`}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-wine-500 rounded-full flex items-center justify-center text-white font-bold">
                        {harmonization.user.firstName[0]}
                        {harmonization.user.lastName[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {harmonization.user.firstName} {harmonization.user.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Especialista em harmonizações</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Add Harmonization Button */}
            {user && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <Link href="/adicionar-harmonizacao">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-wine-600 hover:from-purple-700 hover:to-wine-700 text-white font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                    <Sparkles className="w-4 h-4 mr-2" /> {/* Updated icon */}
                    Adicionar Minha Harmonização
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
