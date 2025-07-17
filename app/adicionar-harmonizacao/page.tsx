"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Upload, ArrowLeft, Save, ImageIcon } from "lucide-react" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface HarmonizationFormData {
  title: string
  description: string
  item1Name: string 
  item2Name: string 
  imageUrl: string
  item1Color: string 
  userId: string
}

const itemColors = [
  { name: "Vermelho (Escuro)", value: "text-red-700" },
  { name: "Vermelho (Claro)", value: "text-red-500" },
  { name: "Amarelo", value: "text-yellow-600" },
  { name: "Verde", value: "text-green-600" },
  { name: "Azul", value: "text-blue-600" },
  { name: "Rosa", value: "text-pink-500" },
  { name: "Laranja", value: "text-orange-500" },
  { name: "Roxo", value: "text-purple-600" },
  { name: "Marrom", value: "text-amber-800" },
  { name: "Cinza", value: "text-gray-500" },
]

export default function AddHarmonizationPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [formData, setFormData] = useState<HarmonizationFormData>({
    title: "",
    description: "",
    item1Name: "", 
    item2Name: "", 
    imageUrl: "",
    item1Color: "text-red-700", 
    userId: user?.id || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!user) {
      router.push("/")
    } else {
      setFormData((prev) => ({ ...prev, userId: user.id }))
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, imageUrl: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Título é obrigatório"
    if (!formData.description.trim()) newErrors.description = "Descrição é obrigatória"
    if (!formData.item1Name.trim()) newErrors.item1Name = "Nome do Item 1 é obrigatório" 
    if (!formData.item2Name.trim()) newErrors.item2Name = "Nome do Item 2 é obrigatório" 
    if (!formData.imageUrl) newErrors.imageUrl = "Imagem é obrigatória"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/harmonizations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const newHarmonization = await response.json()
      console.log("Harmonização criada:", newHarmonization)

      router.push(`/harmonizacao/${newHarmonization.id}`)
    } catch (error: any) {
      console.error("Erro ao salvar harmonização:", error)
      setErrors({ general: `Erro ao salvar harmonização: ${error.message}. Tente novamente.` })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-wine-50 dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 hover:bg-purple-100 dark:hover:bg-gray-700 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Button>
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Adicionar Nova Harmonização ✨</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Compartilhe suas combinações perfeitas de sabores!
            </p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                  📝 Detalhes da Harmonização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Título da Harmonização *
                  </label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Ex: Queijo Brie & Geleia de Damasco"
                    className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descrição *</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descreva por que essa combinação é perfeita..."
                    rows={4}
                    className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 resize-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome do Item 1 * (Ex: Vinho, Queijo, Cerveja)
                    </label>
                    <Input
                      name="item1Name"
                      value={formData.item1Name}
                      onChange={handleInputChange}
                      placeholder="Ex: Cabernet Sauvignon"
                      className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    />
                    {errors.item1Name && <p className="text-red-500 text-sm mt-1">{errors.item1Name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome do Item 2 * (Ex: Prato, Fruta, Pão)
                    </label>
                    <Input
                      name="item2Name"
                      value={formData.item2Name}
                      onChange={handleInputChange}
                      placeholder="Ex: Filé ao Molho Madeira"
                      className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    />
                    {errors.item2Name && <p className="text-red-500 text-sm mt-1">{errors.item2Name}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cor Representativa do Item 1
                  </label>
                  <select
                    name="item1Color"
                    value={formData.item1Color}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-md focus:border-purple-400 dark:focus:border-purple-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    {itemColors.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Image Upload */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                  <ImageIcon className="w-6 h-6" />
                  Imagem da Harmonização *
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 dark:hover:border-purple-400 transition-colors">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setImagePreview(null)
                          setFormData((prev) => ({ ...prev, imageUrl: "" }))
                        }}
                        className="bg-transparent dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Remover Imagem
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                          Adicione uma foto da sua harmonização
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">PNG, JPG até 5MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload-harmonization"
                      />
                      <label htmlFor="image-upload-harmonization">
                        <Button
                          type="button"
                          variant="outline"
                          className="cursor-pointer bg-transparent dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                          asChild
                        >
                          <span>Selecionar Imagem</span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
                {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            {errors.general && (
              <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
                <p className="text-red-600 dark:text-red-300">{errors.general}</p>
              </div>
            )}

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-wine-600 hover:from-purple-700 hover:to-wine-700 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Publicar Harmonização 🚀
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  )
}
