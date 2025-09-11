import { Link } from "react-router"

export default function TaskCard({ task }: TaskCardProps) {
    const statusColors: Record<string, string> = {
        pending: "bg-yellow-200 text-yellow-800",
        complete: "bg-green-200 text-green-800",
        late: "bg-red-200 text-red-800",
    }

    return (
        <Link
            to={`/tasks/${task.id}`} // navigate to TaskDetail for this task
            className="block border rounded-lg p-4 shadow-sm bg-white hover:shadow-md"
        >
            <h2 className="text-lg font-bold text-black">{task.title}</h2>
            <p className="text-sm text-gray-600">{task.description}</p>

            <div className="mt-2 flex items-center justify-between">
                <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                        statusColors[task.status] || "bg-gray-200 text-gray-800"
                    }`}
                >
                    {task.status}
                </span>
                {task.due_date && (
                    <span className="text-sm text-gray-500">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                    </span>
                )}
            </div>

            <div className="mt-2 text-xs text-gray-400">
                Created: {new Date(task.created_at).toLocaleDateString()}
            </div>
        </Link>
    )
}
