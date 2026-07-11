import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, Twitter, Facebook, Instagram, Linkedin, Youtube, Mail, Clock, Search } from "lucide-react";
import { useSiteSettings, useNavItems, useSocialLinks } from "@/hooks/useSiteSettings";

const socialIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook, twitter: Twitter, instagram: Instagram, linkedin: Linkedin, youtube: Youtube,
};

export function Header() {
  const { data: s } = useSiteSettings();
  const { data: nav } = useNavItems();
  const { data: social } = useSocialLinks();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = (nav ?? []).filter((n) => n.enabled);
  const socials = (social ?? []).filter((n) => n.enabled).slice(0, 5);
  const siteName = s?.site_name ?? "WF Digital";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "translate-y-0" : ""}`}>
      {/* Top thin bar */}
      <div className={`bg-[#141019] text-white/85 text-[12px] transition-all duration-300 overflow-hidden ${scrolled ? "max-h-0 opacity-0 py-0" : "max-h-16 py-2.5"}`}>
        <div className="container-x flex items-center justify-between gap-6">
          <span className="hidden md:block text-white/70">{s?.topbar_text ?? "Bem-vindo à WF Digital — Soluções e Serviços de TI"}</span>
          <div className="flex items-center gap-6">
            {s?.email && (
              <span className="hidden sm:inline-flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary" />
                {s.email}
              </span>
            )}
            {s?.business_hours && (
              <span className="hidden md:inline-flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary" />
                {s.business_hours}
              </span>
            )}
            <div className="flex items-center gap-3 text-white/60">
              {socials.map((sl) => {
                const Icon = socialIcon[sl.platform];
                return Icon ? (
                  <a key={sl.id} href={sl.url} target="_blank" rel="noreferrer" aria-label={sl.platform}>
                    <Icon className="w-3.5 h-3.5 hover:text-primary transition-colors" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav — transparent over hero, solid white on scroll */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white text-foreground shadow-[0_8px_24px_-16px_rgba(20,16,60,0.25)] py-2"
            : "bg-transparent text-white py-4"
        }`}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            {s?.logo_url ? (
              <img src={s.logo_url} alt={siteName} className="h-9 w-auto" />
            ) : (
              <>
                <div className="w-9 h-9 grid place-items-center rounded-sm purple-gradient text-white font-black text-lg">{siteName.charAt(0)}</div>
                <span className={`font-display text-2xl font-black tracking-tight ${scrolled ? "text-foreground" : "text-white"}`}>{siteName}</span>
              </>
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-8 lg:ml-auto lg:mr-8">
            {items.map((n) => (
              <Link
                key={n.id}
                to={n.url}
                className={`group relative flex items-center gap-1 text-[14px] font-semibold transition-colors py-2 ${
                  scrolled ? "text-foreground/85 hover:text-primary" : "text-white/90 hover:text-primary"
                }`}
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: n.url === "/" }}
              >
                {n.label}
                <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              aria-label="Buscar"
              className={`w-10 h-10 rounded-full grid place-items-center transition-colors ${
                scrolled ? "text-foreground hover:bg-foreground/5" : "text-white hover:bg-white/10"
              }`}
            >
              <Search className="w-4 h-4" />
            </button>
            {s?.phone && (
              <div className="hidden xl:flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white grid place-items-center text-primary shadow-[0_6px_18px_-6px_rgba(255,105,51,0.55)]">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <div className={`text-[10px] uppercase tracking-wider ${scrolled ? "text-muted-foreground" : "text-white/60"}`}>
                    Ligue a qualquer hora
                  </div>
                  <div className={`text-sm font-bold ${scrolled ? "text-foreground" : "text-white"}`}>{s.phone}</div>
                </div>
              </div>
            )}
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
              <div className={`w-5 h-0.5 mb-1 ${scrolled ? "bg-foreground" : "bg-white"}`} />
              <div className={`w-5 h-0.5 mb-1 ${scrolled ? "bg-foreground" : "bg-white"}`} />
              <div className={`w-5 h-0.5 ${scrolled ? "bg-foreground" : "bg-white"}`} />
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t bg-white text-foreground">
            <div className="container-x py-4 flex flex-col gap-3">
              {items.map((n) => (
                <Link key={n.id} to={n.url} onClick={() => setOpen(false)} className="text-sm font-semibold py-1.5">
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
