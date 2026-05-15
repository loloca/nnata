import { useState } from "react";
import type { EmpresaPerfil } from "@/mocks/empresa";

interface PerfilEmpresaDashboardProps {
  empresa: EmpresaPerfil;
}

const sectorOptions = [
  "Telecomunicações","Energia & Petróleo","Banca & Finanças","Fintech & Pagamentos",
  "Media & Comunicação","Saúde","Seguros","Indústria & FMCG","Engenharia & Infra-estrutura","Educação",
];
const dimensaoOptions = [
  "Startup (1–10)","Pequena empresa (11–50)","Média empresa (51–200)",
  "Grande empresa (201–500)","Grande empresa (500+ colaboradores)",
];
const provinciaOptions = ["Luanda","Benguela","Huambo","Cabinda","Namibe","Malanje","Huíla"];
const areaOptions = ["Tecnologia","Marketing","Finanças","Gestão","Engenharia","Direito","Saúde","Comunicação","Arquitectura"];

export default function PerfilEmpresaDashboard({ empresa }: PerfilEmpresaDashboardProps) {
  const [activeSection, setActiveSection] = useState("info");
  const [saved, setSaved] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(empresa.areaContratacao);

  const sections = [
    { id: "info", label: "Informações Gerais", icon: "ri-building-2-line" },
    { id: "descricao", label: "Descrição & Cultura", icon: "ri-file-text-line" },
    { id: "contratacao", label: "Áreas de Contratação", icon: "ri-briefcase-line" },
    { id: "social", label: "Contactos & Links", icon: "ri-links-line" },
  ];

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
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
          <h2 className="font-bold text-[#1A1A2E] text-lg">Perfil da Empresa</h2>
          <p className="text-sm text-gray-500 mt-0.5">O teu perfil público visível para todos os estudantes</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-full font-medium">
          <i className="ri-shield-check-line"></i> Empresa Verificada
        </span>
      </div>

      {/* Cover preview */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-5">
        <div className="relative h-28 overflow-hidden">
          <img src={empresa.cover} alt="Capa" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <button className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs bg-white/90 hover:bg-white text-[#1A1A2E] px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors">
            <i className="ri-camera-line"></i> Alterar capa
          </button>
        </div>
        <div className="px-6 pb-5 flex items-end gap-4 -mt-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white bg-white">
              <img src={empresa.logo} alt={empresa.name} className="w-full h-full object-cover object-top" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center bg-[#E8501A] text-white rounded-full cursor-pointer hover:bg-[#C73E0C] transition-colors">
              <i className="ri-camera-line text-xs"></i>
            </button>
          </div>
          <div className="pb-1">
            <h3 className="font-bold text-[#1A1A2E]">{empresa.name}</h3>
            <p className="text-xs text-gray-400">{empresa.sector} · {empresa.province}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Section nav */}
        <div className="flex lg:flex-col gap-2 lg:w-48 flex-shrink-0 overflow-x-auto lg:overflow-visible">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeSection === s.id ? "bg-orange-50 text-[#E8501A]" : "text-gray-500 hover:bg-gray-50 hover:text-[#1A1A2E]"
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={s.icon}></i>
              </div>
              {s.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="flex-1 bg-white rounded-2xl border border-gray-100 p-6">
          {activeSection === "info" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-[#1A1A2E] text-sm border-b border-gray-100 pb-3">Informações Gerais</h3>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Nome da Empresa *</label>
                <input type="text" defaultValue={empresa.name} required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Sector *</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] appearance-none bg-white">
                    {sectorOptions.map((s) => <option key={s} selected={s === empresa.sector}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Dimensão</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] appearance-none bg-white">
                    {dimensaoOptions.map((d) => <option key={d} selected={d === empresa.dimensao}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Província</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] appearance-none bg-white">
                    {provinciaOptions.map((p) => <option key={p} selected={p === empresa.province}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Ano de Fundação</label>
                  <input type="text" defaultValue={empresa.fundacao} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors" />
                </div>
              </div>
            </div>
          )}

          {activeSection === "descricao" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-[#1A1A2E] text-sm border-b border-gray-100 pb-3">Descrição & Cultura</h3>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Descrição da Empresa *</label>
                <textarea rows={5} maxLength={500} defaultValue={empresa.descricao} required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors resize-none"></textarea>
                <p className="text-xs text-gray-400 mt-1 text-right">Máx. 500 caracteres</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Mensagem para Estagiários</label>
                <textarea rows={3} maxLength={500} placeholder="O que torna o vosso programa de estágios especial? Que tipo de candidatos estão à procura?" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors resize-none"></textarea>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                <p className="text-xs text-[#E8501A] font-medium flex items-center gap-1.5">
                  <i className="ri-lightbulb-line"></i> Dica de visibilidade
                </p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">Empresas com descrição completa e mensagem personalizada recebem <strong>2x mais</strong> candidaturas qualificadas.</p>
              </div>
            </div>
          )}

          {activeSection === "contratacao" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-[#1A1A2E] text-sm border-b border-gray-100 pb-3">Áreas de Contratação</h3>
              <p className="text-sm text-gray-500">Selecciona as áreas em que a empresa costuma contratar estagiários.</p>
              <div className="flex flex-wrap gap-2">
                {areaOptions.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleArea(area)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                      selectedAreas.includes(area) ? "bg-[#E8501A] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400">{selectedAreas.length} áreas seleccionadas</p>
            </div>
          )}

          {activeSection === "social" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-[#1A1A2E] text-sm border-b border-gray-100 pb-3">Contactos & Links</h3>
              {[
                { label: "Email de Estágios *", icon: "ri-mail-line", type: "email", placeholder: "estagios@empresa.ao", default: empresa.email },
                { label: "Telefone", icon: "ri-phone-line", type: "tel", placeholder: "+244 222 000 000", default: empresa.phone },
                { label: "Website", icon: "ri-global-line", type: "url", placeholder: "https://www.empresa.ao", default: empresa.website },
                { label: "LinkedIn da Empresa", icon: "ri-linkedin-box-line", type: "url", placeholder: "https://linkedin.com/company/empresa", default: "" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">{f.label}</label>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E8501A] transition-colors">
                    <div className="w-11 h-11 flex items-center justify-center border-r border-gray-200 bg-gray-50">
                      <i className={`${f.icon} text-gray-400`}></i>
                    </div>
                    <input type={f.type} defaultValue={f.default} placeholder={f.placeholder} className="flex-1 px-4 py-2.5 text-sm focus:outline-none bg-transparent" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
            {saved ? (
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <div className="w-5 h-5 flex items-center justify-center"><i className="ri-check-double-line"></i></div>
                Perfil actualizado com sucesso!
              </div>
            ) : <div></div>}
            <button type="submit" className="flex items-center gap-2 bg-[#E8501A] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap">
              <div className="w-4 h-4 flex items-center justify-center"><i className="ri-save-line"></i></div>
              Guardar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
