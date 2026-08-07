"use client"

import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

export function CTASection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  const whatsappMessage = encodeURIComponent(
    "Olá! 🌸\n\nVim através do site do Studio Bloom e gostaria de agendar um horário.\n\nPoderiam me informar a disponibilidade e os valores, por favor?",
  )

  return (
    <section id="agendar" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://i.imgur.com/kHN3ttI.jpeg"
          alt="Ambiente relaxante do Studio Bloom"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <span
          className={cn(
            "inline-block text-primary-foreground/80 text-sm tracking-[0.3em] uppercase mb-6 font-[family-name:var(--font-lato)] transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          Venha nos visitar
        </span>
        <h2
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-light text-primary-foreground mb-6 max-w-3xl mx-auto leading-tight transition-all duration-700 delay-100",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          Pronta para florescer?
        </h2>
        <p
          className={cn(
            "text-lg md:text-xl text-primary-foreground/80 font-[family-name:var(--font-lato)] font-light max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          Reserve seu momento de cuidado e transformação. Estamos esperando por você para criar juntas uma experiência
          inesquecível.
        </p>
        <div
          className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-300",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          <a
            href={`https://wa.me/5511986304248?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase font-[family-name:var(--font-lato)] hover:bg-primary/90 transition-all duration-300 rounded-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Agendar via WhatsApp
          </a>
          <a
            href="tel:+5500000000000"
            className="inline-block px-10 py-4 border border-primary-foreground/50 text-primary-foreground text-sm tracking-[0.2em] uppercase font-[family-name:var(--font-lato)] hover:bg-primary-foreground/10 transition-all duration-300 rounded-sm"
          >
            Ligar agora
          </a>
        </div>
      </div>
    </section>
  )
}
