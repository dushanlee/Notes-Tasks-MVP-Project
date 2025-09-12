import { useState } from "react"
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
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
                required
            />
            <textarea
                placeholder="Task description"
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
            <button
                type="submit"
                className="block p-2 rounded bg-black text-white shadow hover:bg-gray-900 transition"
            >
                Save Task
            </button>
        </form>
    )
}
