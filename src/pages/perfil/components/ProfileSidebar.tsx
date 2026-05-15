import { useState } from "react";
import type { EstudantePerfil } from "@/mocks/perfil";

interface ProfileSidebarProps {
  perfil: EstudantePerfil;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "visao-geral", label: "Visão Geral", icon: "ri-user-line" },
  { id: "portfolio", label: "Portfólio", icon: "ri-folder-3-line" },
  { id: "candidaturas", label: "Candidaturas", icon: "ri-briefcase-line" },
  { id: "editar", label: "Editar Perfil", icon: "ri-edit-line" },
];

export default function ProfileSidebar({ perfil, activeTab, onTabChange }: ProfileSidebarProps) {
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">
      {/* Profile card */}
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
        {/* Cover */}
        <div className="h-24 relative overflow-hidden">
          <img
            src={perfil.coverImage}
            alt="Capa"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Avatar */}
        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-10 mb-3">
            <div className="relative">
              <img
                src={perfil.avatar}
                alt={perfil.name}
                className="w-20 h-20 rounded-2xl object-cover object-top border-4 border-white"
              />
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <button
              onClick={handleShare}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#E8501A] hover:text-[#E8501A] transition-colors cursor-pointer"
            >
              <i className="ri-share-line text-sm"></i>
            </button>
          </div>

          <h2 className="font-bold text-[#1A1A2E] text-base leading-tight">{perfil.name}</h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{perfil.headline}</p>

          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-map-pin-line text-gray-400 text-xs"></i>
            </div>
            <span className="text-xs text-gray-500">{perfil.province}, Angola</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-graduation-cap-line text-gray-400 text-xs"></i>
            </div>
            <span className="text-xs text-gray-500">{perfil.anoAcademico} · {perfil.curso}</span>
          </div>
        </div>

        {/* Completeness */}
        <div className="px-5 pb-5 border-t border-gray-50 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#1A1A2E]">Perfil completo</span>
            <span className="text-xs font-bold text-[#E8501A]">{perfil.completeness}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E8501A] to-[#F97316] rounded-full transition-all duration-700"
              style={{ width: `${perfil.completeness}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">Adiciona projectos para chegar a 100%</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Estatísticas</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Candidaturas", value: perfil.stats.candidaturas, icon: "ri-send-plane-line", color: "text-[#E8501A]", bg: "bg-orange-50" },
            { label: "Visualizações", value: perfil.stats.visualizacoes, icon: "ri-eye-line", color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Guardadas", value: perfil.stats.guardadas, icon: "ri-bookmark-line", color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Entrevistas", value: perfil.stats.entrevistas, icon: "ri-calendar-check-line", color: "text-violet-600", bg: "bg-violet-50" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-xl p-3`}>
              <div className={`w-7 h-7 flex items-center justify-center`}>
                <i className={`${stat.icon} ${stat.color} text-base`}></i>
              </div>
              <p className={`text-xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all cursor-pointer ${
              index !== tabs.length - 1 ? "border-b border-gray-50" : ""
            } ${
              activeTab === tab.id
                ? "bg-orange-50 text-[#E8501A]"
                : "text-[#374151] hover:bg-gray-50"
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className={`${tab.icon} text-base`}></i>
            </div>
            <span className="text-sm font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="ml-auto w-1.5 h-5 flex items-center justify-center">
                <i className="ri-arrow-right-s-line text-sm"></i>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Interests */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Áreas de Interesse</h3>
        <div className="flex flex-wrap gap-2">
          {perfil.areasInteresse.map((area) => (
            <span key={area} className="text-xs px-3 py-1.5 bg-orange-50 text-[#E8501A] rounded-full font-medium">
              {area}
            </span>
          ))}
        </div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-3">Habilidades</h3>
        <div className="flex flex-wrap gap-1.5">
          {perfil.habilidades.map((skill) => (
            <span key={skill} className="text-xs px-2.5 py-1 bg-gray-100 text-[#374151] rounded-lg font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Share toast */}
      {showShareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1A2E] text-white text-sm px-5 py-3 rounded-xl z-50 animate-fade-in">
          <div className="flex items-center gap-2">
            <i className="ri-check-line text-green-400"></i>
            Link do perfil copiado!
          </div>
        </div>
      )}
    </aside>
  );
}
