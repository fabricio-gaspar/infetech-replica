import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function InternalHero({ title, crumb }: { title: string; crumb?: string }) {
  return (
    <section className="relative overflow-hidden bg-[#121212] py-20 md:py-28">
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, color-mix(in oklab, var(--color-primary) 18%, transparent) 0%, transparent 70%)",
        }}
      />
      {/* Faint grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />

      <div className="relative container-x text-center">
        <nav className="flex justify-center items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link to="/" className="hover:text-zinc-300 transition-colors">
            Início
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">{crumb ?? title}</span>
        </nav>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight !text-white">
          {title}
        </h1>
      </div>
    </section>
  );
}
