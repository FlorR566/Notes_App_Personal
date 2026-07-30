# Notes App - Full Stack Application

A simple full-stack note-taking web application built as a Single Page Application (SPA). It allows users to create, edit, delete and archive notes, as well as manage categories and filter notes by category.

Users can securely register, authenticate, and manage their own notes through a JWT-based authentication system.
This project was originally developed as part of a technical challenge and later extended with additional features.

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS
- **Backend:** NestJS 11 + TypeScript + TypeORM

**Database:**
The application automatically selects the database based on the environment:

- **Local:** SQLite (chosen to simplify setup, no external services required)
- **Production:** PostgreSQL (hosted on Supabase)

## Deploy

- **Frontend:** [Vercel Deployment](https://notes-app-2026.vercel.app)
- **Backend:** [Render API](https://notes-app-personal.onrender.com)
- To run locally instead, use the `start.sh` script or Docker — see [How to run](#how-to-run) bellow.

## Requirements

Make sure you have the following installed:

| Tool    | Version |
| ------- | ------- |
| Node.js | 22.14.0 |
| npm     | 11.17.0 |

Or, to run with Docker instead:

| Tool           | Version |
| -------------- | ------- |
| Docker         | Latest  |
| Docker Compose | Latest  |

## How to run

### Option A - Without Docker

1. Clone the repository:

```bash
git clone https://github.com/FlorR566/Notes_App_Personal
cd Notes_App_Personal
```

2. Configure Environment Variables:
   Copy the .env.example file in the backend folder to .env:

```bash
cp backend/.env.example backend/.env
```

> **Note:** The backend requires a `.env` file to run locally. Make sure to copy `.env.example` to `.env` before running the script.

3.  Run the application (Linux/macOS):

```bash
chmod +x start.sh
./start.sh
```

This script will:

- Verify that Node.js and npm are installed
- Install all dependencies for both frontend and backend
- Start the backend on `http://localhost:3000`
- Start the frontend on `http://localhost:5173`

> Note: This script is intended for Linux/macOS environments.

### Option B - With Docker (recommended for a quick try)

No need to install Node.js, npm, or any dependency - just Docker.

```bash
git clone https://github.com/FlorR566/Notes_App_Personal
cd Notes_App_Personal
docker compose up
```

This pulls the pre-built images from Docker Hub and starts both services:

- Frontend: `http://localhost:5173`
- Backend API: proxied internally through the frontend at `/api` (same setup used in production, Vercel → Render)
  The app uses SQLite inside the container, so no external database setup is required. Data persists across restarts via a Docker volume, but resets if you run `docker compose down -v`.

Images are built and published automatically to Docker Hub on every push to `main` via GitHub Actions (`.github/workflows/docker-publish.yml`).

## Architecture

### Backend — NestJS

Structured in modules:

- Auth Module
- Users Module
- Notes Module
- Categories Module

Each module follows the NestJS architecture:

- **Controllers** — handle HTTP requests
- **Services** — business logic
- **Entities** — database models via TypeORM

### Frontend — React SPA

Main folders:

- `src/api/` — all backend calls (Axios API clients)
- `src/components/` — reusable UI components
- `src/context/` — authentication context and state management
- `src/pages/` — application pages
- `src/types/` — shared TypeScript interfaces and types

## Features

### Phase 1

- Create, edit and delete notes
- Archive and unarchive notes
- View active notes
- View archived notes

### Phase 2

- Add and remove categories from notes
- Filter notes by category

### Authentication

- User registration
- User login and logout
- JWT authentication
- Refresh token support
- Protected API routes
- User-specific note access

### Multi-user Support

Each user can:

- Create personal notes
- Organize personal notes with categories
- View only their own notes
- Filter notes by category
- Archive and restore their own notes

Ownership validation is enforced on the backend.

### Security

- JWT authentication using access and refresh tokens
- HTTP-only cookies
- Protected API routes
- User ownership validation
- Rate limiting with NestJS Throttler
- CORS configuration allowing only approved frontend origins
