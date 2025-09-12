# From and Import
from fastapi import FastAPI, HTTPException
from db import (
    add_note,
    get_all_notes,
    get_note,
    update_note,
    delete_note,
    search_notes,
    add_task,
    get_all_tasks,
    get_task,
    update_task,
    delete_task,
    search_tasks,
    get_dashboard_stats,
    get_recent_activity,
)
from schemas import NoteCreate, NoteOut, TaskCreate, TaskOut
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Implementation
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Notes Routes
@app.post("/api/notes")
def endpoint_add_note(note: NoteCreate) -> NoteOut:
    return add_note(note)


@app.get("/api/notes")
def endpoint_get_all_notes() -> list[NoteOut]:
    return get_all_notes()


@app.get("/api/notes/{note_id}")
def endpoint_get_note(note_id: int) -> NoteOut:
    note = get_note(note_id)
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return note


@app.put("/api/notes/{note_id}")
def endpoint_update_note(note_id: int, note: NoteCreate) -> NoteOut:
    updated_note = update_note(note_id, note)
    if updated_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return updated_note


@app.delete("/api/notes/{note_id}")
def endpoint_delete_note(note_id: int):
    if not delete_note(note_id):
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note deleted successfully"}


@app.get("/api/notes/query")
def endpoint_search_notes(query: str):
    return search_notes(query)


# Tasks Routes
@app.post("/api/tasks")
def endpoint_add_task(task: TaskCreate) -> TaskOut:
    return add_task(task)


@app.get("/api/tasks")
def endpoint_get_all_tasks() -> list[TaskOut]:
    return get_all_tasks()


@app.get("/api/tasks/{task_id}")
def endpoint_get_task(task_id: int) -> TaskOut:
    task = get_task(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@app.put("/api/tasks/{task_id}")
def endpoint_update_task(task_id: int, task: TaskCreate) -> TaskOut:
    updated_task = update_task(task_id, task)
    if updated_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task


@app.delete("/api/tasks/{task_id}")
def endpoint_delete_task(task_id: int):
    if not delete_task(task_id):
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}


@app.get("/api/tasks/query")
def endpoint_search_tasks(query: str):
    return search_tasks(query)


# Dashboard Routes
@app.get("/api/dashboard/stats")
def endpoint_get_dashboard_stats():
    return get_dashboard_stats()


@app.get("/api/dashboard/recent")
def endpoint_get_recent_activity(limit: int = 5):
    return get_recent_activity(limit)
