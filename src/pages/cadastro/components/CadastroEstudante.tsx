import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import StepIndicator from "./StepIndicator";
import PasswordStrength from "./PasswordStrength";
import SearchableSelect from "@/components/common/SearchableSelect";
import { areas, provinces } from "@/mocks/landing";

const STEPS = ["Conta", "Perfil", "Académico", "Pronto!"];

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

const higherEducationYears = ["1.º Ano", "2.º Ano", "3.º Ano", "4.º Ano", "5.º Ano", "Recém-Formado"];
const middleEducationYears = ["10.ª Classe", "11.ª Classe", "12.ª Classe", "13.ª Classe"];

interface Field {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  province: string;
  bio: string;
  course: string;
  year: string;
  educationLevel: "Médio" | "Superior";
  areasInterest: string[];
  linkedin: string;
}

const initial: Field = {
  email: "", password: "", confirmPassword: "",
  fullName: "", phone: "", province: "", bio: "",
  course: "", year: "", educationLevel: "Superior", areasInterest: [], linkedin: "",
};

const InputRow = ({ label, id, type = "text", value, onChange, placeholder, error, right }: {
  label: string; id: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; error?: string; right?: React.ReactNode;
}) => (
  <div>
    <label htmlFor={id} className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">{label}</label>
    <div className="relative">
      <input
        id={id} type={type} value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors placeholder-gray-300 ${
          error ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#E8501A]"
        }`}
      />
      {right}
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export default function CadastroEstudante() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Field>(initial);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Partial<Field>>({});
  const [isPassStrong, setIsPassStrong] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (key: keyof Field, val: string) => {
    setData((d) => ({ ...d, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const toggleArea = (area: string) => {
    setData((d) => ({
      ...d,
      areasInterest: d.areasInterest.includes(area)
        ? d.areasInterest.filter((a) => a !== area)
        : [...d.areasInterest, area],
    }));
  };

  const validateStep = () => {
    const errs: Partial<Field> = {};
    if (step === 0) {
      if (!data.email) errs.email = "Obrigatório";
      if (!data.password) errs.password = "Obrigatório";
      else if (!isPassStrong) errs.password = "A palavra-passe deve ser forte";
      if (data.password !== data.confirmPassword) errs.confirmPassword = "As palavras-passe não coincidem";
    }
    if (step === 1) {
      if (!data.fullName) errs.fullName = "Obrigatório";
      if (!data.province) errs.province = "Obrigatório";
    }
    if (step === 2) {
      if (!data.course) errs.course = "Obrigatório";
      if (!data.year) errs.year = "Obrigatório";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = async () => {
    if (!validateStep()) return;
    if (step < 2) { 
      setStep(s => s + 1); 
      return; 
    }
    
    setLoading(true);
    setErrors({});
    
    const { supabase } = await import("@/lib/supabase");
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email.trim().toLowerCase(),
        password: data.password,
        options: {
          data: {
            full_name: data.fullName.trim(),
            role: 'estudante'
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: dbError } = await supabase
          .from('students')
          .insert({
            id: authData.user.id,
            full_name: data.fullName.trim(),
            email: data.email.trim().toLowerCase(),
            phone: data.phone?.trim() || null,
            province: data.province,
            bio: data.bio?.trim() || null,
            course: data.course,
            academic_year: data.year,
            areas_interest: data.areasInterest || [],
            linkedin_url: data.linkedin?.trim() || null
          });

        if (dbError) {
          console.error("Erro na Base de Dados:", dbError);
          throw new Error(`Erro na Base de Dados: ${dbError.message} (${dbError.code})`);
        }
        
        setStep(3);
      }
    } catch (err: any) {
      console.error("Erro completo:", err);
      const msg = err.message || "Erro desconhecido ao criar conta.";
      setErrors({ email: msg });
      Swal.fire({
        icon: 'error',
        title: 'Erro no Cadastro',
        text: msg,
        confirmButtonColor: '#E8501A',
        confirmButtonText: 'Tentar novamente'
      });
    } finally {
      setLoading(false);
    }

  };

  if (step === 3) {
    return (
      <div className="text-center py-6">
        <div className="w-20 h-20 flex items-center justify-center mx-auto rounded-full bg-green-100 mb-5">
          <i className="ri-check-double-line text-green-600 text-4xl"></i>
        </div>
        <h2 className="text-2xl font-extrabold text-[#1A1A2E] mb-2">Cadastro concluído!</h2>
        <p className="text-gray-500 text-sm mb-2">
          Bem-vindo ao <strong>EstagiaAngola</strong>, {data.fullName.split(" ")[0]}!
        </p>
        <p className="text-gray-400 text-xs mb-8">O teu perfil está pronto. Começa a explorar vagas agora.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/vagas")}
            className="bg-[#E8501A] hover:bg-[#C73E0C] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm cursor-pointer whitespace-nowrap"
          >
            <i className="ri-briefcase-line mr-1.5"></i>Explorar Vagas
          </button>
          <button
            onClick={() => navigate("/")}
            className="border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium px-6 py-3 rounded-xl transition-colors text-sm cursor-pointer whitespace-nowrap"
          >
            Ir para a Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StepIndicator steps={STEPS.slice(0, 3)} current={step} />

      {step === 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-[#1A1A2E] text-lg mb-4">Cria a tua conta</h3>
          <InputRow label="Email" id="email" type="email" value={data.email} onChange={v => set("email", v)} placeholder="joao.silva@ipas.ao" error={errors.email} />
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">Palavra-passe</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"} value={data.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="Introduz uma palavra-passe forte"
                className={`w-full px-4 pr-10 py-3 border rounded-xl text-sm focus:outline-none transition-colors placeholder-gray-300 ${errors.password ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#E8501A]"}`}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                <i className={`${showPass ? "ri-eye-off-line" : "ri-eye-line"} text-base`}></i>
              </button>
            </div>
            <PasswordStrength password={data.password} onValidationChange={setIsPassStrong} />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>
          <InputRow label="Confirmar palavra-passe" id="confirm" type="password" value={data.confirmPassword} onChange={v => set("confirmPassword", v)} placeholder="Repete a palavra-passe" error={errors.confirmPassword} />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-bold text-[#1A1A2E] text-lg mb-4">O teu perfil pessoal</h3>
          <InputRow label="Nome completo" id="name" value={data.fullName} onChange={v => set("fullName", v)} placeholder="João Manuel da Silva" error={errors.fullName} />
          <InputRow label="Telemóvel" id="phone" value={data.phone} onChange={v => set("phone", v)} placeholder="+244 9XX XXX XXX" />
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">Província</label>
            <select
              value={data.province} onChange={(e) => set("province", e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors cursor-pointer ${errors.province ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#E8501A]"}`}
            >
              <option value="">Selecciona a tua província</option>
              {provinces.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.province && <p className="text-xs text-red-500 mt-1">{errors.province}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">Breve bio <span className="font-normal text-gray-400">(opcional)</span></label>
            <textarea
              value={data.bio} onChange={(e) => set("bio", e.target.value)}
              placeholder="Conta-nos um pouco sobre ti, os teus objectivos e interesses..."
              rows={3}
              maxLength={300}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E8501A] transition-colors resize-none placeholder-gray-300"
            />
            <p className="text-xs text-gray-400 text-right mt-1">{data.bio.length}/300</p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-bold text-[#1A1A2E] text-lg mb-4">Informação académica</h3>
          
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-2">Nível de Ensino</label>
            <div className="flex bg-[#F4F4F6] rounded-xl p-1">
              {["Médio", "Superior"].map((level) => (
                <button
                  key={level} type="button"
                  onClick={() => { set("educationLevel", level as any); set("year", ""); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    data.educationLevel === level 
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
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">Curso</label>
            <SearchableSelect
              options={data.educationLevel === "Superior" ? superiorCourses : medioCourses}
              value={data.course}
              onChange={(val) => set("course", val)}
              placeholder="Pesquisa e selecciona o teu curso"
              error={errors.course}
            />
            {errors.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">Ano / Classe actual</label>
            <div className="grid grid-cols-3 gap-2">
              {(data.educationLevel === "Superior" ? higherEducationYears : middleEducationYears).map((y) => (
                <button
                  key={y} type="button"
                  onClick={() => set("year", y)}
                  className={`py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                    data.year === y
                      ? "bg-[#E8501A] border-[#E8501A] text-white"
                      : "border-gray-200 text-gray-500 hover:border-[#E8501A] hover:text-[#E8501A]"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
            {errors.year && <p className="text-xs text-red-500 mt-1">{errors.year}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-2">Áreas de interesse <span className="font-normal text-gray-400">(escolhe até 3)</span></label>
            <div className="flex flex-wrap gap-2">
              {areas.map((a) => (
                <button
                  key={a} type="button"
                  disabled={!data.areasInterest.includes(a) && data.areasInterest.length >= 3}
                  onClick={() => toggleArea(a)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                    data.areasInterest.includes(a)
                      ? "bg-[#E8501A] border-[#E8501A] text-white"
                      : "border-gray-200 text-gray-500 hover:border-[#E8501A] hover:text-[#E8501A] disabled:opacity-40 disabled:cursor-not-allowed"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <InputRow label="LinkedIn" id="linkedin" value={data.linkedin} onChange={v => set("linkedin", v)} placeholder="linkedin.com/in/joaosilva" />
        </div>
      )}

      <div className="flex gap-3 mt-7">
        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="px-5 py-3 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-arrow-left-line mr-1"></i> Voltar
          </button>
        )}
        <button
          onClick={next}
          disabled={loading}
          className="flex-1 bg-[#E8501A] hover:bg-[#C73E0C] disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
        >
          {loading ? (
            <><i className="ri-loader-4-line animate-spin"></i> A criar conta...</>
          ) : step < 2 ? (
            <>Continuar <i className="ri-arrow-right-line"></i></>
          ) : (
            <>Criar Conta <i className="ri-check-line"></i></>
          )}
        </button>
      </div>
    </div>
  );
}
