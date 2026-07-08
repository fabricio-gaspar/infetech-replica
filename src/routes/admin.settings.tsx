import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSiteSettings, type SiteSettings } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/admin/settings")({ component: SettingsPage });

const FONT_OPTIONS = ["Roboto", "Inter", "Poppins", "Montserrat", "Open Sans", "Lato", "Nunito", "Raleway", "Roboto Slab", "Playfair Display", "Catamaran", "Oswald"];

function SettingsPage() {
  const { data, isLoading } = useSiteSettings();
  const [form, setForm] = useState<Partial<SiteSettings>>({});
  const [saving, setSaving] = useState(false);
  const qc = useQueryClient();

  useEffect(() => { if (data) setForm(data); }, [data]);

  const set = <K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("site_settings").update(form).eq("id", 1);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Configurações salvas");
    qc.invalidateQueries({ queryKey: ["site-settings"] });
  };

  if (isLoading || !data) return <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin"/>Carregando…</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-slate-50 py-3 z-10">
        <div>
          <h1 className="text-2xl font-black">Identidade & Contato</h1>
          <p className="text-sm text-muted-foreground">Edite logo, cores, fontes, dados de contato e SEO.</p>
        </div>
        <Button onClick={save} disabled={saving}>{saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <Save className="w-4 h-4 mr-2"/>}Salvar</Button>
      </div>

      <Tabs defaultValue="identity">
        <TabsList className="grid grid-cols-5 w-full mb-4">
          <TabsTrigger value="identity">Identidade</TabsTrigger>
          <TabsTrigger value="colors">Cores</TabsTrigger>
          <TabsTrigger value="fonts">Fontes</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="identity">
          <Card>
            <CardHeader><CardTitle>Identidade</CardTitle><CardDescription>Nome, logo, favicon e mensagens gerais</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Nome do site</Label><Input value={form.site_name ?? ""} onChange={(e) => set("site_name", e.target.value)} /></div>
              <div><Label>URL do Logo</Label><Input placeholder="https://…" value={form.logo_url ?? ""} onChange={(e) => set("logo_url", e.target.value)} /></div>
              <div><Label>URL do Favicon</Label><Input placeholder="https://…" value={form.favicon_url ?? ""} onChange={(e) => set("favicon_url", e.target.value)} /></div>
              <div><Label>Texto do topo (barra superior)</Label><Input value={form.topbar_text ?? ""} onChange={(e) => set("topbar_text", e.target.value)} /></div>
              <div><Label>Horário de atendimento</Label><Input value={form.business_hours ?? ""} onChange={(e) => set("business_hours", e.target.value)} /></div>
              <div><Label>Texto "sobre" do rodapé</Label><Textarea rows={3} value={form.footer_about ?? ""} onChange={(e) => set("footer_about", e.target.value)} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors">
          <Card>
            <CardHeader><CardTitle>Cores</CardTitle><CardDescription>Aplicadas em todo o site em tempo real</CardDescription></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {([
                ["color_primary", "Primária"],
                ["color_primary_dark", "Primária escura (hover)"],
                ["color_secondary", "Secundária"],
                ["color_background", "Fundo"],
                ["color_foreground", "Texto principal"],
                ["color_dark", "Escura (rodapé/topbar)"],
              ] as const).map(([k, label]) => (
                <div key={k}>
                  <Label>{label}</Label>
                  <div className="flex gap-2">
                    <Input type="color" className="w-16 p-1 h-10" value={form[k] ?? "#000000"} onChange={(e) => set(k, e.target.value)} />
                    <Input value={form[k] ?? ""} onChange={(e) => set(k, e.target.value)} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fonts">
          <Card>
            <CardHeader><CardTitle>Fontes</CardTitle><CardDescription>Fontes Google carregadas automaticamente</CardDescription></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {([["font_display", "Fonte de títulos"], ["font_body", "Fonte do corpo"]] as const).map(([k, label]) => (
                <div key={k}>
                  <Label>{label}</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form[k] ?? ""} onChange={(e) => set(k, e.target.value)}>
                    {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: form[k] ?? undefined }}>Prévia: The quick brown fox — 123</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader><CardTitle>Contato</CardTitle><CardDescription>Telefone, WhatsApp, e-mail, endereço e mapa</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Telefone (exibição)</Label><Input value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} /></div>
              <div><Label>WhatsApp (apenas números com DDI, ex: 5511999999999)</Label><Input value={form.whatsapp ?? ""} onChange={(e) => set("whatsapp", e.target.value)} /></div>
              <div><Label>E-mail</Label><Input type="email" value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} /></div>
              <div><Label>Endereço</Label><Input value={form.address ?? ""} onChange={(e) => set("address", e.target.value)} /></div>
              <div><Label>URL do mapa (Google Maps embed)</Label><Input placeholder="https://www.google.com/maps/embed?..." value={form.map_embed_url ?? ""} onChange={(e) => set("map_embed_url", e.target.value)} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader><CardTitle>SEO</CardTitle><CardDescription>Metadados para buscadores e redes sociais</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Título (title)</Label><Input value={form.seo_title ?? ""} onChange={(e) => set("seo_title", e.target.value)} /></div>
              <div><Label>Descrição (meta description)</Label><Textarea rows={3} value={form.seo_description ?? ""} onChange={(e) => set("seo_description", e.target.value)} /></div>
              <div><Label>Palavras-chave (separadas por vírgula)</Label><Input value={form.seo_keywords ?? ""} onChange={(e) => set("seo_keywords", e.target.value)} /></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
