import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import FiltersPanel, { type Filters } from "./components/FiltersPanel";
import VagaCard from "./components/VagaCard";
import VagaDetail from "./components/VagaDetail";
import { vagasMock, type Vaga } from "@/mocks/vagas";

type SortOption = "recentes" | "candidatos" | "destaque";

export default function VagasPage() {
  const [searchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [sort, setSort] = useState<SortOption>("recentes");
  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get("area") || "",
    areas: searchParams.get("area") ? [searchParams.get("area") as string] : [],
    provinces: searchParams.get("provincia") ? [searchParams.get("provincia") as string] : [],
    durations: searchParams.get("duracao") ? [searchParams.get("duracao") as string] : [],
    types: [],
    sectors: [],
  });

  const [searchInput, setSearchInput] = useState(searchParams.get("area") || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVagas = async () => {
      const { supabase } = await import("@/lib/supabase");
      const { data, error } = await supabase
        .from('internships')
        .select(`
          *,
          companies (
            name,
            logo_url
          )
        `)
        .eq('status', 'active');

      if (!error && data) {
        // Map Supabase data to Vaga type
        const mapped: Vaga[] = data.map(item => ({
          id: item.id,
          title: item.title,
          company: item.companies?.name || "Empresa",
          logo: item.companies?.logo_url || "",
          area: item.area,
          province: item.province,
          duration: item.duration,
          type: item.type || "Presencial",
          sector: item.sector || "Geral",
          description: item.description,
          requirements: item.requirements ? item.requirements.split('\n') : [],
          postedDaysAgo: Math.floor((new Date().getTime() - new Date(item.created_at).getTime()) / (1000 * 3600 * 24)),
          applicants: item.applicants_count || 0,
          featured: item.is_featured,
        }));
        setVagas(mapped);
      }
      setLoading(false);
    };

    fetchVagas();
  }, []);

  const filtered = useMemo(() => {
    let list = [...vagas];

    if (searchInput.trim()) {
      const q = searchInput.toLowerCase();
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.company.toLowerCase().includes(q) ||
          v.area.toLowerCase().includes(q) ||
          v.sector.toLowerCase().includes(q)
      );
    }
    if (filters.areas.length > 0) list = list.filter((v) => filters.areas.includes(v.area));
    if (filters.provinces.length > 0) list = list.filter((v) => filters.provinces.includes(v.province));
    if (filters.durations.length > 0) list = list.filter((v) => filters.durations.includes(v.duration));
    if (filters.types.length > 0) list = list.filter((v) => filters.types.includes(v.type));
    if (filters.sectors.length > 0) list = list.filter((v) => filters.sectors.includes(v.sector));

    if (sort === "recentes") list.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    else if (sort === "candidatos") list.sort((a, b) => b.applicants - a.applicants);
    else if (sort === "destaque") list.sort((a, b) => Number(b.featured) - Number(a.featured));

    return list;
  }, [vagas, filters, searchInput, sort]);


  const selectedVaga: Vaga | null = filtered.find((v) => v.id === selectedId) ?? null;

  const handleSelect = (vaga: Vaga) => {
    setSelectedId(vaga.id);
    setShowDetail(true);
  };

  const activeFilterCount =
    filters.areas.length +
    filters.provinces.length +
    filters.durations.length +
    filters.types.length +
    filters.sectors.length;

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navbar />

      {/* Page header */}
      <div className="bg-[#1A1A2E] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">
            Oportunidades
          </span>
          <h1
            className="text-3xl md:text-4xl font-extrabold text-white mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Vagas de Estágio
          </h1>
          <p className="text-white/60 text-base mb-7 max-w-xl">
            Descobre as melhores oportunidades de estágio em empresas angolanas. Filtra por área, duração e localização.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className="ri-search-line text-gray-400 text-base"></i>
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Pesquisa por cargo, empresa ou área..."
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              {searchInput && (
                <button onClick={() => setSearchInput("")} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <i className="ri-close-line"></i>
                </button>
              )}
            </div>
            <button className="bg-[#E8501A] hover:bg-[#C73E0C] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap cursor-pointer">
              <i className="ri-search-line mr-1.5"></i>Pesquisar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-6 items-start">
          {/* Filters - desktop */}
          <div className="hidden lg:block">
            <FiltersPanel
              filters={filters}
              onChange={setFilters}
              totalResults={filtered.length}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-semibold text-[#1A1A2E]">
                  {filtered.length} vaga{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
                </span>
                {activeFilterCount > 0 && (
                  <span className="text-xs bg-[#E8501A]/10 text-[#E8501A] font-medium px-2.5 py-1 rounded-full">
                    {activeFilterCount} filtro{activeFilterCount !== 1 ? "s" : ""} activo{activeFilterCount !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile filters button */}
                <button className="lg:hidden flex items-center gap-1.5 text-sm font-medium border border-gray-200 bg-white rounded-xl px-3 py-2 hover:border-[#E8501A] transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-filter-3-line text-[#E8501A]"></i>
                  Filtros {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>

                {/* Sort */}
                <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
                  {(["recentes", "candidatos", "destaque"] as SortOption[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSort(opt)}
                      className={`text-xs font-medium px-3 py-2 transition-colors cursor-pointer whitespace-nowrap capitalize ${
                        sort === opt ? "bg-[#E8501A] text-white" : "text-gray-500 hover:text-[#1A1A2E]"
                      }`}
                    >
                      {opt === "recentes" ? "Recentes" : opt === "candidatos" ? "Mais candidatos" : "Destaques"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Split view */}
            <div className="flex gap-5">
              {/* List */}
              <div className={`flex flex-col gap-3 ${showDetail && selectedVaga ? "hidden lg:flex lg:w-[380px] xl:w-[420px] flex-shrink-0" : "w-full"}`}>
                {loading ? (
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl"></div>
                          <div className="flex-1 space-y-3">
                            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <div className="w-14 h-14 flex items-center justify-center mx-auto rounded-2xl bg-orange-50 mb-4">
                      <i className="ri-search-line text-[#E8501A] text-2xl"></i>
                    </div>
                    <h3 className="font-semibold text-[#1A1A2E] text-base mb-2">Nenhuma vaga encontrada</h3>
                    <p className="text-sm text-gray-400">Tenta alterar os filtros ou a pesquisa.</p>
                  </div>
                ) : (
                  filtered.map((vaga) => (
                    <VagaCard
                      key={vaga.id}
                      vaga={vaga}
                      selected={selectedId === vaga.id}
                      onClick={() => handleSelect(vaga)}
                    />
                  ))
                )}
              </div>


              {/* Detail panel - desktop sticky */}
              {showDetail && selectedVaga && (
                <div className="flex-1 min-w-0">
                  {/* Mobile back button */}
                  <button
                    onClick={() => setShowDetail(false)}
                    className="lg:hidden flex items-center gap-2 text-sm font-medium text-[#E8501A] mb-3 cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-arrow-left-line"></i> Voltar às vagas
                  </button>
                  <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden flex flex-col rounded-2xl">
                    <VagaDetail
                      vaga={selectedVaga}
                      onClose={() => setShowDetail(false)}
                    />
                  </div>
                </div>
              )}

              {/* Desktop empty state detail */}
              {!showDetail && (
                <div className="hidden lg:flex flex-1">
                  <VagaDetail vaga={null} onClose={() => {}} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
