import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";

const estudanteSteps = [
  {
    number: "01",
    icon: "ri-user-add-line",
    title: "Cria o teu Perfil",
    description: "Regista-te gratuitamente com o teu email académico. Preenche os teus dados, curso, ano académico e áreas de interesse. O teu perfil é o teu cartão de visita digital.",
    tip: "Perfis completos recebem 3x mais atenção das empresas.",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
    iconColor: "text-[#E8501A]",
  },
  {
    number: "02",
    icon: "ri-folder-add-line",
    title: "Adiciona o teu Portfólio",
    description: "Publica os teus projectos académicos e pessoais com descrição, tecnologias usadas e links. O portfólio diferencia-te de centenas de outros candidatos.",
    tip: "Candidatos com portfólio têm 2x mais entrevistas.",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    number: "03",
    icon: "ri-search-eye-line",
    title: "Explora e Filtra Vagas",
    description: "Usa o motor de busca avançado para encontrar estágios por área, duração, modalidade e província. Guarda as vagas que te interessam para candidatares mais tarde.",
    tip: "Usa os filtros combinados para encontrar a vaga ideal.",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    number: "04",
    icon: "ri-send-plane-line",
    title: "Candidata-te em 1 Clique",
    description: "Com o perfil completo, candidatas-te a qualquer vaga com um único clique. O teu perfil e portfólio são enviados automaticamente para a empresa.",
    tip: "Candidaturas com nota personalizada têm mais impacto.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    number: "05",
    icon: "ri-calendar-check-line",
    title: "Acompanha em Tempo Real",
    description: "Segue o estado de cada candidatura no teu painel pessoal: Em análise, Entrevista, Aprovado ou Recusado. Recebe notificações imediatas de cada actualização.",
    tip: "Activa as notificações para não perder nenhuma entrevista.",
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    number: "06",
    icon: "ri-trophy-line",
    title: "Inicia o teu Estágio",
    description: "Depois de aprovado, recebes todas as informações do estágio directamente na plataforma. O teu gestor de carreira da EsTagia Angola acompanha todo o processo.",
    tip: "Mantém o teu perfil actualizado durante o estágio.",
    color: "from-[#E8501A] to-[#C73E0C]",
    bg: "bg-orange-50",
    iconColor: "text-[#E8501A]",
  },
];

const empresaSteps = [
  {
    number: "01",
    icon: "ri-building-2-line",
    title: "Regista a tua Empresa",
    description: "Cria o perfil institucional da empresa com descrição, sector, dimensão e cultura organizacional. A verificação da empresa é feita em até 24 horas.",
    tip: "Empresas verificadas recebem o selo de confiança da plataforma.",
    color: "from-[#E8501A] to-[#C73E0C]",
    bg: "bg-orange-50",
    iconColor: "text-[#E8501A]",
  },
  {
    number: "02",
    icon: "ri-file-add-line",
    title: "Publica as tuas Vagas",
    description: "Cria anúncios de estágio detalhados com área, duração, modalidade, requisitos e benefícios. As vagas ficam visíveis imediatamente após publicação.",
    tip: "Vagas com benefícios detalhados atraem mais candidatos qualificados.",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    number: "03",
    icon: "ri-group-line",
    title: "Recebe Candidaturas",
    description: "Todas as candidaturas chegam organizadas no teu dashboard. Cada candidato traz perfil completo, portfólio de projectos e habilidades técnicas já listadas.",
    tip: "Filtra candidatos por habilidades para encontrar o perfil certo.",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    number: "04",
    icon: "ri-filter-3-line",
    title: "Avalia e Selecciona",
    description: "Usa o pipeline de recrutamento para mover candidatos entre estados: Novo, Em análise, Entrevista, Aprovado. Adiciona notas internas e avaliações a cada candidato.",
    tip: "O sistema de notas ajuda a equipa a alinhar as avaliações.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    number: "05",
    icon: "ri-chat-check-line",
    title: "Comunica com Candidatos",
    description: "Notifica candidatos sobre o estado da candidatura directamente pela plataforma. Agenda entrevistas e envia feedback de forma estruturada e profissional.",
    tip: "Feedback construtivo melhora a reputação da empresa junto dos estudantes.",
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    number: "06",
    icon: "ri-shake-hands-line",
    title: "Contrata o Melhor Talento",
    description: "Após a selecção final, o estagiário recebe toda a documentação e começa o processo de onboarding. A EsTagia Angola acompanha para garantir uma integração bem-sucedida.",
    tip: "Programas de estágio bem estruturados convertem em contratações.",
    color: "from-[#E8501A] to-[#C73E0C]",
    bg: "bg-orange-50",
    iconColor: "text-[#E8501A]",
  },
];

const faqs = [
  {
    q: "A plataforma é gratuita para estudantes?",
    a: "Sim, o registo e todas as funcionalidades para estudantes são completamente gratuitas. Podem criar perfil, adicionar portfólio e candidatar-se a vagas sem qualquer custo.",
  },
  {
    q: "Quem pode usar a EsTagia Angola?",
    a: "A plataforma é exclusivamente dedicada ao ecossistema do IPAS (Instituto Politécnico de Angola Sustentável). Estão elegíveis todos os estudantes matriculados nas instituições parceiras do IPAS.",
  },
  {
    q: "Quanto tempo leva a ser aprovado depois de me candidatar?",
    a: "O prazo varia consoante a empresa. Em média, as empresas parceiras respondem em 3 a 7 dias úteis. Receberás uma notificação assim que o estado da candidatura for actualizado.",
  },
  {
    q: "Posso candidatar-me a várias vagas ao mesmo tempo?",
    a: "Sim! Não existe limite no número de candidaturas simultâneas. Recomendamos que te candidates a vagas que realmente correspondam ao teu perfil para aumentar a taxa de sucesso.",
  },
  {
    q: "As empresas têm acesso ao meu portfólio completo?",
    a: "Sim. Quando te candidatas a uma vaga, a empresa tem acesso ao teu perfil completo, incluindo portfólio de projectos, habilidades, idiomas e informações académicas.",
  },
  {
    q: "Como as empresas ficam verificadas na plataforma?",
    a: "As empresas passam por um processo de verificação onde validamos a sua existência legal e idoneidade em Angola. O processo demora até 24 horas após o registo.",
  },
  {
    q: "O que acontece se a empresa não der feedback?",
    a: "Após 15 dias sem resposta, o sistema da EsTagia Angola envia automaticamente um lembrete à empresa. Os estudantes podem também solicitar feedback directamente pela plataforma.",
  },
  {
    q: "É possível fazer estágio em outra província?",
    a: "Sim. As vagas incluem informação sobre modalidade (Presencial, Híbrido ou Remoto) e localização. Podes filtrar vagas por província para encontrar oportunidades na tua área.",
  },
];

const stats = [
  { value: "1.200+", label: "Estudantes Registados", icon: "ri-graduation-cap-line" },
  { value: "85+", label: "Empresas Parceiras", icon: "ri-building-2-line" },
  { value: "340+", label: "Estágios Realizados", icon: "ri-briefcase-line" },
  { value: "92%", label: "Taxa de Satisfação", icon: "ri-star-line" },
];

export default function ComoFuncionaPage() {
  const [activeRole, setActiveRole] = useState<"estudante" | "empresa">("estudante");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const steps = activeRole === "estudante" ? estudanteSteps : empresaSteps;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20Angola%20university%20students%20working%20collaborating%20laptops%20technology%20bright%20office%20professional%20environment%20warm%20light%20photography%20editorial&width=1400&height=600&seq=cf-hero1&orientation=landscape"
            alt="Como funciona"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/92 via-[#1A1A2E]/80 to-[#1A1A2E]/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32">
          <div className="max-w-2xl w-full">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-4 bg-[#E8501A]/10 px-3 py-1.5 rounded-full">
              Guia Completo
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              Como Funciona<br />
              <span className="text-[#E8501A]">a EsTagia Angola</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
              Do registo ao primeiro dia de estágio — tudo explicado passo a passo. A plataforma mais simples para conectar talento angolano ao mercado de trabalho.
            </p>

            {/* Role switcher */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setActiveRole("estudante")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
                  activeRole === "estudante"
                    ? "bg-[#E8501A] text-white"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-graduation-cap-line"></i>
                </div>
                Sou Estudante
              </button>
              <button
                onClick={() => setActiveRole("empresa")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
                  activeRole === "empresa"
                    ? "bg-[#E8501A] text-white"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-building-2-line"></i>
                </div>
                Sou Empresa
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#1A1A2E] py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#E8501A]/15 rounded-xl flex-shrink-0">
                  <i className={`${s.icon} text-[#E8501A] text-lg`}></i>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/50">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Tab switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] block mb-2">
                Passo a passo
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E]">
                {activeRole === "estudante"
                  ? "O caminho do Estudante"
                  : "O caminho da Empresa"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {activeRole === "estudante"
                  ? "6 passos para conseguires o teu primeiro estágio profissional"
                  : "6 passos para encontrares os melhores talentos angolanos"}
              </p>
            </div>
            <div className="flex gap-2 bg-white border border-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveRole("estudante")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeRole === "estudante" ? "bg-[#E8501A] text-white" : "text-gray-500 hover:text-[#1A1A2E]"
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-graduation-cap-line"></i>
                </div>
                Estudante
              </button>
              <button
                onClick={() => setActiveRole("empresa")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeRole === "empresa" ? "bg-[#E8501A] text-white" : "text-gray-500 hover:text-[#1A1A2E]"
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-building-2-line"></i>
                </div>
                Empresa
              </button>
            </div>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-orange-200 transition-all group relative overflow-hidden"
              >
                {/* Step number background */}
                <div className="absolute top-4 right-5 text-6xl font-black text-gray-50 select-none pointer-events-none leading-none">
                  {step.number}
                </div>

                <div className="relative z-10">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-2xl ${step.bg} mb-5`}>
                    <i className={`${step.icon} ${step.iconColor} text-2xl`}></i>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      Passo {step.number}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#1A1A2E] text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{step.description}</p>

                  <div className={`flex items-start gap-2 p-3 rounded-xl ${step.bg}`}>
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className={`ri-lightbulb-line ${step.iconColor} text-xs`}></i>
                    </div>
                    <p className={`text-xs font-medium ${step.iconColor} leading-relaxed`}>{step.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">Comparação</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E] mb-3">
              EsTagia Angola vs. Método Tradicional
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              Veja como a nossa plataforma transforma a experiência de estágio em Angola
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Traditional */}
            <div className="rounded-2xl border border-gray-200 p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
                  <i className="ri-time-line text-gray-400 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1A2E]">Método Tradicional</h3>
                  <p className="text-xs text-gray-400">Burocrático e demorado</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Candidaturas por email ou presencialmente",
                  "Semanas à espera de resposta",
                  "Processo manual e desorganizado",
                  "CV em papel sem portfólio",
                  "Sem acompanhamento do processo",
                  "Contactos limitados por rede pessoal",
                  "Difícil comparar oportunidades",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-close-circle-line text-red-400 text-base"></i>
                    </div>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* EsTagia */}
            <div className="rounded-2xl border-2 border-[#E8501A]/30 bg-orange-50/30 p-7 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="text-xs font-bold bg-[#E8501A] text-white px-3 py-1.5 rounded-full">Recomendado</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-[#E8501A]/10 rounded-xl">
                  <i className="ri-rocket-line text-[#E8501A] text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1A2E]">EsTagia Angola</h3>
                  <p className="text-xs text-[#E8501A]">Moderno e eficiente</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Candidatura com 1 clique, qualquer hora",
                  "Resposta das empresas em 3–7 dias",
                  "Pipeline digital organizado e claro",
                  "Perfil com portfólio de projectos reais",
                  "Acompanhamento em tempo real",
                  "Acesso a 85+ empresas angolanas",
                  "Filtros avançados para a vaga ideal",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-double-line text-[#E8501A] text-base"></i>
                    </div>
                    <span className="text-sm text-[#374151] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">Histórias Reais</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E]">
              O que dizem os nossos utilizadores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: "Tomás Afonso Mbeki",
                role: "Estagiário na Unitel",
                avatar: "https://readdy.ai/api/search-image?query=young%20professional%20african%20male%20student%20confident%20smile%20business%20casual%20attire%20clean%20studio%20white%20background%20portrait%20headshot&width=64&height=64&seq=test-cf1&orientation=squarish",
                quote: "Em menos de 2 semanas após criar o meu perfil já tinha 3 entrevistas agendadas. A plataforma é completamente diferente de tudo o que existia em Angola.",
                stars: 5,
              },
              {
                name: "Dra. Filomena Banza",
                role: "Gestora de RH · Sonangol",
                avatar: "https://readdy.ai/api/search-image?query=professional%20african%20female%20manager%20HR%20executive%20business%20attire%20confident%20smile%20clean%20studio%20white%20background%20portrait%20headshot&width=64&height=64&seq=test-cf2&orientation=squarish",
                quote: "Antes demorava 3 meses para seleccionar estagiários. Agora fazemos o mesmo processo em 2 semanas com candidatos muito mais qualificados e com portfólio visível.",
                stars: 5,
              },
              {
                name: "Ana Luísa Ferreira",
                role: "Estagiária no BAI",
                avatar: "https://readdy.ai/api/search-image?query=young%20professional%20african%20female%20student%20confident%20smile%20business%20casual%20attire%20clean%20studio%20white%20background%20portrait%20headshot&width=64&height=64&seq=test-cf3&orientation=squarish",
                quote: "O sistema de candidatura é incrivelmente simples. Candidatei-me a 5 vagas num único dia e acompanhei tudo pelo meu painel. Consegui o meu estágio de sonho!",
                stars: 5,
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <div key={j} className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-star-fill text-amber-400 text-sm"></i>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#374151] leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A2E]">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-3 block">FAQ</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E] mb-3">
              Perguntas Frequentes
            </h2>
            <p className="text-sm text-gray-500">Tudo o que precisas saber antes de começar</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  openFaq === i ? "border-[#E8501A]/30 bg-orange-50/20" : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left cursor-pointer"
                >
                  <span className={`text-sm font-semibold leading-snug ${openFaq === i ? "text-[#E8501A]" : "text-[#1A1A2E]"}`}>
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 transition-all ${
                    openFaq === i ? "bg-[#E8501A] text-white rotate-45" : "bg-gray-100 text-gray-500"
                  }`}>
                    <i className="ri-add-line text-sm"></i>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <img
            src="https://readdy.ai/api/search-image?query=Angola%20Luanda%20modern%20city%20skyline%20sunset%20warm%20orange%20golden%20light%20professional%20inspiring%20aerial%20view%20wide&width=1400&height=500&seq=cf-cta1&orientation=landscape"
            alt="CTA"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E]/95 via-[#1A1A2E]/90 to-[#E8501A]/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E8501A] mb-4 block">
            Pronto para começar?
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
            Junta-te à maior plataforma<br />de estágios de Angola
          </h2>
          <p className="text-base text-white/70 mb-10 max-w-xl mx-auto">
            Mais de 1.200 estudantes e 85 empresas já fazem parte da EsTagia Angola. Regista-te gratuitamente hoje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cadastro"
              className="flex items-center justify-center gap-2 bg-[#E8501A] text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-[#C73E0C] transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-graduation-cap-line"></i>
              </div>
              Registar como Estudante — Grátis
            </Link>
            <Link
              to="/cadastro"
              className="flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-building-2-line"></i>
              </div>
              Registar Empresa
            </Link>
          </div>
          <p className="text-xs text-white/40 mt-5">Apenas para estudantes do ecossistema IPAS</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
