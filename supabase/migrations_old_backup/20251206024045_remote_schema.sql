create extension if not exists "vector" with schema "public";


  create table "public"."principles" (
    "id" uuid not null default gen_random_uuid(),
    "submission_id" uuid,
    "title" text not null,
    "definition" text not null,
    "embedding" public.vector(384),
    "version" integer default 1,
    "is_active" boolean default true,
    "created_at" timestamp with time zone default timezone('utc'::text, now())
      );


alter table "public"."principles" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null,
    "username" text,
    "role" text default 'seeker'::text,
    "reputation_score" integer default 0,
    "created_at" timestamp with time zone default timezone('utc'::text, now())
      );


alter table "public"."profiles" enable row level security;


  create table "public"."submissions" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "title" text not null,
    "file_url" text,
    "status" text default 'proposal'::text,
    "admin_notes" text,
    "created_at" timestamp with time zone default timezone('utc'::text, now())
      );


alter table "public"."submissions" enable row level security;

CREATE UNIQUE INDEX principles_pkey ON public.principles USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX submissions_pkey ON public.submissions USING btree (id);

alter table "public"."principles" add constraint "principles_pkey" PRIMARY KEY using index "principles_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."submissions" add constraint "submissions_pkey" PRIMARY KEY using index "submissions_pkey";

alter table "public"."principles" add constraint "principles_submission_id_fkey" FOREIGN KEY (submission_id) REFERENCES public.submissions(id) not valid;

alter table "public"."principles" validate constraint "principles_submission_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_role_check" CHECK ((role = ANY (ARRAY['seeker'::text, 'learner'::text, 'practitioner'::text, 'architect'::text, 'admin'::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_role_check";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."submissions" add constraint "submissions_status_check" CHECK ((status = ANY (ARRAY['proposal'::text, 'curation'::text, 'qualified'::text, 'video'::text, 'qa'::text, 'live'::text]))) not valid;

alter table "public"."submissions" validate constraint "submissions_status_check";

alter table "public"."submissions" add constraint "submissions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) not valid;

alter table "public"."submissions" validate constraint "submissions_user_id_fkey";

grant delete on table "public"."principles" to "anon";

grant insert on table "public"."principles" to "anon";

grant references on table "public"."principles" to "anon";

grant select on table "public"."principles" to "anon";

grant trigger on table "public"."principles" to "anon";

grant truncate on table "public"."principles" to "anon";

grant update on table "public"."principles" to "anon";

grant delete on table "public"."principles" to "authenticated";

grant insert on table "public"."principles" to "authenticated";

grant references on table "public"."principles" to "authenticated";

grant select on table "public"."principles" to "authenticated";

grant trigger on table "public"."principles" to "authenticated";

grant truncate on table "public"."principles" to "authenticated";

grant update on table "public"."principles" to "authenticated";

grant delete on table "public"."principles" to "service_role";

grant insert on table "public"."principles" to "service_role";

grant references on table "public"."principles" to "service_role";

grant select on table "public"."principles" to "service_role";

grant trigger on table "public"."principles" to "service_role";

grant truncate on table "public"."principles" to "service_role";

grant update on table "public"."principles" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."submissions" to "anon";

grant insert on table "public"."submissions" to "anon";

grant references on table "public"."submissions" to "anon";

grant select on table "public"."submissions" to "anon";

grant trigger on table "public"."submissions" to "anon";

grant truncate on table "public"."submissions" to "anon";

grant update on table "public"."submissions" to "anon";

grant delete on table "public"."submissions" to "authenticated";

grant insert on table "public"."submissions" to "authenticated";

grant references on table "public"."submissions" to "authenticated";

grant select on table "public"."submissions" to "authenticated";

grant trigger on table "public"."submissions" to "authenticated";

grant truncate on table "public"."submissions" to "authenticated";

grant update on table "public"."submissions" to "authenticated";

grant delete on table "public"."submissions" to "service_role";

grant insert on table "public"."submissions" to "service_role";

grant references on table "public"."submissions" to "service_role";

grant select on table "public"."submissions" to "service_role";

grant trigger on table "public"."submissions" to "service_role";

grant truncate on table "public"."submissions" to "service_role";

grant update on table "public"."submissions" to "service_role";


  create policy "Public view active principles"
  on "public"."principles"
  as permissive
  for select
  to public
using ((is_active = true));



  create policy "User view own submissions"
  on "public"."submissions"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



