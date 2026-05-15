import type { EstudantePerfil, Projeto, Candidatura } from "@/mocks/perfil";

interface VisaoGeralTabProps {
  perfil: EstudantePerfil;
  projetos: Projeto[];
  candidaturas: Candidatura[];
  onTabChange: (tab: string) => void;
}

const statusColors: Record<string, { color: string; bg: string }> = {
  "Em análise": { color: "text-amber-700", bg: "bg-amber-50" },
  Aprovado: { color: "text-emerald-700", bg: "bg-emerald-50" },
  Entrevista: { color: "text-violet-700", bg: "bg-violet-50" },
  Recusado: { color: "text-red-600", bg: "bg-red-50" },
  Pendente: { color: "text-gray-600", bg: "bg-gray-100" },
};

export default function VisaoGeralTab({ perfil, projetos, candidaturas, onTabChange }: VisaoGeralTabProps) {
  const recentCandidaturas = candidaturas.slice(0, 3);
  const featuredProjetos = projetos.filter((p) => p.featured).slice(0, 2);

  return (
    <div className="space-y-6">
      {/* About */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#1A1A2E]">Sobre mim</h3>
          <button
            onClick={() => onTabChange("editar")}
            className="text-xs text-[#E8501A] font-medium flex items-center gap-1 cursor-pointer hover:underline"
          >
            <i className="ri-edit-line"></i> Editar
          </button>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{perfil.bio}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
          {[
            { icon: "ri-graduation-cap-line", label: "Curso", value: perfil.curso },
            { icon: "ri-building-2-line", label: "Instituição", value: "ISCTEM" },
            { icon: "ri-calendar-line", label: "Ano", value: perfil.anoAcademico },
            { icon: "ri-map-pin-line", label: "Localização", value: perfil.province + ", Angola" },
            { icon: "ri-phone-line", label: "Telemóvel", value: perfil.phone },
            { icon: "ri-linkedin-box-line", label: "LinkedIn", value: "Perfil activo" },
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

      {/* Highlighted skills */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#1A1A2E]">Habilidades</h3>
          <button
            onClick={() => onTabChange("editar")}
            className="text-xs text-[#E8501A] font-medium flex items-center gap-1 cursor-pointer hover:underline"
          >
            <i className="ri-edit-line"></i> Editar
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {perfil.habilidades.map((skill) => (
            <span key={skill} className="text-xs px-3 py-1.5 bg-gray-100 text-[#374151] rounded-lg font-medium">
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Idiomas</p>
          <div className="flex flex-wrap gap-3">
            {perfil.idiomas.map((idioma) => (
              <div key={idioma.nome} className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full">
                <span className="text-xs font-medium text-[#E8501A]">{idioma.nome}</span>
                <span className="text-xs text-gray-400">· {idioma.nivel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent candidaturas */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
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
                  <img src={cand.companyLogo} alt={cand.company} className="w-full h-full object-cover object-top" />
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

      {/* Featured projects */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#1A1A2E]">Projectos em Destaque</h3>
          <button
            onClick={() => onTabChange("portfolio")}
            className="text-xs text-[#E8501A] font-medium flex items-center gap-1 cursor-pointer hover:underline"
          >
            Ver portfólio <i className="ri-arrow-right-line"></i>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredProjetos.map((proj) => (
            <div key={proj.id} className="rounded-xl overflow-hidden border border-gray-100 hover:border-orange-200 transition-all cursor-pointer group" onClick={() => onTabChange("portfolio")}>
              <div className="h-32 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-[#1A1A2E]">{proj.title}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{proj.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {proj.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-orange-50 text-[#E8501A] rounded font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile tips */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 flex items-center justify-center bg-[#E8501A] rounded-xl flex-shrink-0">
            <i className="ri-lightbulb-line text-white text-base"></i>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1A1A2E]">Dica para aumentar visibilidade</p>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Perfis com portfólio recebem <strong>3x mais</strong> visualizações das empresas. Adiciona mais projectos para completar o teu perfil e destacares-te!
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
