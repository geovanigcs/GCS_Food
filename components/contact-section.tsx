"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageCircle, Send } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!backgroundRef.current) return

    const elements = backgroundRef.current.querySelectorAll(".floating-spice")

    elements.forEach((element, index) => {
      gsap.set(element, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 360,
        scale: 0.3 + Math.random() * 0.4,
      })

      gsap.to(element, {
        duration: 15 + Math.random() * 10,
        x: `+=${(Math.random() - 0.5) * 300}`,
        y: `+=${(Math.random() - 0.5) * 300}`,
        rotation: `+=${360 + Math.random() * 360}`,
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: index * 0.3,
      })
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 overflow-hidden">
      {/* Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none opacity-20">
        <div className="floating-spice absolute text-4xl text-gray-800 dark:text-gray-200">🌿</div>
        <div className="floating-spice absolute text-3xl text-gray-800 dark:text-gray-200">🍋</div>
        <div className="floating-spice absolute text-4xl text-gray-800 dark:text-gray-200">🌶️</div>
        <div className="floating-spice absolute text-3xl text-gray-800 dark:text-gray-200">🧄</div>
        <div className="floating-spice absolute text-4xl text-gray-800 dark:text-gray-200">🫒</div>
        <div className="floating-spice absolute text-3xl text-gray-800 dark:text-gray-200">🧅</div>
        <div className="floating-spice absolute text-4xl text-gray-800 dark:text-gray-200">🍅</div>
        <div className="floating-spice absolute text-3xl text-gray-800 dark:text-gray-200">🥒</div>
        <div className="floating-spice absolute text-4xl text-gray-800 dark:text-gray-200">🌽</div>
        <div className="floating-spice absolute text-3xl text-gray-800 dark:text-gray-200">🥕</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <Mail className="w-12 h-12 text-orange-600 dark:text-orange-400" />
            <MessageCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Entre em Contato 📧</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tem alguma dúvida ou sugestão? Adoraríamos ouvir você! 🤗
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome Completo 👤
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className="border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-400 transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">E-mail 📧</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assunto 📝</label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Sobre o que você gostaria de falar?"
                    className="border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-400 transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mensagem 💬</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Conte-nos mais detalhes..."
                    rows={6}
                    className="border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-400 resize-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-center"
                >
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensagem 🚀
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 text-lg">Responderemos em até 24 horas! ⏰✨</p>
          <div className="flex justify-center gap-4 mt-4 text-3xl">
            <span className="animate-bounce">🍽️</span>
            <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>
              ❤️
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              👨‍🍳
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
