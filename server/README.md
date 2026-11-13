# ForgeOS API server

<<<<<<< HEAD
The backend lives in `server/` because the repository already contained the
Prisma service and schema there. The existing schema is the source of truth;
this foundation does not add or replace domain models.
=======
The Express and TypeScript API lives in `server/`. The Prisma schema at
`prisma/schema.prisma` is the source of truth for the PostgreSQL data model.
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7

## Setup

```bash
cp .env.example .env
npm install
npm run db:generate
<<<<<<< HEAD
=======
npm run db:migrate
npm run db:seed
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
```

Set `DATABASE_URL` in `.env` to the PostgreSQL instance from the repository's
Docker setup. `CORS_ORIGIN` should point to the frontend origin.

## Commands

```bash
npm run dev       # development server with reload
npm run build     # compile TypeScript
npm start         # run compiled server
npm run lint      # strict TypeScript check
<<<<<<< HEAD
npm test          # health endpoint tests
npm run db:validate
=======
npm test          # unit tests and opt-in PostgreSQL integration tests
npm run db:validate
npm run db             # migration status
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
```

The API listens on `PORT` and exposes the public health endpoint at
`GET /api/v1/health`. It checks PostgreSQL through Prisma and returns a
degraded response when the database is unavailable.

<<<<<<< HEAD
Authentication, authorization, and Daily Site Operations endpoints are not
implemented in this foundation. They should integrate with the existing
`User`, `Project`, and `DailyLog` Prisma models rather than creating duplicate
models.
=======
Implemented API modules include authentication and user management, lands and
projects, daily site logs and project progress reporting, milestones, materials
and inventory, vendors and project assignments, and bills, payments, and
expense reports. Authenticated endpoints enforce role and project access in
the API; frontend role checks are only for presentation.
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
