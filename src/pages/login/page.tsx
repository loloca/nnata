import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type Role = "estudante" | "empresa";

export default function LoginPage() {
  const [role, setRole] = useState<Role>("estudante");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as { from?: string })?.from ?? "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Preenche todos os campos.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({
        nome: role === "estudante" ? "João Silva" : "Empresa Demo",
        email,
        role,
        avatar: "",
      });
      navigate(from, { replace: true });
    }, 1400);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Left panel — illustration */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=young%20African%20professional%20students%20working%20on%20laptops%20modern%20coworking%20space%20Angola%20vibrant%20warm%20orange%20tones%20collaborative%20environment%20motivated%20ambitious%20team&width=900&height=1000&seq=auth1&orientation=portrait"
          alt="Estagia Angola"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E]/80 via-[#1A1A2E]/50 to-[#E8501A]/30"></div>

        {/* Overlay content */}
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

          {/* Testimonial card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md">
            <div className="flex gap-1 mb-4">
              {[1,2,3,4,5].map(i => (
                <i key={i} className="ri-star-fill text-[#E8501A] text-sm"></i>
              ))}
            </div>
            <p className="text-white text-sm leading-relaxed italic mb-4">
              &ldquo;O Estagia Angola mudou completamente a minha trajectória profissional. 
              Em 3 semanas tinha o estágio dos meus sonhos na Sonangol.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden border-2 border-[#E8501A]/40">
                <img
                  src="https://readdy.ai/api/search-image?query=young%20Angolan%20university%20student%20smiling%20portrait%20clean%20background%20confident%20professional&width=40&height=40&seq=av1&orientation=squarish"
                  alt="Avatar"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Ricardo Muanda</p>
                <p className="text-white/60 text-xs">Eng. Informática, IPAS · Estagiário na Unitel</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            {[
              { value: "1.200+", label: "Estudantes" },
              { value: "85+", label: "Empresas" },
              { value: "92%", label: "Satisfação" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-white font-bold text-xl">{s.value}</p>
                <p className="text-white/60 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white">
        {/* Mobile logo */}
        <Link to="/" className="flex lg:hidden items-center gap-2 mb-8 cursor-pointer">
          <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#E8501A]">
            <i className="ri-briefcase-4-fill text-white"></i>
          </div>
          <span className="font-bold text-lg text-[#1A1A2E]">
            Estagia<span className="text-[#E8501A]">Angola</span>
          </span>
        </Link>

        <div className="w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E] mb-1.5">
            Bem-vindo de volta!
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Entra na tua conta para continuar a explorar oportunidades.
          </p>

          {/* Role tabs */}
          <div className="flex bg-[#F4F4F6] rounded-xl p-1 mb-7">
            {(["estudante", "empresa"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setError(""); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  role === r
                    ? "bg-white text-[#1A1A2E] shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <i className={`${r === "estudante" ? "ri-graduation-cap-line" : "ri-building-2-line"} text-base ${role === r ? "text-[#E8501A]" : ""}`}></i>
                {r === "estudante" ? "Estudante" : "Empresa"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">
                {role === "estudante" ? "Email institucional / pessoal" : "Email corporativo"}
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                  <i className="ri-mail-line text-gray-400 text-base"></i>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === "estudante" ? "joao.silva@ipas.ao" : "rh@empresa.ao"}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E8501A] transition-colors placeholder-gray-300"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#1A1A2E]">Palavra-passe</label>
                <button type="button" className="text-xs text-[#E8501A] hover:underline cursor-pointer">
                  Esqueci a palavra-passe
                </button>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                  <i className="ri-lock-line text-gray-400 text-base"></i>
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E8501A] transition-colors placeholder-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className={`${showPass ? "ri-eye-off-line" : "ri-eye-line"} text-base`}></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                <i className="ri-error-warning-line"></i> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E8501A] hover:bg-[#C73E0C] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm cursor-pointer whitespace-nowrap mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i> A entrar...
                </>
              ) : (
                <>
                  <i className={role === "estudante" ? "ri-graduation-cap-line" : "ri-building-2-line"}></i>
                  Entrar como {role === "estudante" ? "Estudante" : "Empresa"}
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-xs text-gray-400">ou continua com</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* Social login */}
          <div className="flex gap-3">
            {[
              { icon: "ri-google-fill", label: "Google" },
              { icon: "ri-linkedin-box-fill", label: "LinkedIn" },
            ].map((s) => (
              <button
                key={s.label}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className={`${s.icon} text-base`}></i> {s.label}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-7">
            Ainda não tens conta?{" "}
            <Link to="/cadastro" className="text-[#E8501A] font-semibold hover:underline cursor-pointer">
              Cadastra-te aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
