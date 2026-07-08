import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth, useIsAdmin } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Settings, Menu as MenuIcon, Share2, Users, LogOut, Home, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Admin — WF Digital" }, { name: "robots", content: "noindex" }] }),
});

const menu = [
  { to: "/admin", label: "Painel", icon: Home, exact: true },
  { to: "/admin/settings", label: "Identidade & Contato", icon: Settings },
  { to: "/admin/menu", label: "Menu", icon: MenuIcon },
  { to: "/admin/social", label: "Redes Sociais", icon: Share2 },
  { to: "/admin/users", label: "Administradores", icon: Users },
];

function AdminLayout() {
  const { user, loading } = useAuth();
  const { data: isAdmin, isLoading: roleLoading } = useIsAdmin(user);
  const navigate = useNavigate();
  const path = useRouterState({ select: (r) => r.location.pathname });
  const qc = useQueryClient();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    qc.clear();
    toast.success("Sessão encerrada");
    navigate({ to: "/auth" });
  };

  if (loading || (user && roleLoading)) {
    return <div className="min-h-screen grid place-items-center"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }
  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center p-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold">Sem permissão de administrador</h1>
          <p className="text-muted-foreground text-sm">
            Sua conta ({user.email}) foi criada, mas ainda não tem papel de administrador. Peça a um admin existente para promover sua conta,
            ou — se este é o primeiro acesso — promova você mesmo executando este SQL no Supabase:
          </p>
          <pre className="text-left text-xs bg-muted p-3 rounded overflow-x-auto">{`INSERT INTO public.user_roles (user_id, role)
VALUES ('${user.id}', 'admin');`}</pre>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={signOut}>Sair</Button>
            <Button asChild><a href={`https://supabase.com/dashboard/project/bxwyeosqffbbkwqpyttd/sql/new`} target="_blank" rel="noreferrer">Abrir SQL Editor <ExternalLink className="w-3 h-3 ml-1"/></a></Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-60 shrink-0 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 grid place-items-center rounded bg-primary text-primary-foreground font-black">S</div>
            <span className="font-black tracking-tight">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {menu.map((m) => {
            const active = m.exact ? path === m.to : path.startsWith(m.to);
            return (
              <Link key={m.to} to={m.to} className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "text-slate-700 hover:bg-slate-100"}`}>
                <m.icon className="w-4 h-4" />
                {m.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t space-y-2">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"><ExternalLink className="w-3 h-3"/>Ver site</a>
          <div className="text-xs text-muted-foreground truncate">{user.email}</div>
          <Button variant="outline" size="sm" className="w-full" onClick={signOut}><LogOut className="w-3 h-3 mr-2"/>Sair</Button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
