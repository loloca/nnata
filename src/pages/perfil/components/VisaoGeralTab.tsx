interface VisaoGeralTabProps {
  perfil: any;
  projetos: any[];
  candidaturas: any[];
  onTabChange: (tab: string) => void;
}

const statusColors: Record<string, { color: string; bg: string }> = {
  "Em análise": { color: "text-amber-700", bg: "bg-amber-50" },
  Aprovado: { color: "text-emerald-700", bg: "bg-emerald-50" },
  Entrevista: { color: "text-violet-700", bg: "bg-violet-50" },
  Recusado: { color: "text-red-600", bg: "bg-red-50" },
  Pendente: { color: "text-gray-600", bg: "bg-gray-100" },
};

export default function VisaoGeralTab({ perfil, projetos = [], candidaturas = [], onTabChange }: VisaoGeralTabProps) {
  // Se for empresa, mostrar visão geral da empresa
  if (perfil.name) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#1A1A2E]">Sobre a Empresa</h3>
            <button
              onClick={() => onTabChange("editar")}
              className="text-xs text-[#E8501A] font-medium flex items-center gap-1 cursor-pointer hover:underline"
            >
              <i className="ri-edit-line"></i> Editar
            </button>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {perfil.description || "Nenhuma descrição fornecida ainda."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
             <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <i className="ri-global-line text-[#E8501A]"></i>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Website</p>
                  <p className="text-xs font-medium text-[#1A1A2E] truncate">{perfil.website || "Não definido"}</p>
                </div>
             </div>
             <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <i className="ri-building-line text-[#E8501A]"></i>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Sector</p>
                  <p className="text-xs font-medium text-[#1A1A2E] truncate">{perfil.sector || "Não definido"}</p>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
           <h3 className="font-semibold text-[#1A1A2E] mb-4">Próximos Passos</h3>
           <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 border border-orange-100 bg-orange-50/30 rounded-2xl">
                 <div className="w-10 h-10 flex items-center justify-center bg-[#E8501A] text-white rounded-xl">
                    <i className="ri-add-line text-xl"></i>
                 </div>
                 <div className="flex-1">
                    <p className="text-sm font-bold text-[#1A1A2E]">Publicar Vaga</p>
                    <p className="text-xs text-gray-500">Atraia os melhores talentos do IPAS para a sua empresa.</p>
                 </div>
                 <button className="text-xs font-bold text-[#E8501A] hover:underline cursor-pointer">Começar →</button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Se for estudante
  const recentCandidaturas = (candidaturas || []).slice(0, 3);
  const featuredProjetos = (projetos || []).filter((p) => p.featured).slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Cartão de Identificação Académica IPAS */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-800/10 bg-gradient-to-br from-[#1A1A2E] via-[#2D2D44] to-[#12121E] p-6 text-white shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
        {/* Glow effect */}
        <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#E8501A] opacity-20 blur-3xl"></div>
        <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-orange-600 opacity-10 blur-3xl"></div>

        {/* Card Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#E8501A] to-[#C73E0C]">
              <i className="ri-graduation-cap-fill text-white text-xl"></i>
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-wide">CARTÃO ACADÉMICO</h4>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">EstagiAngola · IPAS</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8501A]/20 text-[#E8501A] border border-[#E8501A]/30">
              IPAS OFICIAL
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Estudante</p>
              <p className="text-base font-bold text-white mt-0.5">{perfil.full_name}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Curso</p>
              <p className="text-sm font-semibold text-white mt-0.5">{perfil.course || "Não definido"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Nº de Processo</p>
              <p className="text-sm font-black text-orange-400 mt-0.5 tracking-wider">{perfil.process_number || "Não definido"}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Instituição</p>
              <p className="text-sm font-semibold text-white mt-0.5">IPAS</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Estado da Candidatura</p>
              {candidaturas && candidaturas.length > 0 ? (
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    statusColors[candidaturas[0].status]?.bg || 'bg-gray-700'
                  } ${
                    statusColors[candidaturas[0].status]?.color || 'text-white'
                  }`}>
                    {candidaturas[0].status}
                  </span>
                  <span className="text-[10px] text-gray-300 truncate max-w-[150px]">
                    em {candidaturas[0].vagaTitle}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-gray-400 mt-1">Nenhuma candidatura activa</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#1A1A2E]">Sobre mim</h3>
          <button
            onClick={() => onTabChange("editar")}
            className="text-xs text-[#E8501A] font-medium flex items-center gap-1 cursor-pointer hover:underline"
          >
            <i className="ri-edit-line"></i> Editar
          </button>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {perfil.bio || "Escreve uma breve biografia para te apresentares às empresas."}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
          {[
            { icon: "ri-graduation-cap-line", label: "Curso", value: perfil.course },
            { icon: "ri-calendar-line", label: "Ano", value: perfil.academic_year },
            { icon: "ri-map-pin-line", label: "Província", value: perfil.province },
            { icon: "ri-phone-line", label: "Telemóvel", value: perfil.phone || "Não definido" },
            { icon: "ri-linkedin-box-line", label: "LinkedIn", value: perfil.linkedin_url ? "Perfil vinculado" : "Não definido" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center bg-orange-50 rounded-lg flex-shrink-0">
                <i className={`${item.icon} text-[#E8501A] text-sm`}></i>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="text-xs font-medium text-[#1A1A2E] mt-0.5 truncate">{item.value || "—"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="font-semibold text-[#1A1A2E] mb-4">Áreas de Interesse</h3>
        <div className="flex flex-wrap gap-2">
          {perfil.areas_interest?.map((area: string) => (
            <span key={area} className="text-xs px-3 py-1.5 bg-gray-100 text-[#374151] rounded-lg font-medium">
              {area}
            </span>
          )) || <p className="text-xs text-gray-400">Nenhuma área selecionada.</p>}
        </div>
      </div>

      {/* Recent candidaturas (Empty State) */}
      {recentCandidaturas.length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#1A1A2E]">Candidaturas Recentes</h3>
            <button
              onClick={() => onTabChange("candidaturas")}
              className="text-xs text-[#E8501A] font-medium flex items-center gap-1 cursor-pointer hover:underline"
            >
              Ver todas <i className="ri-arrow-right-line"></i>
            </button>
          </div>
          <div className="space-y-3">
            {recentCandidaturas.map((cand) => {
              const cfg = statusColors[cand.status] ?? { color: "text-gray-600", bg: "bg-gray-100" };
              return (
                <div key={cand.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-orange-50/40 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                    <img src={cand.companyLogo} alt={cand.company} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A1A2E] truncate">{cand.vagaTitle}</p>
                    <p className="text-xs text-gray-400">{cand.company} · {cand.appliedDate}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${cfg.bg} ${cfg.color}`}>
                    {cand.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm">
           <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-briefcase-line text-[#E8501A] text-xl"></i>
           </div>
           <p className="text-sm font-semibold text-[#1A1A2E]">Ainda não te candidataste a nenhuma vaga</p>
           <p className="text-xs text-gray-400 mt-1">Explora as oportunidades disponíveis e começa a tua carreira.</p>
           <button onClick={() => window.location.href='/vagas'} className="mt-4 text-xs font-bold text-[#E8501A] hover:underline cursor-pointer">Explorar Vagas →</button>
        </div>
      )}

      {/* Profile tips */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 flex items-center justify-center bg-[#E8501A] rounded-xl flex-shrink-0">
            <i className="ri-lightbulb-line text-white text-base"></i>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1A1A2E]">Dica para aumentar visibilidade</p>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Perfis com portfólio recebem <strong>3x mais</strong> visualizações das empresas. Adiciona projectos para completar o teu perfil e destacares-te!
            </p>
            <button
              onClick={() => onTabChange("portfolio")}
              className="mt-3 text-xs font-medium text-[#E8501A] hover:underline cursor-pointer"
            >
              Adicionar projecto →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

