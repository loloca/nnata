import { companies } from "@/mocks/landing";

export default function CompaniesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">
            Empresas Parceiras
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Empresas que Confiam <br className="hidden sm:block" />
            no Estagia Angola
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {companies.map((company) => (
            <div
              key={company.name}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:border-[#E8501A]/40 hover:shadow-sm transition-all duration-300 cursor-pointer group"
            >
              <div className="w-full h-10 flex items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-w-[100px] max-h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="text-xs font-medium text-gray-500 group-hover:text-[#E8501A] transition-colors">
                {company.name}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-gray-500">
            E muitas outras empresas angolanas em crescimento
          </p>
          <button className="mt-4 text-sm font-medium text-[#E8501A] hover:underline cursor-pointer whitespace-nowrap">
            Ver todas as empresas parceiras <i className="ri-arrow-right-line ml-1"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
