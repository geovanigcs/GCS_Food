import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const searchQuery = searchParams.get("search")
  const userId = searchParams.get("userId")

  try {
    const harmonizations = await prisma.harmonization.findMany({
      where: {
        ...(userId && { userId }),
        ...(searchQuery && {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
            { item1Name: { contains: searchQuery, mode: "insensitive" } }, // Updated
            { item2Name: { contains: searchQuery, mode: "insensitive" } }, // Updated
          ],
        }),
      },
      include: {
        user: true,
      },
    })
    return NextResponse.json(harmonizations)
  } catch (error) {
    console.error("Error fetching harmonizations:", error)
    return NextResponse.json({ error: "Failed to fetch harmonizations" }, { status: 500 })
  }
}
