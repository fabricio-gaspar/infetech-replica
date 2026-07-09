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

export const Route = createFileRoute("/admin/hero")({ component: HeroAdmin });

type Banner = {
  id: string; title: string; subtitle: string | null; support_text: string | null;
  image_desktop_url: string | null; image_mobile_url: string | null;
  cta_primary_label: string | null; cta_primary_url: string | null;
  cta_secondary_label: string | null; cta_secondary_url: string | null;
  order_index: number; is_published: boolean;
};

function HeroAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<Banner[]>({
    queryKey: ["admin-hero"],
    queryFn: async () => {
      const { data, error } = await supabase.from("hero_banners").select("*").order("order_index");
      if (error) throw error;
      return data as Banner[];
    },
  });
  const [items, setItems] = useState<Banner[]>([]);
  const [dirty, setDirty] = useState(false);
  useEffect(() => { if (data) setItems(data); }, [data]);

  const upd = (id: string, patch: Partial<Banner>) => { setItems((xs) => xs.map((i) => i.id === id ? { ...i, ...patch } : i)); setDirty(true); };
  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir; if (j < 0 || j >= items.length) return;
    const c = [...items]; [c[idx], c[j]] = [c[j], c[idx]];
    setItems(c.map((it, i) => ({ ...it, order_index: i }))); setDirty(true);
  };
  const add = async () => {
    const { data: created, error } = await supabase.from("hero_banners").insert({
      title: "Novo banner", order_index: items.length, is_published: false,
    }).select().single();
    if (error) return toast.error(error.message);
    setItems([...items, created as Banner]); toast.success("Banner criado");
  };
  const remove = async (id: string) => {
    if (!confirm("Remover banner?")) return;
    const { error } = await supabase.from("hero_banners").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setItems(items.filter((i) => i.id !== id)); toast.success("Removido");
  };
  const save = async () => {
    const { error } = await supabase.from("hero_banners").upsert(items);
    if (error) return toast.error(error.message);
    toast.success("Banners atualizados"); setDirty(false);
    qc.invalidateQueries({ queryKey: ["admin-hero"] });
    qc.invalidateQueries({ queryKey: ["public-hero"] });
  };

  return (
    <div className="max-w-5xl">
      <AdminHeader
        title="Banners (Hero)"
        description="Chamadas principais que aparecem no topo do site."
        actions={<>
          <Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1"/>Novo</Button>
          <Button onClick={save} disabled={!dirty}><Save className="w-4 h-4 mr-1"/>Salvar</Button>
        </>}
      />
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : items.length === 0 ? (
        <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Nenhum banner cadastrado ainda. Clique em "Novo" para começar.</CardContent></Card>
      ) : (
        <div className="space-y-4">
          {items.map((it, i) => (
            <Card key={it.id}>
              <CardHeader className="flex flex-row items-center justify-between gap-2 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-1">
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-3 h-3"/></Button>
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ArrowDown className="w-3 h-3"/></Button>
                  </div>
                  <CardTitle className="text-base">{it.title || "Sem título"}</CardTitle>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs"><Switch checked={it.is_published} onCheckedChange={(v) => upd(it.id, { is_published: v })}/>Publicado</label>
                  <Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div><Label>Título</Label><Input value={it.title} onChange={(e) => upd(it.id, { title: e.target.value })}/></div>
                  <div><Label>Subtítulo</Label><Input value={it.subtitle ?? ""} onChange={(e) => upd(it.id, { subtitle: e.target.value })}/></div>
                  <div><Label>Texto de apoio</Label><Textarea value={it.support_text ?? ""} onChange={(e) => upd(it.id, { support_text: e.target.value })}/></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label>Botão primário</Label><Input placeholder="Texto" value={it.cta_primary_label ?? ""} onChange={(e) => upd(it.id, { cta_primary_label: e.target.value })}/></div>
                    <div><Label>Link primário</Label><Input placeholder="/contato" value={it.cta_primary_url ?? ""} onChange={(e) => upd(it.id, { cta_primary_url: e.target.value })}/></div>
                    <div><Label>Botão secundário</Label><Input placeholder="Texto" value={it.cta_secondary_label ?? ""} onChange={(e) => upd(it.id, { cta_secondary_label: e.target.value })}/></div>
                    <div><Label>Link secundário</Label><Input placeholder="/servicos" value={it.cta_secondary_url ?? ""} onChange={(e) => upd(it.id, { cta_secondary_url: e.target.value })}/></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <ImageUpload label="Imagem desktop" folder="hero" value={it.image_desktop_url} onChange={(url) => upd(it.id, { image_desktop_url: url })}/>
                  <ImageUpload label="Imagem mobile" folder="hero" value={it.image_mobile_url} onChange={(url) => upd(it.id, { image_mobile_url: url })}/>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
