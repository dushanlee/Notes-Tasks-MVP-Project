import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router"
import { getNoteById, deleteNote } from "../connections/noteApi"
import type { Note } from "../vite-env"

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
        <div className="max-w-xl mx-auto p-6 border-2 border-black/10 rounded-xl shadow bg-white/80 flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl font-bold text-black text-left">{note.title}</h1>
                <div className="flex gap-2 ml-0 mt-[-12px] mr-[-12px]">
                    <Link
                        to={`/notes/${note.id}/edit`}
                        className="inline-block px-4 py-2 bg-white text-black border-2 border-black/10 rounded-xl shadow hover:bg-gray-100 transition no-underline font-semibold"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="inline-block px-4 py-2 bg-white text-black border-2 border-black/10 rounded-xl shadow hover:bg-gray-100 transition font-semibold"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <p className="text-base text-black mb-3 text-left">{note.content}</p>
            <p className="text-xs text-gray-500 text-left">Created: {new Date(note.created_at + 'Z').toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}</p>
            <p className="text-xs text-gray-500 text-left">Last updated: {new Date(note.updated_at + 'Z').toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}</p>
        </div>
    )
}
