import type { Vaga } from "@/mocks/vagas";

const typeColors: Record<string, string> = {
  Presencial: "bg-green-100 text-green-700",
  Híbrido: "bg-amber-100 text-amber-700",
  Remoto: "bg-indigo-100 text-indigo-700",
};

interface VagaCardProps {
  vaga: Vaga;
  onClick: () => void;
  selected: boolean;
}

export default function VagaCard({ vaga, onClick, selected }: VagaCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all duration-200 group ${
        selected
          ? "border-[#E8501A] shadow-md"
          : "border-gray-100 hover:border-[#E8501A]/40 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0 overflow-hidden">
          <img
            src={vaga.companyLogo}
            alt={vaga.company}
            className="w-10 h-10 object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <h3
                className={`font-semibold text-base leading-tight mb-0.5 transition-colors ${
                  selected ? "text-[#E8501A]" : "text-[#1A1A2E] group-hover:text-[#E8501A]"
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {vaga.title}
              </h3>
              <p className="text-sm text-gray-500">{vaga.company} · {vaga.sector}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {vaga.featured && (
                <span className="text-[10px] font-semibold uppercase tracking-wide bg-[#E8501A]/10 text-[#E8501A] px-2 py-0.5 rounded-full whitespace-nowrap">
                  Destaque
                </span>
              )}
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${typeColors[vaga.type] ?? "bg-gray-100 text-gray-600"}`}>
                {vaga.type}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="text-xs bg-orange-50 text-[#E8501A] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <i className="ri-layout-grid-line text-[10px]"></i>{vaga.area}
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <i className="ri-map-pin-line text-[10px]"></i>{vaga.province}
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <i className="ri-time-line text-[10px]"></i>{vaga.duration}
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <i className="ri-user-line"></i>{vaga.applicants} candidatos
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-time-line"></i>
                {vaga.postedDaysAgo === 0
                  ? "Hoje"
                  : vaga.postedDaysAgo === 1
                  ? "Ontem"
                  : `há ${vaga.postedDaysAgo} dias`}
              </span>
            </div>
            <span className="text-xs font-semibold text-[#E8501A] flex items-center gap-1 whitespace-nowrap">
              Ver detalhes <i className="ri-arrow-right-line"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
