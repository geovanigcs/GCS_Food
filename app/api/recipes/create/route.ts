import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    // In a real app, you'd validate data and ensure user is authenticated
    const newRecipe = await prisma.recipe.create({ data })
    return NextResponse.json(newRecipe, { status: 201 })
  } catch (error) {
    console.error("Error creating recipe:", error)
    return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 })
  }
}
