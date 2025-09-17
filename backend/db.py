from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker
from db_models import DBNote, DBTask
from schemas import NoteCreate, NoteOut, TaskCreate, TaskOut
from datetime import datetime

DATABASE_URL = (
    "postgresql+psycopg://postgres:postgres@localhost:5432/notes_and_tasks"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(engine)


# Notes
def add_note(note: NoteCreate) -> NoteOut:
    note_model = None
    with SessionLocal() as db:
        note_model = DBNote(**note.model_dump())
        db.add(note_model)
        db.commit()
        db.refresh(note_model)
    return NoteOut(
        id=note_model.id,
        title=note_model.title,
        content=note_model.content,
        created_at=note_model.created_at,
        updated_at=note_model.updated_at,
    )


def get_all_notes() -> list[NoteOut]:
    with SessionLocal() as db:
        stmt = select(DBNote)
        db_notes = db.scalars(stmt).all()
        notes: list[NoteOut] = []
        for db_note in db_notes:
            notes.append(
                NoteOut(
                    id=db_note.id,
                    title=db_note.title,
                    content=db_note.content,
                    created_at=db_note.created_at,
                    updated_at=db_note.updated_at,
                )
            )
        return notes


def get_note(note_id: int) -> NoteOut | None:
    note_model = None
    with SessionLocal() as db:
        stmt = select(DBNote).where(DBNote.id == note_id)
        db_note = db.scalar(stmt)
        if db_note:
            note_model = NoteOut(
                id=db_note.id,
                title=db_note.title,
                content=db_note.content,
                created_at=db_note.created_at,
                updated_at=db_note.updated_at,
            )
        return note_model


def update_note(note_id: int, note: NoteCreate) -> NoteOut | None:
    with SessionLocal() as db:
        stmt = select(DBNote).where(DBNote.id == note_id)
        note_object = db.scalar(stmt)
        if note_object is None:
            return None
        if note.title is not None:
            note_object.title = note.title
        if note.content is not None:
            note_object.content = note.content
        db.commit()
        db.refresh(note_object)
        return NoteOut(
            id=note_object.id,
            title=note_object.title,
            content=note_object.content,
            created_at=note_object.created_at,
            updated_at=note_object.updated_at,
        )


def delete_note(note_id: int) -> bool:
    deleted_note = False
    with SessionLocal() as db:
        stmt = select(DBNote).where(DBNote.id == note_id)
        note_object = db.scalar(stmt)
        if note_object:
            db.delete(note_object)
            db.commit()
            deleted_note = True
        return deleted_note


def search_notes(query: str) -> list[NoteOut]:
    with SessionLocal() as db:
        stmt = select(DBNote).where(
            (DBNote.title.ilike(f"%{query}%"))
            | (DBNote.content.ilike(f"%{query}%"))
        )
        db_notes = db.scalars(stmt).all()
        notes: list[NoteOut] = []
        for db_note in db_notes:
            notes.append(
                NoteOut(
                    id=db_note.id,
                    title=db_note.title,
                    content=db_note.content,
                    created_at=db_note.created_at,
                    updated_at=db_note.updated_at,
                )
            )
        return notes


# Tasks
def add_task(task: TaskCreate) -> TaskOut:
    task_model = None
    with SessionLocal() as db:
        task_model = DBTask(**task.model_dump())
        if task_model.due_date and task_model.due_date < datetime.now():
            task_model.status = "late"
        db.add(task_model)
        db.commit()
        db.refresh(task_model)
    return TaskOut(
        id=task_model.id,
        title=task_model.title,
        description=task_model.description,
        due_date=task_model.due_date,
        status=task_model.status,
        created_at=task_model.created_at,
        updated_at=task_model.updated_at,
    )


def get_all_tasks() -> list[TaskOut]:
    with SessionLocal() as db:
        stmt = select(DBTask)
        db_tasks = db.scalars(stmt).all()
        tasks: list[TaskOut] = []
        now = datetime.now()
        for db_task in db_tasks:
            # Auto-update status to 'late' if due_date is past
            # and still pending
            if (
                db_task.status == "pending"
                and db_task.due_date
                and db_task.due_date < now
            ):
                db_task.status = "late"
                db.commit()
                db.refresh(db_task)
            tasks.append(
                TaskOut(
                    id=db_task.id,
                    title=db_task.title,
                    description=db_task.description,
                    due_date=db_task.due_date,
                    status=db_task.status,
                    created_at=db_task.created_at,
                    updated_at=db_task.updated_at,
                )
            )
        return tasks


def get_task(task_id: int) -> TaskOut | None:
    task_model = None
    with SessionLocal() as db:
        stmt = select(DBTask).where(DBTask.id == task_id)
        db_task = db.scalar(stmt)
        if db_task:
            now = datetime.now()
            if (
                db_task.status == "pending"
                and db_task.due_date
                and db_task.due_date < now
            ):
                db_task.status = "late"
                db.commit()
                db.refresh(db_task)
            task_model = TaskOut(
                id=db_task.id,
                title=db_task.title,
                description=db_task.description,
                due_date=db_task.due_date,
                status=db_task.status,
                created_at=db_task.created_at,
                updated_at=db_task.updated_at,
            )
        return task_model


def update_task(task_id: int, task: TaskCreate) -> TaskOut | None:
    with SessionLocal() as db:
        stmt = select(DBTask).where(DBTask.id == task_id)
        task_object = db.scalar(stmt)
        if task_object is None:
            return None
        if task.title is not None:
            task_object.title = task.title
        if task.description is not None:
            task_object.description = task.description
        if task.due_date is not None:
            task_object.due_date = task.due_date
        # Allow status to be set to any value, but if trying to set
        # to 'pending' and due_date is past, force 'late'
        if hasattr(task, "status") and task.status is not None:
            if (
                task.status == "pending"
                and task_object.due_date
                and task_object.due_date < datetime.now()
            ):
                task_object.status = "late"
            else:
                task_object.status = task.status
        db.commit()
        db.refresh(task_object)
        return TaskOut(
            id=task_object.id,
            title=task_object.title,
            description=task_object.description,
            due_date=task_object.due_date,
            status=task_object.status,
            created_at=task_object.created_at,
            updated_at=task_object.updated_at,
        )


def delete_task(task_id: int) -> bool:
    deleted_task = False
    with SessionLocal() as db:
        stmt = select(DBTask).where(DBTask.id == task_id)
        task_object = db.scalar(stmt)
        if task_object:
            db.delete(task_object)
            db.commit()
            deleted_task = True
        return deleted_task


def search_tasks(query: str) -> list[TaskOut]:
    with SessionLocal() as db:
        stmt = select(DBTask).where(
            (DBTask.title.ilike(f"%{query}%"))
            | (DBTask.description.ilike(f"%{query}%"))
        )
        db_tasks = db.scalars(stmt).all()
        tasks: list[TaskOut] = []
        for db_task in db_tasks:
            tasks.append(
                TaskOut(
                    id=db_task.id,
                    title=db_task.title,
                    description=db_task.description,
                    due_date=db_task.due_date,
                    status=db_task.status,
                    created_at=db_task.created_at,
                    updated_at=db_task.updated_at,
                )
            )
        return tasks


# Dashboard
def get_dashboard_stats() -> dict:
    with SessionLocal() as db:
        total_notes = db.query(DBNote).count()
        total_tasks = db.query(DBTask).count()
        now = datetime.now()
        # Auto-update all late tasks before counting
        db_tasks = db.query(DBTask).all()
        for task in db_tasks:
            if (
                task.status == "pending"
                and task.due_date
                and task.due_date < now
            ):
                task.status = "late"
                db.commit()
                db.refresh(task)
        completed_tasks = (
            db.query(DBTask).filter(DBTask.status == "complete").count()
        )
        pending_tasks = (
            db.query(DBTask).filter(DBTask.status == "pending").count()
        )
        late_tasks = db.query(DBTask).filter(DBTask.status == "late").count()
        return {
            "total_notes": total_notes,
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": pending_tasks,
            "late_tasks": late_tasks,
        }


def get_recent_activity(limit: int = 5) -> dict:
    with SessionLocal() as db:
        recent_notes = (
            db.query(DBNote)
            .order_by(DBNote.updated_at.desc())
            .limit(limit)
            .all()
        )
        recent_tasks = (
            db.query(DBTask)
            .order_by(DBTask.updated_at.desc())
            .limit(limit)
            .all()
        )

        notes: list[NoteOut] = []
        for note in recent_notes:
            notes.append(
                NoteOut(
                    id=note.id,
                    title=note.title,
                    content=note.content,
                    created_at=note.created_at,
                    updated_at=note.updated_at,
                )
            )

        tasks: list[TaskOut] = []
        for task in recent_tasks:
            tasks.append(
                TaskOut(
                    id=task.id,
                    title=task.title,
                    description=task.description,
                    due_date=task.due_date,
                    status=task.status,
                    created_at=task.created_at,
                    updated_at=task.updated_at,
                )
            )

        return {
            "notes": notes,
            "tasks": tasks,
        }
