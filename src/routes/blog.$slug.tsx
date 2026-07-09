import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { InternalHero } from "@/components/site/InternalHero";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { Calendar, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
  notFoundComponent: () => (
    <SiteShell>
      <InternalHero title="Post não encontrado" />
      <section className="section-y bg-white">
        <div className="container-x text-center">
          <p className="text-muted-foreground mb-6">O post que você procura não está disponível.</p>
          <Link to="/blog" className="btn-primary inline-flex">Voltar ao Blog</Link>
        </div>
      </section>
    </SiteShell>
  ),
  errorComponent: ({ error }) => (
    <SiteShell>
      <InternalHero title="Erro" />
      <section className="section-y bg-white">
        <div className="container-x text-center">
          <p role="alert" className="text-muted-foreground">{error.message}</p>
        </div>
      </section>
    </SiteShell>
  ),
});

function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!post) return;
    document.title = post.seo_title || `${post.title} — Blog WF Digital`;
    if (post.seo_description) {
      let el = document.querySelector('meta[name="description"]');
      if (!el) { el = document.createElement("meta"); el.setAttribute("name", "description"); document.head.appendChild(el); }
      el.setAttribute("content", post.seo_description);
    }
  }, [post]);

  if (isLoading) {
    return (
      <SiteShell>
        <InternalHero title="Carregando…" />
        <section className="section-y bg-white"><div className="container-x">Carregando…</div></section>
      </SiteShell>
    );
  }

  if (!post) {
    return (
      <SiteShell>
        <InternalHero title="Post não encontrado" />
        <section className="section-y bg-white">
          <div className="container-x text-center">
            <p className="text-muted-foreground mb-6">Este post pode ter sido removido ou ainda não foi publicado.</p>
            <Link to="/blog" className="btn-primary inline-flex">Voltar ao Blog</Link>
          </div>
        </section>
      </SiteShell>
    );
  }

  const date = post.published_at || post.created_at;
  const dateStr = date ? new Date(date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }) : "";

  return (
    <SiteShell>
      <InternalHero title={post.title} crumb="Blog" />
      <article className="section-y bg-white">
        <div className="container-x max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>
          {post.cover_url && (
            <img src={post.cover_url} alt={post.title} className="w-full h-auto rounded-lg mb-8" />
          )}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
            {dateStr && <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3 text-primary" />{dateStr}</span>}
            {post.author_name && <span>Por {post.author_name}</span>}
          </div>
          {post.excerpt && <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>}
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content || "" }} />
        </div>
      </article>
    </SiteShell>
  );
}
