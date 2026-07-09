import { useEffect } from "react";
import { usePageSeo } from "./usePublicContent";

/** Injects DB-driven <title> and <meta name="description"> for the given path. */
export function usePageSeoInject(path: string) {
  const { data } = usePageSeo(path);
  useEffect(() => {
    if (!data) return;
    if (data.title) document.title = data.title;
    if (data.description) {
      let el = document.querySelector('meta[name="description"]');
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
      }
      el.setAttribute("content", data.description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && data.title) ogTitle.setAttribute("content", data.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && data.description) ogDesc.setAttribute("content", data.description);
  }, [data]);
}
