-- ============================================================
-- EstagiaAngola — Script de Actualização do Banco de Dados
-- Execute no Supabase Dashboard → SQL Editor
-- ============================================================


-- 1. Tabela: company_reports (Denúncias de Empresas)
CREATE TABLE IF NOT EXISTS public.company_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    reason TEXT NOT NULL, -- 'fake', 'spam', 'inappropriate', 'fraud'
    details TEXT,
    reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS para denúncias
ALTER TABLE public.company_reports ENABLE ROW LEVEL SECURITY;

-- Políticas: qualquer utilizador autenticado pode denunciar
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'company_reports' AND policyname = 'Utilizadores autenticados podem denunciar'
  ) THEN
    CREATE POLICY "Utilizadores autenticados podem denunciar" ON public.company_reports 
        FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'company_reports' AND policyname = 'Admins veem todas as denúncias'
  ) THEN
    CREATE POLICY "Admins veem todas as denúncias" ON public.company_reports 
        FOR SELECT USING (auth.role() = 'authenticated');
  END IF;
END $$;


-- 2. Adicionar Colunas de Entrevista na Tabela public.applications
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS interview_date TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS interview_time TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS interview_status TEXT DEFAULT 'Pendente';
-- interview_status: 'Pendente' | 'Aceite' | 'Rejeitado'


-- 3. Garantir que empresas podem actualizar candidaturas (para agendar entrevistas)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'applications' 
    AND policyname = 'Empresas atualizam candidaturas das suas vagas'
  ) THEN
    CREATE POLICY "Empresas atualizam candidaturas das suas vagas" ON public.applications 
        FOR UPDATE USING (
            EXISTS (
                SELECT 1 FROM public.internships i 
                WHERE i.id = applications.internship_id 
                AND i.company_id = auth.uid()
            )
        );
  END IF;
END $$;

-- 4. Estudantes podem actualizar o estado de entrevista nas suas próprias candidaturas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'applications' 
    AND policyname = 'Estudantes atualizam estado de entrevista'
  ) THEN
    CREATE POLICY "Estudantes atualizam estado de entrevista" ON public.applications 
        FOR UPDATE USING (auth.uid() = student_id)
        WITH CHECK (auth.uid() = student_id);
  END IF;
END $$;


-- 5. Adicionar Coluna de Tipo de Estágio na Tabela public.internships
ALTER TABLE public.internships 
    ADD COLUMN IF NOT EXISTS internship_type TEXT DEFAULT 'Estágio Remunerado';
-- Valores: 'Estágio Curricular', 'Estágio Remunerado', 'Estágio Não Remunerado'


-- 6. Suporte a localização remota (já suportado pelo campo province como TEXT)
-- Nenhuma alteração estrutural necessária — simplesmente usar 'Sem localidade física / Remoto' como valor


-- 7. Políticas de leitura pública para estatísticas da landing page
-- (Utilizadores não autenticados precisam de contar registos para exibir stats)

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'students' AND policyname = 'Leitura pública de contagem de estudantes'
  ) THEN
    CREATE POLICY "Leitura pública de contagem de estudantes" ON public.students
        FOR SELECT USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'companies' AND policyname = 'Leitura pública de empresas'
  ) THEN
    CREATE POLICY "Leitura pública de empresas" ON public.companies
        FOR SELECT USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'internships' AND policyname = 'Leitura pública de vagas'
  ) THEN
    CREATE POLICY "Leitura pública de vagas" ON public.internships
        FOR SELECT USING (true);
  END IF;
END $$;

-- Adicionar coluna reporter_id à company_reports (para rastrear quem denunciou)
ALTER TABLE public.company_reports 
    ADD COLUMN IF NOT EXISTS reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;


-- ============================================================
-- FIM DO SCRIPT
-- ============================================================
