import { useState } from "react";
import DashboardSidebar from "./components/DashboardSidebar";
import VisaoGeralDashboard from "./components/VisaoGeralDashboard";
import VagasDashboard from "./components/VagasDashboard";
import CandidatosDashboard from "./components/CandidatosDashboard";
import PerfilEmpresaDashboard from "./components/PerfilEmpresaDashboard";
import { empresaMock, vagasEmpresaMock, candidatosMock } from "@/mocks/empresa";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("visao-geral");
  const [filtroVagaId, setFiltroVagaId] = useState<string | undefined>(undefined);

  const novosTotal = candidatosMock.filter((c) => c.status === "Novo").length;

  const handleVerCandidatos = (vagaId: string) => {
    setFiltroVagaId(vagaId);
    setActiveTab("candidatos");
  };

  const renderTab = () => {
    switch (activeTab) {
      case "visao-geral":
        return (
          <VisaoGeralDashboard
            empresa={empresaMock}
            vagas={vagasEmpresaMock}
            candidatos={candidatosMock}
            onTabChange={setActiveTab}
          />
        );
      case "vagas":
        return (
          <VagasDashboard
            vagas={vagasEmpresaMock}
            onVerCandidatos={handleVerCandidatos}
          />
        );
      case "candidatos":
        return (
          <CandidatosDashboard
            candidatos={candidatosMock}
            vagas={vagasEmpresaMock}
            filtroVagaId={filtroVagaId}
          />
        );
      case "perfil":
        return <PerfilEmpresaDashboard empresa={empresaMock} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F8F7F4]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Dashboard top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-16 flex items-center px-4 md:px-8">
        <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#E8501A] to-[#C73E0C]">
              <i className="ri-briefcase-4-fill text-white text-sm"></i>
            </div>
            <span className="font-bold text-base text-[#1A1A2E]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Estagia<span className="text-[#E8501A]">Angola</span>
            </span>
            <span className="text-xs bg-orange-50 text-[#E8501A] border border-orange-100 px-2.5 py-1 rounded-full font-medium ml-1 hidden sm:inline-block">Dashboard</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <div className="relative">
              <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-[#374151] transition-colors cursor-pointer">
                <i className="ri-notification-3-line text-base"></i>
              </button>
              {novosTotal > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-[#E8501A] text-white text-xs font-bold rounded-full">
                  {novosTotal}
                </span>
              )}
            </div>

            {/* Company avatar */}
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-xl transition-colors">
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-gray-100">
                <img src={empresaMock.logo} alt={empresaMock.name} className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-sm font-medium text-[#1A1A2E] hidden sm:block">{empresaMock.name}</span>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-down-s-line text-gray-400 text-sm"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="pt-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <DashboardSidebar
              empresa={empresaMock}
              activeTab={activeTab}
              onTabChange={(tab) => {
                setFiltroVagaId(undefined);
                setActiveTab(tab);
              }}
              novosTotal={novosTotal}
            />
            <main className="flex-1 min-w-0">
              {renderTab()}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
