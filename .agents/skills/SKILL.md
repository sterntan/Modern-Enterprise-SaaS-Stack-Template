---
name: GraphWeave Architecture Guidelines
description: Architectural rules and constraints for the GraphWeave project
---

# GraphWeave Architecture Rules

## Backend (FastAPI)
- Use **FastAPI** as the core web framework.
- Use **SQLModel** for database ORM and migrations via **Alembic**.
- Manage environment variables using **pydantic-settings**. Ensure `Settings` models read from `/backend/.env`.
- All dependencies must be strictly tracked in `/backend/requirements.txt`.

## Public Site (Astro)
- Use **Astro** for the public-facing website.
- Environment variables exposed to the client must utilize the `PUBLIC_` prefix (e.g., `PUBLIC_API_URL`).
- Variables are defined in `/public-site/.env`.

## Internal App (React / Vite)
- Use **React** with **Vite** for the internal Single Page Application.
- Environment variables exposed to the client must utilize the `VITE_` prefix (e.g., `VITE_API_URL`).
- Variables are defined in `/internal-app/.env`.