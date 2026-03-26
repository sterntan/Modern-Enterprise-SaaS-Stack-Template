# Modern Enterprise SaaS Stack Template

![SaaS Stack Hero](https://via.placeholder.com/1200x400.png?text=Modern+Enterprise+SaaS+Stack)

Welcome to the **Modern Enterprise SaaS Stack**! This repository provides a fully integrated, cloud-native starter kit for building robust, scalable applications. 

If you are a non-familiar developer trying to understand how this platform works, this README is for you. We've broken down exactly what every library does and how the three main parts of this project communicate.

---

## 🔑 Demo Credentials

Two accounts are seeded automatically every time the backend starts up — no setup required.

| Role | Username | Password | Redirects to |
|------|----------|----------|--------------|
| **Admin** | `admin` | `admin` | `http://localhost:5173/admin` |
| **User** | `user` | `user` | `http://localhost:5173/user` |

> Login at **`http://localhost:4321/login`** — credentials are pre-filled.

---


## 🏛️ The Architecture: How It All Works Together

This template is divided into **four** interconnected applications:
1. **The Public Site (`public-site/` — Astro):** The storefront where guests browse. Blazing fast, server-side rendered.
2. **The CMS Studio (`studio/` — Sanity):** The content editor's workspace. Runs independently and can be deployed to Sanity Cloud with one command.
3. **The Internal App (`internal-app/` — React):** The admin and user dashboard for authenticated users.
4. **The Backend API (`backend/` — FastAPI):** The central data engine. Both frontends talk to this to save or fetch information.

---

### 1. `backend/` (The Central API)
This is the single source of truth for your application's data. Both frontends talk to this backend to save or fetch information.

*   **FastAPI (Python):** The core web framework. It receives HTTP requests (like "Create a new user" or "Get my metrics") and routes them to the correct Python function. It is incredibly fast and automatically generates interactive documentation (`/docs`).
*   **SQLModel & SQLAlchemy:** These are ORMs (Object-Relational Mappers). Instead of writing raw SQL queries (`SELECT * FROM users`), you write Python classes. SQLModel translates your Python class (`class User(SQLModel):`) into a real database table.
*   **Alembic:** The database migration tool. If you add a new column to your `User` class (like `phone_number`), Alembic acts like version control for your database, safely upgrading the live PostgreSQL or SQLite database to match your new code.
*   **pydantic-settings:** Reads the hidden `.env` files (like your database password) so they are securely loaded into the code without being exposed in Git.

### 2. `public-site/` (The Public Storefront)
This is a blazing fast, SEO-optimized public website. Its goal is to load instantly for Google and for your potential customers.

*   **Astro:** A modern web framework designed for content-heavy sites. It takes your code and renders it into pure HTML/CSS *on the server* before sending it to the browser. This means the user gets a fully painted website instantly without waiting for heavy JavaScript to load.
*   **@sanity/client:** Used to **read** content from your Sanity cloud project via their API (GROQ). The Astro site is now a pure consumer — it fetches data, but no longer hosts the Studio.

### 3. `studio/` (The CMS Admin Studio)
A fully standalone Sanity Studio for managing your content. It is completely decoupled from the Astro site.

*   **Why standalone?** Embedding a full React app (the Studio) inside an Astro SSR server creates complex build conflicts. A separate package is simpler, faster to build, and can be deployed with `sanity deploy` directly to Sanity's free managed hosting — no extra server required.
*   **Schemas:** All your content types (`page.ts`, `product.ts`) are defined in `studio/schema/` using TypeScript and are independently managed here.

### 3. `internal-app/` (The Admin Workspace)
A secure, interactive dashboard for your authenticated users (Admins, Staff).

*   **React:** A UI library that builds applications entirely in the user's browser (Client-Side Rendering). Because the admin dashboard requires heavy interactivity (clicking tabs, sorting tables, opening modals), React is perfect. 
*   **Vite:** The build tool. It takes your raw React code and bundles it incredibly fast so the browser can understand it.
*   **shadcn/ui & Tailwind CSS:** Tailwind allows you to style elements directly in the HTML (`className="text-white bg-blue-500"`). Shadcn provides pre-built, beautiful components (like Buttons, Tables, and Dropdowns) built on top of Tailwind so you don't have to design them from scratch.
*   **React Router:** Handles the URL changes. When you click "Accounts", React Router swaps the page content instantly without forcing the browser to reload.

---

## 🚀 Getting Started

Follow these steps to spin up the entire stack locally.

### 0. Environment Setup
```bash
# Copy the example .env files for each service
cp backend/.env.example backend/.env
cp public-site/.env.example public-site/.env
cp studio/.env.example studio/.env
```
*(Defaults work as-is for local development. Edit `studio/.env` once you have a real Sanity project.)*

### 1. Start the Backend API
```bash
cd backend
python -m venv venv
# On Windows: .\venv\Scripts\activate | On Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000 --reload
```
*API at `http://127.0.0.1:8000` — Swagger docs at `http://127.0.0.1:8000/docs`.*

### 2. Start the Public Site
```bash
cd public-site && npm install && npm run dev
```
*Public site at `http://localhost:4321`.*

### 3. Start the Internal Admin App
```bash
cd internal-app && npm install && npm run dev
```
*Admin dashboard at `http://localhost:5173`.*

### 4. Start the CMS Studio (optional, for content editing)
```bash
cd studio && npm install && npm run dev
```
*Sanity Studio at `http://localhost:3333` — requires a connected Sanity project (see below).*

---

## 🧩 How Data Flows (Example Workflow)

1.  **A visitor goes to `/signup` on the Astro Public Site.** The Astro page loads a simple HTML form.
2.  **The visitor hits submit.** A small piece of JavaScript intercepts the click and makes a `POST` request to `http://127.0.0.1:8000/users/`.
3.  **The FastAPI Backend receives it.** It uses SQLModel to save the new user into the SQLite database.
4.  **An Admin opens the React Internal App.** They navigate to `/admin/accounts`. The React app runs a `fetch()` request to `http://127.0.0.1:8000/api/users`.
5.  **The Data Appears.** FastAPI grabs the newly created user from the database and sends it back to React, which updates the UI table instantly.

---

## 🐳 Running with Docker (Production)

The entire stack is Dockerized with a single `docker-compose.yml` at the root.

Because Docker runs securely in an isolated environment, the `docker compose` command itself cannot physically open a browser window on your computer.

**To automatically open the web interfaces immediately after starting**, run the provided startup scripts:

```bash
# On Windows
.\start.bat

# On Mac / Linux
./start.sh
```

Or start manually through Docker alone:
```bash
docker compose up --build
```

| URL | Service |
|-----|---------|
| `http://localhost:8000` | FastAPI Backend + Swagger Docs at `/docs` |
| `http://localhost:4321` | Public Site (Astro + Sanity CMS) |
| `http://localhost:5173` | Admin Dashboard (React → served by nginx) |

> The backend data is persisted in a named Docker volume (`backend_data`) so your SQLite database survives container restarts.

To run in the background:
```bash
docker compose up -d
docker compose logs -f   # stream logs
docker compose down       # stop everything
```

---

## 🎨 Setting Up Sanity Studio (CMS)

The standalone Studio lives in **`/studio`** and connects directly to Sanity Cloud.

### Connect to a Sanity Project
1. **Create a free account** at [sanity.io](https://sanity.io)
2. Run inside `studio/`:
   ```bash
   npm install
   npx sanity login
   npx sanity init --env   # auto-generates studio/.env with your project ID
   npm run dev             # studio opens at http://localhost:3333
   ```

### Deploy to Sanity Cloud (free)
```bash
cd studio && sanity deploy
# → your studio is live at https://your-project.sanity.studio/
```

### Why standalone instead of embedded in Astro?
Hosting the Studio inside Astro's SSR engine creates complex build-time conflicts that cause 500 errors. The standalone approach eliminates those, shrinks the Astro Docker image significantly, and enables free cloud deployment via `sanity deploy`.

---
