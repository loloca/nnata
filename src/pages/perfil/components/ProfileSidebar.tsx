import { useState } from "react";

interface ProfileSidebarProps {
  perfil: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: "estudante" | "empresa";
}

export default function ProfileSidebar({ perfil, activeTab, onTabChange, role }: ProfileSidebarProps) {
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  const studentTabs = [
    { id: "visao-geral", label: "Visão Geral", icon: "ri-user-line" },
    { id: "portfolio", label: "Portfólio", icon: "ri-folder-3-line" },
    { id: "candidaturas", label: "Candidaturas", icon: "ri-briefcase-line" },
    { id: "editar", label: "Editar Perfil", icon: "ri-edit-line" },
  ];

  const companyTabs = [
    { id: "visao-geral", label: "Visão Geral", icon: "ri-dashboard-line" },
    { id: "vagas", label: "As Minhas Vagas", icon: "ri-list-check" },
    { id: "editar", label: "Perfil da Empresa", icon: "ri-building-line" },
  ];

  const currentTabs = role === "estudante" ? studentTabs : companyTabs;

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">
      {/* Profile card */}
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        {/* Cover */}
        <div className="h-24 relative overflow-hidden bg-gradient-to-br from-[#1A1A2E] to-[#E8501A]">
          {perfil.cover_url && (
            <img
              src={perfil.cover_url}
              alt="Capa"
              className="w-full h-full object-cover object-top"
            />
          )}
        </div>

        {/* Avatar */}
        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-10 mb-3">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-[#E8501A] flex items-center justify-center border-4 border-white text-white text-3xl font-bold overflow-hidden">
                {perfil.avatar_url || perfil.logo_url ? (
                  <img
                    src={perfil.avatar_url || perfil.logo_url}
                    alt={perfil.full_name || perfil.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  (perfil.full_name || perfil.name || "?")[0]
                )}
              </div>
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <button
              onClick={handleShare}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#E8501A] hover:text-[#E8501A] transition-colors cursor-pointer"
            >
              <i className="ri-share-line text-sm"></i>
            </button>
          </div>

          <h2 className="font-bold text-[#1A1A2E] text-base leading-tight">
            {role === "estudante" ? perfil.full_name : perfil.name}
          </h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            {role === "estudante" ? perfil.course : perfil.sector}
          </p>

          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-map-pin-line text-gray-400 text-xs"></i>
            </div>
            <span className="text-xs text-gray-500">{perfil.province || "Angola"}</span>
          </div>
        </div>

        {/* Completeness */}
        <div className="px-5 pb-5 border-t border-gray-50 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#1A1A2E]">Perfil completo</span>
            <span className="text-xs font-bold text-[#E8501A]">85%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E8501A] to-[#F97316] rounded-full transition-all duration-700"
              style={{ width: `85%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {currentTabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all cursor-pointer ${
              index !== currentTabs.length - 1 ? "border-b border-gray-50" : ""
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

      {/* Student Specific Skills */}
      {role === "estudante" && perfil.areas_interest && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Interesses</h3>
          <div className="flex flex-wrap gap-2">
            {perfil.areas_interest.map((area: string) => (
              <span key={area} className="text-xs px-3 py-1.5 bg-orange-50 text-[#E8501A] rounded-full font-medium">
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Company Specific Stats */}
      {role === "empresa" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Estatísticas Rápidas</h3>
          <div className="space-y-3">
             <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Vagas Publicadas</span>
                <span className="text-xs font-bold text-[#1A1A2E]">0</span>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Candidatos Totais</span>
                <span className="text-xs font-bold text-[#1A1A2E]">0</span>
             </div>
          </div>
        </div>
      )}

      {/* Share toast */}
      {showShareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1A2E] text-white text-sm px-5 py-3 rounded-xl z-50 animate-fade-in shadow-xl">
          <div className="flex items-center gap-2">
            <i className="ri-check-line text-green-400"></i>
            Link copiado com sucesso!
          </div>
        </div>
      )}
    </aside>
  );
}

