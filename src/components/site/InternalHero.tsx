import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function InternalHero({ title, crumb }: { title: string; crumb?: string }) {
  return (
    <section className="relative h-[300px] md:h-[340px] overflow-hidden bg-[#1a1226]">
      {/* Background photo — grayscale + slightly opaque */}
      <img
        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&auto=format&fit=crop&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-70"
      />

      {/* Primary color wash over the whole photo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--color-primary) 62%, transparent) 0%, color-mix(in oklab, var(--color-primary) 50%, transparent) 55%, color-mix(in oklab, var(--color-primary) 70%, transparent) 100%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(26,18,38,0.55) 0%, rgba(26,18,38,0.25) 50%, rgba(26,18,38,0.55) 100%)",
        }}
      />

      {/* Right-side angled geometric panel */}
      <div
        aria-hidden
        className="absolute top-0 right-0 h-full w-[42%] md:w-[36%] pointer-events-none"
        style={{
          clipPath: "polygon(28% 0, 100% 0, 100% 100%, 8% 100%)",
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--color-primary) 85%, #000 15%) 0%, color-mix(in oklab, var(--color-primary) 55%, #1a1226 45%) 100%)",
        }}
      />

      {/* Diagonal streak lines on the right panel */}
      <svg
        aria-hidden
        viewBox="0 0 600 400"
        preserveAspectRatio="none"
        className="absolute top-0 right-0 h-full w-[42%] md:w-[36%] pointer-events-none opacity-70"
        style={{ clipPath: "polygon(28% 0, 100% 0, 100% 100%, 8% 100%)" }}
      >
        <g stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" fill="none">
          <path d="M-40 380 L360 -20" />
          <path d="M20 400 L420 0" />
          <path d="M80 420 L480 20" />
          <path d="M140 440 L540 40" />
          <path d="M200 460 L600 60" />
          <path d="M260 480 L660 80" />
          <path d="M320 500 L720 100" />
        </g>
        <g stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" fill="none">
          <path d="M-10 380 L390 -20" />
          <path d="M50 400 L450 0" />
          <path d="M110 420 L510 20" />
          <path d="M170 440 L570 40" />
          <path d="M230 460 L630 60" />
        </g>
      </svg>

      {/* Content */}
      <div className="relative h-full container-x flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl md:text-5xl font-black tracking-[0.02em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
          {title}
        </h1>
        <div className="mt-3 flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/90">
          <Link to="/" className="hover:text-white/70 transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3 opacity-70" />
          <span className="text-white/80">{crumb ?? title}</span>
        </div>
      </div>
    </section>
  );
}
