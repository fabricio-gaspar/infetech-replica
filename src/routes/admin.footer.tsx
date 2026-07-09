import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowUp, ArrowDown, Trash2, Plus, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/footer")({ component: FooterAdmin });

type Link = { label: string; url: string; external?: boolean };
type Col = { id: string; title: string; links: Link[]; order_index: number; is_published: boolean };

function FooterAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<Col[]>({
    queryKey: ["admin-footer"],
    queryFn: async () => { const { data, error } = await supabase.from("footer_columns").select("*").order("order_index"); if (error) throw error; return (data ?? []).map((c: any) => ({ ...c, links: c.links ?? [] })) as Col[]; },
  });
  const [items, setItems] = useState<Col[]>([]); const [dirty, setDirty] = useState(false);
  useEffect(() => { if (data) setItems(data); }, [data]);
  const upd = (id: string, p: Partial<Col>) => { setItems((xs) => xs.map((i) => i.id === id ? { ...i, ...p } : i)); setDirty(true); };
  const move = (idx: number, dir: -1 | 1) => { const j = idx + dir; if (j < 0 || j >= items.length) return; const c = [...items]; [c[idx], c[j]] = [c[j], c[idx]]; setItems(c.map((it, i) => ({ ...it, order_index: i }))); setDirty(true); };
  const add = async () => { const { data: c, error } = await supabase.from("footer_columns").insert({ title: "Nova coluna", links: [], order_index: items.length }).select().single(); if (error) return toast.error(error.message); setItems([...items, { ...(c as any), links: [] }]); };
  const remove = async (id: string) => { if (!confirm("Remover?")) return; await supabase.from("footer_columns").delete().eq("id", id); setItems(items.filter((i) => i.id !== id)); };
  const save = async () => { const { error } = await supabase.from("footer_columns").upsert(items as any); if (error) return toast.error(error.message); toast.success("Salvo"); setDirty(false); qc.invalidateQueries({ queryKey: ["admin-footer"] }); qc.invalidateQueries({ queryKey: ["public-footer"] }); };

  return (
    <div className="max-w-4xl">
      <AdminHeader title="Rodapé" description="Colunas de links do rodapé."
        actions={<><Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1"/>Nova coluna</Button><Button onClick={save} disabled={!dirty}><Save className="w-4 h-4 mr-1"/>Salvar</Button></>}/>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : items.length === 0 ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Nenhuma coluna. O rodapé usará apenas as configurações globais.</CardContent></Card> : (
        <div className="space-y-3">
          {items.map((it, i) => (
            <Card key={it.id}>
              <CardHeader className="flex flex-row items-center gap-2 py-3">
                <div className="flex flex-col gap-1"><Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-3 h-3"/></Button><Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ArrowDown className="w-3 h-3"/></Button></div>
                <Input className="flex-1" value={it.title} onChange={(e) => upd(it.id, { title: e.target.value })}/>
                <label className="flex items-center gap-1 text-xs"><Switch checked={it.is_published} onCheckedChange={(v) => upd(it.id, { is_published: v })}/></label>
                <Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {it.links.map((l, k) => (
                  <div key={k} className="flex gap-1">
                    <Input placeholder="Texto" value={l.label} onChange={(e) => upd(it.id, { links: it.links.map((x, j) => j === k ? { ...x, label: e.target.value } : x) })}/>
                    <Input placeholder="URL" value={l.url} onChange={(e) => upd(it.id, { links: it.links.map((x, j) => j === k ? { ...x, url: e.target.value } : x) })}/>
                    <label className="flex items-center gap-1 text-xs px-2 whitespace-nowrap"><Switch checked={!!l.external} onCheckedChange={(v) => upd(it.id, { links: it.links.map((x, j) => j === k ? { ...x, external: v } : x) })}/>Nova aba</label>
                    <Button size="icon" variant="ghost" onClick={() => upd(it.id, { links: it.links.filter((_, j) => j !== k) })}><Trash2 className="w-3 h-3 text-destructive"/></Button>
                  </div>
                ))}
                <Button size="sm" variant="outline" onClick={() => upd(it.id, { links: [...it.links, { label: "", url: "" }] })}><Plus className="w-3 h-3 mr-1"/>Adicionar link</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
