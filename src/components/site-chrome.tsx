import { Link, useLocation } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/test", label: "Test" },
  { to: "/carreras", label: "Carreras" },
  { to: "/universidades", label: "Universidades" },
  { to: "/recursos", label: "Recursos" },
] as const;

export function SiteHeader() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-warm text-cream shadow-pop border-2 border-ink">
            <Sparkles className="h-4 w-4" />
          </span>
          Brújula<span className="text-coral">.</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active ? "bg-ink text-cream" : "text-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <Link
          to="/test"
          className="hidden rounded-full border-2 border-ink bg-coral px-4 py-2 text-sm font-semibold text-cream shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5 md:inline-block"
        >
          Hacer test
        </Link>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-ink/10 px-3 py-2 md:hidden">
        {links.map((l) => {
          const active = pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs ${
                active ? "bg-ink text-cream" : "text-foreground"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl font-bold">Brújula<span className="text-coral">.</span></div>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Orientación vocacional honesta para que elijas con cabeza, corazón y datos.
          </p>
        </div>
        <div className="text-sm">
          <div className="mb-2 font-semibold">Explora</div>
          <ul className="space-y-1 text-muted-foreground">
            <li><Link to="/test">Test vocacional</Link></li>
            <li><Link to="/carreras">Carreras</Link></li>
            <li><Link to="/universidades">Universidades</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="mb-2 font-semibold">Recursos</div>
          <ul className="space-y-1 text-muted-foreground">
            <li><Link to="/recursos">Tips y consejos</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/10 px-5 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Brújula — Hecho para estudiantes que están decidiendo.
      </div>
    </footer>
  );
}
