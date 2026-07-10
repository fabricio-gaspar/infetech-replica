import { Header } from "./Header";
import { Footer } from "./Footer";
import { type ReactNode, useEffect } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    const observe = () => document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => obs.observe(el));
    observe();
    const raf = requestAnimationFrame(observe);
    // Re-scan when new content mounts (async data, route transitions).
    const mo = new MutationObserver(() => observe());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { cancelAnimationFrame(raf); mo.disconnect(); obs.disconnect(); };
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
