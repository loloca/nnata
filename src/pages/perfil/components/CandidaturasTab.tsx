import { useState } from "react";
import type { Candidatura } from "@/mocks/perfil";

interface CandidaturasTabProps {
  candidaturas: Candidatura[];
}

export default function CandidaturasTab({ candidaturas }: CandidaturasTabProps) {
  const [filter, setFilter] = useState<string>("todas");

  const statusColors = {
    "Pendente": "bg-yellow-50 text-yellow-600 border-yellow-100",
    "Em análise": "bg-blue-50 text-blue-600 border-blue-100",
    "Entrevista": "bg-violet-50 text-violet-600 border-violet-100",
    "Aceite": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Rejeitado": "bg-rose-50 text-rose-600 border-rose-100",
  };

  const filtered = filter === "todas" ? candidaturas : candidaturas.filter(c => c.status === filter);

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#1A1A2E] leading-tight">Minhas Candidaturas</h2>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">
            Acompanha o estado das tuas aplicações em tempo real
          </p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2 mb-10 bg-white p-2 rounded-[24px] w-fit border-2 border-gray-50 shadow-sm">
        {["todas", "Pendente", "Em análise", "Entrevista", "Aceite", "Rejeitado"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === f ? "bg-[#1A1A2E] text-white shadow-lg shadow-gray-900/20" : "text-gray-400 hover:text-[#1A1A2E]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {candidaturas.length === 0 ? (
        <div className="bg-white rounded-[40px] border-4 border-dashed border-gray-100 p-20 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center text-gray-300 mx-auto mb-8">
            <i className="ri-folder-open-line text-4xl"></i>
          </div>
          <h3 className="font-black text-[#1A1A2E] text-xl">Nenhuma candidatura ainda</h3>
          <p className="text-gray-400 mt-2 font-medium max-w-xs mx-auto">Explora as vagas disponíveis e começa a construir o teu futuro hoje.</p>
          <a 
            href="/vagas" 
            className="mt-8 inline-block bg-[#E8501A] text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-orange-900/20"
          >
            Ver Vagas Disponíveis
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="group bg-white rounded-[40px] border-2 border-gray-50 p-8 hover:border-[#E8501A]/20 hover:shadow-2xl hover:shadow-orange-900/5 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-[28px] bg-gray-50 flex items-center justify-center overflow-hidden border-2 border-gray-50 group-hover:border-white transition-all shadow-sm">
                    {c.companyLogo ? (
                      <img src={c.companyLogo} alt={c.company} className="w-full h-full object-cover" />
                    ) : (
                      <i className="ri-building-line text-3xl text-gray-300"></i>
                    )}
                  </div>
                  <div>
                    <h3 className="font-black text-[#1A1A2E] text-xl leading-tight group-hover:text-[#E8501A] transition-colors">
                      {c.vagaTitle}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <i className="ri-building-4-line"></i>
                        {c.company}
                      </span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <i className="ri-map-pin-line"></i>
                        {c.province}
                      </span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <i className="ri-calendar-line"></i>
                        {c.appliedDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-gray-50">
                  <div className="text-center sm:text-right">
                    <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${statusColors[c.status as keyof typeof statusColors] || 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                      {c.status}
                    </span>
                  </div>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gray-50 hover:bg-[#1A1A2E] hover:text-white text-[#1A1A2E] px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Ver Detalhes
                  </button>
                </div>
              </div>

              {c.feedback && (
                <div className="mt-8 pt-8 border-t border-gray-50 bg-gray-50/50 -mx-8 -mb-8 px-8 pb-8 rounded-b-[40px]">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#E8501A] shadow-sm flex-shrink-0">
                      <i className="ri-message-3-line text-lg"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Feedback da Empresa</p>
                      <p className="text-sm text-gray-600 font-medium leading-relaxed italic">"{c.feedback}"</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
