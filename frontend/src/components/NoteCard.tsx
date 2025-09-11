import { Link } from "react-router"

export default function NoteCard({ note }: NoteCardProps) {
    return (
        <Link
            to={`/notes/${note.id}`} // navigate to NoteDetail for this note
            className="block p-4 border rounded bg-white shadow hover:shadow-md transition"
        >
            <h2 className="font-semibold text-lg">{note.title}</h2>
            <p className="text-sm text-gray-600">
                {note.content.length > 100
                    ? note.content.slice(0, 100) + "..."
                    : note.content}
            </p>
            <p className="text-xs text-gray-400 mt-2">
                Last updated: {new Date(note.updated_at).toLocaleString()}
            </p>
        </Link>
    )
}
