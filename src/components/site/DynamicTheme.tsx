import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

/**
 * Injects dynamic CSS variables (colors + fonts) from site_settings into <html>.
 * Also loads the chosen Google Fonts on demand.
 */
export function DynamicTheme() {
  const { data } = useSiteSettings();

  useEffect(() => {
    if (!data || typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--primary", data.color_primary);
    root.style.setProperty("--primary-dark", data.color_primary_dark);
    root.style.setProperty("--secondary", data.color_secondary);
    root.style.setProperty("--background", data.color_background);
    root.style.setProperty("--foreground", data.color_foreground);
    root.style.setProperty("--dark", data.color_dark);

    // Font families
    document.body.style.setProperty("font-family", `"${data.font_body}", system-ui, sans-serif`);

    // Load Google fonts dynamically
    const families = Array.from(new Set([data.font_display, data.font_body])).filter(Boolean);
    const linkId = "dyn-google-fonts";
    let link = document.getElementById(linkId) as HTMLLinkElement | null;
    const url = `https://fonts.googleapis.com/css2?${families
      .map((f) => `family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@300;400;500;600;700;800;900`)
      .join("&")}&display=swap`;
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = url;

    // Favicon
    if (data.favicon_url) {
      let fav = document.querySelector<HTMLLinkElement>("link[rel='icon']");
      if (!fav) {
        fav = document.createElement("link");
        fav.rel = "icon";
        document.head.appendChild(fav);
      }
      fav.href = data.favicon_url;
    }
  }, [data]);

  return null;
}
