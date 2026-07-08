import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useNavItems, type NavItem } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowUp, ArrowDown, Trash2, Plus, Save } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/admin/menu")({ component: MenuPage });

function MenuPage() {
  const { data } = useNavItems();
  const [items, setItems] = useState<NavItem[]>([]);
  const [dirty, setDirty] = useState(false);
  const qc = useQueryClient();

  useEffect(() => { if (data) setItems(data); }, [data]);

  const upd = (id: string, patch: Partial<NavItem>) => { setItems((xs) => xs.map((i) => i.id === id ? { ...i, ...patch } : i)); setDirty(true); };
  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[idx], copy[j]] = [copy[j], copy[idx]];
    setItems(copy.map((it, i) => ({ ...it, sort_order: i + 1 })));
    setDirty(true);
  };
  const remove = async (id: string) => {
    if (!confirm("Remover este item?")) return;
    const { error } = await supabase.from("nav_items").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Item removido");
    qc.invalidateQueries({ queryKey: ["nav-items"] });
  };
  const add = async () => {
    const { data: created, error } = await supabase.from("nav_items").insert({ label: "Novo item", url: "/", sort_order: items.length + 1 }).select().single();
    if (error) return toast.error(error.message);
    setItems([...items, created]);
    qc.invalidateQueries({ queryKey: ["nav-items"] });
  };
  const save = async () => {
    const payload = items.map((i) => ({ id: i.id, label: i.label, url: i.url, sort_order: i.sort_order, enabled: i.enabled }));
    const { error } = await supabase.from("nav_items").upsert(payload);
    if (error) return toast.error(error.message);
    toast.success("Menu atualizado");
    setDirty(false);
    qc.invalidateQueries({ queryKey: ["nav-items"] });
  };

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <div><h1 className="text-2xl font-black">Menu principal</h1><p className="text-sm text-muted-foreground">Adicione, reordene, ative/desative itens.</p></div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1"/>Novo</Button>
          <Button onClick={save} disabled={!dirty}><Save className="w-4 h-4 mr-1"/>Salvar</Button>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Itens</CardTitle><CardDescription>A ordem definida aqui aparece no site.</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          {items.map((it, i) => (
            <div key={it.id} className="flex items-center gap-2 border rounded p-3 bg-white">
              <div className="flex flex-col gap-1">
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-3 h-3"/></Button>
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ArrowDown className="w-3 h-3"/></Button>
              </div>
              <Input className="flex-1" placeholder="Rótulo" value={it.label} onChange={(e) => upd(it.id, { label: e.target.value })} />
              <Input className="flex-1" placeholder="/rota" value={it.url} onChange={(e) => upd(it.id, { url: e.target.value })} />
              <Switch checked={it.enabled} onCheckedChange={(v) => upd(it.id, { enabled: v })} />
              <Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
            </div>
          ))}
          {items.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">Nenhum item ainda.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
