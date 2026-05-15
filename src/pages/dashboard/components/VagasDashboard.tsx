import { useState } from "react";
import type { VagaEmpresa } from "@/mocks/empresa";

interface VagasDashboardProps {
  vagas: VagaEmpresa[];
  onVerCandidatos: (vagaId: string) => void;
}

const statusConfig: Record<VagaEmpresa["status"], { color: string; bg: string; label: string }> = {
  Activa: { color: "text-emerald-700", bg: "bg-emerald-50", label: "Activa" },
  Encerrada: { color: "text-gray-600", bg: "bg-gray-100", label: "Encerrada" },
  Rascunho: { color: "text-amber-700", bg: "bg-amber-50", label: "Rascunho" },
};

const typeColors: Record<string, string> = {
  Presencial: "bg-blue-50 text-blue-700",
  Híbrido: "bg-violet-50 text-violet-700",
  Remoto: "bg-emerald-50 text-emerald-700",
};

function PublicarVagaModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-4">
            <i className="ri-check-line text-emerald-500 text-2xl"></i>
          </div>
          <h3 className="font-bold text-[#1A1A2E] text-lg">Vaga publicada!</h3>
          <p className="text-sm text-gray-500 mt-2">A sua vaga já está visível para os estudantes da plataforma.</p>
          <button onClick={onClose} className="mt-6 w-full py-3 bg-[#E8501A] text-white rounded-xl font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer">
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h3 className="font-bold text-[#1A1A2E]">Publicar Nova Vaga</h3>
            <p className="text-xs text-gray-400 mt-0.5">Passo {step} de 2</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer">
            <i className="ri-close-line text-[#374151]"></i>
          </button>
        </div>

        {/* Step indicator */}
        <div className="px-6 pt-4 flex items-center gap-2">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step >= s ? "bg-[#E8501A] text-white" : "bg-gray-100 text-gray-400"}`}>
                {step > s ? <i className="ri-check-line text-xs"></i> : s}
              </div>
              {s < 2 && <div className={`h-0.5 flex-1 ${step > s ? "bg-[#E8501A]" : "bg-gray-100"}`}></div>}
            </div>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); if (step === 1) { setStep(2); } else { setSubmitted(true); } }} className="p-6 space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Título da Vaga *</label>
                <input required type="text" placeholder="Ex: Estágio em Engenharia de Software" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Área *</label>
                  <select required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] appearance-none bg-white">
                    {["Tecnologia","Marketing","Finanças","Gestão","Engenharia","Direito","Saúde","Comunicação"].map((a) => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Modalidade *</label>
                  <select required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] appearance-none bg-white">
                    {["Presencial","Híbrido","Remoto"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Duração *</label>
                  <select required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] appearance-none bg-white">
                    {["1 mês","3 meses","4 meses","6 meses","12 meses"].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Província *</label>
                  <select required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] appearance-none bg-white">
                    {["Luanda","Benguela","Huambo","Cabinda","Namibe","Malanje"].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Descrição da Vaga *</label>
                <textarea required rows={4} maxLength={500} placeholder="Descreve as actividades, responsabilidades e o que o estagiário irá aprender..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-[#E8501A] text-white rounded-xl font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer">Continuar</button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Requisitos *</label>
                <textarea required rows={3} maxLength={500} placeholder="Ex: Curso de Eng. Informática, Conhecimentos de React, ..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Benefícios</label>
                <textarea rows={3} maxLength={500} placeholder="Ex: Subsídio mensal, Transporte, Mentoria sénior..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Data de encerramento</label>
                <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="destaque" className="w-4 h-4 accent-[#E8501A]" />
                <label htmlFor="destaque" className="text-sm text-gray-600 cursor-pointer">Marcar como vaga em destaque na plataforma</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-200 text-[#374151] rounded-xl font-medium hover:bg-gray-50 transition-colors cursor-pointer">Voltar</button>
                <button type="submit" className="flex-1 py-3 bg-[#E8501A] text-white rounded-xl font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer">Publicar Vaga</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default function VagasDashboard({ vagas, onVerCandidatos }: VagasDashboardProps) {
  const [filterStatus, setFilterStatus] = useState<string>("Todas");
  const [showModal, setShowModal] = useState(false);

  const filtered = filterStatus === "Todas" ? vagas : vagas.filter((v) => v.status === filterStatus);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-[#1A1A2E] text-lg">Gestão de Vagas</h2>
          <p className="text-sm text-gray-500 mt-0.5">{vagas.filter((v) => v.status === "Activa").length} vagas activas publicadas</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#E8501A] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap"
        >
          <div className="w-4 h-4 flex items-center justify-center"><i className="ri-add-line"></i></div>
          Nova Vaga
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {["Todas", "Activa", "Encerrada", "Rascunho"].map((f) => (
          <button
            key={f}
            onClick={() => setFilterStatus(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              filterStatus === f ? "bg-[#E8501A] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f}
            {f !== "Todas" && <span className="ml-1.5 opacity-70 text-xs">({vagas.filter((v) => v.status === f).length})</span>}
          </button>
        ))}
      </div>

      {/* Vagas list */}
      <div className="flex flex-col gap-3">
        {filtered.map((vaga) => {
          const cfg = statusConfig[vaga.status];
          return (
            <div key={vaga.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-orange-200 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-[#1A1A2E] text-sm">{vaga.title}</h3>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${typeColors[vaga.type] ?? "bg-gray-100 text-gray-600"}`}>{vaga.type}</span>
                    <span className="text-xs text-gray-400">{vaga.area}</span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{vaga.province}</span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{vaga.duration}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 flex items-center justify-center"><i className="ri-group-line text-gray-400 text-xs"></i></div>
                      <span className="text-xs text-gray-500"><strong className="text-[#1A1A2E]">{vaga.applicants}</strong> candidatos</span>
                      {vaga.novos > 0 && <span className="text-xs bg-[#E8501A] text-white font-bold px-1.5 py-0.5 rounded-full">+{vaga.novos} novos</span>}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 flex items-center justify-center"><i className="ri-eye-line text-gray-400 text-xs"></i></div>
                      <span className="text-xs text-gray-500"><strong className="text-[#1A1A2E]">{vaga.views}</strong> visualizações</span>
                    </div>
                    {vaga.status !== "Rascunho" && (
                      <span className="text-xs text-gray-400">Publicada em {vaga.publishedAt}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {vaga.applicants > 0 && (
                    <button
                      onClick={() => onVerCandidatos(vaga.id)}
                      className="flex items-center gap-1.5 text-xs font-medium text-[#E8501A] border border-[#E8501A]/30 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <div className="w-4 h-4 flex items-center justify-center"><i className="ri-group-line text-xs"></i></div>
                      Ver candidatos
                    </button>
                  )}
                  {vaga.status === "Rascunho" && (
                    <button className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 border border-emerald-200 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer whitespace-nowrap">
                      <div className="w-4 h-4 flex items-center justify-center"><i className="ri-send-plane-line text-xs"></i></div>
                      Publicar
                    </button>
                  )}
                  <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer text-gray-400 hover:text-[#1A1A2E] transition-colors">
                    <i className="ri-more-2-line text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && <PublicarVagaModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
