import type { EmpresaPerfil, VagaEmpresa, Candidato } from "@/mocks/empresa";
import { actividadeRecente } from "@/mocks/empresa";

interface VisaoGeralDashboardProps {
  empresa: EmpresaPerfil;
  vagas: VagaEmpresa[];
  candidatos: Candidato[];
  onTabChange: (tab: string) => void;
}

export default function VisaoGeralDashboard({ empresa, vagas, candidatos, onTabChange }: VisaoGeralDashboardProps) {
  const vagasAtivas = vagas.filter((v) => v.status === "Activa");
  const novosCandidatos = candidatos.filter((c) => c.status === "Novo");

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative rounded-2xl overflow-hidden">
        <img
          src={empresa.cover}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/90 to-[#1A1A2E]/60"></div>
        <div className="relative px-8 py-7 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60 font-medium">Bem-vindo de volta,</p>
            <h2 className="text-2xl font-bold text-white mt-1">{empresa.name}</h2>
            <p className="text-sm text-white/70 mt-1.5">
              Tens <span className="text-[#E8501A] font-semibold">{novosCandidatos.length} novos candidatos</span> para analisar hoje
            </p>
          </div>
          <button
            onClick={() => onTabChange("vagas")}
            className="flex items-center gap-2 bg-[#E8501A] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-add-line"></i>
            </div>
            Publicar Vaga
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Vagas Activas", value: empresa.stats.vagasAtivas, icon: "ri-briefcase-4-line", color: "text-[#E8501A]", bg: "bg-orange-50", border: "border-orange-100", delta: "+2 este mês" },
          { label: "Total Candidatos", value: empresa.stats.totalCandidatos, icon: "ri-group-2-line", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100", delta: "+34 esta semana" },
          { label: "Em Entrevista", value: empresa.stats.entrevistas, icon: "ri-calendar-check-line", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", delta: "3 agendadas" },
          { label: "Visualizações", value: empresa.stats.visualizacoesPerfil, icon: "ri-eye-line", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", delta: "+180 esta semana" },
        ].map((kpi) => (
          <div key={kpi.label} className={`bg-white rounded-2xl border ${kpi.border} p-5`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${kpi.bg} mb-3`}>
              <i className={`${kpi.icon} ${kpi.color} text-xl`}></i>
            </div>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">{kpi.label}</p>
            <p className="text-xs text-gray-400 mt-1">{kpi.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active vagas */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#1A1A2E]">Vagas Activas</h3>
            <button
              onClick={() => onTabChange("vagas")}
              className="text-xs text-[#E8501A] font-medium cursor-pointer hover:underline flex items-center gap-1"
            >
              Ver todas <i className="ri-arrow-right-line"></i>
            </button>
          </div>
          <div className="space-y-3">
            {vagasAtivas.slice(0, 4).map((vaga) => (
              <div key={vaga.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-orange-50/30 transition-colors cursor-pointer" onClick={() => onTabChange("vagas")}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1A2E] truncate">{vaga.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{vaga.area}</span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{vaga.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#1A1A2E]">{vaga.applicants}</p>
                    <p className="text-xs text-gray-400">candidatos</p>
                  </div>
                  {vaga.novos > 0 && (
                    <span className="text-xs bg-[#E8501A] text-white font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      +{vaga.novos}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#1A1A2E]">Actividade Recente</h3>
            <span className="text-xs text-gray-400">Hoje</span>
          </div>
          <div className="space-y-3">
            {actividadeRecente.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 flex items-center justify-center rounded-xl ${item.bg} flex-shrink-0`}>
                  <i className={`${item.icon} ${item.color} text-sm`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#374151] leading-snug">{item.msg}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Candidatos por estado */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-[#1A1A2E]">Pipeline de Candidatos</h3>
          <button
            onClick={() => onTabChange("candidatos")}
            className="text-xs text-[#E8501A] font-medium cursor-pointer hover:underline flex items-center gap-1"
          >
            Gerir candidatos <i className="ri-arrow-right-line"></i>
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { status: "Novo", count: candidatos.filter((c) => c.status === "Novo").length, color: "text-gray-700", bg: "bg-gray-100", border: "border-gray-200" },
            { status: "Em análise", count: candidatos.filter((c) => c.status === "Em análise").length, color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-100" },
            { status: "Entrevista", count: candidatos.filter((c) => c.status === "Entrevista").length, color: "text-violet-700", bg: "bg-violet-50", border: "border-violet-100" },
            { status: "Aprovado", count: candidatos.filter((c) => c.status === "Aprovado").length, color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100" },
            { status: "Recusado", count: candidatos.filter((c) => c.status === "Recusado").length, color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
          ].map((s) => (
            <div key={s.status} className={`${s.bg} border ${s.border} rounded-xl p-4 text-center`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-gray-500 mt-1">{s.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
