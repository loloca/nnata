import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { supabase } from "@/lib/supabase";

const typeColors: Record<string, string> = {
  Presencial: "bg-emerald-50 text-emerald-700",
  Híbrido: "bg-amber-50 text-amber-700",
  Remoto: "bg-violet-50 text-violet-700",
};

export default function EmpresaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState<any>(null);
  const [vagas, setVagas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"sobre" | "vagas" | "cultura" | "depoimentos">("sobre");
  const [seguindo, setSeguindo] = useState(false);
  const [fotoIdx, setFotoIdx] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmpresaData = async () => {
      if (!id) return;
      setLoading(true);

      // 1. Fetch Company
      const { data: compData, error: compError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single();

      if (!compError && compData) {
        // Map DB fields to UI expectations
        setEmpresa({
          ...compData,
          logo: compData.logo_url || "https://readdy.ai/api/search-image?query=company%20logo%20minimal%20abstract&width=80&height=80",
          cover: compData.cover_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
          verificada: true,
          rating: 5.0,
          colaboradores: "10-50",
          fundacao: "2020",
          totalEstagios: 42,
          vagasAtivas: 0, // Will update after vagas fetch
          taxaAprovacao: 95,
          dimensao: "Média",
          valores: [
            { title: "Inovação", icon: "ri-lightbulb-line", desc: "Sempre na vanguarda" },
            { title: "Qualidade", icon: "ri-medal-line", desc: "Excelência em tudo" },
            { title: "Pessoas", icon: "ri-group-line", desc: "O nosso maior activo" }
          ],
          fotos: [
            compData.cover_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200"
          ],
          cultura: compData.description || "Uma cultura focada em resultados e bem-estar dos colaboradores.",
          beneficiosEstagio: ["Subsídio de transporte", "Mentoria", "Certificado"],
          areaContratacao: [compData.sector || "Tecnologia"],
          depoimentos: [
            { name: "Carlos Silva", role: "Ex-estagiário", avatar: "https://readdy.ai/api/search-image?query=portrait%20young%20man%20professional&width=40&height=40", texto: "Uma experiência incrível de aprendizagem." }
          ]
        });

        // 2. Fetch Vacancies
        const { data: vData, error: vError } = await supabase
          .from('internships')
          .select('*')
          .eq('company_id', id)
          .eq('status', 'Activa');

        if (!vError && vData) {
          setVagas(vData);
          setEmpresa((prev: any) => ({ ...prev, vagasAtivas: vData.length }));
        }
      }
      setLoading(false);
    };

    fetchEmpresaData();
  }, [id]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#E8501A] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!empresa) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20">
          <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full mb-5">
            <i className="ri-building-2-line text-gray-400 text-3xl"></i>
          </div>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">Empresa não encontrada</h2>
          <p className="text-sm text-gray-500 mb-6">Esta empresa não existe ou o link está incorrecto.</p>
          <Link to="/vagas" className="bg-[#E8501A] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer">
            Ver todas as vagas
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: "sobre", label: "Sobre", icon: "ri-information-line" },
    { id: "vagas", label: `Vagas (${vagas.length})`, icon: "ri-briefcase-line" },
    { id: "cultura", label: "Cultura", icon: "ri-heart-line" },
    { id: "depoimentos", label: "Depoimentos", icon: "ri-chat-quote-line" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8F7F4]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />

      {/* ── COVER ── */}
      <div className="relative">
        <div className="h-72 md:h-96 overflow-hidden relative">
          <img
            src={empresa.cover}
            alt={empresa.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/60 via-transparent to-transparent"></div>
        </div>

        {/* Profile card overlay */}
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="relative -mt-20 md:-mt-24 bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xl shadow-gray-200/50">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Logo */}
              <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white bg-white flex-shrink-0 -mt-16 sm:-mt-20 shadow-lg">
                <img src={empresa.logo} alt={empresa.name} className="w-full h-full object-cover object-top" />
              </div>

              <div className="flex-1 min-w-0 sm:pt-0 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-xl md:text-2xl font-extrabold text-[#1A1A2E]">{empresa.name}</h1>
                      {empresa.verificada && (
                        <span className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
                          <i className="ri-shield-check-line"></i> Verificada
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{empresa.sector} · {empresa.province}, Angola</p>

                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="w-3.5 h-3.5 flex items-center justify-center">
                              <i className={`${i < Math.floor(empresa.rating) ? "ri-star-fill" : "ri-star-line"} text-amber-400 text-xs`}></i>
                            </div>
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-[#1A1A2E]">{empresa.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <i className="ri-group-line"></i> {empresa.colaboradores} colaboradores
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <i className="ri-calendar-line"></i> Fundada em {empresa.fundacao}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <i className="ri-briefcase-line"></i> {empresa.totalEstagios} estágios realizados
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => { setSeguindo((v) => !v); showToast(seguindo ? "Deixaste de seguir a empresa" : "A seguir a empresa!"); }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer whitespace-nowrap ${
                        seguindo
                          ? "bg-orange-50 border-[#E8501A] text-[#E8501A]"
                          : "border-gray-200 text-gray-600 hover:border-[#E8501A] hover:text-[#E8501A]"
                      }`}
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className={seguindo ? "ri-bell-fill" : "ri-bell-line"}></i>
                      </div>
                      {seguindo ? "A seguir" : "Seguir"}
                    </button>
                    <Link
                      to={`/vagas`}
                      className="flex items-center gap-2 bg-[#E8501A] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-send-plane-line"></i>
                      </div>
                      Candidatar-me
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
              {[
                { label: "Vagas activas", value: empresa.vagasAtivas, icon: "ri-briefcase-line", color: "text-[#E8501A]" },
                { label: "Estágios realizados", value: empresa.totalEstagios, icon: "ri-award-line", color: "text-violet-600" },
                { label: "Taxa de aprovação", value: `${empresa.taxaAprovacao}%`, icon: "ri-check-double-line", color: "text-emerald-600" },
                { label: "Avaliação", value: `${empresa.rating}/5`, icon: "ri-star-line", color: "text-amber-600" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="w-8 h-8 flex items-center justify-center mx-auto mb-1">
                    <i className={`${s.icon} ${s.color} text-lg`}></i>
                  </div>
                  <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS + CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link to="/" className="hover:text-[#E8501A] transition-colors cursor-pointer">Início</Link>
          <i className="ri-arrow-right-s-line"></i>
          <Link to="/vagas" className="hover:text-[#E8501A] transition-colors cursor-pointer">Vagas</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-[#1A1A2E] font-medium">{empresa.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ── MAIN ── */}
          <div className="flex-1 min-w-0">
            {/* Tab bar */}
            <div className="bg-white rounded-2xl border border-gray-100 p-1.5 flex gap-1 mb-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex-1 justify-center ${
                    activeTab === tab.id
                      ? "bg-[#E8501A] text-white"
                      : "text-gray-500 hover:text-[#1A1A2E] hover:bg-gray-50"
                  }`}
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={tab.icon}></i>
                  </div>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── SOBRE ── */}
            {activeTab === "sobre" && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center"><i className="ri-information-line text-[#E8501A]"></i></div>
                    Sobre a {empresa.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{empresa.descricao}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                    {[
                      { icon: "ri-building-2-line", label: "Sector", value: empresa.sector },
                      { icon: "ri-group-line", label: "Dimensão", value: empresa.dimensao },
                      { icon: "ri-map-pin-line", label: "Sede", value: empresa.province + ", Angola" },
                      { icon: "ri-calendar-line", label: "Fundação", value: empresa.fundacao },
                      { icon: "ri-global-line", label: "Website", value: empresa.website.replace("https://", "") },
                      { icon: "ri-mail-line", label: "Email", value: empresa.email },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-2.5">
                        <div className="w-8 h-8 flex items-center justify-center bg-orange-50 rounded-lg flex-shrink-0">
                          <i className={`${item.icon} text-[#E8501A] text-sm`}></i>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400">{item.label}</p>
                          <p className="text-xs font-medium text-[#1A1A2E] mt-0.5 truncate">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Valores */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-[#1A1A2E] mb-4">Valores da Empresa</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {empresa.valores.map((v) => (
                      <div key={v.title} className="bg-orange-50/50 rounded-xl p-4 text-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-[#E8501A]/10 rounded-xl mx-auto mb-3">
                          <i className={`${v.icon} text-[#E8501A] text-xl`}></i>
                        </div>
                        <p className="font-semibold text-[#1A1A2E] text-sm">{v.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{v.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fotos */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-[#1A1A2E] mb-4">Galeria</h3>
                  <div className="relative rounded-xl overflow-hidden h-52 mb-3">
                    <img
                      src={empresa.fotos[fotoIdx]}
                      alt="Foto da empresa"
                      className="w-full h-full object-cover object-top transition-all duration-500"
                    />
                    <button
                      onClick={() => setFotoIdx((i) => (i - 1 + empresa.fotos.length) % empresa.fotos.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full cursor-pointer transition-colors"
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </button>
                    <button
                      onClick={() => setFotoIdx((i) => (i + 1) % empresa.fotos.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full cursor-pointer transition-colors"
                    >
                      <i className="ri-arrow-right-s-line"></i>
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {empresa.fotos.map((foto, i) => (
                      <button
                        key={i}
                        onClick={() => setFotoIdx(i)}
                        className={`flex-1 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${i === fotoIdx ? "border-[#E8501A]" : "border-transparent"}`}
                      >
                        <img src={foto} alt="" className="w-full h-full object-cover object-top" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── VAGAS ── */}
            {activeTab === "vagas" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#1A1A2E]">{vagas.length} vagas abertas</h3>
                  <span className="text-xs text-gray-400">Actualizado hoje</span>
                </div>
                {vagas.map((vaga) => (
                  <div key={vaga.id} className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 transition-all p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#1A1A2E] text-sm">{vaga.title}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColors[vaga.type] ?? "bg-gray-100 text-gray-600"}`}>{vaga.type}</span>
                          <span className="text-xs bg-orange-50 text-[#E8501A] px-2.5 py-1 rounded-full font-medium">{vaga.area}</span>
                          <span className="text-xs text-gray-400 flex items-center gap-1"><i className="ri-map-pin-line"></i>{vaga.province}</span>
                          <span className="text-xs text-gray-400 flex items-center gap-1"><i className="ri-time-line"></i>{vaga.duration}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><i className="ri-group-line"></i>{vaga.applicants_count || 0} candidatos</span>
                          <span className="flex items-center gap-1"><i className="ri-calendar-line"></i>Publicada em {new Date(vaga.created_at).toLocaleDateString('pt-AO')}</span>
                        </div>
                      </div>
                      <Link
                        to="/vagas"
                        className="flex items-center gap-1.5 bg-[#E8501A] text-white px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
                      >
                        <div className="w-3.5 h-3.5 flex items-center justify-center"><i className="ri-send-plane-line"></i></div>
                        Candidatar
                      </Link>
                    </div>
                  </div>
                ))}
                {vagas.length === 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
                    <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-3">
                      <i className="ri-briefcase-line text-gray-400 text-2xl"></i>
                    </div>
                    <p className="text-sm font-medium text-gray-500">Sem vagas abertas de momento</p>
                    <p className="text-xs text-gray-400 mt-1">Segue a empresa para seres notificado quando abrirem novas vagas</p>
                  </div>
                )}
              </div>
            )}

            {/* ── CULTURA ── */}
            {activeTab === "cultura" && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center"><i className="ri-heart-line text-[#E8501A]"></i></div>
                    Cultura & Ambiente
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{empresa.cultura}</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center"><i className="ri-gift-line text-[#E8501A]"></i></div>
                    Benefícios do Estágio
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {empresa.beneficiosEstagio.map((b, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl">
                        <div className="w-7 h-7 flex items-center justify-center bg-emerald-100 rounded-lg flex-shrink-0">
                          <i className="ri-check-line text-emerald-600 text-sm"></i>
                        </div>
                        <span className="text-sm text-[#374151] font-medium">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-[#1A1A2E] mb-4">Áreas de Contratação</h3>
                  <div className="flex flex-wrap gap-2">
                    {empresa.areaContratacao.map((area) => (
                      <span key={area} className="text-sm px-4 py-2 bg-orange-50 text-[#E8501A] rounded-full font-medium">{area}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── DEPOIMENTOS ── */}
            {activeTab === "depoimentos" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#1A1A2E]">{empresa.depoimentos.length} depoimentos de ex-estagiários</h3>
                </div>
                {empresa.depoimentos.map((dep, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-start gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-star-fill text-amber-400 text-sm"></i>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic mb-5">&ldquo;{dep.texto}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                        <img src={dep.avatar} alt={dep.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1A1A2E]">{dep.name}</p>
                        <p className="text-xs text-gray-400">{dep.role}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-6 text-center">
                  <p className="text-sm font-semibold text-[#1A1A2E] mb-1">Já estagiaste aqui?</p>
                  <p className="text-xs text-gray-500 mb-4">Partilha a tua experiência e ajuda outros estudantes a decidir</p>
                  <button
                    onClick={() => showToast("Funcionalidade disponível após login")}
                    className="text-sm font-medium bg-[#E8501A] text-white px-5 py-2.5 rounded-xl hover:bg-[#C73E0C] transition-colors cursor-pointer"
                  >
                    Escrever depoimento
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">
            {/* CTA card */}
            <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44] rounded-2xl p-6 text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-[#E8501A]/20 rounded-xl mx-auto mb-4">
                <i className="ri-briefcase-4-line text-[#E8501A] text-2xl"></i>
              </div>
              <h4 className="font-bold text-white text-sm mb-2">{empresa.vagasAtivas} vagas abertas</h4>
              <p className="text-xs text-white/60 mb-4 leading-relaxed">Candidata-te agora e faz parte da equipa {empresa.name}</p>
              <button
                onClick={() => setActiveTab("vagas")}
                className="w-full py-2.5 bg-[#E8501A] text-white rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer"
              >
                Ver vagas abertas
              </button>
              <button
                onClick={() => { setSeguindo((v) => !v); showToast(seguindo ? "Deixaste de seguir" : "A seguir a empresa!"); }}
                className={`w-full py-2.5 mt-2 rounded-xl text-sm font-medium transition-colors cursor-pointer border ${
                  seguindo ? "bg-white/10 border-white/20 text-white" : "border-white/20 text-white/70 hover:bg-white/10"
                }`}
              >
                {seguindo ? "A seguir" : "Seguir empresa"}
              </button>
            </div>

            {/* Quick info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Informações</h4>
              <div className="space-y-3">
                {[
                  { icon: "ri-building-2-line", label: "Sector", value: empresa.sector },
                  { icon: "ri-group-line", label: "Colaboradores", value: empresa.colaboradores },
                  { icon: "ri-map-pin-line", label: "Localização", value: empresa.province },
                  { icon: "ri-calendar-line", label: "Fundação", value: empresa.fundacao },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-orange-50 rounded-lg flex-shrink-0">
                      <i className={`${item.icon} text-[#E8501A] text-sm`}></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-xs font-medium text-[#1A1A2E]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={empresa.website}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-4 w-full py-2.5 border border-gray-200 text-[#374151] rounded-xl text-sm font-medium hover:border-[#E8501A] hover:text-[#E8501A] transition-colors cursor-pointer"
              >
                <div className="w-4 h-4 flex items-center justify-center"><i className="ri-external-link-line"></i></div>
                Visitar website
              </a>
            </div>

            {/* Other companies */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Outras Empresas</h4>
              <div className="flex flex-col gap-2">
                {[
                  { slug: "unitel", name: "Unitel", sector: "Telecomunicações", logo: "https://readdy.ai/api/search-image?query=telecom%20company%20abstract%20icon%20modern%20green%20signal%20waves%20clean%20white%20background%20minimal%20flat&width=40&height=40&seq=oe1&orientation=squarish" },
                  { slug: "sonangol", name: "Sonangol", sector: "Energia & Petróleo", logo: "https://readdy.ai/api/search-image?query=oil%20energy%20company%20abstract%20icon%20orange%20flame%20drop%20symbol%20clean%20white%20background%20minimal%20flat&width=40&height=40&seq=oe2&orientation=squarish" },
                  { slug: "bai", name: "BAI", sector: "Banca & Finanças", logo: "https://readdy.ai/api/search-image?query=investment%20bank%20abstract%20icon%20modern%20building%20symbol%20clean%20white%20background%20minimal%20flat&width=40&height=40&seq=oe3&orientation=squarish" },
                ].filter((e) => e.slug !== id).slice(0, 2).map((e) => (
                  <Link
                    key={e.slug}
                    to={`/empresa/${e.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                      <img src={e.logo} alt={e.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1A1A2E]">{e.name}</p>
                      <p className="text-xs text-gray-400">{e.sector}</p>
                    </div>
                    <div className="ml-auto w-4 h-4 flex items-center justify-center">
                      <i className="ri-arrow-right-s-line text-gray-400"></i>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1A2E] text-white text-sm px-5 py-3 rounded-xl z-50 flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-check-line text-emerald-400"></i>
          </div>
          {toastMsg}
        </div>
      )}

      <Footer />
    </div>
  );
}
