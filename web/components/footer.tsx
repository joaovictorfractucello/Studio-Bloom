export function Footer() {
  return (
    <footer className="py-16 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-light tracking-wide mb-4">Studio Bloom</h3>
            <p className="text-primary-foreground/70 font-[family-name:var(--font-lato)] font-light leading-relaxed">
              Beleza que floresce em cada detalhe. Seu destino para cuidado, bem-estar e transformação.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-4 font-[family-name:var(--font-lato)]">
              Horário de Funcionamento
            </h4>
            <div className="space-y-2 text-primary-foreground/70 font-[family-name:var(--font-lato)] font-light">
              <p>Segunda a Sexta: 9h às 20h</p>
              <p>Sábado: 9h às 18h</p>
              <p>Domingo: Fechado</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-4 font-[family-name:var(--font-lato)]">Contato</h4>
            <div className="space-y-2 text-primary-foreground/70 font-[family-name:var(--font-lato)] font-light">
              <p>Rua das Flores, 123</p>
              <p>Centro, São Paulo - SP</p>
              <p className="mt-4">(11) 97070-6969</p>
              <p>contato@studiobloom.com.br</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-sm text-primary-foreground/50 font-[family-name:var(--font-lato)]">
            Studio Bloom. Projeto conceitual para portfólio.
          </p>
        </div>
      </div>
    </footer>
  )
}
