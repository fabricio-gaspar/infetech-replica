import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Linkedin, Phone, Mail, MapPin, Headphones, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#05070d] text-white/75 mt-32">
      {/* Top CTA banner — overlaps footer top */}
      <div className="container-x -mt-20 relative z-10">
        <div className="relative">
          {/* Headset badge with subtle glow rings */}
          <div className="absolute -top-8 left-8 z-20">
            <span aria-hidden className="absolute inset-0 -m-3 rounded-full border border-primary/20" />
            <span aria-hidden className="absolute inset-0 -m-1.5 rounded-full border border-primary/30" />
            <div className="relative w-16 h-16 rounded-full bg-[#0a0e1a] grid place-items-center shadow-[0_10px_30px_-8px_rgba(255,105,51,0.55)] ring-1 ring-white/10">
              <Headphones className="w-7 h-7 text-white" strokeWidth={1.8} />
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl px-8 md:px-14 py-10 md:py-14 ring-1 ring-white/10"
            style={{
              background:
                "linear-gradient(90deg, #FF8A5C 0%, #FF6933 55%, #E0541F 100%)",
              boxShadow:
                "0 30px 60px -30px rgba(255,105,51,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            {/* Soft top highlight */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
              }}
            />

            {/* Warm right-side glow */}
            <div
              aria-hidden
              className="absolute -right-24 -top-24 w-[380px] h-[380px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,220,190,0.35) 0%, rgba(255,220,190,0) 65%)",
              }}
            />

            {/* Fine diagonal streaks — subtle */}
            <svg
              aria-hidden
              viewBox="0 0 400 200"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
            >
              <g stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" fill="none">
                <path d="M-40 220 L220 -40" />
                <path d="M20 220 L280 -40" />
                <path d="M80 220 L340 -40" />
                <path d="M140 220 L400 -40" />
              </g>
            </svg>

            {/* Dotted wave pattern */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 1.6px)",
                backgroundSize: "14px 14px",
                maskImage:
                  "radial-gradient(ellipse 90% 120% at 50% 50%, black 30%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 120% at 50% 50%, black 30%, transparent 80%)",
              }}
            />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 pl-0 md:pl-24">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 mb-3 text-[11px] uppercase tracking-[0.28em] text-white/85">
                  <span className="w-6 h-px bg-white/70" />
                  Suporte dedicado
                </div>
                <h3 className="text-white font-black text-2xl md:text-[28px] leading-tight drop-shadow-[0_1px_10px_rgba(0,0,0,0.15)]">
                  Entregando a melhor experiência para o cliente
                </h3>
              </div>
              <a
                href="tel:+551197441875"
                className="group inline-flex items-center justify-center gap-2 bg-white text-[#0a0e1a] font-black text-lg px-8 py-4 rounded shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_50px_-16px_rgba(0,0,0,0.6)] transition-shadow shrink-0"
              >
                <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                +55 (11) 9 9744-1875
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-x pt-24 pb-14 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 grid place-items-center rounded-sm purple-gradient text-white font-black text-lg">S</div>
            <span className="font-display text-2xl font-black text-white">WF Digital</span>
          </Link>
          <p className="text-sm leading-relaxed text-white/60 max-w-xs">
            Aceleramos a inovação com equipes de tecnologia de classe mundial. Conectamos sua empresa a profissionais e soluções sob medida.
          </p>
          <div className="flex items-center gap-2 mt-6">
            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-full bg-white text-[#0a0e1a] hover:bg-primary hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6">Links Úteis</h4>
          <ul className="space-y-3.5 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-primary transition-colors">Termos & Condições</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">Sobre a Empresa</Link></li>
            <li><Link to="/plans" className="hover:text-primary transition-colors">Formas de Pagamento</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">Políticas</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6">Nossos Serviços</h4>
          <ul className="space-y-3.5 text-sm text-white/70">
            <li><Link to="/services" className="hover:text-primary transition-colors">Segurança de Dados</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Gestão de TI</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Outsourcing</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Redes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6">Informações de Contato</h4>
          <ul className="space-y-4 text-sm text-white/75">
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full grid place-items-center bg-white/5 border border-white/10 shrink-0">
                <Phone className="w-3.5 h-3.5 text-primary" />
              </span>
              <span className="mt-1.5">+55 (11) 9 9744-1875</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full grid place-items-center bg-white/5 border border-white/10 shrink-0">
                <Mail className="w-3.5 h-3.5 text-primary" />
              </span>
              <span className="mt-1.5">contato@wfdigital.com</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full grid place-items-center bg-white/5 border border-white/10 shrink-0">
                <MapPin className="w-3.5 h-3.5 text-primary" />
              </span>
              <span className="mt-1.5">Av. Paulista, 1000 — São Paulo, SP</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-x py-5 flex items-center justify-center relative">
          <p className="text-xs text-white/55">
            © Copyrights {new Date().getFullYear()} WF Digital. Todos os direitos reservados.
          </p>
          <button
            onClick={() => typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo"
            className="absolute right-5 md:right-8 w-10 h-10 rounded-full border-2 border-primary text-primary grid place-items-center hover:bg-primary hover:text-white transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
