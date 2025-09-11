import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router"
import { getNoteById, deleteNote } from "../connections/noteApi"

export default function NoteDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [note, setNote] = useState<Note | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (id) {
            getNoteById(Number(id)).then((data) => {
                if (!data) setError("Couldn't load note")
                else setNote(data)
            })
        }
    }, [id])

    async function handleDelete() {
        if (note && confirm("Are you sure you want to delete this note?")) {
            const success = await deleteNote(note.id)
            if (success) navigate("/notes")
            else setError("Failed to delete note")
        }
    }

    if (error) return <p className="text-red-500">{error}</p>
    if (!note) return <p>Loading...</p>

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold">{note.title}</h1>
            <p className="mt-2 text-gray-700">{note.content}</p>
            <p className="text-sm text-gray-400 mt-4">
                Last updated: {new Date(note.updated_at).toLocaleString()}
            </p>

            <div className="flex gap-2 mt-6">
                <Link
                to={`/notes/${note.id}/edit`}
                className="inline-block px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                >
                Edit
                </Link>
                <button
                    onClick={handleDelete}
                    className="inline-block px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
