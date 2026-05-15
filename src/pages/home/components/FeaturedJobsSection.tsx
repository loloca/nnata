import { Link } from "react-router-dom";
import { featuredJobs } from "@/mocks/landing";

const typeColors: Record<string, string> = {
  Presencial: "bg-green-100 text-green-700",
  Híbrido: "bg-blue-100 text-blue-700",
  Remoto: "bg-purple-100 text-purple-700",
};

const areaColors: Record<string, string> = {
  Engenharia: "bg-orange-100 text-[#E8501A]",
  Tecnologia: "bg-indigo-100 text-indigo-700",
  Finanças: "bg-yellow-100 text-yellow-700",
};

export default function FeaturedJobsSection() {
  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">
              Em Destaque
            </span>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Vagas em Destaque
            </h2>
          </div>
          <Link
            to="/vagas"
            className="text-sm font-medium text-[#E8501A] hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            Ver todas as vagas <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredJobs.map((job, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-[#E8501A]/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 overflow-hidden">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColors[job.type] ?? "bg-gray-100 text-gray-600"}`}>
                  {job.type}
                </span>
              </div>
              <h3 className="font-semibold text-[#1A1A2E] text-base mb-1 group-hover:text-[#E8501A] transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{job.company}</p>
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${areaColors[job.area] ?? "bg-gray-100 text-gray-600"}`}>
                  {job.area}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <i className="ri-map-pin-line text-xs"></i>{job.province}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <i className="ri-time-line text-xs"></i>{job.duration}
                </span>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">Publicado recentemente</span>
                <Link
                  to="/vagas"
                  className="text-xs font-semibold text-[#E8501A] hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  Candidatar <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
