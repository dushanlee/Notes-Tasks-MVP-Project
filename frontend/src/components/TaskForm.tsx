import { useState } from 'react';
import { Link } from 'react-router';

export default function TaskForm({
    initialTitle = '',
    initialDescription = '',
    initialStatus = 'pending',
    initialDueDate = null,
    onSubmit,
}: TaskFormProps) {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [status, setStatus] = useState(initialStatus);
    const [dueDate, setDueDate] = useState(initialDueDate || '');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(title, description, status, dueDate || null);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />
            <textarea
                placeholder="Task description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full border p-2 rounded"
                rows={4}
                required
            />
            <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full border p-2 rounded"
            >
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
                <option value="late">Late</option>
            </select>
            <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full border p-2 rounded"
            />
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white font-semibold shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition border-2 border-black/10 dark:border-gray-700 cursor-pointer"
                >
                    Save Task
                </button>
                <Link
                    to="/tasks"
                    className="p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white font-semibold shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition border-2 border-black/10 dark:border-gray-700 flex items-center justify-center cursor-pointer"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
