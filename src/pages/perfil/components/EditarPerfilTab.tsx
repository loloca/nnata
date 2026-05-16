import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";
import SearchableSelect from "@/components/common/SearchableSelect";

interface EditarPerfilTabProps {
  perfil: any;
}

const areaOptions = [
  "Tecnologia", "Finanças", "Engenharia", "Marketing", "Direito",
  "Saúde", "Gestão", "Comunicação", "Arquitectura", "Educação",
];

const anoSuperiorOptions = ["1.º Ano", "2.º Ano", "3.º Ano", "4.º Ano", "5.º Ano", "Recém-Formado"];
const anoMedioOptions = ["10.ª Classe", "11.ª Classe", "12.ª Classe", "13.ª Classe"];
const provinciaOptions = [
  "Luanda", "Benguela", "Huambo", "Namibe", "Cabinda",
  "Malanje", "Huíla", "Cunene", "Bié", "Moxico",
];

const medioCourses = [
  "Técnico de Informática", "Técnico de Programação", "Técnico de Redes Informáticas", "Técnico de Sistemas Informáticos",
  "Técnico de Base de Dados", "Técnico de Cibersegurança", "Técnico de Multimédia", "Técnico de Design Gráfico",
  "Técnico de Electrónica", "Técnico de Telecomunicações", "Técnico de Electricidade Industrial", "Técnico de Electromecânica",
  "Técnico de Mecânica Industrial", "Técnico de Mecânica Auto", "Técnico de Mecatrónica", "Técnico de Frio e Climatização",
  "Técnico de Energias Renováveis", "Técnico de Automação Industrial", "Técnico de Instrumentação Industrial", "Técnico de Soldadura",
  "Técnico de Construção Civil", "Técnico de Obras Públicas", "Técnico de Topografia", "Técnico de Desenho de Construção Civil",
  "Técnico de Hidráulica", "Técnico de Saneamento", "Técnico de Urbanismo", "Técnico de Carpintaria", "Técnico de Canalização",
  "Técnico de Pintura de Construção", "Técnico de Geologia", "Técnico de Minas", "Técnico de Petróleo e Gás", "Técnico de Perfuração Petrolífera",
  "Técnico de Refinação", "Técnico de Metalurgia", "Técnico de Química Industrial", "Técnico de Ambiente", "Técnico de Laboratório Industrial",
  "Técnico de Segurança Industrial", "Técnico de Administração Pública", "Técnico de Administração e Gestão", "Técnico de Contabilidade",
  "Técnico de Finanças", "Técnico de Comércio", "Técnico de Gestão Empresarial", "Técnico de Recursos Humanos", "Técnico de Marketing",
  "Técnico de Secretariado", "Técnico de Estatística", "Técnico de Planeamento", "Técnico de Gestão Bancária", "Técnico de Logística",
  "Técnico de Procurement", "Técnico de Seguros", "Técnico de Empreendedorismo", "Técnico de Comunicação Social", "Técnico de Jornalismo",
  "Técnico de Produção de Eventos", "Técnico de Relações Públicas", "Técnico de Turismo", "Técnico de Hotelaria", "Técnico de Restauração",
  "Técnico de Cozinha", "Técnico de Pastelaria", "Técnico de Guia Turístico", "Técnico Agrário", "Técnico de Produção Animal",
  "Técnico de Veterinária", "Técnico Florestal", "Técnico de Irrigação", "Técnico de Agropecuária", "Técnico de Pescas", "Técnico de Aquicultura",
  "Técnico de Agricultura Sustentável", "Técnico Médio de Enfermagem", "Técnico de Análises Clínicas", "Técnico de Farmácia",
  "Técnico de Radiologia", "Técnico de Saúde Ambiental", "Técnico de Fisioterapia", "Técnico de Nutrição", "Técnico de Saúde Pública",
  "Técnico de Estomatologia", "Técnico de Hemoterapia", "Técnico de Música", "Técnico de Artes Visuais", "Técnico de Teatro",
  "Técnico de Dança", "Técnico de Moda", "Técnico de Design de Interiores", "Técnico de Educação Física", "Técnico de Desporto",
  "Técnico de Arbitragem", "Técnico de Segurança no Trabalho", "Técnico de Protecção Civil", "Técnico de Bombeiros", "Técnico Aduaneiro",
  "Técnico de Transporte Marítimo", "Técnico de Aviação Civil"
];

const superiorCourses = [
  "Medicina", "Enfermagem", "Farmácia", "Odontologia", "Psicologia", "Fisioterapia", "Nutrição", "Saúde Pública",
  "Análises Clínicas", "Radiologia", "Direito", "Relações Internacionais", "Ciência Política", "Administração Pública",
  "Sociologia", "Filosofia", "História", "Antropologia", "Serviço Social", "Criminologia", "Gestão de Empresas",
  "Contabilidade e Auditoria", "Economia", "Finanças", "Gestão Bancária", "Marketing", "Recursos Humanos", "Gestão Comercial",
  "Comércio Exterior", "Logística", "Empreendedorismo", "Gestão de Projectos", "Engenharia Informática", "Engenharia de Software",
  "Ciência da Computação", "Sistemas de Informação", "Engenharia de Redes", "Cibersegurança", "Inteligência Artificial",
  "Ciência de Dados", "Engenharia Electrotécnica", "Engenharia Electrónica", "Engenharia Mecânica", "Engenharia Civil",
  "Engenharia Química", "Engenharia Ambiental", "Engenharia Industrial", "Engenharia de Minas", "Engenharia Petrolífera",
  "Engenharia Agronómica", "Engenharia Florestal", "Engenharia Hidráulica", "Engenharia de Energias Renováveis",
  "Arquitectura e Urbanismo", "Urbanismo", "Design Industrial", "Matemática", "Física", "Química", "Biologia", "Geologia",
  "Estatística", "Actuariado", "Língua Portuguesa", "Língua Inglesa", "Língua Francesa", "Linguística", "Tradução e Interpretação",
  "Jornalismo", "Comunicação Social", "Cinema e Audiovisual", "Publicidade e Propaganda", "Relações Públicas", "Turismo e Hotelaria",
  "Gastronomia", "Educação Física", "Ciências do Desporto", "Treino Desportivo", "Arbitragem Desportiva", "Música", "Teatro",
  "Dança", "Artes Visuais", "Moda e Estilismo", "Design Gráfico", "Design de Interiores", "Pedagogia", "Ciências da Educação",
  "Educação de Infância", "Ensino Primário", "Matemática Educacional", "Física Educacional", "Química Educacional",
  "Biologia Educacional", "Geografia", "Gestão Ambiental", "Oceanografia", "Meteorologia", "Aviação Civil", "Gestão Portuária e Marítima"
];

const sectorsOptions = [
  "Telecomunicações", "Energia & Petróleo", "Banca & Finanças",
  "Fintech & Pagamentos", "Media & Comunicação", "Saúde", "Seguros",
  "Indústria & FMCG", "Construção & Infra-estrutura", "Educação",
  "Tecnologia", "Consultoria", "Retalho & Comércio", "Agricultura",
];

export default function EditarPerfilTab({ perfil }: EditarPerfilTabProps) {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("pessoal");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({ ...perfil });

  const sections = user?.role === "estudante" ? [
    { id: "pessoal", label: "Dados Pessoais", icon: "ri-user-line" },
    { id: "academico", label: "Dados Académicos", icon: "ri-graduation-cap-line" },
    { id: "social", label: "Redes Sociais", icon: "ri-links-line" },
  ] : [
    { id: "empresa", label: "Dados da Empresa", icon: "ri-building-line" },
    { id: "social", label: "Links & Website", icon: "ri-global-line" },
  ];

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    const table = user.role === "estudante" ? "students" : "companies";
    let updatedData = { ...formData };

    // Handle File Upload if exists
    if (avatarFile) {
      const bucket = "applications"; // Consistent bucket for all profile assets
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      const filePath = `profiles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, avatarFile);

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);
        
        if (user.role === "estudante") updatedData.avatar_url = publicUrl;
        else updatedData.logo_url = publicUrl;

        // Update Auth metadata so Navbar reflects change immediately
        await supabase.auth.updateUser({
          data: { avatar_url: publicUrl }
        });
      } else {
        console.error("Upload error:", uploadError);
      }
    }
    
    const { error } = await supabase
      .from(table)
      .update(updatedData)
      .eq("id", user.id);

    if (!error) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        window.location.reload(); // Refresh to show new avatar everywhere
      }, 2000);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao salvar',
        text: error.message,
        confirmButtonColor: '#E8501A'
      });
    }
    setLoading(false);
  };

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArea = (area: string) => {
    const current = formData.areas_interest || [];
    const updated = current.includes(area)
      ? current.filter((a: string) => a !== area)
      : current.length < 3 ? [...current, area] : current;
    handleChange("areas_interest", updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-[#1A1A2E] text-lg">Editar Perfil</h2>
          <p className="text-sm text-gray-500 mt-0.5">Mantém os teus dados actualizados</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
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

        <form onSubmit={handleSave} className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          {/* Avatar / Logo Section */}
          <div className="mb-8 flex flex-col items-center sm:flex-row sm:items-center gap-6 pb-8 border-b border-gray-50">
            <div className="relative group">
              <div className={`w-24 h-24 overflow-hidden border-4 border-gray-50 shadow-sm ${user?.role === "estudante" ? "rounded-full" : "rounded-3xl"}`}>
                {(avatarFile || formData.avatar_url || formData.logo_url) ? (
                  <img 
                    src={avatarFile ? URL.createObjectURL(avatarFile) : (user?.role === "estudante" ? formData.avatar_url : formData.logo_url)} 
                    className="w-full h-full object-cover" 
                    alt="Perfil"
                  />
                ) : (
                  <div className="w-full h-full bg-orange-50 flex items-center justify-center text-[#E8501A]">
                    <i className={user?.role === "estudante" ? "ri-user-line text-3xl" : "ri-building-line text-3xl"}></i>
                  </div>
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <i className="ri-camera-line text-xl"></i>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-[#1A1A2E]">{user?.role === "estudante" ? "Foto de Perfil" : "Logotipo da Empresa"}</h4>
              <p className="text-xs text-gray-500 mt-1">Recomendado: Quadrado, min. 400x400px</p>
              <button 
                type="button"
                onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                className="mt-3 text-xs font-bold text-[#E8501A] hover:underline cursor-pointer"
              >
                Alterar imagem
              </button>
            </div>
          </div>

          {/* Estudante - Pessoal */}
          {activeSection === "pessoal" && user?.role === "estudante" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Nome completo</label>
                  <input
                    type="text"
                    value={formData.full_name || ""}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Telemóvel</label>
                  <input
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Província</label>
                  <select 
                    value={formData.province || ""}
                    onChange={(e) => handleChange("province", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] bg-white"
                  >
                    <option value="">Seleccione</option>
                    {provinciaOptions.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Bio</label>
                <textarea
                  rows={4}
                  value={formData.bio || ""}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] resize-none"
                ></textarea>
              </div>
            </div>
          )}

          {/* Estudante - Académico */}
          {activeSection === "academico" && user?.role === "estudante" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                   <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Nível de Ensino</label>
                   <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-100">
                     {["Médio", "Superior"].map(level => (
                       <button
                         key={level} type="button"
                         onClick={() => handleChange("education_level", level)}
                         className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                           (formData.education_level || "Superior") === level 
                             ? "bg-white text-[#1A1A2E] shadow-sm" 
                             : "text-gray-400"
                         }`}
                       >
                         Ensino {level}
                       </button>
                     ))}
                   </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Curso</label>
                  <SearchableSelect
                    options={(formData.education_level === "Médio" ? medioCourses : superiorCourses)}
                    value={formData.course || ""}
                    onChange={(val) => handleChange("course", val)}
                    placeholder="Pesquisa o teu curso"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Ano / Classe</label>
                  <select 
                    value={formData.academic_year || ""}
                    onChange={(e) => handleChange("academic_year", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] bg-white"
                  >
                    <option value="">Seleccione</option>
                    {(formData.education_level === "Médio" ? anoMedioOptions : anoSuperiorOptions).map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-3">Áreas de Interesse (máx. 3)</label>
                <div className="flex flex-wrap gap-2">
                  {areaOptions.map(area => (
                    <button
                      key={area} type="button"
                      onClick={() => toggleArea(area)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        (formData.areas_interest || []).includes(area)
                          ? "bg-[#E8501A] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Empresa - Geral */}
          {activeSection === "empresa" && user?.role === "empresa" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Nome da Empresa</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Sector</label>
                  <select 
                    value={formData.sector || ""}
                    onChange={(e) => handleChange("sector", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] bg-white"
                  >
                    <option value="">Seleccione</option>
                    {sectorsOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Província</label>
                  <select 
                    value={formData.province || ""}
                    onChange={(e) => handleChange("province", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] bg-white"
                  >
                    <option value="">Seleccione</option>
                    {provinciaOptions.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Descrição da Empresa</label>
                <textarea
                  rows={4}
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] resize-none"
                ></textarea>
              </div>
            </div>
          )}

          {/* Geral - Social */}
          {activeSection === "social" && (
            <div className="space-y-5">
              {user?.role === "estudante" ? (
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.linkedin_url || ""}
                    onChange={(e) => handleChange("linkedin_url", e.target.value)}
                    placeholder="https://linkedin.com/in/perfil"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A]"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Website</label>
                    <input
                      type="url"
                      value={formData.website || ""}
                      onChange={(e) => handleChange("website", e.target.value)}
                      placeholder="https://www.empresa.ao"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Logo URL</label>
                    <input
                      type="url"
                      value={formData.logo_url || ""}
                      onChange={(e) => handleChange("logo_url", e.target.value)}
                      placeholder="https://link-da-imagem.png"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A]"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
            {saved && (
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <i className="ri-check-double-line"></i> Guardado com sucesso!
              </div>
            )}
            <div />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#E8501A] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors disabled:opacity-50"
            >
              {loading ? <i className="ri-loader-4-line animate-spin"></i> : <i className="ri-save-line"></i>}
              Guardar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

