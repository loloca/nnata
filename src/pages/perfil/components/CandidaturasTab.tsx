import { useState } from "react";
import type { Candidatura } from "@/mocks/perfil";

interface CandidaturasTabProps {
  candidaturas: Candidatura[];
}

const statusConfig: Record<
  Candidatura["status"],
  { color: string; bg: string; icon: string; label: string }
> = {
  "Em análise": { color: "text-amber-700", bg: "bg-amber-50", icon: "ri-time-line", label: "Em análise" },
  Aprovado: { color: "text-emerald-700", bg: "bg-emerald-50", icon: "ri-check-double-line", label: "Aprovado" },
  Entrevista: { color: "text-violet-700", bg: "bg-violet-50", icon: "ri-calendar-check-line", label: "Entrevista" },
  Recusado: { color: "text-red-600", bg: "bg-red-50", icon: "ri-close-circle-line", label: "Recusado" },
  Pendente: { color: "text-gray-600", bg: "bg-gray-100", icon: "ri-pause-circle-line", label: "Pendente" },
};

const timelineSteps = ["Pendente", "Em análise", "Entrevista", "Aprovado"];

function CandidaturaDetail({
  candidatura,
  onClose,
}: {
  candidatura: Candidatura;
  onClose: () => void;
}) {
  const config = statusConfig[candidatura.status];
  const currentStep = timelineSteps.indexOf(
    candidatura.status === "Recusado" ? "Recusado" : candidatura.status
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-[#1A1A2E]">Detalhes da Candidatura</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer">
            <i className="ri-close-line text-[#374151]"></i>
          </button>
        </div>

        <div className="p-6">
          {/* Company header */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden border border-gray-100">
              <img src={candidatura.companyLogo} alt={candidatura.company} className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#1A1A2E]">{candidatura.vagaTitle}</h4>
              <p className="text-sm text-gray-500 mt-0.5">{candidatura.company}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{candidatura.area}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{candidatura.type}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{candidatura.province}</span>
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div className={`flex items-center gap-2 mt-5 px-4 py-3 rounded-xl ${config.bg}`}>
            <div className="w-5 h-5 flex items-center justify-center">
              <i className={`${config.icon} ${config.color}`}></i>
            </div>
            <div>
              <p className={`text-sm font-semibold ${config.color}`}>Estado: {config.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">Candidatura enviada em {candidatura.appliedDate}</p>
            </div>
          </div>

          {/* Progress timeline (only for non-rejected) */}
          {candidatura.status !== "Recusado" && (
            <div className="mt-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Progresso</p>
              <div className="flex items-center gap-0">
                {timelineSteps.map((step, idx) => {
                  const isCompleted = idx <= currentStep;
                  const isActive = idx === currentStep;
                  return (
                    <div key={step} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold transition-all ${
                            isCompleted
                              ? "bg-[#E8501A] text-white"
                              : "bg-gray-100 text-gray-400"
                          } ${isActive ? "ring-2 ring-[#E8501A]/30" : ""}`}
                        >
                          {isCompleted ? <i className="ri-check-line text-xs"></i> : idx + 1}
                        </div>
                        <span className={`text-xs mt-1 whitespace-nowrap ${isCompleted ? "text-[#E8501A] font-medium" : "text-gray-400"}`}>
                          {step}
                        </span>
                      </div>
                      {idx < timelineSteps.length - 1 && (
                        <div className={`h-0.5 flex-1 mb-4 transition-all ${idx < currentStep ? "bg-[#E8501A]" : "bg-gray-100"}`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Feedback */}
          {candidatura.feedback && (
            <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Mensagem da Empresa</p>
              <p className="text-sm text-[#374151] leading-relaxed">{candidatura.feedback}</p>
            </div>
          )}
        </div>

        <div className="px-6 pb-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 text-[#374151] rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Fechar
          </button>
          <a
            href="/vagas"
            className="flex-1 py-2.5 bg-[#E8501A] text-white rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer text-center"
          >
            Ver mais vagas
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CandidaturasTab({ candidaturas }: CandidaturasTabProps) {
  const [selected, setSelected] = useState<Candidatura | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("Todos");

  const statusFilters = ["Todos", "Em análise", "Entrevista", "Aprovado", "Recusado", "Pendente"];
  const filtered = filterStatus === "Todos" ? candidaturas : candidaturas.filter((c) => c.status === filterStatus);

  const counts = {
    total: candidaturas.length,
    aprovados: candidaturas.filter((c) => c.status === "Aprovado").length,
    entrevistas: candidaturas.filter((c) => c.status === "Entrevista").length,
    analise: candidaturas.filter((c) => c.status === "Em análise").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-[#1A1A2E] text-lg">Candidaturas Enviadas</h2>
          <p className="text-sm text-gray-500 mt-0.5">{counts.total} candidaturas no total</p>
        </div>
        <a
          href="/vagas"
          className="flex items-center gap-2 border border-[#E8501A] text-[#E8501A] px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-orange-50 transition-colors cursor-pointer whitespace-nowrap"
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-search-line"></i>
          </div>
          Explorar vagas
        </a>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: counts.total, color: "text-[#1A1A2E]", bg: "bg-gray-50", border: "border-gray-100" },
          { label: "Em análise", value: counts.analise, color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-100" },
          { label: "Entrevistas", value: counts.entrevistas, color: "text-violet-700", bg: "bg-violet-50", border: "border-violet-100" },
          { label: "Aprovados", value: counts.aprovados, color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-4`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {statusFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilterStatus(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              filterStatus === f
                ? "bg-[#E8501A] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f}
            {f !== "Todos" && (
              <span className="ml-1 opacity-70">
                ({candidaturas.filter((c) => c.status === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Candidaturas list */}
      <div className="flex flex-col gap-3">
        {filtered.map((cand) => {
          const config = statusConfig[cand.status];
          return (
            <div
              key={cand.id}
              onClick={() => setSelected(cand)}
              className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 transition-all cursor-pointer p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden border border-gray-100">
                <img src={cand.companyLogo} alt={cand.company} className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#1A1A2E] text-sm leading-snug truncate">{cand.vagaTitle}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{cand.company} · {cand.province} · {cand.type}</p>
                <p className="text-xs text-gray-400 mt-1">Candidatura em {cand.appliedDate}</p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${config.bg} ${config.color}`}>
                  <div className="w-3 h-3 flex items-center justify-center">
                    <i className={`${config.icon} text-xs`}></i>
                  </div>
                  {config.label}
                </span>
                {cand.feedback && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <i className="ri-message-2-line"></i>
                    Feedback
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-3">
              <i className="ri-briefcase-line text-2xl"></i>
            </div>
            <p className="text-sm font-medium">Nenhuma candidatura encontrada</p>
            <p className="text-xs mt-1">Tenta outro filtro ou candidata-te a novas vagas</p>
          </div>
        )}
      </div>

      {selected && <CandidaturaDetail candidatura={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
