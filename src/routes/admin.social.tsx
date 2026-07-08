import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSocialLinks, type SocialLink } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowUp, ArrowDown, Trash2, Plus, Save } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/admin/social")({ component: SocialPage });

const PLATFORMS = ["facebook", "twitter", "instagram", "linkedin", "youtube", "tiktok", "pinterest", "whatsapp", "telegram"];

function SocialPage() {
  const { data } = useSocialLinks();
  const [items, setItems] = useState<SocialLink[]>([]);
  const [dirty, setDirty] = useState(false);
  const qc = useQueryClient();

  useEffect(() => { if (data) setItems(data); }, [data]);

  const upd = (id: string, patch: Partial<SocialLink>) => { setItems((xs) => xs.map((i) => i.id === id ? { ...i, ...patch } : i)); setDirty(true); };
  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[idx], copy[j]] = [copy[j], copy[idx]];
    setItems(copy.map((it, i) => ({ ...it, sort_order: i + 1 })));
    setDirty(true);
  };
  const remove = async (id: string) => {
    if (!confirm("Remover?")) return;
    const { error } = await supabase.from("social_links").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["social-links"] });
  };
  const add = async () => {
    const { data: created, error } = await supabase.from("social_links").insert({ platform: "facebook", url: "https://", sort_order: items.length + 1 }).select().single();
    if (error) return toast.error(error.message);
    setItems([...items, created]);
    qc.invalidateQueries({ queryKey: ["social-links"] });
  };
  const save = async () => {
    const payload = items.map((i) => ({ id: i.id, platform: i.platform, url: i.url, sort_order: i.sort_order, enabled: i.enabled }));
    const { error } = await supabase.from("social_links").upsert(payload);
    if (error) return toast.error(error.message);
    toast.success("Redes sociais atualizadas");
    setDirty(false);
    qc.invalidateQueries({ queryKey: ["social-links"] });
  };

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <div><h1 className="text-2xl font-black">Redes sociais</h1><p className="text-sm text-muted-foreground">Aparecem no header e no rodapé.</p></div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1"/>Nova</Button>
          <Button onClick={save} disabled={!dirty}><Save className="w-4 h-4 mr-1"/>Salvar</Button>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle>Redes</CardTitle><CardDescription>Ordem, plataforma e URL.</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          {items.map((it, i) => (
            <div key={it.id} className="flex items-center gap-2 border rounded p-3 bg-white">
              <div className="flex flex-col gap-1">
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-3 h-3"/></Button>
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ArrowDown className="w-3 h-3"/></Button>
              </div>
              <select className="h-10 rounded border px-2 text-sm" value={it.platform} onChange={(e) => upd(it.id, { platform: e.target.value })}>
                {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <Input className="flex-1" placeholder="https://" value={it.url} onChange={(e) => upd(it.id, { url: e.target.value })} />
              <Switch checked={it.enabled} onCheckedChange={(v) => upd(it.id, { enabled: v })} />
              <Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
