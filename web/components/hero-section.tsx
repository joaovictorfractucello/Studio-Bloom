"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://i.imgur.com/4u4aH4E.jpeg"
          alt="Studio Bloom - Ambiente elegante do salão"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-primary-foreground/90 text-sm tracking-[0.3em] uppercase mb-6 font-[family-name:var(--font-lato)]">
            Bem-vinda ao
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground mb-6 tracking-wide">
            Studio Bloom
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 font-light max-w-2xl mx-auto mb-4 leading-relaxed">
            Beleza que floresce em cada detalhe
          </p>
          <p className="text-base md:text-lg text-primary-foreground/75 font-[family-name:var(--font-lato)] font-light max-w-xl mx-auto mb-12">
            Descubra uma experiência única de cuidado, bem-estar e transformação
          </p>
          <a
            href="#agendar"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase font-[family-name:var(--font-lato)] hover:bg-primary/90 transition-all duration-300 rounded-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            Agende seu horário
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-16 bg-primary-foreground/30 relative overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-primary-foreground/60 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
