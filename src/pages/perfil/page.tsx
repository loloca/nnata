import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import ProfileSidebar from "./components/ProfileSidebar";
import VisaoGeralTab from "./components/VisaoGeralTab";
import PortfolioTab from "./components/PortfolioTab";
import CandidaturasTab from "./components/CandidaturasTab";
import EditarPerfilTab from "./components/EditarPerfilTab";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export default function PerfilPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("visao-geral");
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [candidaturas, setCandidaturas] = useState<any[]>([]);
  const [projetos, setProjetos] = useState<any[]>([]);
  const [loadingTabs, setLoadingTabs] = useState(false);

  useEffect(() => {
    if (authLoading || !user) return;

    const fetchData = async () => {
      setLoading(true);
      const table = user.role === "estudante" ? "students" : "companies";
      
      // Fetch Profile
      const { data: pData, error: pError } = await supabase
        .from(table)
        .select("*")
        .eq("id", user.id)
        .single();

      if (!pError && pData) {
        setProfileData(pData);
      }

      // Fetch Student Specific Data
      if (user.role === "estudante") {
        setLoadingTabs(true);
        
        // Fetch Applications
        const { data: appData } = await supabase
          .from('applications')
          .select('*, internships(*, companies(*))')
          .eq('student_id', user.id);
        
        if (appData) {
          setCandidaturas(appData.map(app => ({
            id: app.id,
            vagaTitle: app.internships?.title,
            company: app.internships?.companies?.name,
            companyLogo: app.internships?.companies?.logo_url,
            status: app.status,
            appliedDate: new Date(app.applied_at).toLocaleDateString('pt-AO'),
            area: app.internships?.area,
            province: app.internships?.province,
            type: app.internships?.type,
            feedback: app.feedback
          })));
        }

        // Fetch Projects
        const { data: projData } = await supabase
          .from('projects')
          .select('*')
          .eq('student_id', user.id);
        
        if (projData) {
          setProjetos(projData.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            tags: p.technologies || [],
            github: p.github_url,
            link: p.live_url,
            image: p.image_url || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
            date: new Date(p.created_at).toLocaleDateString('pt-AO', { month: 'short', year: 'numeric' }),
            featured: p.is_featured
          })));
        }
        setLoadingTabs(false);
      }

      setLoading(false);
    };

    fetchData();
  }, [user, authLoading]);

  if (authLoading || loading || loadingTabs) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#E8501A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">A preparar o teu perfil...</p>
        </div>
      </div>
    );
  }

  if (!user || !profileData) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1A1A2E]">Perfil não encontrado</h2>
            <p className="text-gray-500 mt-2">Ocorreu um erro ao carregar os dados.</p>
            <Link to="/" className="mt-4 inline-block text-[#E8501A] font-semibold">Voltar ao início</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderTab = () => {
    // Para Estudantes
    if (user.role === "estudante") {
      switch (activeTab) {
        case "visao-geral":
          return (
            <VisaoGeralTab
              perfil={profileData}
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
          return <EditarPerfilTab perfil={profileData} />;
        default:
          return null;
      }
    }

    // Para Empresas
    if (user.role === "empresa") {
      switch (activeTab) {
        case "visao-geral":
          return (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-4">Bem-vindo, {profileData.name}</h3>
              <p className="text-gray-600">Este é o painel da sua empresa. Aqui poderá gerir as suas vagas e candidaturas.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                  <p className="text-sm text-[#E8501A] font-semibold uppercase tracking-wider mb-1">Vagas Activas</p>
                  <p className="text-3xl font-bold text-[#1A1A2E]">0</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-1">Candidaturas</p>
                  <p className="text-3xl font-bold text-[#1A1A2E]">0</p>
                </div>
                <div className="bg-violet-50 p-6 rounded-2xl border border-violet-100">
                  <p className="text-sm text-violet-600 font-semibold uppercase tracking-wider mb-1">Visualizações</p>
                  <p className="text-3xl font-bold text-[#1A1A2E]">0</p>
                </div>
              </div>
            </div>
          );
        case "vagas":
          return <div className="bg-white rounded-2xl p-8 border border-gray-100">Gestão de Vagas em breve...</div>;
        case "editar":
          return <EditarPerfilTab perfil={profileData} />;
        default:
          return null;
      }
    }

    return null;
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
            <span className="text-white/70">{user.role === "estudante" ? "O meu Perfil" : "Painel da Empresa"}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{user.role === "estudante" ? "O meu Perfil" : profileData.name}</h1>
              <p className="text-sm text-white/50 mt-1">
                {user.role === "estudante" 
                  ? "Gere as tuas informações, portfólio e candidaturas" 
                  : "Gira a presença da sua empresa e encontre talentos"}
              </p>
            </div>
            {user.role === "estudante" && (
              <Link
                to="/vagas"
                className="flex items-center gap-2 bg-[#E8501A] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-search-line"></i>
                </div>
                Explorar Vagas
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <ProfileSidebar
            perfil={profileData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            role={user.role}
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

