import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

interface PerfilEmpresaDashboardProps {
  empresa: any;
}

const sectorOptions = [
  "Telecomunicações","Energia & Petróleo","Banca & Finanças","Fintech & Pagamentos",
  "Media & Comunicação","Saúde","Seguros","Indústria & FMCG","Engenharia & Infra-estrutura","Educação",
];
const provinciaOptions = ["Luanda","Benguela","Huambo","Cabinda","Namibe","Malanje","Huíla"];

export default function PerfilEmpresaDashboard({ empresa: initialEmpresa }: PerfilEmpresaDashboardProps) {
  const [empresa, setEmpresa] = useState(initialEmpresa);
  const [activeSection, setActiveSection] = useState("info");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<"logo" | "cover" | null>(null);
  const [saved, setSaved] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File, type: "logo" | "cover") => {
    setUploading(type);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${empresa.id}_${type}_${Date.now()}.${fileExt}`;
      const filePath = `profiles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('applications')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('applications')
        .getPublicUrl(filePath);

      // Update local state
      const updatedFields = type === "logo" ? { logo_url: publicUrl } : { cover_url: publicUrl };
      setEmpresa(prev => ({ ...prev, ...updatedFields }));

      // Save to DB immediately
      const { error: dbError } = await supabase
        .from('companies')
        .update(updatedFields)
        .eq('id', empresa.id);

      if (dbError) throw dbError;

      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: `${type === "logo" ? "Logotipo" : "Capa"} actualizada com sucesso!`,
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Erro no upload',
        text: 'Não foi possível carregar a imagem.'
      });
    } finally {
      setUploading(null);
    }
  };

  const sections = [
    { id: "info", label: "Informações Gerais", icon: "ri-building-2-line" },
    { id: "descricao", label: "Sobre a Empresa", icon: "ri-file-text-line" },
    { id: "social", label: "Contactos & Links", icon: "ri-links-line" },
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('companies')
        .update({
          name: empresa.name,
          sector: empresa.sector,
          province: empresa.province,
          description: empresa.description,
          phone: empresa.phone,
          website: empresa.website,
          logo_url: empresa.logo_url,
          cover_url: empresa.cover_url
        })
        .eq('id', empresa.id);

      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao actualizar',
        text: err instanceof Error ? err.message : "Ocorreu um erro desconhecido",
        confirmButtonColor: '#E8501A'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="font-extrabold text-[#1A1A2E] text-xl sm:text-2xl tracking-tight">Perfil da Empresa</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">Mantém as tuas informações actualizadas para atrair talentos.</p>
        </div>
        <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] bg-emerald-50 text-emerald-700 border-2 border-emerald-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl font-black uppercase tracking-widest w-fit">
          <i className="ri-shield-check-line text-base sm:text-sm"></i> Verificada
        </span>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden mb-8 shadow-sm">
        <div className="relative h-48 bg-gradient-to-r from-[#1A1A2E] to-[#2D2D44]">
          <input 
            type="file" 
            ref={coverInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "cover")}
          />
          {empresa.cover_url && (
            <img src={empresa.cover_url} alt="Capa" className="w-full h-full object-cover opacity-60" />
          )}
          <button 
            onClick={() => coverInputRef.current?.click()}
            disabled={uploading === "cover"}
            className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/20 hover:bg-white/40 text-white px-5 py-2.5 rounded-2xl font-bold text-xs transition-all backdrop-blur-md cursor-pointer border border-white/30 disabled:opacity-50"
          >
            {uploading === "cover" ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : <i className="ri-camera-line text-base"></i>}
            {uploading === "cover" ? "A carregar..." : "Alterar Capa"}
          </button>
        </div>
        <div className="px-4 sm:px-10 pb-6 sm:pb-8 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 -mt-16 sm:-mt-12">
          <div className="relative group z-10 flex-shrink-0">
            <input 
              type="file" 
              ref={logoInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "logo")}
            />
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[24px] sm:rounded-[32px] overflow-hidden border-4 sm:border-8 border-white bg-white shadow-xl flex items-center justify-center">
              {uploading === "logo" ? (
                <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-[#E8501A] border-t-transparent rounded-full animate-spin"></div>
              ) : empresa.logo_url ? (
                <img src={empresa.logo_url} alt={empresa.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl sm:text-4xl font-black text-[#E8501A]">{empresa.name[0]}</span>
              )}
            </div>
            <button 
              onClick={() => logoInputRef.current?.click()}
              disabled={uploading === "logo"}
              className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#E8501A] text-white rounded-xl sm:rounded-2xl cursor-pointer hover:bg-[#C73E0C] transition-all shadow-lg shadow-orange-900/20 disabled:opacity-50"
            >
              <i className="ri-camera-line text-base sm:text-lg"></i>
            </button>
          </div>
          <div className="pb-0 sm:pb-2 text-center sm:text-left flex-1 min-w-0 w-full">
            <h3 className="font-black text-[#1A1A2E] text-xl sm:text-2xl leading-tight truncate">{empresa.name}</h3>
            <p className="text-xs sm:text-sm text-gray-500 font-bold flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 mt-1.5 flex-wrap">
              <i className="ri-building-line text-[#E8501A]"></i>
              <span className="truncate">{empresa.sector}</span>
              <span className="text-gray-300">•</span>
              <span className="truncate">{empresa.province}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex lg:flex-col gap-2 lg:w-64 flex-shrink-0 overflow-x-auto pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap border-2 ${
                activeSection === s.id 
                  ? "bg-[#1A1A2E] border-[#1A1A2E] text-white shadow-lg" 
                  : "bg-white border-gray-50 text-gray-500 hover:border-[#E8501A]/30"
              }`}
            >
              <i className={`${s.icon} text-base sm:text-lg`}></i>
              {s.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="flex-1 bg-white rounded-2xl sm:rounded-[32px] border border-gray-100 p-5 sm:p-8 shadow-sm">
          {activeSection === "info" && (
            <div className="space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Informações Gerais</h3>
              <div>
                <label className="block text-[10px] font-black text-[#1A1A2E] uppercase tracking-widest mb-2 ml-1">Nome da Empresa</label>
                <input 
                  type="text" 
                  value={empresa.name} 
                  onChange={e => setEmpresa({...empresa, name: e.target.value})}
                  required 
                  className="w-full border-2 border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] transition-all bg-gray-50/50 focus:bg-white" 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-[#1A1A2E] uppercase tracking-widest mb-2 ml-1">Sector de Actuação</label>
                  <select 
                    value={empresa.sector}
                    onChange={e => setEmpresa({...empresa, sector: e.target.value})}
                    className="w-full border-2 border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] appearance-none bg-gray-50/50 cursor-pointer"
                  >
                    {sectorOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#1A1A2E] uppercase tracking-widest mb-2 ml-1">Província Sede</label>
                  <select 
                    value={empresa.province}
                    onChange={e => setEmpresa({...empresa, province: e.target.value})}
                    className="w-full border-2 border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] appearance-none bg-gray-50/50 cursor-pointer"
                  >
                    {provinciaOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === "descricao" && (
            <div className="space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Sobre a Empresa</h3>
              <div>
                <label className="block text-[10px] font-black text-[#1A1A2E] uppercase tracking-widest mb-2 ml-1">Biografia da Empresa</label>
                <textarea 
                  rows={6} 
                  value={empresa.description || ""} 
                  onChange={e => setEmpresa({...empresa, description: e.target.value})}
                  required 
                  placeholder="Conta a história da vossa empresa..."
                  className="w-full border-2 border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-medium text-[#374151] focus:outline-none focus:border-[#E8501A] transition-all bg-gray-50/50 focus:bg-white resize-none"
                ></textarea>
                <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">Isto será exibido no teu perfil público para os estudantes.</p>
              </div>
            </div>
          )}

          {activeSection === "social" && (
            <div className="space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Contactos & Presença Digital</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-[#1A1A2E] uppercase tracking-widest mb-2 ml-1">Telefone Principal</label>
                  <input 
                    type="tel" 
                    value={empresa.phone || ""} 
                    onChange={e => setEmpresa({...empresa, phone: e.target.value})}
                    placeholder="+244 9..."
                    className="w-full border-2 border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] bg-gray-50/50" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#1A1A2E] uppercase tracking-widest mb-2 ml-1">Website Oficial</label>
                  <input 
                    type="url" 
                    value={empresa.website || ""} 
                    onChange={e => setEmpresa({...empresa, website: e.target.value})}
                    placeholder="https://..."
                    className="w-full border-2 border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] bg-gray-50/50" 
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row items-center justify-between mt-8 sm:mt-10 pt-6 sm:pt-8 border-t-2 border-gray-50 gap-4">
            {saved ? (
              <div className="flex items-center gap-2 text-xs text-emerald-600 font-black uppercase tracking-widest animate-in fade-in slide-in-from-left-2 w-full sm:w-auto justify-center sm:justify-start">
                <i className="ri-checkbox-circle-fill text-lg"></i>
                Perfil actualizado!
              </div>
            ) : <div className="hidden sm:block"></div>}
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center justify-center gap-3 bg-[#E8501A] disabled:opacity-50 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm font-black shadow-xl shadow-orange-900/20 hover:scale-105 transition-all cursor-pointer w-full sm:w-auto"
            >
              {loading ? "A Guardar..." : (
                <>
                  <i className="ri-save-line text-lg"></i>
                  Guardar Alterações
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

