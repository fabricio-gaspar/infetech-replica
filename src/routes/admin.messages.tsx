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

export const Route = createFileRoute("/admin/messages")({ component: MessagesAdmin });

type M = {
  id: string; name: string; email: string; phone: string | null; company: string | null;
  subject: string | null; message: string; source: string | null;
  status: "new"|"in_progress"|"answered"|"closed"|"lost"; internal_notes: string | null;
  created_at: string;
};

const STATUS_LABELS: Record<M["status"], string> = { new: "Novo", in_progress: "Em atendimento", answered: "Respondido", closed: "Fechado", lost: "Perdido" };
const STATUS_COLORS: Record<M["status"], string> = { new: "bg-blue-100 text-blue-700", in_progress: "bg-amber-100 text-amber-700", answered: "bg-emerald-100 text-emerald-700", closed: "bg-slate-200 text-slate-600", lost: "bg-red-100 text-red-700" };

function MessagesAdmin() {
  const qc = useQueryClient();
  const [q, setQ] = useState(""); const [statusF, setStatusF] = useState<string>("all");
  const [selected, setSelected] = useState<M | null>(null);

  const { data, isLoading } = useQuery<M[]>({
    queryKey: ["admin-messages"],
    queryFn: async () => { const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false }); if (error) throw error; return data as M[]; },
  });

  const filtered = (data ?? []).filter((m) => (statusF === "all" || m.status === statusF) && (!q || [m.name, m.email, m.phone].filter(Boolean).some((v) => v!.toLowerCase().includes(q.toLowerCase()))));
  const counts = { new: 0, in_progress: 0, answered: 0, closed: 0, lost: 0 } as Record<M["status"], number>;
  (data ?? []).forEach((m) => { counts[m.status]++; });

  const updateSelected = async (patch: Partial<M>) => {
    if (!selected) return;
    setSelected({ ...selected, ...patch });
    const { error } = await supabase.from("contact_messages").update(patch).eq("id", selected.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-messages"] });
    qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
  };
  const remove = async (id: string) => { if (!confirm("Excluir mensagem?")) return; const { error } = await supabase.from("contact_messages").delete().eq("id", id); if (error) return toast.error(error.message); setSelected(null); qc.invalidateQueries({ queryKey: ["admin-messages"] }); };

  return (
    <div className="max-w-6xl">
      <AdminHeader title="Mensagens" description="Contatos enviados pelo formulário do site."/>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
        {(Object.keys(STATUS_LABELS) as M["status"][]).map((s) => (
          <button key={s} onClick={() => setStatusF(statusF === s ? "all" : s)} className={`p-3 rounded border text-left transition ${statusF === s ? "border-primary bg-primary/5" : "border-slate-200 bg-white"}`}>
            <div className="text-xs text-muted-foreground">{STATUS_LABELS[s]}</div>
            <div className="text-2xl font-black">{counts[s]}</div>
          </button>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/><Input className="pl-9" placeholder="Buscar…" value={q} onChange={(e) => setQ(e.target.value)}/></div>
        <select className="h-10 rounded border px-2 text-sm bg-white" value={statusF} onChange={(e) => setStatusF(e.target.value)}>
          <option value="all">Todos os status</option>
          {(Object.keys(STATUS_LABELS) as M["status"][]).map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
      </div>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : filtered.length === 0 ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Nenhuma mensagem.</CardContent></Card> : (
        <Card><CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-slate-50"><tr className="text-left"><th className="p-3">Nome</th><th className="p-3">E-mail</th><th className="p-3">Telefone</th><th className="p-3">Origem</th><th className="p-3">Status</th><th className="p-3">Data</th><th className="p-3"></th></tr></thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b hover:bg-slate-50 cursor-pointer" onClick={() => setSelected(m)}>
                  <td className="p-3 font-medium">{m.name}</td>
                  <td className="p-3 text-xs">{m.email}</td>
                  <td className="p-3 text-xs">{m.phone ?? "—"}</td>
                  <td className="p-3 text-xs text-muted-foreground">{m.source ?? "—"}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded ${STATUS_COLORS[m.status]}`}>{STATUS_LABELS[m.status]}</span></td>
                  <td className="p-3 text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</td>
                  <td className="p-3 text-right"><Button size="icon" variant="ghost"><Eye className="w-3 h-3"/></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent></Card>
      )}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (<>
            <DialogHeader><DialogTitle>{selected.name}</DialogTitle></DialogHeader>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">E-mail:</span> {selected.email}</div>
                <div><span className="text-muted-foreground">Telefone:</span> {selected.phone ?? "—"}</div>
                <div><span className="text-muted-foreground">Empresa:</span> {selected.company ?? "—"}</div>
                <div><span className="text-muted-foreground">Origem:</span> {selected.source ?? "—"}</div>
                <div className="col-span-2"><span className="text-muted-foreground">Assunto:</span> {selected.subject ?? "—"}</div>
                <div className="col-span-2"><span className="text-muted-foreground">Data:</span> {new Date(selected.created_at).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Mensagem</div>
                <div className="border rounded p-3 whitespace-pre-wrap bg-slate-50">{selected.message}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Observações internas</div>
                <Textarea rows={3} value={selected.internal_notes ?? ""} onChange={(e) => setSelected({ ...selected, internal_notes: e.target.value })} onBlur={(e) => updateSelected({ internal_notes: e.target.value })}/>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <select className="h-9 rounded border px-2 text-sm bg-white" value={selected.status} onChange={(e) => updateSelected({ status: e.target.value as M["status"] })}>
                  {(Object.keys(STATUS_LABELS) as M["status"][]).map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
                <div className="ml-auto flex gap-2">
                  <Button variant="outline" size="sm" asChild><a href={`mailto:${selected.email}`}>Responder por e-mail</a></Button>
                  <Button variant="destructive" size="sm" onClick={() => remove(selected.id)}><Trash2 className="w-3 h-3 mr-1"/>Excluir</Button>
                </div>
              </div>
            </div>
          </>)}
        </DialogContent>
      </Dialog>
    </div>
  );
}
