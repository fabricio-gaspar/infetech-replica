import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const s = 60_000;

export function useHeroBanners() {
  return useQuery({
    queryKey: ["public-hero"],
    queryFn: async () => {
      const { data, error } = await supabase.from("hero_banners").select("*").eq("is_published", true).order("order_index");
      if (error) throw error; return data ?? [];
    }, staleTime: s,
  });
}

export function usePublicServices(opts?: { featuredOnly?: boolean }) {
  return useQuery({
    queryKey: ["public-services", opts?.featuredOnly ?? false],
    queryFn: async () => {
      let q = supabase.from("services").select("*").eq("is_published", true).order("order_index");
      if (opts?.featuredOnly) q = q.eq("featured_on_home", true);
      const { data, error } = await q;
      if (error) throw error; return data ?? [];
    }, staleTime: s,
  });
}

export function usePublicTestimonials(opts?: { featuredOnly?: boolean }) {
  return useQuery({
    queryKey: ["public-testimonials", opts?.featuredOnly ?? false],
    queryFn: async () => {
      let q = supabase.from("testimonials").select("*").eq("is_published", true).order("order_index");
      if (opts?.featuredOnly) q = q.eq("featured_on_home", true);
      const { data, error } = await q;
      if (error) throw error; return data ?? [];
    }, staleTime: s,
  });
}

export function usePublicFaqs() {
  return useQuery({
    queryKey: ["public-faqs"],
    queryFn: async () => { const { data, error } = await supabase.from("faqs").select("*").eq("is_published", true).order("order_index"); if (error) throw error; return data ?? []; }, staleTime: s,
  });
}

export function usePublicTeam() {
  return useQuery({
    queryKey: ["public-team"],
    queryFn: async () => { const { data, error } = await supabase.from("team_members").select("*").eq("is_published", true).order("order_index"); if (error) throw error; return data ?? []; }, staleTime: s,
  });
}

export function usePublicPlans() {
  return useQuery({
    queryKey: ["public-plans"],
    queryFn: async () => { const { data, error } = await supabase.from("pricing_plans").select("*").eq("is_published", true).order("order_index"); if (error) throw error; return data ?? []; }, staleTime: s,
  });
}

export function usePublicPartners() {
  return useQuery({
    queryKey: ["public-partners"],
    queryFn: async () => { const { data, error } = await supabase.from("partners").select("*").eq("is_published", true).order("order_index"); if (error) throw error; return data ?? []; }, staleTime: s,
  });
}

export function usePublicBlog() {
  return useQuery({
    queryKey: ["public-blog"],
    queryFn: async () => { const { data, error } = await supabase.from("blog_posts").select("*").eq("status", "published").order("published_at", { ascending: false }); if (error) throw error; return data ?? []; }, staleTime: s,
  });
}

export function useWhatsAppConfig() {
  return useQuery({
    queryKey: ["public-whatsapp"],
    queryFn: async () => { const { data } = await supabase.from("whatsapp_config").select("*").eq("id", 1).maybeSingle(); return data; }, staleTime: s,
  });
}

export function useChatbotFlow() {
  return useQuery({
    queryKey: ["public-chatbot"],
    queryFn: async () => { const { data, error } = await supabase.from("chatbot_steps").select("*").eq("is_active", true).order("order_index"); if (error) throw error; return data ?? []; }, staleTime: s,
  });
}

export function useFooterColumns() {
  return useQuery({
    queryKey: ["public-footer"],
    queryFn: async () => { const { data, error } = await supabase.from("footer_columns").select("*").eq("is_published", true).order("order_index"); if (error) throw error; return (data ?? []).map((c: any) => ({ ...c, links: c.links ?? [] })); }, staleTime: s,
  });
}

export function usePageSeo(path: string) {
  return useQuery({
    queryKey: ["public-seo", path],
    queryFn: async () => { const { data } = await supabase.from("page_seo").select("*").eq("path", path).maybeSingle(); return data; }, staleTime: s,
  });
}

export function usePublicGallery() {
  return useQuery({
    queryKey: ["public-gallery"],
    queryFn: async () => { const { data, error } = await supabase.from("gallery_items").select("*").eq("is_published", true).order("order_index"); if (error) throw error; return data ?? []; }, staleTime: s,
  });
}
