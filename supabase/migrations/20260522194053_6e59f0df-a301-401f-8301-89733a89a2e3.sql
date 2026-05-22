
REVOKE EXECUTE ON FUNCTION public.same_institution(uuid, uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_role(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.same_institution(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_role(uuid) TO authenticated;
