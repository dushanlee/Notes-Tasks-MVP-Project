const BASE_URL = "http://localhost:8000/api"

export async function getAllNotes(): Promise<Note[] | null> {
    try {
        const response = await fetch(`${BASE_URL}/notes`)
        if (!response.ok) {
            throw new Error(`HTTP Error (notes): ${response.status}`)
        }
        const data = (await response.json()) as Note[]
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function createNote(note: { title: string; content: string }) {
    try {
        const response = await fetch(`${BASE_URL}/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note),
        })
        if (!response.ok) {
            throw new Error(`HTTP Error (create note): ${response.status}`)
        }
        return (await response.json()) as Note
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getNoteById(id: number): Promise<Note | null> {
    try {
        const response = await fetch(`${BASE_URL}/notes/${id}`)
        if (!response.ok) {
            throw new Error(`HTTP Error (note by id): ${response.status}`)
        }
        return (await response.json()) as Note
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function deleteNote(id: number): Promise<boolean> {
    try {
        const response = await fetch(`${BASE_URL}/notes/${id}`, {
            method: "DELETE",
        })
        return response.ok
    } catch (error) {
        console.error(error)
        return false
    }
}

export async function updateNote(id: number, note: { title: string; content: string }) {
    try {
        const response = await fetch(`${BASE_URL}/notes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note),
        })
        if (!response.ok) {
            throw new Error(`HTTP Error (update note): ${response.status}`)
        }
        return (await response.json()) as Note
    } catch (error) {
        console.error(error)
        return null
    }
}
