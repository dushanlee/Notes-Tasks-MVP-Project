import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import NoteList from "../components/NoteList"
import SearchBar from "../components/SearchBar"
import { getAllNotes } from "../connections/noteApi"
import type { Note } from "../vite-env"

export default function NotesPage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [notes, setNotes] = useState<Note[]>([])
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        getAllNotes().then((data) => {
            if (!data) {
                setError("Couldn't load notes")
                setLoading(false)
                return
            }
            setNotes(data)
            setFilteredNotes(data)
            setLoading(false)
        })
    }, [])

    function handleSearch(query: string) {
        if (!query.trim()) {
            setFilteredNotes(notes)
        } else {
            const lower = query.toLowerCase()
            setFilteredNotes(
                notes.filter(
                    (note) =>
                        note.title.toLowerCase().includes(lower) ||
                        note.content.toLowerCase().includes(lower)
                )
            )
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>
    if (notes.length === 0) {
        return (
            <div className="flex justify-center w-full h-full flex-1">
                <div className="w-full max-w-4xl space-y-6 px-4 md:px-8 border-2 border-black/10 rounded-xl shadow bg-white/70 flex flex-col items-center justify-center h-full">
                    <h1 className="text-2xl font-bold text-black text-center w-full mb-8">Notes</h1>
                    <p>No notes available. Create a new note!</p>
                    <button
                        className="block w-full bg-white text-black rounded-xl p-4 font-semibold text-lg shadow hover:bg-gray-100 transition border-2 border-black/10 mt-4"
                        onClick={() => navigate("/notes/new")}
                    >
                        + New Note
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center w-full h-full flex-1">
            <div className="w-full max-w-4xl space-y-6 px-4 md:px-8 border-2 border-black/10 rounded-xl shadow bg-white/70 flex-1 flex flex-col">
                <div className="flex flex-col items-center w-full mt-2 mb-2">
                    <h1 className="text-2xl font-bold text-black text-center w-full">Notes</h1>
                        <div className="w-full flex justify-end mt-2 mb-8">
                        <button
                            onClick={() => navigate("/notes/new")}
                            className="bg-white text-black rounded-xl p-4 font-semibold text-lg shadow hover:bg-gray-100 transition border-2 border-black/10"
                        >
                            + New Note
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <SearchBar placeholder="Search notes..." onSearch={handleSearch} />
                </div>
                <div className="w-full">
                    <NoteList notes={filteredNotes} />
                </div>
            </div>
        </div>
    )
}
