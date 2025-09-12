import { useState } from "react"
import { Link } from "react-router"
import type { TaskFormProps } from "../vite-env"

export default function TaskForm({
    initialTitle = "",
    initialDescription = "",
    initialStatus = "pending",
    initialDueDate = null,
    onSubmit,
}: TaskFormProps) {
    const [title, setTitle] = useState(initialTitle)
    const [description, setDescription] = useState(initialDescription)
    const [status, setStatus] = useState(initialStatus)
    const [dueDate, setDueDate] = useState(initialDueDate || "")

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onSubmit(title, description, status, dueDate || null)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Enter Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />
            <textarea
                placeholder="Enter your task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded"
                rows={4}
                required
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border p-2 rounded"
            >
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
                <option value="late">Late</option>
            </select>
            <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border p-2 rounded"
            />
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="p-2 rounded bg-white text-black font-semibold shadow hover:bg-gray-100 transition border-2 border-black/10"
                >
                    Save Task
                </button>
                <Link
                    to="/tasks"
                    className="p-2 rounded bg-white text-black font-semibold shadow hover:bg-gray-100 transition border-2 border-black/10 flex items-center justify-center"
                >
                    Cancel
                </Link>
            </div>
        </form>
    )
}
