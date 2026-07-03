import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative bg-hero text-primary-foreground overflow-hidden">
      {/* Decorative geometric pattern */}
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radial gold glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl animate-shimmer" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-6 pt-40 pb-32 text-center">
        <div className="animate-fade-up">
          <img src={logoUrl} alt="Brasão A.R.L.S. União Fraternal" loading="eager" fetchPriority="high" decoding="sync" className="mx-auto h-32 w-32 mb-8 drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]" />
        </div>

        <p className="animate-fade-up text-gold uppercase tracking-[0.4em] text-xs mb-6" style={{ animationDelay: "0.1s" }}>
          Bem-vindo à
        </p>

        <h1 className="animate-fade-up font-display text-5xl md:text-7xl font-light mb-6 leading-[1.05]" style={{ animationDelay: "0.2s" }}>
          A.R.L.S. <span className="italic text-gold">União Fraternal</span><br />
          <span className="text-3xl md:text-5xl text-primary-foreground/80">Nº 120</span>
        </h1>

        <div className="animate-fade-up flex items-center justify-center gap-4 mb-8" style={{ animationDelay: "0.3s" }}>
          <span className="h-px w-12 bg-gold/50" />
          <p className="text-xs uppercase tracking-[0.4em] text-gold/80">
            Liberdade · Igualdade · Fraternidade
          </p>
          <span className="h-px w-12 bg-gold/50" />
        </div>

        <p className="animate-fade-up max-w-2xl mx-auto text-lg text-primary-foreground/70 leading-relaxed mb-12" style={{ animationDelay: "0.4s" }}>
          Loja Maçônica fundada em 2024 em Santos, dedicada à ética, sabedoria e união
          na construção de um mundo mais justo e fraterno.
        </p>

        <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: "0.5s" }}>
          <Button asChild size="lg" className="bg-gold-gradient text-primary hover:opacity-90 shadow-gold font-medium tracking-wide h-12 px-8">
            <Link to="/triagem">Iniciar minha jornada Maçônica</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-gold/40 text-primary-foreground bg-transparent hover:bg-gold/10 hover:text-gold h-12 px-8">
            <a href="#sobre">Conhecer a loja</a>
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
