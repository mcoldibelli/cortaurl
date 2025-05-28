import type { ShortenUrlResponse } from "../api/urlApi";

export default function HeroSection({ onShorten, isLoading, shortened, copiedUrl, onCopy, isAuthenticated }: { 
    onShorten: (url: string) => Promise<void>;
    isLoading: boolean;
    shortened: ShortenUrlResponse | null;
    copiedUrl: string | null;
    onCopy: (url: string) => void;
    isAuthenticated: boolean;
}) {
    return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 py-8 sm:py-12 md:py-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {isAuthenticated ? "Encurtador de URL" : "Encurte seus links em segundos"}
                </h1>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    {isAuthenticated 
                        ? "Crie links curtos e fáceis de compartilhar" 
                        : "Transforme URLs longas em links curtos e fáceis de compartilhar"}
                </p>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const input = form.elements.namedItem('url') as HTMLInputElement;
                    onShorten(input.value);
                }} className="space-y-4">
                    <div className="relative flex items-center">
                        <input
                            name="url"
                            className="input pr-[140px] h-14 rounded-full text-base sm:text-lg shadow-lg w-full border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                            placeholder="Cole sua URL aqui para encurtar"
                            type="text"
                            required
                            disabled={isLoading}
                        />
                        <div className="absolute right-2 inset-y-0 flex items-center">
                            <button 
                                type="submit" 
                                className="btn-primary h-10 px-4 text-sm rounded-full shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin mr-2"></div>
                                        <span className="hidden sm:inline">Encurtando...</span>
                                        <span className="sm:hidden">...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="hidden sm:inline">Encurtar URL</span>
                                        <span className="sm:hidden">Encurtar</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                {shortened && (
                    <div className="mt-6 sm:mt-8 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-primary-100 animate-slide-in">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xl sm:text-2xl text-success-600">✓</span>
                            <h3 className="text-lg sm:text-xl font-semibold text-success-700">URL Encurtada com Sucesso!</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <span className="block text-sm font-medium text-gray-700 mb-1">URL Original:</span>
                                <a 
                                    href={shortened.original_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm sm:text-base text-gray-600 hover:text-primary-600 break-all"
                                >
                                    {shortened.original_url}
                                </a>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-700 mb-1">URL Curta:</span>
                                <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-2 sm:p-3">
                                    <a 
                                        href={`/${shortened.short_code}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm sm:text-base text-primary-600 font-medium hover:underline flex-1 truncate"
                                    >
                                        {`${window.location.origin}/${shortened.short_code}`}
                                    </a>
                                    <button
                                        onClick={() => onCopy(`${window.location.origin}/${shortened.short_code}`)}
                                        className="p-1.5 sm:p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex-shrink-0"
                                        title={copiedUrl === `${window.location.origin}/${shortened.short_code}` ? "Copiado!" : "Copiar URL"}
                                    >
                                        {copiedUrl === `${window.location.origin}/${shortened.short_code}` ? "✓" : "📋"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {!isAuthenticated && (
                <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6">
                    {[
                        {
                            icon: "⚡",
                            title: "Rápido e Eficiente",
                            description: "Encurte seus links em segundos com nossa tecnologia otimizada"
                        },
                        {
                            icon: "🔒",
                            title: "Seguro e Confiável",
                            description: "Seus links são protegidos com as melhores práticas de segurança"
                        },
                        {
                            icon: "📊",
                            title: "Fácil de Gerenciar",
                            description: "Acompanhe e organize todos os seus links em um só lugar"
                        }
                    ].map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center transition-transform hover:-translate-y-1 shadow-sm"
                        >
                            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
    );
}