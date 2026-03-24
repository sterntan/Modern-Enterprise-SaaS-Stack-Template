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

This template is divided into three interconnected applications. Think of it like a restaurant:
1. **The Public Site (Astro + Sanity):** The storefront and the menu where guests look around and decide to come in.
2. **The Internal App (React + Vite):** The kitchen and management office where the staff operates.
3. **The Backend API (FastAPI + SQLModel):** The central database and rule-engine that ensures orders (data) are securely passed between the storefront, the kitchen, and the vault.

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
*   **Sanity.io (The Headless CMS):** A "Headless CMS" means a content management system without a built-in website (unlike WordPress). In `public-site/schema/`, we use TypeScript to define what a "Product" or "Blog Post" looks like. Sanity reads these files and magically generates an admin dashboard (the **Sanity Studio** located at `http://localhost:4321/studio`). Your content writers log into the Studio, type up a blog post, and click Publisher. Astro then uses an API (GROQ) to download that text and inject it into the HTML.

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
Before running the apps, you need to set up your environment variables. We have provided example files for the backend and public site:
```bash
cp backend/.env.example backend/.env
cp public-site/.env.example public-site/.env
```
*(The defaults will work perfectly out-of-the-box for local SQLite development).*

### 1. Start the Backend API
```bash
cd backend
python -m venv venv
# On Windows: .\venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000 --reload
```
*The API will be available at `http://127.0.0.1:8000` and Swagger docs at `http://127.0.0.1:8000/docs`.*

### 2. Start the Public Site
```bash
cd public-site
npm install

# (Optional) Initialize Sanity to connect the Studio to your cloud account:
# npx sanity init --env

npm run dev
```
*The public site will be available at `http://localhost:4321`. Access the CMS content studio at `http://localhost:4321/studio`.*

### 3. Start the Internal Admin App
```bash
cd internal-app
npm install
npm run dev
```
*The admin dashboard will be available at `http://localhost:5173`.*

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

```bash
# Build and start all three services in one command
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

The public site includes **Sanity Studio** at `http://localhost:4321/studio`. To connect it to a real cloud project:

1. **Create a free Sanity account** at [sanity.io](https://sanity.io)
2. Run in `public-site/`:
   ```bash
   npx sanity login
   npx sanity init --env
   ```
3. This creates a `.env` file with your real `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET`.
4. Restart the public site — the Studio is now connected to your cloud.

> Without an account, the Studio will attempt to load but fail silently. All other pages work fine.

### Why does the Studio need `@astrojs/react`?

The Sanity Studio is a React application embedded inside the Astro site. Astro by default only outputs plain HTML. By adding the `@astrojs/react` integration to `astro.config.mjs`, Astro learns how to compile and render React components — which is what the Studio is made from.

---
