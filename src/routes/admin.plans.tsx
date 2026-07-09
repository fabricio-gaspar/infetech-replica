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

export const Route = createFileRoute("/admin/plans")({ component: PlansAdmin });

type P = {
  id: string; name: string; category: string | null; description: string | null; image_url: string | null;
  price: number | null; currency: string; billing_period: string | null; features: string[]; excluded_features: string[];
  cta_label: string | null; cta_url: string | null; badge: string | null; is_popular: boolean;
  order_index: number; is_published: boolean;
};

function PlansAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<P[]>({
    queryKey: ["admin-plans"],
    queryFn: async () => { const { data, error } = await supabase.from("pricing_plans").select("*").order("order_index"); if (error) throw error; return (data ?? []).map((x: any) => ({ ...x, features: x.features ?? [], excluded_features: x.excluded_features ?? [] })) as P[]; },
  });
  const [items, setItems] = useState<P[]>([]); const [dirty, setDirty] = useState(false);
  useEffect(() => { if (data) setItems(data); }, [data]);
  const upd = (id: string, p: Partial<P>) => { setItems((xs) => xs.map((i) => i.id === id ? { ...i, ...p } : i)); setDirty(true); };
  const move = (idx: number, dir: -1 | 1) => { const j = idx + dir; if (j < 0 || j >= items.length) return; const c = [...items]; [c[idx], c[j]] = [c[j], c[idx]]; setItems(c.map((it, i) => ({ ...it, order_index: i }))); setDirty(true); };
  const add = async () => { const { data: c, error } = await supabase.from("pricing_plans").insert({ name: "Novo plano", order_index: items.length, is_published: false }).select().single(); if (error) return toast.error(error.message); setItems([...items, { ...(c as any), features: [], excluded_features: [] }]); };
  const remove = async (id: string) => { if (!confirm("Remover?")) return; const { error } = await supabase.from("pricing_plans").delete().eq("id", id); if (error) return toast.error(error.message); setItems(items.filter((i) => i.id !== id)); };
  const save = async () => { const { error } = await supabase.from("pricing_plans").upsert(items as any); if (error) return toast.error(error.message); toast.success("Salvo"); setDirty(false); qc.invalidateQueries({ queryKey: ["admin-plans"] }); qc.invalidateQueries({ queryKey: ["public-plans"] }); };

  return (
    <div className="max-w-5xl">
      <AdminHeader title="Planos e Preços" description="Ofertas comerciais."
        actions={<><Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1"/>Novo</Button><Button onClick={save} disabled={!dirty}><Save className="w-4 h-4 mr-1"/>Salvar</Button></>}/>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : items.length === 0 ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Sem planos.</CardContent></Card> : (
        <div className="space-y-3">
          {items.map((it, i) => (
            <Card key={it.id} className={it.is_popular ? "ring-2 ring-primary" : ""}>
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <div className="flex items-center gap-2"><div className="flex flex-col gap-1"><Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-3 h-3"/></Button><Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ArrowDown className="w-3 h-3"/></Button></div><CardTitle className="text-base">{it.name}</CardTitle></div>
                <div className="flex items-center gap-3"><label className="flex items-center gap-1 text-xs"><Switch checked={it.is_popular} onCheckedChange={(v) => upd(it.id, { is_popular: v })}/>Destaque</label><label className="flex items-center gap-1 text-xs"><Switch checked={it.is_published} onCheckedChange={(v) => upd(it.id, { is_published: v })}/>Publicado</label><Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button></div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label>Nome</Label><Input value={it.name} onChange={(e) => upd(it.id, { name: e.target.value })}/></div>
                    <div><Label>Categoria</Label><Input value={it.category ?? ""} onChange={(e) => upd(it.id, { category: e.target.value })}/></div>
                    <div><Label>Preço</Label><Input type="number" step="0.01" value={it.price ?? ""} onChange={(e) => upd(it.id, { price: e.target.value ? Number(e.target.value) : null })}/></div>
                    <div><Label>Período</Label><Input placeholder="mês, ano, único" value={it.billing_period ?? ""} onChange={(e) => upd(it.id, { billing_period: e.target.value })}/></div>
                    <div><Label>Selo</Label><Input placeholder="Mais vendido" value={it.badge ?? ""} onChange={(e) => upd(it.id, { badge: e.target.value })}/></div>
                    <div><Label>Moeda</Label><Input value={it.currency} onChange={(e) => upd(it.id, { currency: e.target.value })}/></div>
                  </div>
                  <div><Label>Descrição</Label><Textarea rows={2} value={it.description ?? ""} onChange={(e) => upd(it.id, { description: e.target.value })}/></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label>Texto do botão</Label><Input value={it.cta_label ?? ""} onChange={(e) => upd(it.id, { cta_label: e.target.value })}/></div>
                    <div><Label>Link do botão</Label><Input value={it.cta_url ?? ""} onChange={(e) => upd(it.id, { cta_url: e.target.value })}/></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <ImageUpload label="Imagem" folder="plans" value={it.image_url} onChange={(url) => upd(it.id, { image_url: url })}/>
                  <Bag label="Recursos inclusos" items={it.features} onChange={(v) => upd(it.id, { features: v })}/>
                  <Bag label="Não inclusos" items={it.excluded_features} onChange={(v) => upd(it.id, { excluded_features: v })}/>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function Bag({ label, items, onChange }: { label: string; items: string[]; onChange: (v: string[]) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="space-y-1">
        {items.map((v, i) => (
          <div key={i} className="flex gap-1">
            <Input value={v} onChange={(e) => onChange(items.map((x, j) => j === i ? e.target.value : x))}/>
            <Button size="icon" variant="ghost" onClick={() => onChange(items.filter((_, j) => j !== i))}><Trash2 className="w-3 h-3 text-destructive"/></Button>
          </div>
        ))}
        <Button size="sm" variant="outline" onClick={() => onChange([...items, ""])}><Plus className="w-3 h-3 mr-1"/>Adicionar</Button>
      </div>
    </div>
  );
}
