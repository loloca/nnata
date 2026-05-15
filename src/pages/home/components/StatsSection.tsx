import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StatsSection() {
  const [counts, setCounts] = useState({
    estudantes: 0,
    empresas: 0,
    vagas: 0,
    contratacoes: 34, // Mock as we don't have many real hires yet
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const [
        { count: studentsCount },
        { count: companiesCount },
        { count: internshipsCount }
      ] = await Promise.all([
        supabase.from('students').select('*', { count: 'exact', head: true }),
        supabase.from('companies').select('*', { count: 'exact', head: true }),
        supabase.from('internships').select('*', { count: 'exact', head: true })
      ]);

      setCounts({
        estudantes: studentsCount || 0,
        empresas: companiesCount || 0,
        vagas: internshipsCount || 0,
        contratacoes: 34
      });
    };

    fetchCounts();
  }, []);

  const stats = [
    { label: "Vagas de Estágio", value: `+${counts.vagas}`, icon: "ri-briefcase-line" },
    { label: "Estudantes do IPAS", value: counts.estudantes.toString(), icon: "ri-user-line" },
    { label: "Empresas Parceiras", value: counts.empresas.toString(), icon: "ri-building-2-line" },
    { label: "Contratações este mês", value: counts.contratacoes.toString(), icon: "ri-check-double-line" },
  ];

  return (
    <section className="bg-[#1A1A2E] py-16 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 rounded-2xl bg-[#E8501A]/15 group-hover:bg-[#E8501A]/25 transition-colors">
                <i className={`${stat.icon} text-[#E8501A] text-xl`}></i>
              </div>
              <div
                className="text-3xl md:text-4xl font-extrabold text-white mb-1"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

