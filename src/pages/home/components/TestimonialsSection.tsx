import { useState } from "react";
import { testimonials } from "@/mocks/landing";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">
            Depoimentos
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            O Que Dizem os Nossos <br className="hidden sm:block" />
            Estudantes e Empresas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-2xl p-7 cursor-pointer transition-all duration-300 ${
                active === i
                  ? "bg-[#1A1A2E] shadow-xl"
                  : "bg-[#FAF8F5] hover:shadow-md"
              }`}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <i
                    key={s}
                    className={`ri-star-fill text-base ${active === i ? "text-[#E8501A]" : "text-[#E8501A]"}`}
                  ></i>
                ))}
              </div>
              {/* Quote */}
              <p
                className={`text-sm leading-relaxed mb-6 italic ${
                  active === i ? "text-white/90" : "text-gray-600"
                }`}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200/20">
                <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border-2 border-[#E8501A]/40">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <p className={`font-semibold text-sm ${active === i ? "text-white" : "text-[#1A1A2E]"}`}>
                    {t.name}
                  </p>
                  <p className={`text-xs ${active === i ? "text-white/50" : "text-gray-400"}`}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                active === i ? "w-6 h-2 bg-[#E8501A]" : "w-2 h-2 bg-gray-200 hover:bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
