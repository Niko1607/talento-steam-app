import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { areas, careers } from "@/lib/careers-data";
import { ArrowLeft, Briefcase, Clock, DollarSign, GraduationCap, Sparkles } from "lucide-react";

export const Route = createFileRoute("/carreras/$slug")({
  component: CareerDetail,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="font-display text-4xl font-bold">Carrera no encontrada</h1>
        <Link to="/carreras" className="mt-4 inline-block underline">Volver a carreras</Link>
      </div>
      <SiteFooter />
    </div>
  ),
});

function CareerDetail() {
  const { slug } = Route.useParams();
  const career = careers.find((c) => c.slug === slug);
  if (!career) throw notFound();
  const a = areas[career.area];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-5 py-12">
        <Link to="/carreras" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Todas las carreras
        </Link>

        <div className="mt-6">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-sun px-3 py-1 text-xs font-bold uppercase tracking-wide">
            {a.emoji} {a.label}
          </span>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] md:text-6xl">{career.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{career.what}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            { icon: Briefcase, label: "Campo laboral", value: career.field },
            { icon: DollarSign, label: "Salario aprox.", value: career.salary },
            { icon: Clock, label: "Duración", value: career.duration },
            { icon: GraduationCap, label: "Universidades", value: career.universities.join(" · ") },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border-2 border-ink bg-card p-5" style={{ boxShadow: "4px 4px 0 var(--ink)" }}>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-coral">
                <item.icon className="h-4 w-4" /> {item.label}
              </div>
              <div className="mt-2 text-base">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border-2 border-ink bg-gradient-cosmic p-8 text-cream shadow-pop">
          <Sparkles className="h-6 w-6" />
          <h3 className="mt-2 font-display text-2xl font-bold">¿Te llama esta carrera?</h3>
          <p className="mt-1 text-cream/80">Haz el test vocacional para confirmar si tu perfil encaja.</p>
          <Link to="/test" className="mt-4 inline-block rounded-full border-2 border-cream bg-cream px-5 py-2.5 font-semibold text-ink">
            Hacer el test
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
