-- Migração Inicial: Estagia Angola

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabela: students (Perfis de Estudantes)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    province TEXT,
    bio TEXT,
    course TEXT,
    academic_year TEXT,
    areas_interest TEXT[],
    linkedin_url TEXT,
    avatar_url TEXT,
    process_number TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela: companies (Perfis de Empresas)
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    sector TEXT,
    province TEXT,
    description TEXT,
    website TEXT,
    logo_url TEXT,
    cover_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela: internships (Vagas de Estágio)
CREATE TABLE IF NOT EXISTS public.internships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    area TEXT NOT NULL,
    province TEXT NOT NULL,
    duration TEXT,
    type TEXT, -- 'remoto', 'híbrido', 'presencial'
    description TEXT,
    requirements TEXT,
    benefits TEXT,
    applicants_count INTEGER DEFAULT 0,
    vacancies_count INTEGER DEFAULT 1,
    is_featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'Activa',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela: applications (Candidaturas)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    internship_id UUID REFERENCES public.internships(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'Pendente', -- 'Pendente', 'Em análise', 'Entrevista', 'Aprovado', 'Recusado'
    motivation TEXT,
    cv_url TEXT,
    feedback TEXT,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, internship_id)
);

-- 5. Tabela: projects (Portfólio de Estudantes)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    technologies TEXT[],
    github_url TEXT,
    live_url TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACESSO

-- Estudantes
CREATE POLICY "Estudantes podem ver seu próprio perfil" ON public.students FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Estudantes podem editar seu próprio perfil" ON public.students FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Perfis de estudantes visíveis para empresas" ON public.students FOR SELECT USING (EXISTS (SELECT 1 FROM public.companies WHERE id = auth.uid()));

-- Empresas
CREATE POLICY "Empresas podem ver seu próprio perfil" ON public.companies FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Empresas podem editar seu próprio perfil" ON public.companies FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Empresas visíveis para todos" ON public.companies FOR SELECT USING (true);

-- Vagas
CREATE POLICY "Vagas ativas visíveis para todos" ON public.internships FOR SELECT USING (status = 'Activa');
CREATE POLICY "Empresas gerem suas vagas" ON public.internships FOR ALL USING (auth.uid() = company_id);

-- Candidaturas
CREATE POLICY "Estudantes veem suas candidaturas" ON public.applications FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Empresas veem candidaturas das suas vagas" ON public.applications FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.internships WHERE id = internship_id AND company_id = auth.uid())
);
CREATE POLICY "Empresas atualizam candidaturas" ON public.applications FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.internships WHERE id = internship_id AND company_id = auth.uid())
);
CREATE POLICY "Estudantes podem se candidatar" ON public.applications FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Projectos
CREATE POLICY "Qualquer pessoa pode ver projectos" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Estudantes gerem seus próprios projectos" ON public.projects FOR ALL USING (auth.uid() = student_id);

-- 6. Tabela: notifications (Notificações)
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL, -- 'candidatura', 'vaga', 'entrevista', 'perfil', 'sistema'
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Utilizadores veem suas notificações" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Utilizadores podem criar notificações" ON public.notifications FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Utilizadores gerem suas próprias notificações" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Utilizadores eliminam suas próprias notificações" ON public.notifications FOR DELETE USING (auth.uid() = user_id);
-- 7. Funções de Utilidade
CREATE OR REPLACE FUNCTION increment_applicants(row_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.internships
    SET applicants_count = applicants_count + 1
    WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
