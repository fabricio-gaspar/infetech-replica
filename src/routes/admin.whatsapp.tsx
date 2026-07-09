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
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/whatsapp")({ component: WhatsAppAdmin });

type Config = { id: number; enabled: boolean; phone_number: string | null; greeting: string | null; position: string; chatbot_enabled: boolean };

function WhatsAppAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<Config | null>({
    queryKey: ["admin-whatsapp"],
    queryFn: async () => { const { data, error } = await supabase.from("whatsapp_config").select("*").eq("id", 1).maybeSingle(); if (error) throw error; return data as Config | null; },
  });
  const [f, setF] = useState<Config | null>(null);
  useEffect(() => { setF(data ?? { id: 1, enabled: true, phone_number: "", greeting: "Olá! Como podemos ajudar?", position: "bottom-right", chatbot_enabled: false }); }, [data]);
  const save = async () => {
    if (!f) return;
    const { error } = await supabase.from("whatsapp_config").upsert(f);
    if (error) return toast.error(error.message);
    toast.success("Configuração salva"); qc.invalidateQueries({ queryKey: ["admin-whatsapp"] }); qc.invalidateQueries({ queryKey: ["public-whatsapp"] });
  };

  if (isLoading || !f) return <Loader2 className="w-5 h-5 animate-spin"/>;

  return (
    <div className="max-w-2xl">
      <AdminHeader title="WhatsApp flutuante" description="Botão de contato via WhatsApp exibido no site."
        actions={<Button onClick={save}><Save className="w-4 h-4 mr-1"/>Salvar</Button>}/>
      <Card><CardHeader><CardTitle>Configurações</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center gap-2"><Switch checked={f.enabled} onCheckedChange={(v) => setF({ ...f, enabled: v })}/>Ativar botão flutuante</label>
          <div><Label>Número (com DDI, apenas dígitos)</Label><Input placeholder="5511999998888" value={f.phone_number ?? ""} onChange={(e) => setF({ ...f, phone_number: e.target.value.replace(/\D/g, "") })}/></div>
          <div><Label>Mensagem inicial</Label><Textarea rows={2} value={f.greeting ?? ""} onChange={(e) => setF({ ...f, greeting: e.target.value })}/></div>
          <div><Label>Posição</Label>
            <select className="h-10 rounded border px-2 text-sm bg-white w-full" value={f.position} onChange={(e) => setF({ ...f, position: e.target.value })}>
              <option value="bottom-right">Inferior direita</option><option value="bottom-left">Inferior esquerda</option>
            </select>
          </div>
          <label className="flex items-center gap-2"><Switch checked={f.chatbot_enabled} onCheckedChange={(v) => setF({ ...f, chatbot_enabled: v })}/>Usar chatbot antes de abrir o WhatsApp</label>
          <p className="text-xs text-muted-foreground">Configure o fluxo do chatbot em <a href="/admin/chatbot" className="text-primary hover:underline">Chatbot</a>.</p>
        </CardContent>
      </Card>
    </div>
  );
}
