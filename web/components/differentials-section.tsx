"use client"

import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { Users, Award, Home, Gem } from "lucide-react"

const differentials = [
  {
    icon: Users,
    title: "Atendimento Personalizado",
    description: "Cada cliente é única. Ouvimos suas necessidades e criamos experiências sob medida.",
  },
  {
    icon: Award,
    title: "Profissionais Qualificados",
    description: "Nossa equipe é formada por especialistas em constante atualização.",
  },
  {
    icon: Home,
    title: "Ambiente Acolhedor",
    description: "Um espaço pensado para seu conforto e relaxamento completo.",
  },
  {
    icon: Gem,
    title: "Produtos Premium",
    description: "Trabalhamos apenas com marcas reconhecidas pela qualidade e resultados.",
  },
]

export function DifferentialsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="diferenciais" ref={ref} className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            className={cn(
              "relative aspect-[4/5] rounded-sm overflow-hidden transition-all duration-1000",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
            )}
          >
            <Image
              src="https://i.imgur.com/gorv501.jpeg"
              alt="Profissional do Studio Bloom em atendimento"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Content */}
          <div>
            <span
              className={cn(
                "inline-block text-primary text-sm tracking-[0.3em] uppercase mb-6 font-[family-name:var(--font-lato)] transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              )}
            >
              Por que nos escolher
            </span>
            <h2
              className={cn(
                "text-4xl md:text-5xl font-light text-foreground mb-10 transition-all duration-700 delay-100",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              )}
            >
              Nossos Diferenciais
            </h2>

            <div className="space-y-8">
              {differentials.map((item, index) => (
                <div
                  key={item.title}
                  className={cn(
                    "flex gap-5 transition-all duration-700",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  )}
                  style={{ transitionDelay: isInView ? `${200 + index * 100}ms` : "0ms" }}
                >
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center flex-shrink-0 border border-border/50">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground font-[family-name:var(--font-lato)] font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
