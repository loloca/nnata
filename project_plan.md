# Estagia Angola - Plataforma de Estágios IPAS

## 1. Descrição do Projeto
Plataforma digital de gestão e conexão de estágios, focada no ecossistema do IPAS (Instituto Politécnico Superior de Angola). Conecta estudantes com empresas angolanas, modernizando o processo de candidatura e gestão de estágios. Inspirada em LinkedIn/Indeed e CIEE, adaptada à realidade local.

**Público-alvo:**
- Estudantes do IPAS em busca de estágios
- Empresas angolanas que procuram estagiários
- Coordenadores institucionais do IPAS

**Proposta de valor:** Desburocratização do processo de estágio com interface moderna, portfólio de projetos e candidatura simplificada.

---

## 2. Estrutura de Páginas

- `/` - Landing Page institucional
- `/vagas` - Listagem de vagas de estágio (com filtros)
- `/vagas/:id` - Detalhe da vaga
- `/empresas` - Vitrine de empresas parceiras
- `/empresas/:id` - Perfil da empresa
- `/como-funciona` - Como a plataforma funciona
- `/login` - Autenticação (estudante ou empresa)
- `/cadastro` - Registo (estudante ou empresa)
- `/estudante/perfil` - Perfil do estudante
- `/estudante/candidaturas` - Histórico de candidaturas
- `/estudante/portfolio` - Portfólio de projetos
- `/empresa/dashboard` - Painel da empresa
- `/empresa/vagas` - Gestão de vagas publicadas
- `/empresa/candidatos` - Gestão de candidatos

---

## 3. Funcionalidades Principais

- [x] Landing Page institucional com hero, stats, empresas, como funciona, depoimentos, CTA
- [ ] Motor de busca de vagas com filtros avançados (área, província, duração)
- [ ] Sistema de login/registo (estudante + empresa)
- [ ] Perfil do estudante com portfólio de projetos
- [ ] Painel da empresa (publicar vagas, gerir candidatos)
- [ ] Sistema de candidatura simplificada
- [ ] Sistema de notificações in-app
- [ ] Painel de controlo com métricas

---

## 4. Modelo de Dados (Supabase - Futuro)

### Tabela: users
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | Chave primária |
| email | text | Email do utilizador |
| role | enum | 'student' ou 'company' |
| created_at | timestamp | Data de criação |

### Tabela: students
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | FK de users |
| full_name | text | Nome completo |
| course | text | Curso |
| university | text | Universidade (IPAS) |
| province | text | Província |
| bio | text | Biografia |
| avatar_url | text | URL da foto |

### Tabela: companies
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | FK de users |
| name | text | Nome da empresa |
| sector | text | Setor de atividade |
| province | text | Província |
| logo_url | text | URL do logo |
| description | text | Descrição |

### Tabela: internships
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | Chave primária |
| company_id | uuid | FK de companies |
| title | text | Título da vaga |
| area | text | Área de estágio |
| province | text | Província |
| duration | text | Duração |
| description | text | Descrição |
| requirements | text | Requisitos |
| status | enum | 'active', 'closed' |

### Tabela: applications
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | Chave primária |
| student_id | uuid | FK de students |
| internship_id | uuid | FK de internships |
| status | enum | 'pending', 'accepted', 'rejected' |
| applied_at | timestamp | Data da candidatura |

---

## 5. Integrações de Backend

- **Supabase Auth:** Login/registo de estudantes e empresas (fase futura)
- **Supabase DB:** Armazenamento de perfis, vagas e candidaturas (fase futura)
- **Supabase Storage:** Upload de CVs, fotos de perfil, logos (fase futura)

---

## 6. Plano de Desenvolvimento

### Fase 1: Landing Page Institucional ✅ EM PROGRESSO
- Objetivo: Criar a vitrine pública do produto com design profissional
- Entregável: Landing page completa com navbar, hero, estatísticas, empresas parceiras, como funciona, depoimentos, CTA e footer

### Fase 2: Listagem de Vagas
- Objetivo: Motor de busca e listagem de vagas com filtros
- Entregável: Página /vagas com cards de vagas, filtros laterais e detalhe da vaga

### Fase 3: Sistema de Autenticação
- Objetivo: Login e registo para estudantes e empresas
- Entregável: Páginas /login e /cadastro com fluxos distintos

### Fase 4: Perfil do Estudante
- Objetivo: Perfil completo com portfólio de projetos
- Entregável: Páginas de perfil e portfólio do estudante

### Fase 5: Painel da Empresa
- Objetivo: Dashboard para gerir vagas e candidaturas
- Entregável: Páginas de dashboard, gestão de vagas e candidatos
