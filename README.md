# CampusOS Nexus

CampusOS Nexus is an intelligent student collaboration platform that helps university students find complementary teammates, build meaningful projects, and turn demonstrated work into technical portfolio proof.

## Why it exists

Students with strong ideas often lack access to the right collaborators. Existing channels show profiles or source code, but do not understand project needs, collaboration intent, or complementary skills. CampusOS Nexus makes those relationships actionable.

## MVP capabilities

- Capability profiles with skill evidence, interests, and availability
- Project creation with required skills, duration, team size, and lifecycle status
- Explainable weighted teammate recommendations
- Team skill-gap analysis
- Applications, teams, peer reviews, and portfolio records

## Stack

- Frontend: React, TypeScript, Vite
- Backend: Java 21, Spring Boot, Spring Security, JWT, JPA
- Database: PostgreSQL

## Run locally

1. Create the PostgreSQL `campusos` database and apply [database/schema.sql](database/schema.sql).
2. Set `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, and `JWT_SECRET` (a Base64 key of at least 32 bytes).
3. Install packages: `npm install` and `npm --prefix frontend install`.
4. Run `npm run dev`.

The API uses `http://localhost:8080/api`; the Vite frontend runs on `http://localhost:5173`.

## Documentation

- [Architecture and matching model](docs/architecture.md)
- [API guide](docs/api.md)
- [Database schema](database/schema.sql)
