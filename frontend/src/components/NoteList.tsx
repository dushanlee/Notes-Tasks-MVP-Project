import type { Note } from "../vite-env";
import NoteCard from "./NoteCard";

type NoteListProps = {
    notes: Note[],
    selectedIds?: number[],
    onSelectId?: (id: number, checked: boolean) => void
}

export default function NoteList({ notes, selectedIds, onSelectId }: NoteListProps) {
    if (notes.length === 0) {
        return <p className="text-gray-500">No notes found.</p>
    }
    return (
        <div className="flex flex-col gap-4">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    selected={!!selectedIds && selectedIds.includes(note.id)}
                    onSelect={onSelectId ? (checked) => onSelectId(note.id, checked) : undefined}
                />
            ))}
        </div>
    )
}
