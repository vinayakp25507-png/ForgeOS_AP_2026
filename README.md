# ForgeOS

<<<<<<< HEAD
ForgeOS is a centralized project and financial management platform for builders and real estate developers. Builders get a portfolio view, while managers use operational data entry workflows for progress, tasks, finance, documents, and approvals.

## Top-level folders

- `backend/` - Node.js modular monolith API, integrations, jobs, and ORM-side stubs.
- `frontend/` - React/Next.js App Router application for builder, manager, and shared workflows.
- `database/` - Standalone PostgreSQL migrations, seed data, and the entity relationship diagram.
- `docs/` - Source-document placeholders for architecture, requirements, and database schema.

The files under `backend/src/db/models/` are ORM-side stubs. The files under `database/migrations/` are the real schema; keep both in sync.
=======
ForgeOS is a project and financial management platform for builders and real
estate developers. Administrators manage the portfolio while project managers
use project-scoped site operations and reporting workflows.

## Top-level folders

- `frontend/` - React, TypeScript, and Vite application.
- `server/` - Express and TypeScript API with Prisma.
- `database/` - PostgreSQL Docker configuration and derived SQL documentation.
- `dbms/` - Database coursework deliverables.

`server/prisma/schema.prisma` is the authoritative database schema. Prisma
migrations are maintained in `server/prisma/migrations/`.
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
