import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
import { Card, CardContent } from "@/components/ui/card";
import { Save, Loader2, ArrowLeft, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { slugify } from "@/lib/slug";

export const Route = createFileRoute("/admin/blog/$id")({ component: BlogEdit });

type Post = {
  id: string; title: string; slug: string; excerpt: string | null; content: string | null; cover_url: string | null;
  author_name: string | null; tags: string[] | null; status: "draft"|"published"|"archived"; published_at: string | null;
  seo_title: string | null; seo_description: string | null; og_image_url: string | null;
};

function BlogEdit() {
  const { id } = Route.useParams();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<Post | null>({
    queryKey: ["admin-post", id],
    queryFn: async () => { const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle(); if (error) throw error; return data as Post | null; },
  });
  const [p, setP] = useState<Post | null>(null);
  useEffect(() => { setP(data ?? null); }, [data]);

  const upd = <K extends keyof Post>(k: K, v: Post[K]) => setP((cur) => cur ? { ...cur, [k]: v } : cur);
  const save = async (publish?: boolean) => {
    if (!p) return;
    const patch: any = { ...p };
    if (publish !== undefined) {
      patch.status = publish ? "published" : "draft";
      if (publish && !p.published_at) patch.published_at = new Date().toISOString();
    }
    const { error } = await supabase.from("blog_posts").update(patch).eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Post salvo");
    qc.invalidateQueries({ queryKey: ["admin-posts"] });
    qc.invalidateQueries({ queryKey: ["admin-post", id] });
    qc.invalidateQueries({ queryKey: ["public-blog"] });
  };
  const remove = async () => { if (!p || !confirm("Excluir post?")) return; await supabase.from("blog_posts").delete().eq("id", p.id); navigate({ to: "/admin/blog" }); };

  if (isLoading || !p) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin"/></div>;

  return (
    <div className="max-w-5xl">
      <AdminHeader title={p.title || "Post"} breadcrumbs={[{ label: "Painel", to: "/admin" }, { label: "Blog", to: "/admin/blog" }, { label: p.title || "Post" }]}
        actions={<>
          <Link to="/admin/blog"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1"/>Voltar</Button></Link>
          <Button variant="destructive" size="sm" onClick={remove}><Trash2 className="w-4 h-4 mr-1"/>Excluir</Button>
          <Button variant="outline" onClick={() => save(false)}>Salvar rascunho</Button>
          <Button onClick={() => save(true)}><Save className="w-4 h-4 mr-1"/>Publicar</Button>
        </>}/>
      <div className="grid md:grid-cols-[1fr_320px] gap-4">
        <div className="space-y-4">
          <Card><CardContent className="pt-6 space-y-3">
            <div><Label>Título</Label><Input value={p.title} onChange={(e) => upd("title", e.target.value)}/></div>
            <div><Label>Slug</Label>
              <div className="flex gap-1">
                <Input value={p.slug} onChange={(e) => upd("slug", slugify(e.target.value))}/>
                <Button variant="outline" size="sm" onClick={() => upd("slug", slugify(p.title))}>Gerar</Button>
              </div>
            </div>
            <div><Label>Resumo</Label><Textarea rows={2} value={p.excerpt ?? ""} onChange={(e) => upd("excerpt", e.target.value)}/></div>
            <div>
              <Label>Conteúdo</Label>
              <RichTextEditor value={p.content ?? ""} onChange={(v) => upd("content", v)}/>
            </div>
          </CardContent></Card>
        </div>
        <div className="space-y-4">
          <Card><CardContent className="pt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Status:</span>
              <span className={`text-xs px-2 py-0.5 rounded ${p.status === "published" ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"}`}>{p.status}</span>
            </div>
            <ImageUpload label="Capa" folder="blog" value={p.cover_url} onChange={(url) => upd("cover_url", url)}/>
            <div><Label>Autor</Label><Input value={p.author_name ?? ""} onChange={(e) => upd("author_name", e.target.value)}/></div>
            <div><Label>Tags (vírgula)</Label><Input value={(p.tags ?? []).join(", ")} onChange={(e) => upd("tags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}/></div>
          </CardContent></Card>
          <Card><CardContent className="pt-6 space-y-3">
            <div className="text-sm font-semibold">SEO</div>
            <div><Label>Meta title</Label><Input value={p.seo_title ?? ""} onChange={(e) => upd("seo_title", e.target.value)}/></div>
            <div><Label>Meta description</Label><Textarea rows={2} value={p.seo_description ?? ""} onChange={(e) => upd("seo_description", e.target.value)}/></div>
            <ImageUpload label="Imagem Open Graph" folder="blog/og" value={p.og_image_url} onChange={(url) => upd("og_image_url", url)}/>
          </CardContent></Card>
        </div>
      </div>
    </div>
  );
}
