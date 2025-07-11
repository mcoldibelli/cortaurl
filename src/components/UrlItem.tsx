import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface UrlList {
  short_code: string;
  original_url: string;
  created_at: string;
  expires_at?: string;
  created_by?: string;
}

interface UrlItemProps {
  url: UrlList;
  onCopy: (url: string) => void;
  copiedUrl: string | null;
  onDelete?: (short_code: string) => void;
}

const UrlItem = ({ url, onCopy, copiedUrl, onDelete }: UrlItemProps) => {
  const fullShortUrl = `${window.location.origin}/${url.short_code}`;
  const isCopied = copiedUrl === fullShortUrl;

  return (
    <li className="animate-slide-in bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:border-primary-500 hover:shadow-sm transition-all">
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <a 
            href={`/${url.short_code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base text-primary-600 font-semibold hover:underline truncate"
          >
            {fullShortUrl}
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onCopy(fullShortUrl)}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex-shrink-0"
              title={isCopied ? "Copiado!" : "Copiar URL"}
            >
              {isCopied ? "✓" : "📋"}
            </button>
            {onDelete && (
              <button
                onClick={() => onDelete(url.short_code)}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                title="Excluir URL"
                aria-label="Excluir URL"
              >
                <span role="img" aria-label="Excluir">🗑️</span>
              </button>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs sm:text-sm text-gray-600 truncate" title={url.original_url}>
            {url.original_url}
          </p>
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-1">📅</span>
            {format(new Date(url.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          </div>
        </div>
      </div>
    </li>
  );
};

export default UrlItem;
