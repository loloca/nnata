import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Vaga } from "@/mocks/vagas";
import { useAuth } from "@/hooks/useAuth";

const companySlugMap: Record<string, string> = {
  "Unitel": "unitel",
  "Sonangol": "sonangol",
  "BAI": "bai",
  "BFA": "bai",
  "Multicaixa": "unitel",
  "TPA": "unitel",
};

const typeColors: Record<string, string> = {
  Presencial: "bg-green-100 text-green-700",
  Híbrido: "bg-amber-100 text-amber-700",
  Remoto: "bg-indigo-100 text-indigo-700",
};

interface VagaDetailProps {
  vaga: Vaga | null;
  onClose: () => void;
}

export default function VagaDetail({ vaga, onClose }: VagaDetailProps) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/candidatura/${vaga?.id}` } });
      return;
    }
    
    if (user?.role === "empresa") {
      return;
    }
    
    navigate(`/candidatura/${vaga?.id}`);
  };

  if (!vaga) {
    return (
      <div className="hidden lg:flex flex-col items-center justify-center h-full text-center px-10 py-20 bg-white rounded-2xl border border-gray-100">
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-orange-50 mb-4">
          <i className="ri-briefcase-line text-[#E8501A] text-3xl"></i>
        </div>
        <h3 className="font-semibold text-[#1A1A2E] text-lg mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Selecciona uma vaga
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          Clica numa vaga à esquerda para ver os detalhes completos e candidatar-te.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0 overflow-hidden">
              <img
                src={vaga.companyLogo}
                alt={vaga.company}
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h2
                className="font-bold text-[#1A1A2E] text-lg leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {vaga.title}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">{vaga.company} · {vaga.sector}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 cursor-pointer flex-shrink-0"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          {vaga.featured && (
            <span className="text-xs font-semibold uppercase tracking-wide bg-[#E8501A]/10 text-[#E8501A] px-2.5 py-1 rounded-full">
              Destaque
            </span>
          )}
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColors[vaga.type]}`}>
            {vaga.type}
          </span>
          <span className="text-xs bg-orange-50 text-[#E8501A] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            <i className="ri-layout-grid-line text-[10px]"></i>{vaga.area}
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1">
            <i className="ri-map-pin-line text-[10px]"></i>{vaga.province}
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1">
            <i className="ri-time-line text-[10px]"></i>{vaga.duration}
          </span>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <i className="ri-user-line"></i> {vaga.applicants} candidatos
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-calendar-line"></i>
            {vaga.postedDaysAgo === 0 ? "Publicado hoje" : vaga.postedDaysAgo === 1 ? "Publicado ontem" : `Publicado há ${vaga.postedDaysAgo} dias`}
          </span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Description */}
        <div>
          <h4 className="font-semibold text-[#1A1A2E] text-sm mb-3 flex items-center gap-2">
            <i className="ri-file-text-line text-[#E8501A]"></i> Descrição
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">{vaga.description}</p>
        </div>

        {/* Requirements */}
        <div>
          <h4 className="font-semibold text-[#1A1A2E] text-sm mb-3 flex items-center gap-2">
            <i className="ri-checkbox-circle-line text-[#E8501A]"></i> Requisitos
          </h4>
          <ul className="space-y-2">
            {vaga.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-arrow-right-s-line text-[#E8501A] text-base"></i>
                </div>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div>
          <h4 className="font-semibold text-[#1A1A2E] text-sm mb-3 flex items-center gap-2">
            <i className="ri-gift-line text-[#E8501A]"></i> Benefícios
          </h4>
          <div className="flex flex-wrap gap-2">
            {vaga.benefits.map((ben, i) => (
              <span key={i} className="text-xs bg-green-50 text-green-700 font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <i className="ri-check-line text-green-600 text-[10px]"></i>{ben}
              </span>
            ))}
          </div>
        </div>

        {/* Company card */}
        <div className="bg-[#FAFAFA] rounded-xl p-4">
          <h4 className="font-semibold text-[#1A1A2E] text-sm mb-3 flex items-center gap-2">
            <i className="ri-building-2-line text-[#E8501A]"></i> Sobre a Empresa
          </h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-100 flex-shrink-0 overflow-hidden">
              <img src={vaga.companyLogo} alt={vaga.company} className="w-8 h-8 object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-[#1A1A2E]">{vaga.company}</p>
              <p className="text-xs text-gray-400">{vaga.sector} · {vaga.province}</p>
            </div>
            {companySlugMap[vaga.company] && (
              <Link
                to={`/empresa/${companySlugMap[vaga.company]}`}
                className="flex items-center gap-1 text-xs font-medium text-[#E8501A] hover:underline cursor-pointer whitespace-nowrap flex-shrink-0"
              >
                Ver perfil <i className="ri-arrow-right-s-line"></i>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 border-t border-gray-100 flex flex-col gap-3">
        {!isAuthenticated && (
          <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="ri-lock-line text-amber-600 text-sm"></i>
            </div>
            <p className="text-xs text-amber-700 leading-relaxed">
              Precisas de{" "}
              <Link to="/login" state={{ from: `/candidatura/${vaga.id}` }} className="font-semibold underline cursor-pointer">
                iniciar sessão
              </Link>{" "}
              para te candidatares a esta vaga.
            </p>
          </div>
        )}
        <div className="flex gap-3">
          <button
            onClick={() => setSaved(!saved)}
            className={`w-11 h-11 flex items-center justify-center rounded-xl border transition-all cursor-pointer flex-shrink-0 ${
              saved ? "bg-orange-50 border-[#E8501A] text-[#E8501A]" : "border-gray-200 text-gray-400 hover:border-[#E8501A] hover:text-[#E8501A]"
            }`}
          >
            <i className={saved ? "ri-bookmark-fill" : "ri-bookmark-line"}></i>
          </button>
          <button
            onClick={handleApply}
            disabled={isAuthenticated && user?.role === "empresa"}
            className={`flex-1 font-semibold py-2.5 rounded-xl transition-colors text-sm cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 ${
              isAuthenticated
                ? user?.role === "empresa"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#E8501A] hover:bg-[#C73E0C] text-white"
                : "bg-[#1A1A2E] hover:bg-[#2D2D44] text-white"
            }`}
          >
            <i className={isAuthenticated ? (user?.role === "empresa" ? "ri-error-warning-line" : "ri-send-plane-line") : "ri-lock-line"}></i>
            {isAuthenticated 
              ? user?.role === "empresa" 
                ? "Acesso para Estudantes" 
                : "Candidatar-me" 
              : "Entrar para Candidatar"}
          </button>
        </div>
      </div>
    </div>
  );
}
