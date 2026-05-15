import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import DashboardSidebar from "./components/DashboardSidebar";
import VisaoGeralDashboard from "./components/VisaoGeralDashboard";
import VagasDashboard from "./components/VagasDashboard";
import CandidatosDashboard from "./components/CandidatosDashboard";
import PerfilEmpresaDashboard from "./components/PerfilEmpresaDashboard";

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("visao-geral");
  const [filtroVagaId, setFiltroVagaId] = useState<string | undefined>(undefined);
  
  const [companyData, setCompanyData] = useState<any>(null);
  const [vagas, setVagas] = useState<any[]>([]);
  const [candidatos, setCandidatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'empresa')) {
      navigate('/login');
      return;
    }

    if (user && user.role === 'empresa' && !companyData) {
      fetchDashboardData();
    }
  }, [user?.id, authLoading, companyData]);

  const fetchDashboardData = async () => {
    if (!companyData) setLoading(true);
    try {
      // 1. Fetch Company Profile
      const { data: company, error: cError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (cError) throw cError;
      setCompanyData(company);

      // 2. Fetch Vacancies
      const { data: internships, error: iError } = await supabase
        .from('internships')
        .select('*')
        .eq('company_id', user?.id);

      if (iError) throw iError;
      setVagas(internships || []);

      // 3. Fetch Applications (Candidatos)
      if (internships && internships.length > 0) {
        const internshipIds = internships.map(i => i.id);
        const { data: apps, error: aError } = await supabase
          .from('applications')
          .select(`
            *,
            students (*)
          `)
          .in('internship_id', internshipIds);

        if (aError) throw aError;
        
        // Transform apps to match the mock structure if needed, 
        // but for now let's just pass the real data
        setCandidatos(apps || []);
      }

    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerCandidatos = (vagaId: string) => {
    setFiltroVagaId(vagaId);
    setActiveTab("candidatos");
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#E8501A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500 font-medium">A carregar dashboard...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const novosTotal = candidatos.filter((c) => c.status === "Novo" || c.status === "Pendente").length;


  const renderTab = () => {
    switch (activeTab) {
      case "visao-geral":
        return (
          <VisaoGeralDashboard
            empresa={companyData}
            vagas={vagas}
            candidatos={candidatos}
            onTabChange={setActiveTab}
          />
        );
      case "vagas":
        return (
          <VagasDashboard
            vagas={vagas}
            onVerCandidatos={handleVerCandidatos}
            onRefresh={fetchDashboardData}
          />
        );
      case "candidatos":
        return (
          <CandidatosDashboard
            candidatos={candidatos}
            vagas={vagas}
            filtroVagaId={filtroVagaId}
          />
        );
      case "perfil":
        return <PerfilEmpresaDashboard empresa={companyData} />;
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
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#E8501A] to-[#C73E0C]">
              <i className="ri-briefcase-4-fill text-white text-sm"></i>
            </div>
            <span className="font-bold text-base text-[#1A1A2E]">
              Estagia<span className="text-[#E8501A]">Angola</span>
            </span>
            <span className="text-xs bg-orange-50 text-[#E8501A] border border-orange-100 px-2.5 py-1 rounded-full font-medium ml-1 hidden sm:inline-block">Empresa</span>
          </div>

          <div className="flex items-center gap-3">
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

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-xl transition-colors border-none bg-transparent"
              >
                <div className="w-8 h-8 rounded-xl bg-[#E8501A] flex items-center justify-center text-white font-bold overflow-hidden border border-gray-100">
                  {companyData.logo_url ? (
                    <img src={companyData.logo_url} alt={companyData.name} className="w-full h-full object-cover" />
                  ) : (
                    companyData.name[0]
                  )}
                </div>
                <span className="text-sm font-medium text-[#1A1A2E] hidden sm:block">{companyData.name}</span>
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`ri-arrow-down-s-line text-gray-400 text-sm transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}></i>
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-gray-100 shadow-2xl z-[100] py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Acedeste como</p>
                    <p className="text-xs font-bold text-[#1A1A2E] truncate">{companyData.name}</p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab("perfil"); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#374151] hover:bg-gray-50 transition-colors"
                  >
                    <i className="ri-user-settings-line text-[#E8501A]"></i>
                    Definições do Perfil
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#374151] hover:bg-gray-50 transition-colors">
                    <i className="ri-question-line text-[#E8501A]"></i>
                    Centro de Ajuda
                  </button>
                  <div className="h-px bg-gray-50 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold"
                  >
                    <i className="ri-logout-box-r-line"></i>
                    Terminar Sessão
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <DashboardSidebar
              empresa={companyData}
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

