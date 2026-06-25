import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { InternalHero } from "@/components/site/InternalHero";
import { LogoStrip } from "@/components/site/LogoStrip";
import { Counters } from "@/components/site/Counters";
import { PurpleCTA } from "@/components/site/CTAs";
import { ArrowRight, Play, Lightbulb, Cpu } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Serviços — Infetech Soluções de TI" },
    { name: "description", content: "Conheça o catálogo completo de serviços de TI da Infetech: consultoria, desenvolvimento de software, nuvem e operações gerenciadas." },
  ]}),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteShell>
      <InternalHero title="Serviços" crumb="Serviços" />

      <section className="section-y bg-white">
        <div className="container-x text-center reveal mb-12">
          <div className="eyebrow mb-3">O que oferecemos aos nossos clientes</div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">Atuação em tempo real em todas as<br />soluções e serviços profissionais de TI</h2>
        </div>
        <div className="container-x grid md:grid-cols-2 gap-8">
          {[
            { t: "Fornecemos soluções de TI para clientes em todo o mundo", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80" },
            { t: "Nossos clientes adoram nossa tecnologia e atendimento", img: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=900&q=80" },
          ].map((s) => (
            <div key={s.t} className="relative reveal">
              <img src={s.img} className="w-full h-80 object-cover grayscale" alt="" />
              <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-primary/45 to-transparent skew-x-[-12deg] translate-x-6 pointer-events-none" />
              <div className="absolute -bottom-6 left-6 right-12 bg-white shadow-xl p-5 flex items-center justify-between gap-4">
                <p className="font-bold text-sm">{s.t}</p>
                <button className="w-10 h-10 rounded-full purple-gradient text-white grid place-items-center shrink-0 hover:rotate-12 transition-transform"><ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LogoStrip />

      {/* Mission/Vision */}
      <section className="section-y bg-section relative overflow-hidden">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative reveal">
            <div className="absolute left-0 top-1/4 -rotate-90 origin-left text-xs tracking-[0.5em] text-foreground/30 font-bold">MISSÃO</div>
            <div className="absolute right-0 top-1/4 rotate-90 origin-right text-xs tracking-[0.5em] text-foreground/30 font-bold">VISÃO</div>
            <div className="grid grid-cols-2 gap-4 px-12">
              <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80" className="w-full h-60 object-cover" alt="" />
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80" className="w-full h-44 object-cover mt-16" alt="" />
                <div className="absolute -top-2 -left-2 w-14 h-14 grid place-items-center bg-primary text-white shadow-lg"><Lightbulb className="w-6 h-6" /></div>
              </div>
              <div className="relative col-span-2 mt-2 flex items-end gap-4">
                <div className="w-14 h-14 grid place-items-center bg-primary text-white shadow-lg"><Cpu className="w-6 h-6" /></div>
                <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80" className="flex-1 h-44 object-cover" alt="" />
              </div>
            </div>
          </div>
          <div className="reveal">
            <div className="eyebrow mb-3">Conheça a Infetech</div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Infetech: liderança no<br />mercado de tecnologia</h2>
            <p className="mt-4 text-primary font-semibold">As melhores soluções de TI para suas ideias inovadoras.</p>
            <p className="mt-4 text-muted-foreground">
              A Infetech é especialista em consultoria de TI e desenvolvimento de software, ajudando organizações e empresas a melhorar a performance do negócio.
            </p>
            <blockquote className="mt-6 bg-white border-l-4 border-primary px-5 py-4 text-sm font-semibold shadow-sm">
              Criamos soluções de tecnologia excelentes e sustentáveis, baseadas em profundo domínio da área de TI.
            </blockquote>
            <div className="mt-7 flex items-center gap-5">
              <a href="/contact" className="btn-primary">Saiba mais <ArrowRight className="w-4 h-4" /></a>
              <button className="flex items-center gap-3 group">
                <span className="w-12 h-12 rounded-full purple-gradient grid place-items-center text-white group-hover:scale-110 transition-transform"><Play className="w-4 h-4 fill-current" /></span>
                <span className="text-sm font-semibold">Assista nosso vídeo<br />de poucos minutos</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Counters />
      <PurpleCTA />
    </SiteShell>
  );
}
