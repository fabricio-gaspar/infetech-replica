import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, Twitter, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
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
    <header className="sticky top-0 z-50">
      <div className={`bg-dark text-white/80 text-xs transition-all duration-300 ${scrolled ? "h-0 overflow-hidden opacity-0" : "py-2.5"}`}>
        <div className="container-x flex items-center justify-between gap-4">
          <span className="hidden md:block">{s?.topbar_text ?? ""}</span>
          <div className="flex items-center gap-5">
            {s?.email && <span className="hidden sm:inline">{s.email}</span>}
            {s?.business_hours && <span className="hidden md:inline">{s.business_hours}</span>}
            <div className="flex items-center gap-3 text-white/70">
              {socials.map((sl) => {
                const Icon = socialIcon[sl.platform];
                return Icon ? <a key={sl.id} href={sl.url} target="_blank" rel="noreferrer"><Icon className="w-3.5 h-3.5 hover:text-primary" /></a> : null;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={`bg-white border-b transition-all duration-300 ${scrolled ? "shadow-[0_8px_24px_-16px_rgba(20,16,60,0.25)] py-2" : "py-3"}`}>
        <div className="container-x flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            {s?.logo_url ? (
              <img src={s.logo_url} alt={siteName} className="h-9 w-auto" />
            ) : (
              <>
                <div className="w-9 h-9 grid place-items-center rounded-sm purple-gradient text-white font-black text-lg">{siteName.charAt(0)}</div>
                <span className="font-display text-2xl font-black tracking-tight">{siteName}</span>
              </>
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-7 lg:ml-auto lg:mr-8">
            {items.map((n) => (
              <Link key={n.id} to={n.url} className="group relative flex items-center gap-1 text-sm font-semibold text-foreground/85 hover:text-primary transition-colors py-2"
                activeProps={{ className: "text-primary" }} activeOptions={{ exact: n.url === "/" }}>
                {n.label}
                <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {s?.phone && (
              <div className="hidden xl:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full purple-gradient grid place-items-center text-white"><Phone className="w-4 h-4" /></div>
                <div className="leading-tight">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Ligue a qualquer hora</div>
                  <div className="text-sm font-bold">{s.phone}</div>
                </div>
              </div>
            )}
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2">
              <div className="w-5 h-0.5 bg-foreground mb-1" />
              <div className="w-5 h-0.5 bg-foreground mb-1" />
              <div className="w-5 h-0.5 bg-foreground" />
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t bg-white">
            <div className="container-x py-4 flex flex-col gap-3">
              {items.map((n) => (
                <Link key={n.id} to={n.url} onClick={() => setOpen(false)} className="text-sm font-semibold py-1.5">{n.label}</Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
