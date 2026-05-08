import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { universities } from "@/lib/careers-data";
import { MapPin, Layers, Wallet } from "lucide-react";

export const Route = createFileRoute("/universidades")({
  head: () => ({
    meta: [
      { title: "Universidades e instituciones — Talento STEAM" },
      { name: "description", content: "Programas, modalidades y costos de universidades en Latinoamérica." },
      { property: "og:title", content: "Universidades — Talento STEAM" },
      { property: "og:description", content: "Compara universidades, modalidades y costos." },
    ],
  }),
  component: UniPage,
});

function UniPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-12">
        <span className="inline-block rounded-full border-2 border-ink bg-sun px-3 py-1 text-xs font-bold uppercase tracking-wide">Universidades</span>
        <h1 className="mt-4 font-display text-5xl font-extrabold leading-tight md:text-6xl">Dónde puedes estudiar.</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Una selección de universidades destacadas en la región con sus programas, modalidades y rangos de costo.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {universities.map((u) => (
            <div key={u.name} className="rounded-3xl border-2 border-ink bg-card p-6" style={{ boxShadow: "5px 5px 0 var(--ink)" }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-2xl font-bold">{u.name}</div>
                  <div className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {u.country}
                  </div>
                </div>
                <span className="rounded-full bg-sun/40 px-3 py-1 text-xs font-bold">{u.programs}+ programas</span>
              </div>
              <div className="mt-5 grid gap-2 text-sm">
                <div className="flex items-center gap-2"><Layers className="h-4 w-4 text-coral" /> {u.modality}</div>
                <div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-coral" /> {u.cost}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          * Costos referenciales. Consulta siempre la página oficial de cada universidad para becas y ayudas vigentes.
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}
