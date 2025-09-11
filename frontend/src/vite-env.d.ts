/// <reference types="vite/client" />

// Used in dashboardApi.ts
type DashboardStats = {
    total_notes: number
    total_tasks: number
    completed_tasks: number
    pending_tasks: number
    late_tasks: number
}

// Used in dashboardApi.ts
type DashboardRecent = {
    notes: any[]
    tasks: any[]
}

// Used in DashboardPage.tsx
type Stats = {
    total_notes: number
    total_tasks: number
    completed_tasks: number
    pending_tasks: number
    late_tasks: number
}

// Used in DashboardPage.tsx
type RecentData = {
    notes: any[]
    tasks: any[]
}

// Used in StatsCard.tsx
type StatCardProps = {
    label: string
    value: number
}

// Used in NotesPage.tsx, noteApi.ts, and NoteCard.tsx
type Note = {
    id: number
    title: string
    content: string
    created_at: string
    updated_at: string
}

// Used in TasksPage.tsx, taskApi.ts, and TaskCard.tsx
type Task = {
    id: number
    title: string
    description: string
    due_date: string | null
    status: string
    created_at: string
    updated_at: string
}

// Used in TaskCard.tsx
type TaskCardProps = {
    task: Task
}

// Used in TaskList.tsx
type TaskListProps = {
    tasks: Task[]
}

// Used in NoteCard.tsx
type NoteCardProps = {
    note: Note
}

// Used in NoteList.tsx
type NoteListProps = {
    notes: Note[]
}

// Used in NoteForm.tsx
type NoteFormProps = {
    initialTitle?: string
    initialContent?: string
    onSubmit: (title: string, content: string) => void
}

// Used in TaskForm.tsx
type TaskFormProps = {
    initialTitle?: string
    initialDescription?: string
    initialStatus?: string
    initialDueDate?: string | null
    onSubmit: (
        title: string,
        description: string,
        status: string,
        due_date: string | null
    ) => void
}

// Used in SearchBar.tsx
type SearchBarProps = {
    placeholder?: string
    onSearch: (query: string) => void
}
