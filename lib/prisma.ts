// This file simulates a Prisma Client for the v0 environment.
// In a real Next.js application, you would install Prisma and
// initialize it like this:
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// export default prisma;

import type { User, Recipe, Nationality, Category, Harmonization } from "./database" // Using existing types

// Mock data to simulate database records
const mockUsers: User[] = [
  {
    id: "user-1",
    email: "joao@example.com",
    firstName: "João",
    lastName: "Silva",
    password: "hashedpassword",
    google_id: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "user-2",
    email: "maria@example.com",
    firstName: "Maria",
    lastName: "Santos",
    password: "hashedpassword",
    google_id: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "admin", // Ensure admin user exists for recipes
    email: "admin@gcsfood.com",
    firstName: "Admin",
    lastName: "GCS",
    password: "$2a$10$example", // Placeholder, replace with a real hash in production
    google_id: null,
    created_at: new Date().toISOString(),
  },
]

const mockNationalities: Nationality[] = [
  { id: "br", name: "Brasileira", flag_emoji: "🇧🇷" },
  { id: "it", name: "Italiana", flag_emoji: "🇮🇹" },
  { id: "jp", name: "Japonesa", flag_emoji: "🇯🇵" },
  { id: "cn", name: "Chinesa", flag_emoji: "🇨🇳" },
  { id: "gr", name: "Grega", flag_emoji: "🇬🇷" },
  { id: "us", name: "Americana", flag_emoji: "🇺🇸" },
  { id: "ru", name: "Russa", flag_emoji: "🇷🇺" },
  { id: "pl", name: "Polonesa", flag_emoji: "🇵🇱" },
  { id: "mx", name: "Mexicana", flag_emoji: "🇲🇽" },
  { id: "fr", name: "Francesa", flag_emoji: "🇫🇷" },
]

const mockCategories: Category[] = [
  { id: "fitness", name: "Fitness", emoji: "🏋️" },
  { id: "vegan", name: "Vegana", emoji: "🌱" },
  { id: "vegetarian", name: "Vegetariana", emoji: "🥕" },
  { id: "dessert", name: "Sobremesa", emoji: "🍰" },
  { id: "breakfast", name: "Café da Manhã", emoji: "☀️" },
  { id: "lunch", name: "Almoço", emoji: "🌤️" },
  { id: "dinner", name: "Jantar", emoji: "🌙" },
  { id: "fast-food", name: "Fast Food", emoji: "🍔" },
  { id: "soup", name: "Sopas", emoji: "🥣" },
]

const mockRecipes: Recipe[] = [
  {
    id: "recipe-1",
    title: "Lasanha Tradicional Italiana",
    description:
      "Uma deliciosa lasanha italiana com molho bolonhesa caseiro, queijos selecionados e massa fresca. Perfeita para reunir a família!",
    ingredients: [
      "500g de massa de lasanha",
      "500g de carne moída",
      "2 xícaras de molho de tomate",
      "300g de queijo mussarela",
      "200g de queijo parmesão ralado",
      "1 cebola média picada",
      "3 dentes de alho",
      "2 colheres de azeite",
      "Sal e pimenta a gosto",
      "Manjericão fresco",
    ],
    instructions: [
      "Pré-aqueça o forno a 180°C",
      "Cozinhe a massa de lasanha conforme instruções da embalagem",
      "Em uma panela, refogue a cebola e o alho no azeite",
      "Adicione a carne moída e cozinhe até dourar",
      "Acrescente o molho de tomate e temperos, cozinhe por 15 minutos",
      "Em um refratário, faça camadas alternando massa, molho e queijos",
      "Finalize com queijo parmesão por cima",
      "Leve ao forno por 45 minutos até dourar",
      "Deixe descansar por 10 minutos antes de servir",
    ],
    utensils: ["Panela grande", "Refratário", "Espátula", "Ralador de queijo"],
    image_url: "/placeholder.svg?height=400&width=600",
    prep_time: 90,
    servings: 8,
    difficulty: "Médio",
    user_id: "user-1",
    nationality_id: "it",
    category_id: "dinner",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "recipe-2",
    title: "Feijoada Completa",
    description: "Feijoada tradicional brasileira com todos os acompanhamentos",
    ingredients: [
      "500g feijão preto",
      "200g carne seca",
      "150g costela salgada",
      "100g linguiça defumada",
      "Arroz",
      "Farofa",
      "Couve refogada",
    ],
    instructions: [
      "Deixe as carnes de molho",
      "Cozinhe o feijão",
      "Refogue os temperos",
      "Misture tudo e sirva com acompanhamentos",
    ],
    utensils: ["Panela de pressão", "Panela grande", "Frigideira"],
    image_url: "/placeholder.svg?height=400&width=600",
    prep_time: 180,
    servings: 6,
    difficulty: "Difícil",
    user_id: "user-2",
    nationality_id: "br",
    category_id: "dinner",
    created_at: "2024-02-20T14:30:00Z",
  },
  {
    id: "recipe-3",
    title: "Sushi Variado",
    description: "Seleção de sushis frescos com peixe e vegetais",
    ingredients: [
      "Arroz para sushi",
      "Nori",
      "Salmão fresco",
      "Pepino",
      "Abacate",
      "Molho shoyu",
      "Wasabi",
      "Gengibre",
    ],
    instructions: [
      "Prepare o arroz",
      "Corte os ingredientes",
      "Monte os rolos de sushi",
      "Corte e sirva com acompanhamentos",
    ],
    utensils: ["Esteira de bambu", "Faca afiada", "Tigela"],
    image_url: "/placeholder.svg?height=400&width=600",
    prep_time: 45,
    servings: 4,
    difficulty: "Médio",
    user_id: "user-1",
    nationality_id: "jp",
    category_id: "lunch",
    created_at: "2024-03-10T11:00:00Z",
  },
  {
    id: "recipe-4",
    title: "Tacos Mexicanos",
    description: "Tacos autênticos com carne moída temperada, pico de gallo e guacamole.",
    ingredients: [
      "Tortillas de milho",
      "400g carne moída",
      "1 cebola",
      "2 tomates",
      "1 abacate",
      "Coentro",
      "Limão",
      "Temperos para taco",
    ],
    instructions: [
      "Prepare a carne moída com temperos",
      "Faça o pico de gallo e guacamole",
      "Aqueça as tortillas",
      "Monte os tacos com todos os ingredientes",
    ],
    utensils: ["Frigideira", "Tigelas", "Espremedor de limão"],
    image_url: "/placeholder.svg?height=400&width=600",
    prep_time: 30,
    servings: 4,
    difficulty: "Fácil",
    user_id: "user-2",
    nationality_id: "mx",
    category_id: "dinner",
    created_at: "2024-04-01T18:00:00Z",
  },
  {
    id: "recipe-5",
    title: "Croissant Francês",
    description: "Croissants amanteigados e folhados, perfeitos para o café da manhã.",
    ingredients: ["Massa folhada", "Manteiga", "Açúcar", "Ovo para pincelar"],
    instructions: [
      "Prepare a massa folhada (ou use pronta)",
      "Dobre e refrigere várias vezes",
      "Corte em triângulos e enrole",
      "Pincele com ovo e asse até dourar",
    ],
    utensils: ["Rolo de massa", "Assadeira", "Pincel de cozinha"],
    image_url: "/placeholder.svg?height=400&width=600",
    prep_time: 120,
    servings: 12,
    difficulty: "Difícil",
    user_id: "user-1",
    nationality_id: "fr",
    category_id: "breakfast",
    created_at: "2024-05-10T08:00:00Z",
  },
  {
    id: "recipe-6",
    title: "Salada Grega",
    description: "Salada refrescante com pepino, tomate, azeitonas, queijo feta e azeite.",
    ingredients: [
      "Pepino",
      "Tomate",
      "Cebola roxa",
      "Azeitonas Kalamata",
      "Queijo Feta",
      "Azeite de oliva extra virgem",
      "Orégano",
    ],
    instructions: [
      "Corte os vegetais em pedaços grandes",
      "Misture todos os ingredientes em uma tigela",
      "Tempere com azeite e orégano",
      "Sirva imediatamente",
    ],
    utensils: ["Tigela grande", "Faca"],
    image_url: "/placeholder.svg?height=400&width=600",
    prep_time: 15,
    servings: 2,
    difficulty: "Fácil",
    user_id: "user-2",
    nationality_id: "gr",
    category_id: "fitness",
    created_at: "2024-06-20T12:00:00Z",
  },
  {
    id: "recipe-7",
    title: "Bolo de Chocolate Vegano",
    description: "Um bolo de chocolate úmido e delicioso, sem ingredientes de origem animal.",
    ingredients: [
      "2 xícaras de farinha de trigo",
      "1 xícara de açúcar",
      "1/2 xícara de cacau em pó",
      "1 colher de chá de bicarbonato de sódio",
      "1/2 colher de chá de sal",
      "1 xícara de água",
      "1/2 xícara de óleo vegetal",
      "1 colher de chá de extrato de baunilha",
      "1 colher de sopa de vinagre de maçã",
    ],
    instructions: [
      "Pré-aqueça o forno a 180°C e unte uma forma",
      "Em uma tigela grande, misture os ingredientes secos",
      "Em outra tigela, misture os ingredientes molhados",
      "Adicione os ingredientes molhados aos secos e misture até incorporar",
      "Despeje a massa na forma e asse por 30-35 minutos",
      "Deixe esfriar antes de servir",
    ],
    utensils: ["Duas tigelas", "Batedor de arame", "Forma de bolo"],
    image_url: "/placeholder.svg?height=400&width=600",
    prep_time: 45,
    servings: 10,
    difficulty: "Médio",
    user_id: "admin",
    nationality_id: "us", // Assuming a generic origin for vegan recipes
    category_id: "vegan",
    created_at: "2024-07-01T16:00:00Z",
  },
  {
    id: "recipe-8",
    title: "Sopa de Tomate Cremosa",
    description: "Uma sopa de tomate reconfortante e cremosa, perfeita para dias frios.",
    ingredients: [
      "1 kg de tomates maduros",
      "1 cebola média",
      "2 dentes de alho",
      "4 xícaras de caldo de legumes",
      "1/2 xícara de creme de leite (opcional)",
      "Azeite de oliva",
      "Sal, pimenta e manjericão fresco",
    ],
    instructions: [
      "Refogue a cebola e o alho no azeite",
      "Adicione os tomates picados e cozinhe por 10 minutos",
      "Acrescente o caldo de legumes e cozinhe por 20 minutos",
      "Bata a sopa no liquidificador até ficar homogênea",
      "Retorne à panela, adicione o creme de leite (se usar) e tempere",
      "Sirva quente com manjericão fresco",
    ],
    utensils: ["Panela grande", "Liquidificador", "Concha"],
    image_url: "/placeholder.svg?height=400&width=600",
    prep_time: 40,
    servings: 4,
    difficulty: "Fácil",
    user_id: "admin",
    nationality_id: "it", // Can be associated with Italian cuisine
    category_id: "soup",
    created_at: "2024-07-10T19:00:00Z",
  },
]

const mockHarmonizations: Harmonization[] = [
  {
    id: "harm-1",
    title: "Cabernet Sauvignon & Filé ao Molho Madeira",
    description:
      "A robustez do Cabernet complementa perfeitamente a intensidade da carne e o sabor rico do molho madeira.",
    item1Name: "Cabernet Sauvignon", // Renamed
    item2Name: "Filé ao Molho Madeira", // Renamed
    imageUrl: "/placeholder.svg?height=200&width=300",
    item1Color: "text-red-700", // Renamed
    userId: "user-1",
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "harm-2",
    title: "Chardonnay & Queijos Maduros",
    description:
      "A cremosidade e notas amanteigadas do Chardonnay realçam os sabores complexos e a textura dos queijos maduros.",
    item1Name: "Chardonnay", // Renamed
    item2Name: "Queijos Maduros", // Renamed
    imageUrl: "/placeholder.svg?height=200&width=300",
    item1Color: "text-yellow-600", // Renamed
    userId: "user-2",
    createdAt: "2024-02-01T15:30:00Z",
  },
  {
    id: "harm-3",
    title: "Pinot Noir & Salmão Grelhado",
    description:
      "A delicadeza e os taninos suaves do Pinot Noir harmonizam com a suavidade e a gordura do salmão grelhado.",
    item1Name: "Pinot Noir", // Renamed
    item2Name: "Salmão Grelhado", // Renamed
    imageUrl: "/placeholder.svg?height=200&width=300",
    item1Color: "text-red-500", // Renamed
    userId: "user-1",
    createdAt: "2024-03-05T11:45:00Z",
  },
  {
    id: "harm-4",
    title: "Queijo Brie & Geleia de Damasco",
    description: "A doçura da geleia de damasco equilibra a cremosidade e o sabor suave do queijo brie.",
    item1Name: "Queijo Brie",
    item2Name: "Geleia de Damasco",
    imageUrl: "/placeholder.svg?height=200&width=300",
    item1Color: "text-orange-400", // Using an existing color for a non-wine item
    userId: "user-1",
    createdAt: "2024-07-17T10:00:00Z",
  },
  {
    id: "harm-5",
    title: "Cerveja IPA & Hambúrguer Artesanal",
    description: "O amargor e o aroma cítrico da IPA cortam a gordura e complementam os sabores do hambúrguer.",
    item1Name: "Cerveja IPA",
    item2Name: "Hambúrguer Artesanal",
    imageUrl: "/placeholder.svg?height=200&width=300",
    item1Color: "text-yellow-800", // Using an existing color for a non-wine item
    userId: "user-2",
    createdAt: "2024-07-17T11:00:00Z",
  },
  {
    id: "harm-6",
    title: "Café Expresso & Tiramisu",
    description: "A intensidade do café realça a doçura e a cremosidade do clássico tiramisu italiano.",
    item1Name: "Café Expresso",
    item2Name: "Tiramisu",
    imageUrl: "/placeholder.svg?height=200&width=300",
    item1Color: "text-gray-800",
    userId: "admin",
    createdAt: "2024-07-18T09:00:00Z",
  },
  {
    id: "harm-7",
    title: "Saquê & Sashimi de Salmão",
    description: "A leveza e o frescor do saquê complementam a delicadeza do sashimi de salmão.",
    item1Name: "Saquê",
    item2Name: "Sashimi de Salmão",
    imageUrl: "/placeholder.svg?height=200&width=300",
    item1Color: "text-blue-300",
    userId: "user-1",
    createdAt: "2024-07-18T14:00:00Z",
  },
]

// Function to simulate Prisma Client methods
const prisma = {
  user: {
    findMany: async () => mockUsers,
    findUnique: async ({ where }: { where: { id?: string; email?: string } }) => {
      if (where.id) return mockUsers.find((u) => u.id === where.id)
      if (where.email) return mockUsers.find((u) => u.email === where.email)
      return null
    },
  },
  nationality: {
    findMany: async () => mockNationalities,
    findUnique: async ({ where }: { where: { id: string } }) => mockNationalities.find((n) => n.id === where.id),
  },
  category: {
    findMany: async () => mockCategories,
    findUnique: async ({ where }: { where: { id: string } }) => mockCategories.find((c) => c.id === where.id),
  },
  recipe: {
    findMany: async ({
      where,
      include,
    }: {
      where?: { nationalityId?: string; categoryId?: string; OR?: any[] }
      include?: { user?: boolean; nationality?: boolean; category?: boolean }
    }) => {
      let filtered = [...mockRecipes]

      if (where?.nationalityId) {
        filtered = filtered.filter((r) => r.nationality_id === where.nationalityId)
      }
      if (where?.categoryId) {
        filtered = filtered.filter((r) => r.category_id === where.categoryId)
      }
      if (where?.OR) {
        const searchQuery = where.OR[0].title.contains.toLowerCase() // Assuming search is always on title/description
        filtered = filtered.filter(
          (r) => r.title.toLowerCase().includes(searchQuery) || r.description.toLowerCase().includes(searchQuery),
        )
      }

      if (include?.user || include?.nationality || include?.category) {
        return filtered.map((recipe) => ({
          ...recipe,
          user: include?.user ? mockUsers.find((u) => u.id === recipe.user_id) : undefined,
          nationality: include?.nationality ? mockNationalities.find((n) => n.id === recipe.nationality_id) : undefined,
          category: include?.category ? mockCategories.find((c) => c.id === recipe.category_id) : undefined,
        }))
      }
      return filtered
    },
    findUnique: async ({
      where,
      include,
    }: { where: { id: string }; include?: { user?: boolean; nationality?: boolean; category?: boolean } }) => {
      const recipe = mockRecipes.find((r) => r.id === where.id)
      if (!recipe) return null

      if (include?.user || include?.nationality || include?.category) {
        return {
          ...recipe,
          user: include?.user ? mockUsers.find((u) => u.id === recipe.user_id) : undefined,
          nationality: include?.nationality ? mockNationalities.find((n) => n.id === recipe.nationality_id) : undefined,
          category: include?.category ? mockCategories.find((c) => c.id === recipe.category_id) : undefined,
        }
      }
      return recipe
    },
    create: async ({ data }: { data: Omit<Recipe, "id" | "created_at"> }) => {
      const newRecipe: Recipe = {
        ...data,
        id: `recipe-${mockRecipes.length + 1}`,
        created_at: new Date().toISOString(),
      }
      mockRecipes.push(newRecipe)
      return newRecipe
    },
  },
  harmonization: {
    findMany: async ({
      where,
      include,
    }: {
      where?: { userId?: string; OR?: any[] }
      include?: { user?: boolean }
    }) => {
      let filtered = [...mockHarmonizations]

      if (where?.userId) {
        filtered = filtered.filter((h) => h.userId === where.userId)
      }
      if (where?.OR) {
        const searchQuery = where.OR[0].title.contains.toLowerCase()
        filtered = filtered.filter(
          (h) =>
            h.title.toLowerCase().includes(searchQuery) ||
            h.description.toLowerCase().includes(searchQuery) ||
            h.item1Name.toLowerCase().includes(searchQuery) ||
            h.item2Name.toLowerCase().includes(searchQuery),
        )
      }

      if (include?.user) {
        return filtered.map((h) => ({
          ...h,
          user: mockUsers.find((u) => u.id === h.userId),
        }))
      }
      return filtered
    },
    findUnique: async ({ where, include }: { where: { id: string }; include?: { user?: boolean } }) => {
      const harm = mockHarmonizations.find((h) => h.id === where.id)
      if (!harm) return null

      if (include?.user) {
        return {
          ...harm,
          user: mockUsers.find((u) => u.id === harm.userId),
        }
      }
      return harm
    },
    create: async ({ data }: { data: Omit<Harmonization, "id" | "createdAt"> }) => {
      const newHarmonization = {
        ...data,
        id: `harm-${mockHarmonizations.length + 1}`,
        createdAt: new Date().toISOString(),
      }
      mockHarmonizations.push(newHarmonization)
      return newHarmonization
    },
  },
}

export default prisma
