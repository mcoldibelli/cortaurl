import { useAuth } from "react-oidc-context";
import { useState, useEffect } from "react";
import { urlApi, type ShortenUrlResponse } from "../api/urlApi";
import HeroSection from "../components/HeroSection";
import UrlItem from "../components/UrlItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { useUrls } from "../hooks/useUrls";
import toast from "react-hot-toast";

export default function HomePage() {
  const auth = useAuth();
  const token = auth.user?.access_token;
  const [shortened, setShortened] = useState<ShortenUrlResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const { urls, setUrls, loading: isFetchingUrls, fetchUrls } = useUrls(token);

  useEffect(() => {
    if (auth.isAuthenticated && !auth.isLoading) {
      fetchUrls();
    }
  }, [auth.isAuthenticated, auth.isLoading, fetchUrls]);

  const handleShorten = async (urlToShorten: string) => {
    setShortened(null);
    if (!urlToShorten.trim()) {
      toast.error("Por favor, insira uma URL");
      return;
    }
    try {
      setIsLoading(true);
      const result = await urlApi.shortenUrl(token || "", urlToShorten);
      setShortened(result);
      if (auth.isAuthenticated) {
        await fetchUrls();
      }
      toast.success("URL encurtada com sucesso!");
    } catch (e: any) {
      toast.error(e.message || "Falha ao encurtar URL");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedUrl(text);
      setTimeout(() => setCopiedUrl(null), 2000);
      toast.custom((t) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-success-600">✓</span>
            <span>URL copiada para a área de transferência!</span>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar notificação"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ));
    } catch {
      toast.error("Falha ao copiar URL");
    }
  };

  if (auth.isLoading) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        onShorten={handleShorten}
        isLoading={isLoading}
        shortened={shortened}
        copiedUrl={copiedUrl}
        onCopy={copyToClipboard}
        isAuthenticated={auth.isAuthenticated}
      />

      {auth.isAuthenticated && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Suas URLs</h2>
              {urls.length > 0 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm self-start sm:self-auto">
                  {urls.length} {urls.length === 1 ? "URL" : "URLs"}
                </span>
              )}
            </div>

            {isFetchingUrls ? (
              <LoadingSpinner text="Carregando URLs..." />
            ) : urls.length > 0 ? (
              <ul className="space-y-3 sm:space-y-4">
                {urls.map((url) => (
                  <UrlItem key={url.id} url={url} onCopy={copyToClipboard} copiedUrl={copiedUrl} />
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 opacity-50">🔗</div>
                <p className="text-base sm:text-lg font-medium text-gray-900">Nenhuma URL encurtada ainda</p>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Comece encurtando sua primeira URL acima!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
