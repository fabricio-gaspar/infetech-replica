import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, ShieldCheck } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin/users")({ component: UsersPage });

type Row = { user_id: string; role: "admin" | "editor"; created_at: string; profiles: { full_name: string | null } | null };

function UsersPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: admins } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("user_id, role, created_at, profiles(full_name)").eq("role", "admin");
      if (error) throw error;
      return (data ?? []) as unknown as Row[];
    },
  });

  const [newUserId, setNewUserId] = useState("");

  const promote = async () => {
    if (!newUserId.trim()) return;
    const { error } = await supabase.from("user_roles").insert({ user_id: newUserId.trim(), role: "admin" });
    if (error) return toast.error(error.message);
    toast.success("Admin promovido");
    setNewUserId("");
    qc.invalidateQueries({ queryKey: ["admin-users"] });
  };

  const revoke = async (uid: string) => {
    if (uid === user?.id) return toast.error("Você não pode remover a si mesmo");
    if (!confirm("Remover este admin?")) return;
    const { error } = await supabase.from("user_roles").delete().eq("user_id", uid).eq("role", "admin");
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-users"] });
  };

  useEffect(() => {}, []);

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-black mb-2">Administradores</h1>
      <p className="text-sm text-muted-foreground mb-6">Gerencie quem pode acessar o painel administrativo.</p>

      <Card className="mb-6">
        <CardHeader><CardTitle>Promover usuário</CardTitle><CardDescription>Cole o UUID de um usuário já cadastrado (você encontra no Supabase &rarr; Authentication &rarr; Users).</CardDescription></CardHeader>
        <CardContent className="flex gap-2">
          <input className="flex-1 h-10 rounded border px-3 text-sm" placeholder="00000000-0000-0000-0000-000000000000" value={newUserId} onChange={(e) => setNewUserId(e.target.value)} />
          <Button onClick={promote}><ShieldCheck className="w-4 h-4 mr-1"/>Promover a admin</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Admins atuais</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {(admins ?? []).map((a) => (
            <div key={a.user_id} className="flex justify-between items-center border rounded p-3">
              <div>
                <div className="font-medium text-sm">{a.profiles?.full_name ?? "(sem nome)"}</div>
                <div className="text-xs text-muted-foreground font-mono">{a.user_id}{a.user_id === user?.id && " (você)"}</div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => revoke(a.user_id)} disabled={a.user_id === user?.id}><Trash2 className="w-4 h-4 text-destructive"/></Button>
            </div>
          ))}
          {(!admins || admins.length === 0) && <p className="text-sm text-muted-foreground py-6 text-center">Nenhum admin encontrado.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
