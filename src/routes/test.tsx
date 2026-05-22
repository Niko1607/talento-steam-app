import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { questions } from "@/lib/quiz-data";
import { areas, careers, type Area } from "@/lib/careers-data";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Test vocacional gratuito — Talento STEM" },
      { name: "description", content: "Preguntas para descubrir tu perfil vocacional y carreras recomendadas." },
      { property: "og:title", content: "Test vocacional — Talento STEM" },
      { property: "og:description", content: "Descubre tu perfil profesional en pocos minutos." },
    ],
  }),
  component: TestPage,
});

function TestPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const savedOnce = useRef(false);
  const resultSaved = useRef(false);

  const total = questions.length;
  const done = step >= total;

  // Load saved progress
  useEffect(() => {
    if (!user) { setLoaded(true); return; }
    supabase.from("test_progress").select("*").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => {
        if (data && Array.isArray(data.answers)) {
          setAnswers(data.answers as number[]);
          setStep(Math.min(data.current_step, total));
          if ((data.answers as number[]).length > 0) {
            toast.info("Retomamos donde lo dejaste", { description: `Pregunta ${Math.min(data.current_step, total) + 1}` });
          }
        }
        setLoaded(true);
      });
  }, [user, total]);

  // Autosave progress
  useEffect(() => {
    if (!user || !loaded || done) return;
    if (answers.length === 0 && step === 0 && !savedOnce.current) return;
    savedOnce.current = true;
    const t = setTimeout(async () => {
      await supabase.from("test_progress").upsert({
        user_id: user.id, answers, current_step: step, updated_at: new Date().toISOString(),
      });
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1500);
    }, 400);
    return () => clearTimeout(t);
  }, [answers, step, user, loaded, done]);

  const scores = useMemo(() => {
    const s: Record<Area, number> = {
      tecnologia: 0, salud: 0, diseno: 0, administracion: 0, ingenieria: 0, arte: 0, ciencias: 0, social: 0,
    };
    answers.forEach((optIdx, qIdx) => {
      const opt = questions[qIdx]?.options[optIdx];
      opt?.areas.forEach((a) => { s[a] += 1; });
    });
    return s;
  }, [answers]);

  const ranked = useMemo(
    () => (Object.entries(scores) as [Area, number][])
      .sort((a, b) => b[1] - a[1])
      .filter(([, v]) => v > 0),
    [scores]
  );

  const recommended = useMemo(() => {
    const top = ranked.slice(0, 3).map(([k]) => k);
    return careers.filter((c) => top.includes(c.area)).slice(0, 6);
  }, [ranked]);

  // Save result when done
  useEffect(() => {
    if (!done || !user || resultSaved.current || ranked.length === 0) return;
    resultSaved.current = true;
    (async () => {
      const top_areas = ranked.slice(0, 3).map(([k]) => k);
      await supabase.from("test_results").insert({
        user_id: user.id, scores, top_areas, top_area: top_areas[0] ?? null,
      });
      // Clear progress
      await supabase.from("test_progress").delete().eq("user_id", user.id);
      toast.success("Test enviado correctamente", {
        description: "Tus resultados se guardaron en tu historial.",
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
    })();
  }, [done, user, scores, ranked]);

  const progress = Math.round((step / total) * 100);

  function pick(i: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = i;
      return next;
    });
    setStep(step + 1);
  }
  function back() { if (step > 0) setStep(step - 1); }
  async function reset() {
    setStep(0); setAnswers([]); resultSaved.current = false; savedOnce.current = false;
    if (user) await supabase.from("test_progress").delete().eq("user_id", user.id);
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-12">
        {!done ? (
          <>
            <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
              <span>Pregunta {step + 1} de {total}</span>
              <span className="flex items-center gap-3">
                {savedFlash && <span className="text-xs text-leaf">Guardado ✓</span>}
                {progress}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full border border-ink/20 bg-secondary">
              <div className="h-full bg-gradient-warm transition-all" style={{ width: `${progress}%` }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="mt-10"
              >
                <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                  {questions[step].text}
                </h1>
                <div className="mt-6 grid gap-3">
                  {questions[step].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => pick(i)}
                      className="group flex items-center justify-between rounded-2xl border-2 border-ink bg-card px-5 py-4 text-left font-medium transition-all hover:-translate-y-0.5 hover:bg-sun/30"
                      style={{ boxShadow: "4px 4px 0 var(--ink)" }}
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="h-4 w-4 opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button onClick={back} className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" /> Atrás
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block rounded-full border-2 border-ink bg-sun px-3 py-1 text-xs font-bold uppercase tracking-wide">Tus resultados</span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
              Tu perfil tira hacia <span className="text-coral">{areas[ranked[0]?.[0] ?? "tecnologia"].label}</span>.
            </h1>
            <p className="mt-3 text-muted-foreground">
              Estas son las áreas con más afinidad. No es destino — es punto de partida.
            </p>

            <div className="mt-8 space-y-3">
              {ranked.slice(0, 5).map(([area, score]) => {
                const max = ranked[0][1] || 1;
                const pct = Math.round((score / max) * 100);
                return (
                  <div key={area} className="rounded-2xl border-2 border-ink bg-card p-4" style={{ boxShadow: "4px 4px 0 var(--ink)" }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 font-semibold">
                        <span className="text-2xl">{areas[area].emoji}</span>
                        {areas[area].label}
                      </div>
                      <span className="text-sm tabular-nums text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full bg-gradient-warm" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <h2 className="mt-12 font-display text-3xl font-bold">Carreras recomendadas para ti</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {recommended.map((c) => (
                <Link
                  key={c.slug}
                  to="/carreras/$slug"
                  params={{ slug: c.slug }}
                  className="group rounded-2xl border-2 border-ink bg-card p-5 transition-transform hover:-translate-y-1"
                  style={{ boxShadow: "4px 4px 0 var(--ink)" }}
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-coral">{areas[c.area].label}</div>
                  <div className="mt-1 font-display text-xl font-bold">{c.name}</div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.what}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                    Ver detalle <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-5 py-2.5 font-semibold transition-transform hover:-translate-y-0.5">
                <RotateCcw className="h-4 w-4" /> Repetir test
              </button>
              <Link to="/historial" className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-5 py-2.5 font-semibold text-cream transition-transform hover:-translate-y-0.5">
                Ver mi historial
              </Link>
              <Link to="/recursos" className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-5 py-2.5 font-semibold transition-transform hover:-translate-y-0.5">
                Ver consejos
              </Link>
            </div>
          </motion.div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
