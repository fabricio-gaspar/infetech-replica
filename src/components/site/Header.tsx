import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, Phone, ChevronDown, Twitter, Facebook, Instagram } from "lucide-react";

const nav = [
  { label: "Início", to: "/" },
  { label: "Sobre", to: "/about" },
  { label: "Serviços", to: "/services", dropdown: true },
  { label: "Blog", to: "/blog" },
  { label: "Contato", to: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* topbar */}
      <div className={`bg-dark text-white/80 text-xs transition-all duration-300 ${scrolled ? "h-0 overflow-hidden opacity-0" : "py-2.5"}`}>
        <div className="container-x flex items-center justify-between gap-4">
          <span className="hidden md:block">Bem-vindo à Infetech — Soluções e Serviços de TI</span>
          <div className="flex items-center gap-5">
            <span className="hidden sm:inline">contato@infetech.com</span>
            <span className="hidden md:inline">Seg - Sáb: 8h às 19h</span>
            <div className="flex items-center gap-3 text-white/70">
              <Twitter className="w-3.5 h-3.5 hover:text-primary cursor-pointer" />
              <Facebook className="w-3.5 h-3.5 hover:text-primary cursor-pointer" />
              <Instagram className="w-3.5 h-3.5 hover:text-primary cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      {/* main bar */}
      <div className={`bg-white border-b transition-all duration-300 ${scrolled ? "shadow-[0_8px_24px_-16px_rgba(20,16,60,0.25)] py-2" : "py-3"}`}>
        <div className="container-x flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 grid place-items-center rounded-sm purple-gradient text-white font-black text-lg">S</div>
            <span className="font-display text-2xl font-black tracking-tight">infetech</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="group relative flex items-center gap-1 text-sm font-semibold text-foreground/85 hover:text-primary transition-colors py-2"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
                {n.dropdown && <ChevronDown className="w-3 h-3 opacity-70" />}
                <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:grid w-9 h-9 place-items-center text-foreground/70 hover:text-primary transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <div className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full purple-gradient grid place-items-center text-white">
                <Phone className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Ligue a qualquer hora</div>
                <div className="text-sm font-bold">+55 (11) 9 8800-6802</div>
              </div>
            </div>
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
              {nav.map((n) => (
                <Link key={n.label} to={n.to} onClick={() => setOpen(false)} className="text-sm font-semibold py-1.5">
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
