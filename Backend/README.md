# Property Rental Backend

Production-style Node.js backend using Express, MySQL, JWT, bcrypt, and Docker.

## Features

- MVC-style structure with module-based routes/controllers/services.
- JWT authentication and role-based authorization.
- Property CRUD (owner/admin managed).
- Booking creation with overlap validation.
- Payment tracking tied to bookings.
- Maintenance request lifecycle with status transition rules.
- Reviews restricted to completed bookings.
- Centralized validation and error handling.

## Run Locally

1. Create env file:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Start server (dev):

```bash
npm run dev
```

4. Health check:

```bash
GET http://localhost:5000/health
```

## Run with Docker (full stack)

From the **repository root** (not this folder):

1. Use your existing **`Backend/.env`** (same as local dev). Add **`MYSQL_ROOT_PASSWORD`** (any strong value) — required for the MySQL container.
2. Run (so Compose can read `DB_PASSWORD` and `MYSQL_ROOT_PASSWORD` for MySQL):

```bash
docker compose --env-file Backend/.env up --build
```

- App (nginx + React): http://localhost  
- API (direct): http://localhost:5000 (overrides `PORT` from `Backend/.env` to `5000` inside Docker)  
- MySQL from host: `localhost:3307` (`DB_PORT` in `Backend/.env` is ignored inside Docker; the API uses `3306` against the `mysql` service)

## API Prefix

All API routes are under:

```text
/api/v1
```
