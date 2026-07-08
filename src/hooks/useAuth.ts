import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, user: session?.user ?? null, loading };
}

export type AdminRole = "admin" | "editor" | null;

export function useUserRole(user: User | null | undefined) {
  return useQuery<AdminRole>({
    queryKey: ["user-role", user?.id ?? "anon"],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .in("role", ["admin", "editor"]);
      if (error || !data?.length) return null;
      if (data.some((r) => r.role === "admin")) return "admin";
      if (data.some((r) => r.role === "editor")) return "editor";
      return null;
    },
    enabled: !!user,
    staleTime: 60_000,
  });
}

export function useIsAdmin(user: User | null | undefined) {
  const { data: role, ...rest } = useUserRole(user);
  return { ...rest, data: role === "admin" };
}

export function useHasAdminAccess(user: User | null | undefined) {
  const { data: role, ...rest } = useUserRole(user);
  return { ...rest, data: role === "admin" || role === "editor", role };
}
