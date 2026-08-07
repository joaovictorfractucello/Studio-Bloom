"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#experiencia", label: "Experiência" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-2xl md:text-3xl font-semibold tracking-wide text-primary">
          Studio Bloom
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 text-sm tracking-widest uppercase font-[family-name:var(--font-lato)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#agendar"
            className="ml-4 px-6 py-2.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-[family-name:var(--font-lato)] hover:bg-primary/90 transition-all duration-300 rounded-sm"
          >
            Agendar
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col items-center py-6 gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 text-sm tracking-widest uppercase font-[family-name:var(--font-lato)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#agendar"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-[family-name:var(--font-lato)] hover:bg-primary/90 transition-all duration-300 rounded-sm"
          >
            Agendar
          </a>
        </nav>
      </div>
    </header>
  )
}
