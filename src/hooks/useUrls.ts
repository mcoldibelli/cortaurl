import { useState, useCallback } from "react";
import { urlApi } from "../api/urlApi";
import toast from "react-hot-toast";
import type { UrlList } from "../components/UrlItem";

export function useUrls(token?: string) {
  const [urls, setUrls] = useState<UrlList[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUrls = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await urlApi.getUrls(token);
      setUrls(data.items || []);
    } catch (e: any) {
      toast.error(e.message || "Falha ao buscar URLs");
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { urls, setUrls, loading, fetchUrls };
}
