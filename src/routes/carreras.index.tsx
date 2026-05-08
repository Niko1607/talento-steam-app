import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { areas, careers, type Area } from "@/lib/careers-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/carreras/")({
  validateSearch: (s: Record<string, unknown>) => ({ area: (s.area as string) || "" }),
  head: () => ({
    meta: [
      { title: "Carreras universitarias — Talento STEAM" },
      { name: "description", content: "Explora carreras: qué hacen, campo laboral, salario, duración y universidades." },
      { property: "og:title", content: "Carreras — Talento STEAM" },
      { property: "og:description", content: "Catálogo de carreras con datos reales." },
    ],
  }),
  component: CarrerasPage,
});

function CarrerasPage() {
  const { area: initial } = Route.useSearch();
  const [filter, setFilter] = useState<Area | "">((initial as Area) || "");
  const list = filter ? careers.filter((c) => c.area === filter) : careers;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-12">
        <span className="inline-block rounded-full border-2 border-ink bg-sun px-3 py-1 text-xs font-bold uppercase tracking-wide">Carreras</span>
        <h1 className="mt-4 font-display text-5xl font-extrabold leading-tight md:text-6xl">Conoce tu próxima profesión.</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Información honesta sobre qué hace cada profesional, dónde puede trabajar, cuánto gana y qué tan larga es la formación.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("")}
            className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-semibold ${filter === "" ? "bg-ink text-cream" : "bg-card"}`}
          >
            Todas
          </button>
          {(Object.entries(areas) as [Area, typeof areas[Area]][]).map(([k, a]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-semibold ${filter === k ? "bg-ink text-cream" : "bg-card"}`}
            >
              {a.emoji} {a.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <Link
              key={c.slug}
              to="/carreras/$slug"
              params={{ slug: c.slug }}
              className="group rounded-3xl border-2 border-ink bg-card p-6 transition-transform hover:-translate-y-1"
              style={{ boxShadow: "5px 5px 0 var(--ink)" }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-coral">{areas[c.area].label}</div>
              <div className="mt-2 font-display text-2xl font-bold leading-tight">{c.name}</div>
              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{c.what}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="rounded-full bg-secondary px-3 py-1">{c.duration}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
