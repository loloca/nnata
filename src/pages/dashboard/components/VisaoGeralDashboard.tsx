interface VisaoGeralDashboardProps {
  empresa: any;
  vagas: any[];
  candidatos: any[];
  onTabChange: (tab: string) => void;
}

export default function VisaoGeralDashboard({ empresa, vagas, candidatos, onTabChange }: VisaoGeralDashboardProps) {
  const vagasAtivas = vagas.filter((v) => v.status === "Activa" || v.status === "Aberta" || !v.status);
  const novosCandidatos = candidatos.filter((c) => c.status === "Novo" || c.status === "Pendente");
  
  // Calculate pipeline counts
  const stats = {
    totalCandidatos: candidatos.length,
    vagasAtivas: vagasAtivas.length,
    entrevistas: candidatos.filter(c => c.status === "Entrevista").length,
    aprovados: candidatos.filter(c => c.status === "Aprovado").length
  };

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative rounded-2xl overflow-hidden min-h-[160px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E] to-[#2D2D44]">
          {empresa.cover_url && (
            <img
              src={empresa.cover_url}
              alt="Cover"
              className="w-full h-full object-cover object-top opacity-40"
            />
          )}
        </div>
        <div className="relative px-8 py-7 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <p className="text-sm text-white/60 font-medium">Bem-vindo de volta,</p>
            <h2 className="text-3xl font-bold text-white mt-1">{empresa.name}</h2>
            <p className="text-sm text-white/70 mt-1.5">
              Tens <span className="text-[#E8501A] font-bold">{novosCandidatos.length} novos candidatos</span> por analisar.
            </p>
          </div>
          <button
            onClick={() => onTabChange("vagas")}
            className="flex items-center gap-2 bg-[#E8501A] text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-[#C73E0C] shadow-lg shadow-orange-900/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line text-lg"></i>
            Publicar Vaga
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Vagas Activas", value: stats.vagasAtivas, icon: "ri-briefcase-4-line", color: "text-[#E8501A]", bg: "bg-orange-50", border: "border-orange-100", delta: "Gerir vagas" },
          { label: "Total Candidatos", value: stats.totalCandidatos, icon: "ri-group-2-line", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100", delta: "Ver todos" },
          { label: "Em Entrevista", value: stats.entrevistas, icon: "ri-calendar-check-line", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", delta: "Agendadas" },
          { label: "Aprovados", value: stats.aprovados, icon: "ri-check-double-line", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", delta: "Contratações" },
        ].map((kpi) => (
          <div key={kpi.label} className={`bg-white rounded-2xl border ${kpi.border} p-5 hover:shadow-md transition-shadow`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${kpi.bg} mb-4`}>
              <i className={`${kpi.icon} ${kpi.color} text-xl`}></i>
            </div>
            <p className={`text-3xl font-extrabold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-1 font-bold uppercase tracking-wider">{kpi.label}</p>
            <p className="text-[10px] text-gray-400 mt-2">{kpi.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active vagas */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#1A1A2E] flex items-center gap-2">
              <i className="ri-list-check text-[#E8501A]"></i> Vagas Recentes
            </h3>
            <button
              onClick={() => onTabChange("vagas")}
              className="text-xs text-[#E8501A] font-bold cursor-pointer hover:underline"
            >
              Ver todas
            </button>
          </div>
          <div className="space-y-3">
            {vagasAtivas.length > 0 ? (
              vagasAtivas.slice(0, 4).map((vaga) => {
                const appCount = candidatos.filter(c => c.internship_id === vaga.id).length;
                return (
                  <div key={vaga.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-orange-50/50 transition-colors cursor-pointer group" onClick={() => onTabChange("vagas")}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#1A1A2E] group-hover:text-[#E8501A] transition-colors truncate">{vaga.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-gray-100 text-gray-500 font-bold uppercase tracking-tighter">{vaga.area}</span>
                        <span className="text-[10px] text-gray-400 font-medium">{vaga.type}</span>
                      </div>
                    </div>
                    <div className="text-right ml-3">
                      <p className="text-sm font-black text-[#1A1A2E]">{appCount}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Candidatos</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-xs text-gray-400 font-medium">Nenhuma vaga activa.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent activity (Simplified as real apps) */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#1A1A2E] flex items-center gap-2">
              <i className="ri-notification-3-line text-[#E8501A]"></i> Actividade Recente
            </h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tempo Real</span>
          </div>
          <div className="space-y-4">
            {candidatos.length > 0 ? (
              candidatos.slice(0, 5).map((app, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-50 flex-shrink-0">
                    <i className="ri-user-add-line text-blue-600 text-sm"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#374151] leading-snug">
                      <span className="font-bold">{app.students?.full_name || 'Estudante'}</span> candidatou-se a uma vaga.
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium mt-1">
                      {new Date(app.created_at).toLocaleDateString('pt-AO')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-xs text-gray-400 font-medium">Sem actividade recente.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pipeline de Candidatos */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-[#1A1A2E]">Pipeline de Selecção</h3>
          <button
            onClick={() => onTabChange("candidatos")}
            className="text-xs text-[#E8501A] font-bold hover:underline"
          >
            Gerir todos
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { status: "Pendente", count: candidatos.filter((c) => c.status === "Pendente" || c.status === "Novo").length, color: "text-gray-700", bg: "bg-gray-100", border: "border-gray-200" },
            { status: "Em análise", count: candidatos.filter((c) => c.status === "Em análise").length, color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-100" },
            { status: "Entrevista", count: candidatos.filter((c) => c.status === "Entrevista").length, color: "text-violet-700", bg: "bg-violet-50", border: "border-violet-100" },
            { status: "Aprovado", count: candidatos.filter((c) => c.status === "Aprovado").length, color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100" },
            { status: "Recusado", count: candidatos.filter((c) => c.status === "Recusado").length, color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
          ].map((s) => (
            <div key={s.status} className={`${s.bg} border ${s.border} rounded-2xl p-4 text-center transition-transform hover:scale-105`}>
              <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{s.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

