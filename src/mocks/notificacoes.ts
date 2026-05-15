export type NotifCategoria =
  | "candidatura"
  | "vaga"
  | "perfil"
  | "entrevista"
  | "sistema"
  | "empresa";

export type NotifRole = "estudante" | "empresa";

export interface Notificacao {
  id: string;
  titulo: string;
  descricao: string;
  categoria: NotifCategoria;
  role: NotifRole;
  lida: boolean;
  tempo: string;
  tempoMs: number;
  link?: string;
  avatar?: string;
  acoes?: { label: string; href: string; primary?: boolean }[];
}

export const notificacoesMock: Notificacao[] = [
  // ── ESTUDANTE ──
  {
    id: "n-1",
    titulo: "Entrevista Agendada — Unitel",
    descricao: "O seu perfil foi seleccionado para entrevista técnica na Unitel. Aguarde o contacto por email para agendamento nos próximos 2 dias úteis.",
    categoria: "entrevista",
    role: "estudante",
    lida: false,
    tempo: "há 10 min",
    tempoMs: 600000,
    link: "/perfil",
    avatar: "https://readdy.ai/api/search-image?query=telecom%20company%20abstract%20icon%20modern%20green%20signal%20waves%20clean%20white%20background%20minimal%20flat&width=56&height=56&seq=notif1&orientation=squarish",
    acoes: [
      { label: "Ver candidatura", href: "/perfil", primary: true },
    ],
  },
  {
    id: "n-2",
    titulo: "Candidatura Em Análise — BAI",
    descricao: "A sua candidatura para \"Estágio em Desenvolvimento Mobile\" está a ser analisada pela equipa de RH do BAI.",
    categoria: "candidatura",
    role: "estudante",
    lida: false,
    tempo: "há 2h",
    tempoMs: 7200000,
    link: "/perfil",
    avatar: "https://readdy.ai/api/search-image?query=investment%20bank%20abstract%20icon%20modern%20building%20symbol%20clean%20white%20background%20minimal%20flat&width=56&height=56&seq=notif2&orientation=squarish",
  },
  {
    id: "n-3",
    titulo: "A Sonangol visualizou o seu perfil",
    descricao: "Um recrutador da Sonangol visitou o seu perfil e portfólio. Aproveita para candidatares às vagas abertas desta empresa!",
    categoria: "perfil",
    role: "estudante",
    lida: false,
    tempo: "há 3h",
    tempoMs: 10800000,
    link: "/vagas",
    avatar: "https://readdy.ai/api/search-image?query=oil%20energy%20company%20abstract%20icon%20orange%20flame%20drop%20symbol%20clean%20white%20background%20minimal%20flat&width=56&height=56&seq=notif3&orientation=squarish",
    acoes: [
      { label: "Ver vagas da Sonangol", href: "/vagas", primary: true },
    ],
  },
  {
    id: "n-4",
    titulo: "Nova vaga na tua área — Tecnologia",
    descricao: "A Refriango publicou um novo estágio em Ciência de Dados que corresponde às tuas áreas de interesse. Candidata-te enquanto há vagas!",
    categoria: "vaga",
    role: "estudante",
    lida: false,
    tempo: "há 5h",
    tempoMs: 18000000,
    link: "/vagas?area=Tecnologia",
    avatar: "https://readdy.ai/api/search-image?query=beverage%20food%20company%20abstract%20icon%20bottle%20drop%20symbol%20clean%20white%20background%20minimal%20flat&width=56&height=56&seq=notif4&orientation=squarish",
    acoes: [
      { label: "Ver vaga", href: "/vagas", primary: true },
    ],
  },
  {
    id: "n-5",
    titulo: "Candidatura Aprovada — BFA",
    descricao: "Parabéns! Foste seleccionado para o Estágio em Análise Financeira do BFA 2025. Receberás o contrato por email em breve.",
    categoria: "candidatura",
    role: "estudante",
    lida: true,
    tempo: "ontem, 14:32",
    tempoMs: 86400000,
    link: "/perfil",
    avatar: "https://readdy.ai/api/search-image?query=bank%20financial%20institution%20abstract%20icon%20blue%20shield%20symbol%20clean%20white%20background%20minimal%20flat&width=56&height=56&seq=notif5&orientation=squarish",
    acoes: [
      { label: "Ver detalhes", href: "/perfil", primary: true },
    ],
  },
  {
    id: "n-6",
    titulo: "Perfil com 82% de completude",
    descricao: "O teu perfil está quase completo! Adiciona mais um projecto ao portfólio para chegares a 100% e aumentares a visibilidade junto das empresas.",
    categoria: "sistema",
    role: "estudante",
    lida: true,
    tempo: "ontem, 10:00",
    tempoMs: 90000000,
    link: "/perfil",
    acoes: [
      { label: "Completar perfil", href: "/perfil", primary: true },
    ],
  },
  {
    id: "n-7",
    titulo: "Candidatura Recusada — Sonangol",
    descricao: "A tua candidatura para \"Estágio em Exploração e Produção\" não avançou para a próxima fase. Não desistas — há 12 vagas em aberto na tua área!",
    categoria: "candidatura",
    role: "estudante",
    lida: true,
    tempo: "há 3 dias",
    tempoMs: 259200000,
    link: "/vagas",
    avatar: "https://readdy.ai/api/search-image?query=oil%20energy%20company%20abstract%20icon%20orange%20flame%20drop%20symbol%20clean%20white%20background%20minimal%20flat&width=56&height=56&seq=notif7&orientation=squarish",
    acoes: [
      { label: "Explorar outras vagas", href: "/vagas", primary: true },
    ],
  },
  {
    id: "n-8",
    titulo: "3 novas vagas em Luanda esta semana",
    descricao: "Foram publicadas 3 novas oportunidades de estágio em Luanda que correspondem ao teu perfil: Tecnologia (2) e Finanças (1).",
    categoria: "vaga",
    role: "estudante",
    lida: true,
    tempo: "há 4 dias",
    tempoMs: 345600000,
    link: "/vagas",
    acoes: [
      { label: "Ver vagas", href: "/vagas", primary: true },
    ],
  },
  {
    id: "n-9",
    titulo: "Bem-vindo à EsTagia Angola!",
    descricao: "A tua conta foi criada com sucesso. Completa o teu perfil e candidata-te às melhores vagas de estágio em Angola.",
    categoria: "sistema",
    role: "estudante",
    lida: true,
    tempo: "há 1 semana",
    tempoMs: 604800000,
    link: "/perfil",
    acoes: [
      { label: "Completar perfil", href: "/perfil", primary: true },
      { label: "Explorar vagas", href: "/vagas" },
    ],
  },

  // ── EMPRESA ──
  {
    id: "e-1",
    titulo: "8 novas candidaturas — Eng. Software",
    descricao: "A vaga \"Estágio em Engenharia de Software\" recebeu 8 novas candidaturas esta semana. Analisa os perfis no painel de candidatos.",
    categoria: "candidatura",
    role: "empresa",
    lida: false,
    tempo: "há 30 min",
    tempoMs: 1800000,
    link: "/dashboard",
    acoes: [
      { label: "Ver candidatos", href: "/dashboard", primary: true },
    ],
  },
  {
    id: "e-2",
    titulo: "Vaga expira em 5 dias — Marketing Digital",
    descricao: "A vaga \"Estágio em Marketing Digital\" expira a 5 de Maio de 2025. Renova o anúncio para continuar a receber candidaturas.",
    categoria: "vaga",
    role: "empresa",
    lida: false,
    tempo: "há 1h",
    tempoMs: 3600000,
    link: "/dashboard",
    acoes: [
      { label: "Renovar vaga", href: "/dashboard", primary: true },
    ],
  },
  {
    id: "e-3",
    titulo: "Perfil da empresa visualizado 2.341 vezes",
    descricao: "O vosso perfil público recebeu 2.341 visualizações este mês — um aumento de 180% face ao mês anterior.",
    categoria: "perfil",
    role: "empresa",
    lida: false,
    tempo: "hoje, 09:00",
    tempoMs: 32400000,
    link: "/dashboard",
  },
  {
    id: "e-4",
    titulo: "Candidato Aprovado por Confirmar",
    descricao: "Carlos Eduardo Neto foi marcado como Aprovado para \"Eng. de Software\". Não esqueças de enviar o contrato e informação de onboarding.",
    categoria: "entrevista",
    role: "empresa",
    lida: true,
    tempo: "ontem, 16:45",
    tempoMs: 86400000,
    link: "/dashboard",
    acoes: [
      { label: "Ver candidato", href: "/dashboard", primary: true },
    ],
  },
  {
    id: "e-5",
    titulo: "Nova funcionalidade: Notas internas",
    descricao: "Agora podes adicionar notas privadas e avaliações por estrelas a cada candidato directamente no painel de recrutamento.",
    categoria: "sistema",
    role: "empresa",
    lida: true,
    tempo: "há 2 dias",
    tempoMs: 172800000,
    link: "/dashboard",
  },
  {
    id: "e-6",
    titulo: "Relatório mensal disponível — Março 2025",
    descricao: "O relatório de actividade de Março está disponível: 187 candidaturas recebidas, 12 entrevistas, 5 aprovações.",
    categoria: "sistema",
    role: "empresa",
    lida: true,
    tempo: "há 1 semana",
    tempoMs: 604800000,
    link: "/dashboard",
    acoes: [
      { label: "Ver dashboard", href: "/dashboard", primary: true },
    ],
  },
];

export const categoriaConfig: Record<
  NotifCategoria,
  { label: string; icon: string; color: string; bg: string }
> = {
  candidatura: { label: "Candidatura", icon: "ri-send-plane-line", color: "text-[#E8501A]", bg: "bg-orange-50" },
  vaga: { label: "Nova Vaga", icon: "ri-briefcase-line", color: "text-violet-600", bg: "bg-violet-50" },
  perfil: { label: "Perfil", icon: "ri-user-line", color: "text-amber-600", bg: "bg-amber-50" },
  entrevista: { label: "Entrevista", icon: "ri-calendar-check-line", color: "text-emerald-600", bg: "bg-emerald-50" },
  sistema: { label: "Sistema", icon: "ri-settings-3-line", color: "text-gray-600", bg: "bg-gray-100" },
  empresa: { label: "Empresa", icon: "ri-building-2-line", color: "text-sky-600", bg: "bg-sky-50" },
};
