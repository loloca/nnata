import { steps } from "@/mocks/landing";

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#FAFAFA] to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">
            Processo
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Como Funciona a Plataforma
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Do registo à contratação em apenas 4 passos simples. 
            O processo mais desburocratizado do mercado angolano.
          </p>
        </div>

        {/* Desktop layout with connector */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px border-t-2 border-dashed border-[#E8501A]/30 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-8 text-center hover:border-[#E8501A]/30 hover:shadow-md transition-all duration-300 group"
              >
                {/* Number badge */}
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-6 rounded-full bg-gradient-to-br from-[#E8501A] to-[#C73E0C] text-white font-bold text-lg shadow-md">
                  {step.number}
                </div>
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-2xl bg-orange-50 group-hover:bg-[#E8501A]/10 transition-colors">
                  <i className={`${step.icon} text-[#E8501A] text-3xl`}></i>
                </div>
                <h3
                  className="font-bold text-[#1A1A2E] text-lg mb-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA inside section */}
        <div className="text-center mt-14">
          <button className="bg-[#E8501A] hover:bg-[#C73E0C] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm cursor-pointer whitespace-nowrap shadow-md">
            Começar Agora — É Gratuito
          </button>
          <p className="text-xs text-gray-400 mt-3">Apenas para estudantes do IPAS</p>
        </div>
      </div>
    </section>
  );
}
