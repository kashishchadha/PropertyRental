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

## Run with Docker

```bash
docker compose up --build
```

API: http://localhost:5000
MySQL host port: 3307

## API Prefix

All API routes are under:

```text
/api/v1
```
