# API Guide

Base URL: `http://localhost:8080/api`. Protected endpoints require `Authorization: Bearer <token>`.

| Area | Endpoints |
|---|---|
| Authentication | `POST /auth/register`, `POST /auth/login` |
| Profile | `GET`, `POST`, `PUT`, `DELETE /profile` |
| Skills | `GET /skills`, `GET|POST /skills/{userId}`, `DELETE /skills/{studentSkillId}` |
| Projects | `GET /projects`, `GET /projects/{id}`, `POST /projects`, `PUT|DELETE /projects/{id}` |
| Matching | `GET /matching/project/{projectId}` (project owner) |
| Teams | `GET|POST /teams`, `GET|PUT|DELETE /teams/{id}`, `GET /teams/{id}/gap-analysis` |
| Applications | `POST /applications/project/{projectId}/user/{userId}`, `GET /applications/project/{projectId}` |
| Portfolio | `GET|POST|PUT|DELETE /portfolio/{userId}` |

## Important security rule

New project creation uses the authenticated JWT identity. The server does not accept an owner ID from the browser.
