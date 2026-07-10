import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import { useSiteSettings, useSocialLinks } from "@/hooks/useSiteSettings";
import { useFooterColumns } from "@/hooks/usePublicContent";

const socialIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook, twitter: Twitter, instagram: Instagram, linkedin: Linkedin, youtube: Youtube,
};

export function Footer() {
  const { data: s } = useSiteSettings();
  const { data: social } = useSocialLinks();
  const { data: columns } = useFooterColumns();
  const socials = (social ?? []).filter((sl) => sl.enabled);
  const siteName = s?.site_name ?? "WF Digital";
  const isHelp = (t: string) => /ajuda|help/i.test(t ?? "");
  const cols = columns ?? [];

  return (
    <footer className="relative bg-[color:var(--dark,#05070d)] text-white/75 mt-32">
      <div className="container-x pt-24 pb-14 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-5">
            {s?.logo_url ? <img src={s.logo_url} alt={siteName} className="h-9 w-auto" /> : (
              <>
                <div className="w-9 h-9 grid place-items-center rounded-sm purple-gradient text-white font-black text-lg">{siteName.charAt(0)}</div>
                <span className="font-display text-2xl font-black text-white">{siteName}</span>
              </>
            )}
          </Link>
          <p className="text-sm leading-relaxed text-white/60 max-w-xs">{s?.footer_about}</p>
          <div className="flex items-center gap-2 mt-6">
            {socials.map((sl) => {
              const Icon = socialIcon[sl.platform];
              return Icon ? (
                <a key={sl.id} href={sl.url} target="_blank" rel="noreferrer" className="w-9 h-9 grid place-items-center rounded-full bg-white text-[#0a0e1a] hover:bg-primary hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ) : null;
            })}
          </div>
        </div>

        {cols.length > 0 ? cols.filter((c: any) => !isHelp(c.title)).map((c: any) => (
          <div key={c.id}>
            <h4 className="text-white font-bold text-lg mb-6">{c.title}</h4>
            <ul className="space-y-3.5 text-sm text-white/70">
              {(c.links as { label: string; url: string; external?: boolean }[]).map((l, i) => (
                <li key={i}><a href={l.url} target={l.external ? "_blank" : undefined} rel={l.external ? "noreferrer" : undefined} className="hover:text-primary transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
        )) : (
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Links Úteis</h4>
            <ul className="space-y-3.5 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-primary transition-colors">Sobre</Link></li>
              <li><Link to="/plans" className="hover:text-primary transition-colors">Planos</Link></li>
              <li><Link to="/servicos" className="hover:text-primary transition-colors">Serviços</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>
        )}

        <div>
          <h4 className="text-white font-bold text-lg mb-6">Contato</h4>
          <ul className="space-y-4 text-sm text-white/75">
            {s?.phone && (
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full grid place-items-center bg-white/5 border border-white/10 shrink-0"><Phone className="w-3.5 h-3.5 text-primary" /></span>
                <span className="mt-1.5">{s.phone}</span>
              </li>
            )}
            {s?.email && (
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full grid place-items-center bg-white/5 border border-white/10 shrink-0"><Mail className="w-3.5 h-3.5 text-primary" /></span>
                <span className="mt-1.5">{s.email}</span>
              </li>
            )}
            {s?.address && (
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full grid place-items-center bg-white/5 border border-white/10 shrink-0"><MapPin className="w-3.5 h-3.5 text-primary" /></span>
                <span className="mt-1.5">{s.address}</span>
              </li>
            )}
          </ul>
        </div>

        {cols.filter((c: any) => isHelp(c.title)).map((c: any) => (
          <div key={c.id}>
            <h4 className="text-white font-bold text-lg mb-6">{c.title}</h4>
            <ul className="space-y-3.5 text-sm text-white/70">
              {(c.links as { label: string; url: string; external?: boolean }[]).map((l, i) => (
                <li key={i}><a href={l.url} target={l.external ? "_blank" : undefined} rel={l.external ? "noreferrer" : undefined} className="hover:text-primary transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
        ))}


        {s?.map_embed_url && (
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Localização</h4>
            <iframe src={s.map_embed_url} className="w-full h-40 rounded" loading="lazy" />
          </div>
        )}
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex items-center justify-center relative">
          <p className="text-xs text-white/55">{s?.footer_text || `© ${new Date().getFullYear()} ${siteName}. Todos os direitos reservados.`}</p>
          <button onClick={() => typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo" className="absolute right-5 md:right-8 w-10 h-10 rounded-full border-2 border-primary text-primary grid place-items-center hover:bg-primary hover:text-white transition-colors">
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
