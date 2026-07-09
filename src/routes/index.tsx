import { usePageSeoInject } from "@/hooks/usePageSeoInject";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect, useMemo } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import {
  ArrowRight, MessageCircle, User, ChevronLeft, ChevronRight,
} from "lucide-react";
import * as Icons from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  useHeroBanners, useHeroCards, usePublicServices, usePublicTestimonials,
  usePublicPillars, usePublicBlog,
} from "@/hooks/usePublicContent";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "WF Digital — Tecnologia sob medida para sua empresa" },
    { name: "description", content: "Sistemas personalizados, automação com IA, sites, hospedagem, servidores, redes e consultoria em TI. Soluções completas para modernizar sua empresa." },
    { property: "og:title", content: "WF Digital — Tecnologia sob medida para sua empresa" },
  ]}),
  component: HomePage,
});

function getIcon(name?: string | null, fallback = "Sparkles") {
  const key = name || fallback;
  return (Icons as any)[key] || (Icons as any)[fallback] || Icons.Sparkles;
}

function formatDay(d?: string | null) {
  if (!d) return { d: "01", m: "JAN" };
  try {
    const dt = new Date(d);
    return {
      d: String(dt.getDate()).padStart(2, "0"),
      m: dt.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "").toUpperCase(),
    };
  } catch { return { d: "01", m: "JAN" }; }
}

function HomePage() {
  usePageSeoInject("/");
  const { data: settings } = useSiteSettings();
  const { data: heroBanners } = useHeroBanners();
  const { data: heroCards } = useHeroCards();
  const { data: services } = usePublicServices({ featuredOnly: true });
  const { data: testimonials } = usePublicTestimonials({ featuredOnly: true });
  const { data: pillars } = usePublicPillars();
  const { data: blog } = usePublicBlog();

  const slides = heroBanners ?? [];
  const [heroIdx, setHeroIdx] = useState(0);
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => setHeroIdx((i) => (i + 1) % slides.length), 6000);
    return () => window.clearInterval(id);
  }, [slides.length]);
  const hero = slides.length > 0 ? slides[Math.min(heroIdx, slides.length - 1)] : null;
  const s: any = settings || {};

  const [activeT, setActiveT] = useState(0);
  const activeTestimonial = testimonials && testimonials.length > 0 ? testimonials[Math.min(activeT, testimonials.length - 1)] : null;

  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const servicesPausedRef = useRef(false);
  const scrollServices = (dir: 1 | -1) => {
    const el = servicesScrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-svc-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth / 3;
    const maxScroll = el.scrollWidth - el.clientWidth - 4;
    let target = el.scrollLeft + step * dir;
    if (dir === 1 && el.scrollLeft >= maxScroll) target = 0;
    if (dir === -1 && el.scrollLeft <= 4) target = maxScroll;
    el.scrollTo({ left: target, behavior: "smooth" });
  };
  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.hidden || servicesPausedRef.current) return;
      scrollServices(1);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  const posts = useMemo(() => (blog ?? []).slice(0, 3), [blog]);
  const svcList = services ?? [];
  const cards = heroCards ?? [];
  const pillarList = pillars ?? [];

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative bg-[#fff4ee] overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 pointer-events-none">
          <img
            src={hero?.image_desktop_url || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=70&auto=format"}
            alt={hero?.title || "Hero"}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover grayscale opacity-90 lg:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff4ee] via-[#fff4ee]/40 to-transparent lg:via-transparent" />
        </div>

        <div className="container-x relative pt-24 lg:pt-32 pb-44 lg:pb-56 grid lg:grid-cols-2 gap-10">
          <div className="reveal relative z-[2]">
            {hero?.support_text && (
              <div className="inline-flex items-center gap-3 text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-7">
                {hero.support_text}
              </div>
            )}
            <h1 className="font-black text-foreground leading-[1.05] tracking-tight text-[44px] sm:text-[60px] lg:text-[76px]">
              {hero?.title || "O futuro pertence à tecnologia"}
            </h1>
            {hero?.subtitle && (
              <p className="mt-5 text-lg text-muted-foreground max-w-lg">{hero.subtitle}</p>
            )}
            {hero?.cta_primary_label && (
              <Link to={hero.cta_primary_url || "/about"} className="btn-primary mt-10">{hero.cta_primary_label}</Link>
            )}
            {hero?.cta_secondary_label && (
              <Link to={hero.cta_secondary_url || "/servicos"} className="ml-3 mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors">
                {hero.cta_secondary_label} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {slides.length > 1 && (
          <div className="container-x relative -mt-24 lg:-mt-32 flex items-center gap-3 z-20">
            <button type="button" onClick={() => setHeroIdx((i) => (i - 1 + slides.length) % slides.length)}
              className="w-10 h-10 rounded-full bg-white shadow-md grid place-items-center hover:bg-primary hover:text-white transition" aria-label="Slide anterior">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {slides.map((sl: any, i: number) => (
                <button key={sl.id} type="button" onClick={() => setHeroIdx(i)} aria-label={`Slide ${i + 1}`}
                  className={`h-1 transition-all ${heroIdx === i ? "w-10 bg-primary" : "w-6 bg-foreground/20 hover:bg-primary/50"}`} />
              ))}
            </div>
            <button type="button" onClick={() => setHeroIdx((i) => (i + 1) % slides.length)}
              className="w-10 h-10 rounded-full bg-white shadow-md grid place-items-center hover:bg-primary hover:text-white transition" aria-label="Próximo slide">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* hero cards */}
        {cards.length > 0 && (
          <div className="container-x relative -mt-32 lg:-mt-40 pb-24 grid md:grid-cols-3 gap-6 z-10">
            {cards.map((c: any, i: number) => (
              <div key={c.id} className="card-tech p-8 pb-10 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="absolute right-6 bottom-4 text-[70px] font-black leading-none text-foreground/[0.07] select-none">{c.number}</span>
                <h3 className="relative text-[18px] font-black uppercase tracking-wide leading-tight ">{c.title}</h3>
                <p className="relative mt-5 text-[13px] text-muted-foreground leading-relaxed max-w-[220px]">{c.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TESTIMONIALS */}
      {activeTestimonial && (
        <section className="py-[72px] bg-[#fff4ee] relative overflow-hidden">
          <div className="w-[calc(100%-40px)] max-w-[956px] mx-auto relative grid lg:grid-cols-[390px_526px] gap-10 items-start">
            <div className="reveal max-w-[450px]">
              <div className="inline-flex items-center gap-3 text-[#FF6933] text-xs font-bold mb-2">
                <span className="w-3 h-[2px] bg-[#FF6933]" />
                {s.home_testimonials_eyebrow || "Depoimentos de Clientes"}
              </div>
              <h2 className="text-[32px] md:text-[36px] font-black leading-[1.16] text-[#211b31] max-w-[360px]">
                {s.home_testimonials_title || "Veja o que estão falando sobre nós"}
              </h2>

              <div className="mt-3 flex items-center gap-4">
                <div className="w-[92px] h-[92px] rounded-full p-[5px] bg-[#FF6933] shadow-[0_12px_28px_rgba(255,105,51,0.25)]">
                  <div className="w-full h-full rounded-full overflow-hidden border-[4px] border-white">
                    {activeTestimonial.avatar_url && (
                      <img key={activeTestimonial.avatar_url} src={activeTestimonial.avatar_url} alt={activeTestimonial.author_name}
                        className="w-full h-full object-cover transition-opacity duration-300" />
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-[16px] font-black leading-tight text-[#211b31]">{activeTestimonial.author_name}</h3>
                  <p className="mt-1 text-[11px] font-bold text-[#FF6933]">{activeTestimonial.author_role}</p>
                  <div className="mt-2 flex gap-0.5 text-[#ffb400] text-[17px] leading-none">
                    {Array.from({ length: activeTestimonial.rating || 5 }).map((_, i) => <span key={i}>★</span>)}
                  </div>
                </div>
              </div>

              <p className="mt-8 text-[14px] leading-[1.85] text-[#6f6a7c] max-w-[390px]">{activeTestimonial.quote}</p>

              <div className="mt-4 flex items-center gap-2">
                {(testimonials ?? []).map((t: any, i: number) => (
                  <button key={t.id} type="button" onClick={() => setActiveT(i)} aria-label={`Ver depoimento de ${t.author_name}`}
                    className={`h-1 transition-all ${activeT === i ? "w-8 bg-[#FF6933]" : "w-6 bg-[#c6c2ce] hover:bg-[#FFB899]"}`} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES */}
      {svcList.length > 0 && (
        <section className="section-y bg-section relative overflow-hidden">
          <div className="container-x relative text-center reveal max-w-5xl mx-auto">
            <div className="eyebrow mb-4 justify-center">{s.home_services_eyebrow || "O que oferecemos aos nossos clientes"}</div>
            <h2 className="text-3xl md:text-4xl lg:text-[38px] font-black leading-[1.2]">{s.home_services_title || "Atendimento em tempo real em todas as soluções e serviços profissionais de TI"}</h2>
          </div>
          <div className="container-x relative mt-14">
            <div
              ref={servicesScrollRef}
              onMouseEnter={() => { servicesPausedRef.current = true; }}
              onMouseLeave={() => { servicesPausedRef.current = false; }}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden reveal-stagger"
            >
              {svcList.map((sv: any, i: number) => {
                const IconComp = getIcon(sv.icon_name, "Cpu");
                return (
                  <div key={sv.id} data-svc-card
                    className="card-tech p-8 reveal group text-center shrink-0 snap-start basis-[82%] sm:basis-[calc((100%-3rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
                    style={{ transitionDelay: `${i*70}ms`}}>
                    <div className="w-16 h-16 mx-auto rounded-full purple-gradient text-white grid place-items-center mb-5">
                      <IconComp className="w-7 h-7" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-lg font-bold">{sv.title}</h3>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{sv.short_description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button type="button" onClick={() => scrollServices(-1)} aria-label="Anterior"
                className="w-12 h-12 grid place-items-center border border-primary/25 text-primary hover:bg-primary hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <button type="button" onClick={() => scrollServices(1)} aria-label="Próximo"
                className="w-12 h-12 grid place-items-center border border-primary/25 text-primary hover:bg-primary hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* IT SOLUTIONS BLOCK */}
      <section className="bg-section">
        <div className="container-x py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="reveal">
            <div className="eyebrow mb-3">{s.home_solutions_eyebrow || "Soluções de TI"}</div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">{s.home_solutions_title || "As melhores soluções e serviços de TI ao seu alcance"}</h2>
            <p className="mt-5 text-muted-foreground max-w-lg">{s.home_solutions_description}</p>
            {s.home_solutions_cta_label && (
              <Link to={s.home_solutions_cta_url || "/servicos"} className="btn-primary mt-7">
                {s.home_solutions_cta_label} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
          {s.home_solutions_image_url && (
            <div className="relative reveal">
              <img loading="lazy" decoding="async" src={s.home_solutions_image_url} className="w-full h-[380px] object-cover" alt="" />
            </div>
          )}
        </div>
      </section>

      {/* PILLARS */}
      {pillarList.length > 0 && (
        <section className="section-y bg-section">
          <div className="container-x text-center reveal max-w-3xl mx-auto">
            <div className="eyebrow mb-3 justify-center">{s.home_pillars_eyebrow || "Caminho da Tecnologia"}</div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">{s.home_pillars_title || "A agência de soluções e serviços de TI em que você pode confiar"}</h2>
          </div>
          <div className="container-x mt-12 grid md:grid-cols-3 gap-6 reveal-stagger">
            {pillarList.map((p: any) => {
              const IconComp = getIcon(p.icon_name, "Award");
              return (
                <div key={p.id} className="card-tech p-8 text-center reveal">
                  <div className="w-16 h-16 mx-auto rounded-full purple-gradient text-white grid place-items-center mb-5">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-3">{p.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* BLOG */}
      {posts.length > 0 && (
        <section className="section-y bg-white">
          <div className="container-x text-center reveal max-w-2xl mx-auto">
            <div className="eyebrow mb-3 justify-center">{s.home_blog_eyebrow || "Novidades"}</div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">{s.home_blog_title || "Notícias & Artigos"}</h2>
          </div>
          <div className="container-x mt-12 grid md:grid-cols-3 gap-7 reveal-stagger">
            {posts.map((p: any) => {
              const dm = formatDay(p.published_at ?? p.created_at);
              return (
                <article key={p.id} className="card-tech overflow-hidden reveal">
                  <div className="relative overflow-hidden">
                    <img loading="lazy" decoding="async" src={p.cover_url || "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"}
                      className="w-full h-56 object-cover transition-transform duration-700 hover:scale-110" alt={p.title} />
                    <div className="absolute top-4 left-4 bg-primary text-white text-center px-3 py-2 leading-none">
                      <div className="text-2xl font-black">{dm.d}</div>
                      <div className="text-[10px] font-bold tracking-widest mt-1">{dm.m}</div>
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5"><User className="w-3 h-3" /> admin</span>
                      <span className="inline-flex items-center gap-1.5"><MessageCircle className="w-3 h-3" /> 0 comentários</span>
                    </div>
                    <h3 className="mt-3 font-bold text-lg leading-snug hover:text-primary transition-colors">{p.title}</h3>
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary hover:gap-3 transition-all">
                      Leia mais <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </SiteShell>
  );
}
