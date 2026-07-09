import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowUp, ArrowDown, Trash2, Plus, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/chatbot")({ component: ChatbotAdmin });

type Step = { id: string; step_key: string; prompt: string; input_type: "free_text"|"choice"|"name"|"email"|"phone"; options: string[]; order_index: number; is_active: boolean };

function ChatbotAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<Step[]>({
    queryKey: ["admin-chatbot"],
    queryFn: async () => { const { data, error } = await supabase.from("chatbot_steps").select("*").order("order_index"); if (error) throw error; return (data ?? []).map((s: any) => ({ ...s, options: s.options ?? [] })) as Step[]; },
  });
  const [items, setItems] = useState<Step[]>([]); const [dirty, setDirty] = useState(false);
  useEffect(() => { if (data) setItems(data); }, [data]);
  const upd = (id: string, p: Partial<Step>) => { setItems((xs) => xs.map((i) => i.id === id ? { ...i, ...p } : i)); setDirty(true); };
  const move = (idx: number, dir: -1 | 1) => { const j = idx + dir; if (j < 0 || j >= items.length) return; const c = [...items]; [c[idx], c[j]] = [c[j], c[idx]]; setItems(c.map((it, i) => ({ ...it, order_index: i }))); setDirty(true); };
  const add = async () => { const key = `step_${Date.now().toString(36)}`; const { data: c, error } = await supabase.from("chatbot_steps").insert({ step_key: key, prompt: "Nova pergunta", input_type: "free_text", order_index: items.length }).select().single(); if (error) return toast.error(error.message); setItems([...items, { ...(c as any), options: [] }]); };
  const remove = async (id: string) => { if (!confirm("Remover?")) return; const { error } = await supabase.from("chatbot_steps").delete().eq("id", id); if (error) return toast.error(error.message); setItems(items.filter((i) => i.id !== id)); };
  const save = async () => { const { error } = await supabase.from("chatbot_steps").upsert(items as any); if (error) return toast.error(error.message); toast.success("Fluxo salvo"); setDirty(false); qc.invalidateQueries({ queryKey: ["admin-chatbot"] }); qc.invalidateQueries({ queryKey: ["public-chatbot"] }); };

  return (
    <div className="max-w-3xl">
      <AdminHeader title="Chatbot" description="Sequência de perguntas antes de encaminhar para o WhatsApp ou salvar como orçamento."
        actions={<><Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1"/>Nova etapa</Button><Button onClick={save} disabled={!dirty}><Save className="w-4 h-4 mr-1"/>Salvar</Button></>}/>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : items.length === 0 ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Sem etapas.</CardContent></Card> : (
        <div className="space-y-3">
          {items.map((it, i) => (
            <Card key={it.id}>
              <CardHeader className="flex flex-row items-center gap-2 py-3">
                <div className="flex flex-col gap-1"><Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-3 h-3"/></Button><Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ArrowDown className="w-3 h-3"/></Button></div>
                <CardTitle className="text-base flex-1">Etapa {i + 1}</CardTitle>
                <label className="flex items-center gap-1 text-xs"><Switch checked={it.is_active} onCheckedChange={(v) => upd(it.id, { is_active: v })}/>Ativa</label>
                <Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div><Label>Chave</Label><Input value={it.step_key} onChange={(e) => upd(it.id, { step_key: e.target.value })}/></div>
                  <div><Label>Tipo de resposta</Label>
                    <select className="h-10 rounded border px-2 text-sm bg-white w-full" value={it.input_type} onChange={(e) => upd(it.id, { input_type: e.target.value as Step["input_type"] })}>
                      <option value="free_text">Texto livre</option><option value="choice">Escolha</option><option value="name">Nome</option><option value="email">E-mail</option><option value="phone">Telefone</option>
                    </select>
                  </div>
                </div>
                <div><Label>Pergunta</Label><Textarea rows={2} value={it.prompt} onChange={(e) => upd(it.id, { prompt: e.target.value })}/></div>
                {it.input_type === "choice" && (
                  <div>
                    <Label>Opções</Label>
                    <div className="space-y-1">
                      {it.options.map((v, k) => (
                        <div key={k} className="flex gap-1"><Input value={v} onChange={(e) => upd(it.id, { options: it.options.map((x, j) => j === k ? e.target.value : x) })}/><Button size="icon" variant="ghost" onClick={() => upd(it.id, { options: it.options.filter((_, j) => j !== k) })}><Trash2 className="w-3 h-3 text-destructive"/></Button></div>
                      ))}
                      <Button size="sm" variant="outline" onClick={() => upd(it.id, { options: [...it.options, ""] })}><Plus className="w-3 h-3 mr-1"/>Adicionar opção</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
