import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Heart, Brain, Compass, Users, BookOpen, Coffee } from "lucide-react";

export const Route = createFileRoute("/recursos")({
  head: () => ({
    meta: [
      { title: "Consejos y recursos — Brújula" },
      { name: "description", content: "Tips para elegir carrera, manejo del estrés, habilidades blandas y proyecto de vida." },
      { property: "og:title", content: "Consejos y recursos — Brújula" },
      { property: "og:description", content: "Aprende a decidir mejor tu futuro académico y profesional." },
    ],
  }),
  component: RecursosPage,
});

const tips = [
  {
    icon: Compass, color: "bg-coral text-cream",
    title: "Cómo elegir carrera sin arrepentirte",
    points: [
      "Distingue entre lo que te apasiona, lo que se te da bien y lo que paga.",
      "Habla con 3 profesionales que ya ejerzan esa carrera.",
      "No elijas por presión familiar ni por seguir a tus amigos.",
    ],
  },
  {
    icon: Brain, color: "bg-grape text-cream",
    title: "Maneja el estrés académico",
    points: [
      "Duerme 7–8h. El cerebro consolida lo aprendido durmiendo.",
      "Estudia en bloques de 25–50 min con descansos cortos.",
      "Pide ayuda temprano. Atascarse en silencio empeora todo.",
    ],
  },
  {
    icon: Users, color: "bg-leaf text-cream",
    title: "Habilidades blandas que importan",
    points: [
      "Comunicación clara: hablar y escribir simple.",
      "Trabajo en equipo y manejo de conflictos.",
      "Adaptabilidad: lo único constante es el cambio.",
    ],
  },
  {
    icon: Heart, color: "bg-sun text-ink",
    title: "Tu proyecto de vida",
    points: [
      "Define tu visión a 5 años: cómo te ves viviendo, no solo trabajando.",
      "Establece metas pequeñas y medibles para este semestre.",
      "Revísalo cada 6 meses. Tienes derecho a cambiar de rumbo.",
    ],
  },
  {
    icon: BookOpen, color: "bg-ink text-cream",
    title: "Aprende a aprender",
    points: [
      "Resume con tus palabras, no copies textual.",
      "Enseña lo que aprendiste a alguien más.",
      "Practica con ejercicios reales antes del examen.",
    ],
  },
  {
    icon: Coffee, color: "bg-card text-ink",
    title: "Cuida tu energía",
    points: [
      "Mueve el cuerpo 30 min al día, aunque sea caminar.",
      "Limita el doomscrolling — drena foco sin que lo notes.",
      "Cultiva una afición no académica. Te sostiene.",
    ],
  },
];

function RecursosPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-12">
        <span className="inline-block rounded-full border-2 border-ink bg-sun px-3 py-1 text-xs font-bold uppercase tracking-wide">Recursos</span>
        <h1 className="mt-4 font-display text-5xl font-extrabold leading-tight md:text-6xl">
          Consejos para decidir <em className="not-italic text-coral">bien</em>.
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Lo que nadie te explica del proyecto de vida, el estrés académico y las habilidades que de verdad importan.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((t) => (
            <article key={t.title} className={`rounded-3xl border-2 border-ink ${t.color} p-6 shadow-pop`}>
              <t.icon className="h-7 w-7" />
              <h2 className="mt-3 font-display text-2xl font-bold">{t.title}</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {t.points.map((p) => (
                  <li key={p} className="flex gap-2"><span className="opacity-60">→</span><span>{p}</span></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
