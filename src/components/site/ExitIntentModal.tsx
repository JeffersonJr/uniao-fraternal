import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";
import logoUrl from "@/assets/logo.webp";

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only run on the client
    if (typeof window === "undefined") return;

    // Check if the user has already seen the exit intent
    const hasSeenExitIntent = sessionStorage.getItem("uf120-exit-intent");
    if (hasSeenExitIntent) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // If the mouse moves up out of the viewport
      if (e.clientY <= 0) {
        setIsOpen(true);
        sessionStorage.setItem("uf120-exit-intent", "true");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-card border border-border shadow-elegant rounded-3xl p-8 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors z-10"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center space-y-6">
          <img src={logoUrl} alt="Logo" className="w-20 h-20 mx-auto drop-shadow-md" />
          
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-semibold text-primary leading-tight">
              Sua jornada está apenas começando...
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm px-2">
              Antes de partir, reflita: a verdadeira busca pela Luz exige um primeiro passo. 
              Não deixe essa oportunidade de aperfeiçoamento passar. Inicie sua jornada maçônica 
              ou tire suas dúvidas diretamente conosco.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button asChild size="lg" className="bg-gold-gradient text-primary hover:opacity-90 shadow-gold font-medium h-12 px-6">
              <Link to="/triagem" onClick={() => setIsOpen(false)}>Quero ser um Maçom</Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="h-12 px-6 gap-2 border-primary/20 text-primary hover:bg-primary/5">
              <a href="https://wa.me/5511911019192?text=Ol%C3%A1%21%20Gostaria%20de%20tirar%20algumas%20d%C3%BAvidas%20sobre%20a%20Ma%C3%A7onaria." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
