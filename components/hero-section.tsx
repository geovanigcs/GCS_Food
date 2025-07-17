"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ChefHat, Utensils, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (titleRef.current && subtitleRef.current) {
      const tl = gsap.timeline()

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "back.out(1.7)" },
      ).fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.5",
      )
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <ChefHat className="w-16 h-16 text-amber-600 dark:text-amber-400" />
            <Utensils className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
        </motion.div>

        <h1
          ref={titleRef}
          className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-amber-600 via-red-600 to-orange-600 bg-clip-text text-transparent mb-6"
        >
          GCS Food
        </h1>

        <p
          ref={subtitleRef}
          className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8 font-light leading-relaxed"
        >
          Descubra sabores únicos do mundo todo 🌍✨
          <br />
          <span className="text-lg">Receitas autênticas, harmonizações especiais e dicas culinárias 🍷🍽️</span>
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 text-4xl"
        >
          <span className="animate-bounce">🍝</span>
          <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>
            🍣
          </span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
            🥘
          </span>
          <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>
            🍷
          </span>
          <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
            🧀
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          <p className="mb-4">
            🎯 <strong>Como funciona:</strong> Explore receitas por nacionalidade, descubra harmonizações perfeitas e
            compartilhe suas criações culinárias!
          </p>
          <p>👨‍🍳 Cadastre-se e adicione suas receitas favoritas à nossa comunidade gastronômica</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-8"
        >
          <Link href="/adicionar-receita">
            <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
              <Plus className="w-5 h-5 mr-2" />
              Compartilhe sua Receita 👨‍🍳
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
