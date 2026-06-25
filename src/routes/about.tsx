import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { InternalHero } from "@/components/site/InternalHero";
import { LogoStrip } from "@/components/site/LogoStrip";
import { Counters } from "@/components/site/Counters";
import { DarkCTA, PurpleCTA } from "@/components/site/CTAs";
import { Check, Star, Share2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "Sobre — Infetech Soluções de TI" },
    { name: "description", content: "Conheça como a Infetech atua junto a organizações para entregar soluções, software e consultoria de TI de classe mundial." },
  ]}),
  component: AboutPage,
});

const team = [
  { name: "Christine Eve", role: "Desenvolvedora", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" },
  { name: "Mike Hardson", role: "Desenvolvedor", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
  { name: "Jessica Brown", role: "Desenvolvedora", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80" },
];

function AboutPage() {
  return (
    <SiteShell>
      <InternalHero title="Sobre" />

      <section className="section-y bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative reveal">
            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80" className="w-full h-[460px] object-cover" alt="" />
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-36 h-36">
              <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_18s_linear_infinite]">
                <defs>
                  <path id="badgeCircle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
                </defs>
                <circle cx="100" cy="100" r="96" fill="white" />
                <text fill="oklch(0.18 0.03 270)" fontSize="17" fontWeight="700" letterSpacing="3">
                  <textPath href="#badgeCircle" startOffset="0">SOLUÇÕES DE TI • SERVIÇOS DE DESENVOLVIMENTO • </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 m-auto w-16 h-16 rounded-full purple-gradient grid place-items-center text-white font-black text-xl shadow-lg">S</div>
            </div>
            <div className="absolute -left-4 -top-4 w-24 h-full border-l-4 border-primary" />
          </div>
          <div className="reveal">
            <div className="eyebrow mb-4">Sobre a nossa empresa</div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Somos parceiros<br />das suas inovações</h2>
            <p className="mt-5 text-muted-foreground">
              A Infetech é especialista em consultoria de TI e desenvolvimento de software. Apoiamos organizações e empresas a melhorar a performance do negócio, atuando junto às suas equipes do descobrimento ao lançamento.
            </p>
            <div className="mt-7 grid sm:grid-cols-2 gap-3">
              {["Suporte de alta qualidade", "Atendimento excelente", "Garantia de satisfação", "Profissionais confiáveis"].map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm font-semibold">
                  <span className="w-5 h-5 rounded-full bg-accent text-primary grid place-items-center"><Check className="w-3 h-3" /></span>
                  {b}
                </div>
              ))}
            </div>
            <a href="/contact" className="btn-primary mt-8">Saiba mais <ArrowRight className="w-4 h-4" /></a>
          </div>
        </div>
      </section>

      <Counters />

      {/* TESTIMONIAL */}
      <section className="section-y bg-section">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <div className="reveal">
            <div className="eyebrow mb-3">Depoimentos de Clientes</div>
            <h2 className="text-4xl font-black leading-tight">Veja o que estão<br />falando sobre nós</h2>
            <div className="mt-8 flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" className="w-16 h-16 rounded-full object-cover border-4 border-primary/30" alt="" />
              <div>
                <div className="font-bold">Mike Hardson</div>
                <div className="text-xs text-muted-foreground">Designer Sênior</div>
                <div className="flex gap-0.5 mt-1 text-primary">{Array.from({length:5}).map((_,i)=><Star key={i} className="w-3.5 h-3.5 fill-current"/>)}</div>
              </div>
            </div>
            <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
              A Infetech é uma empresa profissional de TI que sempre entrega software de qualidade aos seus clientes. Se você procura uma equipe de desenvolvedores talentosos para encontrar as melhores soluções de TI, a Infetech é uma empresa que o seu time deve considerar.
            </p>
            <div className="flex gap-2 mt-6">
              <span className="w-10 h-1 bg-primary rounded" />
              <span className="w-6 h-1 bg-foreground/15 rounded" />
              <span className="w-6 h-1 bg-foreground/15 rounded" />
            </div>
          </div>
          <div className="relative h-[480px] reveal">
            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80" className="absolute right-10 top-12 w-56 h-56 rounded-full object-cover border-4 border-white shadow-2xl" alt="" />
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80" className="absolute left-4 top-0 w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl" alt="" />
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80" className="absolute right-0 top-2 w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl" alt="" />
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80" className="absolute left-0 bottom-8 w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl" alt="" />
            <div className="absolute right-8 bottom-4 w-3 h-3 bg-primary rotate-45" />
            <div className="absolute left-32 top-32 w-2 h-2 bg-primary/50 rotate-45" />
            <div className="absolute right-32 top-4 w-2 h-2 bg-primary/50 rotate-45" />
          </div>
        </div>
      </section>

      <DarkCTA />
      <LogoStrip />

      {/* TEAM */}
      <section className="section-y bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-10 mb-12">
          <div className="reveal">
            <div className="eyebrow mb-3">Nossos especialistas</div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Conheça os profissionais<br />da nossa equipe</h2>
          </div>
          <p className="text-muted-foreground self-end reveal">
            Conheça membros talentosos, experientes e capacitados que aproximam pessoas e empresas com seus portfólios. Eles encaram cada projeto com seriedade e cuidado.
          </p>
        </div>
        <div className="container-x grid md:grid-cols-3 gap-7">
          {team.map((t) => (
            <div key={t.name} className="group reveal">
              <div className="relative overflow-hidden">
                <img src={t.img} className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105" alt={t.name} />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-px h-6 bg-primary" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
              </div>
              <div className="flex items-start justify-between mt-4 px-1">
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <button className="w-9 h-9 grid place-items-center purple-gradient text-white rounded-sm hover:rotate-12 transition-transform"><Share2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PurpleCTA />
    </SiteShell>
  );
}
