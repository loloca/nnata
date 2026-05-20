import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se o utilizador já aceitou ou recusou os cookies
    const consent = localStorage.getItem('estagia_angola_cookies_consent');
    if (!consent) {
      // Pequeno atraso para não aparecer imediatamente no milissegundo em que a página carrega
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('estagia_angola_cookies_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('estagia_angola_cookies_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 animate-in slide-in-from-bottom-10 fade-in duration-500 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-gray-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pointer-events-auto">
        
        <div className="flex-1 flex gap-4">
          <div className="hidden sm:flex w-12 h-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#E8501A]">
            <i className="ri-cookie-line text-2xl"></i>
          </div>
          <div>
            <h3 className="font-bold text-[#1A1A2E] text-base mb-1.5 flex items-center gap-2">
              Valorizamos a tua privacidade
              <i className="ri-cookie-line text-[#E8501A] sm:hidden"></i>
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Utilizamos cookies para melhorar a tua experiência no EstagiaAngola, personalizar conteúdos e analisar o nosso tráfego. Ao continuares a navegar, concordas com a nossa política de cookies.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 flex-shrink-0">
          <button 
            onClick={handleDecline}
            className="px-6 py-2.5 rounded-xl border-2 border-gray-100 text-gray-500 font-bold text-sm hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Apenas Essenciais
          </button>
          <button 
            onClick={handleAccept}
            className="px-6 py-2.5 rounded-xl bg-[#1A1A2E] text-white font-bold text-sm hover:bg-[#2D2D44] shadow-lg transition-colors whitespace-nowrap"
          >
            Aceitar Todos
          </button>
        </div>

      </div>
    </div>
  );
}
