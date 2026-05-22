
CREATE OR REPLACE FUNCTION public.same_institution(_a uuid, _b uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles pa
    JOIN public.profiles pb ON pb.id = _b
    WHERE pa.id = _a AND pa.institution = pb.institution AND pa.institution <> ''
  );
$$;

CREATE OR REPLACE FUNCTION public.get_role(_user_id uuid)
RETURNS public.app_role LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM public.profiles WHERE id = _user_id;
$$;

CREATE POLICY "staff view institution profiles" ON public.profiles
FOR SELECT USING (
  public.get_role(auth.uid()) IN ('orientador','docente')
  AND public.same_institution(auth.uid(), id)
);

CREATE TABLE public.test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scores jsonb NOT NULL,
  top_areas text[] NOT NULL DEFAULT '{}',
  top_area text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_test_results_user ON public.test_results(user_id, created_at DESC);
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own results select" ON public.test_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own results insert" ON public.test_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own results delete" ON public.test_results FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "staff view institution results" ON public.test_results
  FOR SELECT USING (
    public.get_role(auth.uid()) IN ('orientador','docente')
    AND public.same_institution(auth.uid(), user_id)
  );

CREATE TABLE public.test_progress (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  current_step integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.test_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own progress select" ON public.test_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own progress insert" ON public.test_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own progress update" ON public.test_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own progress delete" ON public.test_progress FOR DELETE USING (auth.uid() = user_id);
