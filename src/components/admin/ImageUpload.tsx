import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

export function ImageUpload({ value, onChange, folder = "misc", label }: {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "png";
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("site-assets").upload(path, file, { upsert: false, contentType: file.type });
      if (error) throw error;
      const { data: pub } = supabase.storage.from("site-assets").getPublicUrl(path);
      const url = pub.publicUrl;
      // Best-effort media_library entry
      await supabase.from("media_library").insert({
        file_name: file.name,
        storage_path: path,
        public_url: url,
        mime_type: file.type,
        size_bytes: file.size,
      });
      onChange(url);
      toast.success("Imagem enviada");
    } catch (e: any) {
      toast.error(e.message ?? "Falha no upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <div className="text-sm font-medium">{label}</div>}
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative w-24 h-24 border rounded overflow-hidden bg-slate-50 group">
            <img src={value} alt="" className="w-full h-full object-cover" />
            <button type="button" onClick={() => onChange(null)} className="absolute top-1 right-1 bg-black/60 text-white rounded p-0.5 opacity-0 group-hover:opacity-100 transition">
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 border-2 border-dashed rounded grid place-items-center text-muted-foreground text-xs">Sem imagem</div>
        )}
        <div className="flex flex-col gap-1">
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Upload className="w-3 h-3 mr-1" />}
            {value ? "Trocar" : "Enviar"}
          </Button>
          {value && <div className="text-[10px] text-muted-foreground truncate max-w-[180px]">{value.split("/").pop()}</div>}
        </div>
      </div>
    </div>
  );
}
