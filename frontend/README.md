# CampusOS Nexus frontend

React, TypeScript, and Vite client for CampusOS Nexus.

## Local development

1. Start the Spring Boot API on port `8080`.
2. Run `npm run dev` from this directory.
3. Open the Vite address shown in the terminal (normally `http://localhost:5173`).

During development, Vite proxies `/api` requests to Spring Boot. This avoids hard-coded localhost URLs in application code.

## Deployment

Run `npm run build` to create the production files in `dist/`. Deploy that directory to any static host. When the API shares the same domain, no configuration is needed. When it is hosted elsewhere, create a `.env` file from `.env.example` and set `VITE_API_BASE_URL` to the full API base URL, including `/api`.

## Quality checks

- `npm run build` — type-check and create the production bundle.
- `npm run lint` — code-quality checks.

The interface supports light, dark, and system themes; persisted preference; responsive navigation and layouts; and reduced-motion preferences.
