import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoUrl from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome || isMenuOpen
          ? "bg-[#0A1128]/95 backdrop-blur-md shadow-elegant border-b border-gold/20 py-2 text-primary-foreground"
          : "bg-transparent py-3"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logoUrl}
            alt="A.R.L.S. União Fraternal Nº 120"
            className={`object-contain transition-all duration-300 ${scrolled ? "h-10 w-10" : "h-12 w-12"}`}
          />
          <div className="flex flex-col">
            <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.25em] text-gold/80">A.R.L.S.</div>
            <div className="font-display text-xs sm:text-base text-primary-foreground leading-tight">União Fraternal Nº 120</div>
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
        
        <div className="flex items-center gap-4">
          <Button asChild variant="default" className="hidden md:inline-flex bg-gold-gradient text-primary hover:opacity-90 font-medium">
            <Link to="/triagem">Quero ser um Maçom</Link>
          </Button>

          {/* Hamburger Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-primary-foreground hover:text-gold transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0A1128]/98 border-t border-gold/10 px-6 py-6 absolute top-full left-0 right-0 shadow-2xl animate-fade-down">
          <div className="flex flex-col gap-4 text-center text-primary-foreground/90 font-medium tracking-wide">
            <a href="/#sobre" onClick={() => setIsMenuOpen(false)} className="py-2.5 hover:text-gold transition-colors border-b border-white/5">Sobre</a>
            <a href="/#maconaria" onClick={() => setIsMenuOpen(false)} className="py-2.5 hover:text-gold transition-colors border-b border-white/5">Maçonaria</a>
            <a href="/#valores" onClick={() => setIsMenuOpen(false)} className="py-2.5 hover:text-gold transition-colors border-b border-white/5">Valores</a>
            <a href="/#macons" onClick={() => setIsMenuOpen(false)} className="py-2.5 hover:text-gold transition-colors border-b border-white/5">Maçons</a>
            <a href="/#faq" onClick={() => setIsMenuOpen(false)} className="py-2.5 hover:text-gold transition-colors border-b border-white/5">FAQ</a>
            <a href="/#contato" onClick={() => setIsMenuOpen(false)} className="py-2.5 hover:text-gold transition-colors border-b border-white/5">Contato</a>
            <Link to="/membros" onClick={() => setIsMenuOpen(false)} className="py-2.5 hover:text-gold transition-colors border-b border-white/5 font-semibold">Membros</Link>
            
            <div className="pt-3">
              <Button asChild variant="default" className="w-full bg-gold-gradient text-primary hover:opacity-90 font-medium py-6 rounded-xl">
                <Link to="/triagem" onClick={() => setIsMenuOpen(false)}>Quero ser um Maçom</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
