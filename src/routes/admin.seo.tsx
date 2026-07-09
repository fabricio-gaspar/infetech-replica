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
import { Save, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/seo")({ component: SeoAdmin });

type S = { id: string; path: string; title: string | null; description: string | null; keywords: string | null; og_image_url: string | null };

const KNOWN_PATHS = ["/", "/sobre", "/servicos", "/planos", "/blog", "/contato"];

function SeoAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<S[]>({
    queryKey: ["admin-seo"],
    queryFn: async () => { const { data, error } = await supabase.from("page_seo").select("*").order("path"); if (error) throw error; return data as S[]; },
  });
  const [items, setItems] = useState<S[]>([]); const [dirty, setDirty] = useState(false);
  useEffect(() => { if (data) setItems(data); }, [data]);
  const upd = (id: string, p: Partial<S>) => { setItems((xs) => xs.map((i) => i.id === id ? { ...i, ...p } : i)); setDirty(true); };
  const addKnown = async (path: string) => {
    if (items.some((i) => i.path === path)) return;
    const { data: c, error } = await supabase.from("page_seo").insert({ path }).select().single();
    if (error) return toast.error(error.message);
    setItems([...items, c as S]);
  };
  const remove = async (id: string) => { if (!confirm("Remover?")) return; await supabase.from("page_seo").delete().eq("id", id); setItems(items.filter((i) => i.id !== id)); };
  const save = async () => { const { error } = await supabase.from("page_seo").upsert(items); if (error) return toast.error(error.message); toast.success("SEO salvo"); setDirty(false); qc.invalidateQueries({ queryKey: ["admin-seo"] }); qc.invalidateQueries({ queryKey: ["public-seo"] }); };

  return (
    <div className="max-w-4xl">
      <AdminHeader title="SEO por página" description="Meta tags personalizadas por URL."
        actions={<Button onClick={save} disabled={!dirty}><Save className="w-4 h-4 mr-1"/>Salvar</Button>}/>
      <Card className="mb-4"><CardHeader className="py-3"><CardTitle className="text-sm">Adicionar página conhecida</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2 pb-4">
          {KNOWN_PATHS.map((p) => (
            <Button key={p} size="sm" variant="outline" disabled={items.some((i) => i.path === p)} onClick={() => addKnown(p)}><Plus className="w-3 h-3 mr-1"/>{p}</Button>
          ))}
        </CardContent>
      </Card>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : items.length === 0 ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Sem configurações personalizadas.</CardContent></Card> : (
        <div className="space-y-3">
          {items.map((it) => (
            <Card key={it.id}>
              <CardHeader className="flex flex-row items-center justify-between py-3"><CardTitle className="text-base font-mono">{it.path}</CardTitle><Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button></CardHeader>
              <CardContent className="space-y-2">
                <div><Label>Título</Label><Input value={it.title ?? ""} onChange={(e) => upd(it.id, { title: e.target.value })}/></div>
                <div><Label>Descrição</Label><Textarea rows={2} value={it.description ?? ""} onChange={(e) => upd(it.id, { description: e.target.value })}/></div>
                <div><Label>Palavras-chave</Label><Input value={it.keywords ?? ""} onChange={(e) => upd(it.id, { keywords: e.target.value })}/></div>
                <ImageUpload label="Imagem Open Graph" folder="seo" value={it.og_image_url} onChange={(url) => upd(it.id, { og_image_url: url })}/>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
