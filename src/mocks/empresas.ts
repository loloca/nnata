export interface EmpresaPublica {
  id: string;
  slug: string;
  name: string;
  logo: string;
  cover: string;
  sector: string;
  dimensao: string;
  province: string;
  website: string;
  email: string;
  descricao: string;
  cultura: string;
  beneficiosEstagio: string[];
  areaContratacao: string[];
  fundacao: string;
  colaboradores: string;
  verificada: boolean;
  rating: number;
  totalEstagios: number;
  taxaAprovacao: number;
  vagasAtivas: number;
  fotos: string[];
  valores: { icon: string; title: string; desc: string }[];
  depoimentos: { name: string; role: string; avatar: string; texto: string; ano: string }[];
}

export const empresasPublicasMock: EmpresaPublica[] = [
  {
    id: "unitel",
    slug: "unitel",
    name: "Unitel",
    logo: "/logos/unitel.png",
    cover: "https://readdy.ai/api/search-image?query=modern%20Angola%20telecom%20office%20interior%20professionals%20working%20open%20space%20technology%20bright%20natural%20light%20architectural%20photography&width=1200&height=380&seq=ep-cover1&orientation=landscape",
    sector: "Telecomunicações",
    dimensao: "Grande empresa (500+ colaboradores)",
    province: "Luanda",
    website: "https://www.unitel.ao",
    email: "estagios@unitel.ao",
    descricao: "A Unitel é a maior operadora de telecomunicações de Angola, com mais de 10 milhões de clientes activos e presença em todas as 18 províncias do país. Fundada em 2001, lideramos o mercado em serviços de voz, dados móveis e soluções digitais para particulares, empresas e governo.",
    cultura: "Na Unitel, acreditamos que o crescimento das pessoas é o motor do crescimento da empresa. O nosso ambiente de trabalho é colaborativo, inovador e orientado para resultados. Investimos continuamente na formação dos nossos colaboradores e orgulhamo-nos de ter uma das maiores taxas de retenção de talento em Angola.",
    beneficiosEstagio: [
      "Subsídio mensal competitivo",
      "Transporte de e para a empresa",
      "Almoço subsidiado na cantina",
      "Mentoria de engenheiros sénior",
      "Acesso a plataformas de aprendizagem",
      "Certificado reconhecido no mercado",
      "Possibilidade de contratação efectiva",
    ],
    areaContratacao: ["Tecnologia", "Marketing", "Finanças", "Gestão", "Engenharia"],
    fundacao: "2001",
    colaboradores: "3.500+",
    verificada: true,
    rating: 4.8,
    totalEstagios: 124,
    taxaAprovacao: 34,
    vagasAtivas: 4,
    fotos: [
      "https://readdy.ai/api/search-image?query=modern%20Angola%20office%20interior%20open%20workspace%20professionals%20collaborating%20technology%20company%20bright%20warm%20light%20photography&width=400&height=280&seq=ep-foto1&orientation=landscape",
      "https://readdy.ai/api/search-image?query=young%20african%20professionals%20team%20meeting%20brainstorming%20office%20whiteboard%20technology%20startup%20Angola%20warm%20editorial&width=400&height=280&seq=ep-foto2&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Angola%20corporate%20office%20rooftop%20terrace%20professionals%20networking%20event%20warm%20evening%20light%20city%20view&width=400&height=280&seq=ep-foto3&orientation=landscape",
    ],
    valores: [
      { icon: "ri-lightbulb-line", title: "Inovação", desc: "Desafiamos o status quo e abraçamos novas ideias" },
      { icon: "ri-group-line", title: "Equipa", desc: "Crescemos juntos, aprendemos juntos" },
      { icon: "ri-shield-check-line", title: "Integridade", desc: "Transparência em tudo o que fazemos" },
    ],
    depoimentos: [
      {
        name: "Tomás Afonso Mbeki",
        role: "Ex-estagiário em Eng. de Software · 2024",
        avatar: "https://readdy.ai/api/search-image?query=young%20professional%20african%20male%20student%20confident%20smile%20business%20casual%20attire%20clean%20studio%20white%20background%20portrait%20headshot&width=80&height=80&seq=dep1&orientation=squarish",
        texto: "O estágio na Unitel foi transformador. Trabalhei em projectos reais com impacto para milhões de angolanos. A mentoria que recebi foi excepcional.",
        ano: "2024",
      },
      {
        name: "Ana Luísa Ferreira",
        role: "Ex-estagiária em Mobile · 2024",
        avatar: "https://readdy.ai/api/search-image?query=young%20professional%20african%20female%20student%20confident%20smile%20business%20casual%20attire%20clean%20studio%20white%20background%20portrait%20headshot&width=80&height=80&seq=dep2&orientation=squarish",
        texto: "Aprendi mais em 3 meses de estágio na Unitel do que em dois anos de aulas. O ambiente é muito profissional e ao mesmo tempo acolhedor.",
        ano: "2024",
      },
    ],
  },
  {
    id: "sonangol",
    slug: "sonangol",
    name: "Sonangol",
    logo: "/logos/sonangol.png",
    cover: "https://readdy.ai/api/search-image?query=Angola%20oil%20industry%20offshore%20platform%20modern%20corporate%20headquarters%20Luanda%20professional%20exterior%20architecture%20wide%20photography%20golden%20sunset&width=1200&height=380&seq=ep-cover2&orientation=landscape",
    sector: "Energia & Petróleo",
    dimensao: "Grande empresa (500+ colaboradores)",
    province: "Luanda",
    website: "https://www.sonangol.co.ao",
    email: "rh.estagios@sonangol.co.ao",
    descricao: "A Sonangol é a empresa petrolífera nacional de Angola e um dos maiores grupos empresariais de África. Opera em exploração, produção, refinação e distribuição de petróleo e gás natural. Com décadas de experiência, a Sonangol é um pilar da economia angolana e um empregador de referência.",
    cultura: "A Sonangol valoriza a excelência técnica, a disciplina e o compromisso com Angola. Investimos fortemente na formação de quadros nacionais, convictos de que o futuro da indústria energética angolana está nas mãos dos nossos jovens talentos.",
    beneficiosEstagio: [
      "Subsídio de estágio elevado",
      "Seguro de saúde completo",
      "Formação técnica certificada",
      "Visitas a instalações offshore",
      "Mentoria de engenheiros sénior",
      "Possibilidade de contratação imediata",
    ],
    areaContratacao: ["Engenharia", "Geologia", "Gestão", "Tecnologia", "Finanças"],
    fundacao: "1976",
    colaboradores: "8.000+",
    verificada: true,
    rating: 4.6,
    totalEstagios: 89,
    taxaAprovacao: 28,
    vagasAtivas: 2,
    fotos: [
      "https://readdy.ai/api/search-image?query=oil%20refinery%20Angola%20industrial%20professional%20facility%20modern%20infrastructure%20wide%20aerial%20photography%20blue%20sky&width=400&height=280&seq=ep-foto4&orientation=landscape",
      "https://readdy.ai/api/search-image?query=African%20engineers%20petroleum%20professionals%20working%20control%20room%20oil%20gas%20facility%20Angola%20modern&width=400&height=280&seq=ep-foto5&orientation=landscape",
      "https://readdy.ai/api/search-image?query=corporate%20training%20room%20Angola%20professionals%20learning%20workshop%20modern%20office%20bright&width=400&height=280&seq=ep-foto6&orientation=landscape",
    ],
    valores: [
      { icon: "ri-award-line", title: "Excelência", desc: "Padrões internacionais em tudo o que fazemos" },
      { icon: "ri-earth-line", title: "Angola Primeiro", desc: "Comprometidos com o desenvolvimento nacional" },
      { icon: "ri-leaf-line", title: "Sustentabilidade", desc: "Energia responsável para o futuro" },
    ],
    depoimentos: [
      {
        name: "Carlos Eduardo Neto",
        role: "Ex-estagiário em Logística · 2024",
        avatar: "https://readdy.ai/api/search-image?query=young%20professional%20african%20male%20student%20smiling%20business%20casual%20clean%20studio%20white%20background%20portrait%20headshot&width=80&height=80&seq=dep3&orientation=squarish",
        texto: "Estagiar na Sonangol abriu portas que eu nunca imaginei. A responsabilidade que me foi dada desde o primeiro dia mostrou que a empresa confia nos jovens.",
        ano: "2024",
      },
    ],
  },
  {
    id: "bai",
    slug: "bai",
    name: "BAI — Banco Angolano de Investimentos",
    logo: "/logos/bai.png",
    cover: "https://readdy.ai/api/search-image?query=modern%20Angola%20bank%20headquarters%20exterior%20glass%20facade%20professional%20architecture%20Luanda%20wide%20editorial%20photography%20warm%20light&width=1200&height=380&seq=ep-cover3&orientation=landscape",
    sector: "Banca & Finanças",
    dimensao: "Grande empresa (500+ colaboradores)",
    province: "Luanda",
    website: "https://www.bancobai.ao",
    email: "talentos@bancobai.ao",
    descricao: "O BAI é o maior banco privado de Angola em activo total, com mais de 2 milhões de clientes e uma rede de mais de 200 agências em todo o país. Líder em inovação bancária, o BAI foi o primeiro banco angolano a lançar uma aplicação mobile completa de banca digital.",
    cultura: "Somos um banco moderno, digital e orientado para o cliente. A nossa cultura é de meritocracia, agilidade e inovação constante. Valorizamos colaboradores que pensam fora da caixa e que têm o propósito de tornar os serviços financeiros mais acessíveis para todos os angolanos.",
    beneficiosEstagio: [
      "Subsídio competitivo",
      "Formação contínua em banca digital",
      "Plano de saúde",
      "Cantina gratuita",
      "Acesso a cursos online premium",
      "Programa acelerado de carreira",
    ],
    areaContratacao: ["Tecnologia", "Finanças", "Gestão", "Marketing", "Direito"],
    fundacao: "1996",
    colaboradores: "5.200+",
    verificada: true,
    rating: 4.7,
    totalEstagios: 156,
    taxaAprovacao: 41,
    vagasAtivas: 3,
    fotos: [
      "https://readdy.ai/api/search-image?query=modern%20bank%20office%20interior%20Angola%20professionals%20customer%20service%20desk%20clean%20modern%20design%20white%20warm%20light&width=400&height=280&seq=ep-foto7&orientation=landscape",
      "https://readdy.ai/api/search-image?query=digital%20banking%20technology%20fintech%20team%20young%20african%20professionals%20laptop%20office%20modern%20Angola&width=400&height=280&seq=ep-foto8&orientation=landscape",
      "https://readdy.ai/api/search-image?query=corporate%20event%20bank%20Angola%20professionals%20networking%20gathering%20modern%20conference%20room%20warm%20light&width=400&height=280&seq=ep-foto9&orientation=landscape",
    ],
    valores: [
      { icon: "ri-smartphone-line", title: "Digital", desc: "Lideramos a transformação digital bancária" },
      { icon: "ri-user-heart-line", title: "Cliente", desc: "O cliente no centro de tudo" },
      { icon: "ri-bar-chart-line", title: "Crescimento", desc: "Crescemos quando os nossos clientes crescem" },
    ],
    depoimentos: [
      {
        name: "Maria Clara Oliveira",
        role: "Ex-estagiária em Produto Digital · 2024",
        avatar: "https://readdy.ai/api/search-image?query=young%20african%20female%20marketing%20student%20professional%20bright%20smile%20casual%20attire%20clean%20white%20background%20portrait%20headshot&width=80&height=80&seq=dep4&orientation=squarish",
        texto: "O programa de estágios do BAI é um dos mais bem estruturados que conheço. Tive um mentor dedicado desde o primeiro dia e participei em reuniões reais de produto.",
        ano: "2024",
      },
    ],
  },
];

export const empresasListagem: {
  id: string; slug: string; name: string; logo: string; cover: string;
  sector: string; province: string; dimensao: string; fundacao: string;
  verificada: boolean; rating: number; totalEstagios: number; vagasAtivas: number;
  colaboradores: string; areaContratacao: string[]; descricaoCurta: string;
}[] = [
  {
    id: "unitel", slug: "unitel", name: "Unitel",
    logo: "/logos/unitel.png",
    cover: "https://readdy.ai/api/search-image?query=modern%20Angola%20telecom%20office%20interior%20professionals%20working%20open%20space%20technology%20bright%20natural%20light%20architectural%20photography&width=600&height=200&seq=el-cover1&orientation=landscape",
    sector: "Telecomunicações", province: "Luanda", dimensao: "Grande (500+)",
    fundacao: "2001", verificada: true, rating: 4.8, totalEstagios: 124, vagasAtivas: 4,
    colaboradores: "3.500+", areaContratacao: ["Tecnologia", "Marketing", "Engenharia"],
    descricaoCurta: "Maior operadora de telecomunicações de Angola com 10M+ de clientes e presença nas 18 províncias.",
  },
  {
    id: "sonangol", slug: "sonangol", name: "Sonangol",
    logo: "/logos/sonangol.png",
    cover: "https://readdy.ai/api/search-image?query=Angola%20oil%20industry%20modern%20corporate%20headquarters%20Luanda%20professional%20exterior%20architecture%20wide%20golden%20sunset%20photography&width=600&height=200&seq=el-cover2&orientation=landscape",
    sector: "Energia & Petróleo", province: "Luanda", dimensao: "Grande (500+)",
    fundacao: "1976", verificada: true, rating: 4.6, totalEstagios: 89, vagasAtivas: 2,
    colaboradores: "8.000+", areaContratacao: ["Engenharia", "Geologia", "Gestão"],
    descricaoCurta: "Empresa petrolífera nacional e um dos maiores grupos empresariais de África. Referência em energia em Angola.",
  },
  {
    id: "bai", slug: "bai", name: "BAI — Banco Angolano de Investimentos",
    logo: "/logos/bai.png",
    cover: "https://readdy.ai/api/search-image?query=modern%20Angola%20bank%20headquarters%20exterior%20glass%20facade%20professional%20architecture%20Luanda%20wide%20editorial%20photography%20warm%20light&width=600&height=200&seq=el-cover3&orientation=landscape",
    sector: "Banca & Finanças", province: "Luanda", dimensao: "Grande (500+)",
    fundacao: "1996", verificada: true, rating: 4.7, totalEstagios: 156, vagasAtivas: 3,
    colaboradores: "5.200+", areaContratacao: ["Tecnologia", "Finanças", "Direito"],
    descricaoCurta: "Maior banco privado de Angola. Líder em banca digital com 200+ agências por todo o país.",
  },
  {
    id: "bfa", slug: "bfa", name: "BFA — Banco de Fomento Angola",
    logo: "/logos/bfa.png",
    cover: "https://readdy.ai/api/search-image?query=Angola%20modern%20bank%20office%20interior%20professional%20team%20working%20finance%20bright%20natural%20light%20editorial&width=600&height=200&seq=el-cover4&orientation=landscape",
    sector: "Banca & Finanças", province: "Luanda", dimensao: "Grande (500+)",
    fundacao: "1993", verificada: true, rating: 4.5, totalEstagios: 98, vagasAtivas: 2,
    colaboradores: "4.100+", areaContratacao: ["Finanças", "Gestão", "Tecnologia"],
    descricaoCurta: "Banco de referência em Angola focado no fomento de negócios e desenvolvimento económico nacional.",
  },
  {
    id: "multicaixa", slug: "multicaixa", name: "Multicaixa — EMIS",
    logo: "https://www.emis.co.ao/themes/custom/emis/logo.svg",
    cover: "https://readdy.ai/api/search-image?query=digital%20payments%20fintech%20office%20Angola%20modern%20professionals%20technology%20bright%20workspace%20editorial%20photography&width=600&height=200&seq=el-cover5&orientation=landscape",
    sector: "Fintech & Pagamentos", province: "Luanda", dimensao: "Média (100–499)",
    fundacao: "1997", verificada: true, rating: 4.4, totalEstagios: 45, vagasAtivas: 3,
    colaboradores: "650+", areaContratacao: ["Tecnologia", "Finanças", "Operações"],
    descricaoCurta: "Empresa Interbancária de Serviços — opera a maior rede de pagamentos electrónicos de Angola.",
  },
  {
    id: "angola-telecom", slug: "angola-telecom", name: "Angola Telecom",
    logo: "https://readdy.ai/api/search-image?query=telecom%20state%20company%20abstract%20logo%20signal%20tower%20icon%20clean%20white%20background%20flat%20minimal%20modern&width=100&height=100&seq=el-logo6&orientation=squarish",
    cover: "https://readdy.ai/api/search-image?query=Angola%20telecom%20infrastructure%20fiber%20office%20modern%20technology%20building%20exterior%20Luanda%20editorial%20photography%20daytime&width=600&height=200&seq=el-cover6&orientation=landscape",
    sector: "Telecomunicações", province: "Luanda", dimensao: "Grande (500+)",
    fundacao: "1992", verificada: false, rating: 4.1, totalEstagios: 37, vagasAtivas: 1,
    colaboradores: "2.800+", areaContratacao: ["Engenharia", "Tecnologia", "Gestão"],
    descricaoCurta: "Operadora pública de telecomunicações de Angola com uma das maiores infraestruturas de fibra do país.",
  },
  {
    id: "ensa", slug: "ensa", name: "ENSA — Seguros de Angola",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Ensa_logo.png",
    cover: "https://readdy.ai/api/search-image?query=insurance%20corporate%20office%20Angola%20professionals%20modern%20interior%20meeting%20bright%20warm%20light%20professional%20editorial%20photography&width=600&height=200&seq=el-cover7&orientation=landscape",
    sector: "Seguros", province: "Luanda", dimensao: "Média (100–499)",
    fundacao: "1978", verificada: true, rating: 4.3, totalEstagios: 52, vagasAtivas: 2,
    colaboradores: "1.200+", areaContratacao: ["Actuariado", "Gestão", "Direito"],
    descricaoCurta: "Maior companhia de seguros de Angola, cobrindo todos os ramos de seguros pessoais e empresariais.",
  },
  {
    id: "odebrecht-angola", slug: "odebrecht-angola", name: "Construções Sodiba",
    logo: "https://readdy.ai/api/search-image?query=construction%20company%20abstract%20building%20crane%20icon%20clean%20white%20background%20flat%20minimal%20modern&width=100&height=100&seq=el-logo8&orientation=squarish",
    cover: "https://readdy.ai/api/search-image?query=Angola%20construction%20site%20modern%20infrastructure%20bridge%20building%20professionals%20hard%20hats%20editorial%20photography%20aerial%20wide&width=600&height=200&seq=el-cover8&orientation=landscape",
    sector: "Construção & Infraestrutura", province: "Luanda", dimensao: "Grande (500+)",
    fundacao: "2005", verificada: false, rating: 4.0, totalEstagios: 28, vagasAtivas: 4,
    colaboradores: "2.100+", areaContratacao: ["Engenharia Civil", "Gestão de Projecto", "Arquitectura"],
    descricaoCurta: "Empresa líder em construção civil e infraestrutura em Angola, com obras em todas as províncias do país.",
  },
  {
    id: "kero", slug: "kero", name: "Kero — Supermercados",
    logo: "https://www.kero.co.ao/wp-content/uploads/2021/04/logo_kero.png",
    cover: "https://readdy.ai/api/search-image?query=Angola%20modern%20supermarket%20interior%20bright%20shelves%20products%20clean%20retail%20editorial%20photography%20wide&width=600&height=200&seq=el-cover9&orientation=landscape",
    sector: "Retalho & Distribuição", province: "Luanda", dimensao: "Grande (500+)",
    fundacao: "2010", verificada: true, rating: 4.2, totalEstagios: 61, vagasAtivas: 5,
    colaboradores: "3.800+", areaContratacao: ["Gestão", "Logística", "Marketing"],
    descricaoCurta: "Maior cadeia de supermercados de Angola com 40+ lojas e presença nas principais cidades do país.",
  },
  {
    id: "tpa", slug: "tpa", name: "TPA — Televisão Pública de Angola",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/TPA_ANGOLA.png",
    cover: "https://readdy.ai/api/search-image?query=Angola%20public%20television%20studio%20broadcast%20professionals%20cameras%20newsroom%20editorial%20photography%20modern%20interior%20bright&width=600&height=200&seq=el-cover10&orientation=landscape",
    sector: "Media & Comunicação", province: "Luanda", dimensao: "Média (100–499)",
    fundacao: "1975", verificada: false, rating: 3.9, totalEstagios: 33, vagasAtivas: 2,
    colaboradores: "900+", areaContratacao: ["Jornalismo", "Marketing", "Tecnologia"],
    descricaoCurta: "Canal público de televisão de Angola, com cobertura nacional e produção jornalística de referência.",
  },
  {
    id: "biocom", slug: "biocom", name: "Biocom — Biocombustível",
    logo: "https://www.biocom-angola.com/themes/custom/biocom/logo.svg",
    cover: "https://readdy.ai/api/search-image?query=Angola%20sugar%20cane%20fields%20plantation%20biofuel%20agriculture%20editorial%20wide%20aerial%20photography%20green%20landscape%20golden%20hour&width=600&height=200&seq=el-cover11&orientation=landscape",
    sector: "Agro-Indústria", province: "Malanje", dimensao: "Grande (500+)",
    fundacao: "2009", verificada: true, rating: 4.3, totalEstagios: 42, vagasAtivas: 3,
    colaboradores: "2.500+", areaContratacao: ["Agronomia", "Engenharia", "Gestão"],
    descricaoCurta: "Maior produtor de açúcar e biocombustível de Angola, com 80.000 hectares de cana-de-açúcar cultivados.",
  },
  {
    id: "sumbe-logistica", slug: "sumbe-logistica", name: "Lobito Logística",
    logo: "https://readdy.ai/api/search-image?query=logistics%20shipping%20port%20cargo%20company%20abstract%20icon%20ship%20anchor%20clean%20white%20background%20flat%20minimal%20modern&width=100&height=100&seq=el-logo12&orientation=squarish",
    cover: "https://readdy.ai/api/search-image?query=Angola%20Lobito%20port%20logistics%20cargo%20containers%20ship%20dock%20editorial%20photography%20aerial%20wide%20blue%20sea&width=600&height=200&seq=el-cover12&orientation=landscape",
    sector: "Logística & Transporte", province: "Benguela", dimensao: "Média (100–499)",
    fundacao: "2012", verificada: false, rating: 4.1, totalEstagios: 19, vagasAtivas: 2,
    colaboradores: "420+", areaContratacao: ["Logística", "Operações", "Gestão"],
    descricaoCurta: "Empresa de logística e transporte multimodal com base no Porto do Lobito, um dos mais activos de África.",
  },
];

export const getEmpresaBySlug = (slug: string): EmpresaPublica | undefined =>
  empresasPublicasMock.find((e) => e.slug === slug);

export const vagasPorEmpresa: Record<string, {
  id: string; title: string; area: string; province: string;
  duration: string; type: string; applicants: number; publishedAt: string;
}[]> = {
  unitel: [
    { id: "ve-1", title: "Estágio em Engenharia de Software", area: "Tecnologia", province: "Luanda", duration: "3 meses", type: "Híbrido", applicants: 47, publishedAt: "12 Abr 2025" },
    { id: "ve-2", title: "Estágio em Cibersegurança", area: "Tecnologia", province: "Luanda", duration: "6 meses", type: "Presencial", applicants: 29, publishedAt: "8 Abr 2025" },
    { id: "ve-3", title: "Estágio em Marketing Digital", area: "Marketing", province: "Luanda", duration: "3 meses", type: "Híbrido", applicants: 63, publishedAt: "5 Abr 2025" },
    { id: "ve-4", title: "Estágio em Análise de Dados", area: "Tecnologia", province: "Luanda", duration: "4 meses", type: "Remoto", applicants: 48, publishedAt: "1 Abr 2025" },
  ],
  sonangol: [
    { id: "s-1", title: "Estágio em Exploração e Produção", area: "Engenharia", province: "Luanda", duration: "6 meses", type: "Presencial", applicants: 132, publishedAt: "1 Abr 2025" },
    { id: "s-2", title: "Estágio em Logística e Supply Chain", area: "Gestão", province: "Cabinda", duration: "6 meses", type: "Presencial", applicants: 43, publishedAt: "5 Abr 2025" },
  ],
  bai: [
    { id: "b-1", title: "Estágio em Desenvolvimento Mobile", area: "Tecnologia", province: "Luanda", duration: "6 meses", type: "Presencial", applicants: 55, publishedAt: "4 Abr 2025" },
    { id: "b-2", title: "Estágio em Análise Financeira", area: "Finanças", province: "Luanda", duration: "4 meses", type: "Presencial", applicants: 88, publishedAt: "3 Abr 2025" },
    { id: "b-3", title: "Estágio em UX Design", area: "Tecnologia", province: "Luanda", duration: "3 meses", type: "Híbrido", applicants: 37, publishedAt: "1 Abr 2025" },
  ],
};
