import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { InternalHero } from "@/components/site/InternalHero";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contato — WF Digital Soluções de TI" },
    { name: "description", content: "Fale com a WF Digital para consultoria de TI, desenvolvimento de software sob medida, nuvem e serviços gerenciados." },
  ]}),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <InternalHero title="Contato" />

      <section className="section-y bg-white">
        <div className="container-x grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <div className="reveal">
            <div className="eyebrow mb-3">Fale com a gente</div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Sinta-se à vontade<br />para entrar em contato</h2>
            <div className="mt-10 space-y-6">
              {[
                { i: Phone, l: "Ligue a qualquer hora", v: "+55 (11) 9 8800-6802" },
                { i: Mail, l: "Envie um e-mail", v: "contato@WF Digital.com" },
                { i: MapPin, l: "Venha nos visitar", v: "Av. Paulista, 1000 — São Paulo, SP" },
              ].map((c) => (
                <div key={c.l} className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full border-2 border-primary grid place-items-center text-primary"><c.i className="w-5 h-5" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.l}</div>
                    <div className="font-bold">{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="bg-section p-8 md:p-10 reveal" onSubmit={(e)=>e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-5">
              {["Seu nome", "E-mail", "Telefone", "Assunto"].map((p) => (
                <input key={p} placeholder={p} className="bg-white px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              ))}
            </div>
            <textarea placeholder="Escreva sua mensagem" rows={6} className="w-full mt-5 bg-white px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <button className="btn-primary w-full mt-6 !py-4">Enviar mensagem <ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="bg-white pb-12">
        <div className="container-x">
          <div className="relative overflow-hidden h-44 diag-overlay">
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80" className="absolute inset-0 w-full h-full object-cover grayscale" alt="" />
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary/40 to-transparent skew-x-[-12deg] -translate-x-8" />
            <div className="relative h-full flex items-center justify-between gap-6 px-8 text-white">
              <div>
                <div className="text-xs uppercase tracking-widest text-primary">Vamos começar</div>
                <h3 className="text-2xl md:text-3xl font-black mt-1">A parceira ideal em soluções de TI de classe mundial</h3>
              </div>
              <a href="/about" className="btn-primary shrink-0">Saiba mais</a>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section>
        <iframe
          title="mapa"
          className="w-full h-[420px] grayscale"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-46.66%2C-23.57%2C-46.64%2C-23.55&layer=mapnik"
        />
      </section>
    </SiteShell>
  );
}
