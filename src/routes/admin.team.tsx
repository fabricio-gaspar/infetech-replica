import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowUp, ArrowDown, Trash2, Plus, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/team")({ component: TeamAdmin });

type M = { id: string; name: string; role: string | null; bio: string | null; photo_url: string | null; social_links: Record<string, string>; order_index: number; is_published: boolean };

function TeamAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<M[]>({
    queryKey: ["admin-team"],
    queryFn: async () => { const { data, error } = await supabase.from("team_members").select("*").order("order_index"); if (error) throw error; return (data ?? []).map((x: any) => ({ ...x, social_links: x.social_links ?? {} })) as M[]; },
  });
  const [items, setItems] = useState<M[]>([]); const [dirty, setDirty] = useState(false);
  useEffect(() => { if (data) setItems(data); }, [data]);
  const upd = (id: string, p: Partial<M>) => { setItems((xs) => xs.map((i) => i.id === id ? { ...i, ...p } : i)); setDirty(true); };
  const move = (idx: number, dir: -1 | 1) => { const j = idx + dir; if (j < 0 || j >= items.length) return; const c = [...items]; [c[idx], c[j]] = [c[j], c[idx]]; setItems(c.map((it, i) => ({ ...it, order_index: i }))); setDirty(true); };
  const add = async () => { const { data: c, error } = await supabase.from("team_members").insert({ name: "Novo membro", order_index: items.length }).select().single(); if (error) return toast.error(error.message); setItems([...items, { ...(c as any), social_links: {} }]); };
  const remove = async (id: string) => { if (!confirm("Remover?")) return; const { error } = await supabase.from("team_members").delete().eq("id", id); if (error) return toast.error(error.message); setItems(items.filter((i) => i.id !== id)); };
  const save = async () => { const { error } = await supabase.from("team_members").upsert(items as any); if (error) return toast.error(error.message); toast.success("Salvo"); setDirty(false); qc.invalidateQueries({ queryKey: ["admin-team"] }); qc.invalidateQueries({ queryKey: ["public-team"] }); };

  return (
    <div className="max-w-5xl">
      <AdminHeader title="Equipe" description="Membros que aparecem na página Sobre."
        actions={<><Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1"/>Novo</Button><Button onClick={save} disabled={!dirty}><Save className="w-4 h-4 mr-1"/>Salvar</Button></>}/>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : items.length === 0 ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Sem membros.</CardContent></Card> : (
        <div className="space-y-3">
          {items.map((it, i) => (
            <Card key={it.id}>
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <div className="flex items-center gap-2"><div className="flex flex-col gap-1"><Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-3 h-3"/></Button><Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ArrowDown className="w-3 h-3"/></Button></div><CardTitle className="text-base">{it.name}</CardTitle></div>
                <div className="flex items-center gap-3"><label className="flex items-center gap-1 text-xs"><Switch checked={it.is_published} onCheckedChange={(v) => upd(it.id, { is_published: v })}/>Publicado</label><Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button></div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-[auto_1fr] gap-4">
                <ImageUpload folder="team" value={it.photo_url} onChange={(url) => upd(it.id, { photo_url: url })}/>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label>Nome</Label><Input value={it.name} onChange={(e) => upd(it.id, { name: e.target.value })}/></div>
                    <div><Label>Cargo</Label><Input value={it.role ?? ""} onChange={(e) => upd(it.id, { role: e.target.value })}/></div>
                  </div>
                  <div><Label>Bio</Label><Textarea rows={2} value={it.bio ?? ""} onChange={(e) => upd(it.id, { bio: e.target.value })}/></div>
                  <div className="grid grid-cols-2 gap-2">
                    {(["linkedin","instagram","twitter","email"] as const).map((k) => (
                      <div key={k}><Label className="capitalize">{k}</Label><Input value={it.social_links[k] ?? ""} onChange={(e) => upd(it.id, { social_links: { ...it.social_links, [k]: e.target.value } })}/></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
