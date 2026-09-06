# Read-Only Database Access Role for `spectr-ai`

This document details how to set up, configure, and safely store credentials for the restricted PostgreSQL database role `spectr_ai_readonly` used by the `spectr-ai` microservice.

---

## 1. Identified Analytics Tables

Based on `prisma/schema.prisma`, the `spectr-ai` service only requires access to the following 3 analytics tables:

| Model Name | PostgreSQL Table Name | Description / Features Powered |
| :--- | :--- | :--- |
| `Project` | `"Project"` | Sites & projects metadata, names, and ID lookups |
| `Event` | `"Event"` | Page views, unique visitors, sessions, traffic sources, referrers, UTM parameters, and KPI metrics |
| `WebVital` | `"WebVital"` | Core Web Vitals performance analytics (LCP, INP, CLS by device & page URL) |

### Explicitly Excluded Tables (No Access):
- `"User"` (User profile data & emails)
- `"Account"` (OAuth access/refresh tokens)
- `"Session"` (Active session tokens)
- `"VerificationToken"` (NextAuth tokens)

---

## 2. Generating & Storing the Password Safely

1. **Generate a Strong Random Password**:
   Generate a high-entropy password using `openssl` or PowerShell:
   ```bash
   openssl rand -base64 24
   ```
   *or in PowerShell:*
   ```powershell
   -join ((33..126) | Get-Random -Count 32 | ForEach-Object {[char]$_})
   ```

2. **Replace Placeholder in Script**:
   Before running `create_ai_readonly_role.sql`, replace `'YOUR_SECURE_READONLY_PASSWORD_HERE'` with your generated password.

3. **Store in `spectr-ai/.env`**:
   Add the read-only connection string to your `spectr-ai` environment file (do **NOT** commit `.env` to version control):
   ```env
   DATABASE_URL_READONLY=postgresql://spectr_ai_readonly:<YOUR_GENERATED_PASSWORD>@<DB_HOST>:5432/<DB_NAME>?sslmode=require
   ```

---

## 3. Execution Instructions against Production DB

### Option A: Using `psql` CLI
Run the script using the database owner connection string or administrator user:
```bash
psql "$DATABASE_URL" -f create_ai_readonly_role.sql
```

### Option B: Supabase SQL Editor
1. Log in to your Supabase Dashboard.
2. Navigate to **SQL Editor**.
3. Paste the contents of `create_ai_readonly_role.sql` (with the placeholder replaced).
4. Click **Run**.

### Option C: Neon Console
1. Log in to the Neon Console and select your project.
2. Go to **SQL Editor**.
3. Paste `create_ai_readonly_role.sql` and execute the query.

---

## 4. Verification

After executing the script, verify that the read-only role can select from `Project`, `Event`, and `WebVital`, but is forbidden from selecting from `User` or modifying data:

```sql
-- Connect as spectr_ai_readonly and run:
SELECT COUNT(*) FROM public."Project";  -- Should succeed
SELECT COUNT(*) FROM public."Event";    -- Should succeed
SELECT COUNT(*) FROM public."User";     -- Must FAIL with ERROR: permission denied
```

---

## 5. Security Mandate

> [!CAUTION]
> **CRITICAL SECURITY REQUIREMENT**: The `spectr_ai_readonly` role must NEVER be granted write access (`INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, `TRUNCATE`), even temporarily for debugging.
