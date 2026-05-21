import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Compass, GraduationCap, Library, Lightbulb } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { areas } from "@/lib/careers-data";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="grain absolute inset-0 opacity-60" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-sun/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Compass className="h-3.5 w-3.5" /> Orientación vocacional
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-5 font-display text-5xl font-extrabold leading-[0.95] text-balance md:text-7xl"
            >
              Encuentra la carrera que <em className="not-italic text-coral">enciende</em> tu curiosidad.
            </motion.h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Un test honesto, datos reales de carreras y universidades, y consejos para que decidas con criterio — no por moda.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/test"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-6 py-3 font-semibold text-cream shadow-pop transition-transform hover:-translate-y-1"
              >
                Hacer el test gratis <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/carreras"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-6 py-3 font-semibold text-ink transition-transform hover:-translate-y-1"
              >
                Explorar carreras
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div><span className="font-display text-2xl font-bold text-foreground">15</span> preguntas</div>
              <div><span className="font-display text-2xl font-bold text-foreground">20+</span> carreras</div>
              <div><span className="font-display text-2xl font-bold text-foreground">20</span> universidades</div>
            </div>

          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border-2 border-ink shadow-pop">
              <img src={hero} alt="Estudiantes explorando opciones de carrera" width={1536} height={1024} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border-2 border-ink bg-sun px-4 py-3 font-display text-sm font-bold shadow-pop md:block">
              ✦ Hecho por orientadores
            </div>
            <div className="absolute -top-6 -right-4 hidden rotate-6 rounded-2xl border-2 border-ink bg-cream px-4 py-3 text-xs font-semibold shadow-pop md:block">
              100% gratuito
            </div>
          </motion.div>
        </div>
      </section>

      {/* PILARES */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-4xl font-bold md:text-5xl">Lo que vas a encontrar.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Compass, title: "Test vocacional", desc: "Preguntas sobre gustos, habilidades y personalidad.", to: "/test", bg: "bg-coral", fg: "text-cream" },
            { icon: Library, title: "Info de carreras", desc: "Qué hace, campo laboral, salario, duración.", to: "/carreras", bg: "bg-sun", fg: "text-ink" },
            { icon: GraduationCap, title: "Universidades", desc: "Programas, modalidades y costos.", to: "/universidades", bg: "bg-grape", fg: "text-cream" },
            { icon: Lightbulb, title: "Consejos", desc: "Estrés, habilidades blandas, proyecto de vida.", to: "/recursos", bg: "bg-leaf", fg: "text-cream" },
          ].map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className={`group rounded-3xl border-2 border-ink ${c.bg} ${c.fg} p-6 shadow-pop transition-transform hover:-translate-y-1`}
            >
              <c.icon className="h-7 w-7" />
              <div className="mt-4 font-display text-2xl font-bold">{c.title}</div>
              <p className="mt-2 text-sm opacity-90">{c.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                Ir <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AREAS */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Áreas de interés.</h2>
          <Link to="/carreras" className="hidden text-sm font-semibold underline underline-offset-4 md:inline">Ver todas</Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {Object.entries(areas).map(([key, a]) => (
            <Link
              key={key}
              to="/carreras"
              search={{ area: key }}
              className="rounded-2xl border-2 border-ink bg-card p-5 transition-transform hover:-translate-y-1"
              style={{ boxShadow: "4px 4px 0 var(--ink)" }}
            >
              <div className="text-3xl">{a.emoji}</div>
              <div className="mt-3 font-display text-lg font-bold">{a.label}</div>
              <p className="mt-1 text-xs text-muted-foreground">{a.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="relative overflow-hidden rounded-3xl border-2 border-ink bg-gradient-cosmic p-10 text-cream shadow-pop md:p-16">
          <div className="grain absolute inset-0 opacity-30" />
          <div className="relative z-10 max-w-2xl">
            <h3 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
              ¿Listo para descubrir qué te mueve?
            </h3>
            <p className="mt-3 text-cream/80">15 preguntas. 5 minutos. Una recomendación honesta de carreras alineadas a ti.</p>
            <Link
              to="/test"
              className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-cream bg-cream px-6 py-3 font-semibold text-ink transition-transform hover:-translate-y-1"
            >
              Empezar test <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
