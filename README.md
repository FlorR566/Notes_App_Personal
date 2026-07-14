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

- To run locally instead, use the `start.sh` script — see [How to run](#how-to-run) section for instructions.

## Requirements

Make sure you have the following installed:

| Tool    | Version |
| ------- | ------- |
| Node.js | 22.14.0 |
| npm     | 11.17.0 |

## How to run

1. Clone the repository:

```bash
git clone https://github.com/FlorR566/Notes_App_Personal
cd Notes_App_Personal
```

2. Run the application (Linux/macOS):

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



