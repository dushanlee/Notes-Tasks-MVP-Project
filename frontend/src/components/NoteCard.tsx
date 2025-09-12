import { Link } from "react-router"
import type { NoteCardProps } from "../vite-env"

export default function NoteCard({ note }: NoteCardProps) {
    return (
        <Link
            to={`/notes/${note.id}`}
            className="block p-4 border-2 border-black/10 rounded-xl bg-white/80 shadow hover:bg-gray-100 transition text-left"
        >
            <h2 className="font-semibold text-lg text-black mb-1">{note.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
                {note.content.length > 100
                    ? note.content.slice(0, 100) + "..."
                    : note.content}
            </p>
            <p className="text-xs text-gray-500 mt-2">
                Created: {new Date(note.created_at + 'Z').toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}<br />
                Last updated: {new Date(note.updated_at + 'Z').toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}
            </p>
        </Link>
    )
}
