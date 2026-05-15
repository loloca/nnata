export interface Projeto {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  date: string;
  featured: boolean;
}

export interface Candidatura {
  id: string;
  vagaTitle: string;
  company: string;
  companyLogo: string;
  area: string;
  province: string;
  type: "Presencial" | "Híbrido" | "Remoto";
  appliedDate: string;
  status: "Em análise" | "Aprovado" | "Entrevista" | "Recusado" | "Pendente";
  feedback?: string;
}

export interface EstudantePerfil {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  headline: string;
  bio: string;
  curso: string;
  universidade: string;
  anoAcademico: string;
  province: string;
  email: string;
  phone: string;
  linkedin: string;
  areasInteresse: string[];
  habilidades: string[];
  idiomas: { nome: string; nivel: string }[];
  completeness: number;
  stats: {
    candidaturas: number;
    visualizacoes: number;
    guardadas: number;
    entrevistas: number;
  };
}

export const perfilMock: EstudantePerfil = {
  id: "est-001",
  name: "Tomás Afonso Mbeki",
  avatar: "https://readdy.ai/api/search-image?query=young%20professional%20african%20male%20student%20confident%20smile%20business%20casual%20attire%20clean%20studio%20white%20background%20portrait%20headshot&width=120&height=120&seq=perfil1&orientation=squarish",
  coverImage: "https://readdy.ai/api/search-image?query=abstract%20modern%20geometric%20pattern%20gradient%20warm%20orange%20terracotta%20Angola%20Africa%20professional%20background%20banner%20wide&width=1200&height=280&seq=perfil-cover1&orientation=landscape",
  headline: "Estudante de Engenharia Informática · Apaixonado por IA e desenvolvimento de software",
  bio: "Estudante finalista de Engenharia Informática no ISCTEM com forte interesse em inteligência artificial, desenvolvimento web e mobile. Procuro um estágio que me permita aplicar os meus conhecimentos teóricos em projectos reais de impacto para Angola e África.",
  curso: "Engenharia Informática",
  universidade: "ISCTEM – Instituto Superior de Ciências e Tecnologia de Moçambique",
  anoAcademico: "4.º Ano",
  province: "Luanda",
  email: "tomas.mbeki@isctem.ac.mz",
  phone: "+244 923 456 789",
  linkedin: "linkedin.com/in/tomas-mbeki",
  areasInteresse: ["Tecnologia", "Inteligência Artificial", "Desenvolvimento Mobile"],
  habilidades: ["React", "TypeScript", "Python", "TensorFlow", "Node.js", "PostgreSQL", "Figma", "Git"],
  idiomas: [
    { nome: "Português", nivel: "Nativo" },
    { nome: "Inglês", nivel: "Avançado" },
    { nome: "Francês", nivel: "Intermédio" },
  ],
  completeness: 82,
  stats: {
    candidaturas: 7,
    visualizacoes: 143,
    guardadas: 12,
    entrevistas: 2,
  },
};

export const projetosMock: Projeto[] = [
  {
    id: "proj-1",
    title: "SaúdeApp Angola",
    description: "Aplicação mobile que conecta pacientes a médicos locais em Angola, com teleconsultas, marcação de consultas e histórico clínico digital. Desenvolvida em React Native com backend em Node.js.",
    image: "https://readdy.ai/api/search-image?query=mobile%20health%20app%20interface%20modern%20clean%20design%20medical%20telemedicine%20blue%20and%20white%20minimal%20ui%20screens&width=480&height=300&seq=proj1&orientation=landscape",
    tags: ["React Native", "Node.js", "MongoDB", "Saúde Digital"],
    link: "https://saude-app.demo.co.ao",
    github: "github.com/tmbeki/saude-app",
    date: "Março 2025",
    featured: true,
  },
  {
    id: "proj-2",
    title: "Predictor de Preços de Petróleo",
    description: "Modelo de Machine Learning treinado com dados históricos da OPEP para prever preços do petróleo bruto com 87% de precisão. Inclui dashboard interactivo em Python/Streamlit.",
    image: "https://readdy.ai/api/search-image?query=data%20science%20dashboard%20analytics%20charts%20graphs%20oil%20price%20prediction%20machine%20learning%20modern%20clean%20interface%20dark%20light&width=480&height=300&seq=proj2&orientation=landscape",
    tags: ["Python", "TensorFlow", "Streamlit", "Data Science"],
    github: "github.com/tmbeki/oil-predictor",
    date: "Janeiro 2025",
    featured: true,
  },
  {
    id: "proj-3",
    title: "Marketplace Comunitário",
    description: "Plataforma web de compra e venda entre comunidades locais, inspirada no Facebook Marketplace adaptado para o contexto angolano. Integra pagamento via Multicaixa Express.",
    image: "https://readdy.ai/api/search-image?query=ecommerce%20marketplace%20web%20platform%20clean%20modern%20design%20product%20listing%20cards%20warm%20orange%20brand%20angolan%20local%20market&width=480&height=300&seq=proj3&orientation=landscape",
    tags: ["React", "TypeScript", "PostgreSQL", "Stripe", "Multicaixa"],
    link: "https://mercado-local.ao",
    github: "github.com/tmbeki/mercado-local",
    date: "Outubro 2024",
    featured: false,
  },
  {
    id: "proj-4",
    title: "Sistema de Gestão Escolar",
    description: "Sistema web completo para gestão de escolas secundárias: matrículas, pauta de notas, horários e comunicação com encarregados. Projecto de fim de ano académico.",
    image: "https://readdy.ai/api/search-image?query=school%20management%20system%20dashboard%20admin%20panel%20education%20software%20clean%20modern%20interface%20light%20theme%20minimal&width=480&height=300&seq=proj4&orientation=landscape",
    tags: ["Vue.js", "Laravel", "MySQL", "Educação"],
    github: "github.com/tmbeki/gestao-escolar",
    date: "Junho 2024",
    featured: false,
  },
];

export const candidaturasMock: Candidatura[] = [
  {
    id: "cand-1",
    vagaTitle: "Estágio em Engenharia de Software",
    company: "Unitel",
    companyLogo: "https://readdy.ai/api/search-image?query=telecom%20company%20abstract%20icon%20modern%20green%20signal%20waves%20clean%20white%20background%20minimal%20flat&width=56&height=56&seq=vl1&orientation=squarish",
    area: "Tecnologia",
    province: "Luanda",
    type: "Híbrido",
    appliedDate: "10 Abr 2025",
    status: "Entrevista",
    feedback: "O seu perfil foi seleccionado para entrevista técnica. Aguarde contacto por email para agendamento.",
  },
  {
    id: "cand-2",
    vagaTitle: "Estágio em Desenvolvimento Mobile",
    company: "BAI",
    companyLogo: "https://readdy.ai/api/search-image?query=investment%20bank%20abstract%20icon%20modern%20building%20symbol%20clean%20white%20background%20minimal%20flat&width=56&height=56&seq=vl5&orientation=squarish",
    area: "Tecnologia",
    province: "Luanda",
    type: "Presencial",
    appliedDate: "8 Abr 2025",
    status: "Em análise",
  },
  {
    id: "cand-3",
    vagaTitle: "Estágio em Ciência de Dados",
    company: "Refriango",
    companyLogo: "https://readdy.ai/api/search-image?query=beverage%20food%20company%20abstract%20icon%20bottle%20drop%20symbol%20clean%20white%20background%20minimal%20flat&width=56&height=56&seq=vl11&orientation=squarish",
    area: "Tecnologia",
    province: "Luanda",
    type: "Híbrido",
    appliedDate: "5 Abr 2025",
    status: "Em análise",
  },
  {
    id: "cand-4",
    vagaTitle: "Estágio em Exploração e Produção",
    company: "Sonangol",
    companyLogo: "https://readdy.ai/api/search-image?query=oil%20energy%20company%20abstract%20icon%20orange%20flame%20drop%20symbol%20clean%20white%20background%20minimal%20flat&width=56&height=56&seq=vl2&orientation=squarish",
    area: "Engenharia",
    province: "Luanda",
    type: "Presencial",
    appliedDate: "1 Abr 2025",
    status: "Recusado",
    feedback: "Agradecemos o seu interesse. O perfil não correspondeu aos requisitos técnicos desta edição. Encorajamo-lo a candidatar-se a outras oportunidades.",
  },
  {
    id: "cand-5",
    vagaTitle: "Estágio em Análise Financeira",
    company: "BFA",
    companyLogo: "https://readdy.ai/api/search-image?query=bank%20financial%20institution%20abstract%20icon%20blue%20shield%20symbol%20clean%20white%20background%20minimal%20flat&width=56&height=56&seq=vl3&orientation=squarish",
    area: "Finanças",
    province: "Luanda",
    type: "Presencial",
    appliedDate: "20 Mar 2025",
    status: "Aprovado",
    feedback: "Parabéns! Foi seleccionado para o programa de estágios BFA 2025. Receberá em breve o contrato por email.",
  },
  {
    id: "cand-6",
    vagaTitle: "Estágio em Marketing Digital",
    company: "Multicaixa",
    companyLogo: "https://readdy.ai/api/search-image?query=fintech%20payment%20company%20abstract%20icon%20modern%20card%20symbol%20clean%20white%20background%20minimal%20flat&width=56&height=56&seq=vl4&orientation=squarish",
    area: "Marketing",
    province: "Luanda",
    type: "Híbrido",
    appliedDate: "15 Mar 2025",
    status: "Pendente",
  },
  {
    id: "cand-7",
    vagaTitle: "Estágio em Jornalismo e Comunicação",
    company: "TPA",
    companyLogo: "https://readdy.ai/api/search-image?query=tv%20media%20broadcast%20company%20abstract%20icon%20signal%20antenna%20symbol%20clean%20white%20background%20minimal%20flat&width=56&height=56&seq=vl6&orientation=squarish",
    area: "Comunicação",
    province: "Luanda",
    type: "Presencial",
    appliedDate: "10 Mar 2025",
    status: "Recusado",
    feedback: "O perfil candidato não é da área de Comunicação/Jornalismo, pelo que não avançámos com a candidatura.",
  },
];
