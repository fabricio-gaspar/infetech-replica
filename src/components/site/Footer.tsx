import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Linkedin, Phone, Mail, MapPin, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#05070d] text-white/75 mt-32">

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
            <li><Link to="/servicos" className="hover:text-primary transition-colors">Segurança de Dados</Link></li>
            <li><Link to="/servicos" className="hover:text-primary transition-colors">Gestão de TI</Link></li>
            <li><Link to="/servicos" className="hover:text-primary transition-colors">Outsourcing</Link></li>
            <li><Link to="/servicos" className="hover:text-primary transition-colors">Redes</Link></li>
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
