"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

import HeroSection from "@/components/hero-section"
import RecipeCarousel from "@/components/recipe-carousel"
import NationalitySection from "@/components/nationality-section"
import FoodCategories from "@/components/food-categories"
import PairingSection from "@/components/pairing-section"
import DailyTips from "@/components/daily-tips"
import ContactSection from "@/components/contact-section"
import AnimatedBackground from "@/components/animated-background"

function FloatingAddButton() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <Link href="/adicionar-receita">
      <Button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center">
        <Plus className="w-8 h-8" />
      </Button>
    </Link>
  )
}

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <AnimatedBackground />
      <HeroSection />
      <RecipeCarousel />
      <NationalitySection />
      <FoodCategories />
      <PairingSection />
      <DailyTips />
      <ContactSection />
      <FloatingAddButton /> 
    </main>
  )
}
