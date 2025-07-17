import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        user: true,
        nationality: true,
        category: true,
      },
    })
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }
    return NextResponse.json(recipe)
  } catch (error) {
    console.error(`Error fetching recipe ${id}:`, error)
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 })
  }
}
