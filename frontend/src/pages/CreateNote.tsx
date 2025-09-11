import { useState } from "react"
import { useNavigate } from "react-router"
import NoteForm from "../components/NoteForm"
import { createNote } from "../connections/noteApi"

export default function CreateNote() {
    const [error, setError] = useState<string | null>(null)
    const [validationError, setValidationError] = useState<string | null>(null)
    const navigate = useNavigate()

    async function handleSubmit(title: string, content: string) {
        if (!title) {
            setValidationError("Title is required")
            return
        }
        if (!content) {
            setValidationError("Content is required")
            return
        }

        const body = { title, content }
        console.log(body) // optional for debugging

        const newNote = await createNote(body)

        if (!newNote) {
            setError("Couldn't create a new note. Try again later")
            return
        }

        navigate("/notes")
    }

    if (error) {
        return <p className="text-red-500">{error}</p>
    }

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">New Note</h1>
            {validationError && <p className="text-red-500">{validationError}</p>}
            <NoteForm onSubmit={handleSubmit} />
        </div>
    )
}
