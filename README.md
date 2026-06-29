# Notes App — Ensolvers Challenge

A simple full-stack note-taking web application built as a Single Page Application (SPA). It allows users to create, edit, delete and archive notes, as well as add and remove categories and filter notes by category.

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS
- **Backend:** NestJS 11 + TypeScript + TypeORM + SQLite

Note: SQLite was chosen to simplify setup and allow the application to run with a single command without requiring external services.

## Deploy

Live deploy was not performed due to repository permission limitations (repository belongs to Ensolvers organization). The application can be run locally using the `start.sh` script.

## Requirements

Make sure you have the following installed:

| Tool    | Version |
| ------- | ------- |
| Node.js | 22.14.0 |
| npm     | 11.17.0 |

## How to run

1. Clone the repository:

```bash
git clone https://github.com/hirelens-challenges/Rodriguez-96ad40
cd Rodriguez-96ad40
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

Structured in layers:

- **Controllers** — handle HTTP requests
- **Services** — business logic
- **Entities** — database models via TypeORM

### Frontend — React SPA

- `src/api/` — all backend calls (Axios)
- `src/components/` — reusable UI components
- `src/types/` — TypeScript interfaces

## Features

### Phase 1

- Create, edit and delete notes
- Archive and unarchive notes
- View active notes
- View archived notes

### Phase 2

- Add and remove categories from notes
- Filter notes by category

## URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
