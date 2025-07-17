import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    // In a real app, you'd validate data and ensure user is authenticated
    const newHarmonization = await prisma.harmonization.create({ data })
    return NextResponse.json(newHarmonization, { status: 201 })
  } catch (error) {
    console.error("Error creating harmonization:", error)
    return NextResponse.json({ error: "Failed to create harmonization" }, { status: 500 })
  }
}
