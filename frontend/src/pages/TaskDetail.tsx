import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router"
import { getTaskById, deleteTask } from "../connections/taskApi"

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
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold">{task.title}</h1>
            <p className="mt-2 text-gray-700">{task.description}</p>

            <p className="mt-2">
                <span className="font-medium">Status:</span> {task.status}
            </p>
            {task.due_date && (
                <p className="text-sm text-gray-500">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                </p>
            )}
            <p className="text-xs text-gray-400 mt-4">
                Created: {new Date(task.created_at).toLocaleDateString()}
            </p>

            <div className="flex gap-2 mt-6">
                <Link
                    to={`/tasks/${task.id}/edit`}
                    className="inline-block px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 no-underline"
                >
                    Edit
                </Link>
                <button
                    onClick={handleDelete}
                    className="inline-block px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 appearance-none"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
