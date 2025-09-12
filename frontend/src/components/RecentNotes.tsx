import { Link } from "react-router"

type Note = {
    id: number
    title: string
    content: string
}

type Props = {
    notes: Note[]
}

export default function RecentNotes({ notes }: Props) {
    return (
    <div className="bg-white/70 rounded-xl shadow p-4 border-2 border-black/10 transition h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-black">Recent Notes</h2>
                <Link
                    to="/notes"
                    className="text-black text-sm bg-white rounded shadow px-3 py-1 hover:bg-gray-100 transition no-underline"
                >
                    View All
                </Link>
            </div>
            <ul className="space-y-2 flex-1">
                {notes.map((note) => (
                    <li key={note.id}>
                        <Link
                            to={`/notes/${note.id}`}
                            className="block p-2 rounded hover:bg-gray-100"
                        >
                            <div className="flex flex-col items-start">
                                <p className="font-medium text-black">{note.title}</p>
                                <p className="text-sm text-gray-500 truncate">{note.content}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
