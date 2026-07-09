import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Trash2, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/gallery")({ component: GalleryAdmin });

type G = { id: string; image_url: string; caption: string | null; album: string | null; order_index: number; is_published: boolean };

function GalleryAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<G[]>({
    queryKey: ["admin-gallery"],
    queryFn: async () => { const { data, error } = await supabase.from("gallery_items").select("*").order("order_index"); if (error) throw error; return data as G[]; },
  });
  const [items, setItems] = useState<G[]>([]);
  const [album, setAlbum] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (data) setItems(data); }, [data]);

  const upload = async (files: FileList) => {
    setUploading(true);
    try {
      let order = items.length;
      const rows: any[] = [];
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() ?? "png";
        const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
        const { error } = await supabase.storage.from("site-assets").upload(path, file, { contentType: file.type });
        if (error) throw error;
        const { data: pub } = supabase.storage.from("site-assets").getPublicUrl(path);
        rows.push({ image_url: pub.publicUrl, album: album || null, order_index: order++, is_published: true });
        await supabase.from("media_library").insert({ file_name: file.name, storage_path: path, public_url: pub.publicUrl, mime_type: file.type, size_bytes: file.size });
      }
      const { data: inserted, error } = await supabase.from("gallery_items").insert(rows).select();
      if (error) throw error;
      setItems([...items, ...(inserted as G[])]);
      toast.success(`${rows.length} imagem(ns) adicionada(s)`);
    } catch (e: any) { toast.error(e.message); } finally { setUploading(false); }
  };

  const upd = async (id: string, p: Partial<G>) => {
    setItems(items.map((i) => i.id === id ? { ...i, ...p } : i));
    await supabase.from("gallery_items").update(p).eq("id", id);
    qc.invalidateQueries({ queryKey: ["public-gallery"] });
  };
  const remove = async (id: string) => { if (!confirm("Remover?")) return; const { error } = await supabase.from("gallery_items").delete().eq("id", id); if (error) return toast.error(error.message); setItems(items.filter((i) => i.id !== id)); };

  const albums = Array.from(new Set(items.map((i) => i.album).filter(Boolean))) as string[];

  return (
    <div className="max-w-6xl">
      <AdminHeader title="Galeria" description="Imagens exibidas no site (portfolio, banners internos, etc)."
        actions={<>
          <Input placeholder="Álbum (opcional)" value={album} onChange={(e) => setAlbum(e.target.value)} className="w-40"/>
          <input ref={inputRef} type="file" hidden accept="image/*" multiple onChange={(e) => e.target.files && upload(e.target.files)}/>
          <Button onClick={() => inputRef.current?.click()} disabled={uploading}>{uploading ? <Loader2 className="w-4 h-4 mr-1 animate-spin"/> : <Upload className="w-4 h-4 mr-1"/>}Enviar imagens</Button>
        </>}/>
      {albums.length > 0 && <div className="flex gap-2 mb-4 text-xs text-muted-foreground">Álbuns: {albums.map((a) => <span key={a} className="px-2 py-0.5 bg-slate-200 rounded">{a}</span>)}</div>}
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : items.length === 0 ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Galeria vazia.</CardContent></Card> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {items.map((it) => (
            <div key={it.id} className="border rounded overflow-hidden bg-white group relative">
              <div className="aspect-square bg-slate-100"><img src={it.image_url} alt="" className="w-full h-full object-cover"/></div>
              <div className="p-2 space-y-1">
                <Input placeholder="Legenda" value={it.caption ?? ""} onChange={(e) => setItems(items.map((x) => x.id === it.id ? { ...x, caption: e.target.value } : x))} onBlur={(e) => upd(it.id, { caption: e.target.value })} className="h-7 text-xs"/>
                <Input placeholder="Álbum" value={it.album ?? ""} onChange={(e) => setItems(items.map((x) => x.id === it.id ? { ...x, album: e.target.value } : x))} onBlur={(e) => upd(it.id, { album: e.target.value })} className="h-7 text-xs"/>
                <div className="flex items-center justify-between">
                  <Switch checked={it.is_published} onCheckedChange={(v) => upd(it.id, { is_published: v })}/>
                  <Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-3 h-3 text-destructive"/></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
