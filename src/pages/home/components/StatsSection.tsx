import { stats } from "@/mocks/landing";

export default function StatsSection() {
  return (
    <section className="bg-[#1A1A2E] py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 rounded-2xl bg-[#E8501A]/15">
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
