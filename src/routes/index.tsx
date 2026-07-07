import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import {
  ShieldCheck, Cloud, HardDrive, ArrowRight, Cpu, Code2, BarChart3, Database, Settings2,
  Briefcase, Award, Users, Trophy, MessageCircle, User, ChevronLeft, ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "WF Digital — O futuro pertence à tecnologia" },
    { name: "description", content: "A WF Digital entrega soluções de TI de classe mundial, cibersegurança, serviços em nuvem e desenvolvimento de software para empresas inovadoras." },
    { property: "og:title", content: "WF Digital — O futuro pertence à tecnologia" },
  ]}),
  component: HomePage,
});

const heroCards = [
  { n: "01", t: "Backup e Recuperação", d: "Ajuda a proteger sua organização contra perda de dados", icon: HardDrive },
  { n: "02", t: "Internet e Cibersegurança", d: "Táticas de segurança para proteger usuários de ameaças", icon: ShieldCheck },
  { n: "03", t: "Serviços em Nuvem", d: "Aplicações, servidores, armazenamento e desktops virtuais", icon: Cloud },
];

const services = [
  { t: "Software Automatizado", d: "Usado na gestão de processos de negócio para aumentar produtividade e eficiência.", icon: Cpu },
  { t: "Consultoria em TI", d: "Aumento da produtividade do time, redução de custos, vantagem competitiva e muito mais.", icon: Briefcase },
  { t: "Estratégia de Mercado", d: "Oferecemos as melhores estratégias de marketing para fazer seu negócio crescer.", icon: BarChart3 },
  { t: "Estruturação de Dados", d: "Analisamos a natureza dos dados e sua importância dentro do panorama do seu negócio.", icon: Database },
  { t: "Serviços Gerenciados de TI", d: "Inclui monitoramento de rede, segurança e virtualização sob gestão completa.", icon: Settings2 },
  { t: "Desenvolvimento de Software", d: "Processo completo de criação, design, implantação e suporte de software.", icon: Code2 },
];

const industries = [
  { letter: "G", t: "Games e Entretenimento", d: "Plataformas imersivas, operações em tempo real e experiências de entretenimento de alta escala." },
  { letter: "N", t: "Negócios e Finanças", d: "Sistemas financeiros seguros, relatórios inteligentes e plataformas corporativas modernas." },
  { letter: "T", t: "Tecnologia da Informação", d: "Arquiteturas cloud-native, excelência em DevOps e engenharia para times de TI." },
];

const pillars = [
  { i: Users, t: "Experiência", d: "Anos de comprovada entrega de projetos corporativos de TI." },
  { i: Award, t: "Conveniência", d: "Tornamos a parceria com tecnologia simples e fluida." },
  { i: Trophy, t: "Profissionalismo", d: "Uma equipe sênior dedicada ao sucesso do seu projeto." },
];

const posts = [
  { t: "Os diferentes tipos de backup de dados", d: "01", m: "MAR", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80" },
  { t: "Soluções rápidas para o seu problema", d: "14", m: "MAR", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" },
  { t: "O que é Staff Augmentation?", d: "22", m: "MAR", img: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&q=80" },
];

function HomePage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative bg-[#f3f1f7] overflow-hidden">
        {/* Full-bleed hero image on the right half */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1400&q=80"
            alt="Profissional de tecnologia"
            className="w-full h-full object-cover grayscale opacity-90 lg:opacity-100"
          />
          {/* fade overlay on the left edge of the image to blend into bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f3f1f7] via-[#f3f1f7]/40 to-transparent lg:via-transparent" />
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
              Bem-vindo à WF Digital
            </div>
            <h1 className="font-black text-foreground leading-[1.05] tracking-tight text-[44px] sm:text-[60px] lg:text-[76px]">
              <span className="relative inline-block">
                O futuro
                <svg className="absolute left-0 -bottom-1 w-[220px] h-3" viewBox="0 0 180 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 8 C 40 2, 90 10, 178 4" stroke="#FF6933" strokeWidth="4" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              <br />pertence à<br />tecnologia
            </h1>
            <Link to="/about" className="btn-primary mt-10">Saiba mais</Link>
          </div>

          {/* slider prev/next controls on right */}
          <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-10">
            <button
              type="button"
              aria-label="Anterior"
              className="w-11 h-11 rounded-full border border-foreground/25 text-foreground/60 grid place-items-center transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:-translate-y-0.5"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Próximo"
              className="w-11 h-11 rounded-full border border-foreground/25 text-foreground/60 grid place-items-center transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:-translate-y-0.5"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* overlapping cards */}
        <div className="container-x relative -mt-32 lg:-mt-40 pb-24 grid md:grid-cols-3 gap-6 z-10">
          {heroCards.map((c, i) => (
            <div
              key={c.t}
              className="card-tech p-8 pb-10 reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="absolute right-6 bottom-4 text-[70px] font-black leading-none text-foreground/[0.07] select-none">{c.n}</span>
              <h3 className="relative text-[18px] font-black uppercase tracking-wide leading-tight max-w-[180px]">{c.t}</h3>
              <p className="relative mt-5 text-[13px] text-muted-foreground leading-relaxed max-w-[220px]">{c.d}</p>
            </div>
          ))}
        </div>
      </section>


      {/* TESTIMONIAL DETAIL — same circular-photo scale/placement as reference */}
      <section className="section-y bg-[#f4f1fb] relative overflow-hidden">
        <div className="container-x relative grid lg:grid-cols-[0.88fr_1.12fr] gap-10 lg:gap-16 items-center">
          <div className="reveal max-w-[450px]">
            <div className="inline-flex items-center gap-3 text-[#6d4cff] text-xs font-bold mb-4">
              <span className="w-3 h-[2px] bg-[#6d4cff]" />
              Client Testimonials
            </div>
            <h2 className="text-[34px] md:text-[40px] font-black leading-[1.18] text-[#211b31]">
              Check What They’re<br />Talking About
            </h2>

            <div className="mt-4 flex items-center gap-4">
              <div className="w-[92px] h-[92px] rounded-full p-[5px] bg-[#734cff] shadow-[0_12px_28px_rgba(90,59,214,0.2)]">
                <div className="w-full h-full rounded-full overflow-hidden border-[4px] border-white">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=220&q=80"
                    alt="Mike Hardson"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-[16px] font-black leading-tight text-[#211b31]">Mike Hardson</h3>
                <p className="mt-1 text-[11px] font-bold text-[#6d4cff]">Senior Designer</p>
                <div className="mt-2 flex gap-0.5 text-[#ffb400] text-[17px] leading-none" aria-label="Avaliação cinco estrelas">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-[14px] leading-[1.85] text-[#6f6a7c] max-w-[390px]">
              A WF Digital cria soluções de tecnologia com qualidade para clientes que precisam de uma equipe confiável, estratégica e preparada para encontrar as melhores soluções de TI.
            </p>

            <div className="mt-4 flex items-center gap-2" aria-hidden>
              <span className="w-6 h-1 bg-[#6d4cff]" />
              <span className="w-6 h-1 bg-[#c6c2ce]" />
              <span className="w-6 h-1 bg-[#c6c2ce]" />
            </div>
          </div>

          <div className="relative reveal h-[430px] md:h-[460px] lg:h-[430px] max-w-[590px] w-full justify-self-center lg:justify-self-end">
            <svg
              aria-hidden
              className="absolute left-[42px] top-0 w-[520px] h-[420px] pointer-events-none"
              viewBox="0 0 520 420"
              fill="none"
              preserveAspectRatio="none"
            >
              <g fill="#8f65ff" fillOpacity="0.18" stroke="#8f65ff" strokeOpacity="0.16" strokeWidth="1">
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

            <div className="absolute left-0 top-[6px] w-[78px] h-[78px] rounded-full overflow-hidden shadow-[0_14px_36px_rgba(70,44,128,0.18)] z-[3]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=220&q=80"
                alt="Cliente"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute left-[98px] top-[96px] w-[296px] h-[296px] rounded-full overflow-hidden shadow-[0_28px_70px_rgba(70,44,128,0.18)] z-[4]">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=720&q=80"
                alt="Cliente sorrindo com tablet"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute left-[278px] top-[52px] w-[198px] h-[198px] rounded-full overflow-hidden shadow-[0_24px_58px_rgba(70,44,128,0.2)] z-[2]">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=460&q=80"
                alt="Cliente"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute left-[354px] top-[286px] w-[72px] h-[72px] rounded-full overflow-hidden shadow-[0_14px_30px_rgba(70,44,128,0.2)] z-[5]">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=220&q=80"
                alt="Cliente"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      {/* SERVICES GRID 3x2 */}
      <section className="section-y bg-section relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(106,38,218,0.35) 1px, transparent 1.5px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse at center, transparent 30%, black 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, transparent 30%, black 80%)",
          }}
        />
        <div className="container-x relative text-center reveal max-w-3xl mx-auto">
          <div className="eyebrow mb-4 justify-center">O que oferecemos aos nossos clientes</div>
          <h2 className="text-3xl md:text-5xl font-black leading-[1.15]">Atendimento em tempo real em todas as<br />soluções e serviços profissionais de TI</h2>
        </div>
        <div className="container-x relative mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
          {services.map((s, i) => (
            <div
              key={s.t}
              className="card-tech p-10 min-h-[260px] reveal group"
              style={{ transitionDelay: `${i*70}ms`}}
            >
              <h3 className="font-black text-[22px] tracking-tight">{s.t}</h3>
              <p className="mt-6 text-[14px] text-muted-foreground leading-relaxed max-w-[260px]">{s.d}</p>
              <div className="absolute right-8 bottom-8">
                <div className="card-tech-icon">
                  <s.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERMEDIATE DARK CTA */}
      <section className="circuit-bg text-white">
        <div className="container-x py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-2xl md:text-3xl font-black">Precisa de consultoria em soluções e serviços de TI?</h3>
          <Link to="/contact" className="btn-primary">Envie um orçamento gratuito <ArrowRight className="w-4 h-4" /></Link>
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
            <Link to="/services" className="btn-primary mt-7">Saiba mais <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="relative reveal">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80" className="w-full h-[380px] object-cover" alt="" />
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section-y bg-white">
        <div className="container-x grid md:grid-cols-3 gap-6 reveal-stagger">
          {industries.map((i) => (
            <div key={i.letter} className="card-tech group p-8 reveal">
              <div className="w-20 h-20 purple-gradient text-white font-black text-5xl grid place-items-center mb-6 leading-none">{i.letter}</div>
              <h3 className="text-xl font-bold">{i.t}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{i.d}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary">
                Leia mais <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNOLOGY PATH */}
      <section className="section-y bg-section">
        <div className="container-x text-center reveal max-w-3xl mx-auto">
          <div className="eyebrow mb-3 justify-center">Caminho da Tecnologia</div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">A agência de soluções e serviços de TI<br />em que você pode confiar</h2>
        </div>
        <div className="container-x mt-12 grid md:grid-cols-3 gap-6 reveal-stagger">
          {pillars.map((p) => (
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
          {posts.map((p) => (
            <article key={p.t} className="card-tech overflow-hidden reveal">
              <div className="relative overflow-hidden">
                <img src={p.img} className="w-full h-56 object-cover transition-transform duration-700 hover:scale-110" alt={p.t} />
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
