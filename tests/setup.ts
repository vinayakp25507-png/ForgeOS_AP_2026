import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// This file runs inside every vitest worker BEFORE any test module (and hence
// before the first import of anything that pulls @/lib/db, which constructs
// the PrismaClient against process.env.DATABASE_URL at import time).
//
// CI provides a PostgreSQL DATABASE_URL via a service container. Locally we
// fall back to a Postgres instance on localhost:5432 — adjust .env to point
// at your own DB. The Prisma schema uses the `postgresql` provider.
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://forgeos:forgeos@localhost:5432/forgeos_test'
}
(process.env as Record<string, string>).NODE_ENV = 'test'

// Load required secrets (JWT_SECRET etc.) from .env without overriding
// anything that is already set — most importantly DATABASE_URL above.
const envPath = resolve(process.cwd(), '.env')
try {
  const raw = readFileSync(envPath, 'utf8')
  for (const line of raw.split(/\r?\n/)) {
    const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/.exec(line)
    if (!match) continue
    const [, key, value] = match
    if (process.env[key] === undefined || process.env[key] === '') {
      process.env[key] = value.replace(/^['"]|['"]$/g, '')
    }
  }
} catch {
  // .env is optional for pure unit assertions
}

if (!process.env.JWT_SECRET) {
  // Hermetic fallback so the suite runs green straight after `git clone`
  // (no .env required). CI sets the same value explicitly — see
  // .github/workflows/ci.yml. Test-only; never used by the dev server.
  process.env.JWT_SECRET = 'forgeos-test-only-session-secret-not-for-production'
}

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('tests/setup.ts: JWT_SECRET must be set and at least 32 characters')
}
