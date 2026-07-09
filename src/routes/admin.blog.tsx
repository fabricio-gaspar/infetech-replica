import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
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
import { Trash2, Plus, Save, Loader2, Search, Edit, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { slugify } from "@/lib/slug";

export const Route = createFileRoute("/admin/blog")({ component: BlogList });

type Post = { id: string; title: string; slug: string; excerpt: string | null; cover_url: string | null; status: "draft"|"published"|"archived"; published_at: string | null; category_id: string | null; tags: string[] | null };

function BlogList() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [q, setQ] = useState(""); const [status, setStatus] = useState<string>("all");
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ["admin-posts"],
    queryFn: async () => { const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false }); if (error) throw error; return data as Post[]; },
  });

  const create = async () => {
    const title = "Novo post"; const slug = slugify(title + "-" + Date.now().toString(36));
    const { data: c, error } = await supabase.from("blog_posts").insert({ title, slug, status: "draft" }).select().single();
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-posts"] });
    navigate({ to: "/admin/blog/$id", params: { id: c!.id } });
  };
  const remove = async (id: string) => { if (!confirm("Excluir post?")) return; const { error } = await supabase.from("blog_posts").delete().eq("id", id); if (error) return toast.error(error.message); qc.invalidateQueries({ queryKey: ["admin-posts"] }); };

  const filtered = (data ?? []).filter((p) => (status === "all" || p.status === status) && (!q || p.title.toLowerCase().includes(q.toLowerCase())));

  return (
    <div className="max-w-6xl">
      <AdminHeader title="Blog" description="Artigos e notícias." actions={<Button onClick={create}><Plus className="w-4 h-4 mr-1"/>Novo post</Button>}/>
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/><Input className="pl-9" placeholder="Buscar título…" value={q} onChange={(e) => setQ(e.target.value)}/></div>
        <select className="h-10 rounded border px-2 text-sm bg-white" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Todos</option><option value="published">Publicados</option><option value="draft">Rascunhos</option><option value="archived">Arquivados</option>
        </select>
      </div>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : filtered.length === 0 ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Sem posts.</CardContent></Card> : (
        <Card><CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b bg-slate-50"><tr className="text-left"><th className="p-3">Título</th><th className="p-3">Slug</th><th className="p-3">Status</th><th className="p-3">Data</th><th className="p-3 w-24"></th></tr></thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b hover:bg-slate-50">
                  <td className="p-3 font-medium">{p.title}</td>
                  <td className="p-3 text-muted-foreground text-xs">/{p.slug}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded ${p.status === "published" ? "bg-green-100 text-green-700" : p.status === "draft" ? "bg-slate-200 text-slate-600" : "bg-amber-100 text-amber-700"}`}>{p.status}</span></td>
                  <td className="p-3 text-xs text-muted-foreground">{p.published_at ? new Date(p.published_at).toLocaleDateString() : "—"}</td>
                  <td className="p-3 text-right">
                    <Link to="/admin/blog/$id" params={{ id: p.id }}><Button size="icon" variant="ghost"><Edit className="w-3 h-3"/></Button></Link>
                    <Button size="icon" variant="ghost" onClick={() => remove(p.id)}><Trash2 className="w-3 h-3 text-destructive"/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent></Card>
      )}
    </div>
  );
}
