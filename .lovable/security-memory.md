# Security Memory — Talento STEM

## App
Vocational orientation platform for Colombian students. Auth via Supabase (email/password). Roles: `estudiante`, `docente`, `orientador` stored in `public.profiles.role`.

## Invariants — must never happen
- Self-signup MUST create accounts with `role = 'estudiante'` only. Elevated roles (`docente`, `orientador`) are assigned out-of-band by an admin. The signup form must not expose a role selector, and `handle_new_user()` must hardcode `'estudiante'` instead of reading `raw_user_meta_data->>'role'`.
- RLS must remain enabled on `profiles`, `test_results`, `test_progress`. Staff visibility uses `get_role()` + `same_institution()` and must stay scoped to same institution.

## Scanner guidance — accepted patterns (do not re-flag)
- `same_institution(uuid, uuid)` and `get_role(uuid)` are `SECURITY DEFINER` with fixed `search_path = public` and are intentionally executable by the `authenticated` role: they are called from RLS policies and return only safe scalars (boolean / the caller's own role). Revoking EXECUTE would break RLS. Do not flag as `SUPA_authenticated_security_definer_function_executable`.
- `handle_new_user()` is a `SECURITY DEFINER` trigger on `auth.users`; it is not exposed via the Data API and is expected.
