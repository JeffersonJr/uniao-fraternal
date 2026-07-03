import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { blogPosts } from "@/lib/blog-db";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog Maçônico — A.R.L.S. União Fraternal Nº 120" },
      { name: "description", content: "Artigos, reflexões e conhecimentos sobre a Maçonaria, filosofia e símbolos." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [selectedTag, setSelectedTag] = useState<string>("Todas");

  if (blogPosts.length === 0) return null;

  // Filtra as tags mais relevantes para os botões e evita muitas opções
  const coreTags = ["Filosofia", "Símbolos", "História", "Educação", "Esoterismo"];
  const tags = ["Todas", "Destaque", ...coreTags];

  let filteredPosts = blogPosts;
  if (selectedTag === "Destaque") {
    filteredPosts = [blogPosts[0]]; // Apenas o principal
  } else if (selectedTag !== "Todas") {
    filteredPosts = blogPosts.filter(post => post.tags.includes(selectedTag));
  }

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-up">
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3 font-semibold">Instrução e Conhecimento</p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-primary mb-6">
              Blog Maçônico
            </h1>
            <div className="gold-divider w-24 mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              Explore artigos e reflexões sobre os princípios, a filosofia e a simbologia da nossa augusta ordem. Um espaço dedicado ao aprimoramento moral e intelectual.
            </p>

            {/* Filter Tags */}
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    selectedTag === tag 
                      ? "bg-gold text-background shadow-gold" 
                      : "bg-secondary text-muted-foreground hover:bg-gold/20 hover:text-primary"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {!featuredPost && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Nenhum artigo encontrado para esta categoria.</p>
            </div>
          )}

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <article className="bg-card border border-border hover:border-gold/40 rounded-3xl overflow-hidden shadow-elegant transition-all duration-500 hover:shadow-2xl flex flex-col lg:flex-row group">
                {featuredPost.imageUrl && (
                  <Link to="/blog/$slug" params={{ slug: featuredPost.slug }} className="lg:w-3/5 overflow-hidden block">
                    <img 
                      src={featuredPost.imageUrl} 
                      alt={featuredPost.title} 
                      className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </Link>
                )}
                <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center relative">
                  <div className="absolute top-0 right-0 p-8">
                    <span className="bg-gold/10 text-gold text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-bold border border-gold/20">
                      Destaque
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6 mt-6 lg:mt-0">
                    <span className="flex items-center gap-1.5 font-medium">
                      <User className="w-3.5 h-3.5 text-gold" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      {featuredPost.readingTime} min
                    </span>
                  </div>

                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-4 group-hover:text-gold transition-colors leading-tight">
                    <Link to="/blog/$slug" params={{ slug: featuredPost.slug }}>
                      {featuredPost.title}
                    </Link>
                  </h2>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-3 mb-8">
                    {featuredPost.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest text-primary/70">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link 
                    to="/blog/$slug" 
                    params={{ slug: featuredPost.slug }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-primary transition-colors uppercase tracking-widest"
                  >
                    Continuar Lendo <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            </div>
          )}

          {/* Regular Posts Grid */}
          {regularPosts.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              {regularPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-card border border-border hover:border-gold/40 rounded-2xl overflow-hidden shadow-elegant transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group"
                >
                  {post.imageUrl && (
                    <Link to="/blog/$slug" params={{ slug: post.slug }} className="block overflow-hidden h-48">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </Link>
                  )}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground mb-4 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5 font-bold">
                          <User className="w-3.5 h-3.5 text-gold" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gold" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gold" />
                          {post.readingTime} min
                        </span>
                      </div>

                      <h2 className="font-display text-xl font-semibold text-primary mb-3 group-hover:text-gold transition-colors leading-snug">
                        <Link to="/blog/$slug" params={{ slug: post.slug }}>
                          {post.title}
                        </Link>
                      </h2>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-border/50 flex items-center justify-between mt-auto">
                      <div className="flex gap-2">
                        {post.tags.slice(0, 2).map(tag => ( // Mostra apenas as 2 primeiras tags para não quebrar o layout
                          <span key={tag} className="text-[9px] uppercase tracking-widest bg-secondary text-primary px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link 
                        to="/blog/$slug" 
                        params={{ slug: post.slug }}
                        className="flex items-center gap-1.5 text-[10px] font-semibold text-gold hover:text-primary transition-colors uppercase tracking-widest"
                      >
                        Ler <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
