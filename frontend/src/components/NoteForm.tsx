import { useState } from "react"
import { Link } from "react-router"
import type { NoteFormProps } from "../vite-env"

export default function NoteForm({
    initialTitle = "",
    initialContent = "",
    onSubmit,
}: NoteFormProps) {
    const [title, setTitle] = useState(initialTitle)
    const [content, setContent] = useState(initialContent)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onSubmit(title, content)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Enter Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />
            <textarea
                placeholder="Enter your note content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border p-2 rounded"
                rows={6}
                required
            />
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="p-2 rounded bg-white text-black font-semibold shadow hover:bg-gray-100 transition border-2 border-black/10"
                >
                    Save Note
                </button>
                <Link
                    to="/notes"
                    className="p-2 rounded bg-white text-black font-semibold shadow hover:bg-gray-100 transition border-2 border-black/10 flex items-center justify-center"
                >
                    Cancel
                </Link>
            </div>
        </form>
    )
}
