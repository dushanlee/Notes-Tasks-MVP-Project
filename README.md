# Notes & Tasks MVP Project

Welcome to the Notes & Tasks MVP! This is a full-stack productivity app for managing notes and tasks, built with FastAPI (Python) for the backend and React (TypeScript, Vite) for the frontend. It features a modern UI, search, dashboard stats, and persistent storage with PostgreSQL.

---

## Table of Contents

- [Features](#features)
- [File & Folder Structure](#file--folder-structure)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Authors and Acknowledgment](#authors-and-acknowledgment)

---

## Features

### Notes

- Create, view, update, and delete notes
- **Bulk select and delete multiple notes at once**
- Search notes by title or content
- Track creation and last update timestamps

### Tasks

- Create, view, update, and delete tasks
- **Bulk select and delete multiple notes or tasks at once**
- Assign due dates and automatically mark overdue tasks as late
- Track task status (pending, complete, late)
- Search tasks by title or description

### Dashboard

- View total notes and tasks
- See counts of pending, completed, and late tasks
- Recent activity (last 5 notes and tasks)

---

## File & Folder Structure

```
notes-task-mvp-unit-project/
│
├── backend/                # FastAPI backend (Python)
│   ├── db.py               # DB session, CRUD logic
│   ├── db_models.py        # SQLAlchemy models for notes & tasks
│   ├── main.py             # FastAPI app, API routes
│   ├── schemas.py          # Pydantic schemas for validation
│   ├── docker-compose.yml  # PostgreSQL container config
│   ├── requirements.txt    # Python dependencies
│   ├── pyproject.toml      # Python project config
│   └── data/
│       └── schema.sql      # SQL schema for DB tables
│
├── frontend/               # React frontend (TypeScript, Vite)
│   ├── index.html          # Main HTML entry
│   ├── package.json        # NPM dependencies
│   ├── vite.config.ts      # Vite config
│   ├── public/             # Static assets
│   └── src/
│       ├── App.tsx         # App root
│       ├── main.tsx        # Entry point
│       ├── Layout.tsx      # App layout
│       ├── components/     # UI components (NoteCard, TaskCard, etc.)
│       ├── pages/          # Page components (Dashboard, Notes, Tasks, etc.)
│       ├── connections/    # API connection logic
│       ├── context/        # (Theme context, not implemented)
│       ├── hooks/          # (Custom hooks, not implemented)
│       └── assets/         # Images, icons
│
└── README.md               # This file
```

---

## Tech Stack

**Backend:**

- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL (via Docker)
- Pydantic (schema validation)

**Frontend:**

- React (TypeScript, Vite)
- React Router (TypeScript)
- TailwindCSS

---

## Project Architecture

```
Frontend (React + Vite)  →  Backend (FastAPI)  →  Database (PostgreSQL via Docker)
```

---

## Setup Instructions

git clone <your-repo-url>

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd notes-task-mvp-unit-project
```

### 2. Backend Setup (FastAPI + PostgreSQL)

Navigate to the backend folder:

```bash
# Move into the backend folder
cd backend
```

Start PostgreSQL with Docker:

```bash
# This will start the PostgreSQL container in the background (-d = detached mode)
docker compose up -d
```

Create the database and load the schema:

```bash
# Open an interactive psql shell inside the container
docker exec -it postgres_db psql -U postgres
# Inside the psql shell, run if it doesn't exist:
CREATE DATABASE notes_and_tasks;
# Connect to the new or existing database
\c notes_and_tasks
# Load the schema.sql file (this assumes your file is in ./data/schema.sql)
\i /data/schema.sql
# Exit the psql shell
\q
```

Create a virtual environment and install dependencies:

```bash
# Create a virtual environment
python -m venv venv
# Activate the virtual environment
source venv/bin/activate   # On Mac/Linux
venv\Scripts\activate      # On Windows (PowerShell)
# Upgrade pip and install dependencies
python -m pip install --upgrade pip
python -m pip install "fastapi[standard]" psycopg sqlalchemy
```

Run the backend:

```bash
fastapi dev main.py
```

The backend will run at: http://localhost:8000

### 3. Frontend Setup (React + Vite)

Open a new terminal and navigate to the frontend folder:

```bash
# Open a new terminal window
cd frontend
```

Install dependencies:

```bash
# Install all npm packages defined in package.json
npm install
```

Run the frontend:

```bash
# Start the React development server
npm run dev
```

The frontend will run on http://localhost:5173

---

## API Endpoints

### Notes

- `POST   /api/notes` — Create a note
- `GET    /api/notes` — List all notes
- `GET    /api/notes/{id}` — Get a specific note
- `PUT    /api/notes/{id}` — Update a note
- `DELETE /api/notes/{id}` — Delete a note
- `GET    /api/notes/query?query=searchTerm` — Search notes

### Tasks

- `POST   /api/tasks` — Create a task
- `GET    /api/tasks` — List all tasks
- `GET    /api/tasks/{id}` — Get a specific task
- `PUT    /api/tasks/{id}` — Update a task
- `DELETE /api/tasks/{id}` — Delete a task
- `GET    /api/tasks/query?query=searchTerm` — Search tasks

### Dashboard

- `GET /api/dashboard/stats` — Summary of notes & tasks
- `GET /api/dashboard/recent` — Recent notes & tasks

---

## Usage

1. Open the frontend in your browser: [http://localhost:5173](http://localhost:5173)
2. Use the sidebar to navigate between Dashboard, Notes, and Tasks.
3. Create notes and tasks using the forms. Edit or delete from the detail pages.
4. **To delete multiple notes or tasks at once:**
   - Use the checkboxes in the Notes or Tasks list to select items.
   - Use the "Select All" checkbox to select everything on the page.
   - Click the "Delete Selected" button to remove all selected items in one action.
5. Use the search bar to filter notes or tasks by title/content/description.
6. View stats and recent activity on the dashboard.

---

## Roadmap

- Add user authentication (multi-user support with JWT)
- Add folders or tags to organize notes/tasks
- Improve dashboard UI with charts/visuals
- Add dark mode/theme support
- Add mobile responsiveness

---

## Authors and Acknowledgment

Developed by Dushan (Michael) Lee as part of the Hack Reactor software engineering bootcamp.
Thanks to Bart Dorsey (Hack Reactor Instructor) for guidance and feedback.

---

## Additional Notes

- The `frontend/src/context` and `frontend/src/hooks` folders are present for future expansion (e.g., theming, custom hooks) but are not currently implemented.
- All navigation uses `react-router` (not `react-router-dom`).
- The app is styled with TailwindCSS for a clean, modern look.
- PostgreSQL is managed via Docker for easy local development.
- For any issues, please open an issue or contact the author.
