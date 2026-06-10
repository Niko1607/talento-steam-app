import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — Talento STEM" },
      { name: "description", content: "Inicia sesión o regístrate para acceder al test vocacional." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  // Role is always 'estudiante' for self-signup. Elevated roles must be assigned by an admin.
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) nav({ to: "/" });
  }, [session, loading, nav]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setBusy(true);
    try {
      if (mode === "signup") {
        if (!fullName.trim() || !institution.trim()) {
          throw new Error("Completa tu nombre y la institución.");
        }
        const { error } = await supabase.auth.signUp({
          email, password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: fullName, institution, role },
          },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (e: any) {
      setErr(e.message ?? "Algo salió mal");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-12">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-warm text-cream shadow-pop border-2 border-ink">
            <Sparkles className="h-4 w-4" />
          </span>
          Talento STEM<span className="text-coral">.</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border-2 border-ink bg-card p-7 shadow-pop">
          <h1 className="font-display text-3xl font-extrabold">
            {mode === "login" ? "Inicia sesión" : "Crea tu cuenta"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login" ? "Accede para hacer el test y ver carreras." : "Regístrate para empezar tu orientación vocacional."}
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            {mode === "signup" && (
              <>
                <Field label="Nombre completo" value={fullName} onChange={setFullName} placeholder="Tu nombre" />
                <Field label="Institución educativa" value={institution} onChange={setInstitution} placeholder="Colegio, instituto o universidad" />
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider">Rol</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["estudiante", "docente", "orientador"] as const).map((r) => (
                      <button type="button" key={r} onClick={() => setRole(r)}
                        className={`rounded-xl border-2 border-ink px-2 py-2 text-xs font-semibold capitalize transition-all ${
                          role === r ? "bg-ink text-cream" : "bg-card hover:bg-sun/30"
                        }`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="tu@correo.com" />
            <Field label="Contraseña" type="password" value={password} onChange={setPassword} placeholder="Mínimo 6 caracteres" />

            {err && <div className="rounded-lg border-2 border-coral/40 bg-coral/10 px-3 py-2 text-sm text-coral">{err}</div>}

            <button disabled={busy} type="submit"
              className="w-full rounded-full border-2 border-ink bg-ink px-5 py-3 font-semibold text-cream shadow-pop transition-transform hover:-translate-y-0.5 disabled:opacity-60">
              {busy ? "..." : mode === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>

          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErr(null); }}
            className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground">
            {mode === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider">{label}</label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} required
        className="w-full rounded-xl border-2 border-ink bg-background px-3 py-2.5 outline-none focus:bg-sun/20"
      />
    </div>
  );
}
