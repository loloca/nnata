import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { areas, provinces } from "@/mocks/landing";

export default function HeroSection() {
  const [area, setArea] = useState("");
  const [province, setProvince] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (area) params.set("area", area);
    if (province) params.set("provincia", province);
    if (duration) params.set("duracao", duration);
    navigate(`/vagas?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=modern%20Angola%20Luanda%20skyline%20cityscape%20panoramic%20view%20with%20contemporary%20office%20buildings%20and%20vibrant%20urban%20energy%20warm%20golden%20hour%20lighting%20atmospheric%20professional%20photography&width=1440&height=900&seq=hero1&orientation=landscape"
          alt="Luanda Angola cityscape"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1923]/90 via-[#0F1923]/70 to-[#0F1923]/30"></div>
      </div>

      {/* Floating badges */}
      <div className="absolute top-1/3 right-[8%] hidden lg:flex flex-col gap-4 animate-pulse">
        <div className="bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 w-56">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-100 flex-shrink-0">
            <i className="ri-briefcase-line text-[#E8501A] text-lg"></i>
          </div>
          <div>
            <p className="text-xs text-gray-500">Novas vagas hoje</p>
            <p className="font-bold text-[#1A1A2E] text-sm">+12 oportunidades</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 w-56 ml-8">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-100 flex-shrink-0">
            <i className="ri-user-follow-line text-green-600 text-lg"></i>
          </div>
          <div>
            <p className="text-xs text-gray-500">Contratações este mês</p>
            <p className="font-bold text-[#1A1A2E] text-sm">34 estudantes</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 w-56">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-100 flex-shrink-0">
            <i className="ri-building-2-line text-blue-600 text-lg"></i>
          </div>
          <div>
            <p className="text-xs text-gray-500">Empresas parceiras</p>
            <p className="font-bold text-[#1A1A2E] text-sm">85+ empresas</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <i className="ri-graduation-cap-line text-[#E8501A] text-sm"></i>
            <span className="text-white text-xs font-medium tracking-wide">Plataforma Oficial do IPAS</span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl md:text-6xl font-extrabold text-white leading-[1.05] mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            O Teu Estágio <br />
            <span className="text-[#E8501A]">Começa Aqui.</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-lg">
            Conectamos os talentos do IPAS às melhores empresas angolanas. 
            Candidatura simples, perfil profissional e portfólio de projectos — tudo numa plataforma.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1 flex items-center gap-2 px-3 py-1">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className="ri-search-line text-gray-400 text-base"></i>
              </div>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="">Área de Estágio</option>
                {areas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="hidden sm:block w-px bg-gray-200 my-1"></div>

            <div className="flex-1 flex items-center gap-2 px-3 py-1">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className="ri-map-pin-line text-gray-400 text-base"></i>
              </div>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="">Província</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="hidden sm:block w-px bg-gray-200 my-1"></div>

            <div className="flex items-center gap-2 px-3 py-1 min-w-0">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className="ri-time-line text-gray-400 text-base"></i>
              </div>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="">Duração</option>
                <option value="1">1 mês</option>
                <option value="3">3 meses</option>
                <option value="6">6 meses</option>
                <option value="12">12 meses</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-[#E8501A] hover:bg-[#C73E0C] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap cursor-pointer"
            >
              <i className="ri-search-line mr-1.5"></i>Buscar Vagas
            </button>
          </form>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            <span className="text-white/60 text-xs mr-1">Popular:</span>
            {["Tecnologia", "Engenharia", "Finanças", "Marketing", "Saúde"].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/vagas?area=${tag}`)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1 text-xs text-white/80 transition-colors cursor-pointer whitespace-nowrap"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
