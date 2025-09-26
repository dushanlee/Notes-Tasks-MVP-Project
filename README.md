# Notes & Tasks MVP Project

Welcome to the Notes & Tasks MVP! This is a full-stack productivity app for managing notes and tasks, built with FastAPI (Python) for the backend and React (TypeScript, Vite) for the frontend. It features a modern UI, search, dashboard stats, and persistent storage with PostgreSQL (via Docker). The project is fully typed, uses best practices for both Python and TypeScript, and is ready for local development.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Setup & Initialization](#setup--initialization)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Development Tips](#development-tips)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Authors and Acknowledgment](#authors-and-acknowledgment)

---

## Features

### Notes

- Create, view, update, and delete notes
- Bulk select and delete multiple notes at once
- Search notes by title or content
- Track creation and last update timestamps

### Tasks

- Create, view, update, and delete tasks
- Bulk select and delete multiple notes or tasks at once
- Assign due dates and automatically mark overdue tasks as late
- Track task status (pending, complete, late)
- Search tasks by title or description

### Dashboard

- View total notes and tasks
- See counts of pending, completed, and late tasks
- Recent activity (last 5 notes and tasks)

---

## Project Structure

```
Notes-Tasks-MVP-Project/
│
├── backend/                # FastAPI backend (Python)
│   ├── venv/               # Python virtual environment (not in version control)
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
│   ├── node_modules/       # Node.js dependencies (not in version control)
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
├── .vscode/                # VS Code workspace settings (recommended)
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

## Setup & Initialization

### Prerequisites

- Python 3.x
- Node.js and npm
- Docker (for PostgreSQL)
- Git

---

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Notes-Tasks-MVP-Project
```

---

### 2. Backend Setup (FastAPI + PostgreSQL)

```bash
# Move into the backend directory
cd backend

# Create a Python virtual environment
python -m venv venv

# Activate the virtual environment
source venv/bin/activate   # On Mac/Linux
# venv\Scripts\activate    # On Windows (PowerShell)

# Upgrade pip and install all dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Start PostgreSQL with Docker
docker compose up -d

# (Optional, usually not needed) Load schema if not auto-created:
docker exec -it postgres_db psql -U postgres -d notes_and_tasks -f /data/schema.sql

# Start the FastAPI backend server
fastapi dev main.py
```

The backend will run at: [http://localhost:8000](http://localhost:8000)

---

### 3. Frontend Setup (React + Vite)

```bash
# Open a new terminal window/tab
cd frontend

# Install Node.js dependencies
npm install

# Start the React development server
npm run dev
```

The frontend will run at: [http://localhost:5173](http://localhost:5173)

---

### 4. VS Code Setup (Recommended)

- Open the project folder in VS Code
- Press `Ctrl+Shift+P` and run `Python: Select Interpreter`
- Choose: `./backend/venv/bin/python`
- Recommended extensions:
  - Python (ms-python.python)
  - Pylance (ms-python.vscode-pylance)
  - Black Formatter (ms-python.black-formatter)
  - Prettier (esbenp.prettier-vscode)
  - ESLint (dbaeumer.vscode-eslint)
- Auto-formatting and linting are pre-configured in `.vscode/settings.json`

---

### 5. Daily Development Workflow

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
fastapi dev main.py

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - Database (if needed)
docker compose up -d
```

---

### 6. Stopping Services

```bash
# Stop servers: Ctrl+C in each terminal
# Deactivate Python venv: deactivate
# Stop database: docker compose down
```

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

## Development Tips

- **Virtual Environment:** Always activate the backend virtual environment before running backend commands.
- **Database:** Make sure Docker is running and the PostgreSQL container is up before starting the backend.
- **Auto-formatting:** Prettier (frontend) and Black (backend) are pre-configured for 4 spaces. Use `Shift+Alt+F` to format files.
- **Type Safety:** All types are defined globally in `frontend/src/vite-env.d.ts` for frontend, and with Pydantic for backend.
- **Bulk Delete:** Both notes and tasks support bulk deletion via checkboxes.
- **API Docs:** FastAPI auto-generates docs at [http://localhost:8000/docs](http://localhost:8000/docs)
- **Testing:** (Add tests as needed; currently, manual testing is recommended.)

## Troubleshooting

- **Database Connection Issues:**
  - Ensure Docker is running
  - Restart containers: `docker compose down && docker compose up -d`
  - Check port 5432 is available
- **Python Import Errors:**
  - Activate the virtual environment
  - Reinstall packages: `pip install -r requirements.txt`
  - Set the correct Python interpreter in VS Code
- **Frontend Build Errors:**
  - Clear node_modules: `rm -rf node_modules && npm install`
  - Check Node.js version compatibility
- **Port Conflicts:**
  - Backend (8000), Frontend (5173), Database (5432) must be available
  - Kill processes using these ports if needed
- **Auto-formatting not working:**
  - Ensure Prettier and Black extensions are installed and enabled in VS Code
  - Check `.vscode/settings.json` for correct configuration

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
