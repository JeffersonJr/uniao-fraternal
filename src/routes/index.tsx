import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { About, Pillars, WhatIsMasonry, MasonsJoin, FAQ, Contact } from "@/components/site/Sections";
import { UserGuide } from "@/components/site/UserGuide";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A.R.L.S. União Fraternal Nº 120 — Loja Maçônica em Praia Grande" },
      { name: "description", content: "Loja Maçônica regular fundada em 2024. Conheça a Maçonaria tradicional e descubra se você tem o perfil para iniciar essa jornada." },
      { property: "og:title", content: "A.R.L.S. União Fraternal Nº 120" },
      { property: "og:description", content: "Liberdade, Igualdade e Fraternidade — descubra a Maçonaria tradicional." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <WhatIsMasonry />
        <Pillars />
        <MasonsJoin />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <UserGuide />
    </div>
  );
}
