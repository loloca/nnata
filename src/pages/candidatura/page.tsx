import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { vagasMock } from "@/mocks/vagas";

const ASSUNTOS_OPCAO = [
  "Candidatura a Estágio Curricular",
  "Candidatura a Estágio Profissional",
  "Candidatura Espontânea",
];

type FormStatus = "idle" | "loading" | "success" | "error";

const STEPS = ["Dados Pessoais", "Documentos", "Motivação", "Revisão"];

export default function CandidaturaPage() {
  const { vagaId } = useParams<{ vagaId: string }>();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const vaga = vagasMock.find((v) => v.id === vagaId);

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [charCount, setCharCount] = useState(0);

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
    tipoVaga: ASSUNTOS_OPCAO[0],
    cvNome: "",
    cartaNome: "",
    portfolioNome: "",
    motivacao: "",
    disponibilidade: "",
    comoCOnheceu: "",
    aceitaTermos: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  const update = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = (): boolean => {
    const newErrors: typeof errors = {};
    if (step === 0) {
      if (!form.nome.trim()) newErrors.nome = "Campo obrigatório";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email inválido";
      if (!form.telefone.trim()) newErrors.telefone = "Campo obrigatório";
      if (!form.provincia) newErrors.provincia = "Selecciona uma província";
      if (!form.universidade.trim()) newErrors.universidade = "Campo obrigatório";
      if (!form.curso.trim()) newErrors.curso = "Campo obrigatório";
      if (!form.anoAcademico) newErrors.anoAcademico = "Selecciona o ano";
    }
    if (step === 1) {
      if (!form.cvNome.trim()) newErrors.cvNome = "O CV é obrigatório";
    }
    if (step === 2) {
      if (form.motivacao.trim().length < 80) newErrors.motivacao = "Escreve pelo menos 80 caracteres";
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
    if (!validateStep()) return;
    setStatus("loading");
    try {
      const body = new URLSearchParams({
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        provincia: form.provincia,
        universidade: form.universidade,
        curso: form.curso,
        anoAcademico: form.anoAcademico,
        mediaAcademica: form.mediaAcademica,
        linkedin: form.linkedin,
        tipoVaga: form.tipoVaga,
        cv: "Não recolhível (ficheiro)",
        cartaMotivacao: form.cartaNome ? "Não recolhível (ficheiro)" : "Não enviada",
        portfolio: form.portfolioNome ? "Não recolhível (ficheiro)" : "Não enviado",
        motivacao: form.motivacao,
        disponibilidade: form.disponibilidade,
        comoCOnheceu: form.comoCOnheceu,
        vagaTitulo: vaga?.title ?? "",
        vagaEmpresa: vaga?.company ?? "",
        vagaId: vagaId ?? "",
      });
      const res = await fetch("https://readdy.ai/api/form/d7ev2c6ivmjfhtdrfkb0", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (!vaga) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-24">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
            <i className="ri-briefcase-line text-gray-400 text-2xl"></i>
          </div>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">Vaga não encontrada</h2>
          <p className="text-sm text-gray-500 mb-6">Esta vaga não existe ou o link está incorrecto.</p>
          <Link to="/vagas" className="bg-[#E8501A] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#C73E0C] transition-colors cursor-pointer">
            Ver todas as vagas
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-6">
              <i className="ri-check-double-line text-emerald-600 text-4xl"></i>
            </div>
            <h2 className="text-2xl font-extrabold text-[#1A1A2E] mb-3">Candidatura Enviada!</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">
              A tua candidatura para <strong className="text-[#1A1A2E]">{vaga.title}</strong> na <strong className="text-[#1A1A2E]">{vaga.company}</strong> foi recebida com sucesso.
            </p>
            <p className="text-gray-400 text-sm mb-8">Receberás um email de confirmação em breve. A empresa entrará em contacto se o teu perfil for seleccionado.</p>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-8 text-left">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Próximos passos</h4>
              <div className="space-y-3">
                {[
                  { icon: "ri-mail-check-line", text: "Confirma o teu email para activar notificações", color: "text-emerald-600 bg-emerald-50" },
                  { icon: "ri-time-line", text: "Aguarda resposta da empresa (normalmente 5–10 dias úteis)", color: "text-amber-600 bg-amber-50" },
                  { icon: "ri-user-line", text: "Completa o teu perfil para aumentares as tuas hipóteses", color: "text-violet-600 bg-violet-50" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 ${item.color}`}>
                      <i className={`${item.icon} text-sm`}></i>
                    </div>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/vagas" className="flex items-center justify-center gap-2 border border-gray-200 text-[#374151] px-6 py-3 rounded-xl text-sm font-medium hover:border-[#E8501A] hover:text-[#E8501A] transition-colors cursor-pointer">
                <i className="ri-briefcase-line"></i> Ver mais vagas
              </Link>
              <Link to="/perfil" className="flex items-center justify-center gap-2 bg-[#E8501A] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#C73E0C] transition-colors cursor-pointer">
                <i className="ri-user-line"></i> Ir para o meu perfil
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />

      <div className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <Link to="/" className="hover:text-[#E8501A] transition-colors cursor-pointer">Início</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/vagas" className="hover:text-[#E8501A] transition-colors cursor-pointer">Vagas</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-[#1A1A2E] font-medium truncate">{vaga.title}</span>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-[#E8501A] font-medium">Candidatura</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* ── FORM PANEL ── */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0 overflow-hidden">
                    <img src={vaga.companyLogo} alt={vaga.company} className="w-12 h-12 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="font-extrabold text-[#1A1A2E] text-lg leading-tight">{vaga.title}</h1>
                    <p className="text-sm text-gray-500 mt-0.5">{vaga.company} · {vaga.sector} · {vaga.province}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-orange-50 text-[#E8501A] font-medium px-2.5 py-1 rounded-full">{vaga.type}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <i className="ri-time-line text-xs"></i>{vaga.duration}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <i className="ri-group-line text-xs"></i>{vaga.applicants} candidatos
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step indicator */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
                <div className="flex items-center justify-between">
                  {STEPS.map((label, i) => (
                    <div key={i} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-all ${
                          i < step ? "bg-emerald-500 text-white" :
                          i === step ? "bg-[#E8501A] text-white" :
                          "bg-gray-100 text-gray-400"
                        }`}>
                          {i < step ? <i className="ri-check-line"></i> : i + 1}
                        </div>
                        <span className={`text-xs mt-1.5 whitespace-nowrap hidden sm:block font-medium ${
                          i === step ? "text-[#E8501A]" : i < step ? "text-emerald-600" : "text-gray-400"
                        }`}>{label}</span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-2 transition-all ${i < step ? "bg-emerald-400" : "bg-gray-100"}`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form
                ref={formRef}
                id="candidatura-form"
                data-readdy-form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 p-6"
              >

                {/* ── STEP 0: Dados Pessoais ── */}
                {step === 0 && (
                  <div>
                    <h2 className="font-bold text-[#1A1A2E] mb-1">Dados Pessoais</h2>
                    <p className="text-sm text-gray-400 mb-6">Preenche os teus dados de identificação e académicos.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-gray-600 block mb-1.5">Nome completo <span className="text-[#E8501A]">*</span></label>
                        <input
                          type="text"
                          name="nome"
                          value={form.nome}
                          onChange={(e) => update("nome", e.target.value)}
                          placeholder="Ex: Ana Maria Ferreira da Silva"
                          className={`w-full px-4 py-3 border rounded-xl text-sm text-[#1A1A2E] placeholder-gray-300 focus:outline-none transition-colors ${errors.nome ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-[#E8501A]"}`}
                        />
                        {errors.nome && <p className="text-xs text-red-500 mt-1">{errors.nome}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1.5">Email <span className="text-[#E8501A]">*</span></label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="ana.silva@email.com"
                          className={`w-full px-4 py-3 border rounded-xl text-sm text-[#1A1A2E] placeholder-gray-300 focus:outline-none transition-colors ${errors.email ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-[#E8501A]"}`}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1.5">Telefone / WhatsApp <span className="text-[#E8501A]">*</span></label>
                        <input
                          type="tel"
                          name="telefone"
                          value={form.telefone}
                          onChange={(e) => update("telefone", e.target.value)}
                          placeholder="+244 9XX XXX XXX"
                          className={`w-full px-4 py-3 border rounded-xl text-sm text-[#1A1A2E] placeholder-gray-300 focus:outline-none transition-colors ${errors.telefone ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-[#E8501A]"}`}
                        />
                        {errors.telefone && <p className="text-xs text-red-500 mt-1">{errors.telefone}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1.5">Província de residência <span className="text-[#E8501A]">*</span></label>
                        <select
                          name="provincia"
                          value={form.provincia}
                          onChange={(e) => update("provincia", e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl text-sm text-[#1A1A2E] focus:outline-none transition-colors cursor-pointer ${errors.provincia ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-[#E8501A]"}`}
                        >
                          <option value="">Seleccionar...</option>
                          {["Luanda","Benguela","Huambo","Huíla","Malanje","Cabinda","Uíge","Bié","Moxico","Namibe","Lunda Norte","Lunda Sul","Zaire","Cuanza Norte","Cuanza Sul","Cunene","Cuando Cubango","Bengo"].map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                        {errors.provincia && <p className="text-xs text-red-500 mt-1">{errors.provincia}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1.5">LinkedIn (opcional)</label>
                        <input
                          type="url"
                          name="linkedin"
                          value={form.linkedin}
                          onChange={(e) => update("linkedin", e.target.value)}
                          placeholder="linkedin.com/in/o-teu-perfil"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1A1A2E] placeholder-gray-300 focus:outline-none focus:border-[#E8501A] transition-colors"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-gray-600 block mb-1.5">Universidade / Instituto <span className="text-[#E8501A]">*</span></label>
                        <input
                          type="text"
                          name="universidade"
                          value={form.universidade}
                          onChange={(e) => update("universidade", e.target.value)}
                          placeholder="Ex: Universidade Agostinho Neto"
                          className={`w-full px-4 py-3 border rounded-xl text-sm text-[#1A1A2E] placeholder-gray-300 focus:outline-none transition-colors ${errors.universidade ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-[#E8501A]"}`}
                        />
                        {errors.universidade && <p className="text-xs text-red-500 mt-1">{errors.universidade}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1.5">Curso <span className="text-[#E8501A]">*</span></label>
                        <input
                          type="text"
                          name="curso"
                          value={form.curso}
                          onChange={(e) => update("curso", e.target.value)}
                          placeholder="Ex: Engenharia Informática"
                          className={`w-full px-4 py-3 border rounded-xl text-sm text-[#1A1A2E] placeholder-gray-300 focus:outline-none transition-colors ${errors.curso ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-[#E8501A]"}`}
                        />
                        {errors.curso && <p className="text-xs text-red-500 mt-1">{errors.curso}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1.5">Ano académico <span className="text-[#E8501A]">*</span></label>
                        <select
                          name="anoAcademico"
                          value={form.anoAcademico}
                          onChange={(e) => update("anoAcademico", e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl text-sm text-[#1A1A2E] focus:outline-none transition-colors cursor-pointer ${errors.anoAcademico ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-[#E8501A]"}`}
                        >
                          <option value="">Seleccionar...</option>
                          {["1.º Ano","2.º Ano","3.º Ano","4.º Ano","5.º Ano","Finalista","Recém-licenciado"].map((a) => (
                            <option key={a} value={a}>{a}</option>
                          ))}
                        </select>
                        {errors.anoAcademico && <p className="text-xs text-red-500 mt-1">{errors.anoAcademico}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1.5">Média académica (opcional)</label>
                        <input
                          type="text"
                          name="mediaAcademica"
                          value={form.mediaAcademica}
                          onChange={(e) => update("mediaAcademica", e.target.value)}
                          placeholder="Ex: 14 valores"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1A1A2E] placeholder-gray-300 focus:outline-none focus:border-[#E8501A] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1.5">Tipo de candidatura</label>
                        <select
                          name="tipoVaga"
                          value={form.tipoVaga}
                          onChange={(e) => update("tipoVaga", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] transition-colors cursor-pointer"
                        >
                          {ASSUNTOS_OPCAO.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 1: Documentos ── */}
                {step === 1 && (
                  <div>
                    <h2 className="font-bold text-[#1A1A2E] mb-1">Documentos</h2>
                    <p className="text-sm text-gray-400 mb-6">Indica os documentos que irás submeter (PDF ou Word).</p>

                    <div className="space-y-4">
                      {/* CV */}
                      <div className={`border-2 border-dashed rounded-2xl p-6 transition-colors ${errors.cvNome ? "border-red-300 bg-red-50/20" : form.cvNome ? "border-emerald-300 bg-emerald-50/30" : "border-gray-200 hover:border-[#E8501A]/40"}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0 ${form.cvNome ? "bg-emerald-100" : "bg-orange-50"}`}>
                            <i className={`text-xl ${form.cvNome ? "ri-check-line text-emerald-600" : "ri-file-user-line text-[#E8501A]"}`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-[#1A1A2E]">Curriculum Vitae (CV) <span className="text-[#E8501A]">*</span></p>
                            <p className="text-xs text-gray-400 mt-0.5">Formato PDF ou Word · Máx. 5MB</p>
                            {form.cvNome && <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1"><i className="ri-attachment-line"></i>{form.cvNome}</p>}
                          </div>
                          <label className="flex items-center gap-2 bg-[#E8501A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer hover:bg-[#C73E0C] transition-colors whitespace-nowrap flex-shrink-0">
                            <i className="ri-upload-line"></i>
                            {form.cvNome ? "Alterar" : "Carregar"}
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) update("cvNome", f.name);
                              }}
                            />
                          </label>
                        </div>
                        {errors.cvNome && <p className="text-xs text-red-500 mt-2">{errors.cvNome}</p>}
                      </div>

                      {/* Carta de Motivação */}
                      <div className={`border-2 border-dashed rounded-2xl p-6 transition-colors ${form.cartaNome ? "border-violet-300 bg-violet-50/20" : "border-gray-200 hover:border-violet-200"}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0 ${form.cartaNome ? "bg-violet-100" : "bg-gray-50"}`}>
                            <i className={`text-xl ${form.cartaNome ? "ri-check-line text-violet-600" : "ri-file-text-line text-gray-400"}`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-[#1A1A2E]">Carta de Motivação <span className="text-xs font-normal text-gray-400">(opcional)</span></p>
                            <p className="text-xs text-gray-400 mt-0.5">Formato PDF · Máx. 2MB · Aumenta as tuas hipóteses</p>
                            {form.cartaNome && <p className="text-xs text-violet-600 mt-1 font-medium flex items-center gap-1"><i className="ri-attachment-line"></i>{form.cartaNome}</p>}
                          </div>
                          <label className="flex items-center gap-2 border border-gray-200 text-[#374151] text-xs font-medium px-4 py-2.5 rounded-xl cursor-pointer hover:border-violet-400 hover:text-violet-600 transition-colors whitespace-nowrap flex-shrink-0">
                            <i className="ri-upload-line"></i>
                            {form.cartaNome ? "Alterar" : "Carregar"}
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) update("cartaNome", f.name);
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Portfolio */}
                      <div className={`border-2 border-dashed rounded-2xl p-6 transition-colors ${form.portfolioNome ? "border-amber-300 bg-amber-50/20" : "border-gray-200 hover:border-amber-200"}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0 ${form.portfolioNome ? "bg-amber-100" : "bg-gray-50"}`}>
                            <i className={`text-xl ${form.portfolioNome ? "ri-check-line text-amber-600" : "ri-folder-image-line text-gray-400"}`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-[#1A1A2E]">Portfolio / Trabalhos <span className="text-xs font-normal text-gray-400">(opcional)</span></p>
                            <p className="text-xs text-gray-400 mt-0.5">PDF, ZIP ou link · Recomendado para áreas criativas</p>
                            {form.portfolioNome && <p className="text-xs text-amber-600 mt-1 font-medium flex items-center gap-1"><i className="ri-attachment-line"></i>{form.portfolioNome}</p>}
                          </div>
                          <label className="flex items-center gap-2 border border-gray-200 text-[#374151] text-xs font-medium px-4 py-2.5 rounded-xl cursor-pointer hover:border-amber-400 hover:text-amber-600 transition-colors whitespace-nowrap flex-shrink-0">
                            <i className="ri-upload-line"></i>
                            {form.portfolioNome ? "Alterar" : "Carregar"}
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.zip"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) update("portfolioNome", f.name);
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Tip */}
                      <div className="flex items-start gap-3 bg-orange-50 rounded-xl p-4">
                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="ri-lightbulb-line text-[#E8501A] text-sm"></i>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          <strong className="text-[#1A1A2E]">Dica:</strong> Candidaturas com CV + carta de motivação têm <strong>3× mais probabilidade</strong> de serem seleccionadas. Personaliza a carta para esta vaga específica.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Motivação ── */}
                {step === 2 && (
                  <div>
                    <h2 className="font-bold text-[#1A1A2E] mb-1">Carta de Motivação</h2>
                    <p className="text-sm text-gray-400 mb-6">Conta-nos porquê és o candidato ideal para esta vaga.</p>

                    <div className="space-y-5">
                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1.5">
                          Motivação e objectivos <span className="text-[#E8501A]">*</span>
                          <span className="font-normal text-gray-400 ml-2">(mín. 80 caracteres)</span>
                        </label>
                        <textarea
                          name="motivacao"
                          value={form.motivacao}
                          maxLength={500}
                          onChange={(e) => {
                            update("motivacao", e.target.value);
                            setCharCount(e.target.value.length);
                          }}
                          placeholder={`Apresenta-te brevemente e explica:\n• Por que queres estagiar na ${vaga.company}?\n• Que competências traz para esta função?\n• Quais são os teus objectivos profissionais?`}
                          rows={8}
                          className={`w-full px-4 py-3 border rounded-xl text-sm text-[#1A1A2E] placeholder-gray-300 focus:outline-none transition-colors resize-none leading-relaxed ${errors.motivacao ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-[#E8501A]"}`}
                        />
                        <div className="flex items-center justify-between mt-1.5">
                          {errors.motivacao
                            ? <p className="text-xs text-red-500">{errors.motivacao}</p>
                            : <p className="text-xs text-gray-400">Sê específico e autêntico — evita respostas genéricas</p>
                          }
                          <span className={`text-xs font-medium ${charCount >= 500 ? "text-red-500" : charCount >= 400 ? "text-amber-500" : "text-gray-400"}`}>
                            {charCount}/500
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1.5">Disponibilidade de início <span className="text-[#E8501A]">*</span></label>
                        <select
                          name="disponibilidade"
                          value={form.disponibilidade}
                          onChange={(e) => update("disponibilidade", e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl text-sm text-[#1A1A2E] focus:outline-none transition-colors cursor-pointer ${errors.disponibilidade ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-[#E8501A]"}`}
                        >
                          <option value="">Seleccionar...</option>
                          {["Imediata (esta semana)","Em 2 semanas","Em 1 mês","Em 2 meses","Em 3 meses","A combinar"].map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                        {errors.disponibilidade && <p className="text-xs text-red-500 mt-1">{errors.disponibilidade}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1.5">Como conheceste a EsTagia Angola? (opcional)</label>
                        <select
                          name="comoCOnheceu"
                          value={form.comoCOnheceu}
                          onChange={(e) => update("comoCOnheceu", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1A1A2E] focus:outline-none focus:border-[#E8501A] transition-colors cursor-pointer"
                        >
                          <option value="">Seleccionar...</option>
                          {["Redes sociais (Instagram/Facebook)","Recomendação de um amigo","Google / Pesquisa online","Universidade / Professor","LinkedIn","Outra forma"].map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Revisão ── */}
                {step === 3 && (
                  <div>
                    <h2 className="font-bold text-[#1A1A2E] mb-1">Revisão Final</h2>
                    <p className="text-sm text-gray-400 mb-6">Verifica os teus dados antes de enviar a candidatura.</p>

                    <div className="space-y-4">
                      {/* Dados pessoais summary */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dados Pessoais</h4>
                          <button type="button" onClick={() => setStep(0)} className="text-xs text-[#E8501A] font-medium cursor-pointer hover:underline">Editar</button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { label: "Nome", value: form.nome },
                            { label: "Email", value: form.email },
                            { label: "Telefone", value: form.telefone },
                            { label: "Província", value: form.provincia },
                            { label: "Universidade", value: form.universidade },
                            { label: "Curso", value: form.curso },
                            { label: "Ano", value: form.anoAcademico },
                            { label: "Média", value: form.mediaAcademica || "—" },
                          ].map((item) => (
                            <div key={item.label}>
                              <p className="text-xs text-gray-400">{item.label}</p>
                              <p className="text-xs font-medium text-[#1A1A2E] truncate">{item.value || "—"}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Documentos summary */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Documentos</h4>
                          <button type="button" onClick={() => setStep(1)} className="text-xs text-[#E8501A] font-medium cursor-pointer hover:underline">Editar</button>
                        </div>
                        <div className="space-y-1.5">
                          {[
                            { label: "CV", value: form.cvNome, required: true },
                            { label: "Carta de Motivação", value: form.cartaNome, required: false },
                            { label: "Portfolio", value: form.portfolioNome, required: false },
                          ].map((doc) => (
                            <div key={doc.label} className="flex items-center gap-2">
                              <div className={`w-4 h-4 flex items-center justify-center rounded-full flex-shrink-0 ${doc.value ? "bg-emerald-100" : "bg-gray-100"}`}>
                                <i className={`text-xs ${doc.value ? "ri-check-line text-emerald-600" : "ri-close-line text-gray-400"}`}></i>
                              </div>
                              <span className="text-xs text-gray-600">{doc.label}</span>
                              <span className="text-xs font-medium text-[#1A1A2E] truncate">{doc.value || <span className="text-gray-300">Não adicionado</span>}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Motivação summary */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Motivação</h4>
                          <button type="button" onClick={() => setStep(2)} className="text-xs text-[#E8501A] font-medium cursor-pointer hover:underline">Editar</button>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{form.motivacao || "—"}</p>
                        <p className="text-xs text-gray-400 mt-1.5">Disponibilidade: <strong className="text-[#1A1A2E]">{form.disponibilidade || "—"}</strong></p>
                      </div>

                      {/* Termos */}
                      <div className={`border rounded-xl p-4 transition-colors ${errors.aceitaTermos ? "border-red-300 bg-red-50/20" : "border-gray-200"}`}>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <div
                            onClick={() => update("aceitaTermos", !form.aceitaTermos)}
                            className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-all cursor-pointer ${form.aceitaTermos ? "bg-[#E8501A] border-[#E8501A]" : "border-gray-300"}`}
                          >
                            {form.aceitaTermos && <i className="ri-check-line text-white text-xs"></i>}
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            Confirmo que os dados fornecidos são verdadeiros e autorizo a <strong className="text-[#1A1A2E]">EsTagia Angola</strong> e a <strong className="text-[#1A1A2E]">{vaga.company}</strong> a processar os meus dados para fins de recrutamento, de acordo com a política de privacidade.
                          </p>
                        </label>
                        {errors.aceitaTermos && <p className="text-xs text-red-500 mt-2">{errors.aceitaTermos}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className={`flex gap-3 mt-8 pt-5 border-t border-gray-100 ${step > 0 ? "justify-between" : "justify-end"}`}>
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 border border-gray-200 text-[#374151] px-5 py-3 rounded-xl text-sm font-medium hover:border-[#E8501A] hover:text-[#E8501A] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-arrow-left-s-line"></i> Anterior
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 bg-[#E8501A] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Continuar <i className="ri-arrow-right-s-line"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex items-center gap-2 bg-[#E8501A] text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-[#C73E0C] transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap"
                    >
                      {status === "loading" ? (
                        <><i className="ri-loader-4-line animate-spin"></i> A enviar...</>
                      ) : (
                        <><i className="ri-send-plane-fill"></i> Enviar Candidatura</>
                      )}
                    </button>
                  )}
                </div>

                {status === "error" && (
                  <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                      <i className="ri-error-warning-line text-red-500 text-sm"></i>
                    </div>
                    <p className="text-xs text-red-600">Ocorreu um erro ao enviar. Verifica a tua ligação e tenta novamente.</p>
                  </div>
                )}
              </form>
            </div>

            {/* ── SIDEBAR ── */}
            <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4 lg:sticky lg:top-24">
              {/* Vaga summary */}
              <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44] rounded-2xl p-5">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Vaga seleccionada</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 flex-shrink-0 overflow-hidden">
                    <img src={vaga.companyLogo} alt={vaga.company} className="w-9 h-9 object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-snug">{vaga.title}</p>
                    <p className="text-xs text-white/50 mt-0.5">{vaga.company}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { icon: "ri-map-pin-line", value: `${vaga.province}, Angola` },
                    { icon: "ri-time-line", value: vaga.duration },
                    { icon: "ri-building-2-line", value: vaga.type },
                    { icon: "ri-group-line", value: `${vaga.applicants} candidatos` },
                  ].map((item) => (
                    <div key={item.icon} className="flex items-center gap-2 text-xs text-white/60">
                      <div className="w-4 h-4 flex items-center justify-center"><i className={item.icon}></i></div>
                      {item.value}
                    </div>
                  ))}
                </div>
              </div>

              {/* Requisitos */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Requisitos da Vaga</h4>
                <ul className="space-y-2">
                  {vaga.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-arrow-right-s-line text-[#E8501A] text-sm"></i>
                      </div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dicas */}
              <div className="bg-orange-50 rounded-2xl p-5">
                <h4 className="text-xs font-semibold text-[#E8501A] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <i className="ri-lightbulb-line"></i> Dicas de Candidatura
                </h4>
                <ul className="space-y-2.5">
                  {[
                    "Personaliza a tua motivação para esta empresa específica",
                    "CV actualizado com experiências recentes e relevantes",
                    "Usa linguagem profissional e evita erros ortográficos",
                    "Inclui projectos académicos relacionados com a vaga",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-[#E8501A] text-sm"></i>
                      </div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
