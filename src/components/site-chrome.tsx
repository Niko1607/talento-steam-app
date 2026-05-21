import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LogOut, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/test", label: "Test" },
  { to: "/carreras", label: "Carreras" },
  { to: "/universidades", label: "Universidades" },
  { to: "/recursos", label: "Recursos" },
] as const;

export function SiteHeader() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const { user, profile, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-warm text-cream shadow-pop border-2 border-ink">
            <Sparkles className="h-4 w-4" />
          </span>
          Talento STEM<span className="text-coral">.</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link key={l.to} to={l.to}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active ? "bg-ink text-cream" : "text-foreground hover:bg-secondary"
                }`}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="text-right text-xs leading-tight">
                <div className="font-semibold">{profile?.full_name || user.email}</div>
                <div className="text-muted-foreground capitalize">{profile?.role} · {profile?.institution}</div>
              </div>
              <button onClick={async () => { await signOut(); nav({ to: "/auth" }); }}
                className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-cream px-3 py-1.5 text-xs font-semibold hover:bg-sun/40">
                <LogOut className="h-3.5 w-3.5" /> Salir
              </button>
            </>
          ) : (
            <Link to="/auth" className="rounded-full border-2 border-ink bg-coral px-4 py-2 text-sm font-semibold text-cream shadow-[3px_3px_0_var(--ink)] hover:-translate-y-0.5 transition-transform">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-ink/10 px-3 py-2 md:hidden">
        {links.map((l) => {
          const active = pathname === l.to;
          return (
            <Link key={l.to} to={l.to}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs ${
                active ? "bg-ink text-cream" : "text-foreground"
              }`}>
              {l.label}
            </Link>
          );
        })}
        {user ? (
          <button onClick={async () => { await signOut(); nav({ to: "/auth" }); }}
            className="ml-auto whitespace-nowrap rounded-full bg-coral px-3 py-1.5 text-xs font-semibold text-cream">Salir</button>
        ) : (
          <Link to="/auth" className="ml-auto whitespace-nowrap rounded-full bg-coral px-3 py-1.5 text-xs font-semibold text-cream">Entrar</Link>
        )}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl font-bold">Talento STEM<span className="text-coral">.</span></div>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Orientación vocacional honesta para estudiantes y orientadores en Colombia.
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
        © {new Date().getFullYear()} Talento STEM — Hecho para estudiantes y orientadores de Colombia.
      </div>
    </footer>
  );
}
