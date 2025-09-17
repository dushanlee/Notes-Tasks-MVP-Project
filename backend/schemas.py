from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class NoteCreate(BaseModel):
    title: str
    content: Optional[str] = None


class NoteOut(BaseModel):
    id: int
    title: str
    content: Optional[str] = None
    created_at: datetime
    updated_at: datetime


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    status: str = "pending"


class TaskOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    status: str
    created_at: datetime
    updated_at: datetime
