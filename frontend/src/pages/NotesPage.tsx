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
                <div className="w-full max-w-4xl space-y-6 px-4 md:px-8 border-2 border-black/10 rounded-xl shadow bg-white/70 flex flex-col h-full pt-8">
                    <div className="flex items-center justify-between w-full mb-2 relative">
                        <h1 className="text-2xl font-bold text-black text-center w-full">Notes</h1>
                        <button
                            className="absolute right-0 bg-white text-black rounded-xl px-6 py-3 font-semibold text-lg shadow hover:bg-gray-100 transition border-2 border-black/10 whitespace-nowrap"
                            onClick={() => navigate("/notes/new")}
                        >
                            + New Note
                        </button>
                    </div>
                    <p className="text-center w-full mt-4 mb-8">No notes available. Create a new note!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center w-full h-full flex-1">
            <div className="w-full max-w-4xl space-y-6 px-4 md:px-8 border-2 border-black/10 rounded-xl shadow bg-white/70 flex-1 flex flex-col pt-8">
                <div className="flex items-center justify-between w-full mb-8">
                    <h1 className="text-2xl font-bold text-black text-center w-full">Notes</h1>
                    <button
                        onClick={() => navigate("/notes/new")}
                        className="bg-white text-black rounded-xl p-4 font-semibold text-lg shadow hover:bg-gray-100 transition border-2 border-black/10 ml-4"
                    >
                        + New Note
                    </button>
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
