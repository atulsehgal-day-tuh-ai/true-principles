alter table "public"."profiles" drop column "display_name";

alter table "public"."profiles" add column "full_name" text;

CREATE UNIQUE INDEX profiles_email_key ON public.profiles USING btree (email);

alter table "public"."profiles" add constraint "profiles_email_key" UNIQUE using index "profiles_email_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  user_role_input text;
  starting_credits int;
  arch_status text;
BEGIN
  -- 1. Get the role (or default to seeker)
  user_role_input := new.raw_user_meta_data->>'role';
  IF user_role_input IS NULL THEN
      user_role_input := 'seeker';
  END IF;

  -- 2. Set credits based on role
  IF user_role_input = 'seeker' THEN
      starting_credits := 50; 
      arch_status := 'none';
  ELSIF user_role_input = 'architect' THEN
      starting_credits := 0;
      arch_status := 'pending';
  ELSE
      starting_credits := 0; 
      arch_status := 'none';
  END IF;

  -- 3. Insert the profile (SAFE INSERT)
  -- We explicitly use 'public.user_role' to ensure the database finds the type
  INSERT INTO public.profiles (
      id, 
      email, 
      full_name, 
      role, 
      phone_number, 
      stod_credits, 
      architect_status
  )
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    user_role_input::public.user_role,   -- <--- THIS WAS THE BREAKING POINT
    new.raw_user_meta_data->>'phone_number', 
    starting_credits, 
    arch_status
  );
  
  RETURN new;
END;
$function$
;


