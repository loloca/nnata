import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

const STEPS = ["Dados Pessoais", "Documentos", "Motivação", "Revisão"];

export default function CandidaturaPage() {
  const { vagaId } = useParams<{ vagaId: string }>();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [vaga, setVaga] = useState<any>(null);
  const [loadingVaga, setLoadingVaga] = useState(true);

  const [cvFile, setCvFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    provincia: "",
    universidade: "",
    curso: "",
    anoAcademico: "",
    mediaAcademica: "",
    linkedin: "",
    cvNome: "",
    motivacao: "",
    disponibilidade: "",
    aceitaTermos: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  // Fetch vaga and student profile
  useEffect(() => {
    const fetchData = async () => {
      setLoadingVaga(true);
      
      // Fetch Vaga
      const { data: vData } = await supabase
        .from('internships')
        .select('*, companies(name, logo_url)')
        .eq('id', vagaId)
        .single();
      
      if (vData) setVaga(vData);

      // Pre-fill student data
      if (user && user.role === 'estudante') {
        const { data: sData } = await supabase
          .from('students')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (sData) {
          setForm(prev => ({
            ...prev,
            nome: sData.full_name || "",
            email: sData.email || "",
            telefone: sData.phone || "",
            provincia: sData.province || "",
            universidade: "—", // Not in schema, can be added to bio or specific field
            curso: sData.course || "",
            anoAcademico: sData.academic_year || "",
            linkedin: sData.linkedin_url || "",
          }));
        }
      }
      setLoadingVaga(false);
    };

    fetchData();
  }, [vagaId, user]);

  const update = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      update("cvNome", file.name);
    }
  };

  const validateStep = (): boolean => {
    const newErrors: typeof errors = {};
    if (step === 0) {
      if (!form.nome.trim()) newErrors.nome = "Campo obrigatório";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email inválido";
      if (!form.telefone.trim()) newErrors.telefone = "Campo obrigatório";
      if (!form.provincia) newErrors.provincia = "Selecciona uma província";
      if (!form.curso.trim()) newErrors.curso = "Campo obrigatório";
      if (!form.anoAcademico) newErrors.anoAcademico = "Selecciona o ano";
    }
    if (step === 1) {
      if (!cvFile) newErrors.cvNome = "O CV é obrigatório";
    }
    if (step === 2) {
      if (form.motivacao.trim().length < 50) newErrors.motivacao = "Escreve pelo menos 50 caracteres";
      if (!form.disponibilidade) newErrors.disponibilidade = "Campo obrigatório";
    }
    if (step === 3) {
      if (!form.aceitaTermos) newErrors.aceitaTermos = "Deves aceitar os termos";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep() || !user || !cvFile) return;
    setStatus("loading");
    try {
      // 1. Upload CV to Storage
      const fileExt = cvFile.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      const filePath = `cvs/${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('applications')
        .upload(filePath, cvFile);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('applications')
        .getPublicUrl(filePath);

      // 2. Insert Application
      const { error } = await supabase
        .from('applications')
        .insert({
          student_id: user.id,
          internship_id: vagaId,
          motivation: form.motivacao,
          cv_url: publicUrl,
          status: 'Pendente'
        });

      if (error) throw error;

      // Update count
      await supabase.rpc('increment_applicants', { row_id: vagaId });

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (loadingVaga || authLoading) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
         <div className="w-12 h-12 border-4 border-[#E8501A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!vaga) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-24">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4 text-2xl text-gray-400">
            <i className="ri-briefcase-line"></i>
          </div>
          <h2 className="text-xl font-bold text-[#1A1A2E]">Vaga não encontrada</h2>
          <Link to="/vagas" className="text-[#E8501A] mt-4 font-bold">Ver todas as vagas</Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 animate-in fade-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-5xl text-emerald-600 mb-8 shadow-xl shadow-emerald-500/20">
             <i className="ri-checkbox-circle-fill"></i>
           </div>
           <h2 className="text-4xl font-black text-[#1A1A2E] mb-4">Candidatura Enviada!</h2>
           <p className="text-gray-500 max-w-md mx-auto leading-relaxed mb-10">
             A tua candidatura para <strong className="text-[#E8501A]">{vaga.title}</strong> foi entregue com sucesso. Aguarda pelo contacto da empresa.
           </p>
           <div className="flex gap-4">
             <Link to="/vagas" className="px-8 py-4 bg-gray-100 text-[#1A1A2E] rounded-2xl font-black transition-all hover:bg-gray-200">Explorar mais</Link>
             <Link to="/perfil" className="px-8 py-4 bg-[#E8501A] text-white rounded-2xl font-black transition-all hover:scale-105 shadow-xl shadow-orange-900/20">Ver o meu perfil</Link>
           </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] selection:bg-orange-100">
      <Navbar />
      <div className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div>
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                <Link to="/vagas" className="hover:text-[#E8501A]">Vagas</Link>
                <i className="ri-arrow-right-s-line"></i>
                <span className="text-[#1A1A2E]">{vaga.title}</span>
              </div>
              <h1 className="text-4xl font-black text-[#1A1A2E] leading-tight">Candidatura ao Estágio</h1>
              <p className="text-gray-500 mt-2 font-medium">Estás a um passo de começar a tua jornada profissional.</p>
           </div>
           <div className="bg-white p-4 rounded-3xl border-2 border-gray-100 flex items-center gap-4 shadow-sm">
             <div className="w-12 h-12 rounded-2xl overflow-hidden border border-gray-100">
               <img src={vaga.companies?.logo_url} alt={vaga.companies?.name} className="w-full h-full object-cover" />
             </div>
             <div>
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Empresa</p>
               <p className="text-sm font-bold text-[#1A1A2E]">{vaga.companies?.name}</p>
             </div>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Form Area */}
          <div className="flex-1 space-y-8">
            
            {/* Step Indicator */}
            <div className="flex items-center justify-between px-2">
              {STEPS.map((label, i) => (
                <div key={i} className="flex items-center flex-1 last:flex-none group">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all duration-300 ${
                      i < step ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" :
                      i === step ? "bg-[#E8501A] text-white shadow-xl shadow-orange-500/20 scale-110" :
                      "bg-white border-2 border-gray-100 text-gray-300"
                    }`}>
                      {i < step ? <i className="ri-check-line text-xl"></i> : i + 1}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest mt-3 transition-colors ${
                      i === step ? "text-[#E8501A]" : "text-gray-400"
                    }`}>{label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${i < step ? "bg-emerald-400" : "bg-gray-100"}`}></div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-[40px] border-2 border-gray-100 p-10 shadow-xl shadow-gray-200/40">
              
              {step === 0 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Nome Completo</label>
                        <input
                          type="text"
                          value={form.nome}
                          onChange={(e) => update("nome", e.target.value)}
                          className="w-full bg-gray-50/50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Email de Contacto</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className="w-full bg-gray-50/50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Telefone / WhatsApp</label>
                        <input
                          type="tel"
                          value={form.telefone}
                          onChange={(e) => update("telefone", e.target.value)}
                          className="w-full bg-gray-50/50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Província</label>
                        <select
                          value={form.provincia}
                          onChange={(e) => update("provincia", e.target.value)}
                          className="w-full bg-gray-50/50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] appearance-none"
                        >
                          <option value="">Seleccionar...</option>
                          {["Luanda", "Benguela", "Huambo", "Huíla", "Cabinda"].map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Ano Académico</label>
                        <select
                          value={form.anoAcademico}
                          onChange={(e) => update("anoAcademico", e.target.value)}
                          className="w-full bg-gray-50/50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] appearance-none"
                        >
                          <option value="">Seleccionar...</option>
                          {["1.º Ano","2.º Ano","3.º Ano","4.º Ano","5.º Ano","Finalista","Recém-licenciado"].map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                      </div>
                   </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div 
                     className={`relative border-4 border-dashed rounded-[32px] p-12 text-center transition-all cursor-pointer ${
                       form.cvNome ? "border-emerald-200 bg-emerald-50/30" : "border-gray-50 hover:border-[#E8501A]/20"
                     }`}
                   >
                     <input 
                       type="file" 
                       onChange={handleFileChange}
                       className="absolute inset-0 opacity-0 cursor-pointer" 
                     />
                     <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-3xl mb-4 transition-all ${
                       form.cvNome ? "bg-emerald-500 text-white" : "bg-orange-50 text-[#E8501A]"
                     }`}>
                       <i className={form.cvNome ? "ri-check-line" : "ri-file-upload-line"}></i>
                     </div>
                     <h3 className="text-lg font-black text-[#1A1A2E]">{form.cvNome || "Carregar Curriculum Vitae"}</h3>
                     <p className="text-gray-400 text-xs mt-2 font-bold uppercase tracking-tight">Formato PDF ou DOCX (Máx. 10MB)</p>
                   </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Carta de Motivação</label>
                      <textarea
                        value={form.motivacao}
                        onChange={(e) => update("motivacao", e.target.value)}
                        rows={8}
                        placeholder="Porque és o candidato ideal para esta vaga?"
                        className="w-full bg-gray-50/50 border-2 border-gray-50 rounded-[32px] px-8 py-6 text-sm font-medium text-[#374151] focus:outline-none focus:border-[#E8501A] focus:bg-white transition-all resize-none leading-relaxed"
                      />
                   </div>
                   <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Disponibilidade de início</label>
                        <select
                          value={form.disponibilidade}
                          onChange={(e) => update("disponibilidade", e.target.value)}
                          className="w-full bg-gray-50/50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] appearance-none"
                        >
                          <option value="">Seleccionar...</option>
                          {["Imediata","Em 2 semanas","A combinar"].map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="bg-gray-50 rounded-[32px] p-8 space-y-6">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resumo da Candidatura</span>
                        <button type="button" onClick={() => setStep(0)} className="text-[10px] font-black text-[#E8501A] uppercase tracking-widest">Editar Dados</button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Nome</p>
                            <p className="text-sm font-bold text-[#1A1A2E] truncate">{form.nome}</p>
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Email</p>
                            <p className="text-sm font-bold text-[#1A1A2E] truncate">{form.email}</p>
                         </div>
                      </div>
                      <div className="border-t border-gray-100 pt-4">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Documento Principal</p>
                         <p className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                           <i className="ri-file-check-line"></i>
                           {form.cvNome}
                         </p>
                      </div>
                   </div>
                   
                   <label className="flex items-center gap-4 cursor-pointer group">
                      <div 
                        onClick={() => update("aceitaTermos", !form.aceitaTermos)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${
                          form.aceitaTermos ? "bg-[#E8501A] border-[#E8501A]" : "border-gray-200 group-hover:border-[#E8501A]/40"
                        }`}
                      >
                        {form.aceitaTermos && <i className="ri-check-line text-white"></i>}
                      </div>
                      <span className="text-xs font-bold text-gray-500">Confirmo que os meus dados são verdadeiros e aceito os termos.</span>
                   </label>
                </div>
              )}

              <div className="flex items-center justify-between mt-12 pt-8 border-t-2 border-gray-50">
                {step > 0 && (
                  <button 
                    type="button" 
                    onClick={prevStep}
                    className="flex items-center gap-2 text-gray-400 font-black text-xs uppercase tracking-widest hover:text-[#1A1A2E] transition-colors"
                  >
                    <i className="ri-arrow-left-line text-lg"></i> Voltar
                  </button>
                )}
                <div className="ml-auto">
                   {step < 3 ? (
                     <button 
                       type="button" 
                       onClick={nextStep}
                       className="bg-[#1A1A2E] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-gray-900/20"
                     >
                       Próximo Passo
                     </button>
                   ) : (
                     <button 
                       type="submit" 
                       disabled={status === "loading"}
                       className="bg-[#E8501A] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-110 transition-all shadow-xl shadow-orange-900/20 disabled:opacity-50"
                     >
                       {status === "loading" ? "A enviar..." : "Submeter Candidatura"}
                     </button>
                   )}
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 space-y-6">
             <div className="bg-[#1A1A2E] rounded-[32px] p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                   <h4 className="text-xs font-black text-white/50 uppercase tracking-[0.2em] mb-6">Informações Úteis</h4>
                   <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <i className="ri-time-line text-[#E8501A]"></i>
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-tight">Duração</p>
                          <p className="text-sm font-bold text-white/80">{vaga.duration}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <i className="ri-map-pin-line text-[#E8501A]"></i>
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-tight">Localização</p>
                          <p className="text-sm font-bold text-white/80">{vaga.province}</p>
                        </div>
                      </div>
                   </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#E8501A]/20 rounded-full blur-3xl"></div>
             </div>

             <div className="bg-orange-50 rounded-[32px] p-8 border-2 border-orange-100">
                <h4 className="text-xs font-black text-[#E8501A] uppercase tracking-widest mb-4">Requisitos</h4>
                <ul className="space-y-3">
                  {vaga.requirements?.split('\n').map((req: string, i: number) => (
                    <li key={i} className="flex gap-3 text-xs font-bold text-gray-600">
                      <i className="ri-checkbox-circle-line text-[#E8501A] text-sm flex-shrink-0"></i>
                      {req}
                    </li>
                  ))}
                </ul>
             </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}

