import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=group%20of%20young%20African%20university%20students%20working%20together%20on%20laptops%20in%20modern%20office%20space%20professional%20team%20collaboration%20diverse%20Angola%20university%20campus%20motivated&width=1440&height=600&seq=cta1&orientation=landscape"
          alt="Estudantes do IPAS"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/95 via-[#1A1A2E]/80 to-[#E8501A]/40"></div>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 md:px-8 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-4 bg-[#E8501A]/10 px-4 py-1.5 rounded-full border border-[#E8501A]/20">
          Pronto para Começar?
        </span>
        <h2
          className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          O Teu Futuro Profissional <br className="hidden sm:block" />
          Está a Uma Candidatura
        </h2>
        <p className="text-white/75 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Junta-te a mais de 1.200 estudantes do IPAS que já descobriram o poder 
          de uma plataforma moderna de estágios em Angola.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/cadastro"
            className="w-full sm:w-auto bg-[#E8501A] hover:bg-[#C73E0C] text-white font-semibold px-8 py-4 rounded-xl transition-all text-base flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shadow-lg"
          >
            <i className="ri-graduation-cap-line"></i>
            Sou Estudante — Cadastrar
          </Link>
          <Link
            to="/cadastro"
            className="w-full sm:w-auto border-2 border-white/40 hover:border-white hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap backdrop-blur-sm"
          >
            <i className="ri-building-2-line"></i>
            Sou Empresa — Publicar Vaga
          </Link>
        </div>

        <p className="mt-6 text-white/40 text-xs">
          Gratuito para estudantes do IPAS · Sem taxas escondidas
        </p>
      </div>
    </section>
  );
}
