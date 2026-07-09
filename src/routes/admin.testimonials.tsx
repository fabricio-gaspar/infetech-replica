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
import { ArrowUp, ArrowDown, Trash2, Plus, Save, Loader2, Star } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/testimonials")({ component: TestimonialsAdmin });

type T = {
  id: string; author_name: string; author_role: string | null; author_company: string | null;
  avatar_url: string | null; quote: string; rating: number | null;
  order_index: number; is_published: boolean; featured_on_home: boolean;
};

function TestimonialsAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<T[]>({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("order_index");
      if (error) throw error; return data as T[];
    },
  });
  const [items, setItems] = useState<T[]>([]); const [dirty, setDirty] = useState(false);
  useEffect(() => { if (data) setItems(data); }, [data]);
  const upd = (id: string, patch: Partial<T>) => { setItems((xs) => xs.map((i) => i.id === id ? { ...i, ...patch } : i)); setDirty(true); };
  const move = (idx: number, dir: -1 | 1) => { const j = idx + dir; if (j < 0 || j >= items.length) return; const c = [...items]; [c[idx], c[j]] = [c[j], c[idx]]; setItems(c.map((it, i) => ({ ...it, order_index: i }))); setDirty(true); };
  const add = async () => {
    const { data: c, error } = await supabase.from("testimonials").insert({ author_name: "Novo depoimento", quote: "…", order_index: items.length, is_published: false }).select().single();
    if (error) return toast.error(error.message); setItems([...items, c as T]);
  };
  const remove = async (id: string) => { if (!confirm("Remover?")) return; const { error } = await supabase.from("testimonials").delete().eq("id", id); if (error) return toast.error(error.message); setItems(items.filter((i) => i.id !== id)); };
  const save = async () => {
    const { error } = await supabase.from("testimonials").upsert(items);
    if (error) return toast.error(error.message);
    toast.success("Salvos"); setDirty(false); qc.invalidateQueries({ queryKey: ["admin-testimonials"] }); qc.invalidateQueries({ queryKey: ["public-testimonials"] });
  };

  return (
    <div className="max-w-5xl">
      <AdminHeader title="Depoimentos" description="Prova social dos seus clientes."
        actions={<><Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1"/>Novo</Button><Button onClick={save} disabled={!dirty}><Save className="w-4 h-4 mr-1"/>Salvar</Button></>}/>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : items.length === 0 ? (
        <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Sem depoimentos.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {items.map((it, i) => (
            <Card key={it.id}>
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-1">
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-3 h-3"/></Button>
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ArrowDown className="w-3 h-3"/></Button>
                  </div>
                  <CardTitle className="text-base">{it.author_name}</CardTitle>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1 text-xs"><Switch checked={it.featured_on_home} onCheckedChange={(v) => upd(it.id, { featured_on_home: v })}/>Home</label>
                  <label className="flex items-center gap-1 text-xs"><Switch checked={it.is_published} onCheckedChange={(v) => upd(it.id, { is_published: v })}/>Publicado</label>
                  <Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-[auto_1fr] gap-4">
                <ImageUpload folder="testimonials" value={it.avatar_url} onChange={(url) => upd(it.id, { avatar_url: url })}/>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div><Label>Nome</Label><Input value={it.author_name} onChange={(e) => upd(it.id, { author_name: e.target.value })}/></div>
                    <div><Label>Cargo</Label><Input value={it.author_role ?? ""} onChange={(e) => upd(it.id, { author_role: e.target.value })}/></div>
                    <div><Label>Empresa</Label><Input value={it.author_company ?? ""} onChange={(e) => upd(it.id, { author_company: e.target.value })}/></div>
                  </div>
                  <div><Label>Depoimento</Label><Textarea rows={3} value={it.quote} onChange={(e) => upd(it.id, { quote: e.target.value })}/></div>
                  <div>
                    <Label>Nota</Label>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((n) => (
                        <button key={n} type="button" onClick={() => upd(it.id, { rating: n })} className="p-0.5">
                          <Star className={`w-5 h-5 ${(it.rating ?? 0) >= n ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}/>
                        </button>
                      ))}
                      {it.rating && <button type="button" onClick={() => upd(it.id, { rating: null })} className="text-[10px] text-muted-foreground ml-2">limpar</button>}
                    </div>
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
