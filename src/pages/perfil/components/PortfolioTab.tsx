import { useState } from "react";
import type { Projeto } from "@/mocks/perfil";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";

interface PortfolioTabProps {
  projetos: Projeto[];
}

function ProjetoModal({ projeto, onClose, onDelete }: { projeto: Projeto; onClose: () => void; onDelete?: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-[40px] max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-72 overflow-hidden">
          <img src={projeto.image} alt={projeto.title} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-2xl cursor-pointer transition-all"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
          {projeto.featured && (
            <span className="absolute top-6 left-6 text-[10px] bg-[#E8501A] text-white px-4 py-2 rounded-xl font-black uppercase tracking-widest">
              Projecto Destaque
            </span>
          )}
        </div>
        <div className="p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="font-black text-[#1A1A2E] text-2xl leading-tight">{projeto.title}</h3>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-2">{projeto.date}</p>
            </div>
          </div>
          <p className="text-gray-600 mt-6 leading-relaxed font-medium">{projeto.description}</p>
          <div className="flex flex-wrap gap-2 mt-8">
            {projeto.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-4 py-2 bg-gray-50 text-[#1A1A2E] rounded-xl font-black uppercase tracking-widest border border-gray-100">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-10 pt-8 border-t border-gray-50">
            {projeto.github && (
              <a
                href={projeto.github.startsWith('http') ? projeto.github : `https://${projeto.github}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex-1 min-w-[200px] flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-[#1A1A2E] border-2 border-gray-100 rounded-2xl px-6 py-4 hover:border-[#1A1A2E] transition-all"
              >
                <i className="ri-github-line text-lg"></i>
                Código Fonte
              </a>
            )}
            {projeto.link && (
              <a
                href={projeto.link}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex-1 min-w-[200px] flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-white bg-[#E8501A] rounded-2xl px-6 py-4 hover:scale-105 transition-all shadow-xl shadow-orange-900/20"
              >
                <i className="ri-external-link-line text-lg"></i>
                Ver Projecto
              </a>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-red-600 border-2 border-red-100 rounded-2xl px-6 py-4 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer"
              >
                <i className="ri-delete-bin-line text-lg"></i>
                Eliminar Projecto
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddProjetoModal({ onClose, onRefresh }: { onClose: () => void, onRefresh: () => void }) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    github_url: "",
    live_url: "",
    is_featured: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      let imageUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800";

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${user.id}_${Date.now()}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('students')
          .upload(filePath, imageFile);

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('students')
            .getPublicUrl(filePath);
          imageUrl = publicUrl;
        }
      }

      const { error } = await supabase
        .from('projects')
        .insert({
          student_id: user.id,
          title: formData.title,
          description: formData.description,
          technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t),
          github_url: formData.github_url,
          live_url: formData.live_url,
          is_featured: formData.is_featured,
          image_url: imageUrl
        });

      if (error) throw error;
      setSubmitted(true);
      setTimeout(() => {
        onRefresh();
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-[40px] max-w-md w-full p-12 text-center animate-in zoom-in-95 duration-300">
          <div className="w-24 h-24 bg-emerald-100 rounded-[32px] flex items-center justify-center text-4xl text-emerald-600 mx-auto mb-8">
            <i className="ri-check-line"></i>
          </div>
          <h3 className="font-black text-[#1A1A2E] text-2xl">Projecto Publicado!</h3>
          <p className="text-gray-500 mt-4 font-medium">O teu portfólio está agora mais forte.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-[40px] max-w-xl w-full overflow-hidden animate-in slide-in-from-bottom-8 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h3 className="font-black text-[#1A1A2E] text-xl">Novo Projecto</h3>
            <p className="text-[10px] font-black text-[#E8501A] uppercase tracking-widest mt-1">Passo {step} de 2</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {step === 1 ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="relative group">
                <div className={`w-full h-48 border-4 border-dashed rounded-[32px] flex flex-col items-center justify-center gap-2 overflow-hidden transition-all ${imageFile ? 'border-emerald-100 bg-emerald-50/20' : 'border-gray-50 bg-gray-50/30 group-hover:border-orange-100'}`}>
                   {imageFile ? (
                     <img src={URL.createObjectURL(imageFile)} className="w-full h-full object-cover" />
                   ) : (
                     <>
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#E8501A] shadow-sm mb-2">
                          <i className="ri-image-add-line text-xl"></i>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Capa do Projecto</p>
                     </>
                   )}
                   <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                   />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Título do Projecto</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Sistema de Gestão Hospitalar"
                  className="w-full bg-gray-50/50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Descrição</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Explica o que o projecto faz e que problemas resolve..."
                  className="w-full bg-gray-50/50 border-2 border-gray-50 rounded-[24px] px-6 py-4 text-sm font-medium text-[#374151] focus:outline-none focus:border-[#E8501A] focus:bg-white transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-5 bg-[#1A1A2E] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-gray-900/20"
              >
                Próximo Passo <i className="ri-arrow-right-line ml-2"></i>
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Tecnologias (separadas por vírgula)</label>
                <input
                  type="text"
                  required
                  value={formData.technologies}
                  onChange={e => setFormData({...formData, technologies: e.target.value})}
                  placeholder="React, TypeScript, Supabase..."
                  className="w-full bg-gray-50/50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] focus:bg-white transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={e => setFormData({...formData, github_url: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-gray-50/50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Live URL (Demo)</label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={e => setFormData({...formData, live_url: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-gray-50/50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] focus:bg-white transition-all"
                  />
                </div>
              </div>
              <label className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl cursor-pointer group">
                <div 
                  onClick={() => setFormData({...formData, is_featured: !formData.is_featured})}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${
                    formData.is_featured ? "bg-[#E8501A] border-[#E8501A]" : "border-gray-200 group-hover:border-[#E8501A]/40"
                  }`}
                >
                  {formData.is_featured && <i className="ri-check-line text-white"></i>}
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Marcar como projecto em destaque</span>
              </label>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-5 bg-gray-100 text-[#1A1A2E] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-2 py-5 bg-[#E8501A] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-orange-900/20 disabled:opacity-50"
                >
                  {loading ? "A publicar..." : "Publicar Projecto"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default function PortfolioTab({ projetos: initialProjetos }: PortfolioTabProps) {
  const [projetos, setProjetos] = useState<Projeto[]>(initialProjetos);
  const [selectedProjeto, setSelectedProjeto] = useState<Projeto | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<"todos" | "destaques">("todos");

  const filtered = filter === "destaques" ? projetos.filter((p) => p.featured) : projetos;

  const deleteProjeto = async (projeto: Projeto) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Eliminar Projecto?',
      html: `<p>Tens a certeza que queres eliminar <strong>"${projeto.title}"</strong>?</p><p class="text-sm text-gray-500 mt-2">Esta acção é irreversível.</p>`,
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sim, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (!result.isConfirmed) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', projeto.id);
      if (error) throw error;
      setProjetos(prev => prev.filter(p => p.id !== projeto.id));
      setSelectedProjeto(null);
      Swal.fire({ icon: 'success', title: 'Eliminado!', text: 'O projecto foi removido do teu portfólio.', confirmButtonColor: '#1A1A2E', timer: 2000, showConfirmButton: false });
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Erro', text: err.message || 'Não foi possível eliminar o projecto.', confirmButtonColor: '#E8501A' });
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#1A1A2E] leading-tight">Portfólio Criativo</h2>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">
            {projetos.length} projectos no total
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-3 bg-[#E8501A] text-white px-8 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-900/20"
        >
          <i className="ri-add-circle-line text-xl"></i>
          Novo Projecto
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-10 bg-white p-2 rounded-[24px] w-fit border-2 border-gray-50 shadow-sm">
        {(["todos", "destaques"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === f ? "bg-[#1A1A2E] text-white shadow-lg shadow-gray-900/20" : "text-gray-400 hover:text-[#1A1A2E]"
            }`}
          >
            {f === "todos" ? "Todos os Projectos" : "Apenas Destaques"}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {filtered.map((projeto) => (
          <div
            key={projeto.id}
            className="group bg-white rounded-[40px] border-2 border-gray-50 overflow-hidden hover:border-[#E8501A]/20 hover:shadow-2xl hover:shadow-orange-900/5 transition-all duration-500 cursor-pointer"
            onClick={() => setSelectedProjeto(projeto)}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={projeto.image}
                alt={projeto.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {projeto.featured && (
                <div className="absolute top-5 left-5 bg-[#E8501A] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">
                  Destaque
                </div>
              )}
            </div>
            <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-black text-[#1A1A2E] text-lg leading-tight group-hover:text-[#E8501A] transition-colors">{projeto.title}</h3>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter mt-1">{projeto.date}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteProjeto(projeto); }}
                      title="Eliminar projecto"
                      className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-red-50 text-gray-300 hover:text-red-500 transition-all cursor-pointer flex-shrink-0"
                    >
                      <i className="ri-delete-bin-line text-sm"></i>
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed mb-6">{projeto.description}</p>
                <div className="flex flex-wrap gap-2">
                  {projeto.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-gray-50 text-gray-500 rounded-lg border border-gray-100">
                      {tag}
                    </span>
                  ))}
                  {projeto.tags.length > 3 && (
                    <span className="text-[9px] font-black text-gray-300 py-1.5">+ {projeto.tags.length - 3}</span>
                  )}
                </div>
              </div>
          </div>
        ))}

        {/* Empty State / Add Card */}
        <div
          onClick={() => setShowAddModal(true)}
          className="border-4 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center min-h-[300px] gap-6 hover:border-[#E8501A]/30 hover:bg-orange-50/30 transition-all duration-500 group"
        >
          <div className="w-20 h-20 flex items-center justify-center rounded-[32px] bg-gray-50 group-hover:bg-[#E8501A] group-hover:text-white transition-all duration-500 shadow-xl shadow-gray-200/20">
            <i className="ri-add-line text-3xl"></i>
          </div>
          <div className="text-center px-6">
            <p className="text-sm font-black text-[#1A1A2E] uppercase tracking-widest">Adicionar Novo Projecto</p>
            <p className="text-xs font-medium text-gray-400 mt-2">Destaque as tuas melhores competências</p>
          </div>
        </div>
      </div>

      {selectedProjeto && (
        <ProjetoModal projeto={selectedProjeto} onClose={() => setSelectedProjeto(null)} onDelete={() => deleteProjeto(selectedProjeto)} />
      )}
      {showAddModal && (
        <AddProjetoModal 
          onClose={() => setShowAddModal(false)} 
          onRefresh={() => window.location.reload()} 
        />
      )}
    </div>
  );
}

