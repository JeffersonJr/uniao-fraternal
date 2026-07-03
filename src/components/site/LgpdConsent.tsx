import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

export function LgpdConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check local storage client-side to avoid SSR hydration mismatches
    const consent = localStorage.getItem("lgpd-consent-v1");
    if (!consent) {
      // Delay visibility slightly for a premium feel
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("lgpd-consent-v1", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("lgpd-consent-v1", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6 flex justify-center animate-fade-up print:hidden">
      <div className="bg-[#0A1128]/95 backdrop-blur-md border border-gold/30 rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Info Text */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 text-gold" />
          </div>
          <div className="space-y-1">
            <h2 className="font-display text-sm font-semibold text-primary-foreground">
              Aviso de Privacidade & Cookies (LGPD)
            </h2>
            <p className="text-xs text-primary-foreground/70 leading-relaxed">
              Este site utiliza cookies essenciais para melhorar sua experiência de navegação,
              segurança e funcionamento, em total conformidade com a Lei Geral de Proteção de Dados (LGPD).
              Ao continuar, você concorda com nossos termos. Leia nossa{" "}
              <Link
                to="/politica-de-privacidade"
                className="text-gold hover:underline font-semibold"
                onClick={() => setVisible(false)}
              >
                Política de Privacidade e Cookies
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-shrink-0">
          <Button
            variant="ghost"
            onClick={handleDecline}
            className="text-xs text-primary-foreground/50 hover:text-primary-foreground hover:bg-white/5 h-9 px-4 cursor-pointer"
          >
            Recusar
          </Button>
          <Button
            onClick={handleAccept}
            className="bg-gold-gradient text-primary hover:opacity-90 font-medium text-xs h-9 px-5 shadow-gold rounded-lg cursor-pointer"
          >
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
