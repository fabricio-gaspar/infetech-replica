import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, LogIn, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
  head: () => ({ meta: [{ title: "Acesso ao Painel — Admin" }, { name: "robots", content: "noindex" }] }),
});

const schema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(128),
});

function AdminLoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/admin" });
  }, [loading, user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      const errs: any = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email: parsed.data.email, password: parsed.data.password });
    setSubmitting(false);
    if (error) {
      toast.error("Não foi possível entrar. Verifique e-mail e senha.");
      return;
    }
    toast.success("Bem-vindo!");
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-100 via-white to-orange-50 p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-3 h-3"/> Voltar para o site
        </Link>
        <Card className="border-slate-200 shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded bg-primary text-primary-foreground grid place-items-center font-black">W</div>
              <div>
                <CardTitle>Painel Administrativo</CardTitle>
                <CardDescription>Acesso restrito à equipe</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={submitting} />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={submitting} />
                {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <LogIn className="w-4 h-4 mr-2"/>}
                Entrar
              </Button>
              <p className="text-[11px] text-center text-muted-foreground">
                Ainda não tem conta?{" "}
                <Link to="/auth" className="text-primary hover:underline">Criar conta</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
