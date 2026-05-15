export interface EmpresaPerfil {
  id: string;
  name: string;
  logo: string;
  cover: string;
  sector: string;
  dimensao: string;
  province: string;
  website: string;
  email: string;
  phone: string;
  descricao: string;
  areaContratacao: string[];
  fundacao: string;
  colaboradores: string;
  stats: {
    vagasAtivas: number;
    totalCandidatos: number;
    entrevistas: number;
    aprovados: number;
    visualizacoesPerfil: number;
  };
}

export interface VagaEmpresa {
  id: string;
  title: string;
  area: string;
  province: string;
  duration: string;
  type: "Presencial" | "Híbrido" | "Remoto";
  status: "Activa" | "Encerrada" | "Rascunho";
  applicants: number;
  novos: number;
  publishedAt: string;
  expiresAt: string;
  views: number;
}

export interface Candidato {
  id: string;
  vagaId: string;
  name: string;
  avatar: string;
  curso: string;
  universidade: string;
  anoAcademico: string;
  province: string;
  areas: string[];
  habilidades: string[];
  linkedin?: string;
  appliedAt: string;
  status: "Novo" | "Em análise" | "Entrevista" | "Aprovado" | "Recusado";
  nota?: string;
  rating?: number;
}

export const empresaMock: EmpresaPerfil = {
  id: "emp-001",
  name: "Unitel",
  logo: "https://readdy.ai/api/search-image?query=telecom%20company%20abstract%20icon%20modern%20green%20signal%20waves%20clean%20white%20background%20minimal%20flat&width=100&height=100&seq=emp-logo1&orientation=squarish",
  cover: "https://readdy.ai/api/search-image?query=modern%20telecom%20office%20Angola%20professionals%20working%20technology%20infrastructure%20wide%20banner%20warm%20light&width=1200&height=280&seq=emp-cover1&orientation=landscape",
  sector: "Telecomunicações",
  dimensao: "Grande empresa (500+ colaboradores)",
  province: "Luanda",
  website: "https://www.unitel.ao",
  email: "estagios@unitel.ao",
  phone: "+244 222 600 000",
  descricao: "A Unitel é a maior operadora de telecomunicações de Angola, com mais de 10 milhões de clientes e presença em todas as províncias do país. Fundada em 2001, a empresa lidera o mercado em serviços de voz, dados e soluções digitais para particulares e empresas. O nosso programa de estágios é uma das principais portas de entrada para jovens talentos angolanos no mercado de tecnologia.",
  areaContratacao: ["Tecnologia", "Marketing", "Finanças", "Gestão", "Engenharia"],
  fundacao: "2001",
  colaboradores: "3.500+",
  stats: {
    vagasAtivas: 4,
    totalCandidatos: 187,
    entrevistas: 12,
    aprovados: 5,
    visualizacoesPerfil: 2341,
  },
};

export const vagasEmpresaMock: VagaEmpresa[] = [
  {
    id: "ve-1",
    title: "Estágio em Engenharia de Software",
    area: "Tecnologia",
    province: "Luanda",
    duration: "3 meses",
    type: "Híbrido",
    status: "Activa",
    applicants: 47,
    novos: 8,
    publishedAt: "12 Abr 2025",
    expiresAt: "12 Mai 2025",
    views: 312,
  },
  {
    id: "ve-2",
    title: "Estágio em Cibersegurança",
    area: "Tecnologia",
    province: "Luanda",
    duration: "6 meses",
    type: "Presencial",
    status: "Activa",
    applicants: 29,
    novos: 5,
    publishedAt: "8 Abr 2025",
    expiresAt: "8 Mai 2025",
    views: 201,
  },
  {
    id: "ve-3",
    title: "Estágio em Marketing Digital",
    area: "Marketing",
    province: "Luanda",
    duration: "3 meses",
    type: "Híbrido",
    status: "Activa",
    applicants: 63,
    novos: 11,
    publishedAt: "5 Abr 2025",
    expiresAt: "5 Mai 2025",
    views: 445,
  },
  {
    id: "ve-4",
    title: "Estágio em Análise de Dados",
    area: "Tecnologia",
    province: "Luanda",
    duration: "4 meses",
    type: "Remoto",
    status: "Activa",
    applicants: 48,
    novos: 3,
    publishedAt: "1 Abr 2025",
    expiresAt: "1 Mai 2025",
    views: 278,
  },
  {
    id: "ve-5",
    title: "Estágio em Recursos Humanos",
    area: "Gestão",
    province: "Luanda",
    duration: "3 meses",
    type: "Presencial",
    status: "Encerrada",
    applicants: 72,
    novos: 0,
    publishedAt: "1 Jan 2025",
    expiresAt: "1 Mar 2025",
    views: 534,
  },
  {
    id: "ve-6",
    title: "Estágio em Gestão de Produto",
    area: "Gestão",
    province: "Luanda",
    duration: "6 meses",
    type: "Híbrido",
    status: "Rascunho",
    applicants: 0,
    novos: 0,
    publishedAt: "—",
    expiresAt: "—",
    views: 0,
  },
];

export const candidatosMock: Candidato[] = [
  {
    id: "c-1",
    vagaId: "ve-1",
    name: "Tomás Afonso Mbeki",
    avatar: "https://readdy.ai/api/search-image?query=young%20professional%20african%20male%20student%20confident%20smile%20business%20casual%20attire%20clean%20studio%20white%20background%20portrait%20headshot&width=80&height=80&seq=cand1&orientation=squarish",
    curso: "Engenharia Informática",
    universidade: "ISCTEM",
    anoAcademico: "4.º Ano",
    province: "Luanda",
    areas: ["Tecnologia", "IA"],
    habilidades: ["React", "TypeScript", "Python", "Node.js"],
    linkedin: "linkedin.com/in/tomas-mbeki",
    appliedAt: "10 Abr 2025",
    status: "Entrevista",
    rating: 5,
    nota: "Excelente candidato, portfólio muito sólido. Agendar entrevista técnica.",
  },
  {
    id: "c-2",
    vagaId: "ve-1",
    name: "Ana Luísa Ferreira",
    avatar: "https://readdy.ai/api/search-image?query=young%20professional%20african%20female%20student%20confident%20smile%20business%20casual%20attire%20clean%20studio%20white%20background%20portrait%20headshot&width=80&height=80&seq=cand2&orientation=squarish",
    curso: "Ciência da Computação",
    universidade: "Universidade Agostinho Neto",
    anoAcademico: "3.º Ano",
    province: "Luanda",
    areas: ["Tecnologia", "Mobile"],
    habilidades: ["Flutter", "Dart", "Firebase", "Git"],
    appliedAt: "11 Abr 2025",
    status: "Em análise",
    rating: 4,
  },
  {
    id: "c-3",
    vagaId: "ve-1",
    name: "Carlos Eduardo Neto",
    avatar: "https://readdy.ai/api/search-image?query=young%20professional%20african%20male%20student%20smiling%20business%20casual%20clean%20studio%20white%20background%20portrait%20headshot&width=80&height=80&seq=cand3&orientation=squarish",
    curso: "Sistemas de Informação",
    universidade: "UCAN",
    anoAcademico: "4.º Ano",
    province: "Luanda",
    areas: ["Tecnologia"],
    habilidades: ["Java", "Spring Boot", "MySQL"],
    appliedAt: "9 Abr 2025",
    status: "Aprovado",
    rating: 5,
    nota: "Aprovado para estágio — iniciar em Maio.",
  },
  {
    id: "c-4",
    vagaId: "ve-1",
    name: "Filipa Marques Santos",
    avatar: "https://readdy.ai/api/search-image?query=young%20professional%20african%20female%20student%20neutral%20expression%20casual%20attire%20clean%20studio%20light%20background%20portrait%20headshot&width=80&height=80&seq=cand4&orientation=squarish",
    curso: "Engenharia Informática",
    universidade: "Universidade Católica de Angola",
    anoAcademico: "3.º Ano",
    province: "Luanda",
    areas: ["Tecnologia"],
    habilidades: ["Python", "Django", "PostgreSQL"],
    appliedAt: "8 Abr 2025",
    status: "Recusado",
    nota: "Perfil interessante mas sem experiência com React. Sugerido para vaga de backend.",
  },
  {
    id: "c-5",
    vagaId: "ve-1",
    name: "Joaquim Domingos Lopes",
    avatar: "https://readdy.ai/api/search-image?query=young%20african%20male%20student%20professional%20casual%20shirt%20confident%20clean%20white%20background%20portrait%20headshot%20minimal&width=80&height=80&seq=cand5&orientation=squarish",
    curso: "Engenharia de Telecomunicações",
    universidade: "ISCTEM",
    anoAcademico: "5.º Ano",
    province: "Luanda",
    areas: ["Tecnologia", "Engenharia"],
    habilidades: ["C++", "Embedded Systems", "MATLAB"],
    appliedAt: "7 Abr 2025",
    status: "Novo",
  },
  {
    id: "c-6",
    vagaId: "ve-3",
    name: "Maria Clara Oliveira",
    avatar: "https://readdy.ai/api/search-image?query=young%20african%20female%20marketing%20student%20professional%20bright%20smile%20casual%20attire%20clean%20white%20background%20portrait%20headshot&width=80&height=80&seq=cand6&orientation=squarish",
    curso: "Marketing e Publicidade",
    universidade: "UPRA",
    anoAcademico: "3.º Ano",
    province: "Luanda",
    areas: ["Marketing", "Comunicação"],
    habilidades: ["Canva", "Adobe Photoshop", "Meta Ads", "Google Analytics"],
    appliedAt: "12 Abr 2025",
    status: "Entrevista",
    rating: 4,
    nota: "Muito criativa. Portfólio visual impressionante.",
  },
  {
    id: "c-7",
    vagaId: "ve-3",
    name: "Bruno Teixeira Alves",
    avatar: "https://readdy.ai/api/search-image?query=young%20african%20male%20student%20professional%20casual%20business%20white%20background%20portrait%20headshot%20confident%20look&width=80&height=80&seq=cand7&orientation=squarish",
    curso: "Comunicação Social",
    universidade: "Universidade Agostinho Neto",
    anoAcademico: "4.º Ano",
    province: "Luanda",
    areas: ["Marketing", "Media"],
    habilidades: ["Copywriting", "SEO", "WordPress", "Instagram Ads"],
    appliedAt: "10 Abr 2025",
    status: "Novo",
  },
  {
    id: "c-8",
    vagaId: "ve-2",
    name: "Esperança Kabila Mendes",
    avatar: "https://readdy.ai/api/search-image?query=young%20african%20female%20student%20computer%20science%20professional%20confident%20smile%20clean%20white%20background%20portrait%20headshot%20minimal&width=80&height=80&seq=cand8&orientation=squarish",
    curso: "Segurança Informática",
    universidade: "ISCTEM",
    anoAcademico: "4.º Ano",
    province: "Luanda",
    areas: ["Tecnologia", "Segurança"],
    habilidades: ["Kali Linux", "Wireshark", "Python", "Networking"],
    appliedAt: "9 Abr 2025",
    status: "Em análise",
    rating: 4,
  },
];

export const actividadeRecente = [
  { type: "candidatura", msg: "Tomás Mbeki candidatou-se a Eng. de Software", time: "há 10 min", icon: "ri-user-add-line", color: "text-emerald-600", bg: "bg-emerald-50" },
  { type: "visualizacao", msg: "47 visualizações na vaga de Marketing Digital hoje", time: "há 1h", icon: "ri-eye-line", color: "text-amber-600", bg: "bg-amber-50" },
  { type: "candidatura", msg: "Maria Clara Oliveira candidatou-se a Marketing Digital", time: "há 2h", icon: "ri-user-add-line", color: "text-emerald-600", bg: "bg-emerald-50" },
  { type: "aprovado", msg: "Carlos Eduardo Neto foi aprovado para Eng. de Software", time: "há 3h", icon: "ri-check-double-line", color: "text-[#E8501A]", bg: "bg-orange-50" },
  { type: "candidatura", msg: "8 novas candidaturas esta semana em Cibersegurança", time: "há 5h", icon: "ri-briefcase-line", color: "text-violet-600", bg: "bg-violet-50" },
];
