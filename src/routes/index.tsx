import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import {
  ShieldCheck, Cloud, HardDrive, ArrowRight, Cpu, Code2, BarChart3, Database, Settings2,
  Briefcase, Award, Users, Trophy, MessageCircle, User,
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

        {/* Circuit decoration on the left */}
        <div
          aria-hidden
          className="hidden md:block absolute left-0 top-0 bottom-0 w-1/3 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(106,38,218,0.55) 1px, transparent 1.5px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to right, black, transparent)",
            WebkitMaskImage: "linear-gradient(to right, black, transparent)",
          }}
        />

        <div className="container-x relative pt-24 lg:pt-32 pb-44 lg:pb-56 grid lg:grid-cols-2 gap-10">
          <div className="reveal">
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

          {/* slider controls on right */}
          <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-10">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block rounded-full transition-all ${i === 0 ? "w-2.5 h-2.5 bg-primary" : "w-2 h-2 bg-foreground/25"}`}
              />
            ))}
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
          {/* Left visual composition */}
          <div className="relative reveal order-2 lg:order-1">
            <div
              aria-hidden
              className="absolute -left-10 lg:-left-16 top-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[400px] md:h-[400px] lg:w-[460px] lg:h-[460px] rounded-full border-[36px] border-primary/[0.10] pointer-events-none"
            />
            <div
              aria-hidden
              className="absolute top-4 right-10 lg:right-16 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-primary/20 pointer-events-none"
            />
            <div className="relative z-10 ml-8 lg:ml-12">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80"
                alt="Profissional de tecnologia"
                className="w-full max-w-[480px] h-[360px] md:h-[420px] object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-2 lg:-left-6 z-20 w-44 h-36 lg:w-52 lg:h-40 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80"
                alt="Equipe trabalhando"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 w-3 h-3 bg-primary" />
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
        <div className="container-x relative mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-foreground/10 bg-white">
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
        <div className="container-x grid md:grid-cols-3 gap-6">
          {industries.map((i) => (
            <div key={i.letter} className="group relative bg-white border border-border p-8 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all reveal">
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
        <div className="container-x mt-12 grid md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.t} className="card-soft p-8 text-center reveal">
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
        <div className="container-x mt-12 grid md:grid-cols-3 gap-7">
          {posts.map((p) => (
            <article key={p.t} className="card-soft overflow-hidden reveal">
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
