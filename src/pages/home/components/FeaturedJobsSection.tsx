import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const typeColors: Record<string, string> = {
  Presencial: "bg-green-100 text-green-700",
  Híbrido: "bg-blue-100 text-blue-700",
  Remoto: "bg-purple-100 text-purple-700",
};

export default function FeaturedJobsSection() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('internships')
        .select(`
          *,
          companies (
            name,
            logo_url
          )
        `)
        .eq('status', 'Activa')
        .order('created_at', { ascending: false })
        .limit(3);

      if (!error && data) {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">
              Oportunidades
            </span>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Vagas Recentes
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
          {loading ? (
             [1, 2, 3].map(i => (
               <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                 <div className="flex justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl"></div>
                    <div className="w-20 h-6 bg-gray-100 rounded-full"></div>
                 </div>
                 <div className="h-5 bg-gray-100 rounded w-3/4 mb-2"></div>
                 <div className="h-4 bg-gray-50 rounded w-1/2 mb-4"></div>
                 <div className="flex gap-2">
                    <div className="h-6 bg-gray-50 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-50 rounded-full w-16"></div>
                 </div>
               </div>
             ))
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-[#E8501A]/30 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 overflow-hidden border border-gray-100">
                    {job.companies?.logo_url ? (
                      <img
                        src={job.companies.logo_url}
                        alt={job.companies.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <i className="ri-building-line text-gray-300 text-xl"></i>
                    )}
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColors[job.type] || "bg-gray-100 text-gray-600"}`}>
                    {job.type}
                  </span>
                </div>
                <h3 className="font-bold text-[#1A1A2E] text-base mb-1 group-hover:text-[#E8501A] transition-colors line-clamp-1">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{job.companies?.name}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 text-[#E8501A]">
                    {job.area}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <i className="ri-map-pin-line text-xs"></i>{job.province}
                  </span>
                </div>
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {new Date(job.created_at).toLocaleDateString('pt-AO')}
                  </span>
                  <Link
                    to="/vagas"
                    className="text-xs font-bold text-[#E8501A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Candidatar <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
               <p className="text-gray-400">Nenhuma vaga publicada recentemente.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

