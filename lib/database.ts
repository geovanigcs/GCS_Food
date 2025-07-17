import { neon } from "@neondatabase/serverless"

const sql = neon(
  process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_RbLBSVcQd17P@ep-young-paper-adgi4a6h-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
)

export { sql }

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  google_id?: string
  created_at: string
}

export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  image_url?: string
  prep_time?: number
  user_id: string
  nationality_id: string
  category_id: string
  created_at: string
  nationality?: Nationality
  category?: Category
  user?: User
}

export interface Nationality {
  id: string
  name: string
  flag_emoji?: string
}

export interface Category {
  id: string
  name: string
  emoji?: string
}

export interface Harmonization {
  id: string
  title: string
  description: string
  item1Name: string // Renamed from wineName
  item2Name: string // Renamed from foodName
  imageUrl?: string
  item1Color?: string // Renamed from wineColor
  userId: string
  createdAt: string
  user?: User
}
