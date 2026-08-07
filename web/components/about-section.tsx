"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

export function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section id="sobre" ref={ref} className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span
            className={cn(
              "inline-block text-primary text-sm tracking-[0.3em] uppercase mb-6 font-[family-name:var(--font-lato)] transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            Nossa Essência
          </span>
          <h2
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-8 transition-all duration-700 delay-100",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            Sobre o Studio Bloom
          </h2>
          <div
            className={cn(
              "w-16 h-px bg-accent mx-auto mb-10 transition-all duration-700 delay-200",
              isInView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
            )}
          />
          <p
            className={cn(
              "text-lg md:text-xl text-muted-foreground font-[family-name:var(--font-lato)] font-light leading-relaxed mb-8 transition-all duration-700 delay-300",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            No Studio Bloom, acreditamos que a beleza vai além da aparência. É sobre como você se sente ao olhar no
            espelho, a confiança que emana de dentro para fora e o cuidado que você merece receber.
          </p>
          <p
            className={cn(
              "text-lg md:text-xl text-muted-foreground font-[family-name:var(--font-lato)] font-light leading-relaxed transition-all duration-700 delay-400",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            Criamos um espaço onde cada detalhe foi pensado para proporcionar momentos de relaxamento e renovação. Nossa
            equipe dedicada está aqui para elevar sua autoestima e revelar a melhor versão de você.
          </p>
        </div>
      </div>
    </section>
  )
}
