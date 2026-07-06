export function PurpleCTA({ text = "Procurando as melhores soluções de TI para o seu negócio?", small = "Estamos aqui para ajudar a sua empresa a crescer.", cta = "Saiba mais" }) {
  return (
    <section className="purple-gradient circuit-panel relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -left-10 top-0 bottom-0 w-32 bg-white/10 skew-x-[-18deg]" />
        <div className="absolute right-1/3 top-0 bottom-0 w-24 bg-white/10 skew-x-[-18deg]" />
      </div>
      <div className="container-x py-12 relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-white">
        <div>
          <div className="text-xs uppercase tracking-widest opacity-85">{small}</div>
          <h3 className="text-2xl md:text-3xl font-black mt-1">{text}</h3>
        </div>
        <a href="/contact" className="btn-light shrink-0">{cta}</a>
      </div>
    </section>
  );
}

export function DarkCTA({ title = "Melhores soluções e serviços de TI", line2 = "ao seu alcance" }) {
  return (
    <section className="relative overflow-hidden diag-overlay circuit-panel h-[360px] grid place-items-center">
      <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover grayscale" alt="" />
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/55 to-transparent skew-x-[-15deg] -translate-x-16 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/4 h-2/3 bg-gradient-to-l from-primary/55 to-transparent skew-x-[-15deg] translate-x-12 pointer-events-none" />
      <div className="relative text-center text-white px-4">
        <h2 className="text-3xl md:text-5xl font-black leading-tight">{title}<br />{line2}</h2>
        <a href="/contact" className="btn-light mt-7">Saiba mais</a>
      </div>
    </section>
  );
}
