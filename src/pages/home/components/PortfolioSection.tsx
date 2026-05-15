import { Link } from "react-router-dom";

const projects = [
  {
    title: "App de Gestão Hospitalar",
    student: "Carlos Mbemba",
    course: "Eng. Informática",
    image: "https://readdy.ai/api/search-image?query=modern%20hospital%20management%20software%20dashboard%20app%20interface%20dark%20sleek%20UI%20screenshot%20Angola%20health%20tech%20project%20professional&width=400&height=260&seq=p1&orientation=landscape",
    tags: ["React", "Node.js", "Saúde"],
    likes: 124,
  },
  {
    title: "Sistema de Pagamento Mobile",
    student: "Ana Sebastião",
    course: "Eng. Electrónica",
    image: "https://readdy.ai/api/search-image?query=mobile%20payment%20fintech%20app%20interface%20Angola%20Africa%20clean%20modern%20UI%20design%20screenshot%20professional%20dark%20sleek&width=400&height=260&seq=p2&orientation=landscape",
    tags: ["Flutter", "Firebase", "Fintech"],
    likes: 98,
  },
  {
    title: "Plataforma de E-commerce",
    student: "Pedro Lúcio",
    course: "Gestão de TI",
    image: "https://readdy.ai/api/search-image?query=ecommerce%20shopping%20platform%20web%20app%20clean%20modern%20dashboard%20interface%20Angola%20marketplace%20professional%20screenshot&width=400&height=260&seq=p3&orientation=landscape",
    tags: ["Vue.js", "Python", "E-commerce"],
    likes: 87,
  },
];

export default function PortfolioSection() {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">
              Portfólio
            </span>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Projectos dos Nossos <br className="hidden sm:block" />
              Estudantes
            </h2>
          </div>
          <Link
            to="/portfolios"
            className="text-sm font-medium text-[#E8501A] hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            Ver todos os projectos <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-[#E8501A]/20 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-full h-44 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-44 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-orange-50 text-[#E8501A] font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-[#1A1A2E] text-base mb-1 group-hover:text-[#E8501A] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {proj.student} · {proj.course}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <i className="ri-heart-line text-[#E8501A]"></i> {proj.likes} gostos
                  </span>
                  <span className="text-xs font-medium text-[#E8501A] hover:underline cursor-pointer whitespace-nowrap">
                    Ver projecto <i className="ri-arrow-right-line"></i>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
