import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Compass, Eye, ShieldCheck, BookOpen, Users, Heart, Sparkles, Scale, Handshake } from "lucide-react";
import gombLogoUrl from "@/assets/gomb-logo.webp";

export function About() {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-primary/70 font-bold uppercase tracking-[0.3em] text-xs mb-4">Nossa História</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Fundada sobre os <span className="italic text-primary">Antigos Landmarks</span>
          </h2>
          <div className="gold-divider w-24 mb-8" />
          <p className="text-muted-foreground leading-relaxed mb-4">
            A <strong className="text-foreground">União Fraternal</strong>, fundada em 9 de março de 2024 em Santos,
            é uma Loja Maçônica simbólica, regular e legítima, filiada ao <strong className="text-foreground">G.O.M.B. (Grande Oriente Maçônico do Brasil)</strong>, com personalidade jurídica de direito privado.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Liderada pelo <strong className="text-foreground">Irmão Gunther</strong>, Mestre Instalado e Venerável Mestre,
            nossa Loja foi estabelecida por uma comissão de Mestres Instalados Regulares com o compromisso de difundir
            os valores da Maçonaria pura e tradicional por todo o Brasil.
          </p>
          <a 
            href="https://gomb.org.br/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 p-4 bg-secondary border border-border rounded-xl hover:border-gold/45 hover:bg-secondary/70 transition-all group"
          >
            <img src={gombLogoUrl} alt="Logo GOMB" className="h-16 w-16 object-contain transition-transform group-hover:scale-105" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/70 font-bold">Filiada ao</p>
              <h3 className="font-display text-base text-primary font-semibold leading-tight group-hover:text-gold transition-colors">Grande Oriente Maçônico do Brasil</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Potência Maçônica Regular e Legítima</p>
            </div>
          </a>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gold/10 rounded-2xl blur-2xl" />
          <div className="relative aspect-[4/5] rounded-2xl bg-hero shadow-elegant overflow-hidden flex items-center justify-center">
            <div className="text-center text-primary-foreground p-8">
              <div className="text-gold text-6xl font-display mb-4">2024</div>
              <div className="gold-divider w-24 mx-auto mb-4" />
              <p className="uppercase tracking-[0.3em] text-xs text-gold/80 mb-2">Fundada em</p>
              <p className="font-display text-2xl">9 de Março</p>
              <p className="mt-6 text-sm text-primary-foreground/70 italic">"Ordo Ab Chao"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Pillars() {
  const pillars = [
    {
      icon: Compass,
      title: "Missão",
      text: "Promover a transformação da humanidade por meio dos ensinamentos maçônicos, cultivando os valores de Liberdade, Igualdade e Fraternidade.",
    },
    {
      icon: Eye,
      title: "Visão",
      text: "Ser reconhecida como uma Loja exemplar, que preserva a essência da Maçonaria tradicional e contribui para um mundo mais justo e fraterno.",
    },
    {
      icon: ShieldCheck,
      title: "Compromisso",
      text: "Atuar com total fidelidade aos Antigos Landmarks, mantendo a ritualística tradicional e os princípios fundamentais da Maçonaria.",
    },
  ];

  return (
    <section id="valores" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" aria-hidden>
        <svg className="w-full h-full"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="currentColor" className="text-gold" /></pattern></defs><rect width="100%" height="100%" fill="url(#dots)" /></svg>
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-[0.3em] text-xs mb-4">Os três pilares</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Forjando um futuro de <span className="italic text-gold">Liberdade</span>
          </h2>
          <div className="gold-divider w-32 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div key={p.title} className="group relative">
              <div className="absolute inset-0 bg-gold/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-primary-foreground/[0.03] border border-gold/20 rounded-xl p-8 h-full hover:border-gold/60 transition-all hover:-translate-y-1 duration-300">
                <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center mb-6 shadow-gold">
                  <p.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl mb-3 text-gold">{p.title}</h3>
                <p className="text-primary-foreground/70 leading-relaxed text-sm">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhatIsMasonry() {
  const points = [
    { icon: BookOpen, title: "Filosofia e estudo", text: "Sistema iniciático de aprimoramento moral e intelectual baseado em símbolos e alegorias." },
    { icon: Users, title: "Fraternidade universal", text: "Rede de irmãos comprometidos com a evolução mútua e a ajuda fraternal." },
    { icon: Heart, title: "Filantropia ativa", text: "Atuação consistente em prol do bem comum e da justiça social." },
    { icon: Sparkles, title: "Tradição milenar", text: "Ritualística preservada que conecta o maçom contemporâneo à sabedoria ancestral." },
    { icon: Scale, title: "Ética e virtude", text: "Construção interior pela busca da verdade, da temperança e da retidão." },
    { icon: Compass, title: "Liberdade de pensamento", text: "Respeito à diversidade religiosa, política e de origem entre os irmãos." },
  ];

  return (
    <section id="maconaria" className="py-24 md:py-32 bg-secondary">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary/70 font-bold uppercase tracking-[0.3em] text-xs mb-4">O que é a Maçonaria</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Uma jornada de <span className="italic">aprimoramento</span>
          </h2>
          <div className="gold-divider w-32 mx-auto mb-6" />
          <p className="text-muted-foreground leading-relaxed">
            A Maçonaria é uma instituição fraternal, filosófica e filantrópica que busca o aprimoramento
            moral, intelectual e espiritual de seus membros — fundada em princípios de Liberdade, Igualdade
            e Fraternidade.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt) => (
            <div key={pt.title} className="bg-card rounded-xl p-6 border border-border hover:border-gold/50 hover:shadow-elegant transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/5 group-hover:bg-gold/10 flex items-center justify-center mb-4 transition-colors">
                <pt.icon className="w-6 h-6 text-primary group-hover:text-gold transition-colors" />
              </div>
              <h3 className="font-display text-xl mb-2">{pt.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pt.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-card border border-gold/30 rounded-2xl p-8 md:p-12 max-w-3xl shadow-elegant">
            <h3 className="font-display text-2xl md:text-3xl mb-4">Você se identifica com esses valores?</h3>
            <p className="text-muted-foreground mb-6">
              Faça nossa triagem e descubra se você tem o perfil para iniciar a jornada maçônica.
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8">
              <Link to="/triagem">Quero ser um Maçom</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MasonsJoin() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    loja: "",
    grau: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.loja) {
      toast.error("Preencha nome, e-mail e loja de origem.");
      return;
    }
    setLoading(true);

    const msg = `Olá! Gostaria de me filiar à A.R.L.S. União Fraternal Nº 120.

Seguem meus dados:
*Nome:* ${form.nome}
*E-mail:* ${form.email}
*Telefone:* ${form.telefone || "Não informado"}
*Grau:* ${form.grau || "Não informado"}
*Loja de Origem/Potência:* ${form.loja}
*Mensagem:* ${form.mensagem || "Não informada"}`;

    const url = `https://wa.me/5511911019192?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      setLoading(false);
      window.open(url, "_blank");
      toast.success("Redirecionando para o WhatsApp da Secretaria...");
      setForm({ nome: "", email: "", telefone: "", loja: "", grau: "", mensagem: "" });
    }, 500);
  };

  return (
    <section id="macons" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" aria-hidden />
      <div className="mx-auto max-w-5xl px-6 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-gradient shadow-gold mb-6">
            <Handshake className="w-8 h-8 text-primary" />
          </div>
          <p className="text-primary/70 font-bold uppercase tracking-[0.3em] text-xs mb-4">Aos Irmãos</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Maçom regular? <span className="italic text-primary">Junte-se a nós</span>
          </h2>
          <div className="gold-divider w-32 mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Se você já é Maçom regular e deseja fazer parte da A.R.L.S. União Fraternal Nº 120,
            preencha o formulário abaixo. Nosso secretário entrará em contato para os trâmites
            fraternais de filiação ou regularização.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-card border border-gold/20 rounded-2xl p-8 md:p-10 shadow-elegant grid sm:grid-cols-2 gap-5"
        >
          <div className="space-y-2">
            <Label htmlFor="m-nome">Nome completo *</Label>
            <Input
              id="m-nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Seu nome civil"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="m-email">E-mail *</Label>
            <Input
              id="m-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="voce@email.com"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="m-tel">Telefone</Label>
            <Input
              id="m-tel"
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              placeholder="(13) 99999-9999"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="m-grau">Grau atual</Label>
            <Input
              id="m-grau"
              value={form.grau}
              onChange={(e) => setForm({ ...form, grau: e.target.value })}
              placeholder="Aprendiz, Companheiro, Mestre…"
              className="h-11"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="m-loja">Loja de origem e Potência *</Label>
            <Input
              id="m-loja"
              value={form.loja}
              onChange={(e) => setForm({ ...form, loja: e.target.value })}
              placeholder="Ex.: A.R.L.S. Estrela do Sul nº 123 — GOB-SP"
              className="h-11"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="m-msg">Mensagem fraternal</Label>
            <Textarea
              id="m-msg"
              rows={4}
              value={form.mensagem}
              onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
              placeholder="Conte-nos sobre sua jornada e seu interesse em nossa Loja."
            />
          </div>
          <div className="sm:col-span-2 flex justify-center pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="bg-gold-gradient text-primary hover:opacity-90 shadow-gold h-12 px-10 font-medium"
            >
              {loading ? "Enviando…" : "Enviar solicitação fraternal"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export function FAQ() {
  const items = [
    {
      q: "O que é a Maçonaria?",
      a: "A Maçonaria é uma instituição fraternal, filosófica e filantrópica que busca o aprimoramento moral, intelectual e espiritual de seus membros. Fundada em princípios de Liberdade, Igualdade e Fraternidade, promove valores éticos, a busca pela verdade e o compromisso com a justiça social.",
    },
    {
      q: "Como entrar para a Maçonaria?",
      a: "É necessário ser maior de idade, ter conduta ilibada e demonstrar interesse genuíno nos princípios maçônicos. O processo começa com uma indicação por um membro ativo da Loja, seguida por entrevistas e análise de antecedentes. Entre em contato conosco para mais informações.",
    },
    {
      q: "A Maçonaria é uma religião?",
      a: "Não. A Maçonaria não é uma religião, embora exija a crença em um Princípio Criador (G∴A∴D∴U∴). Aceita homens de qualquer credo e respeita todas as confissões religiosas.",
    },
    {
      q: "Quanto custa para ser maçom?",
      a: "Existem contribuições mensais (mensalidades) que mantêm a Loja, além de joias e paramentos próprios do aprendiz. Os valores são discutidos abertamente durante o processo de admissão.",
    },
    {
      q: "Qual o tempo de dedicação esperado?",
      a: "As sessões ocorrem geralmente quinzenalmente. Espera-se também dedicação aos estudos, ao desenvolvimento pessoal e à participação em eventos da Loja.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-16">
          <p className="text-primary/70 font-bold uppercase tracking-[0.3em] text-xs mb-4">Perguntas Frequentes</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">Dúvidas comuns</h2>
          <div className="gold-divider w-32 mx-auto" />
        </div>
        <div className="space-y-4">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`bg-card border rounded-xl overflow-hidden transition-all ${
                  isOpen ? "border-gold/60 shadow-elegant" : "border-border hover:border-gold/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left p-6 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg pr-4">{it.q}</span>
                  <span className={`text-gold text-2xl font-light transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed text-sm">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contato" className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-gold uppercase tracking-[0.3em] text-xs mb-4">Entre em contato</p>
        <h2 className="font-display text-4xl md:text-5xl mb-6">
          Pronto para sua <span className="italic text-gold">jornada</span>?
        </h2>
        <div className="gold-divider w-32 mx-auto mb-8" />
        <p className="text-primary-foreground/70 max-w-xl mx-auto mb-12 leading-relaxed">
          Comece preenchendo nossa triagem maçônica. É o primeiro passo para conhecer mais sobre você
          e iniciar um diálogo com nossa Loja.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12 text-left">
          <div className="bg-primary-foreground/5 border border-gold/20 rounded-xl p-6">
            <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">Endereço</p>
            <p className="text-sm">R. Costa Rica, 81 — Guilhermina<br />Praia Grande — SP, 11702-190</p>
          </div>
          <div className="bg-primary-foreground/5 border border-gold/20 rounded-xl p-6">
            <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">E-mail</p>
            <p className="text-sm break-all">contato@arlsuniaofraternal.com.br</p>
          </div>
        </div>
        <Button asChild size="lg" className="bg-gold-gradient text-primary hover:opacity-90 shadow-gold h-12 px-10 font-medium">
          <Link to="/triagem">Quero ser um Maçom</Link>
        </Button>
      </div>
    </section>
  );
}
