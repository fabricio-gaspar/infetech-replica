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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nome = String(data.get("nome") || "");
    const email = String(data.get("email") || "");
    const telefone = String(data.get("telefone") || "");
    const assunto = String(data.get("assunto") || "Contato pelo site");
    const mensagem = String(data.get("mensagem") || "");
    const body = `Nome: ${nome}%0D%0AE-mail: ${email}%0D%0ATelefone: ${telefone}%0D%0A%0D%0AMensagem:%0D%0A${mensagem}`;
    window.location.href = `mailto:contato@wfdigital.com.br?subject=${encodeURIComponent(assunto)}&body=${body}`;
  };

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
                { i: Phone, l: "Ligue a qualquer hora", v: "+55 (11) 9 9744-1875" },
                { i: Mail, l: "Envie um e-mail", v: "contato@wfdigital.com.br" },
                { i: MapPin, l: "Venha nos visitar", v: "Rua Ignes Mendes de Moraes, 10 — Bairro Esplanada Mendes, São Roque - SP" },
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

          <form className="bg-section p-8 md:p-10 reveal" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-5">
              <input name="nome" required placeholder="Seu nome" className="bg-white px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              <input name="email" type="email" required placeholder="E-mail" className="bg-white px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              <input name="telefone" placeholder="Telefone" className="bg-white px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              <input name="assunto" placeholder="Assunto" className="bg-white px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <textarea name="mensagem" required placeholder="Escreva sua mensagem" rows={6} className="w-full mt-5 bg-white px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <button type="submit" className="btn-primary w-full mt-6 !py-4">Enviar mensagem <ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="bg-white pb-12">
        <div className="container-x">
          <div className="relative overflow-hidden h-44 diag-overlay">
            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80" className="absolute inset-0 w-full h-full object-cover grayscale" alt="" />
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 w-[58%] pointer-events-none z-[2]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 44% 100%)",
                background:
                  "linear-gradient(135deg, rgba(151,118,234,0.62) 0%, rgba(91,45,180,0.44) 48%, rgba(53,22,120,0.68) 100%)",
                mixBlendMode: "screen",
                opacity: 0.66,
              }}
            />
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
