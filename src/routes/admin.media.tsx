import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Trash2, Copy, Loader2, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/media")({ component: MediaAdmin });

type F = { id: string; file_name: string; storage_path: string; public_url: string; mime_type: string | null; size_bytes: number | null; created_at: string };

function MediaAdmin() {
  const qc = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery<F[]>({
    queryKey: ["admin-media"],
    queryFn: async () => { const { data, error } = await supabase.from("media_library").select("*").order("created_at", { ascending: false }); if (error) throw error; return data as F[]; },
  });

  const upload = async (files: FileList) => {
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() ?? "bin";
        const path = `media/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
        const { error } = await supabase.storage.from("site-assets").upload(path, file, { contentType: file.type });
        if (error) throw error;
        const { data: pub } = supabase.storage.from("site-assets").getPublicUrl(path);
        await supabase.from("media_library").insert({ file_name: file.name, storage_path: path, public_url: pub.publicUrl, mime_type: file.type, size_bytes: file.size });
      }
      toast.success("Arquivos enviados"); qc.invalidateQueries({ queryKey: ["admin-media"] });
    } catch (e: any) { toast.error(e.message); } finally { setUploading(false); }
  };
  const remove = async (item: F) => {
    if (!confirm(`Excluir ${item.file_name}?`)) return;
    await supabase.storage.from("site-assets").remove([item.storage_path]);
    await supabase.from("media_library").delete().eq("id", item.id);
    qc.invalidateQueries({ queryKey: ["admin-media"] });
  };
  const copy = (u: string) => { navigator.clipboard.writeText(u); toast.success("URL copiada"); };

  const filtered = (data ?? []).filter((f) => !q || f.file_name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="max-w-6xl">
      <AdminHeader title="Biblioteca de mídia" description="Todas as imagens e arquivos enviados."
        actions={<>
          <input ref={inputRef} type="file" hidden multiple onChange={(e) => e.target.files && upload(e.target.files)}/>
          <Button onClick={() => inputRef.current?.click()} disabled={uploading}>{uploading ? <Loader2 className="w-4 h-4 mr-1 animate-spin"/> : <Upload className="w-4 h-4 mr-1"/>}Enviar</Button>
        </>}/>
      <div className="mb-4 relative max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/><Input className="pl-9" placeholder="Buscar arquivo…" value={q} onChange={(e) => setQ(e.target.value)}/></div>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : filtered.length === 0 ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Sem arquivos.</CardContent></Card> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((f) => (
            <div key={f.id} className="border rounded overflow-hidden bg-white">
              <div className="aspect-square bg-slate-100 flex items-center justify-center">
                {f.mime_type?.startsWith("image/") ? <img src={f.public_url} alt="" className="w-full h-full object-cover"/> : <div className="text-xs text-muted-foreground p-2 text-center">{f.mime_type ?? "arquivo"}</div>}
              </div>
              <div className="p-2 space-y-1">
                <div className="text-[11px] truncate" title={f.file_name}>{f.file_name}</div>
                <div className="text-[10px] text-muted-foreground">{f.size_bytes ? `${(f.size_bytes / 1024).toFixed(0)} KB` : ""}</div>
                <div className="flex justify-between">
                  <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => copy(f.public_url)}><Copy className="w-3 h-3"/></Button>
                  <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => remove(f)}><Trash2 className="w-3 h-3 text-destructive"/></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
