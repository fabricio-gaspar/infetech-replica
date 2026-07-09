import { usePageSeoInject } from "@/hooks/usePageSeoInject";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { InternalHero } from "@/components/site/InternalHero";
import { Counters } from "@/components/site/Counters";
import { DarkCTA } from "@/components/site/CTAs";
import { Check, Star, Share2, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { usePublicTeam, usePublicTestimonials } from "@/hooks/usePublicContent";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "Sobre — WF Digital Soluções de TI" },
    { name: "description", content: "Conheça como a WF Digital atua junto a organizações para entregar soluções, software e consultoria de TI de classe mundial." },
  ]}),
  component: AboutPage,
});

function AboutPage() {
  usePageSeoInject("/about");
  const { data: settings } = useSiteSettings();
  const { data: team } = usePublicTeam();
  const { data: testimonials } = usePublicTestimonials();
  const s: any = settings || {};
  const checklist: string[] = Array.isArray(s.about_checklist) ? s.about_checklist : [];
  const featured = (testimonials ?? [])[0];

  return (
    <SiteShell>
      <InternalHero title="Sobre" />

      <section className="section-y bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative reveal">
            {s.about_image_url && (
              <img loading="lazy" decoding="async" src={s.about_image_url} className="w-full h-[460px] object-cover" alt="" />
            )}
            <div className="absolute -left-4 -top-4 w-24 h-full border-l-4 border-primary" />
          </div>
          <div className="reveal">
            <div className="eyebrow mb-4">{s.about_eyebrow || "Sobre a nossa empresa"}</div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">{s.about_title || "Somos parceiros das suas inovações"}</h2>
            <p className="mt-5 text-muted-foreground">{s.about_description}</p>
            {checklist.length > 0 && (
              <div className="mt-7 grid sm:grid-cols-2 gap-3">
                {checklist.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm font-semibold">
                    <span className="w-5 h-5 rounded-full bg-accent text-primary grid place-items-center"><Check className="w-3 h-3" /></span>
                    {b}
                  </div>
                ))}
              </div>
            )}
            {s.about_cta_label && (
              <Link to={s.about_cta_url || "/contact"} className="btn-primary mt-8">
                {s.about_cta_label} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <Counters />

      {featured && (
        <section className="section-y bg-section">
          <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
            <div className="reveal">
              <div className="eyebrow mb-3">Depoimentos de Clientes</div>
              <h2 className="text-4xl font-black leading-tight">Veja o que estão<br />falando sobre nós</h2>
              <div className="mt-8 flex items-center gap-4">
                {featured.avatar_url && (
                  <img loading="lazy" decoding="async" src={featured.avatar_url} className="w-16 h-16 rounded-full object-cover border-4 border-primary/30" alt={featured.author_name} />
                )}
                <div>
                  <div className="font-bold">{featured.author_name}</div>
                  <div className="text-xs text-muted-foreground">{featured.author_role}</div>
                  <div className="flex gap-0.5 mt-1 text-primary">
                    {Array.from({ length: featured.rating || 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">{featured.quote}</p>
            </div>
          </div>
        </section>
      )}

      <DarkCTA />

      {(team ?? []).length > 0 && (
        <section className="section-y bg-white">
          <div className="container-x grid lg:grid-cols-2 gap-10 mb-12">
            <div className="reveal">
              <div className="eyebrow mb-3">Nossos especialistas</div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">Conheça os profissionais<br />da nossa equipe</h2>
            </div>
            <p className="text-muted-foreground self-end reveal">
              Conheça membros talentosos, experientes e capacitados que aproximam pessoas e empresas com seus portfólios.
            </p>
          </div>
          <div className="container-x grid md:grid-cols-3 gap-7">
            {(team ?? []).map((t: any) => {
              const socials = (t.socials || {}) as Record<string, string>;
              return (
                <div key={t.id} className="group reveal">
                  <div className="relative overflow-hidden">
                    {t.photo_url && (
                      <img loading="lazy" decoding="async" src={t.photo_url} className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105" alt={t.name} />
                    )}
                  </div>
                  <div className="flex items-start justify-between mt-4 px-1">
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                    <div className="relative">
                      <button type="button" aria-label="Redes sociais"
                        className="peer w-9 h-9 grid place-items-center purple-gradient text-white rounded-sm transition-transform hover:rotate-12">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <div className="pointer-events-none absolute right-0 bottom-full mb-2 flex flex-col gap-1.5 opacity-0 translate-y-1 transition-all duration-300 peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:pointer-events-auto hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto">
                        {[
                          { Icon: Facebook, label: "Facebook", href: socials.facebook },
                          { Icon: Twitter, label: "Twitter", href: socials.twitter },
                          { Icon: Instagram, label: "Instagram", href: socials.instagram },
                          { Icon: Linkedin, label: "LinkedIn", href: socials.linkedin },
                        ].filter((x) => x.href).map(({ Icon, label, href }) => (
                          <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                            className="w-9 h-9 grid place-items-center bg-white text-primary border border-primary/25 rounded-sm hover:bg-primary hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </SiteShell>
  );
}
