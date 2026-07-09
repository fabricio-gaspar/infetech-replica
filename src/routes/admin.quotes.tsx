import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Loader2, Eye, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/quotes")({ component: QuotesAdmin });

type Q = {
  id: string; name: string | null; email: string | null; phone: string | null; company: string | null;
  service_interest: string | null; budget: string | null; message: string | null; answers: any;
  source: string | null; status: "new"|"in_progress"|"answered"|"closed"|"lost"; internal_notes: string | null; created_at: string;
};
const L: Record<Q["status"], string> = { new: "Novo", in_progress: "Em contato", answered: "Respondido", closed: "Concluído", lost: "Descartado" };
const C: Record<Q["status"], string> = { new: "bg-blue-100 text-blue-700", in_progress: "bg-amber-100 text-amber-700", answered: "bg-emerald-100 text-emerald-700", closed: "bg-slate-200 text-slate-600", lost: "bg-red-100 text-red-700" };

function QuotesAdmin() {
  const qc = useQueryClient();
  const [q, setQ] = useState(""); const [sf, setSf] = useState("all"); const [sel, setSel] = useState<Q | null>(null);
  const { data, isLoading } = useQuery<Q[]>({
    queryKey: ["admin-quotes"],
    queryFn: async () => { const { data, error } = await supabase.from("quotes").select("*").order("created_at", { ascending: false }); if (error) throw error; return data as Q[]; },
  });
  const filtered = (data ?? []).filter((m) => (sf === "all" || m.status === sf) && (!q || [m.name, m.email, m.phone].filter(Boolean).some((v) => (v as string).toLowerCase().includes(q.toLowerCase()))));
  const upd = async (patch: Partial<Q>) => { if (!sel) return; setSel({ ...sel, ...patch }); const { error } = await supabase.from("quotes").update(patch).eq("id", sel.id); if (error) return toast.error(error.message); qc.invalidateQueries({ queryKey: ["admin-quotes"] }); };
  const remove = async (id: string) => { if (!confirm("Excluir?")) return; await supabase.from("quotes").delete().eq("id", id); setSel(null); qc.invalidateQueries({ queryKey: ["admin-quotes"] }); };

  return (
    <div className="max-w-6xl">
      <AdminHeader title="Orçamentos / Leads" description="Solicitações de orçamento e leads captados."/>
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/><Input className="pl-9" placeholder="Buscar…" value={q} onChange={(e) => setQ(e.target.value)}/></div>
        <select className="h-10 rounded border px-2 text-sm bg-white" value={sf} onChange={(e) => setSf(e.target.value)}><option value="all">Todos</option>{(Object.keys(L) as Q["status"][]).map((s) => <option key={s} value={s}>{L[s]}</option>)}</select>
      </div>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : filtered.length === 0 ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Sem orçamentos.</CardContent></Card> : (
        <Card><CardContent className="p-0 overflow-x-auto"><table className="w-full text-sm">
          <thead className="border-b bg-slate-50"><tr className="text-left"><th className="p-3">Nome</th><th className="p-3">Contato</th><th className="p-3">Interesse</th><th className="p-3">Orçamento</th><th className="p-3">Status</th><th className="p-3">Data</th><th className="p-3"></th></tr></thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} className="border-b hover:bg-slate-50 cursor-pointer" onClick={() => setSel(m)}>
                <td className="p-3 font-medium">{m.name ?? "—"}</td>
                <td className="p-3 text-xs">{m.email ?? m.phone ?? "—"}</td>
                <td className="p-3 text-xs">{m.service_interest ?? "—"}</td>
                <td className="p-3 text-xs">{m.budget ?? "—"}</td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded ${C[m.status]}`}>{L[m.status]}</span></td>
                <td className="p-3 text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</td>
                <td className="p-3 text-right"><Button size="icon" variant="ghost"><Eye className="w-3 h-3"/></Button></td>
              </tr>
            ))}
          </tbody>
        </table></CardContent></Card>
      )}
      <Dialog open={!!sel} onOpenChange={(o) => !o && setSel(null)}>
        <DialogContent className="max-w-2xl">
          {sel && (<>
            <DialogHeader><DialogTitle>{sel.name ?? "Orçamento"}</DialogTitle></DialogHeader>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-muted-foreground">E-mail:</span> {sel.email ?? "—"}</div>
                <div><span className="text-muted-foreground">Telefone:</span> {sel.phone ?? "—"}</div>
                <div><span className="text-muted-foreground">Empresa:</span> {sel.company ?? "—"}</div>
                <div><span className="text-muted-foreground">Origem:</span> {sel.source ?? "—"}</div>
                <div><span className="text-muted-foreground">Interesse:</span> {sel.service_interest ?? "—"}</div>
                <div><span className="text-muted-foreground">Orçamento:</span> {sel.budget ?? "—"}</div>
              </div>
              {sel.message && <div><div className="text-xs text-muted-foreground mb-1">Mensagem</div><div className="border rounded p-3 whitespace-pre-wrap bg-slate-50">{sel.message}</div></div>}
              {sel.answers && <div><div className="text-xs text-muted-foreground mb-1">Respostas do chatbot</div><pre className="border rounded p-3 bg-slate-50 text-xs overflow-x-auto">{JSON.stringify(sel.answers, null, 2)}</pre></div>}
              <div>
                <div className="text-xs text-muted-foreground mb-1">Observações internas</div>
                <Textarea rows={3} value={sel.internal_notes ?? ""} onChange={(e) => setSel({ ...sel, internal_notes: e.target.value })} onBlur={(e) => upd({ internal_notes: e.target.value })}/>
              </div>
              <div className="flex items-center gap-2">
                <select className="h-9 rounded border px-2 text-sm bg-white" value={sel.status} onChange={(e) => upd({ status: e.target.value as Q["status"] })}>
                  {(Object.keys(L) as Q["status"][]).map((s) => <option key={s} value={s}>{L[s]}</option>)}
                </select>
                <div className="ml-auto flex gap-2">
                  {sel.email && <Button variant="outline" size="sm" asChild><a href={`mailto:${sel.email}`}>E-mail</a></Button>}
                  {sel.phone && <Button variant="outline" size="sm" asChild><a href={`https://wa.me/${sel.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">WhatsApp</a></Button>}
                  <Button variant="destructive" size="sm" onClick={() => remove(sel.id)}><Trash2 className="w-3 h-3 mr-1"/>Excluir</Button>
                </div>
              </div>
            </div>
          </>)}
        </DialogContent>
      </Dialog>
    </div>
  );
}
