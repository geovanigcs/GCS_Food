"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, X, Upload, ArrowLeft, Save, ImageIcon, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface RecipeFormData {
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  utensils: string[] // New field for utensils
  prepTime: number
  servings: number
  difficulty: string
  nationalityId: string
  categoryId: string
  imageUrl: string
  userId: string // Added userId for API submission
}

interface Nationality {
  id: string
  name: string
  flagEmoji: string
}

interface Category {
  id: string
  name: string
  emoji: string
}

const difficulties = ["Fácil", "Médio", "Difícil"]

export default function AddRecipePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentIngredient, setCurrentIngredient] = useState("")
  const [currentInstruction, setCurrentInstruction] = useState("")
  const [currentUtensil, setCurrentUtensil] = useState("") // New state for current utensil
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [nationalities, setNationalities] = useState<Nationality[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [newNationalityName, setNewNationalityName] = useState("")
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryEmoji, setNewCategoryEmoji] = useState("")

  const [formData, setFormData] = useState<RecipeFormData>({
    title: "",
    description: "",
    ingredients: [],
    instructions: [],
    utensils: [], // Initialize utensils
    prepTime: 30,
    servings: 4,
    difficulty: "Médio",
    nationalityId: "",
    categoryId: "",
    imageUrl: "",
    userId: user?.id || "", // Initialize with user ID
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/")
    } else {
      setFormData((prev) => ({ ...prev, userId: user.id }))
    }
  }, [user, router])

  // Fetch nationalities and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nationalitiesRes, categoriesRes] = await Promise.all([
          fetch("/api/nationalities"),
          fetch("/api/categories"),
        ])

        if (!nationalitiesRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch initial data")
        }

        const nationalitiesData = await nationalitiesRes.json()
        const categoriesData = await categoriesRes.json()

        setNationalities(nationalitiesData.map((n: any) => ({ id: n.id, name: n.name, flagEmoji: n.flagEmoji })))
        setCategories(categoriesData.map((c: any) => ({ id: c.id, name: c.name, emoji: c.emoji })))
      } catch (e) {
        console.error("Error fetching initial data:", e)
        setErrors({ general: "Erro ao carregar opções de nacionalidade/categoria." })
      }
    }
    fetchData()
  }, [])

  if (!user) {
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "prepTime" || name === "servings" ? Number.parseInt(value) || 0 : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const addIngredient = () => {
    if (currentIngredient.trim()) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, currentIngredient.trim()],
      }))
      setCurrentIngredient("")
    }
  }

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const addInstruction = () => {
    if (currentInstruction.trim()) {
      setFormData((prev) => ({
        ...prev,
        instructions: [...prev.instructions, currentInstruction.trim()],
      }))
      setCurrentInstruction("")
    }
  }

  const removeInstruction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }))
  }

  const addUtensil = () => {
    if (currentUtensil.trim()) {
      setFormData((prev) => ({
        ...prev,
        utensils: [...prev.utensils, currentUtensil.trim()],
      }))
      setCurrentUtensil("")
    }
  }

  const removeUtensil = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      utensils: prev.utensils.filter((_, i) => i !== index),
    }))
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

  const addNewNationality = () => {
    if (newNationalityName.trim()) {
      const newId = newNationalityName.trim().toLowerCase().replace(/\s/g, "-")
      if (!nationalities.some((n) => n.id === newId)) {
        const newNat = { id: newId, name: newNationalityName.trim(), flagEmoji: "❓" }
        setNationalities((prev) => [...prev, newNat])
        setNewNationalityName("")
        setFormData((prev) => ({ ...prev, nationalityId: newNat.id })) // Select new nationality
      } else {
        alert("Nacionalidade já existe!")
      }
    }
  }

  const addNewCategory = () => {
    if (newCategoryName.trim()) {
      const newId = newCategoryName.trim().toLowerCase().replace(/\s/g, "-")
      if (!categories.some((c) => c.id === newId)) {
        const newCat = { id: newId, name: newCategoryName.trim(), emoji: newCategoryEmoji || "❓" }
        setCategories((prev) => [...prev, newCat])
        setNewCategoryName("")
        setNewCategoryEmoji("")
        setFormData((prev) => ({ ...prev, categoryId: newCat.id })) // Select new category
      } else {
        alert("Categoria já existe!")
      }
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Título é obrigatório"
    if (!formData.description.trim()) newErrors.description = "Descrição é obrigatória"
    if (formData.ingredients.length === 0) newErrors.ingredients = "Adicione pelo menos um ingrediente"
    if (formData.instructions.length === 0) newErrors.instructions = "Adicione pelo menos uma instrução"
    if (!formData.nationalityId) newErrors.nationalityId = "Selecione uma nacionalidade"
    if (!formData.categoryId) newErrors.categoryId = "Selecione uma categoria"
    if (formData.prepTime <= 0) newErrors.prepTime = "Tempo de preparo deve ser maior que 0"
    if (formData.servings <= 0) newErrors.servings = "Número de porções deve ser maior que 0"

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
      const response = await fetch("/api/recipes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const newRecipe = await response.json()
      console.log("Receita criada:", newRecipe)

      // Redirect to recipe page
      router.push(`/receita/${newRecipe.id}`)
    } catch (error: any) {
      console.error("Erro ao salvar receita:", error)
      setErrors({ general: `Erro ao salvar receita: ${error.message}. Tente novamente.` })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 hover:bg-amber-100 dark:hover:bg-gray-700 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Button>
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Adicionar Nova Receita 👨‍🍳</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Compartilhe sua criação culinária com a comunidade!
            </p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                  📝 Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Título da Receita *
                  </label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Ex: Lasanha Tradicional Italiana"
                    className="border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descrição *</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descreva sua receita de forma atrativa..."
                    rows={4}
                    className="border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 dark:focus:border-amber-400 resize-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tempo de Preparo (min) *
                    </label>
                    <Input
                      type="number"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleInputChange}
                      min="1"
                      className="border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    />
                    {errors.prepTime && <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Porções *</label>
                    <Input
                      type="number"
                      name="servings"
                      value={formData.servings}
                      onChange={handleInputChange}
                      min="1"
                      className="border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    />
                    {errors.servings && <p className="text-red-500 text-sm mt-1">{errors.servings}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dificuldade *
                    </label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-md focus:border-amber-400 dark:focus:border-amber-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {difficulties.map((difficulty) => (
                        <option key={difficulty} value={difficulty}>
                          {difficulty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Categories */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                  🏷️ Categorização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Nacionalidade *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {nationalities.map((nationality) => (
                      <button
                        key={nationality.id}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, nationalityId: nationality.id }))}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          formData.nationalityId === nationality.id
                            ? "border-amber-400 bg-amber-50 dark:bg-amber-900/50"
                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        <div className="text-2xl mb-1">{nationality.flagEmoji}</div>
                        <div className="text-sm font-medium">{nationality.name}</div>
                      </button>
                    ))}
                  </div>
                  {errors.nationalityId && <p className="text-red-500 text-sm mt-1">{errors.nationalityId}</p>}

                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Adicionar Nova Nacionalidade
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={newNationalityName}
                        onChange={(e) => setNewNationalityName(e.target.value)}
                        placeholder="Ex: Tailandesa"
                        className="flex-1 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addNewNationality())}
                      />
                      <Button
                        type="button"
                        onClick={addNewNationality}
                        className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Categoria *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, categoryId: category.id }))}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          formData.categoryId === category.id
                            ? "border-amber-400 bg-amber-50 dark:bg-amber-900/50"
                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        <div className="text-2xl mb-1">{category.emoji}</div>
                        <div className="text-sm font-medium">{category.name}</div>
                      </button>
                    ))}
                  </div>
                  {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}

                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Adicionar Nova Categoria
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Nome da categoria (Ex: Sobremesa)"
                        className="flex-1 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newCategoryEmoji}
                        onChange={(e) => setNewCategoryEmoji(e.target.value)}
                        placeholder="Emoji (Ex: 🍰)"
                        className="flex-1 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addNewCategory())}
                      />
                      <Button
                        type="button"
                        onClick={addNewCategory}
                        className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Image Upload */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                  <ImageIcon className="w-6 h-6" />
                  Imagem da Receita
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-amber-400 dark:hover:border-amber-400 transition-colors">
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
                          Adicione uma foto da sua receita
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">PNG, JPG até 5MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Ingredients */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                  🥘 Ingredientes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={currentIngredient}
                    onChange={(e) => setCurrentIngredient(e.target.value)}
                    placeholder="Ex: 500g de carne moída"
                    className="flex-1 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addIngredient())}
                  />
                  <Button
                    type="button"
                    onClick={addIngredient}
                    className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {formData.ingredients.length > 0 && (
                  <div className="space-y-2">
                    {formData.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="flex-1 text-gray-700 dark:text-gray-300">{ingredient}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeIngredient(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients}</p>}
              </CardContent>
            </Card>
          </motion.div>

          {/* Utensils */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                  <Utensils className="w-6 h-6" />
                  Utensílios
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={currentUtensil}
                    onChange={(e) => setCurrentUtensil(e.target.value)}
                    placeholder="Ex: Batedeira, Bowl"
                    className="flex-1 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addUtensil())}
                  />
                  <Button
                    type="button"
                    onClick={addUtensil}
                    className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {formData.utensils.length > 0 && (
                  <div className="space-y-2">
                    {formData.utensils.map((utensil, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="flex-1 text-gray-700 dark:text-gray-300">{utensil}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeUtensil(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Instructions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                  👨‍🍳 Modo de Preparo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Textarea
                    value={currentInstruction}
                    onChange={(e) => setCurrentInstruction(e.target.value)}
                    placeholder="Descreva o passo do preparo..."
                    className="flex-1 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 dark:focus:border-amber-400 resize-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    rows={2}
                  />
                  <Button
                    type="button"
                    onClick={addInstruction}
                    className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {formData.instructions.length > 0 && (
                  <div className="space-y-3">
                    {formData.instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-amber-600 dark:bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="flex-1 text-gray-700 dark:text-gray-300">{instruction}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeInstruction(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {errors.instructions && <p className="text-red-500 text-sm">{errors.instructions}</p>}
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            {errors.general && (
              <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
                <p className="text-red-600 dark:text-red-300">{errors.general}</p>
              </div>
            )}

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Publicar Receita 🚀
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
