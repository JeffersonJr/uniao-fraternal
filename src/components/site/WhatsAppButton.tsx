import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const number = "5511911019192";
  const message = "Olá! Gostaria de mais informações sobre a Loja Maçônica União Fraternal Nº 120.";
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-fade-up"
      style={{ animationDelay: "1s" }}
      aria-label="Falar conosco pelo WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
