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
- [Contact](#contact)

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
│       ├── components/Layout.tsx  # App layout (nested inside components)
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

- **FastAPI** (Python web framework)
- **SQLAlchemy** (Python ORM for database operations)
- **PostgreSQL** (relational database via Docker)
- **Pydantic** (data validation and settings management)
- **Uvicorn** (ASGI web server for FastAPI)

**Frontend:**

- **React 19** (JavaScript library for building user interfaces)
- **TypeScript** (type-safe JavaScript)
- **Vite** (fast build tool and development server)
- **React Router v7** (client-side routing)
- **TailwindCSS v4** (utility-first CSS framework)

**Development & Infrastructure:**

- **Docker** (containerization for PostgreSQL)
- **ESLint & Prettier** (code linting and formatting)
- **VS Code** (recommended IDE with configured settings)

**Potential Enhancements (Not Yet Implemented):**

- Alembic (DB migrations)
- JWT Auth (security)
- WebSockets (real-time updates)
- Redis (caching, rate limiting)

---

## Setup & Initialization

### Prerequisites

- **Python 3.8+** (for FastAPI backend)
- **Node.js and npm** (for frontend development tools only - Vite, React, TypeScript compilation)
- **Docker** (for PostgreSQL database)
- **Git** (for version control)

Optional (future or advanced usage):

- `make` (for Makefile convenience scripts if added later)
- `docker compose` plugin installed (most recent Docker Desktop/Engine includes this)

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

# (Optional) If you prefer using pyproject/pep517:
# pip install .

# Start PostgreSQL with Docker
docker compose up -d

# (Optional, usually not needed) Load schema if not auto-created:
docker exec -it postgres_db psql -U postgres -d notes_and_tasks -f /data/schema.sql

# Start the FastAPI backend server
fastapi dev main.py
```

The backend will run at: [http://localhost:8000](http://localhost:8000)

#### Environment Variables

Currently the backend uses a hard-coded `DATABASE_URL` inside `backend/db.py`.
For production or better portability, replace that with an environment variable:

1. Create a file `backend/.env`:

```
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/notes_and_tasks
FASTAPI_ENV=development
LOG_LEVEL=info
```

2. Install `python-dotenv` (already present in requirements) and modify `db.py`:

```python
import os
from dotenv import load_dotenv
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg://postgres:postgres@localhost:5432/notes_and_tasks")
```

3. (Optional) Add `.env` to `.gitignore` (if not already).

---

### Frontend Setup (React + Vite)

**Note:** Node.js is used here only for frontend development tools (Vite build system, TypeScript compilation, ESLint, etc.). The actual application server is FastAPI (Python).

```bash
# Open a new terminal window/tab
cd frontend

# Install Node.js dependencies (development tools)
npm install

# Start the React development server with Vite
npm run dev
```

The frontend will run at: [http://localhost:5173](http://localhost:5173)

#### Frontend Environment Variables (Optional)

Create `frontend/.env` for custom Vite env values (must be prefixed with `VITE_`):

```
VITE_API_BASE_URL=http://localhost:8000/api
```

Then update `baseApi.ts` to read from `import.meta.env.VITE_API_BASE_URL` with a fallback.

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

### Status & Overdue Logic

Task status can be one of: `pending`, `complete`, `late`.

- A task becomes `late` lazily (evaluated when listing or fetching) if it's still `pending` and its `due_date` is in the past.
- Updating a task with a past due date while attempting to set status to `pending` will force it to `late` server-side.

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
7. Task lateness updates automatically on retrieval (no cron job required yet).

---

## Development Tips

- **Virtual Environment:** Always activate the backend virtual environment before running any Python/FastAPI commands.
- **Database:** Ensure Docker is running and the PostgreSQL container is active before starting the FastAPI backend.
- **Auto-formatting:** Prettier (frontend) and Black (backend) are pre-configured. Use `Shift+Alt+F` in VS Code to format files.
- **Type Safety:** The entire application is built with TypeScript on the frontend and Pydantic type validation on the backend, ensuring robust data handling and fewer runtime errors.
- **API Docs:** FastAPI automatically generates interactive API documentation at [http://localhost:8000/docs](http://localhost:8000/docs)
- **Code Quality:** Pre-configured with ESLint, Prettier (frontend) and Black formatter (backend) for consistent code style
- **Docker Integration:** PostgreSQL runs in a Docker container for consistent development environment
- **CORS Configured:** Backend properly configured to accept requests from the frontend development server
- **Bulk Delete:** Both notes and tasks support bulk deletion via checkboxes for efficient management.
- **Error Handling:** The application includes comprehensive error handling and validation on both frontend and backend.
- **Testing:** (Add unit and integration tests as needed; currently manual testing via the UI and API docs is recommended.)
- **Frontend Routing:** Uses `react-router` (v7) with a nested layout component and the `BrowserRouter` wrapper in `main.tsx`.
- **Dark Mode Hooks:** Basic dark mode styles exist; a future context/provider can centralize theme logic.
- **Bulk Operations:** Currently only bulk-delete implemented; future bulk-edit could follow similar patterns.

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
- **API 404s from frontend:** Confirm `BASE_URL` matches backend host/port (consider environment variable change described above).
- **Date Handling Differences:** Frontend appends `Z` when formatting; ensure backend returns ISO8601 (FastAPI default) and treat timestamps as UTC.

## Data Model

### Notes Table (`notes`)

| Column     | Type         | Notes                        |
| ---------- | ------------ | ---------------------------- |
| id         | int (PK)     | Auto-increment primary key   |
| title      | varchar(255) | Required                     |
| content    | text         | Optional                     |
| created_at | timestamp    | Server default (now)         |
| updated_at | timestamp    | Auto-updated on modification |

### Tasks Table (`tasks`)

| Column      | Type         | Notes                        |
| ----------- | ------------ | ---------------------------- | -------- | --------------------- |
| id          | int (PK)     | Auto-increment primary key   |
| title       | varchar(255) | Required                     |
| description | text         | Optional                     |
| due_date    | timestamp    | Optional                     |
| status      | varchar(20)  | pending                      | complete | late (logic-enforced) |
| created_at  | timestamp    | Server default (now)         |
| updated_at  | timestamp    | Auto-updated on modification |

Consider adding DB indexes later on `(status)`, `(due_date)` if dataset grows.

## Sample API Payloads

### Create Note (POST /api/notes)

Request:

```json
{ "title": "Design Schema", "content": "Draft initial DB layout" }
```

Response (200):

```json
{
  "id": 1,
  "title": "Design Schema",
  "content": "Draft initial DB layout",
  "created_at": "2025-09-26T14:03:12.123456",
  "updated_at": "2025-09-26T14:03:12.123456"
}
```

### Create Task (POST /api/tasks)

Request:

```json
{
  "title": "Implement API",
  "description": "CRUD endpoints",
  "due_date": "2025-09-30T23:59:00",
  "status": "pending"
}
```

Response:

```json
{
  "id": 7,
  "title": "Implement API",
  "description": "CRUD endpoints",
  "due_date": "2025-09-30T23:59:00",
  "status": "pending",
  "created_at": "2025-09-26T14:05:44.301122",
  "updated_at": "2025-09-26T14:05:44.301122"
}
```

### Update Task (PUT /api/tasks/{id})

Request:

```json
{
  "title": "Implement API",
  "description": "Add pagination",
  "status": "complete"
}
```

Response:

```json
{
  "id": 7,
  "title": "Implement API",
  "description": "Add pagination",
  "due_date": "2025-09-30T23:59:00",
  "status": "complete",
  "created_at": "2025-09-26T14:05:44.301122",
  "updated_at": "2025-09-26T15:10:02.447981"
}
```

### Dashboard Stats (GET /api/dashboard/stats)

```json
{
  "total_notes": 12,
  "total_tasks": 18,
  "completed_tasks": 5,
  "pending_tasks": 9,
  "late_tasks": 4
}
```

## Production Build & Deployment

### Frontend Production Build

```bash
cd frontend
npm run build
# Outputs dist/ (static assets)
```

Serve with a static host (Netlify, Vercel, Nginx) or integrate behind FastAPI:

```python
from fastapi.staticfiles import StaticFiles
app.mount('/app', StaticFiles(directory='frontend/dist', html=True), name='frontend')
```

### Backend Production Run (example)

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Suggested Hardening

- Set `ALLOWED_ORIGINS` explicitly (no wildcard) in production
- Use gunicorn + uvicorn workers (containerized) if load increases
- Add a reverse proxy (Nginx / Traefik) for TLS termination

### Docker Compose (Full Stack Idea)

Add a service for the backend plus a multi-stage build for the frontend if you containerize everything.

## Security & Hardening Checklist

- No authentication yet: all endpoints are publicly writable (limit exposure)
- Add JWT-based auth and per-user ownership scoping (future)
- Validate `status` via Enum (currently free-form string in request schema)
- Move secrets (DB credentials) to environment variables / secrets manager
- Apply rate limiting middleware or API gateway if public
- Enforce HTTPS in production environment

## Known Limitations

- No pagination for large note/task lists
- No soft deletes / audit log
- No migrations (schema changes require manual SQL) — consider Alembic
- Timezone naive timestamps (assumed server local time) — recommend normalizing to UTC
- No input size limits (large payload risk) — consider request validation constraints
- Overdue logic is evaluated lazily; no background scheduler

## Contributing (Optional Future Section)

1. Fork repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: add X"`
4. Push branch & open PR

## License

(Add a LICENSE file, e.g., MIT, if you intend to open source.)

## Roadmap

### Short-term Improvements

- Add comprehensive unit and integration tests (pytest for backend, Jest/React Testing Library for frontend)
- Implement user authentication and authorization (JWT tokens)
- Add data validation and error boundaries on the frontend
- Improve mobile responsiveness and touch interactions

### Medium-term Features

- Add folders/categories and tagging system for better organization
- Implement real-time updates with WebSocket connections
- Add rich text editor for notes with markdown support
- Create dashboard analytics with charts and productivity insights
- Add export functionality (PDF, JSON, CSV)

### Long-term Goals

- Multi-user support with role-based permissions
- Dark mode and customizable themes
- Mobile app development (React Native)
- API rate limiting and caching strategies
- Deployment guides for production environments

---

## Contact

Developed by Dushan (Michael) Lee as part of the Hack Reactor software engineering bootcamp.

Thanks to Bart Dorsey (Hack Reactor Instructor) for guidance and feedback.

For questions, suggestions, or collaboration opportunities, feel free to contact me!

---

_For any technical issues or bugs, please open an issue in this repository. Pull requests are welcome!_

---

## Additional Notes

- **Architecture:** This is a modern full-stack application following REST API principles with clear separation between frontend and backend.
- **Scalability:** The application is designed with scalability in mind, using proper database relationships and efficient API endpoints.
- **Code Organization:** Components are organized by feature, with clear separation of concerns between UI components, API connections, and data models.
- **Future Expansion:** The `frontend/src/context` and `frontend/src/hooks` folders are present for future features like global state management and custom React hooks.
- **Routing:** All client-side navigation uses React Router v7 for smooth single-page application experience.
- **Styling:** TailwindCSS provides a utility-first approach to styling with a clean, modern aesthetic.
- **Database:** PostgreSQL provides robust relational database features with ACID compliance for data integrity.
- **Development Experience:** Hot reloading on both frontend (Vite) and backend (FastAPI) ensures rapid development cycles.
