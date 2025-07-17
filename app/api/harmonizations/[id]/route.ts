import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const harmonization = await prisma.harmonization.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })
    if (!harmonization) {
      return NextResponse.json({ error: "Harmonization not found" }, { status: 404 })
    }
    return NextResponse.json(harmonization)
  } catch (error) {
    console.error(`Error fetching harmonization ${id}:`, error)
    return NextResponse.json({ error: "Failed to fetch harmonization" }, { status: 500 })
  }
}
