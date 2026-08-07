"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { Scissors, Sparkles, Heart } from "lucide-react"

const services = [
  {
    icon: Scissors,
    title: "Cabelo",
    description:
      "Cortes personalizados, coloração sofisticada e tratamentos capilares que transformam e revitalizam seus fios.",
    items: ["Corte feminino e masculino", "Coloração e mechas", "Tratamentos reconstrutores", "Penteados e escovas"],
  },
  {
    icon: Sparkles,
    title: "Manicure & Pedicure",
    description: "Cuidados completos para suas mãos e pés, com técnicas refinadas e produtos de alta qualidade.",
    items: ["Manicure tradicional", "Pedicure spa", "Esmaltação em gel", "Nail art exclusiva"],
  },
  {
    icon: Heart,
    title: "Estética",
    description: "Tratamentos estéticos que cuidam da sua pele e proporcionam bem-estar completo.",
    items: ["Limpeza de pele", "Hidratação facial", "Design de sobrancelhas", "Massagem relaxante"],
  },
]

export function ServicesSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="servicos" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className={cn(
              "inline-block text-primary text-sm tracking-[0.3em] uppercase mb-6 font-[family-name:var(--font-lato)] transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            O que oferecemos
          </span>
          <h2
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 transition-all duration-700 delay-100",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            Nossos Serviços
          </h2>
          <div
            className={cn(
              "w-16 h-px bg-accent mx-auto transition-all duration-700 delay-200",
              isInView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
            )}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={cn(
                "group bg-card p-8 lg:p-10 rounded-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: isInView ? `${300 + index * 150}ms` : "0ms" }}
            >
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground font-[family-name:var(--font-lato)] font-light leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-muted-foreground font-[family-name:var(--font-lato)] flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
