import { usePageSeoInject } from "@/hooks/usePageSeoInject";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect, type ComponentType } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { LogoStrip } from "@/components/site/LogoStrip";
import {
  ArrowRight, Cpu, Code2, Sparkles, Globe, Mail, Server, Wifi, ClipboardCheck, Clock,
  Award, Users, Trophy, MessageCircle, User, ChevronLeft, ChevronRight,
  Shield, Rocket, Zap, HeartHandshake, Star, ShieldCheck, Layers, Smartphone, Monitor, PenTool, Lightbulb, Brain, CheckCircle2,
} from "lucide-react";
import { usePublicHeroCards, usePublicPillars, usePublicServices, usePublicTestimonials, usePublicBlog, useHeroBanners } from "@/hooks/usePublicContent";

const iconMap: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Code2, Sparkles, Globe, Mail, Server, Wifi, ClipboardCheck, Clock, Cpu,
  Users, Award, Trophy, Shield, Rocket, Zap, HeartHandshake, Star,
};
const getIcon = (name?: string | null, fallback: ComponentType<any> = Cpu) => (name && iconMap[name]) || fallback;

type Testimonial = { name: string; role: string; quote: string; photo: string };

const testimonials: Testimonial[] = [
  { name: "Ana Ribeiro", role: "Diretora de Operações", quote: "A WF Digital entendeu exatamente o processo da nossa empresa e entregou um sistema sob medida que reduziu o retrabalho e organizou toda a operação.", photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=720&q=80" },
  { name: "Camila Alves", role: "Gerente de Projetos", quote: "Automatizamos nosso atendimento com IA e conseguimos ganhar tempo em tarefas repetitivas. O suporte da equipe foi essencial em cada etapa.", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=220&q=80" },
  { name: "Marina Costa", role: "Coordenadora de TI", quote: "A implantação da rede e dos servidores trouxe muito mais estabilidade para o dia a dia. Recomendo pela seriedade e conhecimento técnico.", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=460&q=80" },
  { name: "Rafael Souza", role: "Diretor Comercial", quote: "O site novo e a hospedagem profissional trouxeram mais credibilidade para nossa marca. Resultado direto em novos contatos e clientes.", photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=220&q=80" },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "WF Digital — Tecnologia sob medida para sua empresa" },
    { name: "description", content: "Sistemas personalizados, automação com IA, sites, hospedagem, servidores, redes e consultoria em TI. Soluções completas para modernizar sua empresa." },
    { property: "og:title", content: "WF Digital — Tecnologia sob medida para sua empresa" },
  ]}),
  component: HomePage,
});

const heroCards = [
  { n: "01", t: "Sistemas Personalizados", d: "Software sob medida para automatizar processos e organizar sua operação.", icon: Code2 },
  { n: "02", t: "Automação com IA", d: "Inteligência artificial aplicada ao atendimento, dados e rotinas.", icon: Sparkles },
  { n: "03", t: "Servidores e Nuvem", d: "Implantação de servidores locais e em nuvem com segurança e backup.", icon: Server },
];

const services = [
  { t: "Sistemas Personalizados", d: "Sistemas sob medida para automatizar processos e substituir planilhas.", icon: Code2 },
  { t: "Automação com IA", d: "IA aplicada em atendimento, dados e tarefas repetitivas.", icon: Sparkles },
  { t: "Sites e Hospedagem", d: "Sites profissionais responsivos, com hospedagem e domínio.", icon: Globe },
  { t: "E-mails Empresariais", d: "Contas com o domínio da empresa e suporte de configuração.", icon: Mail },
  { t: "Servidores em Nuvem e Local", d: "Estrutura segura para arquivos, sistemas e acessos.", icon: Server },
  { t: "Redes Cabeadas e Wi-Fi", d: "Projeto e instalação de rede empresarial estável e segura.", icon: Wifi },
  { t: "Consultoria e Auditoria em TI", d: "Diagnóstico da estrutura e recomendações para evoluir com segurança.", icon: ClipboardCheck },
  { t: "Sistemas em Plano Mensal", d: "Ponto e lavanderia sob assinatura, com suporte contínuo.", icon: Clock },
  { t: "Tecnologia Sob Medida", d: "Analisamos seu cenário e entregamos a solução certa para o negócio.", icon: Cpu },
];

const pillars = [
  { i: Users, t: "Experiência", d: "Entrega comprovada de projetos de tecnologia para empresas." },
  { i: Award, t: "Sob Medida", d: "Cada solução pensada a partir da realidade do seu negócio." },
  { i: Trophy, t: "Profissionalismo", d: "Suporte próximo e equipe dedicada ao sucesso da operação." },
];

const projects = [
  { t: "Desenvolvimento Web", cat: "DESIGN / IDEIAS", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80" },
  { t: "Automação com IA", cat: "IDEIAS", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80" },
  { t: "Redes & Servidores", cat: "INFRAESTRUTURA", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80" },
];

const counters = [
  { n: 330, label: "Clientes Ativos" },
  { n: 980, label: "Projetos Concluídos" },
  { n: 20, label: "Anos de História" },
  { n: 112, label: "Equipe Profissional" },
];

const challenges = [
  { i: Globe, t: "Website" },
  { i: Smartphone, t: "Mobile" },
  { i: Monitor, t: "Sistemas" },
  { i: PenTool, t: "Design" },
  { i: Lightbulb, t: "Tecnologia" },
  { i: Brain, t: "Soluções IA" },
];

const posts = [
  { t: "Sistemas personalizados: quando vale a pena investir", d: "01", m: "MAR", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80" },
  { t: "Automação com IA no dia a dia da empresa", d: "14", m: "MAR", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" },
  { t: "Servidor local ou em nuvem: qual escolher?", d: "22", m: "MAR", img: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&q=80" },
];

/* Animated counter — inline to keep bg control */
function Counter({ end }: { end: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setSeen(true)), { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [seen]);
  useEffect(() => {
    if (!seen) return;
    const s = performance.now(); const dur = 1600;
    let raf = 0;
    const tick = (t: number) => { const p = Math.min(1, (t - s) / dur); setV(Math.floor(end * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, end]);
  return <span ref={ref}>{v}</span>;
}

function HomePage() {
  usePageSeoInject("/");
  const { data: cmsHeroCards } = usePublicHeroCards();
  const { data: cmsPillars } = usePublicPillars();
  const { data: cmsServices } = usePublicServices();
  const { data: cmsTestimonials } = usePublicTestimonials();
  const { data: cmsPosts } = usePublicBlog();
  const { data: cmsBanners } = useHeroBanners();
  const banners = cmsBanners ?? [];
  const [bannerIdx, setBannerIdx] = useState(0);
  const banner = banners.length ? banners[bannerIdx % banners.length] : undefined;
  const heroPausedRef = useRef(false);
  const nextBanner = () => banners.length && setBannerIdx((i) => (i + 1) % banners.length);
  const prevBanner = () => banners.length && setBannerIdx((i) => (i - 1 + banners.length) % banners.length);
  useEffect(() => {
    if (banners.length < 2) return;
    const id = window.setInterval(() => { if (!document.hidden && !heroPausedRef.current) nextBanner(); }, 6000);
    return () => window.clearInterval(id);
  }, [banners.length]);

  const heroCardsList = (cmsHeroCards && cmsHeroCards.length ? cmsHeroCards.map((c: any) => ({
    n: c.number || "", t: c.title, d: c.description || "", icon: getIcon(c.icon_name, Code2),
  })) : heroCards);
  const pillarsList = (cmsPillars && cmsPillars.length ? cmsPillars.map((p: any) => ({
    i: getIcon(p.icon_name, Users), t: p.title, d: p.description || "",
  })) : pillars);
  const servicesList = (cmsServices && cmsServices.length ? cmsServices.map((sv: any) => ({
    t: sv.name || sv.title || "", d: sv.short_description || sv.description || "", icon: getIcon(sv.icon_name, Cpu),
  })) : services);
  const testimonialsList: Testimonial[] = (cmsTestimonials && cmsTestimonials.length >= 4 ? cmsTestimonials.slice(0, 4).map((t: any) => ({
    name: t.author_name, role: t.author_role || "", quote: t.quote, photo: t.avatar_url || "https://i.pravatar.cc/300",
  })) : testimonials);
  const postsList = (cmsPosts && cmsPosts.length ? cmsPosts.slice(0, 3).map((p: any) => {
    const dt = p.published_at ? new Date(p.published_at) : new Date(p.created_at);
    return { t: p.title, slug: p.slug,
      d: String(dt.getDate()).padStart(2, "0"),
      m: dt.toLocaleString("pt-BR", { month: "short" }).replace(".", "").toUpperCase().slice(0, 3),
      img: p.cover_url || "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    };
  }) : posts.map((p) => ({ ...p, slug: undefined as string | undefined })));

  const [activeT, setActiveT] = useState(0);
  const active = testimonialsList[Math.min(activeT, testimonialsList.length - 1)] ?? testimonialsList[0];

  const [activeService, setActiveService] = useState(2);
  const serviceTiles = servicesList.slice(0, 5);
  const activeSvc = serviceTiles[Math.min(activeService, serviceTiles.length - 1)] ?? serviceTiles[0];

  return (
    <SiteShell>
      {/* ============ HERO (Infetech style) ============ */}
      <section
        className="relative overflow-hidden bg-[#1a0f07]"
        onMouseEnter={() => { heroPausedRef.current = true; }}
        onMouseLeave={() => { heroPausedRef.current = false; }}
      >
        {/* Full-bleed background image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            key={banner?.id || "fallback"}
            src={banner?.image_desktop_url || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80&auto=format"}
            alt={banner?.title || "Profissional de tecnologia"}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center grayscale-[80%] opacity-70 animate-fade-in"
          />
          {/* dark tint overall */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,10,4,0.9)_0%,rgba(20,10,4,0.55)_40%,rgba(20,10,4,0.35)_70%,rgba(20,10,4,0.75)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,10,4,0.35)_0%,transparent_30%,transparent_70%,rgba(20,10,4,0.6)_100%)]" />
        </div>

        {/* Diagonal orange stripes on the left (Infetech signature bar) */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -left-[10%] top-[-20%] w-[52%] h-[160%]"
            style={{
              background: "linear-gradient(135deg, rgba(255,105,51,0.85) 0%, rgba(255,105,51,0.35) 40%, transparent 100%)",
              transform: "skewX(-14deg)",
              mixBlendMode: "screen",
            }}
          />
          <div
            className="absolute -left-[20%] top-[-30%] w-[36%] h-[180%]"
            style={{
              background: "linear-gradient(135deg, rgba(255,105,51,0.55) 0%, transparent 70%)",
              transform: "skewX(-14deg)",
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* Content */}
        <div className="container-x relative z-10 min-h-[640px] lg:min-h-[720px] flex items-center py-24 lg:py-32">
          <div className="max-w-[640px] reveal">
            <div className="inline-flex items-center gap-3 text-white/85 text-[11px] font-bold uppercase tracking-[0.25em] mb-6">
              <span className="w-8 h-[2px] bg-primary" />
              {banner?.support_text || "Bem-vindo à WF Digital"}
            </div>
            {banner?.title ? (
              <h1 className="font-black text-white leading-[1.02] tracking-tight text-[48px] sm:text-[68px] lg:text-[86px]">
                {banner.title}
              </h1>
            ) : (
              <h1 className="font-black text-white leading-[1.02] tracking-tight text-[48px] sm:text-[68px] lg:text-[86px]">
                Soluções<br />Tecnológicas<br />Inovadoras
              </h1>
            )}
            <p className="mt-6 text-base sm:text-lg text-white/80 max-w-[480px] leading-relaxed">
              {banner?.subtitle || "Oferecemos soluções completas de TI e softwares avançados que geram valor real para os nossos clientes."}
            </p>
            <div className="flex flex-wrap gap-3 mt-10">
              <Link to={(banner?.cta_primary_url as any) || "/about"} className="btn-primary uppercase tracking-[0.14em] text-[13px] px-9 py-4 rounded-none">
                {banner?.cta_primary_label || "Saiba mais"}
              </Link>
            </div>
          </div>
        </div>

        {/* Vertical prev/next arrows on right */}
        {banners.length > 1 && (
          <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-20">
            <button
              type="button"
              onClick={prevBanner}
              aria-label="Anterior"
              className="w-14 h-14 rounded-full border border-white/40 text-white/70 grid place-items-center bg-transparent transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={nextBanner}
              aria-label="Próximo"
              className="w-14 h-14 rounded-full border border-white/40 text-white/70 grid place-items-center bg-transparent transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </section>

      {/* ============ LOGOS ============ */}
      <LogoStrip />

      {/* ============ SERVICES (Real Time Dealing / tile row w/ active) ============ */}
      <section className="section-y bg-white relative overflow-hidden">
        {/* subtle circuit lines bg */}
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent 0 39px,#FF6933 39px 40px)," +
              "repeating-linear-gradient(90deg,transparent 0 39px,#FF6933 39px 40px)",
            backgroundSize: "40px 40px, 40px 40px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
        <div className="container-x relative text-center reveal max-w-3xl mx-auto">
          <div className="eyebrow mb-4 justify-center">O que oferecemos aos nossos clientes</div>
          <h2 className="text-3xl md:text-[42px] font-black leading-[1.15]">
            Atendimento em tempo real em todas as<br className="hidden md:block" /> soluções e serviços profissionais de TI
          </h2>
        </div>
        <div className="container-x relative mt-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {serviceTiles.map((s, i) => {
              const isActive = i === activeService;
              return (
                <button
                  key={s.t}
                  type="button"
                  onClick={() => setActiveService(i)}
                  onMouseEnter={() => setActiveService(i)}
                  className={`relative overflow-hidden text-center py-10 px-4 transition-all duration-300 ${isActive
                    ? "bg-[#171321] text-white shadow-[0_20px_50px_-20px_rgba(23,19,33,0.55)]"
                    : "bg-white text-foreground shadow-[0_10px_30px_-15px_rgba(20,16,60,0.15)] hover:-translate-y-1"}`}
                >
                  {isActive && (
                    <div aria-hidden className="absolute inset-0 opacity-[0.15] pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg,transparent 0 24px,#FF6933 24px 25px)," +
                          "repeating-linear-gradient(90deg,transparent 0 24px,#FF6933 24px 25px)",
                        backgroundSize: "25px 25px, 25px 25px",
                      }}
                    />
                  )}
                  <div className="relative">
                    <s.icon className={`w-12 h-12 mx-auto mb-4 ${isActive ? "text-primary" : "text-primary"}`} strokeWidth={1.5} />
                    <div className={`text-sm font-bold leading-tight ${isActive ? "text-white" : "text-foreground"}`}>{s.t}</div>
                  </div>
                  {isActive && (
                    <div aria-hidden className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-6 h-6 rotate-45 bg-[#171321]" />
                  )}
                </button>
              );
            })}
          </div>
          {/* Active service description */}
          <div className="text-center max-w-2xl mx-auto mt-16 reveal">
            <h3 className="text-2xl md:text-3xl font-black">{activeSvc?.t}</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">{activeSvc?.d}</p>
            <Link to="/servicos" className="btn-primary mt-8 uppercase tracking-[0.14em] text-[12px] px-8 py-4 rounded-none">Saiba mais</Link>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS (existing, preserved) ============ */}
      <section className="py-[72px] bg-[#fff4ee] relative overflow-hidden">
        <div className="w-[calc(100%-40px)] max-w-[956px] mx-auto relative grid lg:grid-cols-[390px_526px] gap-10 items-start">
          <div className="reveal max-w-[450px]">
            <div className="inline-flex items-center gap-3 text-primary text-xs font-bold mb-2">
              <span className="w-3 h-[2px] bg-primary" />
              Depoimentos de Clientes
            </div>
            <h2 className="text-[32px] md:text-[36px] font-black leading-[1.16] text-[#211b31] max-w-[360px]">
              Veja o que estão<br />falando sobre nós
            </h2>
            <div className="mt-3 flex items-center gap-4">
              <div className="w-[92px] h-[92px] rounded-full p-[5px] bg-primary shadow-[0_12px_28px_rgba(255,105,51,0.25)]">
                <div className="w-full h-full rounded-full overflow-hidden border-[4px] border-white">
                  <img key={active.photo} src={active.photo} alt={active.name} className="w-full h-full object-cover transition-opacity duration-300" />
                </div>
              </div>
              <div>
                <h3 className="text-[16px] font-black leading-tight text-[#211b31]">{active.name}</h3>
                <p className="mt-1 text-[11px] font-bold text-primary">{active.role}</p>
                <div className="mt-2 flex gap-0.5 text-[#ffb400] text-[17px] leading-none" aria-label="Avaliação cinco estrelas">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
            <p className="mt-8 text-[14px] leading-[1.85] text-[#6f6a7c] max-w-[390px] transition-opacity duration-300">{active.quote}</p>
            <div className="mt-4 flex items-center gap-2">
              {testimonialsList.map((t, i) => (
                <button key={t.name} type="button" aria-label={`Ver depoimento de ${t.name}`} onClick={() => setActiveT(i)}
                  className={`h-1 transition-all ${activeT === i ? "w-8 bg-primary" : "w-6 bg-[#c6c2ce] hover:bg-[#FFB899]"}`} />
              ))}
            </div>
          </div>
          <div className="relative reveal h-[392px] max-w-[526px] w-full justify-self-center lg:justify-self-end">
            {[
              { i: 1, style: "left-[20px] top-[6px] w-[72px] h-[72px] md:w-[78px] md:h-[78px] z-[3] shadow-[0_14px_36px_rgba(224,84,31,0.22)]" },
              { i: 0, style: "left-[118px] top-[96px] w-[296px] h-[296px] z-[4] shadow-[0_28px_70px_rgba(224,84,31,0.22)]" },
              { i: 2, style: "left-[334px] top-[52px] w-[164px] h-[164px] z-[2] shadow-[0_24px_58px_rgba(224,84,31,0.24)]" },
              { i: 3, style: "left-[374px] top-[286px] w-[72px] h-[72px] z-[5] shadow-[0_14px_30px_rgba(224,84,31,0.24)]" },
            ].map(({ i, style }) => {
              const t = testimonialsList[i]; if (!t) return null;
              const isActive = activeT === i;
              return (
                <button key={t.name} type="button" onClick={() => setActiveT(i)} onMouseEnter={() => setActiveT(i)} aria-label={`Ver depoimento de ${t.name}`}
                  className={`absolute ${style} rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.04] focus:outline-none ${isActive ? "ring-[4px] ring-primary ring-offset-2 ring-offset-[#fff4ee]" : "ring-2 ring-white"}`}>
                  <img loading="lazy" decoding="async" src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PROJECTS (Improve & Enhance) ============ */}
      <section className="section-y bg-section">
        <div className="container-x text-center reveal max-w-3xl mx-auto">
          <div className="eyebrow mb-3 justify-center">Nossos Projetos Concluídos</div>
          <h2 className="text-3xl md:text-[42px] font-black leading-[1.15]">Melhore &amp; Aprimore Nossos<br className="hidden md:block" /> Projetos de Tecnologia</h2>
        </div>
        <div className="container-x mt-12 grid md:grid-cols-3 gap-6 reveal-stagger">
          {projects.map((p) => (
            <article key={p.t} className="group relative overflow-hidden bg-white reveal">
              <div className="relative overflow-hidden">
                <img loading="lazy" decoding="async" src={p.img} alt={p.t} className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171321]/50 via-transparent to-transparent" />
              </div>
              <div className="p-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black leading-tight">{p.t}</h3>
                  <div className="mt-2 text-[11px] font-bold tracking-[0.18em] text-primary">{p.cat}</div>
                </div>
                <span className="w-12 h-12 grid place-items-center bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ COUNTERS ============ */}
      <section className="py-20 bg-white">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {counters.map((c) => (
            <div key={c.label} className="reveal">
              <div className="text-5xl md:text-6xl font-black text-[#171321] leading-none">
                <Counter end={c.n} /><sup className="text-primary text-3xl md:text-4xl">+</sup>
              </div>
              <div className="mt-4 text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-primary">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ OVERCOME CHALLENGES (dark w/ tile grid) ============ */}
      <section className="relative overflow-hidden bg-[#171321] text-white">
        <div aria-hidden className="absolute inset-0 opacity-30 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1600&q=70" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,19,33,0.95)_0%,rgba(23,19,33,0.75)_60%,rgba(23,19,33,0.55)_100%)]" />
        </div>
        {/* diagonal orange accent */}
        <div aria-hidden className="absolute -left-[8%] top-[-20%] w-[26%] h-[160%] pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,105,51,0.4), transparent 70%)", transform: "skewX(-14deg)", mixBlendMode: "screen" }} />
        <div aria-hidden className="absolute -right-[8%] top-[-30%] w-[26%] h-[180%] pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,105,51,0.25), transparent 70%)", transform: "skewX(-14deg)", mixBlendMode: "screen" }} />

        <div className="container-x relative z-10 py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-3 text-primary text-[11px] font-bold uppercase tracking-[0.25em] mb-5">
              <span className="w-8 h-[2px] bg-primary" />
              O que oferecemos
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-[1.1]">Ajudamos você a superar<br />seus desafios tecnológicos</h2>
            <p className="mt-6 text-white/75 leading-relaxed max-w-md">
              Somos uma empresa completa de suporte em TI que atende todas as necessidades — do suporte técnico ao desenvolvimento de software sob medida.
            </p>
            <Link to="/servicos" className="btn-primary mt-8 uppercase tracking-[0.14em] text-[12px] px-8 py-4 rounded-none">Saiba mais</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 reveal-stagger">
            {challenges.map((c) => (
              <div key={c.t} className="group border border-white/15 py-6 px-6 flex items-center gap-4 hover:bg-primary hover:border-primary transition-all reveal">
                <c.i className="w-9 h-9 text-primary group-hover:text-white transition-colors" strokeWidth={1.5} />
                <div className="text-base font-bold">{c.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BLOG (left title / right slider style) ============ */}
      <section className="section-y bg-white">
        <div className="container-x grid lg:grid-cols-[340px_1fr] gap-12">
          <div className="reveal">
            <div className="eyebrow mb-3">O que está acontecendo</div>
            <h2 className="text-3xl md:text-[40px] font-black leading-[1.15]">Últimas Notícias &amp; Artigos do Blog</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Novidades e conteúdos para ajudar você a adquirir conhecimento em TI e encontrar as melhores soluções para o seu negócio.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 reveal-stagger">
            {postsList.map((p) => (
              <article key={p.t} className="group bg-white shadow-[0_10px_35px_-15px_rgba(20,16,60,0.18)] hover:shadow-[0_25px_55px_-20px_rgba(20,16,60,0.28)] transition-all reveal overflow-hidden">
                <div className="relative overflow-hidden">
                  <img loading="lazy" decoding="async" src={p.img} className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" alt={p.t} />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1.5 text-[11px] font-bold tracking-widest">{p.d} {p.m}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><User className="w-3 h-3" /> admin</span>
                    <span className="inline-flex items-center gap-1.5"><MessageCircle className="w-3 h-3" /> 0 comentários</span>
                  </div>
                  <h3 className="mt-3 font-bold text-lg leading-snug group-hover:text-primary transition-colors">{p.t}</h3>
                  <Link to="/blog" className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary hover:gap-3 transition-all">
                    Leia mais <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA OVER MAP ============ */}
      <section className="relative">
        {/* map */}
        <div className="w-full h-[420px] bg-[#e8e8e8]">
          <iframe
            title="Mapa"
            src="https://www.google.com/maps?q=S%C3%A3o+Paulo,+SP&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        {/* overlapping CTA banner */}
        <div className="container-x relative -mt-[220px] md:-mt-[180px] mb-16">
          <div className="relative overflow-hidden bg-[#171321] text-white px-8 md:px-14 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal">
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=70" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,19,33,0.9),rgba(23,19,33,0.6)_60%,rgba(23,19,33,0.85))]" />
            </div>
            <div aria-hidden className="absolute -left-[6%] top-[-30%] w-[18%] h-[160%] pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(255,105,51,0.55), transparent 70%)", transform: "skewX(-14deg)", mixBlendMode: "screen" }} />
            <div className="relative">
              <div className="text-primary text-[11px] font-bold uppercase tracking-[0.25em] mb-3">Vamos começar</div>
              <h3 className="text-2xl md:text-[32px] font-black leading-tight max-w-xl">Parceiro de soluções em TI de classe mundial</h3>
            </div>
            <Link to="/contact" className="relative btn-primary uppercase tracking-[0.14em] text-[12px] px-9 py-4 rounded-none shrink-0">Fale conosco</Link>
          </div>
        </div>
      </section>

      {/* ============ TECHNOLOGY PATH (pillars — kept for content richness) ============ */}
      {pillarsList.length > 0 && (
        <section className="section-y bg-section">
          <div className="container-x text-center reveal max-w-3xl mx-auto">
            <div className="eyebrow mb-3 justify-center">Caminho da Tecnologia</div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">A agência de TI em que você pode confiar</h2>
          </div>
          <div className="container-x mt-12 grid md:grid-cols-3 gap-6 reveal-stagger">
            {pillarsList.map((p) => (
              <div key={p.t} className="card-tech p-8 text-center reveal">
                <div className="w-16 h-16 mx-auto rounded-full purple-gradient text-white grid place-items-center mb-5">
                  <p.i className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold">{p.t}</h3>
                <p className="text-sm text-muted-foreground mt-3">{p.d}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============ HERO CARDS (kept for below-fold, structural continuity) ============ */}
      {heroCardsList.length > 0 && (
        <section className="pb-24 bg-section">
          <div className="container-x grid md:grid-cols-3 gap-6 reveal-stagger">
            {heroCardsList.map((c, i) => (
              <div key={c.t} className="card-tech p-8 pb-10 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="absolute right-6 bottom-4 text-[70px] font-black leading-none text-foreground/[0.07] select-none">{c.n}</span>
                <h3 className="relative text-[18px] font-black uppercase tracking-wide leading-tight ">{c.t}</h3>
                <p className="relative mt-5 text-[13px] text-muted-foreground leading-relaxed max-w-[220px]">{c.d}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </SiteShell>
  );
}
