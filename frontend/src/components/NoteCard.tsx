import { Link } from 'react-router';

type NoteCardProps = {
    note: Note;
    selected?: boolean;
    onSelect?: (checked: boolean) => void;
};

export default function NoteCard({ note, selected, onSelect }: NoteCardProps) {
    return (
        <div className="flex items-start gap-2">
            {typeof selected === 'boolean' && onSelect && (
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={e => onSelect(e.target.checked)}
                    className="mt-1"
                />
            )}
            <Link
                to={`/notes/${note.id}`}
                className="block flex-1 p-4 border-2 border-black/10 rounded-xl bg-white/80 shadow hover:bg-gray-100 transition text-left"
            >
                <h2 className="font-semibold text-lg text-black mb-1">
                    {note.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">{note.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                    Created:{' '}
                    {new Date(note.created_at + 'Z').toLocaleString('en-US', {
                        timeZone: 'America/Los_Angeles',
                    })}
                    <br />
                    Last updated:{' '}
                    {new Date(note.updated_at + 'Z').toLocaleString('en-US', {
                        timeZone: 'America/Los_Angeles',
                    })}
                </p>
            </Link>
        </div>
    );
}
