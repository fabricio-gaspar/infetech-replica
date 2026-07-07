import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function InternalHero({ title, crumb }: { title: string; crumb?: string }) {
  return (
    <section className="relative h-[260px] md:h-[300px] overflow-hidden bg-[#171321]">
      {/* Background photo — muted, grayscale and slightly opaque like the reference */}
      <img
        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&auto=format&fit=crop&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
      />

      {/* Low-contrast dark wash keeps the image soft and slightly opaque */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(16,15,24,0.72) 0%, rgba(18,16,27,0.55) 48%, rgba(23,19,33,0.76) 100%), linear-gradient(180deg, rgba(16,15,24,0.25) 0%, rgba(16,15,24,0.58) 100%)",
        }}
      />

      {/* Reference-style purple veil: large diagonal triangle, not a heavy side block */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: "polygon(5% 0, 100% 0, 100% 63%)",
          background:
            "linear-gradient(135deg, rgba(139,105,226,0.55) 0%, rgba(93,45,178,0.42) 42%, rgba(61,22,130,0.66) 100%)",
          mixBlendMode: "screen",
          opacity: 0.72,
        }}
      />

      {/* Soft purple depth on the right edge, matching the reference tone */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-[48%] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(77,39,158,0.18) 48%, rgba(50,24,115,0.38) 100%)",
        }}
      />

      {/* Fine lower-right strokes — thin, spaced and subtle like the supplied crop */}
      <svg
        aria-hidden
        viewBox="0 0 320 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 right-0 h-[48%] w-[34%] md:w-[28%] pointer-events-none"
      >
        <g stroke="rgba(120,77,214,0.58)" strokeWidth="3" fill="none" strokeLinecap="square">
          <path d="M66 342 L304 0" />
          <path d="M102 348 L340 6" />
          <path d="M138 354 L376 12" />
          <path d="M174 360 L412 18" />
        </g>
      </svg>

      {/* Content */}
      <div className="relative h-full container-x flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-3xl md:text-[42px] font-black tracking-[0.04em] uppercase">
          {title}
        </h1>
        <div className="mt-3 flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-white/70">
          <Link to="/" className="hover:text-white transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <span className="text-primary/90">{crumb ?? title}</span>
        </div>
      </div>
    </section>
  );
}
