import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import ProfileSidebar from "./components/ProfileSidebar";
import VisaoGeralTab from "./components/VisaoGeralTab";
import PortfolioTab from "./components/PortfolioTab";
import CandidaturasTab from "./components/CandidaturasTab";
import EditarPerfilTab from "./components/EditarPerfilTab";
import { perfilMock, projetosMock, candidaturasMock } from "@/mocks/perfil";

const tabComponents: Record<string, JSX.Element | null> = {};

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState("visao-geral");

  const perfil = perfilMock;
  const projetos = projetosMock;
  const candidaturas = candidaturasMock;

  const renderTab = () => {
    switch (activeTab) {
      case "visao-geral":
        return (
          <VisaoGeralTab
            perfil={perfil}
            projetos={projetos}
            candidaturas={candidaturas}
            onTabChange={setActiveTab}
          />
        );
      case "portfolio":
        return <PortfolioTab projetos={projetos} />;
      case "candidaturas":
        return <CandidaturasTab candidaturas={candidaturas} />;
      case "editar":
        return <EditarPerfilTab perfil={perfil} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />

      {/* Page header */}
      <div className="pt-20 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
            <Link to="/" className="hover:text-white/80 transition-colors cursor-pointer">Início</Link>
            <i className="ri-arrow-right-s-line text-white/30"></i>
            <span className="text-white/70">O meu Perfil</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">O meu Perfil</h1>
              <p className="text-sm text-white/50 mt-1">Gere as tuas informações, portfólio e candidaturas</p>
            </div>
            <Link
              to="/vagas"
              className="flex items-center gap-2 bg-[#E8501A] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line"></i>
              </div>
              Explorar Vagas
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <ProfileSidebar
            perfil={perfil}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <main className="flex-1 min-w-0">
            {renderTab()}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
