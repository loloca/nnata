import { Link } from "react-router-dom";

interface DashboardSidebarProps {
  empresa: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
  novosTotal: number;
}

const navItems = [
  { id: "visao-geral", label: "Visão Geral", icon: "ri-dashboard-line" },
  { id: "vagas", label: "Vagas", icon: "ri-briefcase-line" },
  { id: "candidatos", label: "Candidatos", icon: "ri-group-line" },
  { id: "perfil", label: "Perfil da Empresa", icon: "ri-building-2-line" },
];

export default function DashboardSidebar({ empresa, activeTab, onTabChange, novosTotal }: DashboardSidebarProps) {
  if (!empresa) return null;

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">
      {/* Company card */}
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
        <div className="h-20 relative overflow-hidden bg-gradient-to-r from-[#E8501A] to-[#F97316]">
          {empresa.cover_url && (
            <img src={empresa.cover_url} alt="Capa" className="w-full h-full object-cover object-top" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        <div className="px-5 pb-5">
          <div className="-mt-8 mb-3 flex items-end justify-between">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white bg-white flex-shrink-0 flex items-center justify-center">
              {empresa.logo_url ? (
                <img src={empresa.logo_url} alt={empresa.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-bold text-[#E8501A]">{empresa.name[0]}</span>
              )}
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2.5 py-1 rounded-full border border-emerald-100 whitespace-nowrap">
              Verificada
            </span>
          </div>
          <h2 className="font-bold text-[#1A1A2E] text-base">{empresa.name}</h2>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{empresa.sector}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-map-pin-line text-gray-400 text-xs"></i>
            </div>
            <span className="text-xs text-gray-500">{empresa.province}, Angola</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</p>
        </div>
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all cursor-pointer ${
              index !== navItems.length - 1 ? "border-b border-gray-50" : ""
            } ${
              activeTab === item.id
                ? "bg-orange-50 text-[#E8501A]"
                : "text-[#374151] hover:bg-gray-50"
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className={`${item.icon} text-base`}></i>
            </div>
            <span className="text-sm font-medium flex-1">{item.label}</span>
            {item.id === "candidatos" && novosTotal > 0 && (
              <span className="text-xs bg-[#E8501A] text-white font-bold px-2 py-0.5 rounded-full">
                {novosTotal}
              </span>
            )}
            {activeTab === item.id && (
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-s-line text-sm"></i>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Quick stats hint */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44] rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <i className="ri-lightbulb-line text-yellow-400"></i>
          <span className="text-xs font-bold uppercase tracking-wider">Dica Pro</span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          Mantenha o seu perfil actualizado para atrair os melhores talentos do IPAS.
        </p>
      </div>

      {/* Back to site */}
      <Link
        to="/"
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#E8501A] transition-colors cursor-pointer px-1"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <i className="ri-arrow-left-line text-sm"></i>
        </div>
        Voltar ao site
      </Link>
    </aside>
  );
}

