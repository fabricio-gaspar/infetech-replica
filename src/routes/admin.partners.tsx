import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowUp, ArrowDown, Trash2, Plus, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/partners")({ component: PartnersAdmin });

type P = { id: string; name: string; logo_url: string | null; external_url: string | null; order_index: number; is_published: boolean };

function PartnersAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<P[]>({
    queryKey: ["admin-partners"],
    queryFn: async () => { const { data, error } = await supabase.from("partners").select("*").order("order_index"); if (error) throw error; return data as P[]; },
  });
  const [items, setItems] = useState<P[]>([]); const [dirty, setDirty] = useState(false);
  useEffect(() => { if (data) setItems(data); }, [data]);
  const upd = (id: string, p: Partial<P>) => { setItems((xs) => xs.map((i) => i.id === id ? { ...i, ...p } : i)); setDirty(true); };
  const move = (idx: number, dir: -1 | 1) => { const j = idx + dir; if (j < 0 || j >= items.length) return; const c = [...items]; [c[idx], c[j]] = [c[j], c[idx]]; setItems(c.map((it, i) => ({ ...it, order_index: i }))); setDirty(true); };
  const add = async () => { const { data: c, error } = await supabase.from("partners").insert({ name: "Novo parceiro", order_index: items.length }).select().single(); if (error) return toast.error(error.message); setItems([...items, c as P]); };
  const remove = async (id: string) => { if (!confirm("Remover?")) return; const { error } = await supabase.from("partners").delete().eq("id", id); if (error) return toast.error(error.message); setItems(items.filter((i) => i.id !== id)); };
  const save = async () => { const { error } = await supabase.from("partners").upsert(items); if (error) return toast.error(error.message); toast.success("Salvo"); setDirty(false); qc.invalidateQueries({ queryKey: ["admin-partners"] }); qc.invalidateQueries({ queryKey: ["public-partners"] }); };

  return (
    <div className="max-w-4xl">
      <AdminHeader title="Parceiros / Clientes" description="Logos exibidos no site."
        actions={<><Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1"/>Novo</Button><Button onClick={save} disabled={!dirty}><Save className="w-4 h-4 mr-1"/>Salvar</Button></>}/>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : items.length === 0 ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Sem parceiros.</CardContent></Card> : (
        <Card><CardContent className="pt-6 space-y-3">
          {items.map((it, i) => (
            <div key={it.id} className="flex items-center gap-2 border rounded p-3 bg-white">
              <div className="flex flex-col gap-1"><Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-3 h-3"/></Button><Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ArrowDown className="w-3 h-3"/></Button></div>
              <ImageUpload folder="partners" value={it.logo_url} onChange={(url) => upd(it.id, { logo_url: url })}/>
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div><Label>Nome</Label><Input value={it.name} onChange={(e) => upd(it.id, { name: e.target.value })}/></div>
                  <div><Label>URL externa</Label><Input value={it.external_url ?? ""} onChange={(e) => upd(it.id, { external_url: e.target.value })}/></div>
                </div>
              </div>
              <label className="flex items-center gap-1 text-xs"><Switch checked={it.is_published} onCheckedChange={(v) => upd(it.id, { is_published: v })}/></label>
              <Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
            </div>
          ))}
        </CardContent></Card>
      )}
    </div>
  );
}
