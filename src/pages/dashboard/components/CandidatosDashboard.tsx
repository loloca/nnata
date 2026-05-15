import { useState } from "react";
import type { Candidato, VagaEmpresa } from "@/mocks/empresa";

interface CandidatosDashboardProps {
  candidatos: Candidato[];
  vagas: VagaEmpresa[];
  filtroVagaId?: string;
}

type StatusType = "Novo" | "Em análise" | "Entrevista" | "Aprovado" | "Recusado";

const statusConfig: Record<StatusType, { color: string; bg: string; border: string }> = {
  Novo: { color: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  "Em análise": { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  Entrevista: { color: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200" },
  Aprovado: { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  Recusado: { color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
};

const allStatuses: StatusType[] = ["Novo", "Em análise", "Entrevista", "Aprovado", "Recusado"];

function CandidatoModal({
  candidato,
  onClose,
  onStatusChange,
}: {
  candidato: Candidato;
  onClose: () => void;
  onStatusChange: (id: string, status: StatusType) => void;
}) {
  const [nota, setNota] = useState(candidato.nota ?? "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="font-bold text-[#1A1A2E]">Perfil do Candidato</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer">
            <i className="ri-close-line text-[#374151]"></i>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center gap-4">
            <img src={candidato.avatar} alt={candidato.name} className="w-16 h-16 rounded-2xl object-cover object-top border border-gray-100 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-[#1A1A2E]">{candidato.name}</h4>
              <p className="text-sm text-gray-500">{candidato.curso} · {candidato.anoAcademico}</p>
              <p className="text-xs text-gray-400 mt-0.5">{candidato.universidade}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="w-4 h-4 flex items-center justify-center"><i className="ri-map-pin-line text-gray-400 text-xs"></i></div>
                <span className="text-xs text-gray-400">{candidato.province}, Angola</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          {candidato.rating && (
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-5 h-5 flex items-center justify-center">
                  <i className={`${i < candidato.rating! ? "ri-star-fill" : "ri-star-line"} text-amber-400 text-sm`}></i>
                </div>
              ))}
              <span className="text-xs text-gray-400 ml-1">Avaliação interna</span>
            </div>
          )}

          {/* Skills */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Habilidades</p>
            <div className="flex flex-wrap gap-2">
              {candidato.habilidades.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 bg-gray-100 text-[#374151] rounded-lg font-medium">{s}</span>
              ))}
            </div>
          </div>

          {/* Áreas */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Áreas de Interesse</p>
            <div className="flex flex-wrap gap-2">
              {candidato.areas.map((a) => (
                <span key={a} className="text-xs px-3 py-1 bg-orange-50 text-[#E8501A] rounded-full font-medium">{a}</span>
              ))}
            </div>
          </div>

          {candidato.linkedin && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
              <div className="w-5 h-5 flex items-center justify-center"><i className="ri-linkedin-box-line text-[#0A66C2]"></i></div>
              <a href={`https://${candidato.linkedin}`} target="_blank" rel="nofollow noopener noreferrer" className="text-sm text-[#0A66C2] hover:underline cursor-pointer">{candidato.linkedin}</a>
            </div>
          )}

          {/* Mudar estado */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Alterar Estado</p>
            <div className="flex flex-wrap gap-2">
              {allStatuses.map((s) => {
                const cfg = statusConfig[s];
                return (
                  <button
                    key={s}
                    onClick={() => onStatusChange(candidato.id, s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border whitespace-nowrap ${
                      candidato.status === s ? `${cfg.bg} ${cfg.color} ${cfg.border}` : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nota interna */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Nota Interna</p>
            <textarea
              rows={3}
              maxLength={500}
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Adiciona uma nota sobre este candidato..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors resize-none"
            ></textarea>
          </div>
        </div>

        <div className="px-6 pb-5 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-[#374151] rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">Fechar</button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 bg-[#E8501A] text-white rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer"
          >
            {saved ? "Guardado!" : "Guardar nota"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CandidatosDashboard({ candidatos, vagas, filtroVagaId }: CandidatosDashboardProps) {
  const [selectedVaga, setSelectedVaga] = useState<string>(filtroVagaId ?? "todas");
  const [selectedStatus, setSelectedStatus] = useState<string>("Todos");
  const [selectedCandidato, setSelectedCandidato] = useState<Candidato | null>(null);
  const [candidatosState, setCandidatosState] = useState<Candidato[]>(candidatos);

  const filtered = candidatosState.filter((c) => {
    const vagaMatch = selectedVaga === "todas" || c.vagaId === selectedVaga;
    const statusMatch = selectedStatus === "Todos" || c.status === selectedStatus;
    return vagaMatch && statusMatch;
  });

  const handleStatusChange = (id: string, status: StatusType) => {
    setCandidatosState((prev) => prev.map((c) => c.id === id ? { ...c, status } : c));
    if (selectedCandidato?.id === id) {
      setSelectedCandidato((prev) => prev ? { ...prev, status } : null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-[#1A1A2E] text-lg">Gestão de Candidatos</h2>
          <p className="text-sm text-gray-500 mt-0.5">{candidatosState.length} candidatos no total</p>
        </div>
      </div>

      {/* Pipeline summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {allStatuses.map((s) => {
          const cfg = statusConfig[s];
          const count = candidatosState.filter((c) => c.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setSelectedStatus(selectedStatus === s ? "Todos" : s)}
              className={`border rounded-xl p-3 text-center transition-all cursor-pointer ${
                selectedStatus === s ? `${cfg.bg} ${cfg.border}` : "bg-white border-gray-100 hover:border-gray-200"
              }`}
            >
              <p className={`text-xl font-bold ${cfg.color}`}>{count}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s}</p>
            </button>
          );
        })}
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <select
          value={selectedVaga}
          onChange={(e) => setSelectedVaga(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] appearance-none bg-white flex-1"
        >
          <option value="todas">Todas as vagas</option>
          {vagas.filter((v) => v.applicants > 0).map((v) => (
            <option key={v.id} value={v.id}>{v.title} ({v.applicants})</option>
          ))}
        </select>
        <div className="flex gap-2 flex-wrap">
          {["Todos", ...allStatuses].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedStatus === s ? "bg-[#1A1A2E] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Candidatos grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((cand) => {
          const cfg = statusConfig[cand.status as StatusType];
          const vaga = vagas.find((v) => v.id === cand.vagaId);
          return (
            <div
              key={cand.id}
              onClick={() => setSelectedCandidato(cand)}
              className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 transition-all cursor-pointer p-4"
            >
              <div className="flex items-start gap-3">
                <img src={cand.avatar} alt={cand.name} className="w-12 h-12 rounded-xl object-cover object-top border border-gray-100 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-[#1A1A2E] text-sm">{cand.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{cand.curso} · {cand.anoAcademico}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${cfg.bg} ${cfg.color}`}>{cand.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {cand.habilidades.slice(0, 3).map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-medium">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                    <p className="text-xs text-gray-400 truncate">{vaga?.title}</p>
                    <p className="text-xs text-gray-400 whitespace-nowrap ml-2">{cand.appliedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="sm:col-span-2 text-center py-16 text-gray-400">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-3">
              <i className="ri-group-line text-2xl"></i>
            </div>
            <p className="text-sm font-medium">Nenhum candidato encontrado</p>
            <p className="text-xs mt-1">Tenta outro filtro ou vaga</p>
          </div>
        )}
      </div>

      {selectedCandidato && (
        <CandidatoModal
          candidato={selectedCandidato}
          onClose={() => setSelectedCandidato(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
