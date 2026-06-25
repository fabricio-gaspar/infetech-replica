import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function InternalHero({ title, crumb }: { title: string; crumb?: string }) {
  return (
    <section className="relative h-[340px] md:h-[380px] overflow-hidden diag-overlay">
      <img
        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&auto=format&fit=crop&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover grayscale"
      />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/40 to-transparent skew-x-[-12deg] origin-top-right translate-x-12 pointer-events-none" />
      <div className="relative h-full container-x flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl md:text-5xl font-black tracking-wide uppercase">{title}</h1>
        <div className="mt-3 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/85">
          <Link to="/" className="hover:text-primary">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">{crumb ?? title}</span>
        </div>
      </div>
    </section>
  );
}
