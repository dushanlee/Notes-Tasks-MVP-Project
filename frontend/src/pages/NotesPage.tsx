import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import NoteList from "../components/NoteList"
import SearchBar from "../components/SearchBar"
import Error from "../components/Error"
import { getAllNotes } from "../connections/noteApi"

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
            <>
                <Error />
                <p>No notes available</p>
            </>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black">Notes</h1>
                <button
                    onClick={() => navigate("/notes/new")}
                    className="block p-2 border rounded bg-white shadow hover:shadow-md transition"
                >
                    + New Note
                </button>
            </div>

            <SearchBar placeholder="Search notes..." onSearch={handleSearch} />

            <NoteList notes={filteredNotes} />
        </div>
    )
}
