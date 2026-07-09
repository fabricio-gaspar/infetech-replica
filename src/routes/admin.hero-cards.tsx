import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowUp, ArrowDown, Trash2, Plus, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/hero-cards")({ component: HeroCardsAdmin });

type Row = { id: string; number: string; title: string; description: string | null; icon_name: string | null; order_index: number; is_published: boolean };

function HeroCardsAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<Row[]>({
    queryKey: ["admin-hero-cards"],
    queryFn: async () => { const { data, error } = await supabase.from("hero_cards").select("*").order("order_index"); if (error) throw error; return data as Row[]; },
  });
  const [items, setItems] = useState<Row[]>([]); const [dirty, setDirty] = useState(false);
  useEffect(() => { if (data) setItems(data); }, [data]);
  const upd = (id: string, p: Partial<Row>) => { setItems((xs) => xs.map((i) => i.id === id ? { ...i, ...p } : i)); setDirty(true); };
  const move = (idx: number, dir: -1 | 1) => { const j = idx + dir; if (j < 0 || j >= items.length) return; const c = [...items]; [c[idx], c[j]] = [c[j], c[idx]]; setItems(c.map((it, i) => ({ ...it, order_index: i }))); setDirty(true); };
  const add = async () => { const { data: c, error } = await supabase.from("hero_cards").insert({ number: String(items.length + 1).padStart(2, "0"), title: "Novo cartão", description: "", icon_name: "Sparkles", order_index: items.length }).select().single(); if (error) return toast.error(error.message); setItems([...items, c as Row]); };
  const remove = async (id: string) => { if (!confirm("Remover?")) return; const { error } = await supabase.from("hero_cards").delete().eq("id", id); if (error) return toast.error(error.message); setItems(items.filter((i) => i.id !== id)); };
  const save = async () => { const { error } = await supabase.from("hero_cards").upsert(items); if (error) return toast.error(error.message); toast.success("Salvo"); setDirty(false); qc.invalidateQueries({ queryKey: ["admin-hero-cards"] }); qc.invalidateQueries({ queryKey: ["public-hero-cards"] }); };

  return (
    <div className="max-w-4xl">
      <AdminHeader title="Cartões do Hero" description="Os 3 cartões que aparecem sobre o banner principal na home."
        actions={<><Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1"/>Novo</Button><Button onClick={save} disabled={!dirty}><Save className="w-4 h-4 mr-1"/>Salvar</Button></>} />
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : items.length === 0 ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Nenhum cartão.</CardContent></Card> : (
        <div className="space-y-3">
          {items.map((it, i) => (
            <Card key={it.id}>
              <CardHeader className="flex flex-row items-center gap-2 py-3">
                <div className="flex flex-col gap-1"><Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-3 h-3"/></Button><Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ArrowDown className="w-3 h-3"/></Button></div>
                <CardTitle className="text-base flex-1 truncate">{it.number} — {it.title}</CardTitle>
                <label className="flex items-center gap-1 text-xs"><Switch checked={it.is_published} onCheckedChange={(v) => upd(it.id, { is_published: v })}/>Publicado</label>
                <Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-3">
                <div><Label>Número</Label><Input value={it.number} onChange={(e) => upd(it.id, { number: e.target.value })}/></div>
                <div className="md:col-span-2"><Label>Título</Label><Input value={it.title} onChange={(e) => upd(it.id, { title: e.target.value })}/></div>
                <div className="md:col-span-2"><Label>Descrição</Label><Textarea rows={2} value={it.description ?? ""} onChange={(e) => upd(it.id, { description: e.target.value })}/></div>
                <div><Label>Ícone (Lucide)</Label><Input placeholder="Code2, Sparkles, Server…" value={it.icon_name ?? ""} onChange={(e) => upd(it.id, { icon_name: e.target.value })}/></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
