import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { History, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { areas, type Area } from "@/lib/careers-data";

export const Route = createFileRoute("/historial")({
  head: () => ({
    meta: [
      { title: "Mi historial de tests — Talento STEM" },
      { name: "description", content: "Revisa tus resultados anteriores del test vocacional." },
    ],
  }),
  component: HistorialPage,
});

type Row = {
  id: string;
  created_at: string;
  top_area: Area | null;
  top_areas: Area[];
  scores: Record<Area, number>;
};

function HistorialPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("test_results")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data ?? []) as unknown as Row[]);
    setLoading(false);
  }
  useEffect(() => { load(); }, [user]);

  async function remove(id: string) {
    const { error } = await supabase.from("test_results").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Resultado eliminado");
    setRows((r) => r.filter((x) => x.id !== id));
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-5 py-12">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-sun"><History className="h-5 w-5" /></span>
          <h1 className="font-display text-4xl font-extrabold">Mi historial</h1>
        </div>
        <p className="mt-2 text-muted-foreground">Todos los tests vocacionales que has realizado.</p>

        <div className="mt-8 space-y-4">
          {loading && <div className="text-muted-foreground">Cargando…</div>}
          {!loading && rows.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-ink/30 p-8 text-center">
              <p className="text-muted-foreground">Aún no has hecho ningún test.</p>
              <Link to="/test" className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-5 py-2.5 font-semibold text-cream">
                Hacer mi primer test <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
          {rows.map((r, idx) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}
              className="rounded-2xl border-2 border-ink bg-card p-5" style={{ boxShadow: "4px 4px 0 var(--ink)" }}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {new Date(r.created_at).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" })}
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold">
                    {r.top_area ? <>{areas[r.top_area].emoji} {areas[r.top_area].label}</> : "Sin resultado"}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {r.top_areas.slice(0, 3).map((a) => (
                      <span key={a} className="rounded-full border border-ink/30 bg-secondary px-3 py-0.5 text-xs font-semibold">
                        {areas[a].label}
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={() => remove(r.id)} className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-cream px-3 py-1.5 text-xs font-semibold hover:bg-coral hover:text-cream">
                  <Trash2 className="h-3.5 w-3.5" /> Borrar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
