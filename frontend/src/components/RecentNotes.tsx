import { Link } from "react-router";

type Note = {
  id: number;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
};

type Props = {
  notes: Note[];
};

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
              className="p-4 rounded-xl border border-gray-200 bg-white flex flex-col gap-1 hover:bg-gray-100"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 7h10M7 11h10M7 15h6"
                    />
                  </svg>
                </span>
                <span className="font-semibold text-black text-base">
                  {note.title}
                </span>
              </div>
              <p className="text-sm text-gray-500 break-words mb-1">
                {note.content}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {note.updated_at
                  ? `Updated: ${new Date(
                      note.updated_at + "Z"
                    ).toLocaleDateString("en-US")}`
                  : note.created_at
                  ? `Created: ${new Date(
                      note.created_at + "Z"
                    ).toLocaleDateString("en-US")}`
                  : ""}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
