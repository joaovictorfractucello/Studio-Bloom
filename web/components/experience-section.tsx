"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Escolha",
    description: "Navegue pelos nossos serviços e escolha o que melhor atende às suas necessidades.",
  },
  {
    number: "02",
    title: "Agendamento",
    description: "Agende seu horário de forma rápida e prática, no dia e hora que preferir.",
  },
  {
    number: "03",
    title: "Atendimento",
    description: "Relaxe em nosso ambiente acolhedor enquanto nossos profissionais cuidam de você.",
  },
  {
    number: "04",
    title: "Resultado",
    description: "Saia renovada, confiante e pronta para brilhar com sua melhor versão.",
  },
]

export function ExperienceSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="experiencia" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className={cn(
              "inline-block text-primary text-sm tracking-[0.3em] uppercase mb-6 font-[family-name:var(--font-lato)] transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            Sua jornada conosco
          </span>
          <h2
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 transition-all duration-700 delay-100",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            A Experiência Studio Bloom
          </h2>
          <div
            className={cn(
              "w-16 h-px bg-accent mx-auto transition-all duration-700 delay-200",
              isInView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={cn(
                "relative text-center p-6 transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: isInView ? `${300 + index * 150}ms` : "0ms" }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-border" />
              )}

              <span className="text-5xl font-light text-accent/60 mb-4 block">{step.number}</span>
              <h3 className="text-2xl font-medium text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground font-[family-name:var(--font-lato)] font-light">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
