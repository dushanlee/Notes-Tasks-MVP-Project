import type { NoteListProps } from "../vite-env";
import NoteCard from "./NoteCard";

export default function NoteList({ notes }: NoteListProps) {
    if (notes.length === 0) {
    return <p className="text-gray-500">No notes found.</p>
    }

    return (
        <div className="flex flex-col gap-4">
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    )
}
