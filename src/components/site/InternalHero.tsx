import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function InternalHero({ title, crumb }: { title: string; crumb?: string }) {
  return (
    <section className="relative h-[300px] md:h-[360px] overflow-hidden bg-[#141019]">
      {/* Background photo — dark grayscale */}
      <img
        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1800&auto=format&fit=crop&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-45"
      />

      {/* Dark wash to deepen the photo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,16,25,0.55) 0%, rgba(20,16,25,0.72) 100%)",
        }}
      />

      {/* Purple diagonal wedge on the right — clean solid triangle like the reference */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-[38%] md:w-[30%] pointer-events-none"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          background:
            "linear-gradient(135deg, #7a4bd6 0%, #5b2eb0 55%, #3a1a86 100%)",
          opacity: 0.92,
        }}
      />

      {/* Fine diagonal strokes in the lower-right corner */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
        className="absolute bottom-0 right-0 h-[70%] w-[26%] md:w-[18%] pointer-events-none"
      >
        <g stroke="rgba(180,150,240,0.55)" strokeWidth="1" fill="none">
          <path d="M20 220 L220 20" />
          <path d="M40 220 L240 20" />
          <path d="M60 220 L260 20" />
          <path d="M80 220 L280 20" />
          <path d="M100 220 L300 20" />
        </g>
      </svg>

      {/* Content */}
      <div className="relative h-full container-x flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-3xl md:text-[46px] font-black tracking-[0.04em] uppercase !text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
          {title}
        </h1>
        <div className="mt-3 flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/85">
          <Link to="/" className="hover:text-white transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3 opacity-70" />
          <span className="text-[#c9b3ff]">{crumb ?? title}</span>
        </div>
      </div>
    </section>
  );
}
