import { useEffect, useRef, useState } from "react";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setSeen(true); });
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [seen]);
  return { ref, seen };
}

function Counter({ end, suffix = "+" }: { end: number; suffix?: string }) {
  const { ref, seen } = useInView<HTMLSpanElement>();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setV(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, end]);
  return <span ref={ref}>{v}{suffix}</span>;
}

const items = [
  { n: 330, label: "Clientes Ativos" },
  { n: 980, label: "Projetos Concluídos" },
  { n: 20, label: "Anos de História" },
  { n: 112, label: "Equipe Profissional" },
];

export function Counters() {
  return (
    <section className="section-y bg-white">
      <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-6 text-center reveal-stagger">
        {items.map((i) => (
          <div key={i.label} className="card-tech p-8 reveal">
            <div className="text-5xl md:text-6xl font-black text-foreground"><Counter end={i.n} /></div>
            <div className="mt-3 text-xs tracking-[0.18em] uppercase font-bold text-primary">{i.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
