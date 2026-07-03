import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const number = "5511911019192";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMessage = `*Nova mensagem do site*\n\n*Nome:* ${name}\n*E-mail:* ${email}\n\n*Mensagem:*\n${msg}`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(url, "_blank");
    setIsOpen(false);
    setName("");
    setEmail("");
    setMsg("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-fade-up ${isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100 pointer-events-auto"}`}
        style={{ animationDelay: "1s" }}
        aria-label="Falar conosco pelo WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Popup Form */}
      <div 
        className={`fixed bottom-6 right-6 z-[100] w-[calc(100vw-3rem)] sm:w-[340px] bg-card border border-border shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform origin-bottom-right ${isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-50 opacity-0 pointer-events-none"}`}
      >
        {/* Header */}
        <div className="bg-[#25D366] p-4 text-white flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <h3 className="font-semibold text-sm">Atendimento via WhatsApp</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-full transition-colors" aria-label="Fechar">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Preencha seus dados abaixo para iniciar a conversa com a secretaria da Loja.
          </p>
          
          <div className="space-y-1.5">
            <label htmlFor="wa-name" className="text-xs font-semibold text-foreground">Nome completo</label>
            <input 
              id="wa-name"
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-9 px-3 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              placeholder="Seu nome"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="wa-email" className="text-xs font-semibold text-foreground">E-mail</label>
            <input 
              id="wa-email"
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-9 px-3 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="wa-msg" className="text-xs font-semibold text-foreground">Mensagem</label>
            <textarea 
              id="wa-msg"
              required
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="w-full min-h-[80px] p-3 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary resize-none transition-shadow"
              placeholder="Como podemos te ajudar hoje?"
            />
          </div>

          <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#20b858] text-white h-10 mt-2 gap-2 shadow-sm">
            <Send className="w-4 h-4" />
            Iniciar Conversa
          </Button>
        </form>
      </div>
    </>
  );
}
