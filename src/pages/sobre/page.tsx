import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";

const milestones = [
  {
    year: "2022",
    title: "A Ideia Nasce",
    description: "Um grupo de estudantes do IPAS identificou a falta de uma plataforma digital dedicada aos estágios em Angola. O processo era manual, burocrático e desigual.",
    icon: "ri-lightbulb-line",
  },
  {
    year: "2023",
    title: "Primeiros Passos",
    description: "Com apoio institucional do IPAS, iniciou-se o desenvolvimento do protótipo e as primeiras conversas com empresas angolanas interessadas em participar.",
    icon: "ri-rocket-line",
  },
  {
    year: "2024",
    title: "Lançamento Beta",
    description: "A plataforma entrou em fase beta com 12 empresas parceiras e 200 estudantes. A taxa de colocação em estágio no primeiro trimestre superou os 70%.",
    icon: "ri-flag-line",
  },
  {
    year: "2025",
    title: "Crescimento e Impacto",
    description: "Com 85+ empresas e 1.200+ estudantes, a EsTagia Angola tornou-se a principal ponte entre o talento académico e o mercado de trabalho angolano.",
    icon: "ri-trophy-line",
  },
];

const values = [
  {
    icon: "ri-focus-3-line",
    title: "Foco no Talento Local",
    description: "Acreditamos que Angola tem talentos excepcionais que precisam apenas de oportunidades. A nossa missão é criar essa ponte de forma justa e transparente.",
    color: "text-[#E8501A]",
    bg: "bg-orange-50",
  },
  {
    icon: "ri-scales-3-line",
    title: "Meritocracia",
    description: "Na EsTagia Angola, as candidaturas são avaliadas pelo mérito real: portfólio, competências e potencial — não por quem se conhece.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: "ri-open-source-line",
    title: "Transparência Total",
    description: "Estudantes acompanham cada etapa em tempo real. Empresas recebem perfis completos e honestos. Sem processos opacos ou comunicação unilateral.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: "ri-community-line",
    title: "Impacto Comunitário",
    description: "Cada estágio bem-sucedido contribui para o desenvolvimento económico de Angola. Formamos profissionais que ficam no país e constroem o futuro.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: "ri-smartphone-line",
    title: "Digital First",
    description: "Eliminamos a burocracia em papel que ainda domina o processo de estágios em Angola. A tecnologia ao serviço da desburocratização.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: "ri-shield-check-line",
    title: "Confiança & Segurança",
    description: "Todas as empresas são verificadas. Todos os estudantes são autenticados pelo IPAS. Um ecossistema de confiança mútua.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const team = [
  {
    name: "Dr. Manuel Xavier Binge",
    role: "Fundador & Director Executivo",
    bio: "Doutor em Gestão de Recursos Humanos pela Universidade de Lisboa. Mais de 15 anos de experiência no mercado de trabalho angolano.",
    avatar: "https://readdy.ai/api/search-image?query=senior%20professional%20african%20male%20executive%20director%20confident%20authoritative%20business%20suit%20clean%20studio%20white%20background%20portrait%20headshot%20Angola&width=200&height=200&seq=team1&orientation=squarish",
    linkedin: "linkedin.com/in/mxbinge",
    areas: ["Liderança", "RH", "Estratégia"],
  },
  {
    name: "Eng.ª Sofia Cardoso Neto",
    role: "Directora de Tecnologia (CTO)",
    bio: "Engenheira de Software formada no ISCTEM. Ex-engenheira sénior na Unitel. Apaixonada por tecnologia ao serviço da educação.",
    avatar: "https://readdy.ai/api/search-image?query=young%20professional%20african%20female%20engineer%20technology%20executive%20confident%20business%20casual%20smile%20clean%20studio%20white%20background%20portrait%20headshot&width=200&height=200&seq=team2&orientation=squarish",
    linkedin: "linkedin.com/in/sofiancn",
    areas: ["Tecnologia", "Produto", "UX"],
  },
  {
    name: "Dr. Carlos Filipe Mendes",
    role: "Director de Parcerias Empresariais",
    bio: "MBA pela UCAN. Especialista em desenvolvimento de negócios e relações institucionais no sector privado angolano.",
    avatar: "https://readdy.ai/api/search-image?query=professional%20african%20male%20business%20development%20director%20partnership%20executive%20smiling%20confident%20business%20suit%20clean%20studio%20white%20background%20portrait%20headshot&width=200&height=200&seq=team3&orientation=squarish",
    linkedin: "linkedin.com/in/cfmendes",
    areas: ["Parcerias", "Negócios", "Vendas"],
  },
  {
    name: "Dra. Esperança Lima Teixeira",
    role: "Directora Académica",
    bio: "Professora universitária e investigadora na área de Empregabilidade. Responsável pela ligação entre o IPAS e a plataforma.",
    avatar: "https://readdy.ai/api/search-image?query=professional%20african%20female%20university%20professor%20academic%20director%20confident%20warm%20smile%20formal%20attire%20clean%20studio%20white%20background%20portrait%20headshot&width=200&height=200&seq=team4&orientation=squarish",
    linkedin: "linkedin.com/in/esperancalt",
    areas: ["Académico", "IPAS", "Investigação"],
  },
  {
    name: "Bruno Afonso Kiala",
    role: "Responsável de Marketing & Comunicação",
    bio: "Licenciado em Comunicação Empresarial pela UAN. Especialista em marketing digital e branding para o mercado angolano.",
    avatar: "https://readdy.ai/api/search-image?query=young%20professional%20african%20male%20marketing%20communications%20creative%20director%20casual%20confident%20smile%20clean%20studio%20white%20background%20portrait%20headshot&width=200&height=200&seq=team5&orientation=squarish",
    linkedin: "linkedin.com/in/bafonsok",
    areas: ["Marketing", "Branding", "Digital"],
  },
  {
    name: "Ana Cristina Domingos",
    role: "Gestora de Sucesso do Estudante",
    bio: "Psicóloga organizacional formada na Universidade Agostinho Neto. Apoia os estudantes em todo o processo de candidatura e integração.",
    avatar: "https://readdy.ai/api/search-image?query=young%20professional%20african%20female%20psychologist%20counselor%20warm%20smile%20approachable%20casual%20business%20attire%20clean%20studio%20white%20background%20portrait%20headshot&width=200&height=200&seq=team6&orientation=squarish",
    linkedin: "linkedin.com/in/acdstar",
    areas: ["Psicologia", "Carreira", "Suporte"],
  },
];

const partners = [
  { name: "IPAS", role: "Parceiro Fundador", logo: "https://readdy.ai/api/search-image?query=angola%20polytechnic%20institute%20education%20abstract%20icon%20minimal%20clean%20white%20background%20academic%20seal&width=72&height=72&seq=part1&orientation=squarish" },
  { name: "Sonangol", role: "Empresa Parceira", logo: "https://readdy.ai/api/search-image?query=oil%20energy%20company%20abstract%20icon%20orange%20flame%20drop%20symbol%20clean%20white%20background%20minimal%20flat&width=72&height=72&seq=part2&orientation=squarish" },
  { name: "Unitel", role: "Empresa Parceira", logo: "https://readdy.ai/api/search-image?query=telecom%20company%20abstract%20icon%20modern%20green%20signal%20waves%20clean%20white%20background%20minimal%20flat&width=72&height=72&seq=part3&orientation=squarish" },
  { name: "BAI", role: "Empresa Parceira", logo: "https://readdy.ai/api/search-image?query=investment%20bank%20abstract%20icon%20modern%20building%20symbol%20clean%20white%20background%20minimal%20flat&width=72&height=72&seq=part4&orientation=squarish" },
  { name: "BFA", role: "Empresa Parceira", logo: "https://readdy.ai/api/search-image?query=bank%20financial%20institution%20abstract%20icon%20blue%20shield%20symbol%20clean%20white%20background%20minimal%20flat&width=72&height=72&seq=part5&orientation=squarish" },
  { name: "Multicaixa", role: "Empresa Parceira", logo: "https://readdy.ai/api/search-image?query=fintech%20payment%20company%20abstract%20icon%20modern%20card%20symbol%20clean%20white%20background%20minimal%20flat&width=72&height=72&seq=part6&orientation=squarish" },
];

const stats = [
  { value: "2022", label: "Ano de Fundação", icon: "ri-calendar-line" },
  { value: "1.200+", label: "Estudantes Registados", icon: "ri-graduation-cap-line" },
  { value: "85+", label: "Empresas Parceiras", icon: "ri-building-2-line" },
  { value: "18", label: "Províncias Cobertas", icon: "ri-map-pin-line" },
];

export default function SobrePage() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
    try {
      const res = await fetch("https://readdy.ai/api/form/d7eu8mfimhg6tri2uvk0", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });
      if (res.ok) {
        setFormStatus("sent");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <img
            src="https://readdy.ai/api/search-image?query=Angola%20Luanda%20modern%20cityscape%20skyline%20aerial%20view%20sunset%20golden%20hour%20professional%20inspiring%20wide%20panoramic%20vibrant%20warm%20colors&width=1400&height=620&seq=sobre-hero1&orientation=landscape"
            alt="Sobre a EsTagia Angola"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/95 via-[#1A1A2E]/80 to-[#1A1A2E]/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-28 md:py-36 w-full">
          <div className="max-w-2xl w-full">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-5 bg-[#E8501A]/10 px-3 py-1.5 rounded-full">
              Sobre Nós
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              Construindo o<br />
              <span className="text-[#E8501A]">Futuro Profissional</span><br />
              de Angola
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
              A EsTagia Angola nasceu da convicção de que o talento existe em todo o país — e que a tecnologia pode eliminar as barreiras que impedem esse talento de chegar às melhores empresas.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/vagas" className="flex items-center gap-2 bg-[#E8501A] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap">
                <div className="w-5 h-5 flex items-center justify-center"><i className="ri-briefcase-line"></i></div>
                Ver Vagas
              </Link>
              <a href="#contacto" className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap">
                <div className="w-5 h-5 flex items-center justify-center"><i className="ri-mail-line"></i></div>
                Falar Connosco
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#1A1A2E] py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <div className="w-11 h-11 flex items-center justify-center bg-[#E8501A]/15 rounded-xl flex-shrink-0">
                  <i className={`${s.icon} text-[#E8501A] text-lg`}></i>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">{s.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSÃO & VISÃO ── */}
      <section className="py-24 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-[420px]">
                <img
                  src="https://readdy.ai/api/search-image?query=diverse%20young%20African%20students%20studying%20collaborating%20university%20campus%20modern%20bright%20Angola%20professional%20inspiring%20candid%20editorial%20photography%20warm%20tones&width=640&height=420&seq=sobre-mis1&orientation=landscape"
                  alt="Missão EsTagia Angola"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-5 -right-4 md:-right-8 bg-white rounded-2xl border border-gray-100 p-5 w-52">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-emerald-50 rounded-xl">
                    <i className="ri-arrow-up-line text-emerald-600"></i>
                  </div>
                  <span className="text-xs font-semibold text-gray-400">Crescimento 2025</span>
                </div>
                <p className="text-2xl font-extrabold text-[#1A1A2E]">+340%</p>
                <p className="text-xs text-gray-500 mt-0.5">em candidaturas vs. 2024</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-4 block">Nossa Razão de Ser</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] leading-tight mb-6">
                Missão, Visão<br />e Propósito
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: "ri-focus-3-line",
                    title: "Missão",
                    text: "Conectar estudantes angolanos a oportunidades de estágio reais, eliminando a burocracia e criando pontes directas entre o talento académico e o mercado de trabalho.",
                    color: "text-[#E8501A]",
                    bg: "bg-orange-50",
                  },
                  {
                    icon: "ri-eye-line",
                    title: "Visão",
                    text: "Ser a principal plataforma de empregabilidade jovem em Angola até 2027, com presença em todas as 18 províncias e parcerias com as 100 maiores empresas do país.",
                    color: "text-violet-600",
                    bg: "bg-violet-50",
                  },
                  {
                    icon: "ri-heart-pulse-line",
                    title: "Propósito",
                    text: "Acreditamos que dar ao jovem angolano a sua primeira experiência profissional de qualidade é o investimento mais impactante que se pode fazer no futuro do país.",
                    color: "text-emerald-600",
                    bg: "bg-emerald-50",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className={`w-11 h-11 flex items-center justify-center rounded-2xl flex-shrink-0 ${item.bg}`}>
                      <i className={`${item.icon} ${item.color} text-xl`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1A2E] mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HISTÓRIA / TIMELINE ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">Nossa Jornada</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] mb-3">A História da EsTagia Angola</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">Da ideia ao impacto — como construímos a plataforma que está a mudar os estágios em Angola</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E8501A]/30 via-[#E8501A]/60 to-[#E8501A]/20 -translate-x-1/2"></div>

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                  {/* Content */}
                  <div className="flex-1 md:max-w-[45%]">
                    <div className={`bg-white rounded-2xl border border-gray-100 p-6 hover:border-orange-200 transition-all ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                      <span className="text-xs font-bold text-[#E8501A] bg-orange-50 px-3 py-1.5 rounded-full inline-block mb-3">{m.year}</span>
                      <h3 className="font-bold text-[#1A1A2E] text-lg mb-2">{m.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{m.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-14 h-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E8501A] to-[#C73E0C] z-10">
                    <i className={`${m.icon} text-white text-xl`}></i>
                  </div>

                  {/* Empty spacer */}
                  <div className="flex-1 md:max-w-[45%] hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">O Que Nos Define</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] mb-3">Os Nossos Valores</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">Princípios que guiam cada decisão que tomamos na EsTagia Angola</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-orange-200 transition-all group">
                <div className={`w-12 h-12 flex items-center justify-center rounded-2xl ${v.bg} mb-5 group-hover:scale-110 transition-transform`}>
                  <i className={`${v.icon} ${v.color} text-2xl`}></i>
                </div>
                <h3 className="font-bold text-[#1A1A2E] mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">As Pessoas</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] mb-3">A Nossa Equipa</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">Profissionais angolanos apaixonados por criar oportunidades para a próxima geração</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-orange-200 transition-all group">
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#F8F7F4] to-orange-50">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#1A1A2E] text-sm">{member.name}</h3>
                  <p className="text-xs text-[#E8501A] font-medium mt-0.5">{member.role}</p>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {member.areas.map((area) => (
                      <span key={area} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg font-medium">{area}</span>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-50">
                    <a
                      href={`https://${member.linkedin}`}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#0A66C2] transition-colors cursor-pointer"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-linkedin-box-line text-sm"></i>
                      </div>
                      {member.linkedin}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">Parceiros</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E] mb-3">Quem Acredita em Nós</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">Instituições e empresas que tornaram a EsTagia Angola possível</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center gap-3 hover:border-orange-200 transition-all">
                <div className="w-14 h-14 rounded-xl overflow-hidden">
                  <img src={p.logo} alt={p.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-[#1A1A2E]">{p.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contacto" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Left */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-4 block">Falar Connosco</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] mb-5">Entra em<br />Contacto</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                Tens dúvidas, sugestões ou queres fazer uma parceria com a EsTagia Angola? Fala connosco — respondemos em menos de 48 horas.
              </p>

              <div className="space-y-5">
                {[
                  { icon: "ri-map-pin-line", label: "Morada", value: "Rua da Missão, nº 123, Luanda, Angola" },
                  { icon: "ri-mail-send-line", label: "Email Geral", value: "info@estágiaangola.ao" },
                  { icon: "ri-phone-line", label: "Telefone", value: "+244 947 807 090" },
                  { icon: "ri-time-line", label: "Horário", value: "Segunda a Sexta, 8h – 17h (WAT)" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-11 h-11 flex items-center justify-center bg-orange-50 rounded-xl flex-shrink-0">
                      <i className={`${c.icon} text-[#E8501A] text-lg`}></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{c.label}</p>
                      <p className="text-sm text-[#1A1A2E] font-medium mt-0.5">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-8">
                {[
                  { icon: "ri-instagram-line", href: "#" },
                  { icon: "ri-linkedin-box-line", href: "#" },
                  { icon: "ri-twitter-x-line", href: "#" },
                  { icon: "ri-facebook-box-line", href: "#" },
                ].map((s) => (
                  <a
                    key={s.icon}
                    href={s.href}
                    rel="nofollow noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-[#E8501A] text-gray-500 hover:text-white rounded-xl transition-all cursor-pointer"
                  >
                    <i className={`${s.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-[#F8F7F4] rounded-2xl p-8">
              {formStatus === "sent" ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-4">
                    <i className="ri-check-double-line text-emerald-500 text-2xl"></i>
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-lg">Mensagem enviada!</h3>
                  <p className="text-sm text-gray-500 mt-2">Respondemos em até 48 horas úteis.</p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="mt-6 px-6 py-2.5 bg-[#E8501A] text-white rounded-xl text-sm font-medium hover:bg-[#C73E0C] transition-colors cursor-pointer"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form data-readdy-form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-bold text-[#1A1A2E] text-lg mb-5">Envia-nos uma mensagem</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Nome *</label>
                      <input name="nome" required type="text" placeholder="O teu nome completo" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Email *</label>
                      <input name="email" required type="email" placeholder="email@exemplo.ao" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Assunto *</label>
                    <select name="assunto" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] appearance-none transition-colors">
                      <option value="">Selecciona um assunto</option>
                      <option value="parceria">Proposta de Parceria Empresarial</option>
                      <option value="suporte-estudante">Suporte para Estudante</option>
                      <option value="suporte-empresa">Suporte para Empresa</option>
                      <option value="imprensa">Imprensa & Media</option>
                      <option value="outro">Outro assunto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Mensagem *</label>
                    <textarea
                      name="mensagem"
                      required
                      rows={4}
                      maxLength={500}
                      placeholder="Descreve o teu assunto em detalhe..."
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#E8501A] transition-colors resize-none"
                    ></textarea>
                    <p className="text-xs text-gray-400 mt-1 text-right">Máx. 500 caracteres</p>
                  </div>
                  {formStatus === "error" && (
                    <p className="text-sm text-red-500 font-medium">Ocorreu um erro. Tenta novamente.</p>
                  )}
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full py-3.5 bg-[#E8501A] text-white rounded-xl font-semibold text-sm hover:bg-[#C73E0C] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formStatus === "sending" ? (
                      <>
                        <div className="w-4 h-4 flex items-center justify-center"><i className="ri-loader-4-line animate-spin"></i></div>
                        A enviar...
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 flex items-center justify-center"><i className="ri-send-plane-line"></i></div>
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 bg-[#1A1A2E]">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <div className="w-16 h-16 flex items-center justify-center bg-[#E8501A]/15 rounded-2xl mx-auto mb-6">
            <i className="ri-briefcase-4-fill text-[#E8501A] text-3xl"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Faz parte da nossa história
          </h2>
          <p className="text-base text-white/60 mb-10 max-w-lg mx-auto leading-relaxed">
            Seja como estudante à procura do primeiro estágio, ou como empresa à procura de talento angolano — tens lugar na EsTagia Angola.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cadastro"
              className="flex items-center justify-center gap-2 bg-[#E8501A] text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="w-5 h-5 flex items-center justify-center"><i className="ri-graduation-cap-line"></i></div>
              Criar Conta Grátis
            </Link>
            <Link
              to="/como-funciona"
              className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="w-5 h-5 flex items-center justify-center"><i className="ri-information-line"></i></div>
              Como Funciona
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
