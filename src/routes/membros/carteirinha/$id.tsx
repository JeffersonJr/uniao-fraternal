import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Member, getMemberById } from "@/lib/members-db";
import { MembershipCard } from "@/components/members/MembershipCard";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, ShieldCheck, Share2 } from "lucide-react";

export const Route = createFileRoute("/membros/carteirinha/$id")({
  head: () => ({
    meta: [
      { title: "Carteirinha Virtual — A.R.L.S. União Fraternal Nº 1" },
      { name: "description", content: "Visualização da carteirinha de membro virtual da União Fraternal." },
    ],
  }),
  component: ViewMembershipCard,
});

function ViewMembershipCard() {
  const { id } = useParams({ from: "/membros/carteirinha/$id" });
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"digital" | "print">("digital");

  useEffect(() => {
    // Load member client-side
    const found = getMemberById(id);
    setMember(found || null);
    setLoading(false);
  }, [id]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      if (viewMode !== "print") {
        setViewMode("print");
        setTimeout(() => {
          window.print();
        }, 200);
      } else {
        window.print();
      }
    }
  };

  const handlePrintDigitalPdf = () => {
    if (typeof window !== "undefined") {
      document.body.classList.add("print-mode-digital-pdf");
      
      const cleanUp = () => {
        document.body.classList.remove("print-mode-digital-pdf");
        window.removeEventListener("afterprint", cleanUp);
      };
      
      window.addEventListener("afterprint", cleanUp);
      
      setTimeout(() => {
        window.print();
      }, 100);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share && member) {
      navigator
        .share({
          title: `Carteirinha Virtual - ${member.name}`,
          text: `Carteirinha oficial da Loja União Fraternal de ${member.name}.`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copiado para a área de transferência!");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-28 pb-16">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-4 border-gold border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">Carregando carteirinha...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-28 pb-16 px-6">
          <div className="text-center max-w-md">
            <h1 className="font-display text-4xl text-primary font-bold mb-4">404</h1>
            <h2 className="text-xl font-semibold mb-2">Carteirinha Não Encontrada</h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              O registro do membro informado não existe ou não foi localizado no banco de dados da Loja.
            </p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6">
              <Link to="/membros">Voltar ao Portal de Membros</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="screen-layout min-h-screen bg-background flex flex-col justify-between print:bg-white print:min-h-0">
        <div className="print:hidden">
          <Header />
        </div>

        <main className="flex-grow pt-28 pb-16 px-6 print:p-0 print:pt-4">
          <div className="mx-auto max-w-4xl flex flex-col items-center">
            {/* Top navigation - hide on print */}
            <div className="w-full flex justify-between items-center mb-8 print:hidden max-w-3xl">
              <Link
                to="/membros"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Todos os Membros
              </Link>

              <Link
                to="/membros/carteirinha/validar"
                search={{ id: member.id }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold hover:text-gold/80 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" /> Validar Carteirinha
              </Link>
            </div>

            {/* Tab Switcher - hide on print */}
            <div className="flex bg-secondary border border-border p-1 rounded-xl mb-8 w-full max-w-[380px] print:hidden animate-fade-up">
              <button
                onClick={() => setViewMode("digital")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  viewMode === "digital"
                    ? "bg-card text-primary shadow-sm border border-border"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Versão Digital (Vertical)
              </button>
              <button
                onClick={() => setViewMode("print")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  viewMode === "print"
                    ? "bg-card text-primary shadow-sm border border-border"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Versão Impressa (Horizontal)
              </button>
            </div>

            {/* Interactive membership card wrapper */}
            <div className="flex justify-center w-full mb-8 animate-fade-up print:m-0">
              <MembershipCard member={member} viewMode={viewMode} />
            </div>

            {/* Actions Bar - hide on print */}
            <div
              className="flex flex-col gap-2 items-center w-full max-w-[380px] print:hidden"
            >
              <div
                className="flex gap-3 justify-center w-full animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                {viewMode === "digital" ? (
                  <Button
                    onClick={handlePrintDigitalPdf}
                    className="bg-gold-gradient text-primary hover:opacity-90 shadow-gold h-11 px-5 text-xs font-semibold flex-1 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Baixar PDF (Digital)
                  </Button>
                ) : (
                  <Button
                    onClick={handlePrint}
                    className="bg-gold-gradient text-primary hover:opacity-90 shadow-gold h-11 px-5 text-xs font-semibold flex-1 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Baixar PDF (Impressa)
                  </Button>
                )}

                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-border text-muted-foreground hover:bg-secondary h-11 px-5 text-xs font-semibold flex-1 cursor-pointer"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar Link
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2 italic animate-fade-up">
                * Dica: Na janela de impressão, escolha a opção <strong>"Salvar como PDF"</strong> para baixar o arquivo.
              </p>
            </div>
          </div>
        </main>

        <div className="print:hidden">
          <Footer />
        </div>
      </div>

      {/* Hidden 2-page print container for vertical digital PDF */}
      <div className="digital-pdf-print-container">
        <MembershipCard member={member} viewMode="digital-pdf" />
      </div>
    </>
  );
}
