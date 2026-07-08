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
    // Observe on mount and again on next frame to catch late-mounted children.
    const observe = () => document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => obs.observe(el));
    observe();
    const raf = requestAnimationFrame(observe);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
