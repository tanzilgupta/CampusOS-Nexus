# CampusOS Nexus — Production Deployment Guide

This guide details how to deploy CampusOS Nexus to run live on the web with real users, live database, and production configuration.

---

## Architecture Overview

* **Frontend**: React 19 + TypeScript + Vite + TailwindCSS (Static Site on Vercel, Netlify, or Render)
* **Backend**: Spring Boot 3 + Java 21 (Docker container on Render, Railway, or Fly.io)
* **Database**: Managed PostgreSQL (Render Postgres, Supabase, Neon, or Railway)

---

## Option 1: 1-Click Blueprint via Render (Easiest - All in One)

We have provided a ready-to-use [`render.yaml`](../render.yaml) file in the root of the project.

1. Create a free account at [render.com](https://render.com).
2. Go to **Blueprints** > click **New Blueprint Instance**.
3. Connect your GitHub repository: `https://github.com/tanzilgupta/CampusOS-Nexus`.
4. Render will automatically read `render.yaml` and provision:
   * **campusos-db**: Free managed PostgreSQL database.
   * **campusos-backend**: Spring Boot Docker Web Service connected to the database.
   * **campusos-frontend**: High-performance static web app connected to your backend.
5. Click **Apply**. In a few minutes, your entire platform is live!

---

## Option 2: Vercel (Frontend) + Render / Neon (Backend & Database)

### 1. Database (Neon or Supabase)
1. Sign up at [neon.tech](https://neon.tech) or [supabase.com](https://supabase.com).
2. Create a free PostgreSQL database named `campusos`.
3. Copy your database connection URL (e.g., `jdbc:postgresql://ep-xyz.us-east-2.aws.neon.tech/campusos`).

### 2. Backend (Render Web Service)
1. Go to [render.com](https://render.com) > **New** > **Web Service**.
2. Connect `https://github.com/tanzilgupta/CampusOS-Nexus`.
3. Choose **Docker** environment (it automatically detects [`backend/Dockerfile`](../backend/Dockerfile)).
4. Set **Root Directory** to `backend`.
5. Add Environment Variables:
   * `DB_URL`: Your PostgreSQL JDBC URL
   * `DB_USERNAME`: Your DB user
   * `DB_PASSWORD`: Your DB password
   * `JWT_SECRET`: A secure 256-bit base64 key
6. Click **Deploy**. Note down your backend URL (e.g., `https://campusos-backend.onrender.com`).

### 3. Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com) > **Add New Project**.
2. Import `https://github.com/tanzilgupta/CampusOS-Nexus`.
3. Set **Root Directory** to `frontend`.
4. Framework Preset: **Vite**.
5. Add Environment Variable:
   * `VITE_API_BASE_URL`: `https://campusos-backend.onrender.com` (your backend URL from step 2).
6. Click **Deploy**. Vercel builds the site in seconds with global edge CDN!

---

## Database Schema Initialization

The backend is configured with `spring.jpa.hibernate.ddl-auto=update`, which automatically generates all required tables on startup. If you wish to pre-populate or verify the schema, run the script provided in [`database/schema.sql`](../database/schema.sql).
