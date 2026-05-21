import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { areas, provinces } from "@/mocks/landing";
import { supabase } from "@/lib/supabase";

export default function HeroSection() {
  const [area, setArea] = useState("");
  const [province, setProvince] = useState("");
  const [duration, setDuration] = useState("");
  const [counts, setCounts] = useState({ vagas: 0, empresas: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [{ count: vCount }, { count: eCount }] = await Promise.all([
          supabase.from('internships').select('*', { count: 'exact', head: true }),
          supabase.from('companies').select('*', { count: 'exact', head: true })
        ]);
        setCounts({ vagas: vCount || 0, empresas: eCount || 0 });
      } catch (error) {
        console.error("Erro ao carregar contagens do banco de dados:", error);
        setCounts({ vagas: 0, empresas: 0 });
      }
    };
    fetchCounts();
  }, []);

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
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1440&h=900"
          alt="Luanda Angola cityscape"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1923]/95 via-[#0F1923]/80 to-[#0F1923]/40"></div>
      </div>

      {/* Floating badges */}
      <div className="absolute top-1/4 right-[8%] hidden lg:flex flex-col gap-5 animate-float">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-4 w-60 border border-white/20 transform hover:scale-105 transition-transform">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-orange-100 flex-shrink-0">
            <i className="ri-briefcase-line text-[#E8501A] text-xl font-bold"></i>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Vagas Abertas</p>
            <p className="font-extrabold text-[#1A1A2E] text-lg">+{counts.vagas}</p>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-4 w-60 ml-10 border border-white/20 transform hover:scale-105 transition-transform">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-green-100 flex-shrink-0">
            <i className="ri-user-follow-line text-green-600 text-xl font-bold"></i>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Candidatos</p>
            <p className="font-extrabold text-[#1A1A2E] text-lg">1.2k+</p>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-4 w-60 border border-white/20 transform hover:scale-105 transition-transform">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-100 flex-shrink-0">
            <i className="ri-building-2-line text-blue-600 text-xl font-bold"></i>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Empresas</p>
            <p className="font-extrabold text-[#1A1A2E] text-lg">{counts.empresas}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 backdrop-blur-md">
            <i className="ri-graduation-cap-line text-[#E8501A] text-sm"></i>
            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Plataforma Oficial do IPAS</span>
          </div>

          {/* Heading */}
          <h1
            className="text-5xl md:text-7xl font-extrabold text-white leading-[1] mb-8"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            O Teu Estágio <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8501A] to-[#F97316]">Começa Aqui.</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-12 max-w-lg">
            Conectamos os talentos do IPAS às melhores empresas angolanas. 
            Candidatura simples, perfil profissional e portfólio — tudo num só lugar.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-3xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col sm:flex-row gap-2 border border-white/20"
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-2xl transition-colors">
              <i className="ri-search-line text-[#E8501A] text-lg"></i>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="flex-1 bg-transparent text-sm font-semibold text-[#1A1A2E] focus:outline-none cursor-pointer appearance-none"
              >
                <option value="">Área de Estágio</option>
                {areas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="hidden sm:block w-px bg-gray-100 my-2"></div>

            <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-2xl transition-colors">
              <i className="ri-map-pin-line text-[#E8501A] text-lg"></i>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="flex-1 bg-transparent text-sm font-semibold text-[#1A1A2E] focus:outline-none cursor-pointer appearance-none"
              >
                <option value="">Província</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#E8501A] to-[#F97316] hover:shadow-[0_10px_20px_rgba(232,80,26,0.3)] text-white font-bold px-8 py-4 rounded-2xl transition-all text-sm whitespace-nowrap cursor-pointer transform active:scale-95"
            >
              <i className="ri-search-line mr-2"></i>Buscar Vagas
            </button>
          </form>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mr-2">Popular:</span>
            {["Tecnologia", "Engenharia", "Marketing"].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/vagas?area=${tag}`)}
                className="bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl px-4 py-1.5 text-xs text-white/90 transition-all cursor-pointer whitespace-nowrap backdrop-blur-sm"
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

