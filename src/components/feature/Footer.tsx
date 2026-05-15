import { useState } from "react";
import { Link } from "react-router-dom";

const FORM_URL = "https://readdy.ai/api/form/d7etjh83ifac7uv0dm0g";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("email", email);
      await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      setSubmitted(true);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0F1923] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#E8501A] to-[#C73E0C]">
                <i className="ri-briefcase-4-fill text-white text-lg"></i>
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Estagia<span className="text-[#E8501A]">Angola</span>
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Conectando os talentos do IPAS às melhores oportunidades de estágio em Angola.
              Modernizando o futuro do trabalho angolano.
            </p>
            <div className="flex items-center gap-3">
              {["ri-linkedin-fill", "ri-facebook-fill", "ri-instagram-line", "ri-twitter-x-line"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:bg-[#E8501A] hover:border-[#E8501A] hover:text-white transition-all cursor-pointer"
                >
                  <i className={`${icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Plataforma</h4>
            <ul className="space-y-3">
              {[
                { label: "Vagas de Estágio", href: "/vagas" },
                { label: "Empresas Parceiras", href: "/empresas" },
                { label: "Como Funciona", href: "/como-funciona" },
                { label: "Portfólios", href: "/portfolios" },
                { label: "Notificações", href: "/" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-sm text-white/60 hover:text-[#E8501A] transition-colors cursor-pointer"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Recursos</h4>
            <ul className="space-y-3">
              {[
                { label: "Para Estudantes", href: "/" },
                { label: "Para Empresas", href: "/" },
                { label: "Blog & Dicas", href: "/" },
                { label: "Guia de Estágio", href: "/" },
                { label: "Perguntas Frequentes", href: "/" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-sm text-white/60 hover:text-[#E8501A] transition-colors cursor-pointer"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Newsletter</h4>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Receba as melhores vagas de estágio directamente no seu email.
            </p>
            {submitted ? (
              <div className="bg-[#E8501A]/10 border border-[#E8501A]/30 rounded-xl px-4 py-3 text-sm text-[#E8501A]">
                <i className="ri-check-line mr-2"></i>Subscrito com sucesso!
              </div>
            ) : (
              <form data-readdy-form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="O seu email"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#E8501A] transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E8501A] hover:bg-[#C73E0C] text-white text-sm font-medium py-2.5 rounded-xl transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60"
                >
                  {loading ? "A subscrever..." : "Subscrever"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2026 EstagiaAngola. Todos os direitos reservados. Plataforma do IPAS.
          </p>
          <div className="flex items-center gap-6">
            {["Privacidade", "Termos de Uso", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-white/40 hover:text-[#E8501A] transition-colors cursor-pointer"
                rel="nofollow"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
