import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getBlogPostBySlug, getRecommendedPosts, BlogPost } from "@/lib/blog-db";
import { useEffect, useState } from "react";
import { Calendar, Clock, ArrowLeft, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPostBySlug(params.slug);
    // Para evitar problemas de hidratação com randomização no SSR, pegamos as recomendações aqui ou no client.
    // Vamos pegar no loader para ter o dado pronto.
    const recommendations = post ? getRecommendedPosts(post.slug, 2) : [];
    return { post, recommendations };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.post ? `${loaderData.post.title} — Blog Maçônico` : "Artigo não encontrado" },
      { name: "description", content: loaderData?.post?.excerpt || "Artigo do Blog Maçônico" },
      { property: "og:title", content: loaderData?.post?.title || "Blog Maçônico" },
      { property: "og:description", content: loaderData?.post?.excerpt || "Artigo do Blog Maçônico" },
      ...(loaderData?.post?.imageUrl ? [{ property: "og:image", content: loaderData.post.imageUrl }] : []),
    ],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post, recommendations } = Route.useLoaderData();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-display text-4xl text-primary mb-4">Artigo não encontrado</h1>
          <p className="text-muted-foreground mb-8">Desculpe, não conseguimos encontrar o texto que você está procurando.</p>
          <Button asChild>
            <Link to="/blog">Voltar para o Blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-background/50 z-[60]">
        <div 
          className="h-full bg-gold transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="mx-auto max-w-3xl animate-fade-up">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-6 uppercase tracking-wider">
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-gold font-semibold">{tag}</span>
              ))}
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-[1.15]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2 font-medium">
                <User className="w-4 h-4 text-gold" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold" />
                {post.date}
              </span>
              <span className="flex items-center gap-2 bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} min
              </span>
            </div>

            {post.imageUrl && (
              <div className="w-full h-64 md:h-[450px] rounded-3xl overflow-hidden shadow-elegant border border-border mt-10">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
          </header>

          <div 
            className="
              blog-content 
              prose prose-lg md:prose-xl max-w-none
              prose-headings:font-display prose-headings:text-primary prose-headings:font-semibold prose-headings:mt-12 prose-headings:mb-6
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-8
              prose-a:text-gold hover:prose-a:text-gold/80 
              prose-blockquote:border-l-gold prose-blockquote:bg-gold/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:text-primary/90 prose-blockquote:italic prose-blockquote:font-display prose-blockquote:text-2xl prose-blockquote:my-10
              prose-strong:text-primary prose-strong:font-semibold
              first-letter:text-6xl first-letter:font-display first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-bold
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Social Proof / Conversion at the end of article */}
          <div className="mt-20 py-12 px-8 bg-card border border-border rounded-3xl text-center shadow-elegant relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient" />
            <h3 className="font-display text-3xl text-primary mb-4 font-semibold">Gostou da leitura?</h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg">Se os princípios abordados aqui ecoam com os seus valores pessoais, você pode ter o perfil para a Maçonaria.</p>
            <Button asChild size="lg" className="bg-gold-gradient text-primary hover:opacity-90 shadow-gold text-sm font-semibold tracking-wider">
              <Link to="/triagem">Quero ser um Maçom</Link>
            </Button>
          </div>

          {/* Recommended Posts */}
          {recommendations.length > 0 && (
            <div className="mt-24 pt-12 border-t border-border/50">
              <div className="flex items-center justify-between mb-10">
                <h3 className="font-display text-3xl text-primary font-semibold">Leia Também</h3>
                <Link to="/blog" className="hidden sm:flex items-center gap-2 text-sm text-gold hover:text-primary transition-colors font-semibold uppercase tracking-widest">
                  Ver todos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {recommendations.map((rec: BlogPost) => (
                  <article 
                    key={rec.id} 
                    className="bg-card border border-border hover:border-gold/40 rounded-2xl overflow-hidden shadow-elegant transition-all duration-300 hover:-translate-y-1 group flex flex-col"
                  >
                    {rec.imageUrl && (
                      <Link to="/blog/$slug" params={{ slug: rec.slug }} className="block overflow-hidden h-40">
                        <img 
                          src={rec.imageUrl} 
                          alt={rec.title} 
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      </Link>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-3 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-gold" />
                          {rec.date}
                        </span>
                      </div>
                      <h4 className="font-display text-xl font-semibold text-primary mb-3 group-hover:text-gold transition-colors leading-tight">
                        <Link to="/blog/$slug" params={{ slug: rec.slug }}>
                          {rec.title}
                        </Link>
                      </h4>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-grow">
                        {rec.excerpt}
                      </p>
                      <Link 
                        to="/blog/$slug" 
                        params={{ slug: rec.slug }}
                        className="flex items-center gap-1.5 text-[10px] font-semibold text-gold group-hover:text-primary transition-colors uppercase tracking-widest mt-auto"
                      >
                        Ler Artigo <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              
              <div className="mt-8 text-center sm:hidden">
                <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gold hover:text-primary transition-colors font-semibold uppercase tracking-widest">
                  Ver todos os artigos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
