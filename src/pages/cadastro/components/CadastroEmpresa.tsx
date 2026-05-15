import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "./StepIndicator";
import { provinces } from "@/mocks/landing";

const STEPS = ["Conta", "Empresa", "Preferências", "Pronto!"];

const sectorsOptions = [
  "Telecomunicações", "Energia & Petróleo", "Banca & Finanças",
  "Fintech & Pagamentos", "Media & Comunicação", "Saúde", "Seguros",
  "Indústria & FMCG", "Construção & Infra-estrutura", "Educação",
  "Tecnologia", "Consultoria", "Retalho & Comércio", "Agricultura",
];

const areasOptions = [
  "Tecnologia", "Engenharia", "Finanças", "Marketing",
  "Saúde", "Direito", "Educação", "Arquitectura",
  "Gestão", "Comunicação",
];

const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"];

interface FieldE {
  email: string; password: string; confirmPassword: string;
  companyName: string; sector: string; province: string;
  website: string; phone: string; description: string;
  size: string; areasHiring: string[]; linkedin: string;
}

const initial: FieldE = {
  email: "", password: "", confirmPassword: "",
  companyName: "", sector: "", province: "",
  website: "", phone: "", description: "",
  size: "", areasHiring: [], linkedin: "",
};

export default function CadastroEmpresa() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FieldE>(initial);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Partial<FieldE>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (key: keyof FieldE, val: string) => {
    setData((d) => ({ ...d, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const toggleArea = (area: string) => {
    setData((d) => ({
      ...d,
      areasHiring: d.areasHiring.includes(area)
        ? d.areasHiring.filter((a) => a !== area)
        : [...d.areasHiring, area],
    }));
  };

  const validateStep = () => {
    const errs: Partial<FieldE> = {};
    if (step === 0) {
      if (!data.email) errs.email = "Obrigatório";
      if (!data.password || data.password.length < 6) errs.password = "Mínimo 6 caracteres";
      if (data.password !== data.confirmPassword) errs.confirmPassword = "As palavras-passe não coincidem";
    }
    if (step === 1) {
      if (!data.companyName) errs.companyName = "Obrigatório";
      if (!data.sector) errs.sector = "Obrigatório";
      if (!data.province) errs.province = "Obrigatório";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < 2) { setStep(s => s + 1); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); }, 1200);
  };

  if (step === 3) {
    return (
      <div className="text-center py-6">
        <div className="w-20 h-20 flex items-center justify-center mx-auto rounded-full bg-green-100 mb-5">
          <i className="ri-check-double-line text-green-600 text-4xl"></i>
        </div>
        <h2 className="text-2xl font-extrabold text-[#1A1A2E] mb-2">Empresa registada!</h2>
        <p className="text-gray-500 text-sm mb-2">
          Bem-vindo ao <strong>EstagiaAngola</strong>, <strong>{data.companyName}</strong>!
        </p>
        <p className="text-gray-400 text-xs mb-8">A tua conta está activa. Começa a publicar vagas de estágio agora.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-[#E8501A] hover:bg-[#C73E0C] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-circle-line mr-1.5"></i>Publicar 1.ª Vaga
          </button>
          <button
            onClick={() => navigate("/")}
            className="border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium px-6 py-3 rounded-xl transition-colors text-sm cursor-pointer whitespace-nowrap"
          >
            Ir para o Dashboard
          </button>
        </div>
      </div>
    );
  }

  const InputRow = ({ label, id, type = "text", value, onChange, placeholder, error }: {
    label: string; id: string; type?: string; value: string;
    onChange: (v: string) => void; placeholder?: string; error?: string;
  }) => (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">{label}</label>
      <input
        id={id} type={type} value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors placeholder-gray-300 ${
          error ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#E8501A]"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );

  return (
    <div>
      <StepIndicator steps={STEPS.slice(0, 3)} current={step} />

      {step === 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-[#1A1A2E] text-lg mb-4">Cria a conta da empresa</h3>
          <InputRow label="Email corporativo" id="email" type="email" value={data.email} onChange={v => set("email", v)} placeholder="rh@empresa.ao" error={errors.email} />
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">Palavra-passe</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"} value={data.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className={`w-full px-4 pr-10 py-3 border rounded-xl text-sm focus:outline-none transition-colors placeholder-gray-300 ${errors.password ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#E8501A]"}`}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                <i className={`${showPass ? "ri-eye-off-line" : "ri-eye-line"} text-base`}></i>
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>
          <InputRow label="Confirmar palavra-passe" id="confirm" type="password" value={data.confirmPassword} onChange={v => set("confirmPassword", v)} placeholder="Repete a palavra-passe" error={errors.confirmPassword} />

          {/* Benefits info box */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mt-2">
            <p className="text-xs font-semibold text-[#E8501A] mb-2 flex items-center gap-1.5">
              <i className="ri-star-line"></i> Benefícios para Empresas
            </p>
            <ul className="space-y-1.5">
              {["Publicação ilimitada de vagas", "Acesso a 1.200+ estudantes do IPAS", "Painel de gestão de candidatos", "Perfil institucional destacado"].map(b => (
                <li key={b} className="text-xs text-gray-600 flex items-start gap-2">
                  <i className="ri-check-line text-[#E8501A] mt-0.5 flex-shrink-0"></i>{b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-bold text-[#1A1A2E] text-lg mb-4">Dados da empresa</h3>
          <InputRow label="Nome da empresa" id="company" value={data.companyName} onChange={v => set("companyName", v)} placeholder="Ex: Sonangol, Unitel, BAI..." error={errors.companyName} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">Sector de actividade</label>
              <select
                value={data.sector} onChange={(e) => set("sector", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors cursor-pointer ${errors.sector ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#E8501A]"}`}
              >
                <option value="">Selecciona o sector</option>
                {sectorsOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.sector && <p className="text-xs text-red-500 mt-1">{errors.sector}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">Província</label>
              <select
                value={data.province} onChange={(e) => set("province", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors cursor-pointer ${errors.province ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#E8501A]"}`}
              >
                <option value="">Selecciona</option>
                {provinces.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.province && <p className="text-xs text-red-500 mt-1">{errors.province}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputRow label="Website" id="website" value={data.website} onChange={v => set("website", v)} placeholder="www.empresa.ao" />
            <InputRow label="Telefone" id="phone" value={data.phone} onChange={v => set("phone", v)} placeholder="+244 2XX XXX XXX" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">Dimensão da empresa</label>
            <div className="flex flex-wrap gap-2">
              {companySizes.map((s) => (
                <button key={s} type="button" onClick={() => set("size", s)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                    data.size === s ? "bg-[#E8501A] border-[#E8501A] text-white" : "border-gray-200 text-gray-500 hover:border-[#E8501A] hover:text-[#E8501A]"
                  }`}
                >
                  {s} colaboradores
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">Descrição da empresa <span className="font-normal text-gray-400">(opcional)</span></label>
            <textarea
              value={data.description} onChange={(e) => set("description", e.target.value)}
              placeholder="Descreve a missão, valores e cultura da empresa..."
              rows={3} maxLength={400}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E8501A] transition-colors resize-none placeholder-gray-300"
            />
            <p className="text-xs text-gray-400 text-right mt-1">{data.description.length}/400</p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-bold text-[#1A1A2E] text-lg mb-4">Preferências de contratação</h3>
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-2">Áreas que pretendes contratar</label>
            <div className="flex flex-wrap gap-2">
              {areasOptions.map((a) => (
                <button key={a} type="button" onClick={() => toggleArea(a)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                    data.areasHiring.includes(a) ? "bg-[#E8501A] border-[#E8501A] text-white" : "border-gray-200 text-gray-500 hover:border-[#E8501A] hover:text-[#E8501A]"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <InputRow label="Página LinkedIn da empresa" id="linkedin" value={data.linkedin} onChange={v => set("linkedin", v)} placeholder="linkedin.com/company/empresa" />

          {/* Summary */}
          <div className="bg-[#FAFAFA] rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-semibold text-[#1A1A2E] mb-3">Resumo do registo</p>
            <div className="space-y-2">
              {[
                { label: "Empresa", value: data.companyName || "—" },
                { label: "Sector", value: data.sector || "—" },
                { label: "Localização", value: data.province || "—" },
                { label: "Dimensão", value: data.size ? `${data.size} colaboradores` : "—" },
                { label: "Áreas", value: data.areasHiring.length > 0 ? data.areasHiring.join(", ") : "—" },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-start gap-4">
                  <span className="text-xs text-gray-400 flex-shrink-0">{item.label}</span>
                  <span className="text-xs text-[#1A1A2E] font-medium text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-7">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="px-5 py-3 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-arrow-left-line mr-1"></i> Voltar
          </button>
        )}
        <button onClick={next} disabled={loading}
          className="flex-1 bg-[#E8501A] hover:bg-[#C73E0C] disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
        >
          {loading ? (
            <><i className="ri-loader-4-line animate-spin"></i> A registar...</>
          ) : step < 2 ? (
            <>Continuar <i className="ri-arrow-right-line"></i></>
          ) : (
            <>Registar Empresa <i className="ri-check-line"></i></>
          )}
        </button>
      </div>
    </div>
  );
}
