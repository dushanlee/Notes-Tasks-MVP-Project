import { useState } from "react"

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
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border p-2 rounded"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-black text-black rounded hover:bg-gray-100"
            >
                Save Task
            </button>
        </form>
    )
}
