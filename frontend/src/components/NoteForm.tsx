import { useState } from "react"

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
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />
            <textarea
                placeholder="Note content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border p-2 rounded"
                rows={6}
                required
            />
            <button
                type="submit"
                className="px-4 py-2 bg-black text-black rounded hover:bg-gray-100"
            >
                Save Note
            </button>
        </form>
    )
}
