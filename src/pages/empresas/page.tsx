import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { empresasListagem } from "@/mocks/empresas";

const SECTORES = [
  "Todos",
  "Telecomunicações",
  "Energia & Petróleo",
  "Banca & Finanças",
  "Fintech & Pagamentos",
  "Seguros",
  "Construção & Infraestrutura",
  "Retalho & Distribuição",
  "Media & Comunicação",
  "Agro-Indústria",
  "Logística & Transporte",
];

const PROVINCIAS = [
  "Todas",
  "Luanda",
  "Benguela",
  "Huambo",
  "Malanje",
  "Cabinda",
  "Huíla",
  "Uíge",
  "Namibe",
];

const DIMENSOES = ["Todas", "Pequena (<100)", "Média (100–499)", "Grande (500+)"];

const ORDENS = [
  { value: "rating", label: "Melhor avaliação" },
  { value: "estagios", label: "Mais estágios" },
  { value: "vagas", label: "Mais vagas" },
  { value: "nome", label: "A → Z" },
];

export default function EmpresasPage() {
  const [busca, setBusca] = useState("");
  const [sector, setSector] = useState("Todos");
  const [provincia, setProvincia] = useState("Todas");
  const [dimensao, setDimensao] = useState("Todas");
  const [apenasVerificadas, setApenasVerificadas] = useState(false);
  const [ordem, setOrdem] = useState("rating");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const resultado = useMemo(() => {
    let list = [...empresasListagem];

    if (busca.trim()) {
      const q = busca.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.sector.toLowerCase().includes(q) ||
          e.areaContratacao.some((a) => a.toLowerCase().includes(q))
      );
    }
    if (sector !== "Todos") list = list.filter((e) => e.sector === sector);
    if (provincia !== "Todas") list = list.filter((e) => e.province === provincia);
    if (dimensao !== "Todas") list = list.filter((e) => e.dimensao.startsWith(dimensao.split(" ")[0]));
    if (apenasVerificadas) list = list.filter((e) => e.verificada);

    list.sort((a, b) => {
      if (ordem === "rating") return b.rating - a.rating;
      if (ordem === "estagios") return b.totalEstagios - a.totalEstagios;
      if (ordem === "vagas") return b.vagasAtivas - a.vagasAtivas;
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [busca, sector, provincia, dimensao, apenasVerificadas, ordem]);

  const totalVagas = empresasListagem.reduce((s, e) => s + e.vagasAtivas, 0);
  const totalEstagios = empresasListagem.reduce((s, e) => s + e.totalEstagios, 0);
  const verificadas = empresasListagem.filter((e) => e.verificada).length;

  const resetFilters = () => {
    setBusca("");
    setSector("Todos");
    setProvincia("Todas");
    setDimensao("Todas");
    setApenasVerificadas(false);
  };

  const hasActiveFilters =
    sector !== "Todos" ||
    provincia !== "Todas" ||
    dimensao !== "Todas" ||
    apenasVerificadas ||
    busca.trim() !== "";

  return (
    <div
      className="min-h-screen bg-[#F8F7F4]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-20 relative overflow-hidden">
        <div className="h-56 md:h-72 relative">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20Angola%20Luanda%20skyline%20city%20aerial%20view%20business%20district%20office%20buildings%20warm%20sunset%20golden%20hour%20photography%20cinematic%20wide&width=1440&height=400&seq=emp-hero&orientation=landscape"
            alt="Empresas parceiras EsTagia Angola"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/70 via-[#1A1A2E]/50 to-[#1A1A2E]/80"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold bg-[#E8501A]/20 text-[#E8501A] border border-[#E8501A]/30 px-3 py-1.5 rounded-full mb-4">
              <i className="ri-building-2-line"></i>
              {empresasListagem.length} Empresas Parceiras
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
              Encontra a tua Empresa<br className="hidden md:block" />
              <span className="text-[#E8501A]"> de Estágio Ideal</span>
            </h1>
            <p className="text-white/70 text-sm md:text-base max-w-xl">
              Explora as melhores empresas parceiras de Angola e candidata-te às vagas de estágio disponíveis.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: "ri-building-2-line", value: empresasListagem.length, label: "Empresas parceiras", color: "text-[#E8501A]" },
              { icon: "ri-briefcase-line", value: totalVagas, label: "Vagas abertas", color: "text-violet-600" },
              { icon: "ri-award-line", value: `${totalEstagios}+`, label: "Estágios realizados", color: "text-emerald-600" },
              { icon: "ri-shield-check-line", value: verificadas, label: "Empresas verificadas", color: "text-amber-600" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 flex-shrink-0`}>
                  <i className={`${s.icon} ${s.color} text-lg`}></i>
                </div>
                <div>
                  <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Search + toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
              <i className="ri-search-line text-gray-400 text-sm"></i>
            </div>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar empresa, sector ou área..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#1A1A2E] placeholder-gray-400 focus:outline-none focus:border-[#E8501A] transition-colors"
            />
            {busca && (
              <button
                onClick={() => setBusca("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-sm"></i>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={ordem}
              onChange={(e) => setOrdem(e.target.value)}
              className="px-3 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#374151] focus:outline-none focus:border-[#E8501A] cursor-pointer"
            >
              {ORDENS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all cursor-pointer whitespace-nowrap ${
                hasActiveFilters
                  ? "bg-[#E8501A] text-white border-[#E8501A]"
                  : "bg-white text-[#374151] border-gray-200 hover:border-[#E8501A] hover:text-[#E8501A]"
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-filter-3-line"></i>
              </div>
              Filtros
              {hasActiveFilters && (
                <span className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full text-xs font-bold">
                  {[sector !== "Todos", provincia !== "Todas", dimensao !== "Todas", apenasVerificadas].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filters panel */}
        {filtersOpen && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Sector */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2.5">Sector</label>
                <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {SECTORES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSector(s)}
                      className={`text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                        sector === s
                          ? "bg-[#E8501A] text-white font-medium"
                          : "text-[#374151] hover:bg-orange-50 hover:text-[#E8501A]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Província */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2.5">Província</label>
                <div className="flex flex-col gap-1.5">
                  {PROVINCIAS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setProvincia(p)}
                      className={`text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                        provincia === p
                          ? "bg-[#E8501A] text-white font-medium"
                          : "text-[#374151] hover:bg-orange-50 hover:text-[#E8501A]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensão + Verificadas */}
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2.5">Dimensão</label>
                  <div className="flex flex-col gap-1.5">
                    {DIMENSOES.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDimensao(d)}
                        className={`text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                          dimensao === d
                            ? "bg-[#E8501A] text-white font-medium"
                            : "text-[#374151] hover:bg-orange-50 hover:text-[#E8501A]"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2.5">Estado</label>
                  <button
                    onClick={() => setApenasVerificadas((v) => !v)}
                    className={`flex items-center gap-3 w-full text-left text-sm px-3 py-2.5 rounded-lg border transition-all cursor-pointer ${
                      apenasVerificadas
                        ? "border-[#E8501A] bg-orange-50 text-[#E8501A]"
                        : "border-gray-200 text-[#374151] hover:border-[#E8501A]"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${apenasVerificadas ? "bg-[#E8501A]" : "bg-gray-200"}`}>
                      {apenasVerificadas && <i className="ri-check-line text-white text-xs"></i>}
                    </div>
                    Só verificadas
                  </button>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E8501A] transition-colors cursor-pointer mt-auto"
                  >
                    <div className="w-4 h-4 flex items-center justify-center"><i className="ri-refresh-line"></i></div>
                    Limpar filtros
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Active filter pills */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-5">
            {sector !== "Todos" && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-[#E8501A]/10 text-[#E8501A] px-3 py-1.5 rounded-full font-medium">
                {sector}
                <button onClick={() => setSector("Todos")} className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-70 cursor-pointer"><i className="ri-close-line"></i></button>
              </span>
            )}
            {provincia !== "Todas" && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-[#E8501A]/10 text-[#E8501A] px-3 py-1.5 rounded-full font-medium">
                {provincia}
                <button onClick={() => setProvincia("Todas")} className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-70 cursor-pointer"><i className="ri-close-line"></i></button>
              </span>
            )}
            {dimensao !== "Todas" && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-[#E8501A]/10 text-[#E8501A] px-3 py-1.5 rounded-full font-medium">
                {dimensao}
                <button onClick={() => setDimensao("Todas")} className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-70 cursor-pointer"><i className="ri-close-line"></i></button>
              </span>
            )}
            {apenasVerificadas && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-medium">
                <i className="ri-shield-check-line"></i> Verificadas
                <button onClick={() => setApenasVerificadas(false)} className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-70 cursor-pointer"><i className="ri-close-line"></i></button>
              </span>
            )}
            {busca.trim() && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full font-medium">
                &ldquo;{busca}&rdquo;
                <button onClick={() => setBusca("")} className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-70 cursor-pointer"><i className="ri-close-line"></i></button>
              </span>
            )}
          </div>
        )}

        {/* Results header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-[#1A1A2E]">{resultado.length}</span> empresa{resultado.length !== 1 ? "s" : ""} encontrada{resultado.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* ── GRID ── */}
        {resultado.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resultado.map((empresa) => (
              <EmpresaCard key={empresa.id} empresa={empresa} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
              <i className="ri-building-2-line text-gray-400 text-2xl"></i>
            </div>
            <h3 className="font-semibold text-[#1A1A2E] mb-2">Nenhuma empresa encontrada</h3>
            <p className="text-sm text-gray-500 mb-5">Tenta ajustar os filtros ou pesquisar por outro termo.</p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 text-sm font-medium bg-[#E8501A] text-white px-5 py-2.5 rounded-xl hover:bg-[#C73E0C] transition-colors cursor-pointer"
            >
              <div className="w-4 h-4 flex items-center justify-center"><i className="ri-refresh-line"></i></div>
              Limpar filtros
            </button>
          </div>
        )}

        {/* CTA banner */}
        {resultado.length > 0 && (
          <div className="mt-12 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-extrabold text-white mb-1">A tua empresa ainda não está aqui?</h3>
              <p className="text-sm text-white/60">Regista a tua empresa e começa a contratar os melhores estagiários de Angola.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                to="/cadastro"
                className="flex items-center gap-2 bg-[#E8501A] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap"
              >
                <div className="w-4 h-4 flex items-center justify-center"><i className="ri-building-2-line"></i></div>
                Registar Empresa
              </Link>
              <Link
                to="/sobre"
                className="flex items-center gap-2 border border-white/20 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
              >
                Saber mais
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

/* ── EmpresaCard ── */
type EmpresaCardItem = typeof empresasListagem[0];

function EmpresaCard({ empresa }: { empresa: EmpresaCardItem }) {
  return (
    <Link
      to={`/empresa/${empresa.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Cover */}
      <div className="relative h-28 overflow-hidden flex-shrink-0">
        <img
          src={empresa.cover}
          alt={empresa.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Badges top-right */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
          {empresa.vagasAtivas > 0 && (
            <span className="text-xs bg-[#E8501A] text-white font-bold px-2 py-0.5 rounded-full">
              {empresa.vagasAtivas} vagas
            </span>
          )}
          {empresa.verificada && (
            <span className="w-7 h-7 flex items-center justify-center bg-white/90 rounded-full">
              <i className="ri-shield-check-fill text-emerald-500 text-sm"></i>
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Logo + name */}
        <div className="flex items-start gap-3 -mt-7 mb-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white bg-white flex-shrink-0">
            <img src={empresa.logo} alt={empresa.name} className="w-full h-full object-cover object-top" />
          </div>
          <div className="mt-5 min-w-0">
            <h3 className="font-bold text-[#1A1A2E] text-sm leading-snug line-clamp-1">{empresa.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{empresa.sector}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">{empresa.descricaoCurta}</p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 text-xs bg-orange-50 text-[#E8501A] px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
            <i className="ri-map-pin-line text-xs"></i>
            {empresa.province}
          </span>
          <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full whitespace-nowrap">
            <i className="ri-group-line text-xs"></i>
            {empresa.colaboradores}
          </span>
          <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full whitespace-nowrap">
            <i className="ri-calendar-line text-xs"></i>
            desde {empresa.fundacao}
          </span>
        </div>

        {/* Stats + Rating */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="text-sm font-bold text-[#E8501A]">{empresa.totalEstagios}</p>
              <p className="text-xs text-gray-400">estágios</p>
            </div>
            <div className="w-px h-6 bg-gray-100"></div>
            <div className="text-center">
              <p className="text-sm font-bold text-violet-600">{empresa.vagasAtivas}</p>
              <p className="text-xs text-gray-400">vagas</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 flex items-center justify-center">
              <i className="ri-star-fill text-amber-400 text-xs"></i>
            </div>
            <span className="text-xs font-semibold text-[#1A1A2E]">{empresa.rating}</span>
            <span className="text-xs text-gray-300">/ 5</span>
          </div>
        </div>

        {/* Areas */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {empresa.areaContratacao.slice(0, 3).map((area) => (
            <span key={area} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-md">{area}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
