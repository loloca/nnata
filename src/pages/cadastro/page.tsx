import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CadastroEstudante from "./components/CadastroEstudante";
import CadastroEmpresa from "./components/CadastroEmpresa";

type Role = "estudante" | "empresa";

export default function CadastroPage() {
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState<Role>(
    (searchParams.get("tipo") as Role) || "estudante"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[44%] relative overflow-hidden flex-shrink-0">
        <img
          src="https://readdy.ai/api/search-image?query=successful%20young%20African%20professionals%20in%20modern%20Angola%20office%20building%20glass%20windows%20city%20skyline%20confident%20motivated%20diverse%20team%20career%20growth%20ambition&width=800&height=1000&seq=auth2&orientation=portrait"
          alt="Estagia Angola"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E]/85 via-[#1A1A2E]/55 to-[#E8501A]/25"></div>

        <div className="absolute inset-0 flex flex-col justify-between p-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#E8501A]">
              <i className="ri-briefcase-4-fill text-white text-lg"></i>
            </div>
            <span className="font-bold text-xl text-white">
              Estagia<span className="text-[#E8501A]">Angola</span>
            </span>
          </Link>

          {/* Feature list */}
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-6 leading-tight">
              {role === "estudante"
                ? "O teu futuro profissional começa aqui"
                : "Encontra os melhores talentos do IPAS"}
            </h2>
            <div className="space-y-4">
              {(role === "estudante"
                ? [
                    { icon: "ri-search-2-line", title: "Pesquisa avançada", desc: "Filtra vagas por área, duração e localização" },
                    { icon: "ri-folder-user-line", title: "Portfólio de projectos", desc: "Destaca os teus trabalhos académicos" },
                    { icon: "ri-notification-3-line", title: "Alertas personalizados", desc: "Recebe vagas que correspondem ao teu perfil" },
                    { icon: "ri-shield-check-line", title: "Candidatura segura", desc: "Processo transparente e acompanhado" },
                  ]
                : [
                    { icon: "ri-group-line", title: "Base de talentos", desc: "Acesso a 1.200+ estudantes qualificados" },
                    { icon: "ri-filter-3-line", title: "Filtros avançados", desc: "Encontra candidatos pelo perfil certo" },
                    { icon: "ri-dashboard-line", title: "Painel de gestão", desc: "Gere candidaturas de forma eficiente" },
                    { icon: "ri-medal-line", title: "Marca empregadora", desc: "Perfil institucional destacado no IPAS" },
                  ]
              ).map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 flex-shrink-0">
                    <i className={`${f.icon} text-[#E8501A] text-lg`}></i>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{f.title}</p>
                    <p className="text-white/60 text-xs mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom note */}
          <p className="text-white/40 text-xs">
            © 2026 EstagiaAngola · Plataforma oficial do IPAS
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="min-h-full flex flex-col justify-center items-center px-6 py-12">
          {/* Mobile logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8 cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#E8501A]">
              <i className="ri-briefcase-4-fill text-white"></i>
            </div>
            <span className="font-bold text-lg text-[#1A1A2E]">
              Estagia<span className="text-[#E8501A]">Angola</span>
            </span>
          </Link>

          <div className="w-full max-w-lg">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E] mb-1.5">
              Criar conta
            </h1>
            <p className="text-gray-500 text-sm mb-7">
              Junta-te a mais de 1.200 estudantes e 85 empresas na plataforma do IPAS.
            </p>

            {/* Role switcher */}
            <div className="flex bg-[#F4F4F6] rounded-xl p-1 mb-7">
              {(["estudante", "empresa"] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    role === r
                      ? "bg-white text-[#1A1A2E] shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <i className={`${r === "estudante" ? "ri-graduation-cap-line" : "ri-building-2-line"} text-base ${role === r ? "text-[#E8501A]" : ""}`}></i>
                  {r === "estudante" ? "Sou Estudante" : "Sou Empresa"}
                </button>
              ))}
            </div>

            {/* Context badge */}
            <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 mb-6 text-xs ${
              role === "estudante"
                ? "bg-orange-50 border border-orange-100 text-[#E8501A]"
                : "bg-blue-50 border border-blue-100 text-blue-700"
            }`}>
              <i className={`${role === "estudante" ? "ri-information-line" : "ri-building-2-line"} text-base flex-shrink-0`}></i>
              {role === "estudante"
                ? "Exclusivo para estudantes do IPAS — registo gratuito e sem taxas ocultas."
                : "Perfil de empresa verificado — publica vagas e gere candidaturas gratuitamente."}
            </div>

            {/* Form component */}
            {role === "estudante" ? <CadastroEstudante /> : <CadastroEmpresa />}

            <p className="text-center text-sm text-gray-500 mt-6">
              Já tens conta?{" "}
              <Link to="/login" className="text-[#E8501A] font-semibold hover:underline cursor-pointer">
                Entra aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
