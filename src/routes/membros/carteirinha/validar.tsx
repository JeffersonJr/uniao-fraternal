import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Member, getMemberById, getMembers } from "@/lib/members-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ShieldCheck, ShieldAlert, ArrowLeft, Calendar, FileText, User, Mail, Search, CheckCircle } from "lucide-react";
import logoUrl from "@/assets/logo.svg";

const searchSchema = z.object({
  id: z.string().optional(),
});

export const Route = createFileRoute("/membros/carteirinha/validar")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Validador de Carteirinha — A.R.L.S. União Fraternal Nº 1" },
      { name: "description", content: "Validador oficial de identificação maçônica. Verifique a autenticidade de membros." },
    ],
  }),
  component: ValidateCardPage,
});

function ValidateCardPage() {
  const search = Route.useSearch();
  const [member, setMember] = useState<Member | null>(null);
  const [searchId, setSearchId] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [validationTime, setValidationTime] = useState("");

  useEffect(() => {
    if (search.id) {
      const found = getMemberById(search.id);
      setMember(found || null);
      setSearched(true);
      setSearchId(search.id);
    } else {
      setMember(null);
      setSearched(false);
    }
    setLoading(false);
    setValidationTime(
      new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        dateStyle: "long",
        timeStyle: "medium",
      })
    );
  }, [search.id]);

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    // Search first by ID
    let found = getMemberById(searchId.trim());
    
    // If not found, try searching by CIM number
    if (!found) {
      const all = getMembers();
      found = all.find((m) => m.cim === searchId.trim()) || null;
    }

    setMember(found || null);
    setSearched(true);
    setLoading(false);
    setValidationTime(
      new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        dateStyle: "long",
        timeStyle: "medium",
      })
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-28 pb-16 px-6">
        <div className="mx-auto max-w-2xl">
          {/* Back button */}
          <Link
            to="/membros"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao Portal
          </Link>

          {/* Title */}
          <div className="mb-10 text-center animate-fade-up">
            <ShieldCheck className="w-12 h-12 text-gold mx-auto mb-4 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-2">Segurança e Autenticação</p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-primary">
              Validador de Credenciais
            </h1>
            <div className="gold-divider w-24 mx-auto mt-4" />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-10 h-10 rounded-full border-4 border-gold border-t-transparent animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">Validando credencial...</p>
            </div>
          ) : searched ? (
            /* VALIDATION RESULT */
            <div className="space-y-6 animate-fade-up">
              {member ? (
                /* VALID CARD */
                <div className="bg-card border-2 border-emerald-500 rounded-3xl p-8 shadow-elegant text-center relative overflow-hidden">
                  {/* Decorative green accent */}
                  <div className="absolute top-0 inset-x-0 h-2 bg-emerald-500" />
                  
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5 border border-emerald-500/30">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 tracking-wider uppercase inline-block mb-3">
                    Credencial Válida
                  </span>
                  
                  <h2 className="font-display text-2xl md:text-3xl text-primary font-bold mb-2">
                    Identidade Autenticada
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
                    Confirmamos que o membro abaixo é regular e está devidamente registrado nos arquivos da A.R.L.S. União Fraternal Nº 1.
                  </p>

                  {/* Member Badge info */}
                  <div className="bg-muted border border-border rounded-2xl p-6 text-left flex flex-col md:flex-row items-center gap-6 mb-6">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-gold flex-shrink-0 bg-black/5 flex items-center justify-center">
                      {member.photo ? (
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-display text-gold text-3xl">G</span>
                      )}
                    </div>
                    <div className="min-w-0 text-center md:text-left flex-grow">
                      <h3 className="font-display text-xl text-primary font-bold truncate">
                        {member.name}
                      </h3>
                      <p className="text-gold uppercase tracking-wider text-xs font-semibold mt-0.5">
                        {member.role}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 pt-4 border-t border-border/70 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-gold/80" />
                          <span>CIM: <strong className="text-foreground">{member.cim}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gold/80" />
                          <span>Início: <strong className="text-foreground">{member.initiationDate}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timestamp & Authority details */}
                  <div className="text-[10px] text-muted-foreground text-center border-t border-border pt-6 space-y-1">
                    <p>Consultado em: <strong>{validationTime}</strong></p>
                    <p className="uppercase tracking-wider text-gold/60 mt-2 font-bold">
                      A.R.L.S. União Fraternal Nº 1
                    </p>
                    <p>Oriente de Praia Grande · SP · Brasil</p>
                    <p className="text-[9px] text-gold/65 font-medium mt-1">Filiada ao Grande Oriente Maçônico do Brasil (GOMB)</p>
                  </div>
                </div>
              ) : (
                /* INVALID / NOT FOUND CARD */
                <div className="bg-card border-2 border-destructive/80 rounded-3xl p-8 shadow-elegant text-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-2 bg-destructive/85" />
                  
                  <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-5 border border-destructive/30">
                    <ShieldAlert className="w-10 h-10 text-destructive" />
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-destructive/10 text-destructive border border-destructive/20 tracking-wider uppercase inline-block mb-3">
                    Aviso de Segurança
                  </span>
                  
                  <h2 className="font-display text-2xl md:text-3xl text-primary font-bold mb-2">
                    Registro não Encontrado
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
                    A credencial com o ID ou CIM informado <strong className="text-destructive">"{searchId}"</strong> não foi localizada em nossos cadastros ou está inativa.
                  </p>
                  <p className="text-xs text-muted-foreground/80 leading-normal max-w-sm mx-auto mb-8 bg-destructive/5 p-4 rounded-xl border border-destructive/10">
                    Atenção: Apenas membros em situação cadastral regular possuem credenciais válidas. Se você acredita que isso é um erro, contate a Secretaria da Loja.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => {
                        setSearched(false);
                        setSearchId("");
                      }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 text-xs font-semibold"
                    >
                      Tentar Novamente
                    </Button>
                    <Button asChild variant="outline" className="border-border hover:bg-secondary h-10 px-6 text-xs font-semibold">
                      <Link to="/membros">Ver Lista de Membros</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* LOOKUP FORM */
            <div
              className="bg-card border border-border rounded-2xl p-8 shadow-elegant animate-fade-up font-sans"
              style={{ animationDelay: "0.1s" }}
            >
              <form onSubmit={handleManualSearch} className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Insira o ID de validação ou o número CIM do membro abaixo para consultar as informações oficiais e a situação cadastral em tempo real.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="searchId" className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-gold" /> Identificador / CIM do Membro
                  </Label>
                  <Input
                    type="text"
                    id="searchId"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Ex: jefferson-campos-beira-junior ou 32071"
                    required
                    className="h-12 bg-background border-border hover:border-gold/30 focus-visible:ring-gold"
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <Button type="submit" className="bg-gold-gradient text-primary hover:opacity-90 shadow-gold font-medium h-11 px-8">
                    Consultar Credencial
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
