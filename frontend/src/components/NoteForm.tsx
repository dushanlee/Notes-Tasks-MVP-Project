import { useState } from 'react';
import { Link } from 'react-router';

export default function NoteForm({
    initialTitle = '',
    initialContent = '',
    onSubmit,
}: NoteFormProps) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(title, content);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Enter note title (required)"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />
            <textarea
                placeholder="Enter your note content (optional)"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full border p-2 rounded"
                rows={6}
            />
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white font-semibold shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition border-2 border-black/10 dark:border-gray-700 cursor-pointer"
                >
                    Save Note
                </button>
                <Link
                    to="/notes"
                    className="p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white font-semibold shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition border-2 border-black/10 dark:border-gray-700 flex items-center justify-center cursor-pointer"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
