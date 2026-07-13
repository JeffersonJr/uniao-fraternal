import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Member, getMembers } from "@/lib/members-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Search, UserPlus, CreditCard, ShieldCheck, Mail, Calendar, Hash, Lock } from "lucide-react";
import logoUrl from "@/assets/logo.webp";

export const Route = createFileRoute("/membros/")({
  head: () => ({
    meta: [
      { title: "Portal de Membros — A.R.L.S. União Fraternal Nº 120" },
      { name: "description", content: "Portal oficial dos membros da Loja Maçônica União Fraternal. Acesse e emita sua carteirinha virtual." },
    ],
  }),
  component: MembersPortal,
});

function MembersPortal() {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if already authenticated in this session
    const auth = sessionStorage.getItem("membros_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    
    // Load members client-side to ensure localStorage is accessible
    setMembers(getMembers());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "uniao@2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("membros_auth", "true");
      setError("");
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  const filteredMembers = members.filter((m) => {
    const term = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(term) ||
      m.cim.includes(term) ||
      m.role.toLowerCase().includes(term)
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Header />
        <main className="flex-grow pt-28 pb-16 px-6 flex items-center justify-center">
          <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-elegant animate-fade-up">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-gold" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-primary">Acesso Restrito</h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Digite a senha de acesso para visualizar o portal de membros.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Senha de acesso"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-background border-border focus-visible:ring-gold"
                />
                {error && <p className="text-destructive text-xs mt-2 text-left">{error}</p>}
              </div>
              <Button type="submit" className="w-full bg-gold-gradient text-primary hover:opacity-90 shadow-gold h-12 font-medium">
                Acessar Portal
              </Button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-28 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-fade-up">
            <div>
              <p className="text-primary/70 font-bold uppercase tracking-[0.3em] text-xs mb-2">Portal da Loja</p>
              <h1 className="font-display text-4xl md:text-5xl font-light text-primary">
                Portal de Membros
              </h1>
              <div className="gold-divider w-24 mt-4" />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6">
                <Link to="/membros/carteirinha/validar" className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  Validar Carteirinha
                </Link>
              </Button>
              <Button asChild className="bg-gold-gradient text-primary hover:opacity-90 shadow-gold h-11 px-6 font-medium">
                <Link to="/membros/carteirinha/nova" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Novo Cadastro
                </Link>
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative max-w-md mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar membros por nome, CIM ou grau..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 h-12 bg-card border-border hover:border-gold/30 focus-visible:ring-gold"
            />
          </div>

          {/* Grid list */}
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-card border border-border hover:border-gold/30 rounded-2xl p-6 shadow-elegant transition-all hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Header profile info */}
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border/55">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-gold/40 shadow bg-black/5 flex items-center justify-center flex-shrink-0">
                        {member.photo ? (
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="font-display text-gold text-2xl">G</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-lg text-primary font-semibold truncate">
                            {member.name}
                          </h3>
                          {member.isHonorary && (
                            <Badge variant="secondary" className="text-[8px] uppercase tracking-wider bg-gold/15 text-[#C5A059] border-gold/30 shrink-0 h-4 px-1.5 leading-none">
                              Honorário
                            </Badge>
                          )}
                        </div>
                        <p className="text-gold uppercase tracking-wider text-[10px] font-medium truncate mt-0.5">
                          {member.role}
                        </p>
                        {member.office && (
                          <div className="mt-1">
                            <span className="inline-block px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-gold/15 text-[#C5A059] border border-gold/30 rounded leading-none">
                              {member.office}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Member details info */}
                    <div className="space-y-3 text-xs text-muted-foreground mb-6">
                      <div className="flex items-center gap-3">
                        <Hash className="w-3.5 h-3.5 text-gold/80 flex-shrink-0" />
                        <span>CIM: <strong className="text-foreground">{member.cim}</strong></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-3.5 h-3.5 text-gold/80 flex-shrink-0" />
                        <span>Iniciado em: <strong className="text-foreground">{member.initiationDate}</strong></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-3.5 h-3.5 text-gold/80 flex-shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-grow border-gold/30 hover:bg-gold/5 text-primary h-10 text-xs font-semibold"
                    >
                      <Link to="/membros/carteirinha/$id" params={{ id: member.id }}>
                        <CreditCard className="w-3.5 h-3.5 mr-2 text-gold" />
                        Ver Carteirinha
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-muted-foreground hover:text-gold"
                      title="Validar Cadastro"
                    >
                      <Link to={`/membros/carteirinha/validar`} search={{ id: member.id }}>
                        <ShieldCheck className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-muted-foreground text-sm">Nenhum membro encontrado com os critérios digitados.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
