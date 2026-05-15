import { useState } from "react";
import type { EstudantePerfil } from "@/mocks/perfil";

interface EditarPerfilTabProps {
  perfil: EstudantePerfil;
}

const areaOptions = [
  "Tecnologia", "Finanças", "Engenharia", "Marketing", "Direito",
  "Saúde", "Gestão", "Comunicação", "Arquitectura", "Educação",
];

const anoOptions = ["1.º Ano", "2.º Ano", "3.º Ano", "4.º Ano", "5.º Ano", "Pós-Graduação"];
const provinciaOptions = [
  "Luanda", "Benguela", "Huambo", "Namibe", "Cabinda",
  "Malanje", "Huíla", "Cunene", "Bié", "Moxico",
];

const idiomaOptions = ["Português", "Inglês", "Francês", "Espanhol", "Mandarim", "Árabe"];
const nivelOptions = ["Básico", "Intermédio", "Avançado", "Nativo"];

export default function EditarPerfilTab({ perfil }: EditarPerfilTabProps) {
  const [activeSection, setActiveSection] = useState("pessoal");
  const [saved, setSaved] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(perfil.areasInteresse);
  const [habilidades, setHabilidades] = useState<string[]>(perfil.habilidades);
  const [habilidadeInput, setHabilidadeInput] = useState("");
  const [idiomas, setIdiomas] = useState(perfil.idiomas);

  const sections = [
    { id: "pessoal", label: "Dados Pessoais", icon: "ri-user-line" },
    { id: "academico", label: "Dados Académicos", icon: "ri-graduation-cap-line" },
    { id: "competencias", label: "Competências", icon: "ri-tools-line" },
    { id: "social", label: "Redes Sociais", icon: "ri-links-line" },
  ];

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area)
        ? prev.filter((a) => a !== area)
        : prev.length < 3
        ? [...prev, area]
        : prev
    );
  };

  const addHabilidade = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && habilidadeInput.trim()) {
      setHabilidades((prev) => [...prev, habilidadeInput.trim()]);
      setHabilidadeInput("");
    }
  };

  const removeHabilidade = (skill: string) => {
    setHabilidades((prev) => prev.filter((s) => s !== skill));
  };

  const addIdioma = () => {
    setIdiomas((prev) => [...prev, { nome: "Inglês", nivel: "Básico" }]);
  };

  const removeIdioma = (index: number) => {
    setIdiomas((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-[#1A1A2E] text-lg">Editar Perfil</h2>
          <p className="text-sm text-gray-500 mt-0.5">Mantém o teu perfil actualizado para mais visibilidade</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Section nav */}
        <div className="flex lg:flex-col gap-2 lg:w-44 flex-shrink-0 overflow-x-auto lg:overflow-visible">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeSection === s.id
                  ? "bg-orange-50 text-[#E8501A]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-[#1A1A2E]"
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={s.icon}></i>
              </div>
              {s.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="flex-1 bg-white rounded-2xl border border-gray-100 p-6">
          {/* Dados Pessoais */}
          {activeSection === "pessoal" && (
            <div className="space-y-5">
              <h3 className="font-semibold text-[#1A1A2E] text-sm border-b border-gray-100 pb-3">Dados Pessoais</h3>

              {/* Avatar section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={perfil.avatar}
                    alt="Avatar"
                    className="w-16 h-16 rounded-xl object-cover object-top border border-gray-100"
                  />
                  <button
                    type="button"
                    className="absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center bg-[#E8501A] text-white rounded-full cursor-pointer hover:bg-[#C73E0C] transition-colors"
                  >
                    <i className="ri-camera-line text-xs"></i>
                  </button>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A2E]">Foto de Perfil</p>
                  <p className="text-xs text-gray-400 mt-0.5">JPG ou PNG, máximo 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Nome completo *</label>
                  <input
                    type="text"
                    defaultValue={perfil.name}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Email *</label>
                  <input
                    type="email"
                    defaultValue={perfil.email}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Telemóvel</label>
                  <input
                    type="tel"
                    defaultValue={perfil.phone}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Província</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors appearance-none bg-white">
                    {provinciaOptions.map((p) => (
                      <option key={p} selected={p === perfil.province}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Título Profissional</label>
                <input
                  type="text"
                  defaultValue={perfil.headline}
                  placeholder="Ex: Estudante de Engenharia · Apaixonado por IA"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Sobre mim</label>
                <textarea
                  rows={4}
                  maxLength={500}
                  defaultValue={perfil.bio}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors resize-none"
                ></textarea>
                <p className="text-xs text-gray-400 mt-1 text-right">Máx. 500 caracteres</p>
              </div>
            </div>
          )}

          {/* Dados Académicos */}
          {activeSection === "academico" && (
            <div className="space-y-5">
              <h3 className="font-semibold text-[#1A1A2E] text-sm border-b border-gray-100 pb-3">Dados Académicos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Universidade / Instituto *</label>
                  <input
                    type="text"
                    defaultValue={perfil.universidade}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Curso *</label>
                  <input
                    type="text"
                    defaultValue={perfil.curso}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Ano Académico *</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors appearance-none bg-white">
                    {anoOptions.map((a) => (
                      <option key={a} selected={a === perfil.anoAcademico}>{a}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-2">
                  Áreas de Interesse{" "}
                  <span className="text-gray-400 font-normal">(máx. 3)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {areaOptions.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleArea(area)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                        selectedAreas.includes(area)
                          ? "bg-[#E8501A] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">{selectedAreas.length}/3 áreas seleccionadas</p>
              </div>
            </div>
          )}

          {/* Competências */}
          {activeSection === "competencias" && (
            <div className="space-y-6">
              <h3 className="font-semibold text-[#1A1A2E] text-sm border-b border-gray-100 pb-3">Competências & Idiomas</h3>

              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                  Habilidades Técnicas
                  <span className="text-gray-400 font-normal ml-1">(pressiona Enter para adicionar)</span>
                </label>
                <input
                  type="text"
                  value={habilidadeInput}
                  onChange={(e) => setHabilidadeInput(e.target.value)}
                  onKeyDown={addHabilidade}
                  placeholder="Ex: React, Python, Figma..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {habilidades.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-gray-100 text-[#374151] rounded-lg font-medium"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeHabilidade(skill)}
                        className="w-3 h-3 flex items-center justify-center hover:text-red-500 cursor-pointer transition-colors"
                      >
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-[#1A1A2E]">Idiomas</label>
                  <button
                    type="button"
                    onClick={addIdioma}
                    className="text-xs text-[#E8501A] font-medium hover:underline cursor-pointer"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-3">
                  {idiomas.map((idioma, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <select
                        value={idioma.nome}
                        onChange={(e) =>
                          setIdiomas((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, nome: e.target.value } : item))
                          )
                        }
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors appearance-none bg-white"
                      >
                        {idiomaOptions.map((o) => <option key={o}>{o}</option>)}
                      </select>
                      <select
                        value={idioma.nivel}
                        onChange={(e) =>
                          setIdiomas((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, nivel: e.target.value } : item))
                          )
                        }
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors appearance-none bg-white"
                      >
                        {nivelOptions.map((n) => <option key={n}>{n}</option>)}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeIdioma(idx)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-red-50 hover:text-red-500 text-gray-400 rounded-lg cursor-pointer transition-colors"
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Redes Sociais */}
          {activeSection === "social" && (
            <div className="space-y-5">
              <h3 className="font-semibold text-[#1A1A2E] text-sm border-b border-gray-100 pb-3">Redes Sociais & Links</h3>
              {[
                { label: "LinkedIn", icon: "ri-linkedin-box-line", placeholder: "linkedin.com/in/o-teu-perfil", default: perfil.linkedin },
                { label: "GitHub", icon: "ri-github-line", placeholder: "github.com/utilizador", default: "" },
                { label: "Portfolio / Website", icon: "ri-global-line", placeholder: "https://meu-portfolio.ao", default: "" },
                { label: "Behance", icon: "ri-behance-line", placeholder: "behance.net/utilizador", default: "" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">{field.label}</label>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E8501A] transition-colors">
                    <div className="w-11 h-11 flex items-center justify-center border-r border-gray-200 bg-gray-50">
                      <i className={`${field.icon} text-gray-400`}></i>
                    </div>
                    <input
                      type="url"
                      defaultValue={field.default}
                      placeholder={field.placeholder}
                      className="flex-1 px-4 py-2.5 text-sm focus:outline-none bg-transparent"
                    />
                  </div>
                </div>
              ))}

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-information-line text-amber-600"></i>
                  </div>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    O LinkedIn é muito valorizado pelas empresas parceiras. Certifica-te de que o teu perfil está actualizado antes de te candidatares.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
            {saved && (
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-check-double-line"></i>
                </div>
                Alterações guardadas com sucesso!
              </div>
            )}
            {!saved && <div></div>}
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#E8501A] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-save-line"></i>
              </div>
              Guardar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
