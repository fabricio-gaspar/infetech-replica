export function PurpleCTA({ text = "Procurando as melhores soluções de TI para o seu negócio?", small = "Estamos aqui para ajudar a sua empresa a crescer.", cta = "Saiba mais" }) {
  return (
    <section className="purple-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -left-10 top-0 bottom-0 w-32 bg-white/10 skew-x-[-18deg]" />
        <div className="absolute right-1/3 top-0 bottom-0 w-24 bg-white/10 skew-x-[-18deg]" />
      </div>
      <div className="container-x py-14 relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-white">
        <div>
          <div className="text-xs uppercase tracking-widest opacity-85">{small}</div>
          <h3 className="text-2xl md:text-3xl font-bold mt-1 !text-white">{text}</h3>
        </div>
        <a href="/contact" className="btn-light shrink-0">{cta}</a>
      </div>
    </section>
  );
}

export function DarkCTA({ title = "Melhores soluções e serviços de TI", line2 = "ao seu alcance" }) {
  return (
    <section className="relative overflow-hidden bg-[#121212] py-20 md:py-24">
      {/* Ember radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 70% at 50% 50%, color-mix(in oklab, var(--color-primary) 22%, transparent) 0%, transparent 70%)",
        }}
      />
      {/* Faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />

      <div className="relative container-x text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight !text-white">
          {title} <span className="text-primary">{line2}</span>
        </h2>
        <a
          href="/contact"
          className="inline-flex items-center justify-center mt-8 px-8 py-4 bg-primary hover:bg-[#e85a2c] text-white font-bold rounded-xl transition-colors"
        >
          Saiba mais
        </a>
      </div>
    </section>
  );
}
