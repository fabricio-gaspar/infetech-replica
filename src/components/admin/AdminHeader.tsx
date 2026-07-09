import { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function AdminHeader({ title, description, actions, breadcrumbs }: {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: { label: string; to?: string }[];
}) {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const crumbs = breadcrumbs ?? [{ label: "Painel", to: "/admin" }, { label: title }];
  return (
    <div className="mb-6">
      <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3 h-3" />}
            {c.to && i < crumbs.length - 1 ? <Link to={c.to} className="hover:text-foreground">{c.label}</Link> : <span className={i === crumbs.length - 1 ? "text-foreground font-medium" : ""}>{c.label}</span>}
          </span>
        ))}
        <span className="ml-auto text-[10px] font-mono opacity-40">{path}</span>
      </nav>
      <div className="flex flex-wrap items-start gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-black">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}
