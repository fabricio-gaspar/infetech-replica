import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowUp, ArrowDown, Trash2, Plus, Save, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { slugify } from "@/lib/slug";

export const Route = createFileRoute("/admin/services")({ component: ServicesAdmin });

type Service = {
  id: string; name: string; slug: string; short_description: string | null; full_description: string | null;
  icon_name: string | null; image_url: string | null; benefits: string[]; differentials: string[];
  cta_label: string | null; cta_url: string | null; order_index: number;
  is_published: boolean; featured_on_home: boolean; seo_title: string | null; seo_description: string | null;
};

function ServicesAdmin() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const { data, isLoading } = useQuery<Service[]>({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("order_index");
      if (error) throw error;
      return (data ?? []).map((s: any) => ({ ...s, benefits: s.benefits ?? [], differentials: s.differentials ?? [] })) as Service[];
    },
  });
  const [items, setItems] = useState<Service[]>([]);
  const [dirty, setDirty] = useState(false);
  useEffect(() => { if (data) setItems(data); }, [data]);

  const upd = (id: string, patch: Partial<Service>) => { setItems((xs) => xs.map((i) => i.id === id ? { ...i, ...patch } : i)); setDirty(true); };
  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir; if (j < 0 || j >= items.length) return;
    const c = [...items]; [c[idx], c[j]] = [c[j], c[idx]];
    setItems(c.map((it, i) => ({ ...it, order_index: i }))); setDirty(true);
  };
  const add = async () => {
    const name = "Novo serviço"; const slug = slugify(name + "-" + Date.now().toString(36));
    const { data: created, error } = await supabase.from("services").insert({ name, slug, order_index: items.length, is_published: false }).select().single();
    if (error) return toast.error(error.message);
    setItems([...items, { ...(created as any), benefits: [], differentials: [] }]);
    setExpanded(created!.id); toast.success("Serviço criado");
  };
  const remove = async (id: string) => {
    if (!confirm("Remover serviço?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setItems(items.filter((i) => i.id !== id));
  };
  const save = async () => {
    const { error } = await supabase.from("services").upsert(items as any);
    if (error) return toast.error(error.message);
    toast.success("Serviços atualizados"); setDirty(false);
    qc.invalidateQueries({ queryKey: ["admin-services"] });
    qc.invalidateQueries({ queryKey: ["public-services"] });
  };

  const filtered = items.filter((i) => !q || i.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="max-w-5xl">
      <AdminHeader title="Serviços" description="O que a sua empresa oferece."
        actions={<>
          <Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1"/>Novo</Button>
          <Button onClick={save} disabled={!dirty}><Save className="w-4 h-4 mr-1"/>Salvar</Button>
        </>}/>
      <div className="mb-4 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
        <Input className="pl-9" placeholder="Buscar por nome…" value={q} onChange={(e) => setQ(e.target.value)}/>
      </div>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : filtered.length === 0 ? (
        <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Sem serviços. Clique em "Novo".</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((it) => {
            const idx = items.indexOf(it);
            const isOpen = expanded === it.id;
            return (
              <Card key={it.id}>
                <CardHeader className="flex flex-row items-center justify-between gap-2 py-3 cursor-pointer" onClick={() => setExpanded(isOpen ? null : it.id)}>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(idx, -1)} disabled={idx === 0}><ArrowUp className="w-3 h-3"/></Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(idx, 1)} disabled={idx === items.length - 1}><ArrowDown className="w-3 h-3"/></Button>
                    </div>
                    {it.image_url && <img src={it.image_url} className="w-10 h-10 rounded object-cover" alt="" />}
                    <div className="min-w-0">
                      <CardTitle className="text-base truncate">{it.name || "Sem nome"}</CardTitle>
                      <p className="text-xs text-muted-foreground truncate">/{it.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    <label className="flex items-center gap-1 text-xs"><Switch checked={it.featured_on_home} onCheckedChange={(v) => upd(it.id, { featured_on_home: v })}/>Home</label>
                    <label className="flex items-center gap-1 text-xs"><Switch checked={it.is_published} onCheckedChange={(v) => upd(it.id, { is_published: v })}/>Publicado</label>
                    <Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
                  </div>
                </CardHeader>
                {isOpen && (
                  <CardContent className="grid md:grid-cols-2 gap-4 border-t pt-4">
                    <div className="space-y-3">
                      <div><Label>Nome</Label><Input value={it.name} onChange={(e) => upd(it.id, { name: e.target.value })}/></div>
                      <div><Label>Slug</Label><Input value={it.slug} onChange={(e) => upd(it.id, { slug: slugify(e.target.value) })}/></div>
                      <div><Label>Ícone (nome Lucide)</Label><Input placeholder="ex: Rocket" value={it.icon_name ?? ""} onChange={(e) => upd(it.id, { icon_name: e.target.value })}/></div>
                      <div><Label>Descrição curta</Label><Textarea value={it.short_description ?? ""} onChange={(e) => upd(it.id, { short_description: e.target.value })}/></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div><Label>Texto do botão</Label><Input value={it.cta_label ?? ""} onChange={(e) => upd(it.id, { cta_label: e.target.value })}/></div>
                        <div><Label>Link do botão</Label><Input value={it.cta_url ?? ""} onChange={(e) => upd(it.id, { cta_url: e.target.value })}/></div>
                      </div>
                      <div><Label>SEO Title</Label><Input value={it.seo_title ?? ""} onChange={(e) => upd(it.id, { seo_title: e.target.value })}/></div>
                      <div><Label>SEO Description</Label><Textarea rows={2} value={it.seo_description ?? ""} onChange={(e) => upd(it.id, { seo_description: e.target.value })}/></div>
                    </div>
                    <div className="space-y-3">
                      <ImageUpload label="Imagem" folder="services" value={it.image_url} onChange={(url) => upd(it.id, { image_url: url })}/>
                      <div>
                        <Label>Descrição completa</Label>
                        <RichTextEditor value={it.full_description ?? ""} onChange={(v) => upd(it.id, { full_description: v })}/>
                      </div>
                      <ListEditor label="Benefícios" items={it.benefits} onChange={(v) => upd(it.id, { benefits: v })}/>
                      <ListEditor label="Diferenciais" items={it.differentials} onChange={(v) => upd(it.id, { differentials: v })}/>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ListEditor({ label, items, onChange }: { label: string; items: string[]; onChange: (v: string[]) => void }) {
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
