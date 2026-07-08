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
    const observed = new WeakSet<Element>();
    const observeAll = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (!observed.has(el)) { observed.add(el); obs.observe(el); }
      });
    };
    observeAll();
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { obs.disconnect(); mo.disconnect(); };
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
