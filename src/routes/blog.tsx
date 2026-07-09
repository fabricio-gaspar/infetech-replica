import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { InternalHero } from "@/components/site/InternalHero";
import { Search, Calendar, Folder, MessageCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { usePublicBlog } from "@/hooks/usePublicContent";
import { usePageSeoInject } from "@/hooks/usePageSeoInject";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [
    { title: "Blog — WF Digital Soluções de TI" },
    { name: "description", content: "Histórias, guias e insights sobre TI, cibersegurança, nuvem e desenvolvimento de software pela equipe WF Digital." },
  ]}),
  component: BlogPage,
});

const fallbackPosts = [
  { slug: "servicos-alta-qualidade", title: "O que prometemos: serviços de TI de alta qualidade", category: "Marketing Digital", date: "9 de janeiro de 2023", cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempore." },
  { slug: "guia-seguro-empresarial", title: "Um guia completo para seguro empresarial", category: "Marketing Digital", date: "2 de janeiro de 2023", cover: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempore." },
  { slug: "guia-ciberseguranca", title: "Um guia completo sobre cibersegurança", category: "Cibersegurança", date: "12 de janeiro de 2023", cover: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=900&q=80", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempore." },
];

function formatDate(d?: string | null) {
  if (!d) return "";
  try { return new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }); } catch { return ""; }
}

function BlogPage() {
  usePageSeoInject("/blog");
  const { data: dbPosts } = usePublicBlog();
  const [q, setQ] = useState("");

  const posts = useMemo(() => {
    const src = (dbPosts && dbPosts.length > 0)
      ? dbPosts.map((p: any) => ({
          slug: p.slug,
          title: p.title,
          category: "",
          date: formatDate(p.published_at ?? p.created_at),
          cover: p.cover_url || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80",
          excerpt: p.excerpt || "",
        }))
      : fallbackPosts;
    if (!q) return src;
    const needle = q.toLowerCase();
    return src.filter(p => p.title.toLowerCase().includes(needle) || p.excerpt.toLowerCase().includes(needle));
  }, [dbPosts, q]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach(p => { if (p.category) set.add(p.category); });
    return Array.from(set);
  }, [posts]);

  return (
    <SiteShell>
      <InternalHero title="Blog" />
      <section className="section-y bg-white">
        <div className="container-x grid lg:grid-cols-[1fr_320px] gap-10">
          <div className="grid sm:grid-cols-2 gap-7 reveal-stagger">
            {posts.map((p) => (
              <article key={p.slug} className="card-tech p-5 reveal">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="block relative overflow-hidden -m-5 mb-0">
                  <img loading="lazy" decoding="async" src={p.cover} className="w-full h-56 object-cover transition-transform duration-700 hover:scale-110" alt={p.title} />
                </Link>
                <h3 className="mt-5 font-bold leading-snug">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">{p.title}</Link>
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
                  {p.date && <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3 text-primary" />{p.date}</span>}
                  {p.category && <span className="inline-flex items-center gap-1"><Folder className="w-3 h-3 text-primary" />{p.category}</span>}
                  <span className="inline-flex items-center gap-1"><MessageCircle className="w-3 h-3 text-primary" />0 Comentários</span>
                </div>
                {p.excerpt && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>}
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="btn-primary mt-4 !py-2.5 !px-5 !text-[11px] inline-flex">Leia mais</Link>
              </article>
            ))}
            {posts.length === 0 && (
              <div className="sm:col-span-2 text-center py-12 text-muted-foreground">Nenhum post encontrado.</div>
            )}
            <div className="sm:col-span-2 flex justify-center items-center gap-2 mt-6">
              <button className="w-10 h-10 grid place-items-center border hover:bg-primary hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-10 h-10 grid place-items-center purple-gradient text-white font-bold">1</button>
              <button className="w-10 h-10 grid place-items-center border hover:bg-primary hover:text-white"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="relative">
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar" className="w-full bg-section px-4 py-3.5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              <button className="absolute right-2 top-2 bottom-2 px-3 grid place-items-center text-primary"><Search className="w-4 h-4" /></button>
            </div>

            {categories.length > 0 && (
              <div className="border border-border p-6">
                <h4 className="font-bold mb-4 pb-3 border-b">Categorias</h4>
                <ul className="space-y-3 text-sm">
                  {categories.map((c) => (
                    <li key={c} className="flex items-center justify-between text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                      <span>· {c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
