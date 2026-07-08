import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Menu as MenuIcon, Share2, Users } from "lucide-react";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const cards = [
    { to: "/admin/settings", label: "Identidade & Contato", desc: "Logo, cores, fontes, telefone, WhatsApp, endereço, SEO", icon: Settings },
    { to: "/admin/menu", label: "Menu", desc: "Itens do menu principal, ordem e visibilidade", icon: MenuIcon },
    { to: "/admin/social", label: "Redes Sociais", desc: "Facebook, Instagram, Twitter, LinkedIn e outras", icon: Share2 },
    { to: "/admin/users", label: "Administradores", desc: "Conceda ou remova papel de admin", icon: Users },
  ];
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-black mb-2">Painel Administrativo</h1>
      <p className="text-muted-foreground mb-8">Bem-vindo! Gerencie o conteúdo do site sem tocar no código.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="block">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <div className="w-10 h-10 grid place-items-center rounded bg-primary/10 text-primary"><c.icon className="w-5 h-5"/></div>
                <CardTitle className="text-lg">{c.label}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{c.desc}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
