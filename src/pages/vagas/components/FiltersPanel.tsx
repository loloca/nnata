import { areas, provinces } from "@/mocks/landing";
import { durations, types, sectors } from "@/mocks/vagas";

export interface Filters {
  search: string;
  areas: string[];
  provinces: string[];
  durations: string[];
  types: string[];
  sectors: string[];
}

interface FiltersPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  totalResults: number;
}

function CheckGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
}) {
  return (
    <div className="mb-6">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">{label}</h4>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
            <div
              onClick={() => onToggle(opt)}
              className={`w-4 h-4 flex items-center justify-center rounded border transition-colors flex-shrink-0 ${
                selected.includes(opt)
                  ? "bg-[#E8501A] border-[#E8501A]"
                  : "border-gray-300 group-hover:border-[#E8501A]"
              }`}
            >
              {selected.includes(opt) && (
                <i className="ri-check-line text-white text-[10px]"></i>
              )}
            </div>
            <span className="text-sm text-gray-600 group-hover:text-[#1A1A2E] transition-colors">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FiltersPanel({ filters, onChange, totalResults }: FiltersPanelProps) {
  const toggle = (key: keyof Filters, val: string) => {
    const arr = filters[key] as string[];
    const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
    onChange({ ...filters, [key]: next });
  };

  const clearAll = () => {
    onChange({ search: filters.search, areas: [], provinces: [], durations: [], types: [], sectors: [] });
  };

  const hasActiveFilters =
    filters.areas.length > 0 ||
    filters.provinces.length > 0 ||
    filters.durations.length > 0 ||
    filters.types.length > 0 ||
    filters.sectors.length > 0;

  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-[#1A1A2E] text-sm">Filtros</h3>
            <p className="text-xs text-gray-400 mt-0.5">{totalResults} vagas encontradas</p>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-xs font-medium text-[#E8501A] hover:underline cursor-pointer whitespace-nowrap"
            >
              Limpar tudo
            </button>
          )}
        </div>

        <div className="border-t border-gray-100 pt-5">
          <CheckGroup
            label="Área"
            options={areas}
            selected={filters.areas}
            onToggle={(v) => toggle("areas", v)}
          />
          <div className="border-t border-gray-100 pt-5">
            <CheckGroup
              label="Tipo"
              options={types}
              selected={filters.types}
              onToggle={(v) => toggle("types", v)}
            />
          </div>
          <div className="border-t border-gray-100 pt-5">
            <CheckGroup
              label="Duração"
              options={durations}
              selected={filters.durations}
              onToggle={(v) => toggle("durations", v)}
            />
          </div>
          <div className="border-t border-gray-100 pt-5">
            <CheckGroup
              label="Província"
              options={provinces}
              selected={filters.provinces}
              onToggle={(v) => toggle("provinces", v)}
            />
          </div>
          <div className="border-t border-gray-100 pt-5">
            <CheckGroup
              label="Sector"
              options={sectors}
              selected={filters.sectors}
              onToggle={(v) => toggle("sectors", v)}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
