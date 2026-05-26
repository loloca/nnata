import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

interface CandidatosDashboardProps {
  candidatos: any[];
  vagas: any[];
  filtroVagaId?: string;
}

const statusConfig: Record<string, { color: string; bg: string; border: string }> = {
  Pendente: { color: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  Novo: { color: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  "Em análise": { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  Entrevista: { color: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200" },
  Aprovado: { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  Recusado: { color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
};

const allStatuses = ["Pendente", "Em análise", "Entrevista", "Aprovado", "Recusado"];

function AgendarEntrevistaModal({
  candidato,
  vagaTitle,
  onClose,
}: {
  candidato: any;
  vagaTitle: string;
  onClose: () => void;
}) {
  const student = candidato.students;
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;

    setLoading(true);
    try {
      const formattedDate = date.split('-').reverse().join('/');

      // Update application with interview details
      const { error: appError } = await supabase
        .from('applications')
        .update({
          status: 'Entrevista',
          interview_date: date,
          interview_time: time,
          interview_status: 'Pendente'
        })
        .eq('id', candidato.id);

      if (appError) throw appError;

      // Notify candidate
      await supabase.from('notifications').insert({
        user_id: candidato.student_id,
        title: '📅 Entrevista Agendada',
        content: `A empresa agendou uma entrevista contigo para a vaga "${vagaTitle}" no dia ${formattedDate} às ${time}. Acede ao teu perfil para aceitar ou rejeitar.`,
        type: 'entrevista'
      });

      Swal.fire({
        icon: 'success',
        title: 'Entrevista agendada!',
        html: `<p>O pedido de entrevista foi enviado ao candidato <strong>${student.full_name}</strong>.</p><p class="text-sm text-gray-500 mt-2">📅 ${formattedDate} às ${time}</p>`,
        confirmButtonColor: '#1A1A2E'
      });
      onClose();
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao agendar',
        text: err.message || 'Não foi possível agendar a entrevista.',
        confirmButtonColor: '#E8501A'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-[#1A1A2E] text-xl">Agendar Entrevista</h3>
            <p className="text-xs text-gray-400 mt-1">Candidato: <span className="font-bold text-[#E8501A]">{student?.full_name}</span></p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-2xl transition-colors cursor-pointer text-gray-400">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSchedule} className="p-8 space-y-5">
          <div className="bg-violet-50 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
              <i className="ri-calendar-event-line text-violet-600 text-lg"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-violet-700">Vaga</p>
              <p className="text-sm font-extrabold text-[#1A1A2E]">{vagaTitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Data *</label>
              <input
                required
                type="date"
                min={today}
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#E8501A] transition-all bg-gray-50/50 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Hora *</label>
              <input
                required
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#E8501A] transition-all bg-gray-50/50 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Observações (Opcional)</label>
            <textarea
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Ex: Entrevista via Google Meet, link será enviado por email..."
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#E8501A] transition-all bg-gray-50/50 resize-none"
            ></textarea>
          </div>

          <div className="bg-amber-50 rounded-xl p-3 flex items-start gap-2">
            <i className="ri-information-line text-amber-600 text-sm mt-0.5"></i>
            <p className="text-xs text-amber-700 font-medium">O candidato receberá uma notificação e poderá aceitar ou rejeitar a entrevista.</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3.5 border-2 border-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all cursor-pointer text-sm">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !date}
              className="flex-1 py-3.5 bg-[#E8501A] disabled:opacity-50 text-white rounded-2xl font-bold hover:bg-[#C73E0C] shadow-lg shadow-orange-900/20 transition-all cursor-pointer text-sm flex items-center justify-center gap-2"
            >
              <i className="ri-send-plane-line"></i>
              {loading ? "A enviar..." : "Enviar Pedido"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CandidatoModal({
  candidato,
  vagaTitle,
  onClose,
  onStatusChange,
}: {
  candidato: any;
  vagaTitle: string;
  onClose: () => void;
  onStatusChange: (id: string, status: string, feedback: string) => void;
}) {
  const [feedback, setFeedback] = useState(candidato.feedback || "");
  const [loading, setLoading] = useState(false);
  const [showAgendarModal, setShowAgendarModal] = useState(false);
  const student = candidato.students;

  const updateStatus = async (newStatus: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('applications')
        .update({ 
          status: newStatus,
          feedback: feedback 
        })
        .eq('id', candidato.id);

      if (error) throw error;
      
      // 2. Create Notification for Student
      await supabase.from('notifications').insert({
        user_id: candidato.student_id,
        title: 'Actualização da Candidatura',
        content: `A empresa actualizou o estado da tua candidatura para "${newStatus}" na vaga de "${vagaTitle}"`,
        type: 'candidatura'
      });

      onStatusChange(candidato.id, newStatus, feedback);
      Swal.fire({
        icon: 'success',
        title: 'Estado Actualizado!',
        text: `O candidato foi movido para "${newStatus}" com sucesso.`,
        confirmButtonColor: '#1A1A2E'
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao actualizar',
        text: 'Ocorreu um problema ao guardar as alterações.',
        confirmButtonColor: '#E8501A'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-[40px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="relative h-32 bg-gradient-to-r from-[#1A1A2E] to-[#2D2D44]">
            <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-2xl transition-all backdrop-blur-md cursor-pointer">
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>
          
          <div className="px-10 pb-10">
            <div className="-mt-12 flex items-end gap-6 mb-8">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-8 border-white bg-white shadow-xl flex-shrink-0">
                {student.avatar_url ? (
                  <img src={student.avatar_url} alt={student.full_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center text-3xl font-black text-[#E8501A]">
                    {student.full_name[0]}
                  </div>
                )}
              </div>
              <div className="pb-2">
                <h3 className="text-2xl font-black text-[#1A1A2E] leading-tight">{student.full_name}</h3>
                <p className="text-[#E8501A] font-bold uppercase tracking-widest text-[10px] mt-1">{student.course} · {student.academic_year}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <i className="ri-user-3-line text-[#E8501A]"></i>
                    Perfil do Candidato
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                      <i className="ri-mail-line text-gray-400"></i>
                      <p className="text-xs font-bold text-[#374151] truncate">{student.email}</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                      <i className="ri-phone-line text-gray-400"></i>
                      <p className="text-xs font-bold text-[#374151]">{student.phone || "Não disponível"}</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                      <i className="ri-map-pin-line text-gray-400"></i>
                      <p className="text-xs font-bold text-[#374151]">{student.province}</p>
                    </div>
                  </div>
                </div>

                {/* Interview status indicator */}
                {candidato.interview_date && (
                  <div className={`rounded-2xl p-4 border ${
                    candidato.interview_status === 'Aceite' ? 'bg-emerald-50 border-emerald-200' :
                    candidato.interview_status === 'Rejeitado' ? 'bg-red-50 border-red-200' :
                    'bg-violet-50 border-violet-200'
                  }`}>
                    <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2 text-gray-500">
                      <i className="ri-calendar-event-line"></i>Entrevista Agendada
                    </h4>
                    <p className="text-sm font-bold text-[#1A1A2E]">
                      {candidato.interview_date.split('-').reverse().join('/')} às {candidato.interview_time}
                    </p>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase mt-1 px-2.5 py-1 rounded-full ${
                      candidato.interview_status === 'Aceite' ? 'bg-emerald-100 text-emerald-700' :
                      candidato.interview_status === 'Rejeitado' ? 'bg-red-100 text-red-700' :
                      'bg-violet-100 text-violet-700'
                    }`}>
                      {candidato.interview_status === 'Aceite' ? '✓ Aceite pelo candidato' :
                       candidato.interview_status === 'Rejeitado' ? '✗ Rejeitado pelo candidato' :
                       '⏳ Aguarda resposta'}
                    </span>
                  </div>
                )}

                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <i className="ri-message-2-line text-[#E8501A]"></i>
                    Motivação
                  </h4>
                  <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                    <p className="text-xs font-medium text-gray-600 leading-relaxed italic line-clamp-6">"{candidato.motivation}"</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                 <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Feedback / Notas</h4>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Escreve aqui o feedback para o candidato..."
                      className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-4 text-xs font-medium focus:outline-none focus:border-[#E8501A] focus:bg-white transition-all resize-none h-32"
                    ></textarea>
                 </div>

                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Atualizar Estado</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {allStatuses.map((s) => {
                      const isActive = candidato.status === s;
                      return (
                        <button
                          key={s}
                          disabled={loading}
                          onClick={() => updateStatus(s)}
                          className={`w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 flex items-center justify-center gap-2 ${
                            isActive 
                              ? "bg-[#E8501A] border-[#E8501A] text-white shadow-lg shadow-orange-900/20" 
                              : "bg-white border-gray-100 text-gray-400 hover:border-[#E8501A]/30 hover:text-[#E8501A]"
                          }`}
                        >
                          {isActive && <i className="ri-check-line"></i>}
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-50 flex gap-4">
               {candidato.cv_url ? (
                 <a 
                   href={candidato.cv_url} 
                   target="_blank" 
                   className="flex-1 py-4 bg-gray-50 hover:bg-[#1A1A2E] hover:text-white text-[#1A1A2E] rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                 >
                   <i className="ri-file-pdf-line text-lg"></i>
                   Ver Curriculum Vitae
                 </a>
               ) : (
                 <div className="flex-1 py-4 bg-gray-50 text-gray-300 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 cursor-not-allowed">
                   <i className="ri-file-forbid-line text-lg"></i>
                   Sem Currículo
                 </div>
               )}
               <button 
                 onClick={() => setShowAgendarModal(true)}
                 className="flex-1 py-4 bg-[#E8501A] hover:bg-[#C73E0C] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-900/20 transition-all flex items-center justify-center gap-3 cursor-pointer"
               >
                 <i className="ri-calendar-event-line text-lg"></i>
                 Agendar Entrevista
               </button>
            </div>
          </div>
        </div>
      </div>

      {showAgendarModal && (
        <AgendarEntrevistaModal
          candidato={candidato}
          vagaTitle={vagaTitle}
          onClose={() => setShowAgendarModal(false)}
        />
      )}
    </>
  );
}


export default function CandidatosDashboard({ candidatos: initialCandidatos, vagas, filtroVagaId }: CandidatosDashboardProps) {
  const [candidatos, setCandidatos] = useState(initialCandidatos);
  const [selectedVaga, setSelectedVaga] = useState<string>(filtroVagaId ?? "todas");
  const [selectedStatus, setSelectedStatus] = useState<string>("Todos");
  const [selectedCandidato, setSelectedCandidato] = useState<any | null>(null);

  const filtered = candidatos.filter((c) => {
    const vagaMatch = selectedVaga === "todas" || c.internship_id === selectedVaga;
    const statusMatch = selectedStatus === "Todos" || c.status === selectedStatus;
    return vagaMatch && statusMatch;
  });

  const handleStatusChange = (id: string, status: string, feedback: string) => {
    setCandidatos((prev) => prev.map((c) => c.id === id ? { ...c, status, feedback } : c));
    if (selectedCandidato?.id === id) {
      setSelectedCandidato((prev: any) => ({ ...prev, status, feedback }));
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="font-extrabold text-[#1A1A2E] text-2xl tracking-tight">Candidatos</h2>
        <p className="text-sm text-gray-500 mt-1 font-medium">Gere o fluxo de recrutamento dos teus candidatos.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Filtrar por Vaga</label>
          <select
            value={selectedVaga}
            onChange={(e) => setSelectedVaga(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] bg-white appearance-none cursor-pointer"
          >
            <option value="todas">Todas as Vagas</option>
            {vagas.map((v) => (
              <option key={v.id} value={v.id}>{v.title}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Filtrar por Estado</label>
          <div className="flex flex-wrap gap-2">
            {["Todos", ...allStatuses].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                className={`px-5 py-3.5 rounded-2xl text-xs font-bold transition-all border-2 ${
                  selectedStatus === s ? "bg-[#1A1A2E] border-[#1A1A2E] text-white" : "bg-white border-gray-100 text-gray-500 hover:border-[#E8501A]/30"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.length > 0 ? (
          filtered.map((cand) => {
            const student = cand.students;
            const vaga = vagas.find((v) => v.id === cand.internship_id);
            const cfg = statusConfig[cand.status] || statusConfig.Pendente;
            
            return (
              <div
                key={cand.id}
                onClick={() => setSelectedCandidato(cand)}
                className="bg-white rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all cursor-pointer p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 group-hover:scale-105 transition-transform">
                    {student.avatar_url ? (
                      <img src={student.avatar_url} alt={student.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-[#E8501A]">
                        {student.full_name[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-extrabold text-[#1A1A2E] text-base group-hover:text-[#E8501A] transition-colors">{student.full_name}</h4>
                        <p className="text-xs text-[#E8501A] font-bold mt-0.5">{student.course}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${cfg.bg} ${cfg.color} border border-current opacity-70`}>
                          {cand.status}
                        </span>
                        {cand.interview_date && (
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            cand.interview_status === 'Aceite' ? 'bg-emerald-50 text-emerald-600' :
                            cand.interview_status === 'Rejeitado' ? 'bg-red-50 text-red-600' :
                            'bg-violet-50 text-violet-600'
                          }`}>
                            <i className="ri-calendar-line mr-1"></i>
                            {cand.interview_status === 'Aceite' ? 'Entrevista aceite' :
                             cand.interview_status === 'Rejeitado' ? 'Entrevista rejeitada' :
                             'Entrevista pendente'}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 font-bold uppercase truncate max-w-[150px]">
                        {vaga?.title}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold">
                        {new Date(cand.created_at).toLocaleDateString('pt-AO')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="lg:col-span-2 text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <i className="ri-group-line text-gray-300 text-3xl"></i>
             </div>
             <p className="text-gray-400 font-bold">Nenhum candidato encontrado com estes filtros.</p>
          </div>
        )}
      </div>

      {selectedCandidato && (
        <CandidatoModal
          candidato={selectedCandidato}
          vagaTitle={vagas.find(v => v.id === selectedCandidato.internship_id)?.title || ""}
          onClose={() => setSelectedCandidato(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
