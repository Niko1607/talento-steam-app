import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { areas, type Area } from "@/lib/careers-data";

export const Route = createFileRoute("/panel")({
  head: () => ({
    meta: [
      { title: "Panel institucional — Talento STEM" },
      { name: "description", content: "Seguimiento vocacional para docentes y orientadores." },
    ],
  }),
  component: PanelPage,
});

type Student = { id: string; full_name: string; institution: string; role: string };
type Result = { id: string; user_id: string; created_at: string; top_area: Area | null; top_areas: Area[] };

function PanelPage() {
  const { profile, loading: authLoading } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  const isStaff = profile?.role === "orientador" || profile?.role === "docente";

  useEffect(() => {
    if (!profile || !isStaff) { setLoading(false); return; }
    (async () => {
      setLoading(true);
      const [{ data: ps, error: e1 }, { data: rs, error: e2 }] = await Promise.all([
        supabase.from("profiles").select("id, full_name, institution, role").eq("institution", profile.institution),
        supabase.from("test_results").select("id, user_id, created_at, top_area, top_areas").order("created_at", { ascending: false }),
      ]);
      if (e1) toast.error(e1.message);
      if (e2) toast.error(e2.message);
      setStudents(((ps ?? []) as Student[]).filter((p) => p.id !== profile.id && p.role === "estudiante"));
      setResults((rs ?? []) as unknown as Result[]);
      setLoading(false);
    })();
  }, [profile, isStaff]);

  const stats = useMemo(() => {
    const total = results.length;
    const byArea: Record<string, number> = {};
    results.forEach((r) => { if (r.top_area) byArea[r.top_area] = (byArea[r.top_area] ?? 0) + 1; });
    const ranked = Object.entries(byArea).sort((a, b) => b[1] - a[1]) as [Area, number][];
    return { total, ranked };
  }, [results]);

  const latestByStudent = useMemo(() => {
    const m = new Map<string, Result>();
    results.forEach((r) => { if (!m.has(r.user_id)) m.set(r.user_id, r); });
    return m;
  }, [results]);

  if (authLoading) return <div className="grid min-h-screen place-items-center text-muted-foreground">Cargando…</div>;

  if (!isStaff) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <div className="mx-auto max-w-2xl px-5 py-20 text-center">
          <h1 className="font-display text-3xl font-bold">Panel solo para docentes y orientadores</h1>
          <p className="mt-3 text-muted-foreground">Tu cuenta actual es de estudiante. Si eres docente u orientador, regístrate con ese rol.</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-leaf text-cream"><BarChart3 className="h-5 w-5" /></span>
          <div>
            <h1 className="font-display text-4xl font-extrabold">Panel institucional</h1>
            <p className="text-sm text-muted-foreground">{profile?.institution}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat icon={<Users className="h-5 w-5" />} label="Estudiantes" value={students.length} />
          <Stat icon={<GraduationCap className="h-5 w-5" />} label="Tests realizados" value={stats.total} />
          <Stat icon={<BarChart3 className="h-5 w-5" />} label="Área top" value={stats.ranked[0] ? areas[stats.ranked[0][0]].label : "—"} />
        </div>

        <h2 className="mt-12 font-display text-2xl font-bold">Distribución por área</h2>
        <div className="mt-4 space-y-2">
          {stats.ranked.length === 0 && <p className="text-muted-foreground">Aún no hay resultados.</p>}
          {stats.ranked.map(([a, n]) => {
            const pct = Math.round((n / Math.max(stats.total, 1)) * 100);
            return (
              <div key={a} className="rounded-xl border-2 border-ink bg-card p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{areas[a].emoji} {areas[a].label}</span>
                  <span className="tabular-nums text-muted-foreground">{n} · {pct}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-gradient-warm" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="mt-12 font-display text-2xl font-bold">Estudiantes</h2>
        {loading ? (
          <p className="mt-4 text-muted-foreground">Cargando…</p>
        ) : students.length === 0 ? (
          <p className="mt-4 text-muted-foreground">Aún no hay estudiantes registrados en tu institución.</p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {students.map((s, idx) => {
              const r = latestByStudent.get(s.id);
              return (
                <motion.div key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
                  className="rounded-2xl border-2 border-ink bg-card p-4" style={{ boxShadow: "4px 4px 0 var(--ink)" }}>
                  <div className="font-semibold">{s.full_name || "Sin nombre"}</div>
                  {r ? (
                    <div className="mt-1 text-sm text-muted-foreground">
                      Último test: <span className="font-semibold text-foreground">
                        {r.top_area ? `${areas[r.top_area].emoji} ${areas[r.top_area].label}` : "—"}
                      </span>
                      <div className="text-xs">{new Date(r.created_at).toLocaleDateString("es-CO")}</div>
                    </div>
                  ) : (
                    <div className="mt-1 text-sm text-muted-foreground">Sin tests aún</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border-2 border-ink bg-card p-5" style={{ boxShadow: "4px 4px 0 var(--ink)" }}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-2 font-display text-3xl font-extrabold">{value}</div>
    </div>
  );
}
