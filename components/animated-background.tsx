"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const elements = container.querySelectorAll(".floating-element")

    elements.forEach((element, index) => {
      gsap.set(element, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      })

      gsap.to(element, {
        duration: 10 + Math.random() * 20,
        x: `+=${(Math.random() - 0.5) * 400}`,
        y: `+=${(Math.random() - 0.5) * 400}`,
        rotation: `+=${360 + Math.random() * 360}`,
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: index * 0.5,
      })
    })
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden opacity-10 z-0">
      <div className="floating-element absolute text-6xl text-gray-800 dark:text-gray-200">🌿</div>
      <div className="floating-element absolute text-4xl text-gray-800 dark:text-gray-200">🍷</div>
      <div className="floating-element absolute text-5xl text-gray-800 dark:text-gray-200">🧄</div>
      <div className="floating-element absolute text-3xl text-gray-800 dark:text-gray-200">🍅</div>
      <div className="floating-element absolute text-4xl text-gray-800 dark:text-gray-200">🫒</div>
      <div className="floating-element absolute text-5xl text-gray-800 dark:text-gray-200">🌶️</div>
      <div className="floating-element absolute text-3xl text-gray-800 dark:text-gray-200">🧅</div>
      <div className="floating-element absolute text-4xl text-gray-800 dark:text-gray-200">🥖</div>
      <div className="floating-element absolute text-5xl text-gray-800 dark:text-gray-200">🍯</div>
      <div className="floating-element absolute text-3xl text-gray-800 dark:text-gray-200">🧀</div>
      <div className="floating-element absolute text-4xl text-gray-800 dark:text-gray-200">🥩</div>
      <div className="floating-element absolute text-5xl text-gray-800 dark:text-gray-200">🍋</div>
    </div>
  )
}
