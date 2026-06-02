import logoUrl from "@/assets/logo.svg";
import gombLogoUrl from "@/assets/gomb-logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground/70">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoUrl} alt="Logo" className="h-12 w-12" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold">A.R.L.S.</div>
                <div className="font-display text-primary-foreground">União Fraternal Nº 1</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Loja Maçônica simbólica, regular e legítima, fundada em 9 de março de 2024.
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-primary-foreground/10">
              <img src={gombLogoUrl} alt="Logo GOMB" className="h-10 w-10 object-contain bg-white/5 rounded p-0.5" />
              <div>
                <p className="text-[8px] uppercase tracking-wider text-gold font-bold">Filiada ao</p>
                <p className="text-[10px] text-primary-foreground/90 font-medium leading-tight">G.O.M.B. — Grande Oriente Maçônico do Brasil</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-gold font-display text-lg mb-3">Contato</h4>
            <p className="text-sm">R. Costa Rica, 81 — Guilhermina<br />Praia Grande — SP, 11702-190</p>
            <p className="text-sm mt-2">contato@arlsuniaofraternal.com.br</p>
          </div>
          <div>
            <h4 className="text-gold font-display text-lg mb-3">Princípios</h4>
            <p className="text-sm uppercase tracking-[0.3em]">Liberdade<br />Igualdade<br />Fraternidade</p>
          </div>
        </div>
        <div className="gold-divider my-10" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} A.R.L.S. União Fraternal Nº 1 — Oriente de Praia Grande</p>
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
