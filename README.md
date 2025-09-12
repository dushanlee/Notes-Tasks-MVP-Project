## Notes & Tasks MVP Project

The purpose of this project is to demonstrate a full-stack application
built with FastAPI (backend) and React (frontend). It provides basic
note-taking and task-tracking functionality, including search and a
homepage dashboard summary. This project was created as practice for building a
Minimum Viable Product (MVP) with database integration, RESTful API
endpoints, and a React user interface.

## Features

Notes:

- Create, view, update, and delete notes
- Search notes by title or content
- Track creation and last update timestamps

Tasks:

- Create, view, update, and delete tasks
- Assign due dates and automatically mark overdue tasks as late
- Track task status (pending, complete, late)
- Search tasks by title or description

Dashboard:

- View total notes and tasks
- See counts of pending, completed, and late tasks
- Recent activity (last 5 notes and tasks)

## Tech Stack

Backend:

- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL (via Docker)
- Pydantic for schema validation

Frontend:

- React with Vite (Typescript)
- React Router (Typescript)
- TailwindCSS

## Project Architecture

```scss
Frontend (React + Vite)  →  Backend (FastAPI)  →  Database (PostgreSQL via Docker)
```

## Setup Instructions

1. Clone the repository

```bash
# Clone the repo from GitLab (replace with your repo URL)
git clone <your-repo-url>
# Move into the project directory
cd notes-task-mvp-unit-project
```

2. Backend Setup (FastAPI + PostgreSQL)

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

3. Frontend Setup (React + Vite)

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

4. API Endpoints

Notes:

POST /api/notes → Create a note
GET /api/notes → List all notes
GET /api/notes/{id} → Get a specific note
PUT /api/notes/{id} → Update a note
DELETE /api/notes/{id} → Delete a note
GET /api/notes/query?query=searchTerm → Search notes

Tasks:

POST /api/tasks → Create a task
GET /api/tasks → List all tasks
GET /api/tasks/{id} → Get a specific task
PUT /api/tasks/{id} → Update a task
DELETE /api/tasks/{id} → Delete a task
GET /api/tasks/query?query=searchTerm → Search tasks

Dashboard:

GET /api/dashboard/stats → Summary of notes & tasks
GET /api/dashboard/recent → Recent notes & tasks

## Usage

1. Open the frontend in your browser (http://localhost:5173)
2. Create notes and tasks using the provided forms
3. Use search to quickly filter notes or tasks
4. View stats and recent activity on the dashboard

## Roadmap

- Add user authentication (multi-user support with JWT)
- Add folders or tags to organize notes/tasks
- Improve dashboard UI with charts/visuals

## Authors and Acknowledgment

Developed by Dushan (Michael) Lee as part of the Hack Reactor software engineering bootcamp.
Thanks to Bart Dorsey (Hack Reactor Instructor) for guidance and feedback.
