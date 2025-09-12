import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router"
import { getTaskById, deleteTask } from "../connections/taskApi"
import type { Task } from "../vite-env"

export default function TaskDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [task, setTask] = useState<Task | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (id) {
            getTaskById(Number(id)).then((data) => {
                if (!data) setError("Couldn't load task")
                else setTask(data)
            })
        }
    }, [id])

    async function handleDelete() {
        if (task && confirm("Are you sure you want to delete this task?")) {
            const success = await deleteTask(task.id)
            if (success) navigate("/tasks")
            else setError("Failed to delete task")
        }
    }

    if (error) return <p className="text-red-500">{error}</p>
    if (!task) return <p>Loading...</p>

    return (
        <div className="max-w-xl mx-auto p-6 border-2 border-black/10 rounded-xl shadow bg-white/80 flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl font-bold text-black text-left">{task.title}</h1>
                <div className="flex gap-2 ml-0 mt-[-12px] mr-[-12px]">
                    <Link
                        to={`/tasks/${task.id}/edit`}
                        className="inline-block px-4 py-2 bg-white text-black border-2 border-black/10 rounded-xl shadow hover:bg-gray-100 transition no-underline font-semibold"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="inline-block px-4 py-2 bg-white text-black border-2 border-black/10 rounded-xl shadow hover:bg-gray-100 transition font-semibold"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <p className="text-base text-black mb-3 text-left">{task.description}</p>
            <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500">Status:</span>
                <span
                    className={
                        `px-1.5 py-0.5 text-xs font-medium rounded leading-tight ` +
                        (task.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : task.status === "complete"
                            ? "bg-green-200 text-green-800"
                            : task.status === "late"
                            ? "bg-red-200 text-red-800"
                            : "bg-gray-200 text-gray-800")
                    }
                >
                    {task.status}
                </span>
                {task.due_date && (
                    <span className="text-xs text-gray-500">| Due: {new Date(task.due_date).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}</span>
                )}
            </div>
            <p className="text-xs text-gray-500 text-left">Created: {new Date(task.created_at).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}</p>
        </div>
    )
}
