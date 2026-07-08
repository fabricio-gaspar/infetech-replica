import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Star } from "lucide-react";
import type { ComponentType } from "react";

export type ServiceCardProps = {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  href?: string;
  featured?: boolean;
  index?: number;
};

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  featured = false,
  index,
}: ServiceCardProps) {
  const content = (
    <article
      className="group relative flex h-full flex-col rounded-[22px] bg-white p-8 md:p-9 text-left
        border border-black/[0.04]
        shadow-[0_1px_2px_rgba(20,16,60,0.04),0_12px_32px_-18px_rgba(20,16,60,0.18)]
        transition-[transform,box-shadow,border-color] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-1.5
        hover:shadow-[0_2px_4px_rgba(20,16,60,0.06),0_28px_50px_-22px_color-mix(in_oklab,var(--color-primary)_45%,transparent)]
        hover:border-black/[0.06]"
    >
      {featured && (
        <span
          className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full
            bg-primary/[0.08] text-primary px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em]"
          aria-label="Serviço em alta"
        >
          <Star className="w-3 h-3" strokeWidth={2.5} />
          Em alta
        </span>
      )}

      <div
        className="w-12 h-12 rounded-xl grid place-items-center
          bg-[color-mix(in_oklab,var(--color-primary)_10%,transparent)]
          text-primary
          transition-colors duration-[320ms]
          group-hover:bg-primary group-hover:text-primary-foreground"
        aria-hidden="true"
      >
        <Icon className="w-5.5 h-5.5" strokeWidth={1.75} />
      </div>

      {typeof index === "number" && (
        <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
          {String(index).padStart(2, "0")}
        </div>
      )}

      <h3 className="mt-2 text-[18px] md:text-[19px] font-black leading-[1.25] text-foreground transition-colors duration-[280ms] group-hover:text-primary">
        {title}
      </h3>

      <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground">
        {description}
      </p>

      {href && (
        <div className="mt-7 pt-5 border-t border-black/[0.05] flex items-center justify-between">
          <span className="text-[13px] font-semibold text-foreground/80 group-hover:text-primary transition-colors">
            Saber mais
          </span>
          <span
            className="w-9 h-9 rounded-full grid place-items-center border border-black/[0.08]
              text-foreground/70 transition-all duration-[320ms]
              group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground
              group-hover:rotate-[-8deg]"
            aria-hidden="true"
          >
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </span>
        </div>
      )}
    </article>
  );

  if (href) {
    return (
      <Link
        to={href}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[22px]"
        aria-label={title}
      >
        {content}
      </Link>
    );
  }

  return content;
}
