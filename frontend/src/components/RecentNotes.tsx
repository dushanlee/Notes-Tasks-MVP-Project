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
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-black">Recent Notes</h2>
                <Link to="/notes" className="text-blue-600 text-sm">
                    View All
                </Link>
            </div>
            <ul className="space-y-2">
                {notes.map((note) => (
                    <li key={note.id}>
                        <Link
                            to={`/notes/${note.id}`}
                            className="block p-2 rounded hover:bg-gray-100"
                        >
                            <p className="font-medium text-black">{note.title}</p>
                            <p className="text-sm text-gray-500 truncate">{note.content}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
