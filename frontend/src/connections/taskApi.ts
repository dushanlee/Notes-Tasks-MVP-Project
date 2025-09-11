const BASE_URL = "http://localhost:8000/api"

export async function getAllTasks(): Promise<Task[] | null> {
    try {
        const response = await fetch(`${BASE_URL}/tasks`)
        if (!response.ok) {
            throw new Error(`HTTP Error (tasks): ${response.status}`)
        }
        const data = (await response.json()) as Task[]
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function createTask(task: {
    title: string
    description: string
    status: string
    due_date: string | null
}) {
    try {
        const response = await fetch(`${BASE_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        })
        if (!response.ok) {
            throw new Error(`HTTP Error (create task): ${response.status}`)
        }
        return (await response.json()) as Task
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getTaskById(id: number): Promise<Task | null> {
    try {
        const response = await fetch(`${BASE_URL}/tasks/${id}`)
        if (!response.ok) throw new Error(`HTTP Error (task by id): ${response.status}`)
        return (await response.json()) as Task
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function deleteTask(id: number): Promise<boolean> {
    try {
        const response = await fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" })
        return response.ok
    } catch (error) {
        console.error(error)
        return false
    }
}

export async function updateTask(id: number, task: { title: string; description: string; due_date?: string | null }) {
    try {
        const response = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        })
        if (!response.ok) {
            throw new Error(`HTTP Error (update task): ${response.status}`)
        }
        return (await response.json()) as Task
    } catch (error) {
        console.error(error)
        return null
    }
}
