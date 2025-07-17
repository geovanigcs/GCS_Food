import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const nationalityId = searchParams.get("nationalityId")
  const categoryId = searchParams.get("categoryId")
  const searchQuery = searchParams.get("search")

  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        ...(nationalityId && { nationalityId }),
        ...(categoryId && { categoryId }),
        ...(searchQuery && {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        user: true,
        nationality: true,
        category: true,
      },
    })
    return NextResponse.json(recipes)
  } catch (error) {
    console.error("Error fetching recipes:", error)
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 })
  }
}
