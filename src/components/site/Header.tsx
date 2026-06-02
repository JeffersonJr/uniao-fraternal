import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoUrl from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md shadow-elegant border-b border-gold/20 py-2"
          : "bg-transparent py-3"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logoUrl}
            alt="A.R.L.S. União Fraternal Nº 1"
            className={`object-contain transition-all duration-300 ${scrolled ? "h-10 w-10" : "h-12 w-12"}`}
          />
          <div className="hidden sm:block">
            <div className="text-[10px] uppercase tracking-[0.25em] text-gold/80">A.R.L.S.</div>
            <div className="font-display text-base text-primary-foreground leading-tight">União Fraternal Nº 1</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-primary-foreground/80">
          <a href="/#sobre" className="hover:text-gold transition-colors">Sobre</a>
          <a href="/#maconaria" className="hover:text-gold transition-colors">Maçonaria</a>
          <a href="/#valores" className="hover:text-gold transition-colors">Valores</a>
          <a href="/#macons" className="hover:text-gold transition-colors">Maçons</a>
          <a href="/#faq" className="hover:text-gold transition-colors">FAQ</a>
          <a href="/#contato" className="hover:text-gold transition-colors">Contato</a>
          <Link to="/membros" className="hover:text-gold transition-colors font-medium">Membros</Link>
        </nav>
        <Button asChild variant="default" className="bg-gold-gradient text-primary hover:opacity-90 font-medium">
          <Link to="/triagem">Quero ser um Maçom</Link>
        </Button>
      </div>
    </header>
  );
}
