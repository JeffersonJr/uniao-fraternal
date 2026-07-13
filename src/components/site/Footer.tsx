import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/logo.webp";
import gombLogoUrl from "@/assets/gomb-logo.webp";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground/70 border-t border-gold/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Column 1: Brand Info & GOMB Affiliation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="Logo" className="h-12 w-12" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold">A.R.L.S.</div>
                <div className="font-display text-primary-foreground font-semibold">União Fraternal Nº 120</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed">
              Loja Maçônica simbólica, regular e legítima, fundada em 9 de março de 2024.
            </p>
            
            <a 
              href="https://gomb.org.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 pt-4 border-t border-primary-foreground/10 group/gomb hover:opacity-90 transition-opacity"
            >
              <img src={gombLogoUrl} alt="Logo GOMB" className="h-10 w-10 object-contain" />
              <div>
                <p className="text-[8px] uppercase tracking-wider text-gold font-bold">Filiada ao</p>
                <p className="text-[10px] text-primary-foreground/90 font-medium leading-tight group-hover/gomb:text-gold transition-colors">G.O.M.B. — Grande Oriente Maçônico do Brasil</p>
              </div>
            </a>
          </div>

          {/* Column 2: Navigation Shortcuts */}
          <div>
            <h2 className="text-gold font-display text-base font-semibold mb-4">Navegação</h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">Página Inicial</Link>
              </li>
              <li>
                <a href="/#sobre" className="hover:text-gold transition-colors">Sobre Nós</a>
              </li>
              <li>
                <a href="/#maconaria" className="hover:text-gold transition-colors">A Maçonaria</a>
              </li>
              <li>
                <a href="/#valores" className="hover:text-gold transition-colors">Nossos Valores</a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-gold transition-colors">Perguntas Frequentes (FAQ)</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Membership & Candidate Portals */}
          <div>
            <h2 className="text-gold font-display text-base font-semibold mb-4">Portais</h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/blog" className="hover:text-gold transition-colors">Blog Maçônico</Link>
              </li>

              <li>
                <Link to="/triagem" className="hover:text-gold transition-colors font-medium text-gold/90">Quero ser um Maçom</Link>
              </li>

              <li>
                <Link to="/politica-de-privacidade" className="hover:text-gold transition-colors">Política de Privacidade</Link>
              </li>
              <li>
                <Link to="/politica-de-privacidade" hash="cookies" className="hover:text-gold transition-colors">Uso de Cookies</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Principles */}
          <div className="space-y-4">
            <div>
              <h2 className="text-gold font-display text-base font-semibold mb-2">Contato</h2>
              <p className="text-xs leading-normal">
                R. Costa Rica, 81 — Guilhermina<br />
                Praia Grande — SP, 11702-190
              </p>
              <a href="mailto:contato@arlsuniaofraternal.com.br" className="text-xs text-gold hover:underline block mt-1">
                contato@arlsuniaofraternal.com.br
              </a>
            </div>
            <div className="pt-2 border-t border-primary-foreground/10">
              <h2 className="text-gold font-display text-xs uppercase tracking-widest mb-1.5">Princípios</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                Liberdade · Igualdade · Fraternidade
              </p>
            </div>
          </div>
        </div>

        <div className="gold-divider my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} A.R.L.S. União Fraternal Nº 120 — Oriente de Praia Grande</p>
          <p>
            Powered by:{" "}
            <a
              href="https://evolves.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold/80 transition-colors font-medium"
            >
              evolves tecnologia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
