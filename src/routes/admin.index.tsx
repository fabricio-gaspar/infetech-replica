import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Mail, MessageSquare, Briefcase, Star, FileText, Image as ImageIcon, DollarSign, HelpCircle, User, Layers, Sparkles, Building2 } from "lucide-react";

export const Route = createFileRoute("/admin/")({ component: DashboardIndex });

function useCounts() {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const tables = ["hero_banners","services","testimonials","faqs","team_members","pricing_plans","partners","gallery_items","blog_posts","contact_messages","quotes","media_library"] as const;
      const results = await Promise.all(tables.map(async (t) => {
        const { count } = await supabase.from(t).select("*", { count: "exact", head: true });
        return [t, count ?? 0] as const;
      }));
      const newMsg = await supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "new");
      const newQuotes = await supabase.from("quotes").select("*", { count: "exact", head: true }).eq("status", "new");
      const map: Record<string, number> = {};
      results.forEach(([k, v]) => { map[k] = v; });
      map["_new_messages"] = newMsg.count ?? 0;
      map["_new_quotes"] = newQuotes.count ?? 0;
      return map;
    },
    staleTime: 30_000,
  });
}

function useRecentMessages() {
  return useQuery({
    queryKey: ["admin-dashboard-messages"],
    queryFn: async () => { const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5); return data ?? []; },
    staleTime: 30_000,
  });
}

function DashboardIndex() {
  const { data: c } = useCounts();
  const { data: recent } = useRecentMessages();

  const stats = [
    { label: "Novas mensagens", value: c?._new_messages ?? 0, icon: Mail, to: "/admin/messages", accent: c?._new_messages ? "bg-blue-50 text-blue-700" : "" },
    { label: "Orçamentos novos", value: c?._new_quotes ?? 0, icon: MessageSquare, to: "/admin/quotes", accent: c?._new_quotes ? "bg-amber-50 text-amber-700" : "" },
    { label: "Banners (Hero)", value: c?.hero_banners ?? 0, icon: Sparkles, to: "/admin/hero" },
    { label: "Serviços", value: c?.services ?? 0, icon: Briefcase, to: "/admin/services" },
    { label: "Planos", value: c?.pricing_plans ?? 0, icon: DollarSign, to: "/admin/plans" },
    { label: "Depoimentos", value: c?.testimonials ?? 0, icon: Star, to: "/admin/testimonials" },
    { label: "FAQs", value: c?.faqs ?? 0, icon: HelpCircle, to: "/admin/faqs" },
    { label: "Equipe", value: c?.team_members ?? 0, icon: User, to: "/admin/team" },
    { label: "Parceiros", value: c?.partners ?? 0, icon: Building2, to: "/admin/partners" },
    { label: "Galeria", value: c?.gallery_items ?? 0, icon: ImageIcon, to: "/admin/gallery" },
    { label: "Blog posts", value: c?.blog_posts ?? 0, icon: FileText, to: "/admin/blog" },
    { label: "Mídia", value: c?.media_library ?? 0, icon: Layers, to: "/admin/media" },
  ];

  const shortcuts = [
    { label: "Editar Home (Hero)", to: "/admin/hero" },
    { label: "Editar serviços", to: "/admin/services" },
    { label: "Editar planos", to: "/admin/plans" },
    { label: "Ver mensagens novas", to: "/admin/messages" },
    { label: "Configurações do site", to: "/admin/settings" },
    { label: "Publicar post do blog", to: "/admin/blog" },
  ];

  return (
    <div className="max-w-6xl">
      <AdminHeader title="Painel" description="Visão geral do sistema"/>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className={`p-4 rounded border bg-white hover:border-primary transition ${s.accent ?? ""}`}>
            <div className="flex items-center justify-between mb-2">
              <s.icon className="w-4 h-4 opacity-60"/>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <div className="text-2xl font-black">{s.value}</div>
          </Link>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="py-3"><CardTitle className="text-base">Atalhos rápidos</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {shortcuts.map((s) => (
              <Link key={s.to} to={s.to} className="block p-2 rounded hover:bg-slate-50 text-sm">→ {s.label}</Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3"><CardTitle className="text-base">Últimas mensagens</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {!recent?.length ? <p className="text-sm text-muted-foreground py-4 text-center">Nenhuma mensagem ainda.</p> : recent.map((m) => (
              <Link key={m.id} to="/admin/messages" className="flex items-center gap-3 p-2 rounded hover:bg-slate-50">
                <div className="w-8 h-8 rounded-full bg-primary/10 grid place-items-center text-primary font-bold text-xs">{m.name?.[0]?.toUpperCase() ?? "?"}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{m.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{m.email}</div>
                </div>
                <div className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleDateString()}</div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
