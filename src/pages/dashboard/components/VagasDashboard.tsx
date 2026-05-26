import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";

interface VagasDashboardProps {
  vagas: any[];
  onVerCandidatos: (vagaId: string) => void;
  onRefresh: () => void;
}

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  Activa: { color: "text-emerald-700", bg: "bg-emerald-50", label: "Activa" },
  Aberta: { color: "text-emerald-700", bg: "bg-emerald-50", label: "Aberta" },
  Encerrada: { color: "text-gray-600", bg: "bg-gray-100", label: "Encerrada" },
  Rascunho: { color: "text-amber-700", bg: "bg-amber-50", label: "Rascunho" },
};

const typeColors: Record<string, string> = {
  Presencial: "bg-blue-50 text-blue-700",
  Híbrido: "bg-violet-50 text-violet-700",
  Remoto: "bg-emerald-50 text-emerald-700",
};

const internshipTypeColors: Record<string, string> = {
  "Estágio Curricular": "bg-sky-50 text-sky-700",
  "Estágio Remunerado": "bg-emerald-50 text-emerald-700",
  "Estágio Não Remunerado": "bg-amber-50 text-amber-700",
};

function PublicarVagaModal({ onClose, onRefresh }: { onClose: () => void; onRefresh: () => void }) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    area: "Tecnologia",
    type: "Presencial",
    internship_type: "Estágio Curricular",
    province: "Luanda",
    duration: "3 meses",
    description: "",
    requirements: "",
    benefits: "",
    vacancies_count: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('internships')
        .insert({
          company_id: user?.id,
          title: formData.title,
          area: formData.area,
          type: formData.type,
          internship_type: formData.internship_type,
          province: formData.province,
          duration: formData.duration,
          description: formData.description,
          requirements: formData.requirements,
          benefits: formData.benefits,
          vacancies_count: Number(formData.vacancies_count) || 1,
          status: 'Activa'
        });

      if (error) throw error;
      onRefresh();
      onClose();
      Swal.fire({
        icon: 'success',
        title: 'Vaga Publicada!',
        text: 'A sua vaga de estágio já está disponível para candidaturas.',
        confirmButtonColor: '#1A1A2E'
      });
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao publicar',
        text: err.message,
        confirmButtonColor: '#E8501A'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h3 className="font-extrabold text-[#1A1A2E] text-xl">Publicar Nova Vaga</h3>
            <p className="text-xs text-gray-400 mt-1 font-medium">Passo {step} de 2</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-2xl transition-colors cursor-pointer text-gray-400">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {step === 1 ? (
            <>
              <div>
                <label className="block text-xs font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Título da Vaga *</label>
                <input 
                  required 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Estagiário de Marketing Digital" 
                  className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#E8501A] transition-all bg-gray-50/50 focus:bg-white" 
                />
              </div>

              {/* Tipo de Estágio */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Tipo de Estágio *</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Estágio Curricular", "Estágio Remunerado", "Estágio Não Remunerado"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({...formData, internship_type: t})}
                      className={`px-3 py-3 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer text-center ${
                        formData.internship_type === t
                          ? "border-[#E8501A] bg-orange-50 text-[#E8501A]"
                          : "border-gray-100 text-gray-500 hover:border-orange-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Área *</label>
                  <select 
                    required 
                    value={formData.area}
                    onChange={e => setFormData({...formData, area: e.target.value})}
                    className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#E8501A] appearance-none bg-gray-50/50 cursor-pointer"
                  >
                    {["Tecnologia","Marketing","Finanças","Gestão","Engenharia","Direito","Saúde","Comunicação"].map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Modalidade *</label>
                  <select 
                    required 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#E8501A] appearance-none bg-gray-50/50 cursor-pointer"
                  >
                    {["Presencial","Híbrido","Remoto"].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Duração *</label>
                  <select 
                    required 
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#E8501A] appearance-none bg-gray-50/50 cursor-pointer"
                  >
                    {["1 mês","3 meses","6 meses","12 meses"].map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Vagas Disponíveis *</label>
                  <input 
                    required 
                    type="number" 
                    min={1}
                    value={formData.vacancies_count}
                    onChange={e => setFormData({...formData, vacancies_count: Math.max(1, parseInt(e.target.value) || 1)})}
                    className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#E8501A] transition-all bg-gray-50/50 focus:bg-white" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Localização *</label>
                <select 
                  required 
                  value={formData.province}
                  onChange={e => setFormData({...formData, province: e.target.value})}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#E8501A] appearance-none bg-gray-50/50 cursor-pointer"
                >
                  <option value="Sem localidade física / Remoto">🌐 Sem localidade física / Remoto</option>
                  {["Luanda","Benguela","Huambo","Cabinda","Namibe","Malanje","Huíla","Uíge","Moxico","Bié"].map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Descrição da Vaga *</label>
                <textarea 
                  required 
                  rows={4} 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="O que o estagiário irá fazer?" 
                  className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#E8501A] transition-all bg-gray-50/50 focus:bg-white resize-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-[#E8501A] text-white rounded-2xl font-bold hover:bg-[#C73E0C] transition-all shadow-lg shadow-orange-900/20 cursor-pointer">Próximo Passo</button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Requisitos Técnicos *</label>
                <textarea 
                  required 
                  rows={4} 
                  value={formData.requirements}
                  onChange={e => setFormData({...formData, requirements: e.target.value})}
                  placeholder="Ex: Conhecimentos em Excel, React, etc." 
                  className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#E8501A] bg-gray-50/50 focus:bg-white resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Benefícios (Opcional)</label>
                <textarea 
                  rows={3} 
                  value={formData.benefits}
                  onChange={e => setFormData({...formData, benefits: e.target.value})}
                  placeholder="Subsídio, mentoria, certificado..." 
                  className="w-full border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#E8501A] bg-gray-50/50 focus:bg-white resize-none"
                ></textarea>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 border-2 border-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all cursor-pointer">Voltar</button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 py-4 bg-[#E8501A] disabled:opacity-50 text-white rounded-2xl font-bold hover:bg-[#C73E0C] shadow-lg shadow-orange-900/20 transition-all cursor-pointer"
                >
                  {loading ? "A publicar..." : "Publicar Vaga"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default function VagasDashboard({ vagas, onVerCandidatos, onRefresh }: VagasDashboardProps) {
  const [filterStatus, setFilterStatus] = useState<string>("Todas");
  const [showModal, setShowModal] = useState(false);

  const filtered = filterStatus === "Todas" ? vagas : vagas.filter((v) => v.status === filterStatus);

  const toggleStatus = async (vaga: any) => {
    const newStatus = vaga.status === 'Activa' ? 'Encerrada' : 'Activa';
    
    try {
      const { error } = await supabase
        .from('internships')
        .update({ status: newStatus })
        .eq('id', vaga.id);
        
      if (error) throw error;
      
      Swal.fire({
        icon: 'success',
        title: 'Estado atualizado!',
        text: `A vaga foi ${newStatus === 'Encerrada' ? 'encerrada' : 'reaberta'} com sucesso.`,
        confirmButtonColor: '#E8501A'
      });
      onRefresh();
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao atualizar',
        text: err.message || "Ocorreu um erro ao tentar alterar o estado da vaga.",
        confirmButtonColor: '#E8501A'
      });
    }
  };

  const deleteVaga = async (vaga: any) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Eliminar Vaga?',
      html: `<p>Tens a certeza que queres eliminar a vaga <strong>"${vaga.title}"</strong>?</p><p class="text-sm text-gray-500 mt-2">Esta acção é irreversível e todas as candidaturas associadas serão perdidas.</p>`,
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sim, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) return;

    try {
      const { error } = await supabase
        .from('internships')
        .delete()
        .eq('id', vaga.id);

      if (error) throw error;

      Swal.fire({
        icon: 'success',
        title: 'Vaga eliminada!',
        text: 'A vaga foi removida com sucesso.',
        confirmButtonColor: '#1A1A2E',
        timer: 2000,
        showConfirmButton: false
      });
      onRefresh();
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao eliminar',
        text: err.message || "Não foi possível eliminar a vaga.",
        confirmButtonColor: '#E8501A'
      });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-extrabold text-[#1A1A2E] text-2xl tracking-tight">Gestão de Vagas</h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">Administra as tuas oportunidades de estágio abertas.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#1A1A2E] text-white px-6 py-3.5 rounded-2xl text-sm font-bold hover:bg-[#2D2D44] shadow-xl shadow-gray-200 transition-all cursor-pointer whitespace-nowrap"
        >
          <i className="ri-add-line text-lg"></i>
          Nova Vaga
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {["Todas", "Activa", "Encerrada"].map((f) => {
          const count = f === "Todas" ? vagas.length : vagas.filter(v => v.status === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border-2 ${
                filterStatus === f ? "bg-[#E8501A] border-[#E8501A] text-white" : "bg-white border-gray-100 text-gray-500 hover:border-[#E8501A]/30"
              }`}
            >
              {f} ({count})
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.length > 0 ? (
          filtered.map((vaga) => {
            const cfg = statusConfig[vaga.status] || statusConfig.Activa;
            return (
              <div key={vaga.id} className="bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-100 transition-all group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${cfg.bg} ${cfg.color} border border-current opacity-70`}>
                        {cfg.label}
                      </span>
                      {vaga.internship_type && (
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${internshipTypeColors[vaga.internship_type] || "bg-gray-100 text-gray-600"}`}>
                          {vaga.internship_type}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 font-bold">
                        {new Date(vaga.created_at).toLocaleDateString('pt-AO')}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-[#1A1A2E] text-lg group-hover:text-[#E8501A] transition-colors mb-2">{vaga.title}</h3>
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                      <div className="flex items-center gap-1.5">
                        <i className="ri-map-pin-line text-[#E8501A] text-xs font-bold"></i>
                        <span className="text-xs text-gray-600 font-bold">{vaga.province}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <i className="ri-briefcase-line text-[#E8501A] text-xs font-bold"></i>
                        <span className="text-xs text-gray-600 font-bold">{vaga.area}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <i className="ri-time-line text-[#E8501A] text-xs font-bold"></i>
                        <span className="text-xs text-gray-600 font-bold">{vaga.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <i className="ri-team-line text-[#E8501A] text-xs font-bold"></i>
                        <span className="text-xs text-gray-600 font-bold">{vaga.vacancies_count || 1} {vaga.vacancies_count > 1 ? 'vagas' : 'vaga'}</span>
                      </div>
                      {vaga.type && (
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${typeColors[vaga.type] || "bg-gray-100 text-gray-600"}`}>
                          {vaga.type}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-3 justify-between md:justify-start">
                    <button
                      onClick={() => onVerCandidatos(vaga.id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-50 text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                    >
                      Ver Candidatos
                      <i className="ri-arrow-right-line"></i>
                    </button>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => toggleStatus(vaga)}
                        title={vaga.status === 'Activa' ? 'Encerrar Vaga' : 'Reabrir Vaga'}
                        className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all cursor-pointer ${
                          vaga.status === 'Activa' 
                            ? "bg-amber-50 hover:bg-amber-100 text-amber-600 hover:text-amber-700" 
                            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 hover:text-emerald-700"
                        }`}
                      >
                        <i className={`text-lg ${vaga.status === 'Activa' ? 'ri-lock-2-line' : 'ri-lock-unlock-line'}`}></i>
                      </button>
                      <button 
                        onClick={() => deleteVaga(vaga)}
                        title="Eliminar Vaga" 
                        className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-2xl transition-all cursor-pointer"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <i className="ri-briefcase-line text-gray-300 text-3xl"></i>
             </div>
             <p className="text-gray-400 font-bold">Ainda não publicaste nenhuma vaga.</p>
             <button onClick={() => setShowModal(true)} className="mt-4 text-[#E8501A] font-bold hover:underline">Publicar a minha primeira vaga</button>
          </div>
        )}
      </div>

      {showModal && (
        <PublicarVagaModal 
          onClose={() => setShowModal(false)} 
          onRefresh={onRefresh} 
        />
      )}
    </div>
  );
}
