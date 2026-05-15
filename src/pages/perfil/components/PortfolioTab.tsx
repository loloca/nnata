import { useState } from "react";
import type { Projeto } from "@/mocks/perfil";

interface PortfolioTabProps {
  projetos: Projeto[];
}

function ProjetoModal({ projeto, onClose }: { projeto: Projeto; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52 overflow-hidden">
          <img src={projeto.image} alt={projeto.title} className="w-full h-full object-cover object-top" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full cursor-pointer transition-colors"
          >
            <i className="ri-close-line text-sm"></i>
          </button>
          {projeto.featured && (
            <span className="absolute top-3 left-3 text-xs bg-[#E8501A] text-white px-3 py-1 rounded-full font-medium">
              Destaque
            </span>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-[#1A1A2E] text-lg">{projeto.title}</h3>
            <span className="text-xs text-gray-400 whitespace-nowrap mt-1">{projeto.date}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{projeto.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {projeto.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 bg-orange-50 text-[#E8501A] rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
            {projeto.github && (
              <a
                href={`https://${projeto.github}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-[#374151] hover:text-[#1A1A2E] border border-gray-200 rounded-lg px-4 py-2 hover:border-gray-400 transition-colors cursor-pointer"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-github-line"></i>
                </div>
                GitHub
              </a>
            )}
            {projeto.link && (
              <a
                href={projeto.link}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-white bg-[#E8501A] hover:bg-[#C73E0C] rounded-lg px-4 py-2 transition-colors cursor-pointer"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-external-link-line"></i>
                </div>
                Ver projecto
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddProjetoModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
            <i className="ri-check-line text-green-500 text-2xl"></i>
          </div>
          <h3 className="font-bold text-[#1A1A2E] text-lg">Projecto adicionado!</h3>
          <p className="text-sm text-gray-500 mt-2">O seu projecto foi adicionado ao portfólio com sucesso.</p>
          <button
            onClick={onClose}
            className="mt-6 w-full py-3 bg-[#E8501A] text-white rounded-xl font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#1A1A2E]">Adicionar Projecto</h3>
            <p className="text-xs text-gray-400 mt-0.5">Passo {step} de 2</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer">
            <i className="ri-close-line text-[#374151]"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Nome do Projecto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: App de Gestão Escolar"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Descrição *</label>
                <textarea
                  required
                  rows={3}
                  maxLength={500}
                  placeholder="Descreve o projecto, o problema que resolve e o impacto..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Data de conclusão</label>
                <input
                  type="month"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 bg-[#E8501A] text-white rounded-xl font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer"
              >
                Continuar
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Tecnologias usadas *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: React, Node.js, PostgreSQL (separadas por vírgula)"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Link do GitHub</label>
                <input
                  type="url"
                  placeholder="https://github.com/utilizador/projecto"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Link do projecto (demo)</label>
                <input
                  type="url"
                  placeholder="https://meu-projecto.ao"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Marcar como destaque?</label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[#E8501A]" />
                  <span className="text-sm text-gray-600">Destacar este projecto no meu perfil público</span>
                </label>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-gray-200 text-[#374151] rounded-xl font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#E8501A] text-white rounded-xl font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer"
                >
                  Publicar Projecto
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default function PortfolioTab({ projetos }: PortfolioTabProps) {
  const [selectedProjeto, setSelectedProjeto] = useState<Projeto | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<"todos" | "destaques">("todos");

  const filtered = filter === "destaques" ? projetos.filter((p) => p.featured) : projetos;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-[#1A1A2E] text-lg">Portfólio de Projectos</h2>
          <p className="text-sm text-gray-500 mt-0.5">{projetos.length} projectos publicados</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#E8501A] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap"
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-add-line"></i>
          </div>
          Novo Projecto
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-xl w-fit">
        {(["todos", "destaques"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              filter === f ? "bg-white text-[#1A1A2E]" : "text-gray-500 hover:text-[#1A1A2E]"
            }`}
          >
            {f === "todos" ? "Todos" : "Destaques"}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((projeto) => (
          <div
            key={projeto.id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-orange-200 transition-all cursor-pointer group"
            onClick={() => setSelectedProjeto(projeto)}
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={projeto.image}
                alt={projeto.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              {projeto.featured && (
                <span className="absolute top-2.5 left-2.5 text-xs bg-[#E8501A] text-white px-2.5 py-1 rounded-full font-medium">
                  Destaque
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-[#1A1A2E] text-sm leading-snug">{projeto.title}</h3>
                <span className="text-xs text-gray-400 whitespace-nowrap">{projeto.date}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">{projeto.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {projeto.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-orange-50 text-[#E8501A] rounded-md font-medium">
                    {tag}
                  </span>
                ))}
                {projeto.tags.length > 3 && (
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md">+{projeto.tags.length - 3}</span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
                {projeto.github && (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <i className="ri-github-line"></i>
                    GitHub
                  </span>
                )}
                {projeto.link && (
                  <span className="flex items-center gap-1 text-xs text-[#E8501A] font-medium">
                    <i className="ri-external-link-line"></i>
                    Demo live
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add card */}
        <div
          onClick={() => setShowAddModal(true)}
          className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center min-h-[200px] gap-3 hover:border-[#E8501A] hover:bg-orange-50/30 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-orange-100 transition-colors">
            <i className="ri-add-line text-gray-400 group-hover:text-[#E8501A] text-xl transition-colors"></i>
          </div>
          <p className="text-sm font-medium text-gray-400 group-hover:text-[#E8501A] transition-colors">Adicionar projecto</p>
        </div>
      </div>

      {selectedProjeto && (
        <ProjetoModal projeto={selectedProjeto} onClose={() => setSelectedProjeto(null)} />
      )}
      {showAddModal && (
        <AddProjetoModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
