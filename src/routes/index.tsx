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


      {/* COMPANY BENEFITS */}
      <section className="section-y bg-white relative overflow-hidden">
        {/* Decorative curved shape top-right */}
        <div
          aria-hidden
          className="absolute -top-10 -right-10 lg:top-[-140px] lg:right-[-120px] w-[360px] h-[360px] lg:w-[520px] lg:h-[520px] rounded-full bg-primary/[0.05] pointer-events-none"
        />
        <div className="container-x relative grid lg:grid-cols-2 gap-14 items-center">
          {/* Left visual composition — circular photo cutouts + triangle confetti */}
          <div className="relative reveal order-2 lg:order-1 h-[480px] md:h-[560px]">
            {/* Triangle confetti (scattered geometric shapes) */}
            <svg
              aria-hidden
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 600 560"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              <g fill="#FF6933" fillOpacity="0.18" stroke="#FF6933" strokeOpacity="0.35" strokeWidth="1">
                {[
                  { p: "M120,60 L138,52 L132,76 Z", r: 0 },
                  { p: "M180,110 L204,100 L196,128 Z", r: 15 },
                  { p: "M90,140 L108,132 L100,158 Z", r: -20 },
                  { p: "M240,40 L258,32 L250,58 Z", r: 8 },
                  { p: "M300,90 L322,80 L314,108 Z", r: -10 },
                  { p: "M160,180 L182,170 L172,198 Z", r: 25 },
                  { p: "M60,220 L82,210 L72,238 Z", r: -5 },
                  { p: "M220,220 L240,212 L232,236 Z", r: 12 },
                  { p: "M360,150 L382,140 L372,168 Z", r: -18 },
                  { p: "M420,60 L440,52 L432,78 Z", r: 22 },
                  { p: "M480,180 L502,170 L492,200 Z", r: -8 },
                  { p: "M540,120 L560,112 L552,138 Z", r: 14 },
                  { p: "M500,280 L522,270 L512,300 Z", r: -12 },
                  { p: "M560,340 L582,330 L572,358 Z", r: 18 },
                  { p: "M40,320 L60,310 L52,338 Z", r: 6 },
                  { p: "M100,400 L122,390 L112,418 Z", r: -15 },
                  { p: "M40,460 L60,452 L52,478 Z", r: 10 },
                  { p: "M180,480 L202,470 L192,498 Z", r: -22 },
                  { p: "M540,460 L562,450 L552,478 Z", r: 16 },
                  { p: "M280,510 L300,502 L292,528 Z", r: -6 },
                ].map((t, i) => (
                  <path key={i} d={t.p} transform={`rotate(${t.r} ${120 + i * 5} ${60 + i * 5})`} />
                ))}
              </g>
            </svg>

            {/* Small top-left circle */}
            <div className="absolute left-2 top-4 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-[6px] ring-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] z-[2]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* Large main circle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-[42%] -translate-y-[46%] w-[340px] h-[340px] md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px] rounded-full overflow-hidden ring-[6px] ring-white shadow-[0_30px_80px_rgba(0,0,0,0.22)] z-[3]">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80"
                alt="Profissional de tecnologia sorrindo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Medium top-right circle — overlaps main upper-right */}
            <div className="absolute right-0 top-10 md:top-16 w-44 h-44 md:w-56 md:h-56 lg:w-60 lg:h-60 rounded-full overflow-hidden ring-[6px] ring-white shadow-[0_20px_50px_rgba(0,0,0,0.22)] z-[4]">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* Small bottom-right circle */}
            <div className="absolute right-6 bottom-24 md:right-10 md:bottom-20 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-[6px] ring-white shadow-[0_10px_28px_rgba(0,0,0,0.18)] z-[5]">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="reveal max-w-[560px] order-1 lg:order-2">
            <div className="eyebrow mb-4">Benefícios da Empresa</div>
            <h2 className="text-[34px] md:text-[46px] font-black leading-[1.12]">As melhores soluções tecnológicas para seus clientes</h2>
            <p className="mt-6 text-muted-foreground leading-[1.85] text-[15px]">
              A WF Digital é especialista em consultoria de TI e desenvolvimento de software. Ajudamos organizações e empresas a melhorar a performance e a competitividade do negócio. Oferecemos suporte 24 horas, 7 dias por semana, para atender a todas as demandas dos nossos clientes.
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M62 44.5H56.5C54.5 44.5 53 43.2 53 41.5C53 40.5 53.5 39.5 54.5 38.9C54.5 38.9 54.5 38.8 54.5 38.7C54.5 32.5 49.5 27.5 43.3 27.5C41.5 27.5 39.8 28 38.2 28.8C36.2 24.6 32 21.5 27 21.5C20 21.5 14.5 27 14.5 34C14.5 34.7 14.5 35.4 14.7 36.1C11.8 37.4 9.5 40.5 9.5 44.5C9.5 49.5 13.5 53.5 18.5 53.5H62C67 53.5 71 49.5 71 44.5C71 39.5 67 35.5 62 35.5V44.5Z"
                      stroke="#FF6933"
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                    />
                    <circle cx="40" cy="40" r="4" stroke="#FF6933" strokeWidth="2" />
                    <path d="M40 36V32" stroke="#FF6933" strokeWidth="2" strokeLinecap="round" />
                    <path d="M43 41H48" stroke="#FF6933" strokeWidth="2" strokeLinecap="round" />
                    <path d="M32 41H37" stroke="#FF6933" strokeWidth="2" strokeLinecap="round" />
                    <path d="M38 44L35 48" stroke="#FF6933" strokeWidth="2" strokeLinecap="round" />
                    <path d="M42 44L45 48" stroke="#FF6933" strokeWidth="2" strokeLinecap="round" />
                    <path d="M21 66C26 72 54 72 59 66" stroke="#FF6933" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[20px] font-bold leading-tight">Desenvolvimento de Ponta a Ponta</h4>
                  <p className="mt-2 text-[14px] text-muted-foreground leading-[1.8]">Conduzimos o processo completo, do conceito de design e planejamento até o lançamento do produto.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M32 58.5V62.5C32 65.5 34.5 68 37.5 68H42.5C45.5 68 48 65.5 48 62.5V58.5"
                      stroke="#FF6933"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M40 14C28.5 14 22 24 22 34C22 41 25 47 30 51V57.5H50V51C55 47 58 41 58 34C58 24 51.5 14 40 14Z"
                      stroke="#FF6933"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="40" cy="34" r="9" stroke="#FF6933" strokeWidth="2" />
                    <path d="M36 43C36 43 38 45 40 45C42 45 44 43 44 43" stroke="#FF6933" strokeWidth="2" strokeLinecap="round" />
                    <path d="M17 22L20 25" stroke="#FF6933" strokeWidth="2" strokeLinecap="round" />
                    <path d="M63 22L60 25" stroke="#FF6933" strokeWidth="2" strokeLinecap="round" />
                    <path d="M40 8V12" stroke="#FF6933" strokeWidth="2" strokeLinecap="round" />
                    <path d="M21 66C26 72 54 72 59 66" stroke="#FF6933" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[20px] font-bold leading-tight">Outsourcing de Software e TI</h4>
                  <p className="mt-2 text-[14px] text-muted-foreground leading-[1.8]">Oferecemos aos nossos clientes soluções realmente benéficas com um serviço verdadeiramente profissional.</p>
                </div>
              </div>
            </div>

            <Link to="/about" className="btn-primary mt-10">Saiba mais</Link>
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
