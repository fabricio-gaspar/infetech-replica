import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type SiteSettings = Tables<"site_settings">;
export type NavItem = Tables<"nav_items">;
export type SocialLink = Tables<"social_links">;

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async (): Promise<SiteSettings | null> => {
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 30_000,
  });
}

export function useNavItems() {
  return useQuery({
    queryKey: ["nav-items"],
    queryFn: async (): Promise<NavItem[]> => {
      const { data, error } = await supabase.from("nav_items").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 30_000,
  });
}

export function useSocialLinks() {
  return useQuery({
    queryKey: ["social-links"],
    queryFn: async (): Promise<SocialLink[]> => {
      const { data, error } = await supabase.from("social_links").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 30_000,
  });
}
