import { usePageSeoInject } from "@/hooks/usePageSeoInject";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect, type ComponentType } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import {
  ArrowRight, Cpu, Code2, Sparkles, Globe, Mail, Server, Wifi, ClipboardCheck, Clock,
  Award, Users, Trophy, MessageCircle, User, ChevronLeft, ChevronRight, ArrowUpRight,
  Shield, Rocket, Zap, HeartHandshake, Star,
} from "lucide-react";
import { usePublicHeroCards, usePublicPillars, usePublicServices, usePublicTestimonials, usePublicBlog, useHeroBanners } from "@/hooks/usePublicContent";

const iconMap: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Code2, Sparkles, Globe, Mail, Server, Wifi, ClipboardCheck, Clock, Cpu,
  Users, Award, Trophy, Shield, Rocket, Zap, HeartHandshake, Star,
};
const getIcon = (name?: string | null, fallback: ComponentType<any> = Cpu) => (name && iconMap[name]) || fallback;

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  photo: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Ana Ribeiro",
    role: "Diretora de Operações",
    quote:
      "A WF Digital entendeu exatamente o processo da nossa empresa e entregou um sistema sob medida que reduziu o retrabalho e organizou toda a operação.",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=720&q=80",
  },
  {
    name: "Camila Alves",
    role: "Gerente de Projetos",
    quote:
      "Automatizamos nosso atendimento com IA e conseguimos ganhar tempo em tarefas repetitivas. O suporte da equipe foi essencial em cada etapa.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=220&q=80",
  },
  {
    name: "Marina Costa",
    role: "Coordenadora de TI",
    quote:
      "A implantação da rede e dos servidores trouxe muito mais estabilidade para o dia a dia. Recomendo pela seriedade e conhecimento técnico.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=460&q=80",
  },
  {
    name: "Rafael Souza",
    role: "Diretor Comercial",
    quote:
      "O site novo e a hospedagem profissional trouxeram mais credibilidade para nossa marca. Resultado direto em novos contatos e clientes.",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=220&q=80",
  },
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
  { i: Users, t: "Experiência", d: "Entrega comprovada de projetos de tecnologia para empresas de diferentes portes." },
  { i: Award, t: "Sob Medida", d: "Cada solução é pensada a partir da realidade e necessidade do seu negócio." },
  { i: Trophy, t: "Profissionalismo", d: "Suporte próximo e equipe dedicada ao sucesso da sua operação." },
];

const posts = [
  { t: "Sistemas personalizados: quando vale a pena investir", d: "01", m: "MAR", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80" },
  { t: "Automação com IA no dia a dia da empresa", d: "14", m: "MAR", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" },
  { t: "Servidor local ou em nuvem: qual escolher?", d: "22", m: "MAR", img: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&q=80" },
];

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
    return {
      t: p.title, slug: p.slug,
      d: String(dt.getDate()).padStart(2, "0"),
      m: dt.toLocaleString("pt-BR", { month: "short" }).replace(".", "").toUpperCase().slice(0, 3),
      img: p.cover_url || "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    };
  }) : posts.map((p) => ({ ...p, slug: undefined as string | undefined })));

  const [activeT, setActiveT] = useState(0);
  const active = testimonialsList[Math.min(activeT, testimonialsList.length - 1)] ?? testimonialsList[0];
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
  return (
    <SiteShell>
      {/* HERO */}
      <section
        className="relative bg-[#fff4ee] overflow-hidden"
        onMouseEnter={() => { heroPausedRef.current = true; }}
        onMouseLeave={() => { heroPausedRef.current = false; }}
      >
        {/* Full-bleed hero image on the right half */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 pointer-events-none">
          <img
            key={banner?.id || "fallback"}
            src={banner?.image_desktop_url || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=70&auto=format"}
            alt={banner?.title || "Profissional de tecnologia"}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover grayscale opacity-90 lg:opacity-100 animate-fade-in"
          />
          {/* fade overlay on the left edge of the image to blend into bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff4ee] via-[#fff4ee]/40 to-transparent lg:via-transparent" />
        </div>

        {/* Circuit board traces decoration on the left */}
        <div
          aria-hidden
          className="hidden md:block absolute left-0 bottom-0 w-[55%] h-[70%] pointer-events-none z-[1]"
          style={{
            maskImage: "linear-gradient(to right, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 55%, transparent 100%)",
          }}
        >
          <svg viewBox="0 0 800 560" className="w-full h-full" fill="none" preserveAspectRatio="xMinYMax slice">
            <g stroke="#FF6933" strokeWidth="1.2" strokeLinecap="round" opacity="0.55">
              {/* horizontal + right-angle traces */}
              <path d="M0 80 H120 L160 120 H260 L300 80 H420" />
              <path d="M0 140 H80 L120 180 H240" />
              <path d="M0 220 H180 L220 260 H360 L400 220 H520" />
              <path d="M0 300 H140 L180 340 H320" />
              <path d="M0 380 H100 L140 340 H240 L280 380 H420 L460 420 H600" />
              <path d="M0 460 H160 L200 500 H340" />
              <path d="M0 520 H240 L280 480 H460" />
              <path d="M60 0 V60 L100 100 V180" />
              <path d="M200 0 V40 L240 80 V160" />
              <path d="M340 0 V100 L380 140 V240" />
              <path d="M480 40 V160 L520 200 V300" />
              <path d="M560 200 V320 L600 360 V460" />
              <path d="M380 300 V400 L420 440 V560" />
              <path d="M120 320 V420 L160 460 V560" />
            </g>
            {/* node dots */}
            <g fill="#FF6933" opacity="0.75">
              {[
                [120, 80], [160, 120], [260, 120], [300, 80], [420, 80],
                [80, 140], [120, 180], [240, 180],
                [180, 220], [220, 260], [360, 260], [400, 220], [520, 220],
                [140, 300], [180, 340], [320, 340],
                [100, 380], [140, 340], [280, 380], [420, 380], [460, 420], [600, 420],
                [160, 460], [200, 500], [340, 500],
                [240, 520], [280, 480], [460, 480],
                [60, 60], [100, 100], [200, 40], [240, 80], [340, 100], [380, 140],
                [480, 160], [520, 200], [560, 320], [600, 360], [380, 400], [420, 440],
                [120, 420], [160, 460],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="2.6" />
              ))}
            </g>
          </svg>
        </div>

        <div className="container-x relative pt-24 lg:pt-32 pb-44 lg:pb-56 grid lg:grid-cols-2 gap-10">
          <div className="reveal relative z-[2]">
            <div className="inline-flex items-center gap-3 text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-7">
              {banner?.support_text || "Bem-vindo à WF Digital"}
            </div>
            {banner?.title ? (
              <h1 className="font-black text-foreground leading-[1.05] tracking-tight text-[44px] sm:text-[60px] lg:text-[76px]">
                {banner.title}
              </h1>
            ) : (
              <h1 className="font-black text-foreground leading-[1.05] tracking-tight text-[44px] sm:text-[60px] lg:text-[76px]">
                <span className="relative inline-block">
                  O futuro
                  <svg className="absolute left-0 -bottom-1 w-[220px] h-3" viewBox="0 0 180 12" fill="none" preserveAspectRatio="none">
                    <path d="M2 8 C 40 2, 90 10, 178 4" stroke="#FF6933" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
                <br />pertence à<br />tecnologia
              </h1>
            )}
            {banner?.subtitle && (
              <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-[520px] leading-relaxed">{banner.subtitle}</p>
            )}
            <div className="flex flex-wrap gap-3 mt-10">
              <Link to={(banner?.cta_primary_url as any) || "/about"} className="btn-primary">
                {banner?.cta_primary_label || "Saiba mais"}
              </Link>
              {banner?.cta_secondary_label && banner?.cta_secondary_url && (
                <Link to={banner.cta_secondary_url as any} className="btn-secondary">
                  {banner.cta_secondary_label}
                </Link>
              )}
            </div>
          </div>

          {/* slider prev/next controls on right */}
          {banners.length > 1 && (
            <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-10">
              <button
                type="button"
                onClick={prevBanner}
                aria-label="Anterior"
                className="w-11 h-11 rounded-full border border-foreground/25 text-foreground/60 grid place-items-center transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:-translate-y-0.5"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-col items-center gap-1.5 py-1">
                {banners.map((b: any, i: number) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBannerIdx(i)}
                    aria-label={`Ir para slide ${i + 1}`}
                    className={`w-1.5 rounded-full transition-all duration-300 ${i === bannerIdx % banners.length ? "h-6 bg-primary" : "h-1.5 bg-foreground/25 hover:bg-foreground/40"}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={nextBanner}
                aria-label="Próximo"
                className="w-11 h-11 rounded-full border border-foreground/25 text-foreground/60 grid place-items-center transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:-translate-y-0.5"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* overlapping cards */}
        <div className="container-x relative -mt-32 lg:-mt-40 pb-24 grid md:grid-cols-3 gap-6 z-10">
          {heroCardsList.map((c, i) => (
            <div
              key={c.t}
              className="card-tech p-8 pb-10 reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="absolute right-6 bottom-4 text-[70px] font-black leading-none text-foreground/[0.07] select-none">{c.n}</span>
              <h3 className="relative text-[18px] font-black uppercase tracking-wide leading-tight ">{c.t}</h3>
              <p className="relative mt-5 text-[13px] text-muted-foreground leading-relaxed max-w-[220px]">{c.d}</p>
            </div>
          ))}
        </div>
      </section>


      {/* TESTIMONIAL DETAIL — same circular-photo scale/placement as reference */}
      <section className="py-[72px] bg-[#fff4ee] relative overflow-hidden">
        <div className="w-[calc(100%-40px)] max-w-[956px] mx-auto relative grid lg:grid-cols-[390px_526px] gap-10 items-start">
          <div className="reveal max-w-[450px]">
            <div className="inline-flex items-center gap-3 text-[#FF6933] text-xs font-bold mb-2">
              <span className="w-3 h-[2px] bg-[#FF6933]" />
              Depoimentos de Clientes
            </div>
            <h2 className="text-[32px] md:text-[36px] font-black leading-[1.16] text-[#211b31] max-w-[360px]">
              Veja o que estão<br />falando sobre nós
            </h2>

            <div className="mt-3 flex items-center gap-4">
              <div className="w-[92px] h-[92px] rounded-full p-[5px] bg-[#FF6933] shadow-[0_12px_28px_rgba(255,105,51,0.25)]">
                <div className="w-full h-full rounded-full overflow-hidden border-[4px] border-white">
                  <img
                    key={active.photo}
                    src={active.photo}
                    alt={active.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-[16px] font-black leading-tight text-[#211b31]">{active.name}</h3>
                <p className="mt-1 text-[11px] font-bold text-[#FF6933]">{active.role}</p>
                <div className="mt-2 flex gap-0.5 text-[#ffb400] text-[17px] leading-none" aria-label="Avaliação cinco estrelas">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-[14px] leading-[1.85] text-[#6f6a7c] max-w-[390px] transition-opacity duration-300">
              {active.quote}
            </p>

            <div className="mt-4 flex items-center gap-2">
              {testimonialsList.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Ver depoimento de ${t.name}`}
                  onClick={() => setActiveT(i)}
                  className={`h-1 transition-all ${activeT === i ? "w-8 bg-[#FF6933]" : "w-6 bg-[#c6c2ce] hover:bg-[#FFB899]"}`}
                />
              ))}
            </div>
          </div>

          <div className="relative reveal h-[392px] max-w-[526px] w-full justify-self-center lg:justify-self-end">
            <svg
              aria-hidden
              className="absolute left-[20px] top-0 w-[506px] h-[390px] pointer-events-none"
              viewBox="0 0 520 420"
              fill="none"
              preserveAspectRatio="none"
            >
              <g fill="#FFB899" fillOpacity="0.18" stroke="#FFB899" strokeOpacity="0.16" strokeWidth="1">
                <path d="M46 15 L56 20 L48 26 Z" />
                <path d="M108 78 L124 70 L119 95 Z" />
                <path d="M32 111 L40 92 L51 120 Z" />
                <path d="M146 24 L164 18 L158 44 Z" />
                <path d="M205 106 L223 94 L218 128 Z" />
                <path d="M260 42 L275 34 L272 64 Z" />
                <path d="M312 84 L334 73 L325 105 Z" />
                <path d="M365 54 L388 45 L379 86 Z" />
                <path d="M420 98 L445 86 L437 128 Z" />
                <path d="M475 140 L508 126 L494 178 Z" />
                <path d="M455 225 L487 212 L476 260 Z" />
                <path d="M416 307 L438 296 L431 331 Z" />
                <path d="M347 338 L368 330 L360 359 Z" />
                <path d="M255 315 L273 307 L266 336 Z" />
                <path d="M180 274 L199 266 L192 294 Z" />
                <path d="M118 210 L136 200 L130 230 Z" />
                <path d="M70 266 L92 255 L84 292 Z" />
                <path d="M24 190 L40 181 L35 210 Z" />
              </g>
            </svg>

            {[
              { i: 1, style: "left-[20px] top-[6px] w-[72px] h-[72px] md:w-[78px] md:h-[78px] z-[3] shadow-[0_14px_36px_rgba(224,84,31,0.22)]" },
              { i: 0, style: "left-[118px] top-[96px] w-[296px] h-[296px] z-[4] shadow-[0_28px_70px_rgba(224,84,31,0.22)]" },
              { i: 2, style: "left-[334px] top-[52px] w-[164px] h-[164px] z-[2] shadow-[0_24px_58px_rgba(224,84,31,0.24)]" },
              { i: 3, style: "left-[374px] top-[286px] w-[72px] h-[72px] z-[5] shadow-[0_14px_30px_rgba(224,84,31,0.24)]" },
            ].map(({ i, style }) => {
              const t = testimonialsList[i];
              const isActive = activeT === i;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActiveT(i)}
                  onMouseEnter={() => setActiveT(i)}
                  aria-label={`Ver depoimento de ${t.name}`}
                  className={`absolute ${style} rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.04] focus:outline-none ${isActive ? "ring-[4px] ring-[#FF6933] ring-offset-2 ring-offset-[#fff4ee]" : "ring-2 ring-white"}`}
                >
                  <img loading="lazy" decoding="async" src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        </div>
      </section>


      {/* SERVICES GRID 3x2 */}
      <section className="section-y bg-section relative overflow-hidden">
        <div className="container-x relative text-center reveal max-w-5xl mx-auto">
          <div className="eyebrow mb-4 justify-center">O que oferecemos aos nossos clientes</div>
          <h2 className="text-3xl md:text-4xl lg:text-[38px] font-black leading-[1.2]">Atendimento em tempo real em todas as soluções<br /> e serviços profissionais de TI</h2>
        </div>
        <div className="container-x relative mt-14">
          <div
            ref={servicesScrollRef}
            onMouseEnter={() => { servicesPausedRef.current = true; }}
            onMouseLeave={() => { servicesPausedRef.current = false; }}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden reveal-stagger"
          >
            {servicesList.map((s, i) => (
              <div
                key={s.t}
                data-svc-card
                className="card-tech p-8 reveal group text-center shrink-0 snap-start basis-[82%] sm:basis-[calc((100%-3rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
                style={{ transitionDelay: `${i*70}ms`}}
              >
                <div className="w-16 h-16 mx-auto rounded-full purple-gradient text-white grid place-items-center mb-5">
                  <s.icon className="w-7 h-7" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => scrollServices(-1)}
              aria-label="Anterior"
              className="w-12 h-12 grid place-items-center border border-primary/25 text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scrollServices(1)}
              aria-label="Próximo"
              className="w-12 h-12 grid place-items-center border border-primary/25 text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>



      {/* BETTER IT SOLUTIONS BLOCK */}
      <section className="bg-section">
        <div className="container-x py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="reveal">
            <div className="eyebrow mb-3">Soluções de TI</div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">As melhores soluções e serviços de TI ao seu alcance</h2>
            <p className="mt-5 text-muted-foreground max-w-lg">
              Entregamos soluções corporativas completas — de infraestrutura a aplicações — projetadas para impulsionar seu negócio em todas as fases de crescimento.
            </p>
            <Link to="/servicos" className="btn-primary mt-7">Saiba mais <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="relative reveal">
            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80" className="w-full h-[380px] object-cover" alt="" />
          </div>
        </div>
      </section>


      {/* TECHNOLOGY PATH */}
      <section className="section-y bg-section">
        <div className="container-x text-center reveal max-w-3xl mx-auto">
          <div className="eyebrow mb-3 justify-center">Caminho da Tecnologia</div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight"><span className="block ">A agência de soluções e serviços de TI</span><span className="block ">em que você pode confiar</span></h2>
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

      {/* BLOG / NEWS */}
      <section className="section-y bg-white">
        <div className="container-x text-center reveal max-w-2xl mx-auto">
          <div className="eyebrow mb-3 justify-center">Novidades</div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">Notícias &amp; Artigos</h2>
        </div>
        <div className="container-x mt-12 grid md:grid-cols-3 gap-7 reveal-stagger">
          {postsList.map((p) => (
            <article key={p.t} className="card-tech overflow-hidden reveal">
              <div className="relative overflow-hidden">
                <img loading="lazy" decoding="async" src={p.img} className="w-full h-56 object-cover transition-transform duration-700 hover:scale-110" alt={p.t} />
                <div className="absolute top-4 left-4 bg-primary text-white text-center px-3 py-2 leading-none">
                  <div className="text-2xl font-black">{p.d}</div>
                  <div className="text-[10px] font-bold tracking-widest mt-1">{p.m}</div>
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><User className="w-3 h-3" /> admin</span>
                  <span className="inline-flex items-center gap-1.5"><MessageCircle className="w-3 h-3" /> 0 comentários</span>
                </div>
                <h3 className="mt-3 font-bold text-lg leading-snug hover:text-primary transition-colors">{p.t}</h3>
                <Link to="/blog" className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary hover:gap-3 transition-all">
                  Leia mais <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
