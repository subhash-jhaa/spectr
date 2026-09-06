-- Spectr Database Read-Only Access Script for spectr-ai Service
-- This script creates a restricted PostgreSQL role with SELECT-only access
-- to analytics tables required by the "Ask Spectr" RAG assistant.

-- 1. Create the spectr_ai_readonly role with LOGIN capability
-- NOTE: Replace 'YOUR_SECURE_READONLY_PASSWORD_HERE' with a strong generated password before executing.
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'spectr_ai_readonly') THEN
        CREATE ROLE spectr_ai_readonly WITH LOGIN PASSWORD 'YOUR_SECURE_READONLY_PASSWORD_HERE';
    ELSE
        ALTER ROLE spectr_ai_readonly WITH LOGIN PASSWORD 'YOUR_SECURE_READONLY_PASSWORD_HERE';
    END IF;
END
$$;

-- 2. Grant CONNECT permission on the database
GRANT CONNECT ON DATABASE current_database() TO spectr_ai_readonly;

-- 3. Grant USAGE on the public schema
GRANT USAGE ON SCHEMA public TO spectr_ai_readonly;

-- 4. Grant SELECT ONLY on identified analytics tables with feature comments

-- Feature: Site/Project identification, project name lookup, and ownership context
GRANT SELECT ON TABLE public."Project" TO spectr_ai_readonly;

-- Feature: Page views, sessions, unique visitors, traffic sources, referrer breakdown, UTM attributions, and KPI-strip analytics
GRANT SELECT ON TABLE public."Event" TO spectr_ai_readonly;

-- Feature: Core Web Vitals performance analytics (LCP, INP, CLS breakdown by page URL and device type)
GRANT SELECT ON TABLE public."WebVital" TO spectr_ai_readonly;

-- 5. Revoke write privileges on future tables defensively
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLES FROM spectr_ai_readonly;

-- EXPLICITLY EXCLUDED TABLES (Auth / User / Sensitive Data):
-- public."User"              - User profile data and emails (NO ACCESS)
-- public."Account"           - NextAuth provider tokens & secrets (NO ACCESS)
-- public."Session"           - Active user session tokens (NO ACCESS)
-- public."VerificationToken" - Authentication verification tokens (NO ACCESS)
